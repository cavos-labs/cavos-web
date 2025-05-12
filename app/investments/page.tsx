"use client"

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Investments() {
    const [showClaimSuccess, setShowClaimSuccess] = useState(false);

    const handleClaimRewards = () => {
        setShowClaimSuccess(true);
        setTimeout(() => setShowClaimSuccess(false), 3000);
    };

    return (
        <div className="min-h-screen bg-[#11110E] text-white flex flex-col">
            <Header />

            {/* Main content */}
            <main className="flex-1 p-4 my-36 md:p-6 container mx-auto max-w-lg">
                {/* Investment summary card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="bg-[#1A1A17] rounded-lg p-6 shadow-lg mb-6"
                >
                    <h2 className="text-xl text-center text-gray-300 mb-8">INVESTMENT SUMMARY</h2>

                    <div className="flex justify-between mb-8">
                        <div className="flex flex-col items-center">
                            <div className="w-14 h-14 bg-[#2A2A27] rounded-full flex items-center justify-center mb-4">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 17L9 11L13 15L21 7" stroke="#FFFFE3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M15 7H21V13" stroke="#FFFFE3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <span className="text-gray-300 text-sm mb-1">Total Invested</span>
                            <span className="text-2xl font-bold">$11.43 USDC</span>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="w-14 h-14 bg-[#2A2A27] rounded-full flex items-center justify-center mb-4">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 20V10" stroke="#FFFFE3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 20V4" stroke="#FFFFE3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M6 20V14" stroke="#FFFFE3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <span className="text-gray-300 text-sm mb-1">Current APY</span>
                            <span className="text-2xl font-bold">6.52%</span>
                        </div>
                    </div>

                    {/* Claim rewards button */}
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleClaimRewards}
                        className="w-full py-3 bg-[#FFFFE3] text-[#11110E] font-medium rounded-md hover:bg-[#FFFFCF] transition-colors"
                    >
                        {showClaimSuccess ? "Rewards Claimed!" : "Claim Rewards"}
                    </motion.button>
                </motion.div>

                {/* Invest button */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 border border-[#FFFFE3] text-[#FFFFE3] font-medium text-lg rounded-md hover:bg-[#FFFFE3] hover:text-[#11110E] transition-colors"
                >
                    Invest
                </motion.button>
            </main>
            <Footer/>
        </div>
    );
}
