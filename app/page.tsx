import { SiteNav, Ic, I } from '@/components/Site';
import { ReferenceTag } from '@/components/ReferenceTag';

const LAGOTTO = 'https://images.pexels.com/photos/19577726/pexels-photo-19577726.jpeg?auto=compress&cs=tinysrgb&w=1400';
const TABBY = 'https://images.pexels.com/photos/20548809/pexels-photo-20548809.jpeg?auto=compress&cs=tinysrgb&w=900';
const CAVALIER = 'https://images.pexels.com/photos/4079375/pexels-photo-4079375.jpeg?auto=compress&cs=tinysrgb&w=1400';

const DESIGNS = [
  ['forest', 'Forest'],
  ['ocean', 'Ocean'],
  ['blush', 'Blush'],
  ['galaxy', 'Galaxy'],
  ['paw', 'Paw'],
  ['amber', 'Amber'],
] as const;

export default function Landing() {
  return (
    <main className="exact-home pixel-home">
      <SiteNav />

      <section className="pixel-hero">
        <div className="pixel-hero-grid">
          <div className="pixel-hero-copy">
            <span className="pixel-eyebrow">ПОВЕЧЕ ОТ ТАГ. ПОВЕЧЕ СПОКОЙСТВИЕ.</span>
            <h1>Красив таг. Умен начин<br />да намерите своя<br />любимец.</h1>
            <p>Уникални, ръчно изработени тагове от епоксидна смола с вграден NFC и QR код. Стил, сигурност и спокойствие винаги на една лапичка разстояние.</p>
            <a className="pixel-cta" href="/order">Създай своя таг <Ic d={I.arrow} size={16} /></a>

            <div className="pixel-benefits">
              <div><span><Ic d={I.nfc} size={19} /></span><b>NFC + QR</b><small>във всеки таг</small></div>
              <div><span><Ic d={I.shield} size={18} /></span><b>Перманентна</b><small>и сигурна връзка</small></div>
              <div><span><Ic d={I.heart} size={19} /></span><b>Ръчна изработка</b><small>с внимание към детайла</small></div>
            </div>
          </div>

          <div className="pixel-hero-visual">
            <img className="pixel-dog" src={LAGOTTO} alt="Lagotto Romagnolo" />
            <img className="pixel-cat" src={TABBY} alt="Таби котка" />
            <div className="pixel-dog-tag"><ReferenceTag variant="forest" size={48} /></div>
            <div className="pixel-cat-tag"><ReferenceTag variant="blush" size={41} /></div>
            <div className="pixel-note">Малки тагове<br />за големи<br />приключения <span>♡</span></div>
          </div>
        </div>
      </section>

      <section className="pixel-how" id="how">
        <div className="pixel-inner">
          <h2>Как работи?</h2>
          <div className="pixel-step-grid">
            {[
              [I.pen, 'Избираш дизайн', 'Разгледай нашите колекции и избери своя стил.'],
              [I.profile, 'Добавяш информация', 'Име, телефон, важни данни за твоя любимец.'],
              [I.cart, 'Поръчваш', 'Потвърди поръчката си и ние изработваме твоя таг.'],
              [I.heart, 'Повече сигурност', 'Готово! Твоят любимец е с теб — винаги.'],
            ].map(([icon, title, text], index) => (
              <article className="pixel-step" key={title}>
                <span className="pixel-step-num">{index + 1}</span>
                <span className="pixel-step-icon"><Ic d={icon} size={21} /></span>
                <div><b>{title}</b><p>{text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pixel-designs" id="designs">
        <div className="pixel-inner">
          <div className="pixel-design-head">
            <h2>Нашите дизайни</h2>
            <p>Уникални тагове, създадени с любов.</p>
          </div>
          <div className="pixel-design-row">
            <div className="pixel-tag-grid">
              {DESIGNS.map(([variant, label]) => (
                <a className="pixel-tag-card" key={variant} href={`/order?style=${variant === 'blush' ? 'floral' : variant === 'paw' ? 'minimal' : variant === 'amber' ? 'wood' : variant}`}>
                  <div className="pixel-tag-stage"><ReferenceTag variant={variant} size={84} /></div>
                  <b>{label}</b>
                </a>
              ))}
            </div>

            <aside className="pixel-custom-card">
              <span>БЕСТСЕЛЪР</span>
              <h3>Персонализиран<br />по твой вкус</h3>
              <p>Цвят, цветя, блясък, символи. Направи го уникален, както е и той.</p>
              <a href="/order?style=custom">Разгледай всички <Ic d={I.arrow} size={13} /></a>
            </aside>
          </div>
        </div>
      </section>

      <section className="pixel-security" id="about">
        <div className="pixel-security-photo">
          <img src={CAVALIER} alt="Cavalier King Charles Spaniel" />
          <div className="pixel-security-tag"><ReferenceTag variant="ocean" size={42} /></div>
        </div>
        <div className="pixel-security-copy">
          <h2>Повече сигурност.<br />По-малко тревоги.</h2>
          <p>С NFC и QR технологията всеки, който намери твоя любимец, може бързо и лесно да се свърже с теб.</p>
          <div className="pixel-security-points">
            <div><span><Ic d={I.lock} size={15} /></span><small>Твоите данни<br />са защитени</small></div>
            <div><span><Ic d={I.info} size={15} /></span><small>Актуална информация<br />при намиране</small></div>
            <div><span><Ic d={I.profile} size={15} /></span><small>Повече шанс<br />за бързо завръщане у дома</small></div>
          </div>
        </div>
      </section>
    </main>
  );
}
