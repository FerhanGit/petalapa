import type { PublicTag } from '@/lib/supabase';
import { PetalapaWordmark } from './ModernBrand';
import { STYLES, PhotoTag } from './PhotoTag';
import { Ic, I } from './Site';
import ScanBeacon from './ScanBeacon';

const species = (s: string | null) => s === 'cat' ? 'Котка' : s === 'dog' ? 'Куче' : 'Любимец';
const chipsFrom = (t: string | null) => (t ?? '').split(/[,·;]/).map((s) => s.trim()).filter(Boolean).slice(0, 4);

export default function PetProfile({ tag, scanId }: { tag: PublicTag; scanId: number | null }) {
  const lost = tag.status === 'lost' || !!tag.lost;
  const primary = tag.contacts?.[0];
  const num = primary?.phone?.replace(/\s+/g, '');
  const tel = num ? `tel:${num}` : undefined;
  const sms = num ? `sms:${num}?body=${encodeURIComponent(`Здравей, намерих ${tag.name}. Локация: `)}` : undefined;
  const chips = chipsFrom(tag.behaviour_notes);
  const url = `https://petalapa.com/t/${tag.id}`;

  return (
    <main className="pscreen">
      <ScanBeacon scanId={scanId} />
      <div className="top"><PetalapaWordmark compact /><a className="back" href="/" aria-label="Начало"><Ic d={I.chev} /></a></div>
      <div className="photo">
        {tag.photo_url ? <img src={tag.photo_url} alt={tag.name ?? ''} /> : <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><PhotoTag s={STYLES[1]} size={140} /></div>}
        {lost && <span className="lostb">ИЗГУБЕН</span>}
      </div>
      <div className="body">
        <div>
          <h1 className="pname">{tag.name}</h1>
          <div className="pmeta">{tag.breed ?? species(tag.species)}</div>
          {chips.length > 0 && <div className="chips">{chips.map((c) => <span className="chip" key={c}><Ic d={I.heart} size={12} />{c}</span>)}</div>}
        </div>
        {tag.diet_notes && <p className="pdesc">{tag.diet_notes}</p>}
        <div className={`contact${lost ? ' lost' : ''}`}>
          <b>{lost ? `Ако сте намерили ${tag.name},` : 'Контакт със стопанина'}</b>
          <p>{lost ? 'моля свържете се със стопанина му.' : `Ако сте намерили ${tag.name}, моля свържете се със стопанина.`}</p>
          <div className="row">
            <a className={`btn btn-primary${lost ? ' btn-lost' : ''}`} href={tel} aria-disabled={!tel}><Ic d={I.phone} size={16} /> {lost ? 'Свържи се със стопанина' : 'Обади се'}</a>
            {!lost && <a className="btn btn-outline" href={sms} aria-disabled={!sms}><Ic d={I.msg} size={16} /> Изпрати съобщение</a>}
          </div>
          {lost && <a className="btn btn-outline btn-block" style={{ marginTop: 8 }} href={sms}><Ic d={I.msg} size={16} /> Изпрати местоположение</a>}
          <div className="foot"><Ic d={I.lock} size={12} /> Данните за контакт са само за връщане на любимеца.</div>
        </div>
        <details className="acc" open={lost}><summary><span className="ic"><Ic d={I.medical} size={16} /></span><span>Медицинска информация<small>{tag.medical_notes ? tag.medical_notes.slice(0, 40) : 'Няма въведени данни'}</small></span><span className="chev"><Ic d={I.chev} size={16} /></span></summary><div className="cnt">{tag.medical_notes || 'Няма въведена медицинска информация.'}{tag.vet_name ? <><br />Ветеринар: {tag.vet_name}{tag.vet_phone ? ` · ${tag.vet_phone}` : ''}</> : null}</div></details>
        <details className="acc"><summary><span className="ic"><Ic d={I.info} size={16} /></span><span>Допълнителна информация<small>Микрочип: {tag.microchip_no ? 'да' : 'няма данни'}</small></span><span className="chev"><Ic d={I.chev} size={16} /></span></summary><div className="cnt">{tag.microchip_no ? `Микрочип №${tag.microchip_no}` : 'Няма въведен номер на микрочип.'}{tag.behaviour_notes ? <><br />{tag.behaviour_notes}</> : null}</div></details>
        <div className="sharebar"><Ic d={I.share} size={16} /> Сподели профила<span className="ics"><a href={url} aria-label="Линк"><Ic d={I.arrow} size={16} /></a></span></div>
        <p className="pfoot">Профилът е създаден с таг от <a href="/">petalapa.com</a>.</p>
      </div>
    </main>
  );
}
