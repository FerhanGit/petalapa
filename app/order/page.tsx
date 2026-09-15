import { Suspense } from 'react';
import { SiteNav, SiteFooter, Ic, I } from '@/components/Site';
import { ReferenceTag } from '@/components/ReferenceTag';
import OrderFlow from './OrderFlow';

export const metadata = { title: 'Поръчка · petalapa' };
const CAVALIER = 'https://images.pexels.com/photos/4079375/pexels-photo-4079375.jpeg?auto=compress&cs=tinysrgb&w=1600';

export default function OrderPage() {
  return (
    <main className="final-order natural-order-page">
      <SiteNav />
      <div className="final-wrap natural-order-wrap">
        <section className="final-order-hero natural-order-hero">
          <div className="final-order-product natural-order-product">
            <div className="final-order-product-note">Повече от адрес.<br />Повече грижа. ♡</div>
            <ReferenceTag variant="forest" size={260} photo />
          </div>
          <div className="final-order-copy">
            <span className="final-kicker">ПЕРСОНАЛИЗИРАН МЕДАЛЬОН</span>
            <h1>Стил, който пази<br />тези, които обичаме</h1>
            <p>Ръчно изработен кръгъл resin таг с NFC и QR код. Красив, издръжлив и винаги с най-важната информация за твоя любимец.</p>
            <div className="final-order-icons">
              {[[I.shield, 'Сигурност', 'при изгубване'], [I.heart, 'Лесна връзка', 'с вас'], [I.nfc, 'NFC и QR код', 'във всеки таг'], [I.resin, 'Уникален', 'ръчно изработен']].map(([d, a, b]) => <div key={a}><span><Ic d={d} size={17} /></span><b>{a}</b><small>{b}</small></div>)}
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

        <section className="natural-order-bottom">
          <div className="natural-order-bottom-photo"><img src={CAVALIER} alt="Щастлив Cavalier King Charles Spaniel" /><span className="sharp-order-bottom-tag"><ReferenceTag variant="ocean" size={48} photo /></span></div>
          <div><span>Малки детайли.</span><b>Голяма сигурност.</b><small>Ръчно изработени с любов за по-спокойни дни. ♡</small></div>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
