import type { Metadata, Viewport } from 'next';
import { Lora, Manrope, Caveat } from 'next/font/google';
import './globals.css';
import './brand-refresh.css';
import './hero-fade.css';
import './final-design.css';
import './final-extra.css';
import './exact-reference.css';
import './exact-nav.css';
import './pixel-match.css';
import './asset-fidelity.css';
import './natural-visuals.css';
import './sharp-fix.css';
import './approved-reference.css';
import './approved-reference-patch.css';
import './final-reference-v2.css';
import './master-reference.css';

const serif = Lora({ subsets: ['latin', 'cyrillic'], weight: ['400', '500', '600'], variable: '--font-serif' });
const sans = Manrope({ subsets: ['latin', 'cyrillic'], weight: ['400', '500', '600', '700'], variable: '--font-sans' });
const hand = Caveat({ subsets: ['latin', 'cyrillic'], weight: ['500'], variable: '--font-hand' });

export const metadata: Metadata = {
  metadataBase: new URL('https://petalapa.com'),
  title: 'petalapa · Ръчно изработен таг за твоя любимец',
  description: 'Уникални кръгли епоксидни тагове за домашни любимци с NFC, QR код и персонален дигитален профил.',
  openGraph: { title: 'petalapa · Повече от таг', description: 'Ръчно изработени кръгли епоксидни тагове за любимци с дискретен NFC + QR профил.', url: 'https://petalapa.com', siteName: 'petalapa', locale: 'bg_BG', type: 'website' },
};
export const viewport: Viewport = { themeColor: '#F8F3EA', width: 'device-width', initialScale: 1 };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="bg" className={`${serif.variable} ${sans.variable} ${hand.variable}`}><body>{children}</body></html>; }
