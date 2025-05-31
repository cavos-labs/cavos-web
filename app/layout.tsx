import type React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { ramagothicbold, roboto } from './lib/fonts';

export const metadata: Metadata = {
	title: 'Cavos',
	description: 'Crypto investment made mobile. Built on Starknet.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${ramagothicbold.variable} ${roboto.variable} bg-[#000] text-[#EAE5DC]`}
			>
				{children}
			</body>
		</html>
	);
}
