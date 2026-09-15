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

function BridgePaw() {
  return <svg className="petalapa-bridge-paw" viewBox="0 0 32 32" aria-hidden><g fill="currentColor"><ellipse cx="10" cy="9" rx="3.1" ry="4"/><ellipse cx="22" cy="9" rx="3.1" ry="4"/><ellipse cx="6" cy="17" rx="2.7" ry="3.4"/><ellipse cx="26" cy="17" rx="2.7" ry="3.4"/><path d="M16 15c-5.6-3.8-11.6 1.5-9 7.7 1.6 3.9 5.7 5.8 9 5.8s7.4-1.9 9-5.8c2.6-6.2-3.4-11.5-9-7.7z"/></g></svg>;
}

export function PetalapaWordmark({ href = '/', light = false, compact = false }: { href?: string; light?: boolean; compact?: boolean }) {
  return (
    <a href={href} className={`petalapa-brand${light ? ' is-light' : ''}${compact ? ' is-compact' : ''}`} aria-label="petalapa">
      <span className="petalapa-lockup">
        <span className="petalapa-name"><span>pet</span><BridgePaw/><span>lapa</span></span>
        <small className="petalapa-tagline">MORE THAN A TAG</small>
      </span>
    </a>
  );
}
