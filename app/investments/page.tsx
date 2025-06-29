'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useUserWallet } from '../lib/atoms/userWallet';
import { useAtomValue } from 'jotai';
import { FiLogIn } from 'react-icons/fi';
import axios from 'axios';
import Link from 'next/link';
import { supabase } from '../lib/supabase';
import AlertModal from '../modals/AlertModal';

export default function Investments() {
	const [showClaimSuccess, setShowClaimSuccess] = useState(false);
	const wallet = useAtomValue(useUserWallet);
	const [totalInvested, setTotalInvested] = useState(0);
	const [apy, setApy] = useState(0);
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
				if (wallet) {
					setIsLoading(true);

					const positionResponse = await axios.post(
						`/api/cavos/vesu/positions`,
						{
							wallet,
						}
					);
					const apyResponse = await axios.post(
						`/api/cavos/vesu/apy`,
						{}
					);
					setApy(apyResponse.data.data.poolAPY);
					setTotalInvested(positionResponse.data.data.total_supplied);
				}
			} catch (error) {
				console.error('Error fetching user positions', error);
			} finally {
				setIsLoading(false);
			}
		}

		if (wallet) {
			getAccountInfo();
		}
	}, [wallet]);

	const handleClaimRewards = async () => {
		setModalProps({
			title: 'Claiming Rewards',
			message: 'Please wait while we process your claim...',
			type: 'info',
			confirmText: 'OK',
			cancelText: 'Cancel',
			onConfirm: () => {},
			showCancel: false,
			isLoading: true,
		});
		setIsModalOpen(true);

		setIsLoading(true);
		try {
			if (wallet) {
				const response = await axios.post(`/api/cavos/vesu/claim`, {
					wallet,
				});

				if (response.data.data.result === false) {
					setModalProps({
						title: 'No rewards available',
						message:
							'Come back in a few days to claim your rewards',
						type: 'info',
						confirmText: 'OK',
						cancelText: 'Cancel',
						onConfirm: () => setIsModalOpen(false),
						showCancel: false,
						isLoading: false,
					});
				} else if (
					response.data.data.amount !== null &&
					response.data.data.result !== null
				) {
					const { error: txError } = await supabase
						.from('transaction')
						.insert([
							{
								uid: wallet.uid,
								type: 'Claim',
								amount: response.data.data.amount,
								tx_hash: response.data.data.result,
							},
						]);

					if (txError) {
						console.error('Insert error:', txError);
						setModalProps({
							title: 'Database Error',
							message: 'Error saving transaction to database',
							type: 'error',
							confirmText: 'OK',
							cancelText: 'Cancel',
							onConfirm: () => setIsModalOpen(false),
							showCancel: false,
							isLoading: false,
						});
						return;
					}
					setShowClaimSuccess(true);
					setTimeout(() => setShowClaimSuccess(false), 3000);
					setModalProps({
						title: 'Rewards Claimed!',
						message: `Total amount in USDC: ${response.data.data.amount}`,
						type: 'success',
						confirmText: 'OK',
						cancelText: 'Cancel',
						onConfirm: () => setIsModalOpen(false),
						showCancel: false,
						isLoading: false,
					});
				}
			}
		} catch (error) {
			console.error('Error claiming rewards', error);
			setModalProps({
				title: 'Error claiming rewards',
				message: 'Please try again later.',
				type: 'error',
				confirmText: 'OK',
				cancelText: 'Cancel',
				onConfirm: () => setIsModalOpen(false),
				showCancel: false,
				isLoading: false,
			});
		} finally {
			setIsLoading(false);
		}
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
							<FiLogIn size={48} color="#FFFFE3" />
						</div>
						<h2 className="text-2xl font-bold text-[#FFFFE3] mb-4">
							Login Required
						</h2>
						<p className="text-[#FFFFE3]/70 mb-6">
							You need to log in to access your investments.
						</p>
					</motion.div>
				</main>

				<Footer />
			</div>
		);
	}

	// LOGGED USER
	return (
		<div className="min-h-screen bg-[#11110E] text-white flex flex-col">
			<Header />
			<main className="flex-1 px-4 py-40 md:px-6 container mx-auto max-w-lg">
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="text-center mb-10"
				></motion.div>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="bg-gradient-to-br from-[#1A1916] to-[#1E1D19] rounded-xl p-6 shadow-lg mb-8 border border-[#FFFFE3]/10"
				>
					<div className="flex justify-between items-center mb-6 pb-4 border-b border-[#FFFFE3]/10">
						<h2 className="text-xl font-semibold text-[#FFFFE3]">
							Investment Summary
						</h2>
						<div className="text-xs px-2 py-1 bg-[#FFFFE3]/10 text-[#FFFFE3] rounded">
							Active
						</div>
					</div>

					{isLoading ? (
						<div className="flex justify-center items-center h-40">
							<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FFFFE3]"></div>
						</div>
					) : (
						<>
							<div className="grid grid-cols-2 gap-6 mb-8">
								<div className="bg-[#11110E]/50 p-4  border border-[#FFFFE3]/10">
									<div className="flex items-center gap-3 mb-3">
										<div className="w-10 h-10 bg-[#FFFFE3]/10 rounded-full flex items-center justify-center">
											<svg
												width="20"
												height="20"
												viewBox="0 0 24 24"
												fill="none"
												stroke="#FFFFE3"
												strokeWidth="2"
											>
												<path
													d="M3 17L9 11L13 15L21 7"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
												<path
													d="M15 7H21V13"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										</div>
										<span className="text-[#FFFFE3]/70 text-sm">
											Invested
										</span>
									</div>
									<p className="text-2xl font-bold">
										${totalInvested.toFixed(2)}
									</p>
									<p className="text-xs text-[#FFFFE3]/50 mt-1">
										USDC
									</p>
								</div>

								<div className="bg-[#11110E]/50 p-4  border border-[#FFFFE3]/10">
									<div className="flex items-center gap-3 mb-3">
										<div className="w-10 h-10 bg-[#FFFFE3]/10 rounded-full flex items-center justify-center">
											<svg
												width="20"
												height="20"
												viewBox="0 0 24 24"
												fill="none"
												stroke="#FFFFE3"
												strokeWidth="2"
											>
												<path
													d="M18 20V10"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
												<path
													d="M12 20V4"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
												<path
													d="M6 20V14"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										</div>
										<span className="text-[#FFFFE3]/70 text-sm">
											APY
										</span>
									</div>
									<p className="text-2xl font-bold text-green-400">
										{apy.toFixed(2)}%
									</p>
									<p className="text-xs text-[#FFFFE3]/50 mt-1">
										Current rate
									</p>
								</div>
							</div>
							<div className="relative">
								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.95 }}
									onClick={handleClaimRewards}
									className={`w-full py-3.5 bg-[#FFFFE3] text-[#11110E] font-medium  flex items-center justify-center gap-2 transition-all ${showClaimSuccess ? 'bg-green-100' : ''}`}
								>
									{showClaimSuccess ? (
										<>
											<svg
												width="20"
												height="20"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
											>
												<path
													d="M20 6L9 17l-5-5"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
											Rewards Claimed!
										</>
									) : (
										'Claim Rewards'
									)}
								</motion.button>

								<AnimatePresence>
									{showClaimSuccess && (
										<motion.div
											initial={{ opacity: 0, y: -10 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -10 }}
											className="absolute -top-10 left-0 right-0 text-center"
										>
											<div className="inline-block px-3 py-1.5 text-xs bg-green-400/20 text-green-300 rounded-full">
												+$2.14 USDC added to your
												balance
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						</>
					)}
				</motion.div>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.3 }}
				>
					<Link href="/invest">
						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className="w-full py-4 border-2 border-[#FFFFE3] text-[#FFFFE3] font-medium text-lg  hover:bg-[#FFFFE3]/10 transition-colors flex items-center justify-center gap-2"
						>
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
							>
								<path
									d="M12 5v14m-7-7h14"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							Invest
						</motion.button>
					</Link>
				</motion.div>
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
