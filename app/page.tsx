"use client";
import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function Home() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const waitlistRef = useRef<HTMLDivElement>(null);

  const scrollToWaitlist = () => {
    waitlistRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
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
    <div className="min-h-screen p-4 md:p-10 lg:p-20 text-white">
      <main className="container mx-auto px-4 py-4 md:py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-12"
        >
          <Image
            src="/images/CavosLogo.png"
            alt="Cavos Logo"
            width={50}
            height={45}
            className="mb-6 md:mb-8"
          />
        </motion.div>

        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-8 md:mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 md:mb-10 leading-tight">
              INVEST YOUR CRYPTO <br className="hidden sm:block" /> SMARTLY
            </h1>
            <p className="text-base md:text-lg mb-4 md:mb-6">
              Invest stable coins on the cheapest and fastest chain.
            </p>
            <button
              onClick={scrollToWaitlist}
              className="border border-[#FFFFE3] px-4 py-1 md:px-6 md:py-2 hover:bg-[#FFFFE3] hover:text-[#11110E] transition-colors duration-500 cursor-pointer text-sm md:text-base"
            >
              Join Waitlist
            </button>
          </motion.div>

          {/* Lightning Background */}
          <Image
            src="/images/Lightning.svg"
            alt="Lightning background"
            fill
            className="object-cover object-right -z-10 md:block"
            quality={100}
            priority
          />

          {/* Visa Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="my-8 md:my-12 flex justify-center"
          >
            <div className="relative w-full max-w-[350px] sm:max-w-[450px] md:w-[575px] h-[200px] sm:h-[250px] md:h-[290px] bg-black rounded-xl overflow-hidden border border-[#FFFFE3]">
              <div className="absolute top-4 left-4 md:top-6 md:left-6">
                <Image
                  src="/images/CavosLogo.png"
                  alt="Cavos Logo"
                  width={30}
                  height={30}
                  className="md:w-10 md:h-10"
                />
              </div>
              <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6">
                <Image
                  src="/images/Visa.png"
                  alt="Visa"
                  width={50}
                  height={16}
                  className="md:w-16 md:h-6"
                />
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full px-4">
                <p className="text-[#FFFFE3] text-sm md:text-base">Cavos card coming soon...</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-8 md:py-12 flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1 order-2 md:order-1"
          >
            <ul className="space-y-4 md:space-y-8">
              <li>
                <h3 className="text-lg md:text-xl mb-2">Create an smart crypto wallet once you register.</h3>
              </li>
              <li>
                <h3 className="text-lg md:text-xl mb-2">Fund your wallet with stable coins.</h3>
              </li>
              <li>
                <h3 className="text-lg md:text-xl mb-2">Invest in one of the best DeFi protocols on Starknet</h3>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1 flex justify-center order-1 md:order-2"
          >
            <div className="relative w-[180px] h-[350px] md:w-[230px] md:h-[450px]">
              <Image
                src="/images/Prototype.png"
                alt="iPhone App Prototype"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </motion.div>
        </section>

        {/* Built on Starknet */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="py-8 md:py-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">BUILT ON STARKNET</h2>
          <p className="text-base md:text-lg mb-6 md:mb-8">
            The cheapest and fastest layer 2 solution. Adapt to blockchain like never before.
          </p>

          <div className="flex flex-wrap gap-2 md:gap-4">
            <button className="border border-[#FFFFE3] px-4 py-1 md:px-6 md:py-2 hover:bg-[#FFFFE3] hover:text-[#11110E] transition-colors text-sm md:text-base">
              10x Cheaper
            </button>
            <button className="border border-[#FFFFE3] px-4 py-1 md:px-6 md:py-2 hover:bg-[#FFFFE3] hover:text-[#11110E] transition-colors text-sm md:text-base">
              10x Faster
            </button>
          </div>
        </motion.section>

        {/* Waitlist Section */}
        <motion.section
          ref={waitlistRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="py-8 md:py-16 border-t border-[#FFFFE3]/20"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">JOIN THE WAITLIST</h2>
          <p className="text-base md:text-lg mb-6 md:mb-8">
            Be the first to get access when we launch.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md">
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-transparent border border-[#FFFFE3] px-3 py-1 md:px-4 md:py-2 focus:outline-none text-sm md:text-base"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <motion.button
                whileTap={{ scale: 0.95 }}
                disabled={submitted || loading}
                className={`bg-[#FFFFE3] text-[#11110E] px-4 py-1 md:px-6 md:py-2 font-medium cursor-pointer text-sm md:text-base ${(submitted || loading) ? 'opacity-70' : ''
                  }`}
                type="submit"
              >
                {loading ? "Loading..." : submitted ? "Thanks!" : "Join Now"}
              </motion.button>
            </div>
            {submitted && (
              <p className="mt-3 md:mt-5 text-sm md:text-base">
                We received your email and will let you know once Cavos is ready!
              </p>
            )}
          </form>
        </motion.section>
      </main>

      <footer className="container mx-auto px-4 py-6 md:py-8 border-t border-[#FFFFE3]/20">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-3 md:mb-0 flex items-center space-x-4">
            <Image
              src="/images/CavosLogo.png"
              alt="Cavos Logo"
              width={35}
              height={45}
              className="md:w-10 md:h-12"
            />

            {/* Discord Link with Animation */}
            <motion.a
              href="https://discord.gg/RKNxhpczfw"
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 200
              }}
              className="flex items-center"
            >
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="fill-[#FFFFE3] hover:fill-white transition-colors duration-300"
              >
                <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 00-.079.036c-.21.39-.444.885-.608 1.28a18.566 18.566 0 00-5.487 0 12.36 12.36 0 00-.617-1.28.077.077 0 00-.079-.036A19.798 19.798 0 003.677 4.492a.07.07 0 00-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 00.031.055 20.03 20.03 0 005.993 2.98.078.078 0 00.084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 01-1.872-.878.075.075 0 01-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 01.078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 01.079.009c.12.098.245.195.372.288a.075.075 0 01-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 00-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 00.084.028 19.963 19.963 0 006.002-2.981.076.076 0 00.032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 00-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" />
              </svg>
            </motion.a>
          </div>
          <p className="text-xs md:text-sm opacity-70">© 2025 Cavos. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
