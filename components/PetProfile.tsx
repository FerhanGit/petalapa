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
  const med = tag.medical_notes?.split(/[.;]/)[0]?.trim() || 'Няма отбелязана медицинска информация';
  const behaviour = tag.behaviour_notes?.split(/[.;]/)[0]?.trim() || 'Приятелски';

  return <main className={`ref-public-page${lost?' is-lost':''}`}>
    <ScanBeacon scanId={scanId}/>
    <article className="ref-public-phone">
      <header><PetalapaWordmark compact/><div><Ic d={I.share} size={17}/></div></header>
      {lost&&<div className="ref-lost-banner">! ИЗГУБЕН ЛЮБИМЕЦ</div>}
      <div className="ref-public-photo-wrap">
        <img className="ref-public-photo" src={tag.photo_url || POODLE} alt={tag.name || 'Домашен любимец'}/>
        {lost&&<span className="ref-lost-photo-badge">ПОМОГНЕТЕ МИ ДА СЕ ПРИБЕРА</span>}
      </div>
      <section className="ref-public-body">
        <h1>{tag.name||'Макс'} <span>✤</span></h1>
        <p className="ref-public-meta">{species(tag.species)}{tag.breed?` · ${tag.breed}`:''}</p>
        <div className="ref-public-chips"><span>{lost?'! Изгубен':'✓ У дома'}</span><span>⚕ Мед. инфо</span><span>♡ {behaviour}</span></div>
        {lost&&<div className="ref-lost-copy"><b>Този любимец е изгубен.</b><br/>{tag.lost_message || `Ако сте намерили ${tag.name||'този любимец'}, моля свържете се със стопанина възможно най-скоро.`}{tag.reward_text&&<><br/><strong>{tag.reward_text}</strong></>}</div>}
        <a className={`ref-public-call${lost?' lost':''}`} href={tel}><Ic d={I.phone} size={17}/>{lost?'Обади се на стопанина':'Свържи се със стопанина'}</a>
        <div className="ref-public-info"><div><b>Медицинска информация</b><span>{med}</span></div><div><b>Контакт</b><span>{primary?.phone||'Няма публикуван телефон'}</span></div></div>
        {sms&&<a className="ref-public-share" href={sms}><Ic d={I.share} size={16}/> Изпрати съобщение</a>}
      </section>
    </article>
  </main>;
}
