import Image from 'next/image';
import { PawMark } from './Brand';

export const ASSETS = 'https://rduelwbqucfatmbltqic.supabase.co/storage/v1/object/public/pets/assets';
export const IMG = { hero: `${ASSETS}/hero-sunset.jpg`, heroDog: `${ASSETS}/hero-dog.jpg`, hero2: `${ASSETS}/hero-meadow.jpg`, cat: `${ASSETS}/cat.jpg`, sand: `${ASSETS}/sand.jpg` };

export type TagStyle = { slug: string; name: string; tex: string; pos?: string; overlay?: 'paw' | 'heart' | 'none'; ink?: string; price: number; sub: string };
export const STYLES: TagStyle[] = [
  { slug: 'ocean', name: 'Ocean', tex: 'tex-ocean.jpg', pos: '40% 50%', price: 29, sub: 'синьо и златни акценти' },
  { slug: 'forest', name: 'Forest', tex: 'tex-forest.jpg', pos: '50% 40%', price: 29, sub: 'зеленина и цветя' },
  { slug: 'floral', name: 'Blush', tex: 'tex-floral.jpg', pos: '50% 45%', price: 29, sub: 'нежни сушени цветя' },
  { slug: 'galaxy', name: 'Midnight', tex: 'tex-galaxy.jpg', pos: '50% 50%', price: 29, sub: 'тъмно синьо и злато' },
  { slug: 'wood', name: 'Amber', tex: 'tex-wood.jpg', pos: '50% 50%', overlay: 'paw', ink: '#2B1B0C', price: 32, sub: 'топъл кехлибарен тон' },
  { slug: 'love', name: 'Cherry', tex: 'tex-love.jpg', pos: '50% 50%', overlay: 'heart', ink: '#FFF1EE', price: 29, sub: 'наситено червено и цветя' },
  { slug: 'minimal', name: 'Luna', tex: 'tex-minimal.jpg', pos: '50% 50%', overlay: 'paw', ink: '#2A2621', price: 27, sub: 'светъл минималистичен стил' },
  { slug: 'custom', name: 'Onyx', tex: 'tex-custom.jpg', pos: '50% 50%', price: 39, sub: 'тъмен премиум дизайн' },
];
export const PRICE: Record<string, number> = Object.fromEntries(STYLES.map((s) => [s.slug, s.price]));

export function PhotoTag({ s, size = 160, qr = true, nfc = true, priority = false }: { s: TagStyle; size?: number | string; qr?: boolean; nfc?: boolean; priority?: boolean }) {
  const px = typeof size === 'number' ? size : 200;
  return (
    <div className="ptag" style={{ width: size, aspectRatio: '1 / 1.16' }} aria-hidden>
      <span className="ring" /><span className="ring2" />
      <span className="edge" />
      <div className="disc">
        <Image src={`${ASSETS}/${s.tex}`} alt="" fill sizes={`${px * 2}px`} style={{ objectFit: 'cover', objectPosition: s.pos ?? '50% 50%' }} priority={priority} />
        {s.overlay === 'paw' && <span className="ov"><PawMark size={100} color={s.ink} /></span>}
        {s.overlay === 'heart' && <span className="ov"><svg viewBox="0 0 24 24" fill={s.ink}><path d="M12 21s-8-5.3-8-11.2A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8 2.8C20 15.7 12 21 12 21z" /></svg></span>}
        {nfc && <span className="nfc"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"><path d="M5 8.5a9 9 0 0 1 14 0" /><path d="M8 11.5a5 5 0 0 1 8 0" /><circle cx="12" cy="15" r="1.2" fill="currentColor" stroke="none" /></svg></span>}
        {qr && <span className="qr"><svg viewBox="0 0 24 24" fill="#111"><rect x="1" y="1" width="7" height="7" /><rect x="3" y="3" width="3" height="3" fill="#fff" /><rect x="16" y="1" width="7" height="7" /><rect x="18" y="3" width="3" height="3" fill="#fff" /><rect x="1" y="16" width="7" height="7" /><rect x="3" y="18" width="3" height="3" fill="#fff" /><rect x="10" y="2" width="2" height="2" /><rect x="12" y="5" width="2" height="2" /><rect x="10" y="9" width="2" height="2" /><rect x="14" y="10" width="2" height="2" /><rect x="18" y="10" width="2" height="2" /><rect x="21" y="12" width="2" height="2" /><rect x="10" y="14" width="2" height="2" /><rect x="12" y="17" width="2" height="2" /><rect x="16" y="15" width="2" height="2" /><rect x="19" y="18" width="2" height="2" /><rect x="14" y="21" width="2" height="2" /><rect x="21" y="21" width="2" height="2" /></svg></span>}
        <span className="bevel" />
        <span className="gloss" />
      </div>
    </div>
  );
}

export function ProductShot({ s, size = '62%', qr = false, className = '' }: { s: TagStyle; size?: number | string; qr?: boolean; className?: string }) {
  return (
    <div className={`shot ${className}`}>
      <Image src={IMG.sand} alt="" fill sizes="600px" style={{ objectFit: 'cover' }} />
      <div className="shot-tag"><PhotoTag s={s} size={size} qr={qr} /></div>
    </div>
  );
}
