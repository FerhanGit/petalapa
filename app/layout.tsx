import type { Metadata, Viewport } from 'next';
import { Fredoka, Nunito } from 'next/font/google';
import './globals.css';

const fredoka = Fredoka({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-fredoka' });
const nunito = Nunito({ subsets: ['latin', 'cyrillic'], weight: ['500', '600', '700', '800'], variable: '--font-nunito' });

export const metadata: Metadata = {
  title: 'Лапичка · смарт таг за любимци',
  description: 'Ръчно залят в епоксидна смола, с NFC и QR вътре. Сменяш телефона – не тага.',
};
export const viewport: Viewport = { themeColor: '#FBF6EC', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg" className={`${fredoka.variable} ${nunito.variable}`}>
      <body>{children}</body>
    </html>
  );
}
