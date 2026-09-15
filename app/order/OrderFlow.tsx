'use client';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { STYLES, PRICE } from '@/components/PhotoTag';
import { ReferenceTag, type TagVariant } from '@/components/ReferenceTag';
import { Ic, I } from '@/components/Site';

const STEPS = ['Стил', 'Любимец', 'Стопанин', 'Преглед', 'Плащане'];
const SHIP = 4.9;
const LAGOTTO = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Curly%20brown%20dog%20sitting%20outdoors%20with%20playful%20expression%20in%20a%20natural%20setting.jpg';
const TAG_VARIANTS: Record<string, TagVariant> = { ocean:'ocean', forest:'forest', galaxy:'galaxy', floral:'blush', wood:'amber', minimal:'paw', love:'blush', custom:'forest' };
type Pet = { name: string; species: 'dog' | 'cat' | 'other'; breed: string; age: string; sex: 'm' | 'f'; medical: string; allergies: string; notes: string; pubBasic: boolean; pubContact: boolean };
type Owner = { name: string; phone: string; email: string; address: string; city: string };
type PayMethod = 'card' | 'cod';

export default function OrderFlow() {
  const sp = useSearchParams();
  const [step, setStep] = useState(0);
  const [style, setStyle] = useState(STYLES.find((s) => s.slug === sp.get('style')) ?? STYLES[1]);
  const [pet, setPet] = useState<Pet>({ name: '', species: 'dog', breed: '', age: '', sex: 'm', medical: '', allergies: '', notes: '', pubBasic: true, pubContact: true });
  const [photo, setPhoto] = useState<File | null>(null);
  const photoUrl = useMemo(() => (photo ? URL.createObjectURL(photo) : ''), [photo]);
  const [owner, setOwner] = useState<Owner>({ name: '', phone: '', email: '', address: '', city: 'София' });
  const [pay, setPay] = useState<PayMethod>('card');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const price = PRICE[style.slug];
  const variant = TAG_VARIANTS[style.slug] ?? 'forest';
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
    try {
      const fd = new FormData();
      fd.append('payload', JSON.stringify({ style: style.slug, pet, owner, pay, price, ship: SHIP, total: price + SHIP }));
      if (photo) fd.append('photo', photo);
      const r = await fetch('/api/orders', { method: 'POST', body: fd });
      if (!r.ok) return setErr('Поръчката не мина. Опитай пак след малко.');
      const d = await r.json();
      setOrderId(d.id);
    } catch { setErr('Няма връзка със сървъра. Опитай отново.'); }
    finally { setBusy(false); }
  }

  if (orderId) return <div className="panel done natural-done" style={{ margin: '30px auto 50px', maxWidth: 620 }}><div className="ic"><Ic d={I.check} size={30} /></div><h2>Благодарим, {owner.name.split(' ')[0]}!</h2><p className="sub">Поръчка <b>#{orderId.slice(0, 6).toUpperCase()}</b> е приета. Ще изработим таг „{style.name}“ за {pet.name} и ще се свържем с теб на {owner.email}.</p><a className="btn btn-primary" style={{ marginTop: 18 }} href="/">Към началото</a></div>;

  return <>
    <div className="stepper natural-stepper">{STEPS.map((s, i) => <span key={s} style={{display:'contents'}}><span className={`st${i===step?' active':i<step?' done':''}`}><i>{i<step?'✓':i+1}</i>{s}</span>{i<STEPS.length-1&&<span className="ln"/>}</span>)}</div>
    <div className="order natural-order-flow">
      <div className="panel natural-panel">
        {step===0&&<><h2>Избери дизайн</h2><p className="sub">Всеки кръгъл таг е ръчно изработен от епоксидна смола и има свой характер.</p><div className="grid4 natural-style-grid">{STYLES.map(s=><button type="button" key={s.slug} className={`design${s.slug===style.slug?' selected':''}`} onClick={()=>setStyle(s)}><span className="natural-style-tag"><ReferenceTag variant={TAG_VARIANTS[s.slug]??'forest'} size={96} photo/></span><span className="name">{s.name}</span></button>)}</div></>}
        {step===1&&<><h2>Данни за любимеца</h2><p className="sub">Това е информацията, която ще вижда човекът, сканирал тага.</p><div className="form"><div className="two"><div className="field"><label className="label">Име на любимеца <span className="req">*</span></label><input className="input" placeholder="Напр. Луна" value={pet.name} onChange={P('name')}/></div><div className="field"><label className="label">Вид</label><div className="seg">{[['dog','Куче'],['cat','Котка'],['other','Друго']].map(([v,l])=><button type="button" key={v} className={pet.species===v?'on':''} onClick={()=>setPet({...pet,species:v as Pet['species']})}>{l}</button>)}</div></div></div><div className="two"><div className="field"><label className="label">Порода</label><input className="input" placeholder="Напр. Lagotto Romagnolo" value={pet.breed} onChange={P('breed')}/></div><div className="field"><label className="label">Възраст</label><input className="input" placeholder="Напр. 4" inputMode="numeric" value={pet.age} onChange={P('age')}/></div></div><div className="two"><div className="field"><label className="label">Пол</label><div className="seg">{[['m','Мъжки'],['f','Женски']].map(([v,l])=><button type="button" key={v} className={pet.sex===v?'on':''} onClick={()=>setPet({...pet,sex:v as Pet['sex']})}>{l}</button>)}</div></div><div className="field"><label className="label">Снимка</label><label className="upload" htmlFor="ph"><span className="thumb" style={{backgroundImage:`url(${photoUrl||LAGOTTO})`}}/><div><b>{photo?photo.name:'Качи снимка'}</b><span>JPG/PNG, ясна и отблизо</span></div></label><input id="ph" type="file" accept="image/*" hidden onChange={e=>setPhoto(e.target.files?.[0]??null)}/></div></div><div className="field"><label className="label">Алергии / важна информация</label><input className="input" placeholder="Напр. алергия към пилешко" value={pet.medical} onChange={P('medical')}/></div><div className="field"><label className="label">Допълнителна информация</label><textarea className="input" placeholder="Характер, особености, важни бележки..." value={pet.notes} onChange={P('notes')}/></div></div></>}
        {step===2&&<><h2>Стопанин и доставка</h2><p className="sub">Данните за доставка не се показват в публичния профил.</p><div className="form"><div className="two"><div className="field"><label className="label">Име и фамилия <span className="req">*</span></label><input className="input" placeholder="Мария Петрова" value={owner.name} onChange={O('name')}/></div><div className="field"><label className="label">Телефон <span className="req">*</span></label><input className="input" type="tel" placeholder="0888 123 456" value={owner.phone} onChange={O('phone')}/></div></div><div className="two"><div className="field"><label className="label">Имейл <span className="req">*</span></label><input className="input" type="email" value={owner.email} onChange={O('email')}/></div><div className="field"><label className="label">Град</label><input className="input" value={owner.city} onChange={O('city')}/></div></div><div className="field"><label className="label">Адрес / офис на куриер <span className="req">*</span></label><input className="input" placeholder="ул. ..., № / офис ..." value={owner.address} onChange={O('address')}/></div></div></>}
        {step===3&&<><h2>Вашият избор</h2><p className="sub">Провери данните преди плащане.</p><div className="review"><div className="line"><ReferenceTag variant={variant} size={64} photo/><div><b>{style.name}</b><span>Кръгъл епоксиден таг · NFC + QR</span></div><span className="p">{price.toFixed(2)} лв.</span></div><div className="line"><div><b>{pet.name} · {pet.breed||'Lagotto Romagnolo'}</b><span>{owner.name} · {owner.phone} · {owner.city}</span></div></div><div className="line"><span className="ic"><Ic d={I.truck} size={24}/></span><div><b>Доставка</b><span>3–5 работни дни</span></div><span className="p">{SHIP.toFixed(2)} лв.</span></div><div className="tot"><span>Общо:</span><span>{(price+SHIP).toFixed(2)} лв.</span></div></div></>}
        {step===4&&<><h2>Плащане</h2><p className="sub">Избери удобен начин за плащане.</p><div className="pay"><label className={pay==='card'?'on':''}><input type="radio" name="pay" checked={pay==='card'} onChange={()=>setPay('card')}/>Онлайн с карта<span className="brand">VISA · MC</span></label><label className={pay==='cod'?'on':''}><input type="radio" name="pay" checked={pay==='cod'} onChange={()=>setPay('cod')}/>Наложен платеж<span className="brand">при доставка</span></label></div><div className="review" style={{marginTop:18}}><div className="tot"><span>Общо:</span><span>{(price+SHIP).toFixed(2)} лв.</span></div></div></>}
        {err&&<div className="err"><Ic d={I.alert} size={16}/>{err}</div>}
        <div className="actions">{step>0?<button className="btn btn-outline" onClick={()=>setStep(step-1)}>← Назад</button>:<span/>}{step<4?<button className="btn btn-primary" onClick={next}>Продължи <Ic d={I.arrow} size={18}/></button>:<button className="btn btn-primary" onClick={submit} disabled={busy}>{busy?<><span className="spinner"/>Изпращам…</>:<>Завърши поръчката <Ic d={I.arrow} size={18}/></>}</button>}</div>
      </div>
      <aside className="preview natural-preview">{(step===1||step===2)?<div className="viz"><div className="ph final-profile-preview natural-pet-preview" style={{backgroundImage:`url(${photoUrl||LAGOTTO})`}}><span className="natural-preview-tag"><ReferenceTag variant={variant} size={52} photo/></span></div><h3>{pet.name||'Луна'}</h3><div className="meta">{pet.breed||'Lagotto Romagnolo'}{pet.age?` · ${pet.age} г.`:' · 4 години'}<br/>{owner.city}</div><div className="qrs"><span><Ic d={I.qr} size={28}/><br/>QR</span><span><Ic d={I.nfc} size={28}/><br/>NFC</span></div><p className="hint" style={{marginTop:12}}>Така ще изглежда дигиталният профил.</p></div>:<><div className="natural-tag-stage"><ReferenceTag variant={variant} size={190} photo/></div><h3>{style.name}</h3><div className="meta">Ръчно изработен кръгъл таг</div><ul>{['Вграден NFC чип','QR код','Персонализиран профил','Епоксидна смола'].map(t=><li key={t}><Ic d={I.check} size={14}/>{t}</li>)}</ul><div className="price">{price.toFixed(2)} лв.</div></>}</aside>
    </div>
  </>;
}
