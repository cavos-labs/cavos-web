import localFont from 'next/font/local';
import { Inter } from 'next/font/google';

export const satoshi = localFont({ src: './fonts/Satoshi-Regular.otf' });
export const ramagothicbold = localFont({
  src: './fonts/ramagothicbold.ttf',
  variable: '--font-ramagothic'
});

export const roboto = Inter({
  subsets: ['latin'],
  variable: '--font-roboto'
});