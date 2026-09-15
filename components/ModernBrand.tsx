export function PetalapaMark({ size = 34, light = false }: { size?: number; light?: boolean }) {
  const color = light ? '#fff7e8' : '#0b4a3d';
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden focusable="false">
      <g fill={color}>
        <ellipse cx="14" cy="13" rx="5" ry="6.5" transform="rotate(-18 14 13)" />
        <ellipse cx="34" cy="13" rx="5" ry="6.5" transform="rotate(18 34 13)" />
        <ellipse cx="8" cy="26" rx="4.4" ry="5.6" transform="rotate(-30 8 26)" />
        <ellipse cx="40" cy="26" rx="4.4" ry="5.6" transform="rotate(30 40 26)" />
        <path d="M24 23c-8.8-5.7-18.5 2.2-14.5 12C12 41 18.6 44 24 44s12-3 14.5-9C42.5 25.2 32.8 17.3 24 23z" />
      </g>
      <circle cx="24" cy="34.5" r="4.2" fill={light ? '#0b4a3d' : '#fff7e8'} opacity=".94" />
    </svg>
  );
}

export function PetalapaWordmark({ href = '/', light = false, compact = false }: { href?: string; light?: boolean; compact?: boolean }) {
  return (
    <a href={href} className={`petalapa-brand${light ? ' is-light' : ''}${compact ? ' is-compact' : ''}`} aria-label="petalapa">
      <span className="petalapa-logo-mark"><PetalapaMark size={compact ? 26 : 34} light={light} /></span>
      <span className="petalapa-lockup">
        <span className="petalapa-name">petalapa</span>
        <small className="petalapa-tagline">MORE THAN A TAG</small>
      </span>
    </a>
  );
}
