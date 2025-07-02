'use client';
import Image from 'next/legacy/image';
import { useState } from 'react';

function Header({ scrollToWaitlist }: { scrollToWaitlist: () => void }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	return (
		<>
			<header className="container mx-auto px-6 py-6 flex justify-between items-center backdrop-blur-sm relative z-50">
				<div className="flex items-center gap-2">
					<div className="relative">
						<Image src="/images/CavosLogo.png" alt="Cavos" width={26} height={32} />
					</div>
					<h1 className="font-bold text-3xl text-[#EAE5DC] tracking-tight">CAVOS</h1>
				</div>

				{/* Desktop Navigation */}
				<nav className="hidden md:flex items-center gap-8">
					<a href="/" className="hover:text-[#EAE5DC] transition-all duration-300 relative group">
						Home
						<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#EAE5DC] transition-all duration-300 group-hover:w-full"></span>
					</a>
					<a href="/card/waitlist" className="hover:text-[#EAE5DC] transition-all duration-300 relative group">
						Card
						<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#EAE5DC] transition-all duration-300 group-hover:w-full"></span>
					</a>
					<a href="https://services.cavos.xyz/" target="_blank" className="hover:text-[#EAE5DC] transition-all duration-300 relative group">
						Services
						<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#EAE5DC] transition-all duration-300 group-hover:w-full"></span>
					</a>
					<a href="#" className="hover:text-[#EAE5DC] transition-all duration-300 relative group">
						Merchants
						<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#EAE5DC] transition-all duration-300 group-hover:w-full"></span>
					</a>
				</nav>

				{/* Desktop Early Access Button */}
				<button
					onClick={scrollToWaitlist}
					className="hidden md:flex border-2 border-[#EAE5DC] px-8 py-4 text-lg rounded-lg hover:bg-[#EAE5DC]/10 hover:scale-105 transition-all duration-300 items-center justify-center gap-2 backdrop-blur-sm">
					Early Access
				</button>

				{/* Mobile Hamburger Button */}
				<button
					onClick={toggleMenu}
					className="md:hidden flex flex-col gap-1.5 p-2 transition-all duration-300 hamburger"
					aria-label="Toggle menu">
					<span className={`w-6 h-0.5 bg-[#EAE5DC] transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
					<span className={`w-6 h-0.5 bg-[#EAE5DC] transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
					<span className={`w-6 h-0.5 bg-[#EAE5DC] transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
				</button>
			</header>

			{/* Mobile Menu Overlay */}
			<div 
				className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
					isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
				}`}
				onClick={closeMenu}
			></div>

			{/* Mobile Menu Panel */}
			<div className={`fixed top-0 right-0 h-full w-80 max-w-[80vw] bg-gradient-to-b from-black/95 to-black/90 backdrop-blur-xl z-50 md:hidden transition-transform duration-300 ease-in-out ${
				isMenuOpen ? 'translate-x-0' : 'translate-x-full'
			}`}>
				<div className="flex flex-col h-full">
					{/* Close Button */}
					<div className="flex justify-end p-6">
						<button
							onClick={closeMenu}
							className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 hamburger"
							aria-label="Close menu">
							<svg className="w-6 h-6 text-[#EAE5DC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>

					{/* Navigation Links */}
					<nav className="flex flex-col gap-2 px-6 py-4">
						<a 
							href="/" 
							onClick={closeMenu}
							className="text-[#EAE5DC] text-xl py-4 px-4 rounded-lg hover:bg-white/10 transition-all duration-200 border-b border-white/10">
							Home
						</a>
						<a 
							href="/card/waitlist" 
							onClick={closeMenu}
							className="text-[#EAE5DC] text-xl py-4 px-4 rounded-lg hover:bg-white/10 transition-all duration-200 border-b border-white/10">
							Card
						</a>
						<a 
							href="https://services.cavos.xyz/" 
							target="_blank"
							onClick={closeMenu}
							className="text-[#EAE5DC] text-xl py-4 px-4 rounded-lg hover:bg-white/10 transition-all duration-200 border-b border-white/10">
							Services
						</a>
						<a 
							href="#" 
							onClick={closeMenu}
							className="text-[#EAE5DC] text-xl py-4 px-4 rounded-lg hover:bg-white/10 transition-all duration-200 border-b border-white/10">
							Merchants
						</a>
					</nav>
				</div>
			</div>
		</>
	);
}

export default Header;
