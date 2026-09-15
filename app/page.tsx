import { SiteNav, Ic, I } from '@/components/Site';
import { PetalapaWordmark } from '@/components/ModernBrand';
import { ReferenceTag, type TagVariant } from '@/components/ReferenceTag';
import { PhotoTag, STYLES } from '@/components/PhotoTag';

const LAGOTTO = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Dog%20with%20curly%20fur%20playfully%20sticking%20out%20its%20tongue%20in%20a%20green%20outdoor%20setting.jpg';
const TABBY = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Cat003.jpg';
const POODLE = 'https://images.pexels.com/photos/4626495/pexels-photo-4626495.jpeg?auto=compress&cs=tinysrgb&w=1800';

const TAGS: Array<{ variant: TagVariant; name: string; slug: string }> = [
  { variant: 'ocean', name: 'Ocean', slug: 'ocean' },
  { variant: 'classic', name: 'Forest', slug: 'forest' },
  { variant: 'galaxy', name: 'Galaxy', slug: 'galaxy' },
  { variant: 'floral', name: 'Floral', slug: 'floral' },
  { variant: 'natural', name: 'Wood', slug: 'wood' },
  { variant: 'premium', name: 'Minimal', slug: 'minimal' },
  { variant: 'premium', name: 'Marble', slug: 'minimal' },
  { variant: 'custom', name: 'Custom', slug: 'custom' },
];

const ocean = STYLES.find((s) => s.slug === 'ocean') ?? STYLES[0];

export default function Landing() {
  return (
    <main className="ref-home">
      <SiteNav />

      <section className="ref-home-hero ref-shell">
        <div className="ref-hero-copy">
          <div className="ref-hero-brand"><PetalapaWordmark /></div>
          <h1>Един малък таг.<br/>Голяма сигурност.</h1>
          <p>Епоксидни тагове с вграден NFC и QR код.<br/>Персонален профил за твоя любимец.</p>
          <a className="ref-primary" href="/order">Създай своя таг <Ic d={I.arrow} size={17}/></a>
        </div>
        <div className="ref-hero-animals">
          <div className="ref-animal ref-animal-dog">
            <img src={LAGOTTO} alt="Щастливо Lagotto Romagnolo" />
            <span className="ref-animal-tag dog-tag"><ReferenceTag variant="ocean" size={54}/></span>
          </div>
          <div className="ref-animal ref-animal-cat">
            <img src={TABBY} alt="Таби котка" />
            <span className="ref-animal-tag cat-tag"><ReferenceTag variant="floral" size={42}/></span>
          </div>
        </div>
        <div className="ref-hero-badges">
          <div><span><Ic d={I.qr} size={21}/></span><b>Бърз достъп</b><small>до профила</small></div>
          <div><span><Ic d={I.qr} size={21}/></span><b>QR код</b><small>за всеки случай</small></div>
          <div><span><Ic d={I.shield} size={21}/></span><b>Персонална</b><small>информация</small></div>
          <div><span><Ic d={I.heart} size={21}/></span><b>Красив дизайн</b><small>и ръчна изработка</small></div>
        </div>
      </section>

      <section className="ref-tags ref-shell" id="designs">
        <div className="ref-section-title"><h2>Избери стил на таг</h2><p>Уникални дизайни, изработени от епоксидна смола.</p></div>
        <div className="ref-tags-layout">
          <div className="ref-tags-grid">
            {TAGS.map((tag) => (
              <a key={tag.name} href={`/order?style=${tag.slug}`} className="ref-tag-card">
                <div className="ref-tag-card-stage"><ReferenceTag variant={tag.variant} size={90}/></div>
                <b>{tag.name} <span>→</span></b>
              </a>
            ))}
          </div>
          <aside className="ref-product-macro">
            <div className="ref-product-tag"><PhotoTag s={ocean} size={245} qr nfc /></div>
            <div className="ref-callout ref-callout-nfc"><span><Ic d={I.nfc} size={18}/></span><b>NFC чип</b><small>(скрит в смолата)</small></div>
            <div className="ref-callout ref-callout-qr"><span><Ic d={I.qr} size={18}/></span><b>QR код</b><small>(за лесен достъп)</small></div>
          </aside>
        </div>
      </section>

      <section className="ref-why ref-shell" id="why">
        <div className="ref-why-cat">
          <img src={TABBY} alt="Котка с petalapa таг" />
          <span><ReferenceTag variant="ocean" size={54}/></span>
          <em>За тях<br/>винаги! ♡</em>
        </div>
        <div className="ref-why-copy">
          <h2>Защо petalapa?</h2>
          <div className="ref-why-list">
            <div><span><Ic d={I.resin} size={21}/></span><p><b>Уникален дизайн</b><small>Всеки таг е ръчно изработен</small></p></div>
            <div><span><Ic d={I.nfc} size={21}/></span><p><b>NFC + QR</b><small>Два начина за достъп</small></p></div>
            <div><span><Ic d={I.shield} size={21}/></span><p><b>Безопасност</b><small>Помага при изгубване</small></p></div>
            <div><span><Ic d={I.share} size={21}/></span><p><b>Директна връзка</b><small>Със стопанина, бързо и лесно</small></p></div>
          </div>
        </div>
        <div className="ref-phone-wrap">
          <div className="ref-phone">
            <div className="ref-phone-top"><PetalapaWordmark compact/><span>⌕ ☰</span></div>
            <img src={LAGOTTO} alt="Примерен pet профил"/>
            <h3>Макс ✤</h3><p>Пудел · 3 г.<br/>Sofia, Bulgaria</p>
            <div className="ref-phone-chips"><span>✓ У дома</span><span>⚕ Пълен</span><span>♡ Приятелски</span></div>
            <button>Свържи се със стопанина</button>
            <small>Медицинска информация<br/>Алергии: пилешко</small>
          </div>
        </div>
      </section>

      <section className="ref-bottom-banner ref-shell">
        <div><PetalapaWordmark light/></div>
        <img src={POODLE} alt="Пудел"/>
        <p>Защото всеки любимец<br/>заслужава да бъде намерен. <span>♡</span></p>
      </section>
    </main>
  );
}
