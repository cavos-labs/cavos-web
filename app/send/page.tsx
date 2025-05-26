'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiAlertTriangle } from 'react-icons/fi';
import Header from '../components/Header';
import Footer from '../components/Footer';

import { useAtomValue } from 'jotai';
import { useUserWallet } from '../lib/atoms/userWallet';
import { getWalletBalance } from '../lib/utils';
import axios from 'axios';
import { supabase } from '../lib/supabase';
import AlertModal from '../modals/AlertModal';

export default function Send() {
	const router = useRouter();
	const wallet = useAtomValue(useUserWallet);
	const [amount, setAmount] = useState('');
	const [recipientAddress, setRecipientAddress] = useState('');
	const [balance, setBalance] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalProps, setModalProps] = useState({
		title: '',
		message: '',
		type: 'info',
		confirmText: 'OK',
		cancelText: 'Cancel',
		onConfirm: () => {},
		showCancel: false,
		isLoading: false,
	});

	useEffect(() => {
		async function getAccountInfo() {
			try {
				if (wallet?.address) {
					const newBalance = await getWalletBalance(wallet.address);
					setBalance(newBalance.balance);
				}
			} catch (error) {
				console.error('Error fetching balance:', error);
			}
		}

		if (wallet) {
			getAccountInfo();
		}
	}, [wallet]);

	const handleBack = () => {
		router.back();
	};

	const handleChangeAmount = (e: { target: { value: any } }) => {
		const text = e.target.value;
		const sanitized = text.replace(',', '.');
		setAmount(sanitized);
	};

	const validateStarknetAddress = (address: string) => {
		return address.startsWith('0x') && address.length === 66;
	};

	const setMaxAmount = () => {
		setAmount(balance.toString());
	};

	const showModal = (
		title: string,
		message: string,
		type = 'info',
		confirmText = 'OK',
		onConfirm = () => {},
		showCancel = false,
		cancelText = 'Cancel',
		isModalLoading = false
	) => {
		setModalProps({
			title,
			message,
			type,
			confirmText,
			cancelText,
			onConfirm,
			showCancel,
			isLoading: isModalLoading,
		});
		setIsModalOpen(true);
	};

	const handleSend = async () => {
		if (!amount || parseFloat(amount) <= 0) {
			showModal('Invalid Amount', 'Please enter a valid amount', 'error');
			return;
		}

		if (parseFloat(amount) > balance) {
			showModal(
				'Insufficient Funds',
				"You don't have enough funds for this transfer",
				'error'
			);
			return;
		}

		if (!recipientAddress) {
			showModal(
				'Missing Address',
				'Please enter a recipient address',
				'error'
			);
			return;
		}

		if (!validateStarknetAddress(recipientAddress)) {
			showModal(
				'Invalid Address',
				'Please enter a valid Starknet wallet address',
				'error'
			);
			return;
		}

		showModal(
			'Confirm Transaction',
			`Send $${amount} to ${recipientAddress.substring(0, 6)}...${recipientAddress.substring(recipientAddress.length - 4)}?`,
			'confirm',
			'Send',
			async () => {
				setModalProps((prev) => ({
					...prev,
					title: 'Processing Transaction',
					message: 'Please wait while we process your transaction...',
					isLoading: true,
					showCancel: false,
				}));

				try {
					if (wallet) {
						const response = await axios.post(
							process.env.NEXT_PUBLIC_WALLET_PROVIDER_API +
								'wallet/send',
							{
								amount: amount,
								address: wallet.address,
								hashedPk: wallet.private_key,
								hashedPin: wallet.pin,
								receiverAddress: recipientAddress,
							},
							{
								headers: {
									'Content-Type': 'application/json',
									Authorization: `Bearer ${process.env.NEXT_PUBLIC_WALLET_PROVIDER_TOKEN}`,
								},
							}
						);

						if (!response.data.result) {
							throw new Error('Transaction failed');
						}

						const txHash = response.data.result;

						const { error: txError } = await supabase
							.from('transaction')
							.insert([
								{
									uid: wallet.uid,
									type: 'Send',
									amount: Number(amount),
									tx_hash: txHash,
								},
							]);

						if (txError) {
							console.error('Insert error:', txError);
							setModalProps((prev) => ({
								...prev,
								title: 'Database Error',
								message: 'Error saving transaction to database',
								type: 'error',
								isLoading: false,
							}));
							return;
						}
						setModalProps((prev) => ({
							...prev,
							title: 'Transaction Successful',
							message: `You've sent $${amount} to ${recipientAddress.substring(0, 6)}...${recipientAddress.substring(recipientAddress.length - 4)}`,
							type: 'success',
							confirmText: 'Go to Dashboard',
							isLoading: false,
							onConfirm: () => {
								setAmount('');
								setRecipientAddress('');
								setIsModalOpen(false);
								router.push('/dashboard');
							},
						}));
					} else {
						setModalProps((prev) => ({
							...prev,
							title: 'Authentication Error',
							message: 'Please login to send money.',
							type: 'error',
							isLoading: false,
						}));
					}
				} catch (error) {
					console.error('Send error:', error);
					setModalProps((prev) => ({
						...prev,
						title: 'Transaction Failed',
						message:
							'An error occurred while sending funds. Please try again.',
						type: 'error',
						isLoading: false,
					}));
				}
			},
			true,
			'Cancel'
		);
	};

	// NOT LOGGED USER
	if (!wallet) {
		return (
			<div className="min-h-screen text-white bg-[#11110E] flex flex-col">
				<Header />

				<main className="flex-grow flex items-center justify-center">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="text-center p-8 bg-[#1A1916]/50 rounded-xl max-w-md mx-4"
					>
						<div className="flex justify-center mb-6">
							<FiAlertTriangle size={48} color="#FFFFE3" />
						</div>
						<h2 className="text-2xl font-bold text-[#FFFFE3] mb-4">
							Login Required
						</h2>
						<p className="text-[#FFFFE3]/70 mb-6">
							You need to log in to access the send functionality.
						</p>
					</motion.div>
				</main>

				<Footer />
			</div>
		);
	}

	return (
		<div className="min-h-screen text-white bg-[#11110E] flex flex-col">
			<Header />

			<main className="container mx-auto px-4 py-12 md:py-44 max-w-md">
				{/* Back Button */}
				<button
					onClick={handleBack}
					className="flex items-center text-[#FFFFE3] mb-6 hover:text-white transition-colors"
				>
					<FiArrowLeft className="mr-2" />
					<span>Back</span>
				</button>

				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}
					className="bg-black rounded-lg p-6 mb-8 text-center"
				>
					<p className="text-[#555] text-sm mb-2">
						AVAILABLE BALANCE
					</p>
					<p className="text-[#FFFFE3] text-3xl font-jetbrains">
						{balance} USD
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3, delay: 0.1 }}
					className="mb-6"
				>
					<label
						htmlFor="recipientAddress"
						className="block text-[#555] text-sm mb-3"
					>
						RECIPIENT STARKNET ADDRESS
					</label>
					<div className="bg-black rounded-lg border border-[#333] p-4">
						<input
							id="recipientAddress"
							type="text"
							placeholder="0x..."
							value={recipientAddress}
							onChange={(e) =>
								setRecipientAddress(e.target.value)
							}
							className="w-full bg-transparent text-[#FFFFE3] font-jetbrains text-base focus:outline-none placeholder-[#555]"
							autoCapitalize="none"
							autoCorrect="off"
							spellCheck="false"
						/>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3, delay: 0.2 }}
					className="mb-6"
				>
					<label
						htmlFor="amount"
						className="block text-[#555] text-sm mb-3"
					>
						AMOUNT TO SEND (USD)
					</label>
					<div className="flex items-center bg-black rounded-lg border border-[#333] p-4">
						<span className="text-[#FFFFE3] text-xl mr-2">$</span>
						<input
							id="amount"
							type="text"
							inputMode="decimal"
							placeholder="0.00"
							value={amount}
							onChange={handleChangeAmount}
							className="flex-1 bg-transparent text-[#FFFFE3] font-jetbrains text-xl focus:outline-none placeholder-[#555]"
						/>
						<button
							onClick={setMaxAmount}
							className="bg-[#333] rounded text-[#FFFFE3] text-xs font-bold px-3 py-1 hover:bg-[#444] transition-colors"
						>
							MAX
						</button>
					</div>
				</motion.div>

				{amount && parseFloat(amount) > 0 && recipientAddress && (
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.3 }}
						className="bg-black rounded-lg p-5 mb-8"
					>
						<div className="flex justify-between mb-3">
							<p className="text-[#555] text-sm">
								Transfer Amount
							</p>
							<p className="text-[#FFFFE3] text-sm font-jetbrains">
								${parseFloat(amount).toFixed(2)}
							</p>
						</div>
						<div className="flex justify-between">
							<p className="text-[#555] text-sm">Recipient</p>
							<p className="text-[#FFFFE3] text-sm font-jetbrains truncate max-w-[60%]">
								{recipientAddress.substring(0, 6)}...
								{recipientAddress.substring(
									recipientAddress.length - 4
								)}
							</p>
						</div>
					</motion.div>
				)}

				<motion.button
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3, delay: 0.3 }}
					disabled={
						!amount ||
						parseFloat(amount) <= 0 ||
						!recipientAddress ||
						isLoading ||
						modalProps.isLoading
					}
					onClick={handleSend}
					className={`w-full py-4 text-center rounded-sm mb-6 transition-colors ${
						!amount ||
						parseFloat(amount) <= 0 ||
						!recipientAddress ||
						isLoading ||
						modalProps.isLoading
							? 'bg-[#333] text-[#666] cursor-not-allowed'
							: 'bg-[#FFFFE3] text-[#11110E] hover:bg-[#FFFFB3]'
					}`}
				>
					{isLoading ? 'Processing...' : 'Send'}
				</motion.button>

				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.3, delay: 0.4 }}
					className="text-[#555] text-xs text-center leading-relaxed"
				>
					Double-check the recipient address before sending.
					Transactions cannot be reversed once confirmed.
				</motion.p>
			</main>

			<AlertModal
				isOpen={isModalOpen}
				onClose={() => {
					if (!modalProps.isLoading) {
						setIsModalOpen(false);
					}
				}}
				{...modalProps}
			/>

			<Footer />
		</div>
	);
}
