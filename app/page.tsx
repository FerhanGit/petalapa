import Image from 'next/image';
import { STYLES, PhotoTag, ProductShot, IMG } from '@/components/PhotoTag';
import { SiteNav, SiteFooter, Ic, I } from '@/components/Site';

export default function Landing() {
  return (
    <main>
      <SiteNav />
      <div className="container">
        <section className="hero">
          <div className="hero-img"><Image src={IMG.hero} alt="Куче с кръгъл епоксиден petalapa таг" fill priority sizes="60vw" style={{ objectFit: 'cover', objectPosition: '60% 40%' }} /></div>
          <div className="copy">
            <h1 className="h-hero">Красив таг.<br />Създаден специално<br />за твоя любимец.</h1>
            <p className="lead">Ръчно изработен кръгъл таг от епоксидна смола, който съчетава характерен дизайн с NFC, QR код и персонален дигитален профил.</p>
            <div className="cta-row"><a className="btn btn-primary" href="/order">Създай своя таг <Ic d={I.arrow} size={18} /></a><a className="btn btn-outline" href="#designs">Разгледай дизайните</a></div>
            <span className="round-note"><Ic d={I.heart} size={13} /> Кръгъл · лек · ръчно изработен</span>
          </div>
          <div className="note">Ръчно направен,<b>за една специална лапа ♡</b></div>
          <div className="hero-tag"><PhotoTag s={STYLES[0]} size={112} priority /></div>
        </section>

        <div className="features">
          {[[I.resin, 'Ръчна изработка', 'Всеки таг е уникален'], [I.palette, 'Епоксидна смола', 'Цвят и характер'], [I.nfc, 'NFC + QR', 'Достъп за секунди'], [I.shield, 'Дигитален профил', 'Информация при нужда']].map(([d, b, s]) => (
            <div className="feature" key={b}><span className="ic"><Ic d={d} size={22} /></span><b>{b}</b><span>{s}</span></div>
          ))}
        </div>

        <section className="section" id="how">
          <span className="brand-kicker">лесно и лично</span>
          <h2 className="h-section">От идея до неговия таг</h2>
          <p className="sub">Три лесни стъпки. Ние се грижим за останалото.</p>
          <div className="steps">
            {[[I.palette, 'Избери дизайн', 'Намери стила, който най-добре подхожда на твоя любимец.'], null, [I.pen, 'Създай профил', 'Добави име, снимка и информация за връзка.'], null, [I.cart, 'Поръчай', 'Изработваме тага на ръка и го изпращаме до 3–5 работни дни.']].map((s, i) => s ? (
              <div className="step" key={s[1]}><div className="wrap"><span className="ic"><Ic d={s[0]} size={28} /></span><span className="num">{i / 2 + 1}</span></div><b>{s[1]}</b><span>{s[2]}</span></div>
            ) : <span className="arrow" key={i}><Ic d={I.arrow} /></span>)}
          </div>
        </section>

        <section className="section" id="designs">
          <span className="brand-kicker">избери характер</span>
          <h2 className="h-section">Избери неговия стил</h2>
          <p className="sub">Всеки кръгъл таг е малко произведение, изработено от смола на ръка.</p>
          <div className="designs">
            {STYLES.map((s) => (<a className="design" key={s.slug} href={`/order?style=${s.slug}`}><ProductShot s={s} /><span className="name">{s.name}</span></a>))}
          </div>
        </section>

        <section className="more" id="about">
          <div style={{ position: 'relative', minHeight: 340 }}><Image src={IMG.cat} alt="Котка с кръгъл petalapa таг" fill sizes="50vw" style={{ objectFit: 'cover', objectPosition: '55% 40%' }} /></div>
          <div className="body">
            <span className="brand-kicker">повече от аксесоар</span>
            <h2>Неговата малка<br />връзка към дома.</h2>
            <p>Красивият таг остава на нашийника. NFC и QR технологията стоят дискретно зад него и отвеждат към профила на любимеца, когато това е важно.</p>
            <div className="list">
              {[[I.resin, 'Ръчна изработка', 'Смола и характер'], [I.nfc, 'NFC', 'Докосни и отвори'], [I.qr, 'QR код', 'Сканирай с камера'], [I.profile, 'Профил', 'Данни за любимеца']].map(([d, b, s]) => (<div key={b}><div className="ic"><Ic d={d} /></div><b>{b}</b><span>{s}</span></div>))}
            </div>
          </div>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
