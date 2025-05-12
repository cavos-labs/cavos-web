"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Dashboard() {
    return (
        <div className="min-h-screen text-white bg-[#11110E]">
            <Header />

            <main className="container mx-auto px-4 py-20 md:py-24">
                {/* Card Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <div className="relative w-full max-w-md mx-auto h-52 bg-black rounded-xl overflow-hidden border border-[#FFFFE3]">
                        <div className="absolute top-6 left-6">
                            <Image
                                src="/images/CavosLogo.png"
                                alt="Cavos Logo"
                                width={40}
                                height={40}
                            />
                        </div>
                        <div className="absolute bottom-6 right-6">
                            <Image
                                src="/images/Visa.png"
                                alt="Visa"
                                width={70}
                                height={24}
                            />
                        </div>
                        <div className="absolute top-1/2 left-6 transform -translate-y-1/2">
                            <p className="text-[#FFFFE3]/80 text-sm mb-1">YOUR BALANCE</p>
                            <p className="text-2xl font-bold">23.12 USD</p>
                        </div>
                    </div>
                </motion.section>

                {/* Action Buttons */}
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex justify-center gap-4 mb-12"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="border border-[#FFFFE3] px-6 py-2 hover:bg-[#FFFFE3] hover:text-[#11110E] transition-colors duration-300"
                    >
                        Buy
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="border border-[#FFFFE3] px-6 py-2 hover:bg-[#FFFFE3] hover:text-[#11110E] transition-colors duration-300"
                    >
                        Send
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="border border-[#FFFFE3] px-6 py-2 hover:bg-[#FFFFE3] hover:text-[#11110E] transition-colors duration-300"
                    >
                        Invest
                    </motion.button>
                </motion.section>

                {/* Transactions Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="max-w-md mx-auto"
                >
                    <h2 className="text-xl font-bold mb-6 border-b border-[#FFFFE3]/20 pb-2">TRANSACTIONS</h2>

                    <div className="space-y-4">
                        {/* Transaction 1 */}
                        <div className="flex justify-between items-center border-b border-[#FFFFE3]/10 pb-3">
                            <div className="flex items-center gap-3">
                                <div className="bg-[#FFFFE3]/10 p-2 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFE3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="12" y1="19" x2="12" y2="5"></line>
                                        <polyline points="5 12 12 5 19 12"></polyline>
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium">Invest</p>
                                    <p className="text-sm text-[#FFFFE3]/60">0x3b...d4d3</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-red-400">-1.00 USD</p>
                                <p className="text-sm text-[#FFFFE3]/60">9 May 2025 at 08:25</p>
                            </div>
                        </div>

                        {/* Transaction 2 */}
                        <div className="flex justify-between items-center border-b border-[#FFFFE3]/10 pb-3">
                            <div className="flex items-center gap-3">
                                <div className="bg-[#FFFFE3]/10 p-2 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFE3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <polyline points="19 12 12 19 5 12"></polyline>
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium">Send</p>
                                    <p className="text-sm text-[#FFFFE3]/60">0x6e...db94</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-red-400">-1.00 USD</p>
                                <p className="text-sm text-[#FFFFE3]/60">7 May 2025 at 11:52</p>
                            </div>
                        </div>

                        {/* Transaction 3 */}
                        <div className="flex justify-between items-center border-b border-[#FFFFE3]/10 pb-3">
                            <div className="flex items-center gap-3">
                                <div className="bg-[#FFFFE3]/10 p-2 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFE3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="12" y1="19" x2="12" y2="5"></line>
                                        <polyline points="5 12 12 5 19 12"></polyline>
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium">Invest</p>
                                    <p className="text-sm text-[#FFFFE3]/60">0x8d...f947</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-red-400">-0.80 USD</p>
                                <p className="text-sm text-[#FFFFE3]/60">7 May 2025 at 22:45</p>
                            </div>
                        </div>
                    </div>
                </motion.section>
            </main>
            <Footer/>
        </div>
    );
}
