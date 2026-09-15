import { PetalapaWordmark } from './ModernBrand';

export const Ic = ({ d, size = 20 }: { d: string; size?: number }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>);
export const I = {
  nfc: 'M6 8.5a8 8 0 0 1 12 0M8.5 11.5a4.5 4.5 0 0 1 7 0M12 15v.01',
  resin: 'M12 3l7 4v10l-7 4-7-4V7z M12 3v18 M5 7l7 4 7-4',
  profile: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z M9 12l2 2 4-4',
  qr: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 14h2v2h-2zM14 18h2v2h-2zM18 18h2v2h-2z',
  heart: 'M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z',
  palette: 'M12 3a9 9 0 1 0 0 18c1.5 0 2-1 2-2 0-1.2-1-1.5-1-2.5S14 15 15 15h2a4 4 0 0 0 4-4 8 8 0 0 0-9-8z M7.5 10.5v.01M10 7v.01M14 7v.01M17 10v.01',
  pen: 'M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z',
  cart: 'M3 3h2l2.4 12.5a2 2 0 0 0 2 1.5h8.7a2 2 0 0 0 2-1.5L22 7H6M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM18 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2z',
  search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3',
  user: 'M20 21a8 8 0 0 0-16 0M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  phone: 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 2 1.7c.1.9.4 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7A2 2 0 0 1 22 16.9z',
  msg: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
  share: 'M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13',
  medical: 'M12 3v18M3 12h18',
  info: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 16v-4M12 8h.01',
  chev: 'M6 9l6 6 6-6',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  check: 'M20 6L9 17l-5-5',
  truck: 'M1 3h15v13H1zM16 8h4l3 3v5h-7V8zM5.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM18.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  lock: 'M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4',
  card: 'M2 5h20v14H2zM2 10h20',
  bolt: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  alert: 'M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01',
  ig: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17.5 6.5h.01',
  fb: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
};

export function SiteNav() {
  return (
    <header className="topbar"><div className="container nav">
      <PetalapaWordmark />
      <nav className="links"><a href="/">Начало</a><a href="/order">Дизайни</a><a href="/#how">Как работи</a><a href="/#about">За нас</a><a href="mailto:hello@petalapa.com">Контакт</a></nav>
      <div className="navr">
        <a href="/#designs" className="icbtn" aria-label="Дизайни"><Ic d={I.search} size={17} /></a>
        <a href="/dashboard" className="icbtn" aria-label="Моят профил"><Ic d={I.user} size={17} /></a>
        <a href="/order" className="icbtn" aria-label="Поръчка"><Ic d={I.cart} size={17} /></a>
      </div>
    </div></header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer"><div className="container">
      <PetalapaWordmark compact />
      <nav className="links"><a href="/">Начало</a><a href="/order">Дизайни</a><a href="/#how">Как работи</a><a href="/#about">За нас</a><a href="mailto:hello@petalapa.com">Контакт</a></nav>
      <div className="social"><a href="https://instagram.com/petalapa" aria-label="Instagram"><Ic d={I.ig} size={18} /></a><a href="https://facebook.com/petalapa" aria-label="Facebook"><Ic d={I.fb} size={18} /></a></div>
      <span className="copy">© 2026 petalapa. Ръчно изработени тагове за любимци.</span>
    </div></footer>
  );
}
