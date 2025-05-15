'use client';
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	FiX,
	FiAlertCircle,
	FiCheckCircle,
	FiHelpCircle,
} from 'react-icons/fi';
import { AlertModalProps } from '../lib/types/AlertModalProps';

export default function AlertModal({
	isOpen,
	onClose,
	title,
	message,
	type = 'info',
	confirmText = 'OK',
	cancelText = 'Cancel',
	onConfirm,
	showCancel = false,
}: AlertModalProps) {
	const modalRef = useRef<HTMLDivElement>(null);

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

	const getIcon = () => {
		switch (type) {
			case 'success':
				return <FiCheckCircle size={32} className="text-green-400" />;
			case 'error':
				return <FiAlertCircle size={32} className="text-red-400" />;
			case 'confirm':
				return <FiHelpCircle size={32} className="text-[#FFFFE3]" />;
			default:
				return <FiAlertCircle size={32} className="text-[#FFFFE3]" />;
		}
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center">
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="absolute inset-0 bg-black/70"
					/>

					<motion.div
						ref={modalRef}
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						transition={{
							type: 'spring',
							damping: 20,
							stiffness: 300,
						}}
						className="bg-[#1A1916] border border-[#333] rounded-lg w-full max-w-md mx-4 z-10 shadow-xl overflow-hidden"
					>
						<div className="flex justify-between items-center p-5 border-b border-[#333]">
							<div className="flex items-center">
								{getIcon()}
								<h3 className="ml-3 text-xl font-medium text-[#FFFFE3]">
									{title}
								</h3>
							</div>
							<button
								onClick={onClose}
								className="text-[#555] hover:text-[#FFFFE3] transition-colors"
							>
								<FiX size={24} />
							</button>
						</div>

						<div className="p-6">
							<p className="text-[#FFFFE3]/80 mb-6">{message}</p>

							<div className="flex justify-end space-x-3">
								{showCancel && (
									<button
										onClick={onClose}
										className="px-4 py-2 border border-[#333] rounded text-[#FFFFE3]/70 hover:bg-[#333] transition-colors"
									>
										{cancelText}
									</button>
								)}

								<button
									onClick={() => {
										onConfirm();
										if (!showCancel) onClose();
									}}
									className="px-4 py-2 bg-[#FFFFE3] text-[#11110E] rounded hover:bg-[#FFFFB3] transition-colors"
								>
									{confirmText}
								</button>
							</div>
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
}
