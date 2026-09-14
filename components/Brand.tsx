export function BrandMark({ size = 26 }: { size?: number }) {
  return <span className="dot" style={{ width: size, height: size, background: 'var(--green)' }} aria-hidden />;
}
export function BrandPill() {
  return (<div className="brandpill"><BrandMark />PetaLapa</div>);
}
export function Footer() {
  return (
    <div className="footer">
      <span className="dot" style={{ width: 14, height: 14, background: 'var(--gold)' }} aria-hidden />
      PetaLapa · ръчно направени тагове
    </div>
  );
}
