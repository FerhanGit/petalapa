export function PetalapaMark({ size = 14, light = false }: { size?: number; light?: boolean }) {
  const color = light ? '#f7b45b' : '#d88a2f';
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden focusable="false">
      <g fill={color}>
        <ellipse cx="14" cy="14" rx="5.2" ry="6.3" transform="rotate(-18 14 14)" />
        <ellipse cx="34" cy="14" rx="5.2" ry="6.3" transform="rotate(18 34 14)" />
        <ellipse cx="8" cy="27" rx="4.3" ry="5.5" transform="rotate(-30 8 27)" />
        <ellipse cx="40" cy="27" rx="4.3" ry="5.5" transform="rotate(30 40 27)" />
        <path d="M24 24c-8.7-5.5-18.2 2.3-14.4 11.8C12.1 41.8 18.6 44.5 24 44.5s11.9-2.7 14.4-8.7C42.2 26.3 32.7 18.5 24 24z" />
      </g>
    </svg>
  );
}

export function PetalapaWordmark({ href = '/', light = false, compact = false }: { href?: string; light?: boolean; compact?: boolean }) {
  return (
    <a href={href} className={`petalapa-brand${light ? ' is-light' : ''}${compact ? ' is-compact' : ''}`} aria-label="petalapa">
      <span className="petalapa-name" aria-hidden="true">
        <span>pet</span><span className="petalapa-paw"><PetalapaMark size={compact ? 11 : 13} light={light} /></span><span>lapa</span>
      </span>
      {!compact && <small className="petalapa-tagline">MORE THAN A TAG</small>}
    </a>
  );
}
