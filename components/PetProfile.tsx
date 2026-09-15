import type { PublicTag } from '@/lib/supabase';
import { PetalapaWordmark } from './ModernBrand';
import { Ic, I } from './Site';
import ScanBeacon from './ScanBeacon';

const species = (s: string | null) => s === 'cat' ? 'Котка' : s === 'dog' ? 'Куче' : 'Любимец';
const LAGOTTO = '/assets/lagotto-profile.jpg';

export default function PetProfile({ tag, scanId }: { tag: PublicTag; scanId: number | null }) {
  const lost = tag.status === 'lost' || !!tag.lost;
  const primary = tag.contacts?.[0];
  const num = primary?.phone?.replace(/\s+/g, '');
  const tel = num ? `tel:${num}` : undefined;
  const sms = num ? `sms:${num}?body=${encodeURIComponent(`Здравей, намерих ${tag.name ?? 'вашия любимец'}. Локация: `)}` : undefined;
  const ownerName = primary?.label && primary.label.toLowerCase() !== 'основен' ? primary.label : 'Стопанин';
  const medicalShort = tag.medical_notes?.split(/[.;]/)[0]?.trim() || 'Няма данни';
  const behaviourShort = tag.behaviour_notes?.split(/[.;]/)[0]?.trim() || 'Спокоен';

  return <main className="pet-profile-shell natural-profile-shell">
    <ScanBeacon scanId={scanId}/>
    <div className="pet-profile-top"><PetalapaWordmark/><span className="pet-profile-label">СКАНИРАН ТАГ</span></div>
    <article className="pet-profile-card natural-profile-card">
      <div className="pet-profile-photo natural-profile-photo">
        <img src={tag.photo_url || LAGOTTO} alt={tag.name ?? 'Домашен любимец'}/>
        <span className="natural-profile-tech"><Ic d={I.nfc} size={14}/> NFC + QR</span>
        {lost&&<span className="pet-profile-lost">ИЗГУБЕН</span>}
      </div>
      <div className="pet-profile-body">
        <h1 className="pet-profile-name">{tag.name||'Луна'}</h1>
        <div className="pet-profile-meta">{species(tag.species)}{tag.breed?` • ${tag.breed}`:' • Lagotto Romagnolo'}</div>
        <div className="pet-profile-facts">
          <div className="pet-fact"><span><Ic d={I.info} size={17}/></span><small>Микрочип</small><b>{tag.microchip_no?'Да':'Няма данни'}</b></div>
          <div className="pet-fact"><span><Ic d={I.medical} size={17}/></span><small>Медицински</small><b>{medicalShort}</b></div>
          <div className="pet-fact"><span><Ic d={I.heart} size={17}/></span><small>Характер</small><b>{behaviourShort}</b></div>
          <div className="pet-fact"><span><Ic d={I.phone} size={17}/></span><small>Контакт</small><b>{primary?.phone?'Наличен':'Няма данни'}</b></div>
        </div>
        {(tag.diet_notes||tag.lost_message||tag.reward_text)&&<div className="pet-profile-note">{lost&&tag.lost_message?tag.lost_message:tag.diet_notes}{tag.reward_text?<><br/><b>{tag.reward_text}</b></>:null}</div>}
        <section className={`pet-owner-box${lost?' is-lost':''}`}>
          <span className="owner-label">СТОПАНИН</span><h2>{ownerName}</h2>
          {lost&&<p className="pet-lost-copy">Ако сте намерили {tag.name||'този любимец'}, моля свържете се със стопанина.</p>}
          <div className="pet-owner-actions"><a className={`btn btn-primary${lost?' btn-lost':''}`} href={tel} aria-disabled={!tel}><Ic d={I.phone} size={17}/> {primary?.phone?`Обади се: ${primary.phone}`:'Няма телефон'}</a><a className="btn btn-outline" href={sms} aria-disabled={!sms}><Ic d={I.share} size={17}/> Изпрати местоположение</a></div>
        </section>
        {(tag.vet_name||tag.vet_phone||tag.microchip_no)&&<div className="pet-profile-note secondary">{tag.vet_name?<>Ветеринар: <b>{tag.vet_name}</b>{tag.vet_phone?` · ${tag.vet_phone}`:''}<br/></>:null}{tag.microchip_no?<>Микрочип № {tag.microchip_no}</>:null}</div>}
        <p className="pet-profile-foot">Благодарим ви, че се погрижихте. Профилът е създаден с таг от <a href="/">petalapa.com</a></p>
      </div>
    </article>
  </main>;
}
