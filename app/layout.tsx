import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Nunito } from 'next/font/google';
import './globals.css';

const serif = Playfair_Display({ subsets: ['latin', 'cyrillic'], weight: ['500', '600', '700'], variable: '--font-serif' });
const nunito = Nunito({ subsets: ['latin', 'cyrillic'], weight: ['500', '600', '700', '800'], variable: '--font-nunito' });

export const metadata: Metadata = {
  title: 'PetaLapa · красив таг, умен начин да намериш любимеца си',
  description: 'Ръчно изработени тагове от епоксидна смола с вграден NFC и QR. Един допир отваря профила на любимеца ти.',
};
export const viewport: Viewport = { themeColor: '#FBF7F0', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg" className={`${serif.variable} ${nunito.variable}`}>
      <body>{children}</body>
    </html>
  );
}
