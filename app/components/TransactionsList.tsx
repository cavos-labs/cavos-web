'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { supabase } from '../lib/supabase';
import { useUserWallet } from '../lib/atoms/userWallet';
import { useUserId } from '../lib/atoms/userId';
import { useAtomValue } from 'jotai';
import { Transaction } from '../lib/types/Transaction';

const TransactionsList = () => {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const wallet = useAtomValue(useUserWallet);
	const userId = useAtomValue(useUserId);

	useEffect(() => {
		async function fetchTransactions() {
			try {
				if (wallet && userId) {
					setIsLoading(true);
					const userIdString = String(userId);

					const { data, error } = await supabase
						.from('transaction')
						.select('*')
						.eq('uid', userIdString)
						.order('created_at', { ascending: false });

					if (error) {
						console.error('Supabase read error:', error);
						return;
					}
					setTransactions(data as Transaction[]);
				}
			} catch (error) {
				console.error('Error fetching transactions:', error);
			} finally {
				setIsLoading(false);
			}
		}

		if (wallet) {
			fetchTransactions();
		}
	}, [wallet, userId]);

	const getTransactionIcon = (type: string) => {
		if (type === 'Deposit' || type === 'Account Creation') {
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="22"
					height="22"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#FFFFE3"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<line x1="12" y1="19" x2="12" y2="5"></line>
					<polyline points="5 12 12 5 19 12"></polyline>
				</svg>
			);
		} else {
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="22"
					height="22"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#FFFFE3"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<line x1="12" y1="5" x2="12" y2="19"></line>
					<polyline points="19 12 12 19 5 12"></polyline>
				</svg>
			);
		}
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleString(undefined, {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
		});
	};

	const truncateHash = (hash: string | null) => {
		if (!hash) return '';
		return hash.slice(0, 4) + '...' + hash.slice(-4);
	};

	const generateExplorerUrl = (tx: Transaction) => {
		if (tx.type === 'Account Creation' && wallet) {
			return `https://voyager.online/contract/${wallet.address}`;
		} else {
			return `https://voyager.online/tx/${tx.tx_hash}`;
		}
	};

	return (
		<motion.section
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.4 }}
			className="max-w-2xl mx-auto"
		>
			<div className="flex justify-between items-center mb-6 pb-2 border-b border-[#FFFFE3]/20">
				<h2 className="text-xl font-bold text-[#FFFFE3]">
					TRANSACTIONS
				</h2>
				<button className="text-sm text-[#FFFFE3]/60 hover:text-[#FFFFE3] transition-colors">
					View All
				</button>
			</div>

			{isLoading ? (
				<div className="text-center py-8">
					<div className="inline-block w-8 h-8 border-4 border-[#FFFFE3]/30 border-t-[#FFFFE3] rounded-full animate-spin"></div>
					<p className="mt-4 text-[#FFFFE3]/70">
						Loading transactions...
					</p>
				</div>
			) : (
				<div className="space-y-4">
					{transactions.length === 0 ? (
						<div className="text-center py-8">
							<p className="text-[#FFFFE3]/70">
								No transactions found
							</p>
						</div>
					) : (
						transactions.map((tx, index) => (
							<motion.div
								key={index}
								whileHover={{ scale: 1.01 }}
								className="flex justify-between items-center p-4 bg-[#1A1916]/50 rounded-xl hover:bg-[#1A1916]/80 transition-colors duration-200"
							>
								<div className="flex items-center gap-4">
									<div className="bg-[#FFFFE3]/10 p-3 rounded-full">
										{getTransactionIcon(tx.type)}
									</div>
									<div>
										<Link
											href={generateExplorerUrl(tx)}
											target="_blank"
											rel="noopener noreferrer"
											className="font-medium text-[#FFFFE3] hover:underline"
										>
											{tx.type}
										</Link>
										<p className="text-sm text-[#FFFFE3]/60 font-mono">
											{tx.type === 'Account Creation'
												? truncateHash(tx.uid)
												: truncateHash(tx.tx_hash)}
										</p>
									</div>
								</div>
								<div className="text-right">
									<p
										className={`font-medium ${tx.type === 'Deposit' ? 'text-green-400' : 'text-red-400'} font-mono`}
									>
										{tx.type === 'Deposit' ? '+' : '-'}
										{tx.amount.toFixed(2)} USD
									</p>
									<p className="text-sm text-[#FFFFE3]/60 font-mono">
										{formatDate(tx.created_at)}
									</p>
								</div>
							</motion.div>
						))
					)}
				</div>
			)}
		</motion.section>
	);
};

export default TransactionsList;
