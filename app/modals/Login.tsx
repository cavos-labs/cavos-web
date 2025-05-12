"use client";
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { supabase } from '../lib/supabase';
import { useUserWallet } from '../lib/atoms/userWallet';
import { useAtom, useSetAtom } from 'jotai';
import axios from 'axios';
import { ChevronDown, LogOut } from 'lucide-react';

export default function LoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [step, setStep] = useState<1 | 2>(1);
    const [username, setUsername] = useState('');
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [userId, setUserId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const setUserWallet = useSetAtom(useUserWallet);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleUsernameSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        try {
            const response = await axios.post(`/api/cavos/login`, {
                username,
            });
            const phoneData = response.data.data;
            if (phoneData && phoneData[0] && phoneData[0].phone && phoneData[0].uid) {
                setPhoneNumber(phoneData[0].phone);
                setUserId(phoneData[0].uid);
                const { error: otpError } = await supabase.auth.signInWithOtp({
                    phone: phoneData[0].phone,
                });

                if (otpError) {
                    setErrorMessage('Failed to send OTP. Please try again later.');
                } else {
                    setStep(2);
                }
            } else {
                setErrorMessage('Phone number not found for this user.');
            }
        } catch (error) {
            setErrorMessage('An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        try {
            const { error } = await supabase.auth.verifyOtp({
                phone: phoneNumber,
                token: otp,
                type: 'sms',
            });
            if (error) {
                setErrorMessage('Wrong code. Please try again.');
            } else {
                const response = await axios.post(`/api/cavos/wallet`, {
                    userId,
                });
                const data = response.data.data;
                if (data && data[0]) {
                    setUserWallet(data[0]);
                } else {
                    setErrorMessage("Something went wrong, please try again.");
                }
                setUsername('');
                setOtp('');
                setStep(1);
                onClose();
            }
        } catch (error) {
            setErrorMessage('An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: 'spring', damping: 25 }}
                        className="relative bg-[#11110E] border border-[#FFFFE3]/20 rounded-xl max-w-md w-full mx-4 overflow-hidden"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-[#FFFFE3] hover:text-white transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>

                        <div className="p-8">
                            <div className="flex justify-center mb-6">
                                <Image
                                    src="/images/CavosLogo.png"
                                    alt="Cavos Logo"
                                    width={50}
                                    height={45}
                                />
                            </div>

                            {step === 1 ? (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <h2 className="text-2xl font-bold text-[#FFFFE3] mb-2">Welcome back</h2>
                                    <p className="text-[#FFFFE3]/80 mb-6">Enter your username to continue</p>

                                    {errorMessage && (
                                        <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
                                    )}

                                    <form onSubmit={handleUsernameSubmit}>
                                        <div className="mb-6">
                                            <label htmlFor="username" className="block text-sm text-[#FFFFE3]/80 mb-2">Username</label>
                                            <input
                                                type="text"
                                                id="username"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                className="w-full bg-[#11110E] border border-[#FFFFE3]/30 px-4 py-3 text-[#FFFFE3] focus:outline-none focus:ring-1 focus:ring-[#FFFFE3]/50"
                                                required
                                                autoFocus
                                            />
                                        </div>

                                        <motion.button
                                            whileTap={{ scale: 0.98 }}
                                            type="submit"
                                            disabled={isLoading}
                                            className={`w-full bg-[#FFFFE3] text-[#11110E] py-3 font-medium ${isLoading ? 'opacity-80' : ''}`}
                                        >
                                            {isLoading ? 'Sending OTP...' : 'Continue'}
                                        </motion.button>
                                    </form>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <h2 className="text-2xl font-bold text-[#FFFFE3] mb-2">Verify your identity</h2>
                                    <p className="text-[#FFFFE3]/80 mb-6">
                                        We've sent a 6-digit code to your mobile device
                                    </p>

                                    {errorMessage && (
                                        <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
                                    )}

                                    <form onSubmit={handleOtpSubmit}>
                                        <div className="mb-6">
                                            <label htmlFor="otp" className="block text-sm text-[#FFFFE3]/80 mb-2">OTP Code</label>
                                            <input
                                                type="text"
                                                id="otp"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                                className="w-full bg-[#11110E] border border-[#FFFFE3]/30 rounded-lg px-4 py-3 text-[#FFFFE3] focus:outline-none focus:ring-1 focus:ring-[#FFFFE3]/50 text-center tracking-widest"
                                                required
                                                autoFocus
                                                maxLength={6}
                                                pattern="\d{6}"
                                                inputMode="numeric"
                                            />
                                        </div>

                                        <div className="flex items-center justify-between mb-6">
                                            <button
                                                type="button"
                                                onClick={() => setStep(1)}
                                                className="text-sm text-[#FFFFE3]/60 hover:text-[#FFFFE3] transition-colors"
                                            >
                                                ← Back
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleUsernameSubmit}
                                                className="text-sm text-[#FFFFE3]/60 hover:text-[#FFFFE3] transition-colors"
                                            >
                                                Resend code
                                            </button>
                                        </div>

                                        <motion.button
                                            whileTap={{ scale: 0.98 }}
                                            type="submit"
                                            disabled={isLoading || otp.length !== 6}
                                            className={`w-full bg-[#FFFFE3] text-[#11110E] py-3 rounded-lg font-medium ${isLoading || otp.length !== 6 ? 'opacity-80' : ''}`}
                                        >
                                            {isLoading ? 'Verifying...' : 'Login'}
                                        </motion.button>
                                    </form>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
