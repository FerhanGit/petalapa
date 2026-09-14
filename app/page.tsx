import { Wordmark, ResinPaw, STYLES } from '@/components/Brand';

// Временни снимки (Unsplash) – ще се сменят с реални снимки на таговете и кучета/котки на клиенти.
const HERO = 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=80';
const CAT = 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=80';

const Ic = ({ d }: { d: string }) => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>);
const ICONS = {
  nfc: 'M6 8.5a8 8 0 0 1 12 0M8.5 11.5a4.5 4.5 0 0 1 7 0M12 15v.01',
  resin: 'M12 3l7 4v10l-7 4-7-4V7z M12 3v18 M5 7l7 4 7-4',
  profile: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z M9 12l2 2 4-4',
  qr: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 14h2v2h-2zM14 18h2v2h-2zM18 18h2v2h-2z',
  heart: 'M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z',
};

const steps = [
  ['Избери дизайн', 'Осем стила лапа от епоксидна смола – или напълно твой, със снимка, пясък или цветя.'],
  ['Добави информация', 'Име, снимка, телефон, бележки за здравето. Профилът се редактира по всяко време.'],
  ['Поръчай', 'Заливаме тага на ръка и го пращаме до 3–5 работни дни. Активираш го с код от кутийката.'],
];

export default function Landing() {
  return (
    <main>
      <div className="container">
        <nav className="nav">
          <Wordmark />
          <div className="links"><a href="#designs">Дизайни</a><a href="#how">Как работи</a><a href="#inside">Технология</a><a href="/t/demo">Примерен профил</a></div>
          <a className="btn btn-primary btn-sm" href="/order">Създай своя таг</a>
        </nav>

        <section className="hero-grid">
          <div>
            <span className="eyebrow">Епоксидни тагове с NFC + QR</span>
            <h1 className="h-hero">Красив таг. <em>Умен начин</em> да намериш любимеца си.</h1>
            <p className="lead">Ръчно залята лапа от епоксидна смола с NFC чип и QR код вътре. Един допир с телефон отваря профила на любимеца ти – снимка, бележки и бутон „Обади се“, без да показва номера ти.</p>
            <div className="cta-row">
              <a className="btn btn-primary" href="/order">Създай своя таг – от €29</a>
              <a className="btn btn-outline" href="/t/demo">Виж примерен профил</a>
            </div>
          </div>
          <div className="hero-photo">
            <img src={HERO} alt="Куче с таг PetaLapa на нашийника" loading="eager" />
            <div className="note">Малък таг,<br />голямо спокойствие.</div>
            <div className="tag"><ResinPaw s={STYLES[1]} size={110} /></div>
          </div>
        </section>

        <div className="features">
          {[[ICONS.nfc, 'NFC + QR', 'Двойна защита – докосване или сканиране'], [ICONS.resin, 'Епоксидна смола', 'Ръчна изработка, водоустойчив'], [ICONS.profile, 'Личен профил', 'За всеки любимец, без приложение'], [ICONS.shield, 'Скрит номер', 'Обаждане през бутон, известие при сканиране']].map(([d, b, s]) => (
            <div className="feature" key={b}><span className="ic"><Ic d={d} /></span><b>{b}</b><span>{s}</span></div>
          ))}
        </div>

        <section className="section" id="how">
          <div className="sec-head"><div><h2 className="h-section">Как работи?</h2><p className="sub">Три лесни стъпки до персонален таг за твоя любимец.</p></div></div>
          <div className="steps">{steps.map(([t, d], i) => (<div className="step" key={t}><span className="num">{i + 1}</span><b>{t}</b><span>{d}</span></div>))}</div>
        </section>

        <section className="section" id="designs">
          <div className="sec-head"><div><h2 className="h-section">Избери дизайн</h2><p className="sub">Всеки таг е залят на ръка – няма два еднакви.</p></div><a className="btn btn-outline" href="/order" style={{ height: 46 }}>Всички дизайни</a></div>
          <div className="designs">
            {STYLES.map((s) => (
              <a className="design" key={s.slug} href={`/order?style=${s.slug}`}>
                <div className="pad"><ResinPaw s={s} /></div>
                <div className="row"><span className="name">{s.name}</span><span className="price">€{s.price}</span></div>
                <div className="tag">{s.sub}</div>
              </a>
            ))}
          </div>
        </section>

        <section className="section inside" id="inside">
          <div className="art">
            <ResinPaw s={STYLES[0]} size={300} />
            <span className="callout" style={{ top: '14%', right: '8%' }}>NFC чип · скрит в смолата</span>
            <span className="callout" style={{ bottom: '12%', left: '8%' }}>QR код · за всеки телефон</span>
          </div>
          <div>
            <h2 className="h-section">Как изглежда тагът отвътре?</h2>
            <p className="sub">Две технологии, една цел – да те намерят.</p>
            <ul>
              <li><span className="ic"><Ic d={ICONS.nfc} /></span><div><b>NFC чип (NTAG215)</b><span>Залят между слоевете смола. Телефонът го чете от 2–3 см, без приложение – и iPhone, и Android.</span></div></li>
              <li><span className="ic"><Ic d={ICONS.qr} /></span><div><b>QR код отзад</b><span>За телефони без NFC – камерата отваря същия профил. Отпечатан под 1 мм прозрачна смола.</span></div></li>
              <li><span className="ic"><Ic d={ICONS.heart} /></span><div><b>Профил за цял живот</b><span>Сменяш телефона, адреса, ветеринаря – тагът остава същият. Изгубен режим с един бутон.</span></div></li>
            </ul>
          </div>
        </section>

        <section className="more">
          <img src={CAT} alt="Котка с таг PetaLapa" loading="lazy" />
          <div className="body">
            <h2>Повече от таг.<br />Дигитален дом за твоя любимец.</h2>
            <p>С PetaLapa получаваш не просто красив аксесоар, а сигурност, информация и връзка – когато е най-важно.</p>
            <div className="list">
              <div><b>Изгубен режим</b><span>Червен банер и „Обади се веднага“</span></div>
              <div><b>Известие при сканиране</b><span>Имейл с час и приблизително място</span></div>
              <div><b>Медицински бележки</b><span>Алергии, чип, ветеринар</span></div>
              <div><b>Няколко любимеца</b><span>Един акаунт, всички тагове</span></div>
            </div>
            <div className="cta-row"><a className="btn btn-primary btn-gold" href="/order">Създай своя таг</a></div>
          </div>
        </section>

        <footer className="footer">
          <Wordmark size={20} />
          <div className="links"><a href="#designs">Дизайни</a><a href="#how">Как работи</a><a href="/dashboard">Вход</a><a href="mailto:hello@petalapa.com">Контакт</a></div>
          <span>© 2026 PetaLapa · ръчна изработка в България</span>
        </footer>
      </div>
    </main>
  );
}
