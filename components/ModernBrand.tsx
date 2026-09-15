export function PetalapaMark({ size = 34, light = false }: { size?: number; light?: boolean }) {
  const color = light ? '#fffaf2' : '#244b3b';
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <g fill={color}>
        <ellipse cx="14" cy="15" rx="5" ry="6.5" transform="rotate(-18 14 15)" />
        <ellipse cx="34" cy="15" rx="5" ry="6.5" transform="rotate(18 34 15)" />
        <ellipse cx="7.5" cy="27" rx="4.3" ry="5.6" transform="rotate(-32 7.5 27)" />
        <ellipse cx="40.5" cy="27" rx="4.3" ry="5.6" transform="rotate(32 40.5 27)" />
        <path d="M24 24.5c-8.8-5.8-18.6 2.1-14.7 11.8C11.9 42.3 18.5 45 24 45s12.1-2.7 14.7-8.7C42.6 26.6 32.8 18.7 24 24.5z" />
      </g>
      <path d="M24 32.2c-2.5-2.2-6 .4-4.6 3.1.7 1.5 2.9 2.7 4.6 4.2 1.7-1.5 3.9-2.7 4.6-4.2 1.4-2.7-2.1-5.3-4.6-3.1z" fill={light ? '#244b3b' : '#fffaf2'} opacity=".96" />
    </svg>
  );
}

export function PetalapaWordmark({ href = '/', light = false, compact = false }: { href?: string; light?: boolean; compact?: boolean }) {
  return (
    <a href={href} className={`petalapa-brand${light ? ' is-light' : ''}`} aria-label="petalapa">
      <PetalapaMark size={compact ? 30 : 36} light={light} />
      <span className="petalapa-lockup">
        <span className="petalapa-name" aria-label="petalapa">
          <span>pet</span><span className="petalapa-bridge">a</span><span>lapa</span>
        </span>
        {!compact && <small>MORE THAN A TAG</small>}
      </span>
    </a>
  );
}
