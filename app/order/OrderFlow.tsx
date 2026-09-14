'use client';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { STYLES, PRICE, PhotoTag, ProductShot } from '@/components/PhotoTag';
import { Ic, I } from '@/components/Site';

const STEPS = ['Дизайн', 'Любимец', 'Стопанин', 'Преглед', 'Плащане'];
const SHIP = 4.9;
type Pet = { name: string; species: 'dog' | 'cat' | 'other'; breed: string; age: string; sex: 'm' | 'f'; medical: string; allergies: string; notes: string; pubBasic: boolean; pubContact: boolean };
type Owner = { name: string; phone: string; email: string; address: string; city: string };

export default function OrderFlow() {
  const sp = useSearchParams();
  const [step, setStep] = useState(0);
  const [style, setStyle] = useState(STYLES.find((s) => s.slug === sp.get('style')) ?? STYLES[0]);
  const [pet, setPet] = useState<Pet>({ name: '', species: 'dog', breed: '', age: '', sex: 'm', medical: '', allergies: '', notes: '', pubBasic: true, pubContact: true });
  const [photo, setPhoto] = useState<File | null>(null);
  const photoUrl = useMemo(() => (photo ? URL.createObjectURL(photo) : ''), [photo]);
  const [owner, setOwner] = useState<Owner>({ name: '', phone: '', email: '', address: '', city: 'София' });
  const [pay, setPay] = useState<'card' | 'apple' | 'google' | 'cod'>('card');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const price = PRICE[style.slug];
  const P = (k: keyof Pet) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setPet({ ...pet, [k]: e.target.value });
  const O = (k: keyof Owner) => (e: React.ChangeEvent<HTMLInputElement>) => setOwner({ ...owner, [k]: e.target.value });

  function next() {
    setErr('');
    if (step === 1 && !pet.name.trim()) return setErr('Напиши името на любимеца.');
    if (step === 2) {
      if (!owner.name.trim()) return setErr('Напиши името си.');
      if (!/^\+?[0-9 ]{8,}$/.test(owner.phone)) return setErr('Телефонът трябва да е валиден, напр. +359 88 123 4567.');
      if (!/^\S+@\S+\.\S+$/.test(owner.email)) return setErr('Имейлът не изглежда валиден.');
      if (!owner.address.trim()) return setErr('Добави адрес за доставка.');
    }
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
    <div className="panel done" style={{ margin: '40px auto', maxWidth: 560 }}>
      <div className="ic"><Ic d={I.check} size={30} /></div>
      <h2>Благодарим, {owner.name.split(' ')[0]}!</h2>
      <p className="sub">Поръчка <b>#{orderId.slice(0, 6).toUpperCase()}</b> е приета. Ще залеем тага „{style.name}“ за {pet.name} и ще го изпратим до 3–5 работни дни. Потвърждение е изпратено на {owner.email}.</p>
      {pay === 'card' && <p className="sub">Плащането с карта ще се активира при изпращане – ще получиш линк за плащане по имейл.</p>}
      <a className="btn btn-primary" style={{ marginTop: 18 }} href="/">Към началото</a>
    </div>
  );

  return (
    <>
      <div className="stepper">{STEPS.map((s, i) => (<span key={s} style={{ display: 'contents' }}><span className={`st${i === step ? ' active' : i < step ? ' done' : ''}`}><i>{i < step ? '✓' : i + 1}</i>{s}</span>{i < STEPS.length - 1 && <span className="ln" />}</span>))}</div>
      <div className="order">
        <div className="panel">
          {step === 0 && (<>
            <h2>Избери дизайн на тага</h2><p className="sub">Всяка наша плочка е изработена от епоксидна смола и е уникална. Избери стил, който подхожда на твоя любимец.</p>
            <div className="grid4">{STYLES.map((s) => (<button key={s.slug} className={`design${s.slug === style.slug ? ' selected' : ''}`} onClick={() => setStyle(s)}><ProductShot s={s} /><span className="name">{s.name}</span></button>))}</div>
            <div className="custombox"><div className="box" style={{ alignItems: 'center' }}><PhotoTag s={STYLES[7]} size={80} /><b>Custom</b></div><div className="box"><b>Искаш нещо уникално?</b><span>Можеш да заявиш персонален дизайн по твой избор – снимка, цветя, пясък от плажа, цветове по нашийника.</span><a className="btn btn-primary btn-sm" style={{ alignSelf: 'flex-start', marginTop: 6 }} href="mailto:hello@petalapa.com?subject=Custom таг">Свържи се с нас</a></div></div>
          </>)}
          {step === 1 && (<>
            <h2>Информация за любимеца</h2><p className="sub">Тази информация се показва на всеки, който сканира тага.</p>
            <div className="form">
              <div className="two">
                <div className="field"><label className="label">Име на любимеца <span className="req">*</span></label><input className="input" placeholder="Напр. Макс" value={pet.name} onChange={P('name')} /></div>
                <div className="field"><label className="label">Вид <span className="req">*</span></label><div className="seg">{[['dog', 'Куче'], ['cat', 'Котка'], ['other', 'Друго']].map(([v, l]) => <button key={v} className={pet.species === v ? 'on' : ''} onClick={() => setPet({ ...pet, species: v as Pet['species'] })}>{l}</button>)}</div></div>
              </div>
              <div className="two">
                <div className="field"><label className="label">Порода</label><input className="input" placeholder="Напр. Golden Retriever" value={pet.breed} onChange={P('breed')} /></div>
                <div className="field"><label className="label">Възраст (години)</label><input className="input" placeholder="Напр. 3" inputMode="numeric" value={pet.age} onChange={P('age')} /></div>
              </div>
              <div className="two">
                <div className="field"><label className="label">Пол</label><div className="seg">{[['m', 'Мъжки'], ['f', 'Женски']].map(([v, l]) => <button key={v} className={pet.sex === v ? 'on' : ''} onClick={() => setPet({ ...pet, sex: v as Pet['sex'] })}>{l}</button>)}</div></div>
                <div className="field"><label className="label">Снимка</label><label className="upload" htmlFor="ph"><span className="thumb" style={{ backgroundImage: photoUrl ? `url(${photoUrl})` : undefined }} /><div><b>{photo ? photo.name : 'Качване на снимка'}</b><span>JPG/PNG, ясна, отблизо</span></div></label><input id="ph" type="file" accept="image/*" hidden onChange={(e) => setPhoto(e.target.files?.[0] ?? null)} /></div>
              </div>
              <div className="field"><label className="label">Медицинска информация</label><input className="input" placeholder="Напр. алергии, хронични заболявания..." value={pet.medical} onChange={P('medical')} /></div>
              <div className="field"><label className="label">Бележка</label><textarea className="input" placeholder="Напр. характер, особености..." value={pet.notes} onChange={P('notes')} /></div>
              <div><label className="label">Каква информация да бъде публична?</label>
                <div className="toggle-row"><span>Основна информация (име, порода, град)</span><button className={`sw${pet.pubBasic ? ' on' : ''}`} onClick={() => setPet({ ...pet, pubBasic: !pet.pubBasic })} aria-pressed={pet.pubBasic}><span /></button></div>
                <div className="toggle-row"><span>Контакт със стопанина (телефон / форма)</span><button className={`sw${pet.pubContact ? ' on' : ''}`} onClick={() => setPet({ ...pet, pubContact: !pet.pubContact })} aria-pressed={pet.pubContact}><span /></button></div>
              </div>
            </div>
          </>)}
          {step === 2 && (<>
            <h2>Стопанин и доставка</h2><p className="sub">Телефонът ти остава скрит – хората звънят през бутона в профила.</p>
            <div className="form">
              <div className="two"><div className="field"><label className="label">Име и фамилия <span className="req">*</span></label><input className="input" value={owner.name} onChange={O('name')} /></div><div className="field"><label className="label">Телефон <span className="req">*</span></label><input className="input" type="tel" placeholder="+359 88 123 4567" value={owner.phone} onChange={O('phone')} /></div></div>
              <div className="field"><label className="label">Имейл <span className="req">*</span></label><input className="input" type="email" value={owner.email} onChange={O('email')} /></div>
              <div className="two"><div className="field"><label className="label">Адрес / офис на куриер <span className="req">*</span></label><input className="input" placeholder="ул. ..., № / Еконт офис ..." value={owner.address} onChange={O('address')} /></div><div className="field"><label className="label">Град</label><input className="input" value={owner.city} onChange={O('city')} /></div></div>
            </div>
          </>)}
          {step === 3 && (<>
            <h2>Провери поръчката</h2><p className="sub">Всичко може да се редактира и след това от профила ти.</p>
            <div className="review">
              <div className="line"><PhotoTag s={style} size={48} /><div><b>{style.name}</b><span>Размер: 3.5 см · С вграден NFC и QR код</span></div><span className="p">€{price.toFixed(2)}</span></div>
              <div className="line"><span className="ic" style={{ color: 'var(--green)' }}><Ic d={I.truck} size={26} /></span><div><b>Доставка</b><span>Стандартна доставка · 3–5 работни дни · {owner.city}</span></div><span className="p">€{SHIP.toFixed(2)}</span></div>
              <div className="line"><div><b>{pet.name} · {pet.species === 'dog' ? 'Куче' : pet.species === 'cat' ? 'Котка' : 'Любимец'}{pet.breed ? ` · ${pet.breed}` : ''}</b><span>Стопанин: {owner.name} · {owner.email}</span></div></div>
              <div className="tot"><span>Обща сума</span><span>€{(price + SHIP).toFixed(2)}</span></div>
            </div>
          </>)}
          {step === 4 && (<>
            <h2>Плащане</h2><p className="sub">Избери метод на плащане.</p>
            <div className="pay">
              {[['card', 'Карта', 'VISA · MC'], ['apple', 'Apple Pay', ' Pay'], ['google', 'Google Pay', 'G Pay'], ['cod', 'Наложен платеж', 'при доставка']].map(([v, l, b]) => (<label key={v} className={pay === v ? 'on' : ''}><input type="radio" name="pay" checked={pay === v} onChange={() => setPay(v as typeof pay)} />{l}<span className="brand">{b}</span></label>))}
            </div>
            <div className="review" style={{ marginTop: 18 }}><div className="tot"><span>Обща сума</span><span>€{(price + SHIP).toFixed(2)}</span></div></div>
            <div className="secure"><Ic d={I.lock} size={14} /> Сигурно и защитено плащане</div>
          </>)}
          {err && <div className="err"><Ic d={I.alert} size={16} />{err}</div>}
          <div className="actions">
            {step > 0 ? <button className="btn btn-outline" onClick={() => setStep(step - 1)}>← Назад</button> : <span />}
            {step < 4 ? <button className="btn btn-primary" onClick={next}>Продължи <Ic d={I.arrow} size={18} /></button> : <button className="btn btn-primary" onClick={submit} disabled={busy}>{busy ? <><span className="spinner" />Изпращам…</> : <><Ic d={I.card} size={18} /> Поръчай и плати</>}</button>}
          </div>
        </div>

        <aside className="preview">
          {step === 1 || step === 2 ? (
            <div className="viz"><div className="ph" style={{ backgroundImage: photoUrl ? `url(${photoUrl})` : undefined }} /><h3>{pet.name || 'Макс'}</h3><div className="meta">{pet.breed || 'Порода'}{pet.age ? ` · ${pet.age} г.` : ''}<br />{owner.city}</div><div className="qrs"><span><Ic d={I.qr} size={28} /><br />QR</span><span><Ic d={I.nfc} size={28} /><br />NFC</span></div><p className="hint" style={{ marginTop: 12 }}>Така ще изглежда тагът ти.</p></div>
          ) : (<>
            <div className="stage"><ProductShot s={style} size="46%" qr={step >= 3} className="wide" /><span className="nfc">→ NFC</span></div>
            <h3>{style.name}</h3><div className="meta">Стил: {style.name}</div>
            <ul>{['Вграден NFC чип', 'QR код', 'Ръчна изработка', 'Епоксидна смола'].map((t) => <li key={t}><Ic d={I.check} size={14} />{t}</li>)}</ul>
            <div className="price">€{price.toFixed(2)}</div>
            <div className="thumbs">{[STYLES[0], STYLES[2], STYLES[3]].map((s) => <span key={s.slug}><PhotoTag s={s} size={56} /></span>)}</div>
          </>)}
        </aside>
      </div>
    </>
  );
}
