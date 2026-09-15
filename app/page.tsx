import { SiteNav, SiteFooter, Ic, I } from '@/components/Site';
import { ReferenceTag, type TagVariant } from '@/components/ReferenceTag';
import { PhotoTag, STYLES } from '@/components/PhotoTag';

const LAGOTTO = 'https://images.pexels.com/photos/15222727/pexels-photo-15222727.jpeg?auto=compress&cs=tinysrgb&w=1600';
const TABBY = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Cat003.jpg';
const POODLE = 'https://images.pexels.com/photos/5306978/pexels-photo-5306978.jpeg?auto=compress&cs=tinysrgb&w=1600';

const DESIGNS: Array<{ variant: TagVariant; name: string; slug: string }> = [
  { variant: 'classic', name: 'Classic', slug: 'forest' },
  { variant: 'ocean', name: 'Ocean', slug: 'ocean' },
  { variant: 'galaxy', name: 'Galaxy', slug: 'galaxy' },
  { variant: 'floral', name: 'Floral', slug: 'floral' },
  { variant: 'natural', name: 'Natural', slug: 'wood' },
  { variant: 'premium', name: 'Premium', slug: 'minimal' },
  { variant: 'love', name: 'Love', slug: 'love' },
  { variant: 'custom', name: 'Custom', slug: 'custom' },
];

const ocean = STYLES.find((s) => s.slug === 'ocean') ?? STYLES[0];

export default function Landing() {
  return (
    <main className="approved-site approved-home">
      <SiteNav />

      <section className="approved-hero">
        <div className="approved-hero-copy">
          <span className="approved-eyebrow">ЕПОКСИДНИ ТАГОВЕ С NFC + QR</span>
          <h1>Красив таг. Умен начин<br />да намерите своя<br />любимец.</h1>
          <p>Уникални, ръчно изработени тагове от епоксидна смола с вграден NFC чип и QR код. С тях всеки любимец винаги има своя дигитален профил.</p>
          <a className="approved-primary" href="/order">Създай своя таг <Ic d={I.arrow} size={16} /></a>
          <div className="approved-hero-benefits">
            <div><span><Ic d={I.nfc} size={20} /></span><b>NFC + QR</b><small>технология</small></div>
            <div><span><Ic d={I.profile} size={20} /></span><b>Персонален</b><small>профил</small></div>
            <div><span><Ic d={I.heart} size={20} /></span><b>Ръчна изработка</b><small>от епоксидна смола</small></div>
          </div>
        </div>

        <div className="approved-hero-visual">
          <img className="approved-hero-dog" src={LAGOTTO} alt="Щастливо Lagotto Romagnolo" />
          <img className="approved-hero-cat" src={TABBY} alt="Таби котка" />
          <span className="approved-dog-tag"><ReferenceTag variant="ocean" size={54} /></span>
          <span className="approved-cat-tag"><ReferenceTag variant="floral" size={42} /></span>
          <div className="approved-note">Да те посрещнат<br />Един ден —<br />да те намерят! <span>♡</span></div>
        </div>
      </section>

      <section className="approved-how" id="how">
        <div className="approved-inner">
          <h2>Как работи?</h2>
          <div className="approved-how-grid">
            {[
              [I.pen, 'Избираш дизайн', 'Разгледай нашите стилове и избери своя таг.'],
              [I.profile, 'Добавяш информация', 'Попълваш данни за своя любимец и стопанин.'],
              [I.cart, 'Поръчваш', 'Плащаш удобно онлайн и получаваш тага до куриер.'],
            ].map(([icon, title, text], index) => (
              <article key={title} className="approved-how-step">
                <span className="approved-how-num">{index + 1}</span>
                <span className="approved-how-icon"><Ic d={icon} size={22} /></span>
                <b>{title}</b>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="approved-designs" id="designs">
        <div className="approved-inner">
          <div className="approved-section-head">
            <div><h2>Нашите дизайни</h2><p>Избери стил, който подхожда на твоя любимец.</p></div>
          </div>
          <div className="approved-design-layout">
            <div className="approved-design-grid">
              {DESIGNS.map((item) => (
                <a key={item.name} className="approved-design-card" href={`/order?style=${item.slug}`}>
                  <span className="approved-tag-stage"><ReferenceTag variant={item.variant} size={92} /></span>
                  <b>{item.name} <span>›</span></b>
                </a>
              ))}
            </div>
            <aside className="approved-feature-tag">
              <div className="approved-feature-tag-visual"><PhotoTag s={ocean} size={190} qr nfc /></div>
              <div className="approved-callout approved-callout-nfc"><b>NFC чип</b><small>(скрит в смолата)</small></div>
              <div className="approved-callout approved-callout-qr"><b>QR код</b><small>(за бърз достъп)</small></div>
              <p>Красив, устойчив и уникален.<br />Всеки таг е ръчно изработен.</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="approved-security" id="about">
        <div className="approved-security-photo">
          <img src={POODLE} alt="Щастлив пудел сред цветя" />
          <span className="approved-security-tag"><ReferenceTag variant="natural" size={46} /></span>
        </div>
        <div className="approved-security-copy">
          <h2>Повече сигурност.<br />По-малко тревоги.</h2>
          <p>С NFC и QR технологията всеки, който намери вашия любимец, може бързо да се свърже с вас.</p>
          <div className="approved-security-points">
            <div><span><Ic d={I.lock} size={17} /></span><b>Бърз достъп</b><small>до информация</small></div>
            <div><span><Ic d={I.alert} size={17} /></span><b>При изгубване</b><small>споделяте важните данни</small></div>
            <div><span><Ic d={I.shield} size={17} /></span><b>Дискретна</b><small>защита на личните данни</small></div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
