import type { PublicTag } from '@/lib/supabase';
import { BrandPill, Footer } from './Brand';
import ScanBeacon from './ScanBeacon';

function fmtDate(iso: string | null) {
  if (!iso) return '';
  const d = new Date(iso); return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export default function PetProfile({ tag, scanId }: { tag: PublicTag; scanId: number | null }) {
  const lost = tag.status === 'lost' || tag.lost;
  const primary = tag.contacts?.[0];
  const tel = primary?.phone ? `tel:${primary.phone.replace(/\s+/g, '')}` : undefined;
  const sms = primary?.phone ? `sms:${primary.phone.replace(/\s+/g, '')}?body=${encodeURIComponent(`Здравей, намерих ${tag.name}. Локация: `)}` : undefined;
  const chips: { text: string; cls?: string }[] = [];
  if (lost && tag.reward_text) chips.push({ text: 'Награда за намиране', cls: 'gold' });
  if (tag.medical_notes) chips.push({ text: tag.medical_notes, cls: 'important' });
  if (tag.behaviour_notes) chips.push({ text: tag.behaviour_notes });
  if (tag.microchip_no) chips.push({ text: 'Чипиран' });
  if (tag.diet_notes) chips.push({ text: tag.diet_notes });

  return (
    <main className="screen">
      <ScanBeacon scanId={scanId} />
      {lost && (
        <div className="banner-lost" role="alert">
          <span className="dot" style={{ width: 12, height: 12, background: 'var(--surface)', marginTop: 6 }} />
          <div><strong>{tag.name} е изгубен{tag.species === 'cat' ? 'а' : 'а'} от {fmtDate(tag.lost_since)}</strong> – {tag.lost_message || 'моля, обади се веднага.'}{tag.reward_text ? ' Има награда.' : ''}</div>
        </div>
      )}
      <div className={`hero${lost ? ' short' : ''}`}>
        {tag.photo_url ? <img src={tag.photo_url} alt={tag.name ?? ''} /> : null}
        {!lost && <BrandPill />}
      </div>
      <div className="sheet">
        <h1 className="name">{tag.name}</h1>
        <p className="lead">{lost ? 'Изгубих се. Ако ме виждаш – стопанинът ми много се тревожи.' : `Аз съм ${tag.name}. Ако ме виждаш без стопанина ми – обади се!`}</p>
        <div className="stack">
          <a className={`btn ${lost ? 'btn-lost' : 'btn-primary'}`} href={tel} aria-disabled={!tel}>{lost ? 'Обади се веднага' : 'Обади се на стопанина'}</a>
          <a className="btn btn-secondary" href={sms} aria-disabled={!sms}>{lost ? 'Изпрати локацията ми' : 'Изпрати съобщение / локация'}</a>
        </div>
        {chips.length > 0 && <div className="chips">{chips.map((c, i) => <span key={i} className={`chip${c.cls ? ' ' + c.cls : ''}`}>{c.text}</span>)}</div>}
        {tag.vet_name && <p className="hint" style={{ marginTop: 14 }}>Ветеринар: {tag.vet_name}{tag.vet_phone ? ` · ${tag.vet_phone}` : ''}</p>}
        {!lost && (
          <div className="banner-info">
            <span className="dot" style={{ width: 10, height: 10, background: 'var(--green)' }} />
            Стопанинът ще получи известие, че тагът е сканиран.
          </div>
        )}
        {lost && <div style={{ marginTop: 'auto' }} />}
        <Footer />
      </div>
    </main>
  );
}
