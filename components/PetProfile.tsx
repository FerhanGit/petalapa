import type { PublicTag } from '@/lib/supabase';
import { PetalapaWordmark } from './ModernBrand';
import { Ic, I } from './Site';
import ScanBeacon from './ScanBeacon';

const species = (s: string | null) => s === 'cat' ? 'Котка' : s === 'dog' ? 'Куче' : 'Любимец';
const POODLE = 'https://images.pexels.com/photos/4626495/pexels-photo-4626495.jpeg?auto=compress&cs=tinysrgb&w=1200';

export default function PetProfile({ tag, scanId }: { tag: PublicTag; scanId: number | null }) {
  const lost = tag.status === 'lost' || !!tag.lost;
  const primary = tag.contacts?.[0];
  const num = primary?.phone?.replace(/\s+/g, '');
  const tel = num ? `tel:${num}` : undefined;
  const sms = num ? `sms:${num}?body=${encodeURIComponent(`Здравей, намерих ${tag.name ?? 'вашия любимец'}. Локация: `)}` : undefined;
  const med = tag.medical_notes?.split(/[.;]/)[0]?.trim() || 'Няма данни';
  const behaviour = tag.behaviour_notes?.split(/[.;]/)[0]?.trim() || 'Приятелски';

  return <main className={`ref-public-page${lost?' is-lost':''}`}>
    <ScanBeacon scanId={scanId}/>
    <article className="ref-public-phone">
      <header><PetalapaWordmark compact/><div><Ic d={I.search} size={17}/><span>☰</span></div></header>
      {lost&&<div className="ref-lost-banner">✤ ИЗГУБЕН</div>}
      <img className="ref-public-photo" src={tag.photo_url || POODLE} alt={tag.name || 'Домашен любимец'}/>
      <section className="ref-public-body">
        <h1>{tag.name||'Макс'} ✤</h1>
        <p className="ref-public-meta">{species(tag.species)}{tag.breed?` · ${tag.breed}`:' · Пудел'}{tag.age?` · ${tag.age} г.`:' · 3 г.'}<br/>{'Sofia, Bulgaria'}</p>
        <div className="ref-public-chips"><span>✓ У дома</span><span>⚕ Пълен</span><span>♡ {behaviour}</span></div>
        {lost&&<div className="ref-lost-copy">Ако сте намерили {tag.name||'Макс'},<br/>моля свържете се със стопанина му.</div>}
        <a className={`ref-public-call${lost?' lost':''}`} href={tel}><Ic d={I.phone} size={17}/>{lost?'Свържи се със стопанина':'Свържи се със стопанина'}</a>
        <div className="ref-public-info"><div><b>Медицинска информация</b><span>{med}</span></div><div><b>Контакт</b><span>{primary?.phone||'+359 88 123 4567'}</span></div></div>
        <a className="ref-public-share" href={sms}><Ic d={I.share} size={16}/> Сподели профила</a>
      </section>
    </article>
  </main>;
}
