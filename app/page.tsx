import Image from 'next/image';
import { STYLES, PhotoTag, IMG } from '@/components/PhotoTag';
import { SiteNav, SiteFooter, Ic, I } from '@/components/Site';

export default function Landing() {
  const featured = STYLES[0];
  return (
    <main className="reference-home">
      <SiteNav />

      <section className="ref-hero">
        <div className="container ref-hero-grid">
          <div className="ref-hero-copy">
            <span className="ref-eyebrow">ЕПОКСИДНИ ТАГОВЕ · NFC + QR</span>
            <h1>Красив таг. Умен начин<br />да намерите своя<br />любимец.</h1>
            <p>Уникален, ръчно изработен епоксиден таг с вграден NFC чип и QR код. С тих клик или сканиране се отваря персонален профил с важната информация за любимеца.</p>
            <a className="btn btn-primary ref-cta" href="/order">Създай своя таг <Ic d={I.arrow} size={18} /></a>

            <div className="ref-hero-benefits">
              {[[I.nfc, 'NFC + QR', 'технология'], [I.profile, 'Персонален', 'профил'], [I.resin, 'Ръчна изработка', 'от епоксидна смола']].map(([d, a, b]) => (
                <div key={a} className="ref-mini-benefit"><span><Ic d={d} size={18} /></span><b>{a}</b><small>{b}</small></div>
              ))}
            </div>
          </div>

          <div className="ref-hero-media">
            <Image src={IMG.hero} alt="Куче с кръгъл petalapa таг" fill priority sizes="(max-width:900px) 100vw, 50vw" className="ref-dog" />
            <div className="ref-cat-card"><Image src={IMG.cat} alt="Котка с petalapa таг" fill sizes="240px" /></div>
            <div className="ref-hero-tag"><PhotoTag s={featured} size={108} priority /></div>
            <div className="ref-hand-note">„Тук живее<br />една голяма<br />любов ♡“</div>
          </div>
        </div>
      </section>

      <section className="container ref-how" id="how">
        <h2>Как работи?</h2>
        <p>Само три стъпки до красив таг и дигитален профил.</p>
        <div className="ref-steps">
          {[[I.palette, 'Избираш дизайн', 'Разгледай нашите стилове и избери любимия си.'], [I.pen, 'Добавяш информация', 'Попълваш данни за своя любимец и стопанина.'], [I.cart, 'Поръчваш', 'Плащаш удобно онлайн и получаваш тага до куриер.']].map(([d, title, text], index) => (
            <div className="ref-step" key={title}>
              <span className="ref-step-number">{index + 1}</span>
              <span className="ref-step-icon"><Ic d={d} size={24} /></span>
              <b>{title}</b><small>{text}</small>
              {index < 2 && <span className="ref-step-arrow"><Ic d={I.arrow} size={18} /></span>}
            </div>
          ))}
        </div>
      </section>

      <section className="container ref-designs" id="designs">
        <div className="ref-section-title"><div><h2>Нашите дизайни</h2><p>Избери стил, който подхожда на твоя любимец.</p></div></div>
        <div className="ref-design-layout">
          <div className="ref-design-grid">
            {STYLES.map((s) => (
              <a className="ref-design-card" key={s.slug} href={`/order?style=${s.slug}`}>
                <div className="ref-tag-stage"><PhotoTag s={s} size={92} qr={false} nfc={false} /></div>
                <b>{s.name}</b><span>→</span>
              </a>
            ))}
          </div>
          <aside className="ref-featured-product">
            <div className="ref-featured-stage"><PhotoTag s={featured} size={190} /></div>
            <ul>
              <li>NFC чип <span>(скрит в смолата)</span></li>
              <li>QR код <span>(за бърз достъп)</span></li>
            </ul>
            <p>Красив, устойчив и уникален. Всеки таг е ръчно изработен.</p>
            <a href="/order?style=ocean" className="btn btn-primary btn-block">Избери Ocean</a>
          </aside>
        </div>
      </section>

      <section className="ref-security" id="about">
        <div className="container ref-security-grid">
          <div className="ref-security-photo"><Image src={IMG.hero2} alt="Куче навън с petalapa таг" fill sizes="50vw" /></div>
          <div className="ref-security-copy">
            <h2>Повече сигурност.<br />По-малко тревоги.</h2>
            <p>С NFC + QR технологията всеки, който намери вашия любимец, може бързо да се свърже с вас — без приложение и без излишни стъпки.</p>
            <a href="/order" className="ref-text-link">Научи повече за таговете →</a>
            <div className="ref-security-benefits">
              {[[I.shield, 'Бърза връзка', 'до стопанина'], [I.bolt, 'При изгубване', 'сигнал за секунди'], [I.profile, 'Дискретна', 'лична информация']].map(([d, a, b]) => <div key={a}><span><Ic d={d} size={20} /></span><b>{a}</b><small>{b}</small></div>)}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
