'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import LoginModal from '../modals/Login';
import { LoginButton, UserDropdown } from './UserProfleButton';
import { useAtom } from 'jotai';
import { useUserWallet } from '../lib/atoms/userWallet';
import { ramagothicbold } from '../lib/fonts';

function Header() {
	const [isLoginOpen, setIsLoginOpen] = useState(false);
	const [userWallet] = useAtom(useUserWallet);

	return (
		<>
			<header className="w-full fixed top-0 left-0 z-50 px-4 py-4 md:px-8 md:py-6">
				<div className="container mx-auto max-w-6xl">
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="bg-[#2A2A2A]/90 backdrop-blur-md rounded-2xl px-6 py-2 md:px-8 md:py-3 border border-gray-700/50"
					>
						<div className="flex items-center justify-between">
							{/* Logo */}
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.5, delay: 0.2 }}
								className="flex items-center"
							>
								<Link href="/">
									<Image
										src="/images/CavosLogo.png"
										alt="Cavos Logo"
										width={28}
										height={28}
										className="cursor-pointer"
									/>
								</Link>
							</motion.div>

							{/* Navigation Links */}
							<nav className="hidden md:flex items-center space-x-8 lg:space-x-12">
								{/* <Link href="/dashboard">
									<motion.span
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										className="text-white/90 hover:text-white transition-colors duration-300 cursor-pointer text-lg font-medium"
									>
										Dashboard
									</motion.span>
								</Link> */}
								<Link href="/cavos-card">
									<motion.span
										whileTap={{ scale: 0.95 }}
										className="hover:text-white transition-colors duration-300 cursor-pointer text-lg font-medium"
									>
										<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 25 25">
											<path d="M4.5 10.5H20.5M4.5 9.5H20.5M4.5 11.5H20.5M7 15.5H14M5.5 18.5H19.5C20.0523 18.5 20.5 18.0523 20.5 17.5V7.5C20.5 6.94772 20.0523 6.5 19.5 6.5H5.5C4.94772 6.5 4.5 6.94772 4.5 7.5V17.5C4.5 18.0523 4.94772 18.5 5.5 18.5Z" stroke="currentColor" strokeWidth="1.2" />
										</svg>
									</motion.span>
								</Link>
								{/* <Link href="/investments">
									<motion.span
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										className="text-white/90 hover:text-white transition-colors duration-300 cursor-pointer text-lg font-medium"
									>
										Investments
									</motion.span>
								</Link> */}
							</nav>

							{/* Login Button */}
							{/* <div className="flex items-center">
								{userWallet ? (
									<UserDropdown />
								) : (
									<motion.button
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										onClick={() => setIsLoginOpen(true)}
										className={"border-2 border-white px-6 py-2 md:px-8 md:py-3 hover:bg-white hover:text-black transition-all duration-300 cursor-pointer text-lg font-medium tracking-wide rounded-xl" }
									>
										LOGIN
									</motion.button>
								)}
							</div> */}

							{/* Mobile Menu Button */}
							<div className="md:hidden">
								<button className="text-white p-2">
									<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
									</svg>
								</button>
							</div>
						</div>
					</motion.div>
				</div>
			</header>
			<LoginModal
				isOpen={isLoginOpen}
				onClose={() => setIsLoginOpen(false)}
			/>
		</>
	);
}

export default Header;