// Лапа във формата на „а“ – петата лапа
export function PawA({ color = 'var(--gold)', size = 20 }: { color?: string; size?: number }) {
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
export function Wordmark({ href = '/' }: { href?: string }) {
  return (<a className="wordmark" href={href} aria-label="PetaLapa">pet<PawA />lapa</a>);
}
export function BrandPill() { return (<div className="brandpill"><Wordmark /></div>); }
export function Footer() {
  return (
    <div className="footer">
      <Wordmark />
      <span>Ръчна изработка в България · petalapa.com</span>
    </div>
  );
}
// Таг-лапа за карти с дизайни (CSS/SVG вместо снимки, докато ги няма)
export function PawTag({ fill, accent = '#C9A24A', dots = false, flowers = false, stars = false }: { fill: string; accent?: string; dots?: boolean; flowers?: boolean; stars?: boolean }) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden>
      <defs><radialGradient id={`g${fill.replace('#','')}`} cx="35%" cy="30%"><stop offset="0" stopColor="#fff" stopOpacity=".55" /><stop offset=".6" stopColor="#fff" stopOpacity="0" /></radialGradient></defs>
      <g stroke={accent} strokeWidth="2.5">
        <circle cx="60" cy="12" r="6" fill="none" />
        <ellipse cx="60" cy="34" rx="12" ry="16" fill={fill} />
        <ellipse cx="34" cy="46" rx="11" ry="15" fill={fill} transform="rotate(-25 34 46)" />
        <ellipse cx="86" cy="46" rx="11" ry="15" fill={fill} transform="rotate(25 86 46)" />
        <path d="M60 58 c-22 -14 -46 4 -38 26 c5 14 22 22 38 34 c16 -12 33 -20 38 -34 c8 -22 -16 -40 -38 -26 z" fill={fill} />
      </g>
      <g fill="none">
        <ellipse cx="60" cy="34" rx="12" ry="16" fill={`url(#g${fill.replace('#','')})`} />
        <path d="M60 58 c-22 -14 -46 4 -38 26 c5 14 22 22 38 34 c16 -12 33 -20 38 -34 c8 -22 -16 -40 -38 -26 z" fill={`url(#g${fill.replace('#','')})`} />
      </g>
      {dots && <g fill={accent} opacity=".85"><circle cx="50" cy="80" r="1.6"/><circle cx="72" cy="92" r="1.4"/><circle cx="64" cy="72" r="1.2"/><circle cx="46" cy="98" r="1.3"/><circle cx="78" cy="78" r="1.5"/><circle cx="58" cy="30" r="1.2"/><circle cx="36" cy="44" r="1.1"/><circle cx="86" cy="48" r="1.3"/></g>}
      {flowers && <g><circle cx="52" cy="82" r="4" fill="#F2E7C5"/><circle cx="52" cy="82" r="1.5" fill="#D9A93B"/><circle cx="70" cy="94" r="3.5" fill="#F2E7C5"/><circle cx="70" cy="94" r="1.3" fill="#D9A93B"/><circle cx="60" cy="34" r="3" fill="#F2E7C5"/><circle cx="60" cy="34" r="1.1" fill="#D9A93B"/></g>}
      {stars && <g fill="#fff"><circle cx="48" cy="84" r="1.2"/><circle cx="74" cy="90" r=".9"/><circle cx="62" cy="70" r="1.4"/><circle cx="40" cy="96" r=".8"/><circle cx="80" cy="76" r="1"/><circle cx="60" cy="28" r="1"/><circle cx="88" cy="50" r=".8"/></g>}
    </svg>
  );
}
