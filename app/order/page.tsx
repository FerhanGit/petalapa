import { Suspense } from 'react';
import { SiteNav, SiteFooter, Ic, I } from '@/components/Site';
import { PhotoTag, STYLES } from '@/components/PhotoTag';
import OrderFlow from './OrderFlow';

export const metadata = { title: 'Поръчка · petalapa' };

export default function OrderPage() {
  const forest = STYLES.find((s) => s.slug === 'forest') ?? STYLES[0];
  return (
    <main className="final-order">
      <SiteNav />
      <div className="final-wrap">
        <section className="final-order-hero">
          <div className="final-order-product">
            <div className="final-order-product-note">Повече от адрес.<br />Повече грижа. ♡</div>
            <PhotoTag s={forest} size={300} />
          </div>
          <div className="final-order-copy">
            <span className="final-kicker">ПЕРСОНАЛИЗИРАН МЕДАЛЬОН</span>
            <h1>Стил, който пази<br />тези, които обичаме</h1>
            <p>NFC и QR код в елегантен кръгъл дизайн. Красив, издръжлив и винаги с най-важната информация за твоя любимец.</p>
            <div className="final-order-icons">
              {[[I.shield, 'Сигурност', 'при изгубване'], [I.heart, 'Лесна връзка', 'с вас'], [I.nfc, 'NFC и QR код', 'във всеки таг'], [I.resin, 'Уникални', 'ръчно изработени']].map(([d, a, b]) => <div key={a}><span><Ic d={d} size={17} /></span><b>{a}</b><small>{b}</small></div>)}
            </div>
          </div>
        </section>

        <section className="final-order-explain">
          {[[I.qr, 'Сканиране', 'QR код или NFC — работи с всеки съвременен телефон, без приложение.'], [I.profile, 'Профил', 'Отваря се страницата на любимеца с данни, снимка и телефон за връзка.'], [I.shield, 'Сигурност', 'Вие решавате какво е публично. Може да се актуализира по всяко време.']].map(([d, title, text], i) => <div className="final-order-explain-card" key={title}><span className="final-order-explain-icon"><Ic d={d} size={22} /></span><small>0{i + 1}</small><b>{title}</b><p>{text}</p></div>)}
        </section>

        <section className="final-order-form-section">
          <div className="final-order-section-title"><span>СТИЛ &nbsp;—&nbsp; ЛЮБИМЕЦ &nbsp;—&nbsp; ПЛАЩАНЕ &nbsp;—&nbsp; ГОТОВО</span><h2>Поръчка</h2></div>
          <Suspense><OrderFlow /></Suspense>
        </section>

        <section className="final-order-bottom">
          <div className="final-order-bottom-copy">Малки детайли.<br /><b>Голяма сигурност.</b><small>Ръчно изработени с любов за по-спокойни дни. ♡</small></div>
          <PhotoTag s={STYLES[4]} size={240} />
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
