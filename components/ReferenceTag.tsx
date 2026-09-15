type Variant = 'forest' | 'ocean' | 'blush' | 'galaxy' | 'paw' | 'amber';

export function ReferenceTag({ variant, size = 86 }: { variant: Variant; size?: number }) {
  return (
    <div className={`ref-tag ref-tag-${variant}`} style={{ width: size, height: size * 1.16 }} aria-hidden>
      <span className="ref-tag-ring" />
      <span className="ref-tag-link" />
      <span className="ref-tag-disc">
        <span className="ref-tag-art">
          {variant === 'forest' && <><i className="flower f1"/><i className="flower f2"/><i className="flower f3"/><i className="leaf l1"/><i className="leaf l2"/></>}
          {variant === 'ocean' && <><i className="wave w1"/><i className="wave w2"/><i className="shell">◒</i><i className="flake a1"/><i className="flake a2"/></>}
          {variant === 'blush' && <><i className="flower pink p1"/><i className="flower pink p2"/><i className="flower pink p3"/><i className="stem s1"/><i className="stem s2"/></>}
          {variant === 'galaxy' && <><i className="moon">☾</i><i className="star st1">★</i><i className="star st2">✦</i><i className="star st3">✧</i></>}
          {variant === 'paw' && <svg className="paw-gold" viewBox="0 0 48 48"><ellipse cx="14" cy="15" rx="5" ry="6.5"/><ellipse cx="34" cy="15" rx="5" ry="6.5"/><ellipse cx="8" cy="28" rx="4.3" ry="5.6"/><ellipse cx="40" cy="28" rx="4.3" ry="5.6"/><path d="M24 25c-9-6-19 2-15 12 2.6 6 9.4 9 15 9s12.4-3 15-9c4-10-6-18-15-12z"/></svg>}
          {variant === 'amber' && <><i className="amber-stem as1"/><i className="amber-stem as2"/><i className="amber-flower af1"/><i className="amber-flower af2"/><i className="amber-flower af3"/></>}
        </span>
        <span className="ref-tag-gloss" />
      </span>
    </div>
  );
}
