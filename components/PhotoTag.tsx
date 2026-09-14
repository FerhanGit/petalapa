import Image from 'next/image';
import { PawMark } from './Brand';

export const ASSETS = 'https://rduelwbqucfatmbltqic.supabase.co/storage/v1/object/public/pets/assets';
export const IMG = { hero: `${ASSETS}/hero-dog.jpg`, cat: `${ASSETS}/cat.jpg`, sand: `${ASSETS}/sand.jpg` };

export type TagStyle = { slug: string; name: string; tex: string; pos?: string; overlay?: 'paw' | 'heart' | 'none'; ink?: string; price: number; sub: string };
export const STYLES: TagStyle[] = [
  { slug: 'ocean', name: 'Ocean', tex: 'tex-ocean.jpg', pos: '40% 50%', price: 29, sub: 'синьо, като море' },
  { slug: 'forest', name: 'Forest', tex: 'tex-forest.jpg', pos: '50% 40%', price: 29, sub: 'папрат и зелено' },
  { slug: 'galaxy', name: 'Galaxy', tex: 'tex-galaxy.jpg', pos: '50% 50%', price: 29, sub: 'звезден прах' },
  { slug: 'floral', name: 'Floral', tex: 'tex-floral.jpg', pos: '50% 45%', price: 29, sub: 'сушени цветя' },
  { slug: 'wood', name: 'Wood', tex: 'tex-wood.jpg', pos: '50% 50%', overlay: 'paw', ink: '#2B1B0C', price: 32, sub: 'дърво и смола' },
  { slug: 'minimal', name: 'Minimal', tex: 'tex-minimal.jpg', pos: '50% 50%', overlay: 'paw', ink: '#2A2621', price: 27, sub: 'мрамор и злато' },
  { slug: 'love', name: 'Love', tex: 'tex-love.jpg', pos: '50% 50%', overlay: 'heart', ink: '#FFF1EE', price: 29, sub: 'червено и злато' },
  { slug: 'custom', name: 'Custom', tex: 'tex-custom.jpg', pos: '50% 50%', price: 39, sub: 'по твой избор' },
];
export const PRICE: Record<string, number> = Object.fromEntries(STYLES.map((s) => [s.slug, s.price]));

// Снимка на тага: реална текстура (лицензирана от Adobe Stock) в кръг, златна халка, гланц и сянка – като продуктова снимка.
export function PhotoTag({ s, size = 160, qr = false, priority = false }: { s: TagStyle; size?: number; qr?: boolean; priority?: boolean }) {
  return (
    <div className="ptag" style={{ width: size, height: size * 1.16 }} aria-hidden>
      <span className="ring" /><span className="ring2" />
      <div className="disc">
        <Image src={`${ASSETS}/${s.tex}`} alt="" fill sizes={`${size * 2}px`} style={{ objectFit: 'cover', objectPosition: s.pos ?? '50% 50%' }} priority={priority} />
        {s.overlay === 'paw' && <span className="ov"><PawMark size={size * 0.42} color={s.ink} /></span>}
        {s.overlay === 'heart' && <span className="ov"><svg width={size * 0.4} height={size * 0.4} viewBox="0 0 24 24" fill={s.ink}><path d="M12 21s-8-5.3-8-11.2A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8 2.8C20 15.7 12 21 12 21z" /></svg></span>}
        {qr && <span className="qr"><svg viewBox="0 0 24 24" fill="#111"><rect x="1" y="1" width="7" height="7" /><rect x="3" y="3" width="3" height="3" fill="#fff" /><rect x="16" y="1" width="7" height="7" /><rect x="18" y="3" width="3" height="3" fill="#fff" /><rect x="1" y="16" width="7" height="7" /><rect x="3" y="18" width="3" height="3" fill="#fff" /><rect x="10" y="2" width="2" height="2" /><rect x="12" y="5" width="2" height="2" /><rect x="10" y="9" width="2" height="2" /><rect x="14" y="10" width="2" height="2" /><rect x="18" y="10" width="2" height="2" /><rect x="21" y="12" width="2" height="2" /><rect x="10" y="14" width="2" height="2" /><rect x="12" y="17" width="2" height="2" /><rect x="16" y="15" width="2" height="2" /><rect x="19" y="18" width="2" height="2" /><rect x="14" y="21" width="2" height="2" /><rect x="21" y="21" width="2" height="2" /></svg></span>}
        <span className="gloss" />
      </div>
    </div>
  );
}
// Продуктова снимка: тагът върху реален пясък
export function ProductShot({ s, size = 160, qr = false, className = '' }: { s: TagStyle; size?: number; qr?: boolean; className?: string }) {
  return (
    <div className={`shot ${className}`}>
      <Image src={IMG.sand} alt="" fill sizes="600px" style={{ objectFit: 'cover' }} />
      <div className="shot-tag"><PhotoTag s={s} size={size} qr={qr} /></div>
    </div>
  );
}
