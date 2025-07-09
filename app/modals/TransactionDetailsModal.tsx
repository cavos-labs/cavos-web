'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiArrowRight, FiClock, FiSend } from 'react-icons/fi';

interface TransactionDetails {
	transfers: {
		tokenTransfers: Array<{
			token: string;
			amount: string;
			from: string;
			to: string;
		}>;
		events: Array<{
			name: string;
			timestamp: number;
			from: string;
			contractAlias?: string;
		}>;
	};
}

interface TransactionDetailsModalProps {
	isOpen: boolean;
	onClose: () => void;
	txDetails: TransactionDetails | null;
}

export default function TransactionDetailsModal({
	isOpen,
	onClose,
	txDetails,
}: TransactionDetailsModalProps) {
	const modalRef = useRef<HTMLDivElement>(null);
	const [activeTab, setActiveTab] = useState<'transfers' | 'timeline'>(
		'transfers'
	);

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isOpen) {
				onClose();
			}
		};

		window.addEventListener('keydown', handleEscape);
		return () => window.removeEventListener('keydown', handleEscape);
	}, [isOpen, onClose]);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(e.target as Node) &&
				isOpen
			) {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen, onClose]);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [isOpen]);

	if (!txDetails) return null;

	return (
		<AnimatePresence>
			{isOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="absolute inset-0 bg-black/80 backdrop-blur-md"
					/>

					<motion.div
						ref={modalRef}
						initial={{ opacity: 0, scale: 0.85, y: 40 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.85, y: 40 }}
						transition={{
							type: 'spring',
							damping: 25,
							stiffness: 400,
							mass: 0.8,
						}}
						className="relative bg-gradient-to-br from-[#1A1916] via-[#1E1C19] to-[#16140F] border border-[#333]/50 rounded-2xl w-full max-w-lg mx-auto shadow-2xl overflow-hidden max-h-[85vh] flex flex-col backdrop-blur-xl"
						style={{
							boxShadow:
								'0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 227, 0.05)',
						}}
					>
						<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFFFE3]/20 to-transparent" />

						<div className="relative p-6 pb-4">
							<div className="flex justify-between items-start mb-2">
								<div className="flex items-center space-x-3">
									<div className="w-10 h-10 bg-gradient-to-br from-[#FFFFE3]/20 to-[#FFFFE3]/5 rounded-xl flex items-center justify-center border border-[#FFFFE3]/10">
										<FiSend className="w-5 h-5 text-[#FFFFE3]" />
									</div>
									<div>
										<h3 className="text-xl font-semibold text-[#FFFFE3] tracking-tight">
											Transaction Details
										</h3>
										<p className="text-sm text-[#FFFFE3]/50 font-medium">
											CAVOS Network
										</p>
									</div>
								</div>
								<button
									onClick={onClose}
									className="w-10 h-10 flex items-center justify-center rounded-xl border-2 border-[#EAE5DC]/30 hover:border-[#EAE5DC] hover:bg-[#EAE5DC]/10 hover:scale-105 transition-all duration-300 backdrop-blur-sm group"
								>
									<span className="text-[#EAE5DC]/70 group-hover:text-[#EAE5DC] transition-all duration-300 text-xl font-bold">
										×
									</span>
								</button>
							</div>

							<div className="mt-6">
								<div className="flex bg-[#1A1916]/80 backdrop-blur-sm rounded-xl p-1 border border-[#EAE5DC]/20 gap-2">
									<button
										onClick={() =>
											setActiveTab('transfers')
										}
										className={`flex-1 py-3 px-6 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2 relative overflow-hidden ${
											activeTab === 'transfers'
												? 'bg-gradient-to-r from-[#EAE5DC] to-[#FFFFE3] text-[#11110E] shadow-lg transform scale-105'
												: 'text-[#EAE5DC]/70 hover:text-[#EAE5DC] hover:bg-[#EAE5DC]/5 hover:scale-102'
										}`}
									>
										{activeTab === 'transfers' && (
											<div className="absolute inset-0 bg-gradient-to-r from-[#EAE5DC]/20 to-[#FFFFE3]/20 rounded-lg" />
										)}

										<div className="relative flex items-center space-x-2">
											<FiArrowRight
												className={`w-4 h-4 transition-all duration-300 ${
													activeTab === 'transfers'
														? 'text-[#11110E]'
														: 'text-[#EAE5DC]/60'
												}`}
											/>
											<span className="font-semibold">
												Transfers
											</span>
										</div>
									</button>

									<div className="flex items-center justify-center">
										<div className="w-0.5 h-10 bg-gradient-to-b from-[#EAE5DC]/40 via-[#EAE5DC]/60 to-[#EAE5DC]/40 rounded-full shadow-sm"></div>
									</div>

									<button
										onClick={() => setActiveTab('timeline')}
										className={`flex-1 py-3 px-6 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2 relative overflow-hidden ${
											activeTab === 'timeline'
												? 'bg-gradient-to-r from-[#EAE5DC] to-[#FFFFE3] text-[#11110E] shadow-lg transform scale-105'
												: 'text-[#EAE5DC]/70 hover:text-[#EAE5DC] hover:bg-[#EAE5DC]/5 hover:scale-102'
										}`}
									>
										{activeTab === 'timeline' && (
											<div className="absolute inset-0 bg-gradient-to-r from-[#EAE5DC]/20 to-[#FFFFE3]/20 rounded-lg" />
										)}

										<div className="relative flex items-center space-x-2">
											<FiClock
												className={`w-4 h-4 transition-all duration-300 ${
													activeTab === 'timeline'
														? 'text-[#11110E]'
														: 'text-[#EAE5DC]/60'
												}`}
											/>
											<span className="font-semibold">
												Timeline
											</span>
										</div>
									</button>
								</div>
							</div>
						</div>

						<div className="flex-1 overflow-y-auto px-6 pb-6">
							<AnimatePresence mode="wait">
								{activeTab === 'transfers' ? (
									<motion.div
										key="transfers"
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: 20 }}
										transition={{ duration: 0.2 }}
										className="space-y-4"
									>
										{txDetails.transfers.tokenTransfers.map(
											(transfer, index) => (
												<motion.div
													key={index}
													initial={{
														opacity: 0,
														y: 20,
													}}
													animate={{
														opacity: 1,
														y: 0,
													}}
													transition={{
														delay: index * 0.1,
													}}
													className="group relative bg-gradient-to-br from-[#333]/30 to-[#333]/10 backdrop-blur-sm border border-[#444]/50 rounded-xl p-5 hover:border-[#FFFFE3]/20 transition-all duration-300"
												>
													<div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#FFFFE3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

													<div className="relative">
														<div className="flex justify-between items-center mb-4">
															<div className="flex items-center space-x-3">
																<div className="w-8 h-8 bg-gradient-to-br from-[#FFFFE3]/20 to-[#FFFFE3]/5 rounded-lg flex items-center justify-center">
																	<span className="text-xs font-bold text-[#FFFFE3]">
																		{transfer.token.slice(
																			0,
																			2
																		)}
																	</span>
																</div>
																<span className="font-semibold text-[#FFFFE3] text-lg">
																	{
																		transfer.token
																	}
																</span>
															</div>
															<span
																className={`font-bold font-mono text-lg px-3 py-1 rounded-lg ${
																	transfer.amount.startsWith(
																		'-'
																	)
																		? 'text-red-400 bg-red-400/10'
																		: 'text-green-400 bg-green-400/10'
																}`}
															>
																{
																	transfer.amount
																}
															</span>
														</div>

														<div className="space-y-3">
															<div className="flex items-center justify-between p-3 bg-[#333]/20 rounded-lg border border-[#333]/30">
																<span className="text-xs font-semibold text-[#FFFFE3]/50 uppercase tracking-wider">
																	From
																</span>
																<div className="flex items-center space-x-2">
																	<div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
																	<span className="text-sm font-mono text-[#FFFFE3]/90 bg-[#333]/30 px-2 py-1 rounded">
																		{transfer.from.slice(
																			0,
																			6
																		)}
																		...
																		{transfer.from.slice(
																			-6
																		)}
																	</span>
																</div>
															</div>

															<div className="flex justify-center">
																<FiArrowRight className="w-5 h-5 text-[#FFFFE3]/30" />
															</div>

															<div className="flex items-center justify-between p-3 bg-[#333]/20 rounded-lg border border-[#333]/30">
																<span className="text-xs font-semibold text-[#FFFFE3]/50 uppercase tracking-wider">
																	To
																</span>
																<div className="flex items-center space-x-2">
																	<div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
																	<span className="text-sm font-mono text-[#FFFFE3]/90 bg-[#333]/30 px-2 py-1 rounded">
																		{transfer.to.slice(
																			0,
																			6
																		)}
																		...
																		{transfer.to.slice(
																			-6
																		)}
																	</span>
																</div>
															</div>
														</div>
													</div>
												</motion.div>
											)
										)}
									</motion.div>
								) : (
									<motion.div
										key="timeline"
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -20 }}
										transition={{ duration: 0.2 }}
										className="space-y-4"
									>
										{[...txDetails.transfers.events]
											.reverse()
											.map((event, index) => (
												<motion.div
													key={index}
													initial={{
														opacity: 0,
														y: 20,
													}}
													animate={{
														opacity: 1,
														y: 0,
													}}
													transition={{
														delay: index * 0.1,
													}}
													className="group relative bg-gradient-to-br from-[#333]/30 to-[#333]/10 backdrop-blur-sm border border-[#444]/50 rounded-xl p-5 hover:border-[#FFFFE3]/20 transition-all duration-300"
												>
													<div className="absolute -left-3 top-6 w-6 h-6 bg-gradient-to-br from-[#FFFFE3] to-[#FFFFB3] rounded-full border-4 border-[#1A1916] flex items-center justify-center">
														<div className="w-2 h-2 bg-[#11110E] rounded-full" />
													</div>

													{index <
														txDetails.transfers
															.events.length -
															1 && (
														<div className="absolute -left-0.5 top-12 w-0.5 h-full bg-gradient-to-b from-[#FFFFE3]/30 to-transparent" />
													)}

													<div className="relative ml-6">
														<div className="flex justify-between items-center mb-4">
															<div className="flex items-center space-x-3">
																<FiClock className="w-4 h-4 text-[#FFFFE3]/60" />
																<span className="font-semibold text-[#FFFFE3] text-lg">
																	{event.name}
																</span>
															</div>
															<div className="text-right">
																<div className="text-sm font-mono text-[#FFFFE3]/90 bg-[#333]/30 px-3 py-1 rounded-lg">
																	{new Date(
																		event.timestamp *
																			1000
																	).toLocaleTimeString(
																		'en-US',
																		{
																			hour: '2-digit',
																			minute: '2-digit',
																			hour12: false,
																		}
																	)}
																</div>
															</div>
														</div>

														<div className="space-y-3">
															<div className="flex items-center justify-between p-3 bg-[#333]/20 rounded-lg border border-[#333]/30">
																<span className="text-xs font-semibold text-[#FFFFE3]/50 uppercase tracking-wider">
																	Address
																</span>
																<span className="text-sm font-mono text-[#FFFFE3]/90 bg-[#333]/30 px-2 py-1 rounded">
																	{event.from.slice(
																		0,
																		6
																	)}
																	...
																	{event.from.slice(
																		-6
																	)}
																</span>
															</div>

															{event.contractAlias && (
																<div className="flex items-center justify-between p-3 bg-blue-400/10 rounded-lg border border-blue-400/20">
																	<span className="text-xs font-semibold text-blue-400/70 uppercase tracking-wider">
																		Contract
																	</span>
																	<span className="text-sm text-blue-400 font-semibold bg-blue-400/10 px-3 py-1 rounded-lg">
																		{
																			event.contractAlias
																		}
																	</span>
																</div>
															)}
														</div>
													</div>
												</motion.div>
											))}
									</motion.div>
								)}
							</AnimatePresence>
						</div>

						<div className="relative p-6 pt-4 border-t border-[#333]/30 bg-gradient-to-r from-[#1A1916]/50 to-[#1E1C19]/50 backdrop-blur-sm">
							<button
								onClick={onClose}
								className="w-full border-2 border-[#EAE5DC] px-8 py-4 text-lg rounded-lg hover:bg-[#EAE5DC]/10 hover:scale-105 transition-all duration-300 items-center justify-center gap-3 backdrop-blur-sm flex"
							>
								<span className="text-[#EAE5DC] text-xl font-bold">
									×
								</span>
								<span>Close Details</span>
							</button>
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
}
