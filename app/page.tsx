import { STYLES } from '@/components/Brand';
import { HeroRotator, RandomPic } from '@/components/Pics';
import { SiteNav, SiteFooter, Ic, I } from '@/components/Site';
import DesignGrid from '@/components/DesignGrid';

export default function Landing() {
  return (
    <main>
      <SiteNav />
      <div className="container">
        <section className="hero">
          <div>
            <span className="eyebrow">MORE THAN A TAG</span>
            <h1 className="h-hero">Малък таг.<br />Голяма<br />сигурност.</h1>
            <p className="lead">Стилен NFC таг с персонален профил за твоя любимец.</p>
            <div className="cta-row"><a className="btn btn-primary" href="#designs">Разгледай дизайните <Ic d={I.arrow} size={18} /></a></div>
            <div className="hand">За тях<br />винаги! ♡</div>
          </div>
          <div className="hero-photo blend"><HeroRotator /></div>
        </section>
        <div className="features">
          {[[I.grid, 'Бърз достъп'], [I.nfc, 'NFC + QR'], [I.shieldp, 'Персонален профил'], [I.shield, 'Сигурност']].map(([d, t]) => (<div className="feature" key={t}><div className="ic"><Ic d={d} size={22} /></div>{t}</div>))}
        </div>

        <section className="section how" id="how">
          <div>
            <h2 className="h-section">Как работи?</h2>
            <p className="sub">Само 4 лесни стъпки, за да бъде твоят любимец винаги в безопасност.</p>
            <div className="timeline">
              {[[I.palette, 'Избери дизайн', 'Стилен таг, който подхожда на твоя любимец.'], [I.pen, 'Персонализирай', 'Добави информация и снимка.'], [I.tool, 'Ние го изработваме', 'С внимание към всеки детайл.'], [I.shield, 'Винаги свързани', 'При сканиране – достъп до профила на твоя любимец.']].map(([d, t, s], i) => (
                <div className="tstep" key={t}><div className="ic"><Ic d={d} size={24} /></div><div><b><span className="n">{i + 1}</span>{t}</b><span>{s}</span></div></div>
              ))}
            </div>
          </div>
          <div className="how-photo blend"><RandomPic pool="singles" alt="Любимец с таг petalapa" sizes="(max-width: 900px) 100vw, 50vw" /><div className="bubble">Лесно, бързо,<br />сигурно!</div></div>
        </section>

        <section className="section" id="designs">
          <h2 className="h-section">Избери стил</h2>
          <p className="sub">Всеки дизайн разказва история. Кой е твоят?</p>
          <DesignGrid styles={STYLES} />
        </section>

        <section className="section about" id="about">
          <div>
            <h2 className="h-section">Повече от таг.<br />Истинска сигурност.</h2>
            <div className="sec-list">
              {[[I.bolt, 'Мигновен достъп', 'NFC + QR за всеки случай'], [I.shield, 'Помага при изгубване', 'Бързо събира хората и любимците'], [I.heart, 'Лесна връзка', 'Всеки може да се свърже с теб'], [I.lock, 'Дискретност', 'Ти избираш каква информация да показва']].map(([d, b, s]) => (<div key={b}><div className="ic"><Ic d={d} size={20} /></div><div><b>{b}</b><span>{s}</span></div></div>))}
            </div>
            <div className="cta-row"><a className="btn btn-primary" href="/t/demo">Виж примерен профил</a></div>
          </div>
          <div className="phone"><div className="p-inner">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 2px' }}><span style={{ fontWeight: 800, color: 'var(--green)' }}>pet<span style={{ color: 'var(--gold)' }}>🐾</span>lapa</span><Ic d={I.menu} size={16} /></div>
            <div className="p-photo"><RandomPic pool="singles" sizes="300px" /></div>
            <div><b style={{ fontSize: 17, color: 'var(--green)' }}>Макс</b><div style={{ fontSize: 11, color: 'var(--text-3)' }}>Labradoodle · 3 г.</div></div>
            <div className="p-chips"><span>Приятелски</span><span>Обича хора</span></div>
            <div className="btn btn-primary btn-block" style={{ height: 38, fontSize: 12 }}>Свържи се със стопанина</div>
            <div className="p-loc"><Ic d={I.pin} size={14} />София, България · преди 2 ч.</div>
          </div></div>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
