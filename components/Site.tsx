'use client';
import { useState } from 'react';
import { Wordmark } from './Brand';
import { Ic, I } from './Icons';
export { Ic, I };
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
