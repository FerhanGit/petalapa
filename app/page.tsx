import { STYLES, PhotoTag } from '@/components/PhotoTag';
import { SiteNav, SiteFooter, Ic, I } from '@/components/Site';

const LAGOTTO_HERO = 'https://images.pexels.com/photos/15222727/pexels-photo-15222727.jpeg?auto=compress&cs=tinysrgb&w=1600';
const CAVALIER_FIELD = 'https://images.pexels.com/photos/4079375/pexels-photo-4079375.jpeg?auto=compress&cs=tinysrgb&w=1400';
const CAT = 'https://rduelwbqucfatmbltqic.supabase.co/storage/v1/object/public/pets/assets/cat.jpg';

const bySlug = (slug: string) => STYLES.find((s) => s.slug === slug) ?? STYLES[0];

export default function Landing() {
  const forest = bySlug('forest');
  const ocean = bySlug('ocean');
  const blush = bySlug('floral');
  const galaxy = bySlug('galaxy');
  const paw = bySlug('minimal');
  const amber = bySlug('wood');
  const cherry = bySlug('love');
  const homeStyles = [forest, ocean, blush, galaxy, paw, amber];

  return (
    <main className="exact-home">
      <SiteNav />

      <section className="exact-hero">
        <div className="exact-shell exact-hero-grid">
          <div className="exact-hero-copy">
            <span className="exact-eyebrow">ПОВЕЧЕ ОТ ТАГ. ПОВЕЧЕ СПОКОЙСТВИЕ.</span>
            <h1>Красив таг. Умен начин<br />да намерите своя<br />любимец.</h1>
            <p>Уникални, ръчно изработени тагове от епоксидна смола с вграден NFC и QR код. Стил, сигурност и спокойствие винаги на една лапичка разстояние.</p>
            <a className="exact-cta" href="/order">Създай своя таг <Ic d={I.arrow} size={17} /></a>

            <div className="exact-benefits">
              <div><span><Ic d={I.nfc} size={21} /></span><b>NFC + QR</b><small>във всеки таг</small></div>
              <div><span><Ic d={I.shield} size={20} /></span><b>Перманентна</b><small>и сигурна връзка</small></div>
              <div><span><Ic d={I.heart} size={21} /></span><b>Ръчна изработка</b><small>с внимание към детайла</small></div>
            </div>
          </div>

          <div className="exact-hero-visual">
            <img className="exact-lagotto" src={LAGOTTO_HERO} alt="Lagotto Romagnolo с кръгъл petalapa таг" />
            <img className="exact-cat" src={CAT} alt="Котка с кръгъл petalapa таг" />
            <div className="exact-lagotto-tag"><PhotoTag s={forest} size={61} qr={false} nfc={false} /></div>
            <div className="exact-cat-tag"><PhotoTag s={blush} size={51} qr={false} nfc={false} /></div>
            <div className="exact-note">Малки тагове<br />за големи<br />приключения <span>♡</span></div>
          </div>
        </div>
      </section>

      <section className="exact-how" id="how">
        <div className="exact-shell">
          <h2>Как работи?</h2>
          <div className="exact-step-grid">
            {[
              [I.pen, 'Избираш дизайн', 'Разгледай нашите колекции и избери своя стил.'],
              [I.profile, 'Добавяш информация', 'Име, телефон, важни данни за твоя любимец.'],
              [I.cart, 'Поръчваш', 'Потвърди поръчката си и ние изработваме твоя таг.'],
              [I.heart, 'Повече сигурност', 'Готово! Твоят любимец е с теб — винаги.'],
            ].map(([icon, title, text], index) => (
              <article className="exact-step" key={title}>
                <span className="exact-step-num">{index + 1}</span>
                <span className="exact-step-icon"><Ic d={icon} size={23} /></span>
                <div><b>{title}</b><p>{text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="exact-designs" id="designs">
        <div className="exact-shell">
          <div className="exact-section-head"><div><h2>Нашите дизайни</h2><p>Уникални тагове, създадени с любов.</p></div></div>
          <div className="exact-design-row">
            <div className="exact-tag-list">
              {homeStyles.map((style) => (
                <a className="exact-tag-card" key={style.slug} href={`/order?style=${style.slug}`} title={style.spec}>
                  <div className="exact-tag-photo"><PhotoTag s={style} size={99} qr={false} nfc={false} /></div>
                  <b>{style.name}</b>
                </a>
              ))}
            </div>
            <aside className="exact-custom-card">
              <span className="exact-pill">БЕСТСЕЛЪР</span>
              <h3>Персонализиран<br />по твой вкус</h3>
              <p>Цвят, цветя, блясък, символи. Направи го уникален, както е и той.</p>
              <small>Ø38 mm epoxy · 23 mm метална split-ring халка · сушени цветя · метално фолио</small>
              <a href="/order?style=custom">Разгледай всички <Ic d={I.arrow} size={14} /></a>
            </aside>
          </div>
        </div>
      </section>

      <section className="exact-security" id="about">
        <div className="exact-security-photo">
          <img src={CAVALIER_FIELD} alt="Cavalier King Charles Spaniel с petalapa таг" />
          <div className="exact-security-tag"><PhotoTag s={ocean} size={51} qr={false} nfc={false} /></div>
        </div>
        <div className="exact-security-copy">
          <h2>Повече сигурност.<br />По-малко тревоги.</h2>
          <p>С NFC и QR технологията всеки, който намери твоя любимец, може бързо и лесно да се свърже с теб.</p>
          <div className="exact-security-points">
            <div><span><Ic d={I.lock} size={16} /></span><small>Твоите данни<br />са защитени</small></div>
            <div><span><Ic d={I.info} size={16} /></span><small>Актуална информация<br />при намиране</small></div>
            <div><span><Ic d={I.profile} size={16} /></span><small>Повече шанс<br />за бързо завръщане у дома</small></div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
