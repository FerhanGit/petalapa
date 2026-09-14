import { Wordmark, Footer, PawTag } from '@/components/Brand';

const designs = [
  { slug: 'kehlibar', name: 'Кехлибар', tag: 'сушени цветя', price: 29, fill: '#D9A64A', flowers: true },
  { slug: 'okean', name: 'Океан', tag: 'глитер, дълбоко синьо', price: 29, fill: '#2C4E8A', dots: true },
  { slug: 'oniks', name: 'Оникс', tag: 'черно + златни люспи', price: 34, fill: '#2A2A2E', dots: true },
  { slug: 'sedef', name: 'Седеф', tag: 'перлено розово', price: 29, fill: '#EBC3CB', accent: '#D9A0AB' },
  { slug: 'livada', name: 'Ливада', tag: 'зелено с цветя', price: 29, fill: '#3F6B4C', flowers: true },
  { slug: 'galaktika', name: 'Галактика', tag: 'лилаво, звезди', price: 29, fill: '#4B3A78', stars: true },
  { slug: 'mramor', name: 'Мрамор', tag: 'бяло + злато', price: 34, fill: '#EFE9E0', dots: true },
  { slug: 'custom', name: 'По твой избор', tag: 'снимка, цветя, пясък', price: 39, fill: '#B9CDB6', accent: '#8FAA97' },
];
const steps = [
  ['Избери дизайн', 'Осем стила лапа – или напълно твой.'],
  ['Разкажи за любимеца', 'Име, снимка, телефон, бележки. Една минута.'],
  ['Тагът пристига', 'Ръчно залят, готов за нашийника. 3–5 работни дни.'],
];

export default function Landing() {
  return (
    <main className="wrap">
      <nav className="nav"><Wordmark /><a className="btn btn-primary" style={{ height: 44, padding: '0 18px', fontSize: 15 }} href="/order">Поръчай</a></nav>

      <section>
        <span className="eyebrow">Ръчна изработка · NFC + QR</span>
        <h1 className="h-hero">Красив таг.<br />Умен начин да намериш любимеца си.</h1>
        <p className="lead">Лапа от епоксидна смола с NFC чип и QR код вътре. Един допир с телефон отваря профила – снимка, бележки и бутон „Обади се“.</p>
        <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
          <a className="btn btn-primary" href="/order">Създай тага си – от €29</a>
          <a className="btn btn-outline" href="/t/demo">Виж примерен профил</a>
        </div>
        <div className="hero-art">
          <div className="note">Малък таг,<br />голямо спокойствие.</div>
          <div style={{ width: '62%' }}><PawTag fill="#2F4A3B" dots /></div>
        </div>
        <div className="badges">
          {[['NFC + QR', 'Двоен достъп'], ['Смола', 'Ръчна изработка'], ['Профил', 'Без приложение'], ['Скрит номер', 'Обаждане през бутон']].map(([b, s]) => (
            <div className="badge" key={b}><div className="ic"><span className="dot" style={{ width: 12, height: 12, background: 'var(--green-2)' }} /></div><b>{b}</b>{s}</div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="h-section">Как работи?</h2>
        <p className="sub">Три стъпки до профил, който не се изхвърля.</p>
        <div className="steps">{steps.map(([t, d], i) => (<div className="step" key={t}><span className="num">{i + 1}</span><div><b>{t}</b><span>{d}</span></div></div>))}</div>
      </section>

      <section className="section">
        <h2 className="h-section">Избери дизайн</h2>
        <p className="sub">Всеки таг е залят на ръка – няма два еднакви.</p>
        <div className="designs">
          {designs.map((d) => (
            <a className="design" key={d.slug} href={`/order?style=${d.slug}`}>
              <div className="pad"><PawTag fill={d.fill} accent={d.accent} dots={d.dots} flowers={d.flowers} stars={d.stars} /></div>
              <div className="row"><span className="name">{d.name}</span><span className="price">€{d.price}</span></div>
              <div className="tag">{d.tag}</div>
            </a>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="h-section">Какво има вътре?</h2>
        <div className="cutaway">
          <svg viewBox="0 0 120 120" aria-hidden>
            <circle cx="60" cy="60" r="50" fill="#EFE9E0" stroke="#C9A24A" strokeWidth="2" />
            <circle cx="60" cy="60" r="34" fill="none" stroke="#8FAA97" strokeWidth="1.2" strokeDasharray="3 2" />
            <circle cx="60" cy="60" r="28" fill="none" stroke="#8FAA97" strokeWidth="1.2" strokeDasharray="3 2" />
            <rect x="60" y="56" width="7" height="7" fill="#2F4A3B" />
            <g fill="#2F4A3B"><rect x="40" y="76" width="8" height="8"/><rect x="52" y="76" width="4" height="4"/><rect x="58" y="80" width="4" height="4"/><rect x="64" y="76" width="4" height="4"/><rect x="72" y="76" width="8" height="8"/></g>
          </svg>
          <ul>
            <li><b>NFC чип (NTAG215)</b><span>Залят в смолата – докосваш с телефон.</span></li>
            <li><b>QR код</b><span>За всеки телефон с камера, без NFC.</span></li>
            <li><b>Профил завинаги</b><span>Сменяш номера – не тага.</span></li>
          </ul>
        </div>
      </section>

      <section className="quote">
        <h2>Повече от таг.<br />Дигитален дом за твоя любимец.</h2>
        <p>Изгубен режим с червен банер, известие при всяко сканиране, медицински бележки за ветеринаря – и всичко се редактира от телефона ти.</p>
        <a className="btn btn-primary" href="/order">Създай тага си</a>
      </section>

      <Footer />
    </main>
  );
}
