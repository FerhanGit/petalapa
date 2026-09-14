import type { PublicTag } from '@/lib/supabase';
import { BrandPill, Footer } from './Brand';
import ScanBeacon from './ScanBeacon';

const fmt = (iso: string | null) => iso ? new Date(iso).toLocaleDateString('bg-BG', { day: '2-digit', month: '2-digit' }) : '';
const species = (s: string | null) => s === 'cat' ? 'Котка' : s === 'dog' ? 'Куче' : 'Любимец';

export default function PetProfile({ tag, scanId }: { tag: PublicTag; scanId: number | null }) {
  const lost = tag.status === 'lost' || !!tag.lost;
  const primary = tag.contacts?.[0];
  const num = primary?.phone?.replace(/\s+/g, '');
  const tel = num ? `tel:${num}` : undefined;
  const sms = num ? `sms:${num}?body=${encodeURIComponent(`Здравей, намерих ${tag.name}. Локация: `)}` : undefined;
  const facts: { k: string; v: string; important?: boolean }[] = [];
  if (tag.microchip_no) facts.push({ k: 'Чип', v: 'Да' });
  if (tag.medical_notes) facts.push({ k: 'Медицинско', v: tag.medical_notes, important: true });
  if (tag.diet_notes) facts.push({ k: 'Храна', v: tag.diet_notes });
  if (tag.behaviour_notes) facts.push({ k: 'Характер', v: tag.behaviour_notes });
  if (tag.vet_name) facts.push({ k: 'Ветеринар', v: tag.vet_name });
  if (lost && tag.reward_text) facts.push({ k: 'Награда', v: tag.reward_text, important: true });

  return (
    <main className="screen">
      <ScanBeacon scanId={scanId} />
      {lost && (
        <div className="banner-lost" role="alert">
          <strong>{tag.name} е изгубен{tag.species === 'cat' ? 'а' : ''} от {fmt(tag.lost_since)}</strong>
          {tag.lost_message || 'Ако го виждаш – моля, обади се веднага.'}
        </div>
      )}
      <div className={`hero${lost ? ' short' : ''}`}>
        {tag.photo_url ? <img src={tag.photo_url} alt={tag.name ?? ''} /> : null}
        {!lost && <BrandPill />}
        {!lost && <span className="scanned">СКАНИРАН ТАГ</span>}
      </div>
      <div className="sheet">
        <h1 className="name">{tag.name}</h1>
        <div className="meta">{species(tag.species)}{tag.breed ? ` · ${tag.breed}` : ''}</div>
        {facts.length > 0 && <div className="facts">{facts.map((f) => (<div key={f.k} className={`fact${f.important ? ' important' : ''}`}><small>{f.k}</small><b>{f.v}</b></div>))}</div>}
        <div className="owner">
          <small>Стопанин</small>
          <div className="who">{primary?.label && primary.label !== 'Стопанин' ? primary.label : 'Обади се – номерът е скрит'}</div>
          <a className={`btn ${lost ? 'btn-lost' : 'btn-call'}`} href={tel} aria-disabled={!tel}>{lost ? 'Обади се веднага' : 'Обади се на стопанина'}</a>
          <a className="btn btn-secondary" href={sms} aria-disabled={!sms}>Изпрати местоположение</a>
        </div>
        <p className="notice">Благодарим, че се погрижи. {!lost && 'Стопанинът получава известие, че тагът е сканиран.'}</p>
        <Footer />
      </div>
    </main>
  );
}
