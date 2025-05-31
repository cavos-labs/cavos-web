'use client';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/legacy/image';
import { motion } from 'framer-motion';
import axios from 'axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function CardWaitlist() {
	const [email, setEmail] = useState('');
	const [country, setCountry] = useState('');
	const [countryList, setCountryList] = useState<string[]>([]);
	const [submitted, setSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);
	const waitlistRef = useRef<HTMLDivElement>(null);

	// Fetch country list for autocomplete
	useEffect(() => {
		fetch('https://restcountries.com/v3.1/all')
			.then((res) => res.json())
			.then((data) =>
				setCountryList(data.map((c: any) => c.name.common).sort())
			);
	}, []);

	// Fetch user's country by IP
	useEffect(() => {
		fetch('https://ipapi.co/json/')
			.then((res) => res.json())
			.then((data) => {
				if (data && data.country_name) setCountry(data.country_name);
			});
	}, []);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setLoading(true);
		try {
			await axios.post(`/api/cavos/card/waitlist`, {
				email,
				country,
			});
			setSubmitted(true);
		} catch (error) {
			console.error('Error submitting form:', error);
		} finally {
			setLoading(false);
		}
	};

	// Animated background particles
	const particleVariants = {
		animate: {
			y: [0, -100, 0],
			opacity: [0, 1, 0],
			transition: {
				duration: 6,
				repeat: Infinity,
				ease: 'easeInOut',
			},
		},
	};

	return (
		<>
			<div className="min-h-screen relative overflow-hidden">
				{/* Subtle Animated Background Elements */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					{/* Subtle white orbs */}
					<motion.div
						className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"
						animate={{
							scale: [1, 1.2, 1],
							opacity: [0.05, 0.1, 0.05],
						}}
						transition={{
							duration: 8,
							repeat: Infinity,
							ease: 'easeInOut',
						}}
					/>
					<motion.div
						className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl"
						animate={{
							scale: [1.2, 1, 1.2],
							opacity: [0.08, 0.03, 0.08],
						}}
						transition={{
							duration: 10,
							repeat: Infinity,
							ease: 'easeInOut',
						}}
					/>

					{/* Floating white particles */}
					{[...Array(6)].map((_, i) => (
						<motion.div
							key={i}
							className="absolute w-1 h-1 bg-white/30 rounded-full"
							style={{
								left: `${Math.random() * 100}%`,
								top: `${Math.random() * 100}%`,
							}}
							variants={particleVariants}
							animate="animate"
							transition={{
								delay: i * 1.2,
							}}
						/>
					))}
				</div>

				<Header />
				<main className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
					{/* Hero Section */}
					<section className="text-center py-16 md:py-24">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7, delay: 0.2 }}
							className="mb-12"
						>
							{/* Simple status badge */}
							<motion.div
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.6 }}
								className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8"
							>
								<div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
								<span className="text-sm font-medium text-white/80 tracking-wide">
									EARLY ACCESS
								</span>
							</motion.div>

							<motion.h1
								className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight tracking-wide"
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.3 }}
							>
								VIRTUAL CARD WAITLIST
							</motion.h1>

							<motion.h2
								className="text-xl md:text-3xl mb-8 font-medium tracking-wide max-w-4xl mx-auto leading-relaxed"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.7, delay: 0.5 }}
							>
								Get your Cavos virtual card before anyone else
								and experience the future of payments
							</motion.h2>
						</motion.div>

						{/* Card Image with Enhanced Effects */}
						<motion.div
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 1,
								delay: 0.8,
								type: 'spring',
								stiffness: 100,
							}}
							className="mt-16 flex justify-center relative"
						>
							{/* Subtle glow effect */}
							<div className="absolute inset-0 bg-white/10 blur-3xl scale-75 opacity-20"></div>

							<motion.div
								className="relative w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]"
								whileHover={{
									scale: 1.05,
									y: -10,
								}}
								transition={{
									type: 'spring',
									stiffness: 300,
									damping: 30,
								}}
							>
								<Image
									src="/images/CavosCard.png"
									alt="Cavos Virtual Card"
									layout="fill"
									objectFit="contain"
									className="drop-shadow-2xl filter brightness-110"
								/>

								{/* Subtle floating elements */}
								<motion.div
									className="absolute -top-4 -right-4 w-3 h-3 bg-white/40 rounded-full"
									animate={{
										y: [0, -15, 0],
										opacity: [0.4, 0.8, 0.4],
									}}
									transition={{
										duration: 3,
										repeat: Infinity,
										ease: 'easeInOut',
									}}
								/>
								<motion.div
									className="absolute -bottom-6 -left-6 w-2 h-2 bg-white/30 rounded-full"
									animate={{
										y: [0, 12, 0],
										opacity: [0.3, 0.6, 0.3],
									}}
									transition={{
										duration: 4,
										repeat: Infinity,
										ease: 'easeInOut',
										delay: 1,
									}}
								/>
							</motion.div>
						</motion.div>
					</section>

					{/* Waitlist Section */}
					<motion.section
						ref={waitlistRef}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.7 }}
						className="py-20 md:py-32 border-t border-white/20 relative"
					>
						{/* Subtle section background */}
						<div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/2 to-transparent"></div>

						<div className="text-center mb-12 md:mb-16 relative z-10">
							<motion.h2
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.7 }}
								className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-wide"
							>
								JOIN THE WAITLIST
							</motion.h2>
							<motion.p
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.7, delay: 0.2 }}
								className="text-xl md:text-2xl font-medium max-w-3xl mx-auto text-white/80 leading-relaxed"
							>
								Be the first to get your Cavos virtual card and
								unlock seamless crypto payments worldwide.
							</motion.p>
						</div>

						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.4 }}
							className="max-w-2xl mx-auto relative z-10"
						>
							<form onSubmit={handleSubmit} className="space-y-6">
								<div className="flex flex-col sm:flex-row gap-4 md:gap-6">
									<motion.div
										className="flex-1 relative group"
										whileFocus={{ scale: 1.01 }}
									>
										<input
											type="email"
											placeholder="Enter your email address"
											className="w-full bg-white/5 backdrop-blur-sm border-2 border-white/20 px-6 py-4 md:px-8 md:py-5 focus:outline-none focus:border-white/60 focus:bg-white/10 text-g md:text-lg placeholder-white/50 rounded-xl transition-all duration-300 group-hover:border-white/30 hover:bg-white/8"
											value={email}
											onChange={(e) =>
												setEmail(e.target.value)
											}
											required
										/>
										<div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
									</motion.div>
									<motion.div
										className="flex-1 relative group"
										whileFocus={{ scale: 1.01 }}
									>
										<input
											type="text"
											list="country-list"
											placeholder="Country"
											className="w-full bg-white/5 backdrop-blur-sm border-2 border-white/20 px-6 py-4 md:px-8 md:py-5 focus:outline-none focus:border-white/60 focus:bg-white/10 text-lg md:text-xl placeholder-white/50 rounded-xl transition-all duration-300 group-hover:border-white/30 hover:bg-white/8"
											value={country}
											onChange={(e) =>
												setCountry(e.target.value)
											}
											required
										/>
										<datalist id="country-list">
											{countryList.map((c) => (
												<option key={c} value={c} />
											))}
										</datalist>
										<div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
									</motion.div>

									<motion.button
										whileTap={{ scale: 0.95 }}
										whileHover={{ scale: 1.02, y: -2 }}
										disabled={submitted || loading}
										type="submit"
									>
										<span className="relative z-10">
											{loading
												? 'Joining...'
												: submitted
													? 'Welcome!'
													: 'Join Now'}
										</span>
										{!submitted && !loading && (
											<motion.div
												className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100"
												initial={{ x: '-100%' }}
												whileHover={{ x: '100%' }}
												transition={{ duration: 0.6 }}
											/>
										)}
									</motion.button>
								</div>

								{submitted && (
									<motion.div
										initial={{
											opacity: 0,
											y: 20,
											scale: 0.9,
										}}
										animate={{ opacity: 1, y: 0, scale: 1 }}
										transition={{
											type: 'spring',
											stiffness: 200,
										}}
										className="text-center p-6 bg-green-500/10 border border-green-500/20 rounded-xl backdrop-blur-sm relative overflow-hidden"
									>
										<div className="absolute inset-0 bg-green-400/5 animate-pulse"></div>
										<div className="relative z-10">
											<p className="text-lg md:text-xl font-medium text-green-400 mb-2">
												You're in! Welcome to the future
												of payments.
											</p>
											<p className="text-sm text-green-300/80">
												We'll notify you as soon as the
												Cavos virtual card is ready.
											</p>
										</div>
									</motion.div>
								)}
							</form>

							{/* Additional Info */}
							<motion.div
								className="mt-8 text-center"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 1 }}
							>
								<p className="text-white/50 text-sm">
									Join{' '}
									<span className="text-white font-semibold">
										1000+
									</span>{' '}
									early adopters already on the waitlist
								</p>
							</motion.div>
						</motion.div>
					</motion.section>
				</main>
				<Footer />
			</div>
		</>
	);
}
