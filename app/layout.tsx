import type { Metadata, Viewport } from 'next';
import { Manrope, Caveat } from 'next/font/google';
import './globals.css';
const sans = Manrope({ subsets: ['latin', 'cyrillic'], weight: ['400', '500', '600', '700', '800'], variable: '--font-sans' });
const hand = Caveat({ subsets: ['latin', 'cyrillic'], weight: ['500', '600'], variable: '--font-hand' });
export const metadata: Metadata = {
  metadataBase: new URL('https://petalapa.com'),
  title: 'petalapa · Малък таг. Голяма сигурност.',
  description: 'Стилен NFC таг с персонален профил за твоя любимец. Ръчно залят в епоксидна смола, с NFC чип и QR код.',
  openGraph: { title: 'petalapa · More than a tag', description: 'Ръчно изработени епоксидни тагове с NFC + QR профил.', url: 'https://petalapa.com', siteName: 'petalapa', locale: 'bg_BG', type: 'website', images: ['/img/hero-pets.jpg'] },
};
export const viewport: Viewport = { themeColor: '#F8F5EE', width: 'device-width', initialScale: 1 };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="bg" className={`${sans.variable} ${hand.variable}`}><body>{children}</body></html>);
}
