import Image from 'next/image';
import { STYLES, PhotoTag, ProductShot, IMG } from '@/components/PhotoTag';
import { SiteNav, SiteFooter, Ic, I } from '@/components/Site';


export default function Landing() {
  return (
    <main>
      <SiteNav />
      <div className="container">
        <section className="hero">
          <div className="hero-img"><Image src={IMG.hero} alt="Голдън ретривър на поляна при залез" fill priority sizes="60vw" style={{ objectFit: 'cover', objectPosition: '60% 40%' }} /></div>
          <div className="copy">
            <h1 className="h-hero">Красив таг.<br />Умен начин да<br />намерите своя любимец.</h1>
            <p className="lead">Епоксидни тагове с вграден NFC чип и QR код. Персонален профил на вашия любимец и лесен достъп до неговата информация.</p>
            <div className="cta-row"><a className="btn btn-primary" href="/order">Създай своя таг <Ic d={I.arrow} size={18} /></a></div>
          </div>
          <div className="note">Малък таг,<b>голямо спокойствие ♡</b></div>
          <div className="hero-tag"><PhotoTag s={STYLES[0]} size={96} priority /></div>
        </section>

        <div className="features">
          {[[I.nfc, 'NFC + QR', 'Двойна защита'], [I.resin, 'Епоксидна смола', 'Ръчна изработка'], [I.shield, 'Персонален профил', 'За всеки любимец'], [I.heart, 'Повече сигурност', 'Винаги и навсякъде']].map(([d, b, s]) => (
            <div className="feature" key={b}><span className="ic"><Ic d={d} size={22} /></span><b>{b}</b><span>{s}</span></div>
          ))}
        </div>

        <section className="section" id="how">
          <h2 className="h-section">Как работи?</h2>
          <p className="sub">Само 3 лесни стъпки до персонален таг за твоя любимец.</p>
          <div className="steps">
            {[[I.palette, 'Избери дизайн', 'Разгледай нашите уникални стилове и намери своя.'], null, [I.pen, 'Добави информация', 'Попълни данни за любимеца и стопанина.'], null, [I.cart, 'Поръчай', 'Ние ще изработим и доставим твоя таг до 3–5 работни дни.']].map((s, i) => s ? (
              <div className="step" key={s[1]}><div className="wrap"><span className="ic"><Ic d={s[0]} size={28} /></span><span className="num">{i / 2 + 1}</span></div><b>{s[1]}</b><span>{s[2]}</span></div>
            ) : <span className="arrow" key={i}><Ic d={I.arrow} /></span>)}
          </div>
        </section>

        <section className="section" id="designs">
          <h2 className="h-section">Популярни дизайни</h2>
          <p className="sub">Стил, който подхожда на всяка лапа.</p>
          <div className="designs">
            {STYLES.map((s) => (<a className="design" key={s.slug} href={`/order?style=${s.slug}`}><ProductShot s={s} /><span className="name">{s.name}</span></a>))}
          </div>
        </section>

        <section className="more" id="about">
          <div style={{ position: 'relative', minHeight: 340 }}><Image src={IMG.cat} alt="Котка с таг PetaLapa" fill sizes="50vw" style={{ objectFit: 'cover', objectPosition: '55% 40%' }} /></div>
          <div className="body">
            <h2>Повече от таг.<br />Дигитален дом<br />за твоя любимец.</h2>
            <p>Със PetaLapa получаваш не просто красив аксесоар, а сигурност, информация и връзка — когато е най-важно.</p>
            <div className="list">
              {[[I.nfc, 'NFC чип', 'Чете се за секунди'], [I.qr, 'QR код', 'Алтернативен достъп'], [I.profile, 'Персонализиран профил', 'Снимки, данни, медицинска инфо'], [I.resin, 'Ръчна изработка', 'Уникален дизайн']].map(([d, b, s]) => (<div key={b}><div className="ic"><Ic d={d} /></div><b>{b}</b><span>{s}</span></div>))}
            </div>
          </div>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
