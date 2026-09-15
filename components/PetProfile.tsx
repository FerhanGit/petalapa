import Image from 'next/image';
import type { PublicTag } from '@/lib/supabase';
import { Wordmark } from './Brand';
import { Ic, I } from './Icons';
import ScanBeacon from './ScanBeacon';
import { SINGLES } from '@/lib/pics';

const species = (s: string | null) => s === 'cat' ? 'Котка' : s === 'dog' ? 'Куче' : 'Любимец';
const chips = (t: string | null) => (t ?? '').split(/[,·;]/).map((s) => s.trim()).filter(Boolean).slice(0, 4);

export default function PetProfile({ tag, scanId }: { tag: PublicTag; scanId: number | null }) {
  const lost = tag.status === 'lost' || !!tag.lost;
  const primary = tag.contacts?.[0];
  const num = primary?.phone?.replace(/\s+/g, '');
  const tel = num ? `tel:${num}` : undefined;
  const sms = num ? `sms:${num}?body=${encodeURIComponent(`Здравей, намерих ${tag.name}. Локация: `)}` : undefined;
  const mail = primary?.email ? `mailto:${primary.email}?subject=${encodeURIComponent(`Намерих ${tag.name}`)}` : undefined;
  const url = `petalapa.com/t/${tag.id}`;
  const photo = tag.photo_url ?? SINGLES[Math.floor(Math.random() * SINGLES.length)];

  if (lost) return (
    <main className="pscreen lostbg">
      <ScanBeacon scanId={scanId} />
      <div className="ptop"><a href="/" className="icbtn" aria-label="Начало"><Ic d={I.home} /></a><div className="url">{url}?lost=1</div><span className="icbtn"><Ic d={I.share} size={18} /></span></div>
      <div className="lost-head"><div className="bell"><Ic d={I.bell} size={24} /></div><h1>Изгубен любимец</h1><p>Този любимец е отбелязан като изгубен!</p></div>
      <div className="lost-avatar"><Image src={photo} alt={tag.name ?? ''} width={300} height={300} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
      <div className="lost-name"><h2>{tag.name}</h2><p>{tag.breed ?? species(tag.species)}</p></div>
      <div className="lost-note">{tag.lost_message || 'Ако имате информация за него, моля свържете се с нас. Всяка помощ е ценна!'}{tag.reward_text ? ` Награда: ${tag.reward_text}.` : ''}</div>
      <div className="lost-actions">
        <a className="btn btn-primary btn-lost btn-block" href={tel}><Ic d={I.phone} size={18} /> Обади се сега</a>
        <div className="row"><a className="btn btn-outline" href={mail}><Ic d={I.mail} size={16} /> Изпрати имейл</a><a className="btn btn-outline" href={sms}><Ic d={I.pin} size={16} /> Сподели локация</a></div>
      </div>
      <div className="lost-thanks">Благодарим ви, че помагате! ❤</div>
      <div className="pfoot"><Wordmark size={18} sub /></div>
    </main>
  );

  return (
    <main className="pscreen">
      <ScanBeacon scanId={scanId} />
      <div className="ptop"><a href="/" className="icbtn" aria-label="Начало"><Ic d={I.back} /></a><div className="url">{url}</div><span className="icbtn"><Ic d={I.share} size={18} /></span></div>
      <div className="pphoto blend"><Image src={photo} alt={tag.name ?? ''} fill sizes="480px" style={{ objectFit: 'cover', objectPosition: '50% 30%' }} priority /><span className="nfc">NFC</span></div>
      <div className="pbody">
        <div><h1 className="pname">{tag.name}</h1><div className="pmeta">{tag.breed ?? species(tag.species)}</div>
          {chips(tag.behaviour_notes).length > 0 && <div className="pchips">{chips(tag.behaviour_notes).map((c) => <span key={c}>{c}</span>)}</div>}</div>
        <div className="pactions">
          <a className="btn btn-primary" href={tel} aria-disabled={!tel}><Ic d={I.phone} size={16} /> Обади се</a>
          <a className="btn btn-outline" href={mail} aria-disabled={!mail}><Ic d={I.mail} size={16} /> Имейл</a>
          <a className="btn btn-outline" href={sms} aria-disabled={!sms}><Ic d={I.pin} size={16} /> Локация</a>
        </div>
        <div className="plist">
          <div><Ic d={I.user} size={18} /><small>Стопанин</small><b>{primary?.label && primary.label !== 'Стопанин' ? primary.label : 'Скрито име'}</b></div>
          <div><Ic d={I.phone} size={18} /><small>Телефон</small><b>{num ? num.slice(0, 7) + ' *** ' + num.slice(-3) : '—'}</b></div>
          {tag.vet_name && <div><Ic d={I.shield} size={18} /><small>Ветеринар</small><b>{tag.vet_name}</b></div>}
          {tag.medical_notes && <div><Ic d={I.alert} size={18} /><small>Здраве</small><b>{tag.medical_notes}</b></div>}
          {tag.microchip_no && <div><Ic d={I.grid} size={18} /><small>Микрочип</small><b>да</b></div>}
        </div>
        <div className="thanks"><span style={{ color: 'var(--gold)' }}><Ic d={I.heart} size={18} /></span><div><b>Благодаря, че се грижиш!</b>{tag.diet_notes || 'Този любимец има семейство, което много го обича.'}</div></div>
        <div className="pfoot"><Wordmark size={18} sub /></div>
      </div>
    </main>
  );
}
