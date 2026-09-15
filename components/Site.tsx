'use client';
import { useState } from 'react';
import { Wordmark } from './Brand';
export const Ic = ({ d, size = 20, sw = 1.7 }: { d: string; size?: number; sw?: number }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>);
export const I = {
  nfc: 'M6 8.5a8 8 0 0 1 12 0M8.5 11.5a4.5 4.5 0 0 1 7 0M12 15v.01',
  qr: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 14h2v2h-2zM14 18h2v2h-2zM18 18h2v2h-2z',
  grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z M9 12l2 2 4-4',
  shieldp: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z',
  heart: 'M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z',
  palette: 'M12 3a9 9 0 1 0 0 18c1.5 0 2-1 2-2 0-1.2-1-1.5-1-2.5S14 15 15 15h2a4 4 0 0 0 4-4 8 8 0 0 0-9-8z M7.5 10.5v.01M10 7v.01M14 7v.01M17 10v.01',
  pen: 'M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z',
  tool: 'M14.7 6.3a4 4 0 0 0 5 5L13 18l-3-3 6.7-8.7zM3 21l4-4M10 15l-5 5',
  cart: 'M3 3h2l2.4 12.5a2 2 0 0 0 2 1.5h8.7a2 2 0 0 0 2-1.5L22 7H6M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM18 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2z',
  search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3',
  user: 'M20 21a8 8 0 0 0-16 0M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  phone: 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7A2 2 0 0 1 22 16.9z',
  mail: 'M4 4h16v16H4zM4 7l8 6 8-6',
  pin: 'M12 22s7-7.3 7-12a7 7 0 1 0-14 0c0 4.7 7 12 7 12zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  share: 'M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13',
  chev: 'M6 9l6 6 6-6',
  chevr: 'M9 6l6 6-6 6',
  chevl: 'M15 6l-6 6 6 6',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  back: 'M19 12H5M11 18l-6-6 6-6',
  check: 'M20 6L9 17l-5-5',
  lock: 'M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4',
  card: 'M2 5h20v14H2zM2 10h20',
  bolt: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  alert: 'M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01',
  bell: 'M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0',
  home: 'M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1z',
  box: 'M21 8l-9-4-9 4v8l9 4 9-4zM3 8l9 4 9-4M12 12v8',
  help: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM9.5 9a2.5 2.5 0 0 1 5 .5c0 1.5-2.5 2-2.5 3.5M12 17h.01',
  menu: 'M4 7h16M4 12h16M4 17h16',
  x: 'M18 6L6 18M6 6l12 12',
  drop: 'M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z',
  feather: 'M20 4c-4 0-9 2-12 7l-4 9 9-4c5-3 7-8 7-12zM9 15l6-6',
  ig: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17.5 6.5h.01',
  fb: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
  dog: 'M10 5.2L6 3v6l2 2v3l-2 4h4l2-3 2 3h4l-2-4v-3l2-2V3l-4 2.2a6 6 0 0 0-4 0z',
  cat: 'M5 4l3 3h8l3-3v7a7 7 0 0 1-14 0zM9 12h.01M15 12h.01M10 15h4',
  calendar: 'M4 5h16v15H4zM4 10h16M8 3v4M16 3v4',
  cam: 'M4 8h3l2-3h6l2 3h3v11H4zM12 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z',
};
export function SiteNav({ cart = 0 }: { cart?: number }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="topbar">
      <div className="container nav">
        <Wordmark />
        <nav className="links"><a href="/">Начало</a><a href="/#how">Как работи</a><a href="/#designs">Дизайни</a><a href="/#about">За нас</a></nav>
        <div className="navr">
          <a href="/#designs" className="icbtn" aria-label="Търсене"><Ic d={I.search} /></a>
          <a href="/dashboard" className="icbtn hide-m" aria-label="Профил"><Ic d={I.user} /></a>
          <a href="/order" className="icbtn hide-m" aria-label="Количка"><Ic d={I.cart} />{cart > 0 && <b>{cart}</b>}</a>
          <button className="icbtn show-m" aria-label="Меню" onClick={() => setOpen(true)}><Ic d={I.menu} /></button>
        </div>
      </div>
      {open && (
        <div className="drawer-bg" onClick={() => setOpen(false)}>
          <div className="drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-top"><Wordmark /><button className="icbtn" aria-label="Затвори" onClick={() => setOpen(false)}><Ic d={I.x} /></button></div>
            <a href="/"><Ic d={I.home} />Начало</a><a href="/#how"><Ic d={I.shield} />Как работи</a><a href="/#designs"><Ic d={I.grid} />Дизайни</a><a href="/#about"><Ic d={I.heart} />За нас</a>
            <hr /><a href="/dashboard"><Ic d={I.user} />Профил</a><a href="/dashboard"><Ic d={I.box} />Поръчки</a><a href="/dashboard"><Ic d={I.heart} />Любими</a><a href="mailto:hello@petalapa.com"><Ic d={I.help} />Помощ</a>
            <hr /><a href="/order"><Ic d={I.cart} />Количка<span className="badge">{cart}</span></a>
          </div>
        </div>
      )}
    </header>
  );
}
export function SiteFooter() {
  return (
    <footer className="site-footer"><div className="container">
      <div className="fbrand"><Wordmark sub /></div>
      <nav className="links"><a href="/">Начало</a><a href="/#how">Как работи</a><a href="/#designs">Дизайни</a><a href="/#about">За нас</a><a href="mailto:hello@petalapa.com">Контакт</a></nav>
      <div className="social"><a href="https://instagram.com/petalapa" aria-label="Instagram"><Ic d={I.ig} size={18} /></a><a href="https://facebook.com/petalapa" aria-label="Facebook"><Ic d={I.fb} size={18} /></a></div>
      <span className="copy">© 2026 petalapa · Ръчна изработка в България</span>
    </div></footer>
  );
}
