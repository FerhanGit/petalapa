'use client';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { STYLES, PRICE, type TagStyle } from '@/components/PhotoTag';
import { ReferenceTag, type TagVariant } from '@/components/ReferenceTag';
import { Ic, I } from '@/components/Site';

const STEPS = ['Дизайн', 'Информация', 'Стопанин', 'Плащане'];
const SHIP = 4.9;
const DEFAULT_PET = 'https://images.pexels.com/photos/4626495/pexels-photo-4626495.jpeg?auto=compress&cs=tinysrgb&w=1200';
const TAG_VARIANTS: Record<string, TagVariant> = { ocean:'ocean', forest:'classic', galaxy:'galaxy', floral:'floral', wood:'natural', minimal:'premium', love:'premium', custom:'custom' };
const DISPLAY_STYLES: Array<{ style: TagStyle; label: string; variant: TagVariant }> = [
  { style: STYLES.find(s=>s.slug==='ocean')!, label:'Ocean', variant:'ocean' },
  { style: STYLES.find(s=>s.slug==='forest')!, label:'Forest', variant:'classic' },
  { style: STYLES.find(s=>s.slug==='galaxy')!, label:'Galaxy', variant:'galaxy' },
  { style: STYLES.find(s=>s.slug==='floral')!, label:'Floral', variant:'floral' },
  { style: STYLES.find(s=>s.slug==='wood')!, label:'Wood', variant:'natural' },
  { style: STYLES.find(s=>s.slug==='minimal')!, label:'Minimal', variant:'premium' },
  { style: STYLES.find(s=>s.slug==='love')!, label:'Marble', variant:'premium' },
  { style: STYLES.find(s=>s.slug==='custom')!, label:'Custom', variant:'custom' },
];

type Pet = { name: string; species: 'dog' | 'cat' | 'other'; breed: string; age: string; sex: 'm' | 'f'; medical: string; allergies: string; notes: string; pubBasic: boolean; pubContact: boolean };
type Owner = { name: string; phone: string; email: string; address: string; city: string };
type PayMethod = 'card' | 'cod';

export default function OrderFlow() {
  const sp = useSearchParams();
  const [step, setStep] = useState(0);
  const [style, setStyle] = useState(STYLES.find((s) => s.slug === sp.get('style')) ?? STYLES.find(s=>s.slug==='ocean') ?? STYLES[0]);
  const [pet, setPet] = useState<Pet>({ name: '', species: 'dog', breed: '', age: '', sex: 'm', medical: '', allergies: '', notes: '', pubBasic: true, pubContact: true });
  const [photo, setPhoto] = useState<File | null>(null);
  const photoUrl = useMemo(() => (photo ? URL.createObjectURL(photo) : ''), [photo]);
  const [owner, setOwner] = useState<Owner>({ name: '', phone: '', email: '', address: '', city: 'Sofia' });
  const [pay, setPay] = useState<PayMethod>('card');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const price = PRICE[style.slug];
  const variant = TAG_VARIANTS[style.slug] ?? 'ocean';
  const displayName = DISPLAY_STYLES.find(x=>x.style.slug===style.slug)?.label ?? style.name;
  const P = (k: keyof Pet) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setPet({ ...pet, [k]: e.target.value });
  const O = (k: keyof Owner) => (e: React.ChangeEvent<HTMLInputElement>) => setOwner({ ...owner, [k]: e.target.value });

  function next() {
    setErr('');
    if (step === 1 && !pet.name.trim()) return setErr('Напиши името на любимеца.');
    if (step === 2) {
      if (!owner.name.trim()) return setErr('Напиши името си.');
      if (!/^\+?[0-9 ]{8,}$/.test(owner.phone)) return setErr('Телефонът трябва да е валиден.');
      if (!/^\S+@\S+\.\S+$/.test(owner.email)) return setErr('Имейлът не изглежда валиден.');
      if (!owner.address.trim()) return setErr('Добави адрес за доставка.');
    }
    setStep(step + 1);
  }

  async function submit() {
    setBusy(true); setErr('');
    try {
      const fd = new FormData();
      fd.append('payload', JSON.stringify({ style: style.slug, pet, owner, pay, price, ship: SHIP, total: price + SHIP }));
      if (photo) fd.append('photo', photo);
      const r = await fetch('/api/orders', { method: 'POST', body: fd });
      if (!r.ok) return setErr('Поръчката не мина. Опитай пак след малко.');
      const d = await r.json(); setOrderId(d.id);
    } catch { setErr('Няма връзка със сървъра. Опитай отново.'); }
    finally { setBusy(false); }
  }

  if (orderId) return <div className="ref-order-success"><Ic d={I.check} size={34}/><h2>Поръчката е приета</h2><p>Благодарим, {owner.name.split(' ')[0]}. Номер: <b>#{orderId.slice(0,6).toUpperCase()}</b></p><a href="/">Към началото</a></div>;

  return <>
    <div className="ref-order-stepper">{STEPS.map((s,i)=><div key={s} className={i===step?'active':i<step?'done':''}><span>{i<step?'✓':i+1}</span><b>{s}</b>{i<STEPS.length-1&&<i/>}</div>)}</div>
    <div className="ref-order-grid">
      <section className="ref-order-main">
        {step===0&&<>
          <h1>Избери дизайн</h1><p className="ref-order-lead">Уникални дизайни, изработени от епоксидна смола.</p>
          <div className="ref-order-tags">{DISPLAY_STYLES.map(item=><button key={item.label} type="button" className={item.style.slug===style.slug?'selected':''} onClick={()=>setStyle(item.style)}><ReferenceTag variant={item.variant} size={88}/><b>{item.label}</b></button>)}</div>
        </>}
        {step===1&&<>
          <h1>Персонализирай своя таг</h1>
          <div className="ref-form">
            <label>Име на любимеца <em>*</em><input placeholder="Макс" value={pet.name} onChange={P('name')}/></label>
            <div className="ref-field"><span>Вид <em>*</em></span><div className="ref-choice">{[['dog','Куче'],['cat','Котка'],['other','Друго']].map(([v,l])=><button type="button" key={v} className={pet.species===v?'on':''} onClick={()=>setPet({...pet,species:v as Pet['species']})}>{l}</button>)}</div></div>
            <label>Порода<select value={pet.breed} onChange={P('breed')}><option value="">Напр. Пудел</option><option>Пудел</option><option>Lagotto Romagnolo</option><option>Друга</option></select></label>
            <label>Възраст (години)<input placeholder="Напр. 3" value={pet.age} onChange={P('age')}/></label>
            <label className="ref-upload">Снимка<input type="file" accept="image/*" onChange={e=>setPhoto(e.target.files?.[0]??null)}/><span><Ic d={I.profile} size={24}/><b>Качи снимка</b><small>или избери от галерията</small></span></label>
          </div>
        </>}
        {step===2&&<>
          <h1>Данни за стопанина</h1><p className="ref-order-lead">Тези данни са за контакт и доставка.</p>
          <div className="ref-form two-col">
            <label>Име и фамилия <em>*</em><input value={owner.name} onChange={O('name')} placeholder="Мария Петрова"/></label>
            <label>Телефон <em>*</em><input value={owner.phone} onChange={O('phone')} placeholder="0888 123 456"/></label>
            <label>Имейл <em>*</em><input value={owner.email} onChange={O('email')} placeholder="name@email.com"/></label>
            <label>Град<input value={owner.city} onChange={O('city')}/></label>
            <label className="span2">Адрес / офис на куриер <em>*</em><input value={owner.address} onChange={O('address')} placeholder="ул. ..., № / офис ..."/></label>
          </div>
        </>}
        {step===3&&<>
          <h1>Поръчка</h1>
          <div className="ref-order-summary">
            <div className="ref-summary-row"><ReferenceTag variant={variant} size={54}/><div><b>{displayName}</b><span>Размер: S (3 см)<br/>Количество: 1</span></div><strong>{price.toFixed(2)} лв.</strong></div>
            <div className="ref-summary-row simple"><div><b>Доставка</b><span>Стандартна доставка (1-3 работни дни)</span></div><strong>{SHIP.toFixed(2)} лв.</strong></div>
            <div className="ref-summary-total"><span>Обща сума</span><b>{(price+SHIP).toFixed(2)} лв.</b></div>
            <div className="ref-pay"><b>Начин на плащане</b><label><input type="radio" checked={pay==='card'} onChange={()=>setPay('card')}/> Карта <span>VISA · MC</span></label><label><input type="radio" checked={pay==='cod'} onChange={()=>setPay('cod')}/> Наложен платеж</label></div>
          </div>
        </>}
        {err&&<div className="ref-error"><Ic d={I.alert} size={16}/>{err}</div>}
        <div className="ref-order-actions">{step>0?<button onClick={()=>setStep(step-1)}>← Назад</button>:<span/>}{step<3?<button className="primary" onClick={next}>Продължи <Ic d={I.arrow} size={17}/></button>:<button className="primary" onClick={submit} disabled={busy}>{busy?'Изпращам…':'Поръчай и плати'}</button>}</div>
      </section>

      <aside className="ref-order-preview">
        {step===0?<>
          <div className="ref-preview-tag"><ReferenceTag variant={variant} size={205}/></div>
          <ul><li>✓ NFC чип</li><li>✓ QR код</li><li>✓ Ръчна изработка</li><li>✓ Устойчива на вода и UV</li></ul>
          <div className="ref-preview-price">{price.toFixed(2)} лв.</div>
        </>:step===3?<>
          <div className="ref-checkout-mini"><ReferenceTag variant={variant} size={70}/><div><b>{displayName}</b><small>{pet.name||'Макс'} · {pet.breed||'Пудел'}</small></div></div>
          <div className="ref-checkout-steps"><span>✓ Дизайн</span><span>✓ Информация</span><span>✓ Стопанин</span><span>● Плащане</span></div>
        </>:<>
          <div className="ref-profile-card">
            <div className="ref-profile-tag"><ReferenceTag variant={variant} size={118}/></div>
            <h3>{pet.name||'Макс'} ✤</h3><p>{pet.breed||'Пудел'} · {pet.age||'3'} г.<br/>{owner.city||'Sofia'}</p>
            <div><span><Ic d={I.nfc} size={26}/>NFC</span><span><Ic d={I.qr} size={26}/>QR</span></div>
            <button type="button">Визуализация на тага</button>
          </div>
          <small className="ref-note">* Точният изглед може да се различава от крайния продукт.</small>
        </>}
      </aside>
    </div>
  </>;
}
