import { STYLES, PhotoTag, IMG } from '@/components/PhotoTag';
import { SiteNav, SiteFooter, Ic, I } from '@/components/Site';

const LAGOTTO_HERO = 'https://images.pexels.com/photos/15222727/pexels-photo-15222727.jpeg?auto=compress&cs=tinysrgb&w=1400';
const LAGOTTO_FIELD = 'https://images.pexels.com/photos/11003091/pexels-photo-11003091.jpeg?auto=compress&cs=tinysrgb&w=1400';

export default function Landing() {
  const forest = STYLES.find((s) => s.slug === 'forest') ?? STYLES[0];
  const cherry = STYLES.find((s) => s.slug === 'love') ?? STYLES[1];

  return (
    <main className="final-home">
      <SiteNav />
      <div className="final-wrap">
        <section className="final-hero">
          <div className="final-hero-grid">
            <div className="final-hero-copy">
              <span className="final-kicker">ПОВЕЧЕ ОТ АДРЕС. ПОВЕЧЕ ГРИЖА.</span>
              <h1>Красиви и умни<br />тагове за твоите<br />любимци</h1>
              <p>Стилни кръгли медальони с NFC и QR код, които свързват твоя любимец с важната информация — винаги, когато има нужда.</p>
              <a className="final-primary" href="#designs">Разгледай дизайните <Ic d={I.arrow} size={17} /></a>
              <div className="final-benefits">
                {[[I.shield, 'Сигурност', 'при изгубване'], [I.heart, 'Лесна връзка', 'с вас'], [I.nfc, 'NFC и QR код', 'във всеки таг'], [I.resin, 'Уникални', 'ръчно изработени']].map(([d, a, b]) => (
                  <div className="final-benefit" key={a}><span><Ic d={d} size={18} /></span><b>{a}</b><small>{b}</small></div>
                ))}
              </div>
            </div>
            <div className="final-hero-media">
              <img className="final-lagotto" src={LAGOTTO_HERO} alt="Lagotto Romagnolo с кръгъл petalapa таг" />
              <img className="final-cat" src={IMG.cat} alt="Котка с кръгъл petalapa таг" />
              <div className="final-dog-tag"><PhotoTag s={forest} size={74} qr={false} nfc={false} /></div>
              <div className="final-cat-tag"><PhotoTag s={cherry} size={58} qr={false} nfc={false} /></div>
              <div className="final-hand">Малки медальони.<br />Голямо спокойствие. ♡</div>
            </div>
          </div>
        </section>

        <section className="final-section" id="how">
          <h2>Как работи?</h2>
          <p className="subcopy">Три лесни стъпки до красив таг и дигитален профил.</p>
          <div className="final-how-grid">
            {[[I.pen, 'Избери дизайн', 'Разгледай нашите колекции и избери любимия таг.'], [I.profile, 'Добави информация', 'Попълни данните за твоя любимец и контакт.'], [I.shield, 'Пълна сигурност', 'При сканиране се показва профилът на любимеца.']].map(([d, title, text], index) => (
              <div className="final-how-card" key={title}>
                <span className="final-how-number">{index + 1}</span>
                <span className="final-how-icon"><Ic d={d} size={21} /></span>
                <b>{title}</b><small>{text}</small>
              </div>
            ))}
          </div>
        </section>

        <section className="final-section" id="designs">
          <div className="final-title-row">
            <div><h2>Нашите дизайни</h2><p>Всеки таг е ръчно изработен с внимание към детайла.</p></div>
            <a className="final-link" href="/order">Виж всички дизайни →</a>
          </div>
          <div className="final-products">
            <div className="final-tag-grid">
              {STYLES.map((s) => (
                <a className="final-tag-card" key={s.slug} href={`/order?style=${s.slug}`}>
                  <div className="final-tag-stage"><PhotoTag s={s} size={112} qr={false} nfc={false} /></div>
                  <b>{s.name}</b>
                </a>
              ))}
            </div>
            <aside className="final-featured">
              <div className="final-featured-media"><PhotoTag s={forest} size={205} /></div>
              <div className="final-featured-body">
                <span className="final-badge">★ Най-популярен</span>
                <h3>Forest</h3>
                <p className="sub">Естествена красота, която пази.</p>
                <div className="price">{forest.price.toFixed(2)} лв.</div>
                <ul className="final-checks"><li>NFC и QR код</li><li>Персонализиран профил</li><li>Водоустойчив и издръжлив</li><li>Ръчно изработен</li><li>За кучета и котки</li></ul>
                <div className="final-featured-actions"><a className="solid" href="/order?style=forest">Добави в количката</a><a className="outline" href="/order?style=forest">Персонализирай</a></div>
              </div>
            </aside>
          </div>
        </section>

        <section className="final-security" id="about">
          <div className="final-security-media">
            <img src={LAGOTTO_FIELD} alt="Lagotto Romagnolo с petalapa таг" />
            <div className="final-security-tag"><PhotoTag s={STYLES[0]} size={60} qr={false} nfc={false} /></div>
            <div className="final-security-note">Щастливи любимци.<br />По-спокойни стопани. ♡</div>
          </div>
          <div className="final-security-copy">
            <h2>Повече сигурност.<br />По-малко тревоги.</h2>
            <p>С petalapa твоят любимец винаги може да бъде открит. Технология, която създава реална връзка между хората, които обичат животните.</p>
            <div className="final-security-benefits">
              {[[I.shield, 'Бързо намиране', 'при изгубване'], [I.profile, 'Достъпна информация', 'за отговорни хора'], [I.heart, 'Повече спокойствие', 'за цялото семейство']].map(([d, a, b]) => <div key={a}><span><Ic d={d} size={18} /></span><b>{a}</b><small>{b}</small></div>)}
            </div>
          </div>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
