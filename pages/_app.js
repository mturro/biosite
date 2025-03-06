import '../styles/globals.css'
import { Lora, Merriweather, Playfair_Display } from 'next/font/google';

export const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
});

export const merriweather = Merriweather({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
});

function Application({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default Application
