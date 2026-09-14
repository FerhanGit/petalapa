export function PawA({ color = 'currentColor', size = 20 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="-50 -60 100 110" aria-hidden>
      <ellipse cx="0" cy="-46" rx="9" ry="12" fill={color} />
      <ellipse cx="-19" cy="-22" rx="9" ry="12" fill={color} transform="rotate(-22 -19 -22)" />
      <ellipse cx="19" cy="-22" rx="9" ry="12" fill={color} transform="rotate(22 19 -22)" />
      <ellipse cx="-34" cy="12" rx="10" ry="14" fill={color} transform="rotate(-30 -34 12)" />
      <ellipse cx="34" cy="12" rx="10" ry="14" fill={color} transform="rotate(30 34 12)" />
      <path d="M0 -4 c-14 -10 -30 2 -26 16 c3 9 14 16 26 26 c12 -10 23 -17 26 -26 c4 -14 -12 -26 -26 -16 z" fill={color} />
    </svg>
  );
}
export function Wordmark({ href = '/', light = false, size = 24 }: { href?: string; light?: boolean; size?: number }) {
  return (
    <a className={`wordmark${light ? ' light' : ''}`} href={href} aria-label="PetaLapa" style={{ fontSize: size }}>
      pet<span className="paw"><PawA size={size * 0.8} /></span>lapa
      <small>more than a tag</small>
    </a>
  );
}
export function BrandPill() { return (<div className="brandpill"><Wordmark size={20} /></div>); }

export type TagStyle = { slug: string; name: string; sub: string; price: number; base: string; deep: string; pad: string; flakes?: string; flowers?: boolean; stars?: boolean; pearl?: boolean };

// Реалистично рендирана лапа от смола: тяло с градиент, възглавнички, златни люспи, гланц, халка
export function ResinPaw({ s, size = 220 }: { s: TagStyle; size?: number }) {
  const id = `p-${s.slug}`;
  const flakes = s.flakes ? Array.from({ length: 34 }, (_, i) => { const a = i * 137.5; const r = 8 + (i * 7) % 40; const x = 60 + Math.cos(a) * r * 0.55; const y = 62 + Math.sin(a) * r * 0.6 + 8; return { x, y, r: 0.8 + (i % 3) * 0.5, rot: (i * 53) % 180 }; }) : [];
  return (
    <svg viewBox="0 0 120 130" width={size} height={size * 130 / 120} aria-hidden style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id={`${id}-b`} cx="38%" cy="28%" r="80%"><stop offset="0" stopColor={s.base} /><stop offset="1" stopColor={s.deep} /></radialGradient>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".55" /><stop offset=".45" stopColor="#fff" stopOpacity=".05" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
        <linearGradient id={`${id}-ring`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#F3DFA2" /><stop offset=".5" stopColor="#C9A24A" /><stop offset="1" stopColor="#8A6A1E" /></linearGradient>
        <filter id={`${id}-sh`} x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#3a2a10" floodOpacity=".35" /></filter>
        <clipPath id={`${id}-c`}><PawShape /></clipPath>
      </defs>
      <circle cx="60" cy="9" r="7" fill="none" stroke={`url(#${id}-ring)`} strokeWidth="3.2" />
      <g filter={`url(#${id}-sh)`}>
        <g fill={`url(#${id}-b)`}><PawShape /></g>
      </g>
      <g clipPath={`url(#${id}-c)`}>
        {s.pearl && <ellipse cx="45" cy="70" rx="40" ry="46" fill="#fff" opacity=".18" />}
        {flakes.map((f, i) => <rect key={i} x={f.x} y={f.y} width={f.r * 2} height={f.r * 1.2} fill={s.flakes} transform={`rotate(${f.rot} ${f.x} ${f.y})`} opacity=".9" />)}
        {s.flowers && <g>{[[50, 84], [70, 96], [58, 34], [36, 50], [84, 52], [66, 78]].map(([x, y], i) => (<g key={i} transform={`translate(${x} ${y}) scale(${i % 2 ? .8 : 1})`}>{[0, 60, 120, 180, 240, 300].map((r) => <ellipse key={r} cx="0" cy="-3.2" rx="1.5" ry="3" fill="#F7EDD0" transform={`rotate(${r})`} />)}<circle r="1.4" fill="#D9A93B" /></g>))}</g>}
        {s.stars && <g fill="#fff">{[[48, 84, 1.2], [74, 90, .8], [62, 70, 1.4], [40, 98, .7], [80, 78, 1], [60, 30, .9], [88, 50, .7], [34, 44, .8]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} />)}</g>}
        <g fill="#000" opacity=".12"><PadShapes /></g>
        <g fill={s.pad} opacity=".9"><PadShapes inset /></g>
        <g fill={`url(#${id}-g)`}><PawShape /></g>
        <ellipse cx="42" cy="34" rx="16" ry="9" fill="#fff" opacity=".35" transform="rotate(-25 42 34)" />
      </g>
      <g fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth=".8"><PawShape /></g>
    </svg>
  );
}
function PawShape() {
  return (<><ellipse cx="60" cy="36" rx="13" ry="17" /><ellipse cx="33" cy="48" rx="12" ry="16" transform="rotate(-25 33 48)" /><ellipse cx="87" cy="48" rx="12" ry="16" transform="rotate(25 87 48)" /><path d="M60 60 c-24 -15 -50 5 -41 29 c6 15 24 24 41 37 c17 -13 35 -22 41 -37 c9 -24 -17 -44 -41 -29 z" /></>);
}
function PadShapes({ inset = false }: { inset?: boolean }) {
  const k = inset ? 0.62 : 0.72;
  return (<><ellipse cx="60" cy="36" rx={13 * k} ry={17 * k} /><ellipse cx="33" cy="48" rx={12 * k} ry={16 * k} transform="rotate(-25 33 48)" /><ellipse cx="87" cy="48" rx={12 * k} ry={16 * k} transform="rotate(25 87 48)" /><path transform={`translate(60 88) scale(${k}) translate(-60 -88)`} d="M60 60 c-24 -15 -50 5 -41 29 c6 15 24 24 41 37 c17 -13 35 -22 41 -37 c9 -24 -17 -44 -41 -29 z" /></>);
}
export const STYLES: TagStyle[] = [
  { slug: 'kehlibar', name: 'Кехлибар', sub: 'сушени цветя в злато', price: 29, base: '#F2C765', deep: '#B77A1E', pad: '#F8E2A0', flowers: true },
  { slug: 'okean', name: 'Океан', sub: 'дълбоко синьо, глитер', price: 29, base: '#3C63A8', deep: '#16284F', pad: '#5F86C9', flakes: '#BFD3F2' },
  { slug: 'oniks', name: 'Оникс', sub: 'черно със златни люспи', price: 34, base: '#3A3A3F', deep: '#111114', pad: '#4A4A50', flakes: '#D9AE4A' },
  { slug: 'sedef', name: 'Седеф', sub: 'перлено розово', price: 29, base: '#F3CBD3', deep: '#D4939F', pad: '#FBE3E8', pearl: true },
  { slug: 'livada', name: 'Ливада', sub: 'зелено, полски цветя', price: 29, base: '#5E9161', deep: '#24422A', pad: '#7FB07F', flowers: true },
  { slug: 'galaktika', name: 'Галактика', sub: 'лилаво, звезден прах', price: 29, base: '#6A4E9C', deep: '#221740', pad: '#8A6BC0', stars: true, flakes: '#D8C6F5' },
  { slug: 'mramor', name: 'Мрамор', sub: 'бяло със златни жилки', price: 34, base: '#F7F2EA', deep: '#CFC4B4', pad: '#FFFCF7', flakes: '#C9A24A' },
  { slug: 'custom', name: 'По твой избор', sub: 'снимка, пясък, цветя', price: 39, base: '#B7CDB4', deep: '#5C7F5E', pad: '#D5E4D2', pearl: true },
];
