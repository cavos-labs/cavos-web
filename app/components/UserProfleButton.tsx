"use client";
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserWallet } from '../lib/atoms/userWallet';
import { useAtom } from 'jotai';
import { ChevronDown, LogOut, Copy, Check } from 'lucide-react';

export function UserDropdown() {
    const [userWallet, setUserWallet] = useAtom(useUserWallet);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = async () => {
        // Aquí iría tu lógica de logout con Supabase
        setUserWallet(null);
        setIsDropdownOpen(false);
    };

    const copyToClipboard = () => {
        if (!userWallet?.address) return;
        
        navigator.clipboard.writeText(userWallet.address);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const formatAddress = (address: string) => {
        if (!address) return '';
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    };

    if (!userWallet) return null;

    return (
        <div className="relative" ref={dropdownRef}>
            <motion.button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-4 py-2 bg-[#FFFFE3] text-[#11110E] font-medium  flex items-center gap-2"
                whileTap={{ scale: 0.98 }}
            >
                {userWallet.user_name}
                <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                />
            </motion.button>

            <AnimatePresence>
                {isDropdownOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-60 bg-[#11110E] border border-[#FFFFE3]/20  shadow-lg overflow-hidden z-50"
                    >
                        <div className="p-4 border-b border-[#FFFFE3]/30">
                            <div className="text-[#FFFFE3]/80 text-sm mb-1">
                                Logged in as
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-white text-sm truncate">
                                    {userWallet.user_name}
                                </p>
                            </div>
                        </div>
                        <div className="p-4 border-b border-[#FFFFE3]/30">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-[#FFFFE3]/80 text-sm mb-1">Address</p>
                                    <p className="text-white text-sm truncate">
                                        {formatAddress(userWallet.address)}
                                    </p>
                                </div>
                                <motion.button
                                    onClick={copyToClipboard}
                                    whileTap={{ scale: 0.95 }}
                                    className="text-[#FFFFE3]/70 hover:text-[#FFFFE3] transition-colors p-1"
                                    title="Copy to clipboard"
                                >
                                    {copied ? (
                                        <Check className="w-4 h-4 text-green-400" />
                                    ) : (
                                        <Copy className="w-4 h-4" />
                                    )}
                                </motion.button>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full p-3 flex items-center gap-2 text-[#FFFFE3] hover:bg-[#FFFFE3]/10 transition-colors duration-300 cursor-pointer"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function LoginButton({ onClick }: { onClick: () => void }) {
    return (
        <motion.button
            onClick={onClick}
            className="px-8 py-2 bg-[#FFFFE3] text-[#11110E] font-medium "
            whileTap={{ scale: 0.98 }}
        >
            Login
        </motion.button>
    );
}
