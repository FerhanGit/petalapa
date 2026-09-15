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
export type TagStyle = { slug: string; name: string; img: string; price: number; cat: 'nature' | 'flowers' | 'sea' | 'space' | 'abstract' | 'sparkle' | 'minimal'; story: string };
export const STYLES: TagStyle[] = [
  { slug: 'ocean', name: 'Ocean', img: '/img/tag-ocean.jpg', price: 29, cat: 'sea', story: 'Вдъхновен от морето. Спокойствие, свобода и безкрайни приключения.' },
  { slug: 'lagoon', name: 'Lagoon', img: '/img/tag-lagoon.jpg', price: 32, cat: 'sea', story: 'Вълни, истински пясък, миди и перла – плажът, събран в един таг.' },
  { slug: 'forest', name: 'Forest', img: '/img/tag-forest.jpg', price: 29, cat: 'nature', story: 'Истинска папрат и мъх, заляти в зелена смола със златни люспи.' },
  { slug: 'botanica', name: 'Botanica', img: '/img/tag-botanica.jpg', price: 29, cat: 'nature', story: 'Скелетирано листо, маргаритки и гипсофила – светло и живо.' },
  { slug: 'meadow', name: 'Meadow', img: '/img/tag-meadow.jpg', price: 29, cat: 'nature', story: 'Полски цветя, листа и пясък – лятна поляна, събрана в 3 см.' },
  { slug: 'floral', name: 'Floral', img: '/img/tag-floral.jpg', price: 29, cat: 'flowers', story: 'Розови сакури и златен брокат. Нежно, като първата пролет.' },
  { slug: 'blossom', name: 'Blossom', img: '/img/tag-blossom.jpg', price: 32, cat: 'flowers', story: 'Розови и бели цветове с перли и кристалчета – за принцеси.' },
  { slug: 'wreath', name: 'Wreath', img: '/img/tag-wreath.jpg', price: 29, cat: 'flowers', story: 'Венец от бели цветчета със златна лапичка и сърце. Чисто и нежно.' },
  { slug: 'galaxy', name: 'Galaxy', img: '/img/tag-galaxy.jpg', price: 29, cat: 'space', story: 'Тюркоаз, кехлибар и златни звезди – за любимци, които блестят.' },
  { slug: 'nebula', name: 'Nebula', img: '/img/tag-nebula.jpg', price: 32, cat: 'space', story: 'Лилава мъглявина, звезден прах и малка луна. За нощните разходки.' },
  { slug: 'aurora', name: 'Aurora', img: '/img/tag-aurora.jpg', price: 32, cat: 'abstract', story: 'Синьо, пудра и златни жилки – като мрамор, разтопен в смола.' },
  { slug: 'tide', name: 'Tide', img: '/img/tag-tide.jpg', price: 29, cat: 'abstract', story: 'Тюркоаз, слонова кост и кехлибар на вълни. Топло и спокойно.' },
  { slug: 'marble', name: 'Marble', img: '/img/tag-marble.jpg', price: 32, cat: 'abstract', story: 'Черно-бял мрамор със златни жилки. Класика за елегантни любимци.' },
  { slug: 'holo', name: 'Holo', img: '/img/tag-holo.jpg', price: 29, cat: 'sparkle', story: 'Пастелен вихър с холографски люспи – сменя цвета си на светло.' },
  { slug: 'terrazzo', name: 'Terrazzo', img: '/img/tag-terrazzo.jpg', price: 29, cat: 'sparkle', story: 'Бели и пясъчни камъчета със златен и сребърен глитер.' },
  { slug: 'pearlpaw', name: 'Pearl Paw', img: '/img/tag-pearlpaw.jpg', price: 34, cat: 'sparkle', story: 'Перлена лапа, обградена с перли, кристали и златни мъниста.' },
  { slug: 'melody', name: 'Melody', img: '/img/tag-melody.jpg', price: 32, cat: 'sparkle', story: 'Златни ноти върху тъмен тюркоаз – за тези, които те будят с песен.' },
  { slug: 'ivory', name: 'Ivory', img: '/img/tag-ivory.jpg', price: 27, cat: 'minimal', story: 'Бели дъхове и златни люспи в прозрачна смола. Тихо и красиво.' },
  { slug: 'minimal', name: 'Minimal', img: '/img/tag-minimal.jpg', price: 27, cat: 'minimal', story: 'Бяло, злато и дребни сушени цветя. Минимум, който казва много.' },
];
export const PRICE: Record<string, number> = Object.fromEntries(STYLES.map((s) => [s.slug, s.price]));
