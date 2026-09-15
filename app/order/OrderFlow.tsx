'use client';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { STYLES, type TagStyle } from '@/components/Brand';
import { Ic, I } from '@/components/Site';
import DesignGrid from '@/components/DesignGrid';

const STEPS = ['Дизайн', 'Информация', 'Стопанин', 'Доставка', 'Плащане'];
const SHIP = 5.9;
type Pet = { name: string; species: 'dog' | 'cat' | 'other'; breed: string; birth: string; sex: 'm' | 'f'; medical: string; notes: string; pubFirstOnly: boolean };
type Owner = { name: string; phone: string; email: string; address: string; city: string; firstOnly: boolean };

export default function OrderFlow() {
  const sp = useSearchParams();
  const initial = STYLES.find((s) => s.slug === sp.get('style'));
  const [phase, setPhase] = useState<'pick' | 'closeup' | 'form'>(initial ? 'closeup' : 'pick');
  const [style, setStyle] = useState<TagStyle>(initial ?? STYLES[0]);
  const [step, setStep] = useState(1);
  const [pet, setPet] = useState<Pet>({ name: '', species: 'dog', breed: '', birth: '', sex: 'm', medical: '', notes: '', pubFirstOnly: false });
  const [photo, setPhoto] = useState<File | null>(null);
  const photoUrl = useMemo(() => (photo ? URL.createObjectURL(photo) : ''), [photo]);
  const [owner, setOwner] = useState<Owner>({ name: '', phone: '', email: '', address: '', city: 'София', firstOnly: true });
  const [pay, setPay] = useState<'card' | 'apple' | 'google' | 'cod'>('card');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const price = style.price;
  const P = (k: keyof Pet) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setPet({ ...pet, [k]: e.target.value });
  const O = (k: keyof Owner) => (e: React.ChangeEvent<HTMLInputElement>) => setOwner({ ...owner, [k]: e.target.value });
  const idx = STYLES.findIndex((s) => s.slug === style.slug);

  function next() {
    setErr('');
    if (step === 1 && !pet.name.trim()) return setErr('Напиши името на любимеца.');
    if (step === 2) {
      if (!owner.name.trim()) return setErr('Напиши името си.');
      if (!/^\+?[0-9 ]{8,}$/.test(owner.phone)) return setErr('Телефонът трябва да е валиден, напр. +359 888 123 456.');
      if (!/^\S+@\S+\.\S+$/.test(owner.email)) return setErr('Имейлът не изглежда валиден.');
    }
    if (step === 3 && !owner.address.trim()) return setErr('Добави адрес или офис на куриер.');
    setStep(step + 1);
  }
  async function submit() {
    setBusy(true); setErr('');
    const fd = new FormData();
    fd.append('payload', JSON.stringify({ style: style.slug, pet, owner, pay, price, ship: SHIP, total: price + SHIP }));
    if (photo) fd.append('photo', photo);
    const r = await fetch('/api/orders', { method: 'POST', body: fd });
    setBusy(false);
    if (!r.ok) return setErr('Поръчката не мина. Опитай пак след малко.');
    const d = await r.json(); setOrderId(d.id);
  }

  if (orderId) return (
    <div className="panel done" style={{ margin: '30px auto 60px', maxWidth: 520 }}>
      <div className="ic"><Ic d={I.check} size={34} sw={2.4} /></div>
      <h2>Благодарим!</h2><div className="big">Поръчката ти е приета.</div>
      <p className="sub">Ще получиш имейл с потвърждение и детайли за доставката на {owner.email}. Номер: <b>#{orderId.slice(0, 6).toUpperCase()}</b>.</p>
      {pay === 'card' && <p className="sub">Линкът за плащане с карта ще пристигне по имейл, когато тагът е готов за изпращане.</p>}
      <a className="btn btn-primary" style={{ marginTop: 18 }} href="/">Към началната страница</a>
      <div style={{ marginTop: 26, borderRadius: 18, overflow: 'hidden', position: 'relative', aspectRatio: '4/3' }}><Image src="/img/hero-pets.jpg" alt="" fill sizes="520px" style={{ objectFit: 'cover', objectPosition: '50% 35%' }} /><div className="bubble" style={{ top: 'auto', bottom: 16, right: 16 }}>За още<br />щастливи истории!</div></div>
    </div>
  );

  if (phase === 'pick') return (
    <div style={{ padding: '22px 0 60px', maxWidth: 760, margin: '0 auto' }}>
      <h2 className="h-section">Избери стил</h2><p className="sub">Всеки дизайн разказва история. Кой е твоят?</p>
      <DesignGrid styles={STYLES} selected={style.slug} onSelect={(s) => { setStyle(s); setPhase('closeup'); }} />
    </div>
  );

  if (phase === 'closeup') return (
    <div className="panel closeup" style={{ margin: '22px auto 60px', maxWidth: 560, textAlign: 'center' }}>
      <a className="backlink" href="#" onClick={(e) => { e.preventDefault(); setPhase('pick'); }} style={{ float: 'left' }}><Ic d={I.back} size={16} /> Към дизайните</a>
      <div style={{ clear: 'both' }} />
      <div className="big">
        <Image src={style.img} alt={style.name} width={720} height={720} priority style={{ width: '100%', height: 'auto', borderRadius: 20 }} />
        <button className="arr l" aria-label="Предишен" onClick={() => setStyle(STYLES[(idx - 1 + STYLES.length) % STYLES.length])}><Ic d={I.chevl} /></button>
        <button className="arr r" aria-label="Следващ" onClick={() => setStyle(STYLES[(idx + 1) % STYLES.length])}><Ic d={I.chevr} /></button>
      </div>
      <div className="dots">{STYLES.map((s) => <span key={s.slug} className={s.slug === style.slug ? 'on' : ''} />)}</div>
      <h3>{style.name}</h3><p className="story">{style.story}</p>
      <div className="specs">{[[I.nfc, 'NFC + QR'], [I.shield, 'Издръжлив'], [I.drop, 'Водоустойчив'], [I.feather, 'Лек и удобен']].map(([d, t]) => <span key={t}><span className="ic"><Ic d={d} size={16} /></span>{t}</span>)}</div>
      <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--green)', marginTop: 16 }}>€{price.toFixed(2)}</div>
      <button className="btn btn-primary btn-block" style={{ marginTop: 14 }} onClick={() => setPhase('form')}>Персонализирай този дизайн <Ic d={I.arrow} size={18} /></button>
    </div>
  );

  return (
    <>
      <div className="stepper">{STEPS.map((s, i) => (<span key={s} style={{ display: 'contents' }}><span className={`st${i + 1 === step ? ' active' : i + 1 < step ? ' done' : ''}`}><i>{i + 1 < step ? '✓' : i + 1}</i>{s}</span>{i < STEPS.length - 1 && <span className="ln" />}</span>))}</div>
      <div className="order">
        <div className="panel">
          {step === 1 && (<>
            <h2>Информация за любимеца</h2><p className="sub">Разкажи ни повече, за да създадем най-добрия профил на любимеца.</p>
            <div className="form">
              <div className="avatar-pick">
                <label className="ph" htmlFor="ph" style={{ backgroundImage: photoUrl ? `url(${photoUrl})` : undefined }}>{!photoUrl && <Ic d={I.cam} size={28} />}</label>
                <input id="ph" type="file" accept="image/*" hidden onChange={(e) => setPhoto(e.target.files?.[0] ?? null)} />
                <div className="field" style={{ flex: 1 }}><label className="label">Име <span className="req">*</span></label><input className="input" placeholder="Макс" value={pet.name} onChange={P('name')} /></div>
              </div>
              <div className="field"><label className="label">Вид <span className="req">*</span></label><div className="seg icons">{[['dog', I.dog, 'Куче'], ['cat', I.cat, 'Котка'], ['other', I.heart, 'Друго']].map(([v, d, l]) => <button key={v} className={pet.species === v ? 'on' : ''} onClick={() => setPet({ ...pet, species: v as Pet['species'] })}><Ic d={d} size={20} />{l}</button>)}</div></div>
              <div className="field"><label className="label">Порода</label><input className="input" placeholder="Labradoodle" value={pet.breed} onChange={P('breed')} /></div>
              <div className="two">
                <div className="field"><label className="label">Пол</label><div className="seg">{[['m', 'Мъжки'], ['f', 'Женски']].map(([v, l]) => <button key={v} className={pet.sex === v ? 'on' : ''} onClick={() => setPet({ ...pet, sex: v as Pet['sex'] })}>{l}</button>)}</div></div>
                <div className="field"><label className="label">Дата на раждане</label><input className="input" type="date" value={pet.birth} onChange={P('birth')} /></div>
              </div>
              <div className="field"><label className="label">Здраве и особености</label><input className="input" placeholder="Алергии, лекарства, характер…" value={pet.medical} onChange={P('medical')} /></div>
              <div className="field"><label className="label">Бележка за намерилия</label><textarea className="input" placeholder="Напр. Спокоен е, обича лакомства…" value={pet.notes} onChange={P('notes')} /></div>
            </div>
          </>)}
          {step === 2 && (<>
            <h2>Ваша информация</h2><p className="sub">Тази информация ще се показва при намиране на любимеца.</p>
            <div className="form">
              <div className="field"><label className="label">Име <span className="req">*</span></label><input className="input" placeholder="Иван Петров" value={owner.name} onChange={O('name')} /></div>
              <div className="field"><label className="label">Телефон <span className="req">*</span></label><input className="input" type="tel" placeholder="+359 888 123 456" value={owner.phone} onChange={O('phone')} /></div>
              <div className="field"><label className="label">Имейл <span className="req">*</span></label><input className="input" type="email" placeholder="ivan@petalapa.com" value={owner.email} onChange={O('email')} /></div>
              <label className="checkrow"><input type="checkbox" checked={owner.firstOnly} onChange={(e) => setOwner({ ...owner, firstOnly: e.target.checked })} />Покажи само първото име</label>
            </div>
          </>)}
          {step === 3 && (<>
            <h2>Доставка</h2><p className="sub">Еконт – до офис или адрес, 1–3 работни дни.</p>
            <div className="form">
              <div className="field"><label className="label">Адрес / офис на Еконт <span className="req">*</span></label><input className="input" placeholder="ул. …, № / Еконт офис …" value={owner.address} onChange={O('address')} /></div>
              <div className="field"><label className="label">Град</label><input className="input" value={owner.city} onChange={O('city')} /></div>
            </div>
          </>)}
          {step === 4 && (<>
            <h2>Преглед на поръчката</h2>
            <div className="review">
              <div className="line"><img src={style.img} alt="" /><div><b>{style.name}</b><span>1 × €{price.toFixed(2)}</span></div><span className="p">€{price.toFixed(2)}</span></div>
              <div className="label" style={{ margin: '4px 0 0' }}>Информация за любимеца</div>
              <div className="line"><span style={{ width: 52, height: 52, borderRadius: '50%', background: `var(--green-tint) ${photoUrl ? `url(${photoUrl}) center/cover` : ''}`, flexShrink: 0 }} /><div><b>{pet.name}</b><span>{pet.breed || (pet.species === 'dog' ? 'Куче' : pet.species === 'cat' ? 'Котка' : 'Любимец')}</span></div><button className="edit" onClick={() => setStep(1)}>Редактирай</button></div>
              <div className="label" style={{ margin: '4px 0 0' }}>Доставка</div>
              <div className="line"><span className="ic" style={{ color: 'var(--green)' }}><Ic d={I.box} size={24} /></span><div><b>Еконт – {owner.address.toLowerCase().includes('офис') ? 'до офис' : 'до адрес'}</b><span>{owner.city}</span></div><span className="p">€{SHIP.toFixed(2)}</span></div>
              <div className="tot"><span>Общо</span><span>€{(price + SHIP).toFixed(2)}</span></div>
            </div>
          </>)}
          {step === 5 && (<>
            <h2>Плащане</h2><p className="sub">Избери метод на плащане.</p>
            <div className="pay">
              {[['card', 'Карта', 'VISA · MC'], ['apple', 'Apple Pay', ' Pay'], ['google', 'Google Pay', 'G Pay'], ['cod', 'Наложен платеж', 'при доставка']].map(([v, l, b]) => (<label key={v} className={pay === v ? 'on' : ''}><input type="radio" name="pay" checked={pay === v} onChange={() => setPay(v as typeof pay)} />{l}<span className="brand">{b}</span></label>))}
            </div>
            <div className="review" style={{ marginTop: 16 }}><div className="tot"><span>Общо</span><span>€{(price + SHIP).toFixed(2)}</span></div></div>
            <div className="secure"><Ic d={I.lock} size={14} /> Сигурно и защитено плащане</div>
          </>)}
          {err && <div className="err"><Ic d={I.alert} size={16} />{err}</div>}
          <div className="actions">
            <button className="btn btn-outline" onClick={() => step === 1 ? setPhase('closeup') : setStep(step - 1)}><Ic d={I.back} size={16} /> Назад</button>
            {step < 4 ? <button className="btn btn-primary" onClick={next}>Продължи <Ic d={I.arrow} size={18} /></button>
             : step === 4 ? <button className="btn btn-primary" onClick={next}>Към плащане <Ic d={I.arrow} size={18} /></button>
             : <button className="btn btn-primary" onClick={submit} disabled={busy}>{busy ? <><span className="spinner" />Изпращам…</> : 'Поръчай'}</button>}
          </div>
        </div>
        <aside className="preview">
          {step <= 2 ? (<div className="viz"><div className="ph" style={{ backgroundImage: photoUrl ? `url(${photoUrl})` : `url(${style.img})` }} /><h3>{pet.name || 'Макс'}</h3><div className="meta">{pet.breed || 'Порода'} · {pet.species === 'cat' ? 'Котка' : pet.species === 'dog' ? 'Куче' : 'Любимец'}</div><p className="hint" style={{ marginTop: 10 }}>Така ще изглежда профилът, който се отваря при сканиране.</p></div>)
          : (<><Image className="tag" src={style.img} alt={style.name} width={400} height={400} style={{ width: '70%', height: 'auto', margin: '0 auto', borderRadius: 16 }} /><h3>{style.name}</h3><p className="story">{style.story}</p><div className="price">€{price.toFixed(2)}</div></>)}
        </aside>
      </div>
    </>
  );
}
