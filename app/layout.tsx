import type { Metadata, Viewport } from 'next';
import { Lora, Manrope, Caveat } from 'next/font/google';
import './globals.css';

const serif = Lora({ subsets: ['latin', 'cyrillic'], weight: ['400', '500', '600'], variable: '--font-serif' });
const sans = Manrope({ subsets: ['latin', 'cyrillic'], weight: ['400', '500', '600', '700'], variable: '--font-sans' });
const hand = Caveat({ subsets: ['latin', 'cyrillic'], weight: ['500'], variable: '--font-hand' });

export const metadata: Metadata = {
  title: 'PetaLapa · Красив таг. Умен начин да намерите своя любимец.',
  description: 'Епоксидни тагове с вграден NFC чип и QR код. Персонален профил на вашия любимец и лесен достъп до неговата информация.',
};
export const viewport: Viewport = { themeColor: '#F8F3EA', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="bg" className={`${serif.variable} ${sans.variable} ${hand.variable}`}><body>{children}</body></html>);
}
