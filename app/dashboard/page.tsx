'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TransactionsList from '../components/TransactionsList';
import { useUserWallet } from '../lib/atoms/userWallet';
import { useUserId } from '../lib/atoms/userId';
import { useAtomValue } from 'jotai';
import { FiLogIn } from 'react-icons/fi';
import axios from 'axios';

export default function Dashboard() {
	const wallet = useAtomValue(useUserWallet);
	const userId = useAtomValue(useUserId);
	const [balance, setBalance] = useState(0.0);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function getAccountInfo() {
			try {
				if (wallet && userId) {
					setIsLoading(true);
					const address = wallet.address;
					const response = await axios.post(`/api/cavos/balance`, {
						address,
					});
					const newBalance = response.data.data;
					setBalance(newBalance.balance);
				}
			} catch (error) {
				console.error('Error obtaining balance:', error);
				setBalance(0);
			} finally {
				setIsLoading(false);
			}
		}

		if (wallet) {
			getAccountInfo();
		}
	}, [wallet, userId]);

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
							You need to log in to access your dashboard.
						</p>
					</motion.div>
				</main>

				<Footer />
			</div>
		);
	}

	// LOGGED USER
	return (
		<div className="min-h-screen text-white bg-[#11110E]">
			<Header />

			<main className="container mx-auto px-4 py-12 md:py-44">
				<motion.section
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="mb-16"
				>
					<div className="relative w-full max-w-lg mx-auto h-64 bg-gradient-to-br from-[#11110E] to-[#1E1D19] rounded-2xl overflow-hidden border border-[#FFFFE3]/20 shadow-lg">
						<div className="absolute top-6 left-6">
							<Image
								src="/images/CavosLogo.png"
								alt="Cavos Logo"
								width={50}
								height={50}
								className="filter drop-shadow-md"
							/>
						</div>
						<div className="absolute bottom-6 right-6">
							<Image
								src="/images/Visa.png"
								alt="Visa"
								width={80}
								height={28}
								className="filter brightness-0 invert opacity-90"
							/>
						</div>
						<div className="absolute top-1/2 left-6 transform -translate-y-1/2 space-y-2">
							<p className="text-[#FFFFE3]/80 text-sm font-medium tracking-wider">
								YOUR BALANCE
							</p>
							<p className="text-3xl font-mono font-bold text-[#FFFFE3]">
								${isLoading ? '...' : balance.toFixed(2)} USD
							</p>
							<div className="flex items-center gap-2 mt-4">
								<span className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></span>
								<span className="text-xs text-[#FFFFE3]/70">
									Active
								</span>
							</div>
						</div>
						<div className="absolute bottom-6 left-6">
							<p className="text-xs text-[#FFFFE3]/60">
								•••• •••• •••• 4242
							</p>
						</div>
					</div>
				</motion.section>

				<motion.section
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="flex flex-wrap justify-center gap-4 mb-16"
				>
					<Link href="/buy">
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="border-2 border-[#FFFFE3] px-8 py-3 hover:bg-[#FFFFE3] hover:text-[#11110E] transition-all duration-300 font-medium flex items-center gap-2"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<line x1="12" y1="19" x2="12" y2="5"></line>
								<polyline points="5 12 12 5 19 12"></polyline>
							</svg>
							Buy
						</motion.button>
					</Link>
					<Link href="/send">
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="border-2 border-[#FFFFE3] px-8 py-3  hover:bg-[#FFFFE3] hover:text-[#11110E] transition-all duration-300 font-medium flex items-center gap-2"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<line x1="12" y1="5" x2="12" y2="19"></line>
								<polyline points="19 12 12 19 5 12"></polyline>
							</svg>
							Send
						</motion.button>
					</Link>
					<Link href="/invest">
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="border-2 border-[#FFFFE3] px-8 py-3  hover:bg-[#FFFFE3] hover:text-[#11110E] transition-all duration-300 font-medium flex items-center gap-2"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M12 2v4"></path>
								<path d="m16 6-4-4-4 4"></path>
								<path d="M18 20a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2"></path>
								<path d="M12 22v-4"></path>
								<path d="m8 18 4 4 4-4"></path>
							</svg>
							Invest
						</motion.button>
					</Link>
				</motion.section>

				<TransactionsList />
			</main>
			<Footer />
		</div>
	);
}
