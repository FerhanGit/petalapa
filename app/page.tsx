import { RoundTag, STYLES } from '@/components/Brand';
import { SiteNav, SiteFooter, Ic, I } from '@/components/Site';

const HERO = 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1600&q=80';
const CAT = 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=80';

export default function Landing() {
  return (
    <main>
      <SiteNav />
      <div className="container">
        <section className="hero">
          <img src={HERO} alt="Голдън ретривър с таг PetaLapa на нашийника" />
          <div className="copy">
            <h1 className="h-hero">Красив таг.<br />Умен начин да<br />намерите своя любимец.</h1>
            <p className="lead">Епоксидни тагове с вграден NFC чип и QR код. Персонален профил на вашия любимец и лесен достъп до неговата информация.</p>
            <div className="cta-row"><a className="btn btn-primary" href="/order">Създай своя таг <Ic d={I.arrow} size={18} /></a></div>
          </div>
          <div className="note">Малък таг,<b>голямо спокойствие ♡</b></div>
          <div className="tag-on-collar"><RoundTag s={STYLES[0]} size={64} /></div>
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
              <div className="step" key={s[1]}><div className="wrap"><span className="num">{i / 2 + 1}</span><span className="ic"><Ic d={s[0]} size={28} /></span></div><b>{s[1]}</b><span>{s[2]}</span></div>
            ) : <span className="arrow" key={i}><Ic d={I.arrow} /></span>)}
          </div>
        </section>

        <section className="section" id="designs">
          <h2 className="h-section">Популярни дизайни</h2>
          <p className="sub">Стил, който подхожда на всяка лапа.</p>
          <div className="designs">
            {STYLES.map((s) => (<a className="design" key={s.slug} href={`/order?style=${s.slug}`}><div className="pad"><RoundTag s={s} /></div><span className="name">{s.name}</span></a>))}
          </div>
        </section>

        <section className="more" id="about">
          <img src={CAT} alt="Котка с таг PetaLapa" loading="lazy" />
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
