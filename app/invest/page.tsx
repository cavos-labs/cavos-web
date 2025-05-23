'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useUserWallet } from '../lib/atoms/userWallet';
import { useAtomValue } from 'jotai';
import { getWalletBalance } from '../lib/utils';
import axios from 'axios';
import { supabase } from '../lib/supabase';
import { FiDollarSign } from 'react-icons/fi';
import AlertModal from '../modals/AlertModal';

export default function Invest() {
	const router = useRouter();
	const [investmentAmount, setInvestmentAmount] = useState<string>('');
	const [selectedPool] = useState<string>('Vesu Pool');
	const [balance, setBalance] = useState<number>(0);
	const wallet = useAtomValue(useUserWallet);
	const [isLoading, setIsLoading] = useState<boolean>(false);
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
				if (wallet) {
					const newBalance = await getWalletBalance(wallet.address);
					setBalance(newBalance.balance);
				}
			} catch (error) {
				console.error('Error al obtener el balance:', error);
			}
		}

		if (wallet) {
			getAccountInfo();
		}
	}, [wallet]);

	const handleChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
		const text = event.target.value;
		const sanitized = text.replace(',', '.');
		setInvestmentAmount(sanitized);
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

	const createPosition = async () => {
		try {
			if (wallet) {
				const response = await axios.post(
					process.env.NEXT_PUBLIC_WALLET_PROVIDER_API + 'position',
					{
						amount: investmentAmount,
						address: wallet.address,
						publicKey: wallet.public_key,
						hashedPk: wallet.private_key,
						hashedPin: wallet.pin,
						deploymentData: wallet.deployment_data,
						deployed: wallet.deployed,
					},
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${process.env.NEXT_PUBLIC_WALLET_PROVIDER_TOKEN}`,
						},
					}
				);
				return response.data;
			}
		} catch (err) {
			console.error('Error creating position:', err);
			throw err;
		}
	};

	const handleInvest = async () => {
		if (
			!investmentAmount ||
			isNaN(Number(investmentAmount)) ||
			parseFloat(investmentAmount) <= 0
		) {
			showModal(
				'Invalid Amount',
				'Please enter a valid investment amount',
				'error'
			);
			return;
		}

		if (parseFloat(investmentAmount) > balance) {
			showModal(
				'Insufficient Balance',
				"You don't have enough funds for this investment",
				'error'
			);
			return;
		}

		showModal(
			'Confirm Investment',
			`Invest $${investmentAmount} in ${selectedPool}?`,
			'confirm',
			'Invest',
			async () => {
				setModalProps((prev) => ({
					...prev,
					title: 'Processing Investment',
					message: 'Please wait while we process your investment...',
					isLoading: true,
					showCancel: false,
				}));

				await handleConfirmInvestment();
			},
			true,
			'Cancel'
		);
	};

	const handleConfirmInvestment = async () => {
		try {
			if (wallet) {
				setIsLoading(true);
				const positionTx = await createPosition();

				if (positionTx?.result == null) {
					setModalProps((prev) => ({
						...prev,
						title: 'Investment Error',
						message: 'Error creating position. Please try again.',
						type: 'error',
						isLoading: false,
						showCancel: false,
					}));
					return;
				}

				const { error: txError } = await supabase
					.from('transaction')
					.insert([
						{
							uid: wallet.uid,
							type: 'Invest',
							amount: Number(investmentAmount),
							tx_hash: positionTx.result,
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
						showCancel: false,
					}));
					return;
				}

				setModalProps((prev) => ({
					...prev,
					title: 'Investment Successful',
					message: `You've successfully invested $${investmentAmount} in ${selectedPool}`,
					type: 'success',
					confirmText: 'Go to Dashboard',
					isLoading: false,
					showCancel: false,
					onConfirm: () => {
						setIsModalOpen(false);
						router.push('/dashboard');
					},
				}));
			}
		} catch (error) {
			console.error('Error during investment:', error);
			setModalProps((prev) => ({
				...prev,
				title: 'Investment Failed',
				message:
					'An error occurred while creating position, try again.',
				type: 'error',
				isLoading: false,
				showCancel: false,
			}));
		} finally {
			setIsLoading(false);
		}
	};

	const handleMaxClick = () => {
		setInvestmentAmount(balance.toString());
	};

	// NOT LOGGED USER
	if (!wallet) {
		return (
			<div className="min-h-screen text-white bg-[#11110E] flex flex-col">
				<Header />
				<main className="flex-grow flex items-center justify-center px-4 pt-20">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="text-center p-8 bg-[#1A1916]/50 rounded-xl max-w-md w-full"
					>
						<div className="flex justify-center mb-6">
							<FiDollarSign size={48} color="#FFFFE3" />
						</div>
						<h2 className="text-2xl font-bold text-[#FFFFE3] mb-4">
							Login Required
						</h2>
						<p className="text-[#FFFFE3]/70 mb-6">
							You need to log in to start investing.
						</p>
					</motion.div>
				</main>
				<Footer />
			</div>
		);
	}

	// LOGGED USER
	return (
		<div className="min-h-screen bg-[#11110E] text-white flex flex-col relative">
			{/* Loading Overlay */}
			<AnimatePresence>
				{isLoading && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
					>
						<div className="bg-[#1A1916] p-6 rounded-xl border border-[#FFFFE3]/10">
							<div className="flex flex-col items-center">
								<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FFFFE3] mb-4"></div>
								<p className="text-[#FFFFE3] text-sm">
									Processing investment...
								</p>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			<Header />

			{/* Main content with better centering and separation from header */}
			<main className="flex-1 flex items-center justify-center px-4 pt-20 pb-8 min-h-0">
				<div className="w-full max-w-md mx-auto space-y-6">
					{/* Balance Card */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="bg-gradient-to-br from-[#1A1916] to-[#1E1D19] rounded-xl p-6 shadow-lg border border-[#FFFFE3]/10"
					>
						<div className="text-center">
							<p className="text-[#FFFFE3]/70 text-sm mb-2 tracking-wider">
								AVAILABLE BALANCE
							</p>
							<p className="text-4xl font-light text-[#FFFFE3] font-mono">
								{balance.toFixed(2)} USD
							</p>
						</div>
					</motion.div>

					{/* Investment Input */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="bg-gradient-to-br from-[#1A1916] to-[#1E1D19] rounded-xl p-6 shadow-lg border border-[#FFFFE3]/10"
					>
						<p className="text-[#FFFFE3]/70 text-sm mb-4 tracking-wider text-center">
							AMOUNT TO INVEST (USD)
						</p>
						<div className="flex items-center bg-[#11110E]/50 rounded-lg p-4 border border-[#FFFFE3]/10 focus-within:border-[#FFFFE3]/30 transition-colors">
							<span className="text-[#FFFFE3] text-2xl mr-3">
								$
							</span>
							<input
								type="number"
								className="flex-1 bg-transparent border-none outline-none text-[#FFFFE3] text-2xl font-mono placeholder-[#FFFFE3]/50 text-center"
								placeholder="0.00"
								step="0.01"
								value={investmentAmount}
								onChange={handleChangeAmount}
							/>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={handleMaxClick}
								className="bg-[#FFFFE3]/10 hover:bg-[#FFFFE3]/20 text-[#FFFFE3] px-3 py-1 rounded text-sm font-semibold transition-colors"
							>
								MAX
							</motion.button>
						</div>
					</motion.div>

					{/* Invest Button */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							onClick={handleInvest}
							disabled={
								!investmentAmount ||
								isNaN(Number(investmentAmount)) ||
								parseFloat(investmentAmount) <= 0 ||
								isLoading ||
								modalProps.isLoading
							}
							className={`w-full py-4 font-medium text-lg rounded-lg transition-all ${
								!investmentAmount ||
								isNaN(Number(investmentAmount)) ||
								parseFloat(investmentAmount) <= 0 ||
								isLoading ||
								modalProps.isLoading
									? 'bg-[#FFFFE3]/20 text-[#FFFFE3]/50 cursor-not-allowed'
									: 'bg-[#FFFFE3] text-[#11110E] hover:bg-[#FFFFE3]/90'
							}`}
						>
							{isLoading ? 'Processing...' : 'Invest'}
						</motion.button>
					</motion.div>

					{/* Disclaimer */}
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						className="text-[#FFFFE3]/50 text-xs text-center leading-relaxed"
					>
						Investments are subject to market risks. Past
						performance is not indicative of future results.
					</motion.p>
				</div>
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
