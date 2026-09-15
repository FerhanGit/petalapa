export function PawMark({ size = 22, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <ellipse cx="14" cy="15" rx="5" ry="6.5" fill={color} transform="rotate(-18 14 15)" />
      <ellipse cx="34" cy="15" rx="5" ry="6.5" fill={color} transform="rotate(18 34 15)" />
      <ellipse cx="7" cy="27" rx="4.3" ry="5.6" fill={color} transform="rotate(-32 7 27)" />
      <ellipse cx="41" cy="27" rx="4.3" ry="5.6" fill={color} transform="rotate(32 41 27)" />
      <path d="M24 25c-9-6-19 2-15 12 2.6 6 9.4 9 15 9s12.4-3 15-9c4-10-6-18-15-12z" fill={color} />
    </svg>
  );
}
// pet 🐾 lapa — лапата (оранжево-златна) стои на мястото на „а“
export function Wordmark({ href = '/', size = 24, sub = false }: { href?: string; size?: number; sub?: boolean }) {
  return (
    <a className="wordmark" href={href} aria-label="PetaLapa" style={{ fontSize: size }}>
      <span className="mark"><PawMark size={size * 1.15} /></span>
      <span className="wm">pet<span className="paw"><PawMark size={size * 0.78} color="#E0A24C" /></span>lapa</span>
      {sub && <small>MORE THAN A TAG</small>}
    </a>
  );
}
export type TagStyle = { slug: string; name: string; img: string; price: number; cat: 'nature' | 'space' | 'flowers' | 'minimal'; story: string };
export const STYLES: TagStyle[] = [
  { slug: 'ocean', name: 'Ocean', img: '/img/tag-ocean.jpg', price: 29, cat: 'nature', story: 'Вдъхновен от морето. Спокойствие, свобода и безкрайни приключения.' },
  { slug: 'forest', name: 'Forest', img: '/img/tag-forest.jpg', price: 29, cat: 'nature', story: 'Истинска папрат и мъх, заляти в зелена смола със златни люспи.' },
  { slug: 'galaxy', name: 'Galaxy', img: '/img/tag-galaxy.jpg', price: 29, cat: 'space', story: 'Тюркоаз, кехлибар и златни звезди – за любимци, които блестят.' },
  { slug: 'floral', name: 'Floral', img: '/img/tag-floral.jpg', price: 29, cat: 'flowers', story: 'Розови сакури и златен брокат. Нежно, като първата пролет.' },
  { slug: 'meadow', name: 'Meadow', img: '/img/tag-meadow.jpg', price: 29, cat: 'flowers', story: 'Полски цветя, листа и пясък – лятна поляна, събрана в 3 см.' },
  { slug: 'marble', name: 'Marble', img: '/img/tag-marble.jpg', price: 32, cat: 'minimal', story: 'Черно-бял мрамор със златни жилки. Класика за елегантни любимци.' },
  { slug: 'minimal', name: 'Minimal', img: '/img/tag-minimal.jpg', price: 27, cat: 'minimal', story: 'Бяло, злато и дребни сушени цветя. Тихо и красиво.' },
  { slug: 'tech', name: 'Tech', img: '/img/tag-tech.jpg', price: 32, cat: 'space', story: 'Сребро, черно и електриково синьо – за любимци с характер.' },
  { slug: 'melody', name: 'Melody', img: '/img/tag-melody.jpg', price: 32, cat: 'space', story: 'Златни ноти върху тъмен тюркоаз – за тези, които те будят с песен.' },
];
export const PRICE: Record<string, number> = Object.fromEntries(STYLES.map((s) => [s.slug, s.price]));
