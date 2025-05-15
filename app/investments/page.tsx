'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useUserWallet } from '../lib/atoms/userWallet';
import { useAtomValue } from 'jotai';
import { FiLogIn } from 'react-icons/fi';

export default function Investments() {
	const [showClaimSuccess, setShowClaimSuccess] = useState(false);
	const wallet = useAtomValue(useUserWallet);

	const handleClaimRewards = () => {
		setShowClaimSuccess(true);
		setTimeout(() => setShowClaimSuccess(false), 3000);
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

			{/* Main content */}
			<main className="flex-1 px-4 py-40 md:px-6 container mx-auto max-w-lg">
				{/* Page header */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="text-center mb-10"
				></motion.div>

				{/* Investment summary card */}
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
							<p className="text-2xl font-bold">$11.43</p>
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
								6.52%
							</p>
							<p className="text-xs text-[#FFFFE3]/50 mt-1">
								Current rate
							</p>
						</div>
					</div>

					{/* Claim rewards button with success notification */}
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
										+$2.14 USDC added to your balance
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</motion.div>

				{/* Invest button */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.3 }}
				>
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
				</motion.div>

				{/* Additional investment stats */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.4 }}
					className="mt-8 grid grid-cols-2 gap-4"
				>
					<div className="bg-[#1A1916]/50 p-4  border border-[#FFFFE3]/10">
						<p className="text-[#FFFFE3]/70 text-sm mb-1">Earned</p>
						<p className="text-lg font-semibold text-green-400">
							$2.14
						</p>
					</div>
					<div className="bg-[#1A1916]/50 p-4  border border-[#FFFFE3]/10">
						<p className="text-[#FFFFE3]/70 text-sm mb-1">
							Duration
						</p>
						<p className="text-lg font-semibold">42 days</p>
					</div>
				</motion.div>
			</main>
			<Footer />
		</div>
	);
}
