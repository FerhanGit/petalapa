export function PawMark({ size = 26, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <ellipse cx="14" cy="15" rx="5" ry="6.5" fill={color} transform="rotate(-18 14 15)" />
      <ellipse cx="34" cy="15" rx="5" ry="6.5" fill={color} transform="rotate(18 34 15)" />
      <ellipse cx="7" cy="27" rx="4.3" ry="5.6" fill={color} transform="rotate(-32 7 27)" />
      <ellipse cx="41" cy="27" rx="4.3" ry="5.6" fill={color} transform="rotate(32 41 27)" />
      <path d="M24 25c-9-6-19 2-15 12 2.6 6 9.4 9 15 9s12.4-3 15-9c4-10-6-18-15-12z" fill={color} />
      <path d="M24 33c-2.5-2.3-6 .3-4.6 3 .7 1.5 2.9 2.7 4.6 4.2 1.7-1.5 3.9-2.7 4.6-4.2 1.4-2.7-2.1-5.3-4.6-3z" fill="#FAF6EE" opacity=".9" />
    </svg>
  );
}
export function Wordmark({ href = '/', light = false, size = 26 }: { href?: string; light?: boolean; size?: number }) {
  return (
    <a className={`wordmark${light ? ' light' : ''}`} href={href} aria-label="PetaLapa">
      <span className="mark"><PawMark size={size * 1.35} /></span>
      <span className="wm"><span style={{ fontSize: size }}>petalapa</span><small>More than a tag</small></span>
    </a>
  );
}

export type TagStyle = { slug: string; name: string; bg1: string; bg2: string; kind: 'ocean' | 'forest' | 'galaxy' | 'floral' | 'wood' | 'minimal' | 'love' | 'custom' };
export const STYLES: TagStyle[] = [
  { slug: 'ocean', name: 'Ocean', bg1: '#5FA9C9', bg2: '#173E6A', kind: 'ocean' },
  { slug: 'forest', name: 'Forest', bg1: '#6FA070', bg2: '#1E4A2E', kind: 'forest' },
  { slug: 'galaxy', name: 'Galaxy', bg1: '#4A3E8E', bg2: '#12102B', kind: 'galaxy' },
  { slug: 'floral', name: 'Floral', bg1: '#FBF1E9', bg2: '#E5CDBD', kind: 'floral' },
  { slug: 'wood', name: 'Wood', bg1: '#C68B4A', bg2: '#6E4420', kind: 'wood' },
  { slug: 'minimal', name: 'Minimal', bg1: '#FBF6EC', bg2: '#E7DCC6', kind: 'minimal' },
  { slug: 'love', name: 'Love', bg1: '#D9483E', bg2: '#7A1A16', kind: 'love' },
  { slug: 'custom', name: 'Custom', bg1: '#C9B7E6', bg2: '#5A3E8C', kind: 'custom' },
];
export const PRICE: Record<string, number> = { ocean: 29, forest: 29, galaxy: 29, floral: 29, wood: 32, minimal: 27, love: 29, custom: 39 };

// Кръгъл таг от смола със златна халка
export function RoundTag({ s, size = 160, qr = false }: { s: TagStyle; size?: number; qr?: boolean }) {
  const id = `t-${s.slug}${qr ? 'q' : ''}`;
  const seeds = Array.from({ length: 40 }, (_, i) => ({ a: i * 137.5, r: (i * 17) % 42, k: i }));
  return (
    <svg viewBox="0 0 120 132" width={size} height={size * 1.1} aria-hidden style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id={`${id}-b`} cx="35%" cy="30%" r="80%"><stop offset="0" stopColor={s.bg1} /><stop offset="1" stopColor={s.bg2} /></radialGradient>
        <linearGradient id={`${id}-ring`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#F6E4A8" /><stop offset=".5" stopColor="#C9A24A" /><stop offset="1" stopColor="#7E5E16" /></linearGradient>
        <linearGradient id={`${id}-gl`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".6" /><stop offset=".5" stopColor="#fff" stopOpacity=".04" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
        <filter id={`${id}-sh`} x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#2f2410" floodOpacity=".35" /></filter>
        <clipPath id={`${id}-c`}><circle cx="60" cy="72" r="50" /></clipPath>
      </defs>
      <circle cx="60" cy="14" r="8" fill="none" stroke={`url(#${id}-ring)`} strokeWidth="3.6" />
      <circle cx="60" cy="27" r="4" fill="none" stroke={`url(#${id}-ring)`} strokeWidth="2.6" />
      <g filter={`url(#${id}-sh)`}><circle cx="60" cy="72" r="50" fill={`url(#${id}-ring)`} /></g>
      <circle cx="60" cy="72" r="46" fill={`url(#${id}-b)`} />
      <g clipPath={`url(#${id}-c)`}>
        {s.kind === 'ocean' && <g fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="2.2"><path d="M14 60c14-10 26 8 40-2s22-14 40-4" /><path d="M10 80c16-12 28 6 44-4s20-12 42-2" strokeOpacity=".35" /><path d="M20 98c14-8 24 4 38-2s18-10 34-2" strokeOpacity=".25" /></g>}
        {s.kind === 'forest' && <g>{[[40, 70, 1], [78, 56, .8], [62, 96, .9]].map(([x, y, k], i) => (<g key={i} transform={`translate(${x} ${y}) scale(${k})`} fill="#DCEBD3"><path d="M0-22c-8 8-10 20-4 30 4-4 6-10 8-16 2 6 4 12 8 16 6-10 4-22-4-30-2 2-4 4-8 0z" /><path d="M0-22v40" stroke="#B8D0AE" strokeWidth="1.2" /></g>))}</g>}
        {s.kind === 'galaxy' && <g fill="#fff">{seeds.map(({ a, r, k }) => <circle key={k} cx={60 + Math.cos(a) * r} cy={72 + Math.sin(a) * r} r={k % 5 === 0 ? 1.6 : 0.7} opacity={k % 3 ? .9 : .5} />)}<ellipse cx="60" cy="72" rx="34" ry="14" fill="#B58BF0" opacity=".25" transform="rotate(-25 60 72)" /></g>}
        {s.kind === 'floral' && <g>{[[40, 60], [72, 54], [82, 86], [48, 96], [60, 76], [30, 84]].map(([x, y], i) => (<g key={i} transform={`translate(${x} ${y}) scale(${i % 2 ? .75 : 1})`}>{[0, 72, 144, 216, 288].map((r) => <ellipse key={r} cx="0" cy="-5" rx="3" ry="5.5" fill={i % 3 === 0 ? '#E58BA7' : i % 3 === 1 ? '#F3C8D2' : '#F6D889'} transform={`rotate(${r})`} />)}<circle r="2.2" fill="#C9A24A" /></g>))}<path d="M20 100c14-6 26-4 34 8" stroke="#8FB08A" strokeWidth="1.5" fill="none" /></g>}
        {s.kind === 'wood' && <g fill="none" stroke="#4E2E12" strokeOpacity=".45" strokeWidth="1.4">{[20, 30, 40, 50, 60].map((r) => <ellipse key={r} cx="60" cy="72" rx={r} ry={r * 1.15} />)}<path d="M60 72c-6-4-16 2-12 10" strokeWidth="2" /></g>}
        {(s.kind === 'wood' || s.kind === 'minimal') && <g fill={s.kind === 'wood' ? '#2B1B0C' : '#2A2621'} transform="translate(60 72) scale(.75)"><ellipse cx="-13" cy="-14" rx="5" ry="6.5" transform="rotate(-18 -13 -14)" /><ellipse cx="13" cy="-14" rx="5" ry="6.5" transform="rotate(18 13 -14)" /><ellipse cx="-22" cy="-2" rx="4.3" ry="5.6" transform="rotate(-32 -22 -2)" /><ellipse cx="22" cy="-2" rx="4.3" ry="5.6" transform="rotate(32 22 -2)" /><path d="M0 0c-9-6-19 2-15 12 2.6 6 9.4 9 15 9s12.4-3 15-9c4-10-6-18-15-12z" /></g>}
        {s.kind === 'love' && <g><path d="M60 92c-14-9-26-19-26-30a12 12 0 0 1 26-6 12 12 0 0 1 26 6c0 11-12 21-26 30z" fill="#F2C7C2" /><path d="M60 88c-11-8-21-16-21-25a9.5 9.5 0 0 1 21-5 9.5 9.5 0 0 1 21 5c0 9-10 17-21 25z" fill="#C6302A" /></g>}
        {s.kind === 'custom' && <g>{[['#F4C55D', 34, 60], ['#E7607A', 70, 52], ['#5FB0D9', 82, 88], ['#7FC77A', 44, 96], ['#F19A4A', 62, 74]].map(([c, x, y], i) => <circle key={i} cx={x as number} cy={y as number} r={11 - i} fill={c as string} opacity=".85" />)}<text x="60" y="118" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff" fontFamily="var(--sans)">твой дизайн</text></g>}
        {qr && <g transform="translate(78 92) scale(.32)"><rect x="-4" y="-4" width="60" height="60" rx="6" fill="#fff" /><g fill="#111"><rect width="14" height="14" /><rect x="3" y="3" width="8" height="8" fill="#fff" /><rect x="5" y="5" width="4" height="4" /><rect x="38" width="14" height="14" /><rect x="41" y="3" width="8" height="8" fill="#fff" /><rect x="43" y="5" width="4" height="4" /><rect y="38" width="14" height="14" /><rect x="3" y="41" width="8" height="8" fill="#fff" /><rect x="5" y="43" width="4" height="4" /><rect x="18" y="2" width="4" height="4" /><rect x="26" y="4" width="4" height="4" /><rect x="20" y="10" width="4" height="4" /><rect x="30" y="12" width="4" height="4" /><rect x="2" y="18" width="4" height="4" /><rect x="10" y="20" width="4" height="4" /><rect x="18" y="18" width="4" height="4" /><rect x="26" y="22" width="4" height="4" /><rect x="34" y="20" width="4" height="4" /><rect x="42" y="18" width="4" height="4" /><rect x="48" y="24" width="4" height="4" /><rect x="6" y="28" width="4" height="4" /><rect x="14" y="30" width="4" height="4" /><rect x="22" y="28" width="4" height="4" /><rect x="30" y="32" width="4" height="4" /><rect x="40" y="30" width="4" height="4" /><rect x="20" y="40" width="4" height="4" /><rect x="28" y="44" width="4" height="4" /><rect x="36" y="40" width="4" height="4" /><rect x="44" y="46" width="4" height="4" /><rect x="22" y="50" width="4" height="4" /><rect x="34" y="50" width="4" height="4" /></g></g>}
        <circle cx="60" cy="72" r="46" fill={`url(#${id}-gl)`} />
        <ellipse cx="42" cy="44" rx="14" ry="7" fill="#fff" opacity=".45" transform="rotate(-30 42 44)" />
      </g>
      <circle cx="60" cy="72" r="46" fill="none" stroke="#fff" strokeOpacity=".3" strokeWidth=".8" />
    </svg>
  );
}
