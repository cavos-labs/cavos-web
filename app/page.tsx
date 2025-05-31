'use client';
import { useRef, useState } from 'react';
import Image from 'next/legacy/image';
import { motion } from 'framer-motion';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';

export default function Home() {
	const [email, setEmail] = useState('');
	const [submitted, setSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);
	const waitlistRef = useRef<HTMLDivElement>(null);

	const scrollToWaitlist = () => {
		waitlistRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setLoading(true);
		try {
			await axios.post(`/api/cavos/waitlist`, {
				email,
			});
			setSubmitted(true);
		} catch (error) {
			console.error('Error submitting form:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<div className="min-h-screen">
				<Header />
				<main className="container mx-auto px-4 py-8 max-w-6xl">
					{/* Hero Section */}
					<section className="text-center py-16 md:py-24">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7, delay: 0.2 }}
							className="mb-12"
						>
							<h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight tracking-wide">
								BANKING, WITHOUT A BANK
							</h1>
							<h2 className="text-xl md:text-3xl mb-8 font-medium tracking-wide">
								INVEST IN CRYPTO THE SMART WAY
							</h2>
							<button
								onClick={scrollToWaitlist}
								className="border-2 border-white px-8 py-3 md:px-10 md:py-4 hover:bg-white hover:text-black transition-all duration-300 cursor-pointer text-lg font-medium tracking-wide"
							>
								Join the waitlist
							</button>
						</motion.div>

						{/* Visa Card */}
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.6 }}
							className="mt-16 flex justify-center"
						>
							<div className="relative w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
								<Image
									src="/images/CavosCard.png"
									alt="Cavos Card"
									layout="fill"
									objectFit="contain"
									className="drop-shadow-2xl"
								/>
							</div>
						</motion.div>
					</section>

					{/* Features Section */}
					<section className="py-20 md:py-32">
						<div className="text-center mb-16 md:mb-20">
							<motion.h2
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.7 }}
								className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-wide"
							>
								EVERYTHING YOU NEED
							</motion.h2>
							<motion.p
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.7, delay: 0.2 }}
								className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto"
							>
								All-in-one crypto banking solution for the
								modern world
							</motion.p>
						</div>

						<div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center">
							<motion.div
								initial={{ opacity: 0, x: -30 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8 }}
								className="flex-1 order-2 lg:order-1"
							>
								<div className="grid gap-8 md:gap-10">
									{[
										{
											title: 'Invest stable coins',
											subtitle: 'Secure wealth growth',
											delay: 0,
										},
										{
											title: 'Send payments to Cavos users via username/phone number',
											subtitle: 'Instant transfers',
											delay: 0.1,
										},
										{
											title: 'QR payments',
											subtitle: 'Scan and pay anywhere',
											delay: 0.2,
										},
										{
											title: 'Virtual cards in minutes',
											subtitle: 'Instant card generation',
											delay: 0.3,
										},
										{
											title: 'Buy, sell and invest in BTC with just one click',
											subtitle:
												'Seamless Bitcoin trading',
											delay: 0.4,
										},
									].map((feature, index) => (
										<motion.div
											key={index}
											initial={{ opacity: 0, x: -20 }}
											whileInView={{ opacity: 1, x: 0 }}
											transition={{
												duration: 0.6,
												delay: feature.delay,
											}}
											whileHover={{
												x: 20,
												transition: { duration: 0.3 },
											}}
											className="group relative"
										>
											{/* Background line that extends on hover */}
											<div className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-full bg-gradient-to-r from-white/5 to-transparent transition-all duration-500 ease-out"></div>

											{/* Animated dot */}
											<div className="flex items-start space-x-6">
												<motion.div
													className="relative mt-3 flex-shrink-0"
													whileHover={{ scale: 1.5 }}
													transition={{
														duration: 0.2,
													}}
												>
													<div className="w-3 h-3 bg-white rounded-full relative z-10"></div>
													<motion.div
														className="absolute inset-0 bg-white rounded-full opacity-30"
														animate={{
															scale: [1, 1.8, 1],
															opacity: [
																0.3, 0, 0.3,
															],
														}}
														transition={{
															duration: 2,
															repeat: Infinity,
															delay: index * 0.2,
														}}
													></motion.div>
												</motion.div>

												<div className="flex-1 relative z-10">
													<motion.h3
														className="text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed mb-2 group-hover:text-white transition-colors duration-300"
														initial={{
															opacity: 0.9,
														}}
														whileHover={{
															opacity: 1,
														}}
													>
														{feature.title}
													</motion.h3>
													<motion.p className="text-white/60 text-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
														{feature.subtitle}
													</motion.p>
												</div>

												{/* Arrow that appears on hover */}
												<motion.div
													className="opacity-0 group-hover:opacity-100 transition-all duration-300 mt-3"
													initial={{ x: -10 }}
													whileHover={{ x: 0 }}
												>
													<svg
														className="w-6 h-6 text-white/60"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M9 5l7 7-7 7"
														/>
													</svg>
												</motion.div>
											</div>
										</motion.div>
									))}
								</div>

								{/* Feature count indicator */}
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.8 }}
									className="mt-16 flex items-center justify-between border-t border-white/10 pt-8"
								>
									<div className="flex items-center space-x-4">
										<div className="flex space-x-1">
											{[...Array(5)].map((_, i) => (
												<motion.div
													key={i}
													className="w-2 h-2 bg-white rounded-full"
													initial={{ opacity: 0.3 }}
													animate={{
														opacity: [0.3, 1, 0.3],
													}}
													transition={{
														duration: 2,
														repeat: Infinity,
														delay: i * 0.2,
													}}
												></motion.div>
											))}
										</div>
										<span className="text-white/60 text-sm tracking-wider">
											5 CORE FEATURES
										</span>
									</div>
									<div className="text-white/40 text-sm font-medium">
										MORE COMING SOON
									</div>
								</motion.div>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, x: 30 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8, delay: 0.3 }}
								className="flex-1 flex justify-center order-1 lg:order-2 relative"
							>
								{/* Floating connection lines */}
								<div className="absolute inset-0 overflow-hidden pointer-events-none">
									{[...Array(3)].map((_, i) => (
										<motion.div
											key={i}
											className="absolute w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"
											style={{
												left: `${20 + i * 30}%`,
												height: '60%',
												top: '20%',
											}}
											initial={{ opacity: 0, scaleY: 0 }}
											whileInView={{
												opacity: 1,
												scaleY: 1,
											}}
											transition={{
												duration: 1.5,
												delay: i * 0.3,
												ease: 'easeOut',
											}}
										></motion.div>
									))}
								</div>

								{/* Phone mockup with subtle animations */}
								<motion.div
									className="relative w-[250px] h-[500px] md:w-[300px] md:h-[600px] lg:w-[350px] lg:h-[700px]"
									whileHover={{
										y: -10,
										transition: {
											duration: 0.4,
											ease: 'easeOut',
										},
									}}
								>
									{/* Subtle glow effect */}
									<motion.div
										className="absolute inset-0 bg-white/5 blur-3xl scale-105 opacity-0"
										whileHover={{ opacity: 1 }}
										transition={{ duration: 0.4 }}
									></motion.div>

									<Image
										src="/images/Prototype.png"
										alt="iPhone App Prototype"
										layout="fill"
										objectFit="contain"
										className="drop-shadow-2xl relative z-10"
									/>

									{/* Floating data points */}
									{[
										{ top: '15%', right: '-10%', delay: 0 },
										{ top: '45%', left: '-8%', delay: 1 },
										{
											bottom: '25%',
											right: '-12%',
											delay: 2,
										},
									].map((point, i) => (
										<motion.div
											key={i}
											className="absolute w-2 h-2 bg-white rounded-full opacity-60"
											style={{ ...point }}
											animate={{
												scale: [1, 1.5, 1],
												opacity: [0.6, 1, 0.6],
											}}
											transition={{
												duration: 3,
												repeat: Infinity,
												delay: point.delay,
											}}
										></motion.div>
									))}
								</motion.div>
							</motion.div>
						</div>
					</section>

					{/* Built on Starknet */}
					<section className="py-20 md:py-32">
						<div className="text-center mb-16 md:mb-20">
							<motion.h2
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.7 }}
								className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-wide"
							>
								BUILT WITH MODERN TECH
							</motion.h2>
							<motion.p
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.7, delay: 0.2 }}
								className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed"
							>
								Leveraging cutting-edge blockchain technologies
								for maximum performance, security, and
								lightning-fast transactions
							</motion.p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 max-w-6xl mx-auto mb-16">
							{[
								{
									name: 'Starknet',
									logo: '/images/starknet-logo.svg',
									description:
										'Lightning-fast L2 scaling solution',
								},
								{
									name: 'Argent',
									logo: '/images/ArgentLogo.svg',
									description: 'Smart wallet infrastructure',
								},
								{
									name: 'AVNU',
									logo: '/images/AVNULogo.svg',
									description: 'DEX aggregation protocol',
								},
							].map((tech, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.6,
										delay: index * 0.2,
									}}
									whileHover={{ scale: 1.05, y: -10 }}
									className="flex flex-col items-center text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
								>
									<div className="relative w-24 h-24 md:w-32 md:h-32 mb-6">
										<Image
											src={tech.logo}
											alt={tech.name}
											layout="fill"
											className="object-contain filter brightness-90 hover:brightness-100 transition-all duration-300"
										/>
									</div>
									<h3 className="text-2xl md:text-3xl font-bold mb-3">
										{tech.name}
									</h3>
									<p className="text-white/70 text-lg">
										{tech.description}
									</p>
								</motion.div>
							))}
						</div>
					</section>

					{/* Waitlist Section */}
					<motion.section
						ref={waitlistRef}
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ duration: 0.7 }}
						className="py-20 md:py-32 border-t border-white/20"
					>
						<div className="text-center mb-12 md:mb-16">
							<motion.h2
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.7 }}
								className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-wide"
							>
								JOIN THE WAITLIST
							</motion.h2>
							<motion.p
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.7, delay: 0.2 }}
								className="text-xl md:text-2xl font-medium max-w-3xl mx-auto text-white/80 leading-relaxed"
							>
								Be the first to experience the future of crypto
								banking. Get exclusive early access when we
								launch.
							</motion.p>
						</div>

						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.4 }}
							className="max-w-2xl mx-auto"
						>
							<form onSubmit={handleSubmit} className="space-y-6">
								<div className="flex flex-col sm:flex-row gap-4 md:gap-6">
									<input
										type="email"
										placeholder="Enter your email address"
										className="flex-1 bg-white/5 backdrop-blur-sm border-2 border-white/20 px-6 py-4 md:px-8 md:py-5 focus:outline-none focus:border-white/60 focus:bg-white/10 text-lg md:text-xl placeholder-white/50 rounded-xl transition-all duration-300"
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
										required
									/>
									<motion.button
										whileTap={{ scale: 0.95 }}
										disabled={submitted || loading}
										type="submit"
									>
										{loading
											? 'Joining...'
											: submitted
												? 'Welcome!'
												: 'Join Now'}
									</motion.button>
								</div>
								{submitted && (
									<motion.div
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										className="text-center p-6 bg-green-500/10 border border-green-500/20 rounded-xl backdrop-blur-sm"
									>
										<p className="text-lg md:text-xl font-medium text-green-400">
											You're in! We'll notify you as soon
											as Cavos is ready to launch.
										</p>
									</motion.div>
								)}
							</form>
						</motion.div>
					</motion.section>
				</main>

				<Footer />
			</div>
		</>
	);
}
