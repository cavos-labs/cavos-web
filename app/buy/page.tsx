'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAtomValue } from 'jotai';
import { FiCopy, FiAlertTriangle, FiLogIn } from 'react-icons/fi';
import { useUserWallet } from '../lib/atoms/userWallet';

export default function Buy() {
	const wallet = useAtomValue(useUserWallet);
	const [copied, setCopied] = useState(false);

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
							You need to log in to access your deposit address.
						</p>
					</motion.div>
				</main>

				<Footer />
			</div>
		);
	}

	const fullWalletAddress = wallet?.address
		? wallet.address.startsWith('0x')
			? '0x' + wallet.address.slice(2).padStart(64, '0')
			: '0x' + wallet.address.padStart(64, '0')
		: '0x0000000000000000000000000000000000000000000000000000000000000000';

	const truncateAddress = (address: string) => {
		if (!address) return '';
		if (address.length <= 16) return address;
		return `${address.substring(0, 40)}....${address.substring(
			address.length - 4
		)}`;
	};

	const walletAddress = truncateAddress(fullWalletAddress);
	const supportedNetworks = ['Starknet'];

	const handleCopyAddress = () => {
		navigator.clipboard.writeText(fullWalletAddress);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	// LOGGED USER
	return (
		<div className="min-h-screen text-white bg-[#11110E]">
			<Header />

			<main className="container mx-auto px-4 py-12 md:py-44">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="max-w-2xl mx-auto"
				>
					<div className="flex justify-between items-center mb-6 pb-2 border-b border-[#FFFFE3]/20">
						<h2 className="text-xl font-bold text-[#FFFFE3]">
							DEPOSIT
						</h2>
					</div>

					<div className="bg-[#1A1916]/50 rounded-xl p-6 mb-8 hover:bg-[#1A1916]/80 transition-colors duration-200">
						<h3 className="text-[#FFFFE3]/70 text-sm mb-4">
							YOUR DEPOSIT ADDRESS
						</h3>

						<div className="flex items-center bg-[#11110E] rounded-md p-4 border border-[#333]">
							<p className="font-mono text-[#FFFFE3] flex-1">
								{walletAddress}
							</p>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={handleCopyAddress}
								className="ml-2 p-2 hover:bg-[#222] rounded-md transition"
								aria-label="Copy address"
							>
								<FiCopy size={20} color="#FFFFE3" />
							</motion.button>
						</div>

						{copied && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="mt-2 text-green-400 text-sm"
							>
								Wallet address copied to clipboard!
							</motion.div>
						)}
					</div>

					<div className="mb-8">
						<div className="flex justify-between items-center mb-6 pb-2 border-b border-[#FFFFE3]/20">
							<h2 className="text-xl font-bold text-[#FFFFE3]">
								IMPORTANT
							</h2>
						</div>

						<div className="space-y-4">
							<motion.div
								whileHover={{ scale: 1.01 }}
								className="flex p-4 bg-[#1A1916]/50 rounded-xl hover:bg-[#1A1916]/80 transition-colors duration-200"
							>
								<div className="mr-4 mt-1">
									<FiAlertTriangle
										size={22}
										color="#F44336"
									/>
								</div>
								<p className="text-[#FFFFE3] text-sm leading-relaxed">
									Only send from supported networks:{' '}
									{supportedNetworks.join(', ')}
								</p>
							</motion.div>

							<motion.div
								whileHover={{ scale: 1.01 }}
								className="flex p-4 bg-[#1A1916]/50 rounded-xl hover:bg-[#1A1916]/80 transition-colors duration-200"
							>
								<div className="mr-4 mt-1">
									<FiAlertTriangle
										size={22}
										color="#F44336"
									/>
								</div>
								<p className="text-[#FFFFE3] text-sm leading-relaxed">
									Supported assets: USDC
								</p>
							</motion.div>

							<motion.div
								whileHover={{ scale: 1.01 }}
								className="flex p-4 bg-[#1A1916]/50 rounded-xl hover:bg-[#1A1916]/80 transition-colors duration-200"
							>
								<div className="mr-4 mt-1">
									<FiAlertTriangle
										size={22}
										color="#F44336"
									/>
								</div>
								<p className="text-[#FFFFE3] text-sm leading-relaxed">
									Do not send from exchanges that don't allow
									withdrawals to smart contracts
								</p>
							</motion.div>
						</div>
					</div>

					<div>
						<div className="flex justify-between items-center mb-6 pb-2 border-b border-[#FFFFE3]/20">
							<h2 className="text-xl font-bold text-[#FFFFE3]">
								SUPPORTED NETWORKS
							</h2>
						</div>

						<div className="flex flex-wrap">
							{supportedNetworks.map((network, index) => (
								<motion.div
									key={index}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="bg-[#1A1916]/50 rounded-full px-6 py-3 mr-3 mb-3 border border-[#FFFFE3]/20 hover:bg-[#1A1916]/80 transition-colors duration-200"
								>
									<p className="text-[#FFFFE3] text-sm font-medium">
										{network}
									</p>
								</motion.div>
							))}
						</div>
					</div>
				</motion.div>
			</main>
			<Footer />
		</div>
	);
}
