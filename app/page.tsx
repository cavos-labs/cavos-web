'use client';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
	ArrowRight,
	Check,
	CreditCard,
	Smartphone,
	Shield,
	Globe,
} from 'lucide-react';
import Footer from './components/Footer';
import Image from 'next/image';
import axios from 'axios';
import Header from './components/Header';
import { CavosAuth } from 'cavos-service-sdk';

export default function Home() {
	const [email, setEmail] = useState('');
	const [submitted, setSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);
	const waitlistRef = useRef<HTMLDivElement | null>(null);

	const scrollToWaitlist = () => {
		waitlistRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			await axios.post(`/api/cavos/waitlist`, {
				email,
			});
			setSubmitted(true);
		} catch (error) {
			console.error('Error submitting form:', error);
		}
	};

	return (
		<div className="min-h-screen text-white bg-black relative overflow-hidden">
			{/* Enhanced background with subtle patterns */}
			<div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-[#0e0e0e]"></div>
			<div className="absolute inset-0 opacity-20">
				<div className="absolute top-0 left-1/4 w-96 h-96 bg-[#EAE5DC]/5 rounded-full blur-3xl"></div>
				<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#EAE5DC]/3 rounded-full blur-3xl"></div>
			</div>

			<main className="relative z-10">
				<Header scrollToWaitlist={scrollToWaitlist} />
				{/* Enhanced Hero Section */}
				<section className="pt-20 pb-32">
					<div className="container mx-auto px-6">
						<div className="max-w-4xl text-left mb-16 items-start">
							<motion.h1
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8 }}
								className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
							>
								BANKING WITHOUT
								<br />
								<span className="text-[#EAE5DC] relative">
									A BANK
									<div className="absolute inset-0 bg-[#EAE5DC]/10 blur-2xl -z-10"></div>
								</span>
							</motion.h1>
							<motion.p
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
								className="text-2xl text-[#a0a0a0] mb-10"
							>
								Digital Banking for the Modern World!
								<br />
								150+ merchants and ATMs globally.
							</motion.p>
						</div>
						<div className="flex flex-col md:flex-row items-start gap-8 md:gap-12 mb-20">
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8, delay: 0.4 }}
								className="flex flex-col sm:flex-row gap-4 w-full md:w-auto justify-center md:justify-start"
							>
								<button
									onClick={scrollToWaitlist}
									className="border-2 border-[#EAE5DC] px-8 py-4 font-bold text-lg rounded-lg hover:bg-[#EAE5DC]/10 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group"
								>
									Join now
									<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
								</button>
								<button className="border-2 border-[#EAE5DC] px-8 py-4 font-bold text-lg rounded-lg hover:bg-[#EAE5DC]/10 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
									Know more
								</button>
							</motion.div>
							<motion.div
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8, delay: 0.6 }}
								className="w-full md:w-auto flex justify-center md:justify-end"
							>
								<div className="relative lg:ml-12">
									<Image
										src="/images/Prototype.png"
										alt="Cavos App"
										width={400}
										height={300}
										className="w-full max-w-xs md:max-w-sm h-auto relative z-10"
										priority
									/>
								</div>
							</motion.div>
						</div>
					</div>
				</section>

				{/* Enhanced Trusted Tech Section */}
				<section className="py-24 border-y border-[#EAE5DC]/10 relative overflow-hidden">
					<div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5"></div>
					<div className="container mx-auto px-6 relative">
						<div className="flex flex-wrap justify-center items-center gap-12 md:gap-16 opacity-80 hover:opacity-100 transition-opacity duration-500">
							<motion.div
								initial={{ opacity: 0, scale: 0.9 }}
								whileInView={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.6, delay: 0 }}
								className="relative group"
							>
								<div className="p-6 rounded-xl border border-[#EAE5DC]/10 group-hover:border-[#EAE5DC]/20 transition-all duration-300">
									<Image
										src="/images/ArgentLogo.svg"
										alt="Argent"
										width={120}
										height={40}
										className="h-12 w-50 filter brightness-75 group-hover:brightness-100 transition-all duration-300"
									/>
								</div>
							</motion.div>
							<motion.div
								initial={{ opacity: 0, scale: 0.9 }}
								whileInView={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.6, delay: 0.1 }}
								className="relative group"
							>
								<div className="p-6 rounded-xl border border-[#EAE5DC]/10 group-hover:border-[#EAE5DC]/20 transition-all duration-300">
									<Image
										src="/images/AVNULogo.svg"
										alt="AVNU"
										width={120}
										height={40}
										className="h-12 w-50 filter brightness-75 group-hover:brightness-100 transition-all duration-300"
									/>
								</div>
							</motion.div>
							<motion.div
								initial={{ opacity: 0, scale: 0.9 }}
								whileInView={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.6, delay: 0.2 }}
								className="relative group"
							>
								<div className="p-6 rounded-xl border border-[#EAE5DC]/10 group-hover:border-[#EAE5DC]/20 transition-all duration-300">
									<Image
										src="/images/starknet-logo.svg"
										alt="Starknet"
										width={120}
										height={40}
										className="h-12 w-50 filter brightness-75 group-hover:brightness-100 transition-all duration-300"
									/>
								</div>
							</motion.div>
						</div>
					</div>
				</section>

				{/* Enhanced Card Showcase */}
				<section className="py-28 relative overflow-hidden">
					<div className="absolute inset-0 bg-[url('/images/dot-pattern.svg')] opacity-5"></div>
					<div className="container mx-auto px-6">
						<div className="flex flex-col lg:flex-row items-center justify-center gap-16">
							<motion.div
								initial={{ opacity: 0, x: -50 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8 }}
								className="max-w-md"
							>
								<h2 className="text-5xl font-bold mb-8">
									<span className="text-[#EAE5DC] relative inline-block">
										CAVOS
										<span className="absolute inset-x-0 -bottom-1 h-0.5 bg-[#EAE5DC] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500"></span>
									</span>{' '}
									CARD
								</h2>
								<p className="text-xl text-[#a0a0a0] mb-8 leading-relaxed">
									The most exclusive banking card, designed
									for global citizens.
								</p>
								<ul className="space-y-4 mb-10">
									{[
										'No foreign transaction fees',
										'Instant virtual card issuance',
										'1% cashback on all purchases',
										'Contactless payments worldwide',
									].map((item, index) => (
										<motion.li
											key={index}
											initial={{ opacity: 0, x: -20 }}
											whileInView={{ opacity: 1, x: 0 }}
											transition={{
												duration: 0.6,
												delay: index * 0.1,
											}}
											className="flex items-start gap-3 group"
										>
											<div className="relative mt-1">
												<div className="absolute inset-0 bg-[#EAE5DC]/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
												<Check className="w-5 h-5 text-[#EAE5DC] flex-shrink-0" />
											</div>
											<span className="text-lg group-hover:text-[#EAE5DC]/80 transition-colors duration-300">
												{item}
											</span>
										</motion.li>
									))}
								</ul>
								<motion.button
									initial={{ opacity: 0 }}
									whileInView={{ opacity: 1 }}
									transition={{ duration: 0.6, delay: 0.4 }}
									onClick={scrollToWaitlist}
									className="border-2 border-[#EAE5DC] px-8 py-4 text-lg rounded-lg hover:bg-[#EAE5DC]/10 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm"
								>
									<span className="relative z-10">
										Get your card
									</span>
								</motion.button>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, x: 50 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8 }}
								className="relative"
							>
								<div className="relative z-10 hover:scale-[1.02] transition-transform duration-500">
									<Image
										src="/images/CavosCard.png"
										alt="Cavos Card"
										width={600}
										height={400}
										className="w-full max-w-md h-auto"
									/>
									<div className="absolute -z-10 inset-4 bg-[#EAE5DC]/5 rounded-xl blur-lg"></div>
								</div>
							</motion.div>
						</div>
					</div>
				</section>

				{/* Enhanced Loss Aversion Section */}
				<section className="py-28  relative overflow-hidden">
					<div className="container mx-auto px-6 max-w-5xl">
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className="text-4xl font-bold mb-16 text-[#EAE5DC] text-center"
						>
							Why most banks let you down
						</motion.h2>
						<div className="grid md:grid-cols-3 gap-8">
							{[
								{
									title: 'Hidden Fees',
									description:
										'Traditional banks often charge you for every little thing, eating away at your savings.',
								},
								{
									title: 'Slow Transfers',
									description:
										'Moving your money can take days, especially across borders or on weekends.',
								},
								{
									title: 'Complex Processes',
									description:
										'Opening accounts, sending money, or getting support is often a headache.',
								},
							].map((item, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.6,
										delay: index * 0.1,
									}}
									className="bg-gradient-to-b from-[#1a1a1a] to-[#151515] rounded-xl p-8 border border-[#EAE5DC]/10 hover:border-[#EAE5DC]/20 transition-all duration-300 group relative overflow-hidden"
								>
									<div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5"></div>
									<div className="relative z-10">
										<h3 className="font-bold text-xl mb-4 text-[#EAE5DC] group-hover:text-[#EAE5DC]/80 transition-colors duration-300 flex items-center gap-3">
											<span className="w-2 h-2 bg-[#EAE5DC] rounded-full"></span>
											{item.title}
										</h3>
										<p className="text-[#a0a0a0] leading-relaxed">
											{item.description}
										</p>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* Enhanced Features Section */}
				<section className="py-28 relative overflow-hidden">
					<div className="container mx-auto px-6 max-w-6xl">
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className="text-4xl font-bold mb-16 text-[#EAE5DC] text-center"
						>
							Features designed for you
						</motion.h2>
						<div className="grid md:grid-cols-4 gap-6">
							{[
								{
									icon: (
										<CreditCard className="w-8 h-8 text-[#EAE5DC]" />
									),
									title: 'Virtual Card',
									description:
										'Shop online safely with a card you control.',
								},
								{
									icon: (
										<Smartphone className="w-8 h-8 text-[#EAE5DC]" />
									),
									title: 'Mobile App',
									description:
										'All your finances in your pocket, always.',
								},
								{
									icon: (
										<Shield className="w-8 h-8 text-[#EAE5DC]" />
									),
									title: 'Secure',
									description:
										'Your data and money are always protected.',
								},
								{
									icon: (
										<Globe className="w-8 h-8 text-[#EAE5DC]" />
									),
									title: 'Global Access',
									description:
										'Use Cavos wherever you are, no borders.',
								},
							].map((item, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.6,
										delay: index * 0.1,
									}}
									className="bg-gradient-to-b from-[#181818] to-[#131313] rounded-xl p-8 border border-[#EAE5DC]/10 flex flex-col items-center hover:border-[#EAE5DC]/20 hover:scale-105 transition-all duration-300 group relative"
								>
									<div className="relative mb-6 p-4 bg-[#1a1a1a] rounded-lg group-hover:bg-[#EAE5DC]/10 transition-all duration-300">
										{item.icon}
										<div className="absolute inset-0 bg-[#EAE5DC]/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
									</div>
									<p className="font-bold text-xl text-[#EAE5DC] mb-2 text-center">
										{item.title}
									</p>
									<p className="text-[#a0a0a0] text-center leading-relaxed">
										{item.description}
									</p>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* Enhanced Process Section */}
				<section className="py-28  relative overflow-hidden">
					<div className="container mx-auto px-6 max-w-5xl">
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className="text-4xl font-bold mb-16 text-[#EAE5DC] text-center"
						>
							How to get started
						</motion.h2>
						<div className="grid md:grid-cols-3 gap-8 relative">
							<div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#EAE5DC]/10 hidden md:block"></div>
							{[
								{
									step: '1',
									title: 'Sign Up',
									description:
										'Create your account in minutes, no paperwork.',
								},
								{
									step: '2',
									title: 'Verify',
									description:
										'Quick identity check to keep your account safe.',
								},
								{
									step: '3',
									title: 'Start Using',
									description:
										'Enjoy all Cavos features right away.',
								},
							].map((item, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.6,
										delay: index * 0.1,
									}}
									className="bg-gradient-to-b from-[#1a1a1a] to-[#151515] rounded-xl p-8 border border-[#EAE5DC]/10 flex flex-col items-center hover:border-[#EAE5DC]/20 hover:scale-105 transition-all duration-300 group relative z-10"
								>
									<div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-[#EAE5DC] rounded-full flex items-center justify-center text-black font-bold">
										{item.step}
									</div>
									<h3 className="font-bold text-xl text-[#EAE5DC] mb-4 mt-4 text-center">
										{item.title}
									</h3>
									<p className="text-[#a0a0a0] text-center leading-relaxed">
										{item.description}
									</p>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* Enhanced Testimonials Section */}
				<section className="py-28  relative overflow-hidden">
					<div className="container mx-auto px-6 max-w-6xl">
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className="text-4xl font-bold mb-16 text-[#EAE5DC] text-center"
						>
							What our users say
						</motion.h2>
						<div className="grid md:grid-cols-3 gap-8">
							{[
								{
									quote: 'Cavos made my finances so much easier. Transfers are instant and support is always there.',
									name: 'Ana G.',
									role: 'Freelancer',
								},
								{
									quote: 'I love the Cavos card. No hidden fees and works everywhere I go.',
									name: 'Luis R.',
									role: 'Remote Worker',
								},
								{
									quote: 'The app is super easy to use and I can manage everything from my phone.',
									name: 'Sofia M.',
									role: 'Entrepreneur',
								},
							].map((item, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.6,
										delay: index * 0.1,
									}}
									className="bg-gradient-to-b from-[#181818] to-[#131313] rounded-xl p-8 border border-[#EAE5DC]/10 flex flex-col hover:border-[#EAE5DC]/20 hover:scale-105 transition-all duration-300 relative"
								>
									<div className="absolute top-6 left-6 text-5xl font-serif text-[#EAE5DC]/10">
										"
									</div>
									<p className="text-[#EAE5DC]/80 mb-6 italic relative z-10 mt-6 leading-relaxed">
										"{item.quote}"
									</p>
									<div className="mt-auto">
										<p className="font-bold text-[#EAE5DC]">
											{item.name}
										</p>
										<p className="text-[#a0a0a0] text-sm">
											{item.role}
										</p>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* Enhanced FAQ Section */}
				<section className="py-28 relative overflow-hidden">
					<div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5"></div>
					<div className="container mx-auto px-6 max-w-4xl relative">
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className="text-4xl font-bold mb-16 text-[#EAE5DC] text-center"
						>
							Frequently Asked Questions
						</motion.h2>
						<div className="space-y-4">
							{[
								{
									question: 'Is Cavos really free?',
									answer: 'Yes! You can use our basic features at no cost. Premium is optional for extra perks.',
								},
								{
									question: 'How fast are transfers?',
									answer: 'Most transfers are instant, even on weekends and holidays.',
								},
								{
									question: 'Can I use Cavos abroad?',
									answer: 'Absolutely! Cavos works worldwide, so you can manage your money wherever you are.',
								},
							].map((item, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.6,
										delay: index * 0.1,
									}}
									className="bg-gradient-to-b from-[#181818] to-[#131313] rounded-xl p-6 border border-[#EAE5DC]/10 hover:border-[#EAE5DC]/20 transition-all duration-300 group"
								>
									<div className="flex justify-between items-start">
										<p className="font-bold text-lg text-[#EAE5DC] mb-2 group-hover:text-[#EAE5DC]/80 transition-colors duration-300">
											{item.question}
										</p>
										<div className="w-6 h-6 flex items-center justify-center">
											<div className="w-1 h-4 bg-[#EAE5DC] rounded-full group-hover:rotate-45 transition-transform duration-300"></div>
											<div className="w-4 h-1 bg-[#EAE5DC] rounded-full ml-[-0.25rem] group-hover:rotate-45 transition-transform duration-300"></div>
										</div>
									</div>
									<p className="text-[#a0a0a0] mt-2 leading-relaxed">
										{item.answer}
									</p>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* Enhanced CTA Section */}
				<section
					ref={waitlistRef}
					className="py-32 relative overflow-hidden"
				>
					<div className="container mx-auto px-6 relative z-10">
						<div className="max-w-3xl mx-auto text-center">
							<motion.div
								initial={{ opacity: 0, scale: 0.8 }}
								whileInView={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.6 }}
								className="flex justify-center mb-8"
							>
								<div className="relative">
									<Image
										src="/images/CavosLogo.png"
										alt="Cavos"
										width={48}
										height={48}
									/>
									<div className="absolute inset-0 bg-[#EAE5DC]/30 rounded-full blur-lg scale-150"></div>
								</div>
							</motion.div>
							<motion.h2
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6 }}
								className="text-5xl font-bold mb-8"
							>
								GAIN EARLY ACCESS TO{' '}
								<span className="text-[#EAE5DC] relative inline-block">
									CAVOS
									<span className="absolute inset-x-0 -bottom-1 h-0.5 bg-[#EAE5DC] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500"></span>
								</span>{' '}
								NOW
							</motion.h2>

							<form
								onSubmit={handleSubmit}
								className="max-w-md mx-auto"
							>
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.2 }}
									className="flex flex-col sm:flex-row gap-4 mb-8"
								>
									<input
										type="email"
										placeholder="Enter your email"
										className="flex-1 bg-white/5 border-2 border-[#EAE5DC]/20 px-6 py-4 focus:outline-none focus:border-[#EAE5DC] text-lg rounded-lg transition-all duration-300 backdrop-blur-sm hover:bg-white/10"
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
										required
									/>
									<button
										type="submit"
										disabled={submitted || loading}
										className="border-2 border-[#EAE5DC] px-8 py-4 font-bold text-lg rounded-lg hover:bg-[#EAE5DC]/10 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group"
									>
										<span className="relative z-10">
											{loading
												? 'Sending...'
												: submitted
													? 'Thank You!'
													: 'Join'}
										</span>
										{!submitted && !loading && (
											<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
										)}
										<div className="absolute inset-0 bg-[#EAE5DC]/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
									</button>
								</motion.div>
							</form>

							{submitted && (
								<motion.div
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									className="text-[#EAE5DC] mb-8 flex items-center justify-center gap-2"
								>
									<Check className="w-5 h-5" />
									Thank you! We'll be in touch soon.
								</motion.div>
							)}
						</div>
					</div>
				</section>

				<Footer />
			</main>
		</div>
	);
}
