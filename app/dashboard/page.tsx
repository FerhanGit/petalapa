import { redirect } from 'next/navigation';
import { admin, serverClient } from '@/lib/supabase';
import { Wordmark } from '@/components/Brand';
import LostToggle from './LostToggle';

export const dynamic = 'force-dynamic';

type TagRow = { id: string; short_code: string; status: string };
type PetRow = { id: string; name: string; photo_url: string | null; lost: boolean; tags: TagRow[] | null };
type ScanRow = { id: number; at: string; lat: number | null; lng: number | null; tag_id: string | null };

export default async function Dashboard() {
  const auth = await serverClient();
  const { data: { user } } = await auth.auth.getUser();
  if (!user) redirect('/login');

  const db = admin();
  let { data: owner } = await db.from('owners').select('id,email').eq('auth_user_id', user.id).maybeSingle();

  if (!owner && user.email) {
    const { data: byEmail } = await db.from('owners').select('id,email').ilike('email', user.email).maybeSingle();
    if (byEmail) {
      const { error } = await db.from('owners').update({ auth_user_id: user.id }).eq('id', byEmail.id);
      if (!error) owner = byEmail;
    }
  }

  let pets: PetRow[] = [];
  let scans: ScanRow[] = [];
  if (owner) {
    const { data: petRows } = await db.from('pets').select('id,name,photo_url,lost,tags(id,short_code,status)').eq('owner_id', owner.id).order('created_at', { ascending: false });
    pets = (petRows ?? []) as PetRow[];
    const tagIds = pets.flatMap((p) => (p.tags ?? []).map((t) => t.id));
    if (tagIds.length) {
      const { data: scanRows } = await db.from('scans').select('id,at,lat,lng,tag_id').in('tag_id', tagIds).order('at', { ascending: false }).limit(20);
      scans = (scanRows ?? []) as ScanRow[];
    }
  }

  const firstName = owner?.email?.split('@')[0] ?? user.email?.split('@')[0] ?? '';

  return (
    <main className="pscreen" style={{ padding: '24px 20px 30px', gap: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14 }}>
        <Wordmark size={20} />
        <a className="link" href="/auth/signout" style={{ fontSize: 12 }}>Изход</a>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><div className="hint" style={{ fontSize: 13, fontWeight: 700 }}>Здравей, {firstName}</div><h1 style={{ fontSize: 28, lineHeight: 1.1, marginTop: 2 }}>Твоите тагове</h1></div>
        <span className="display" style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--green-tint)', color: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>{firstName[0]?.toUpperCase()}</span>
      </div>

      {!owner && <div className="card" style={{ padding: 22 }}><h2 style={{ fontSize: 22 }}>Още няма свързан таг</h2><p className="sub">Влез с имейла, който си използвал при активиране. Ако още нямаш petalapa таг, можеш да създадеш поръчка сега.</p><a className="btn btn-primary" href="/order" style={{ marginTop: 14 }}>Създай таг</a></div>}

      {pets.map((p) => (
        <div key={p.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <span style={{ width: 72, height: 72, borderRadius: 22, flexShrink: 0, background: p.photo_url ? `url(${p.photo_url}) center/cover` : 'repeating-linear-gradient(135deg,#E9DCC3 0 8px,#F1E7D3 8px 16px)' }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="display" style={{ fontSize: 24, lineHeight: 1 }}>{p.name}</div>
              <div className="hint" style={{ fontWeight: 700, marginTop: 4 }}>{(p.tags ?? []).map((t) => `#${t.short_code}`).join(' · ') || 'Няма свързан таг'}</div>
              <span className="chip" style={{ display: 'inline-block', marginTop: 6, padding: '4px 10px', fontSize: 12, fontWeight: 800, border: 0, background: p.lost ? 'var(--terra-tint)' : 'var(--green-tint)', color: p.lost ? 'var(--terra)' : 'var(--green-dark)' }}>{p.lost ? 'Обявен за изгубен' : 'Вкъщи е'}</span>
            </div>
          </div>
          <LostToggle petId={p.id} lost={!!p.lost} />
        </div>
      ))}

      <div>
        <div className="display" style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Сканирания на твоите тагове</div>
        <div className="card flat" style={{ padding: 0, borderRadius: 22, overflow: 'hidden' }}>
          {scans.length === 0 && <div className="hint" style={{ padding: 14 }}>Още няма регистрирани сканирания.</div>}
          {scans.map((s) => { const d = new Date(s.at); return (
            <div key={s.id} className="scanrow">
              <div style={{ width: 48, textAlign: 'center', flexShrink: 0 }}><div className="display" style={{ fontWeight: 600, fontSize: 15, lineHeight: 1 }}>{String(d.getDate()).padStart(2, '0')}.{String(d.getMonth() + 1).padStart(2, '0')}</div><div className="hint" style={{ fontSize: 11, fontWeight: 700 }}>{d.toTimeString().slice(0, 5)}</div></div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-2)', flex: 1 }}>{s.lat && s.lng ? <a href={`https://maps.google.com/?q=${s.lat},${s.lng}`}>Виж на картата</a> : 'Без споделена локация'}</div>
              <span className="dot" style={{ width: 8, height: 8, background: 'var(--gold)' }} />
            </div>); })}
        </div>
      </div>

      <a className="btn btn-outline btn-block" href="/order">+ Поръчай още един таг</a>
    </main>
  );
}
