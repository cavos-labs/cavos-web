"use client";
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const NFT_COLLECTION = [
  {
    id: 1,
    name: "Cavos Alejanro Magno",
    description: "Alejandro Magno Cavos representation",
    rarity: "Legendary",
    image: "/images/PFP.jpg",
    price: 40 // ETH
  }
];

export default function DropPage() {
  const [selectedNFT, setSelectedNFT] = useState<any>(null);
  const [minting, setMinting] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);

  const getRandomNFT = () => {
    const randomIndex = Math.floor(Math.random() * NFT_COLLECTION.length);
    return NFT_COLLECTION[randomIndex];
  };

  const handleMint = async () => {
    setMinting(true);
    try {
      // Simulate NFT minting and Vesu investment
      const nftToMint = getRandomNFT();

      setSelectedNFT(nftToMint);
      setMintSuccess(true);
    } catch (error) {
      console.error('Minting error:', error);
    } finally {
      setMinting(false);
    }
  };

  return (
    <>
      <div className="min-h-screen p-4 md:p-10 lg:p-20 text-white">
        <main className="container mx-auto px-4 py-4 md:py-8">
          <Header />

          {/* Drop Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="py-8 md:py-16"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 md:mb-10 leading-tight">
              CAVOS DROP
            </h1>
            <p className="text-base md:text-lg mb-6 md:mb-8">
              Mint a unique NFT and automatically invest half the price via Vesu
            </p>

            {/* NFT Display Area */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              {/* NFT Preview Area */}
              <div className="flex-1 flex justify-center items-center min-h-[400px] bg-[#1A1A1A] rounded-xl border border-[#FFFFE3]/20">
                {mintSuccess && selectedNFT ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    <div className="relative w-64 h-64 mx-auto mb-4">
                      <Image
                        src={selectedNFT.image}
                        alt={selectedNFT.name}
                        layout="fill"
                        objectFit="contain"
                        className="rounded-xl"
                      />
                    </div>
                    <h2 className="text-xl font-bold">{selectedNFT.name}</h2>
                    <p className="text-sm text-[#FFFFE3]/70">{selectedNFT.description}</p>
                    <p className="text-sm mt-2">Rarity: {selectedNFT.rarity}</p>
                  </motion.div>
                ) : (
                  <p className="text-[#FFFFE3]/50">Your NFT will appear here</p>
                )}
              </div>

              {/* Mint Action Area */}
              <div className="flex-1">
                <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#FFFFE3]/20">
                  <h2 className="text-2xl font-bold mb-4">Mint Your NFT</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Mint Price</span>
                      <span>50 USDC</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Investment via Vesu</span>
                      <span>50%</span>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleMint}
                      disabled={minting || mintSuccess}
                      className={`w-full py-3 rounded-lg transition-colors duration-300 ${
                        minting || mintSuccess
                          ? 'bg-[#FFFFE3]/30 text-[#FFFFE3]/50 cursor-not-allowed'
                          : 'bg-[#FFFFE3] text-[#11110E] hover:bg-[#FFFFE3]/90'
                      }`}
                    >
                      {minting 
                        ? "Minting..." 
                        : mintSuccess 
                          ? "Minted!" 
                          : "Mint NFT & Invest"}
                    </motion.button>
                  </div>
                </div>

                {mintSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 bg-[#1A1A1A] border border-[#FFFFE3] p-4 rounded-lg text-center"
                  >
                    <p>🎉 NFT Minted Successfully!</p>
                    <p className="text-sm mt-2">
                      Half of the mint price has been automatically invested via Vesu
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.section>
        </main>
      </div>
      <Footer />
    </>
  );
}
