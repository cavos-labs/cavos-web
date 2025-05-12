'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import LoginModal from '../modals/Login';

function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <header className="w-full fixed top-0 left-0 z-50 bg-[#11110E]/50 backdrop-blur-sm py-2">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <Link href="/">
                <Image
                  src="/images/CavosLogo.png"
                  alt="Cavos Logo"
                  width={40}
                  height={36}
                  className="cursor-pointer"
                />
              </Link>
            </motion.div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/dashboard">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-[#FFFFE3] hover:text-white transition-colors duration-300 cursor-pointer text-sm md:text-base"
                >
                  Dashboard
                </motion.span>
              </Link>
              <Link href="/drop">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-[#FFFFE3] hover:text-white transition-colors duration-300 cursor-pointer text-sm md:text-base"
                >
                  Drop
                </motion.span>
              </Link>
              <Link href="/investments">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-[#FFFFE3] hover:text-white transition-colors duration-300 cursor-pointer text-sm md:text-base"
                >
                  Investments
                </motion.span>
              </Link>
            </nav>

            {/* Login Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsLoginOpen(true)}
              className="border border-[#FFFFE3] px-4 py-1 hover:bg-[#FFFFE3] hover:text-[#11110E] transition-colors duration-500 cursor-pointer text-sm md:text-base"
            >
              Login
            </motion.button>
          </div>
        </div>
      </header>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}

export default Header;