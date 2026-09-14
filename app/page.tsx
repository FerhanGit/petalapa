import { BrandMark, Footer } from '@/components/Brand';

const styles = [
  { name: 'Ливада', sub: 'сухи цветя', price: 29, bg: 'radial-gradient(circle at 35% 35%,#DCE8C8,#7FA36B 60%,#4F7A4A)' },
  { name: 'Мрамор + злато', sub: 'златен лист', price: 34, bg: 'radial-gradient(circle at 60% 30%,#FFFDF8,#E9E2D6 50%,#C9A24A 52%,#EDE6D8 56%,#D8CFC1)' },
  { name: 'Снимка', sub: 'залята в смола', price: 32, bg: 'repeating-linear-gradient(135deg,#E9DCC3 0 6px,#F1E7D3 6px 12px)' },
  { name: 'Пясък и море', sub: 'истински пясък', price: 29, bg: 'linear-gradient(170deg,#7FB2B8 0 45%,#F1E4C6 55%,#E2CFA2)' },
  { name: 'Галактика', sub: 'глитер', price: 29, bg: 'radial-gradient(circle at 30% 30%,#6B5A8E,#2E2A48 55%,#1B1830)' },
];
const steps = [
  ['Сканиране', 'Телефон до тага или снимка на QR.'],
  ['Профил', 'Снимка, име, бележки. Без приложение.'],
  ['Обаждане', 'Един бутон – ти вдигаш. Номерът ти е скрит.'],
];

export default function Landing() {
  return (
    <main className="screen" style={{ padding: '28px 20px 24px', gap: 22 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-fredoka)', fontWeight: 600, color: 'var(--green)' }}><BrandMark />Лапичка</div>
        <a href="/dashboard" style={{ fontSize: 14, fontWeight: 800, color: 'var(--terra-text)', textDecoration: 'none' }}>Вход</a>
      </div>
      <div>
        <h1 style={{ fontSize: 38, lineHeight: 1.02, textWrap: 'pretty' }}>Тагът, който не се изхвърля.</h1>
        <p className="lead" style={{ fontSize: 16, color: 'var(--text-3)', marginTop: 10 }}>Ръчно залят в епоксидна смола, с NFC и QR вътре. Сменяш телефона – не тага.</p>
      </div>
      <div style={{ height: 230, borderRadius: 28, background: 'repeating-linear-gradient(135deg,#E9DCC3 0 10px,#F1E7D3 10px 20px)' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <a className="btn btn-primary" style={{ flex: 1, height: 60, fontSize: 19 }} href="/order">Поръчай</a>
        <div style={{ textAlign: 'right' }}><div className="display" style={{ fontSize: 24, lineHeight: 1 }}>от €29</div><div className="hint" style={{ fontWeight: 700 }}>безплатна доставка</div></div>
      </div>
      <div>
        <div className="display" style={{ fontWeight: 600, fontSize: 20, marginBottom: 10 }}>Избери стил</div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', margin: '0 -20px', padding: '0 20px 6px' }}>
          {styles.map((s) => (
            <div key={s.name} className="card" style={{ width: 132, flexShrink: 0, padding: 10, borderRadius: 22 }}>
              <span style={{ display: 'block', width: '100%', aspectRatio: '1', borderRadius: '50%', background: s.bg }} />
              <div className="display" style={{ fontWeight: 600, fontSize: 16, marginTop: 10 }}>{s.name}</div>
              <div className="hint" style={{ fontWeight: 700 }}>{s.sub} · €{s.price}</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="display" style={{ fontWeight: 600, fontSize: 20, marginBottom: 10 }}>Как работи</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {steps.map(([t, d], i) => (
            <div key={t} className="card flat" style={{ display: 'flex', gap: 14, alignItems: 'center', padding: 14, borderRadius: 20 }}>
              <span className="display" style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--green-tint)', color: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{i + 1}</span>
              <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.3 }}><span className="display" style={{ fontWeight: 600 }}>{t}</span><br /><span style={{ fontWeight: 600, color: 'var(--text-3)' }}>{d}</span></div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
