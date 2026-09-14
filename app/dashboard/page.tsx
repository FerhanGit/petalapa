import { redirect } from 'next/navigation';
import { serverClient } from '@/lib/supabase';
import LostToggle from './LostToggle';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const sb = await serverClient();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) redirect('/login');
  const { data: owner } = await sb.from('owners').select('id,email').eq('auth_user_id', user.id).maybeSingle();
  const { data: pets } = await sb.from('pets').select('id,name,photo_url,lost,tags(id,short_code,status)').eq('owner_id', owner?.id ?? '');
  const { data: scans } = await sb.from('scans').select('id,at,lat,lng,tag_id').order('at', { ascending: false }).limit(10);
  const firstName = owner?.email?.split('@')[0] ?? '';

  return (
    <main className="screen" style={{ padding: '28px 20px 24px', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><div className="hint" style={{ fontSize: 13, fontWeight: 700 }}>Здравей, {firstName}</div><h1 style={{ fontSize: 28, lineHeight: 1.1, marginTop: 2 }}>Твоите тагове</h1></div>
        <span className="display" style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--green-tint)', color: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>{firstName[0]?.toUpperCase()}</span>
      </div>
      {(pets ?? []).map((p) => (
        <div key={p.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <span style={{ width: 72, height: 72, borderRadius: 22, flexShrink: 0, background: p.photo_url ? `url(${p.photo_url}) center/cover` : 'repeating-linear-gradient(135deg,#E9DCC3 0 8px,#F1E7D3 8px 16px)' }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="display" style={{ fontSize: 24, lineHeight: 1 }}>{p.name}</div>
              <div className="hint" style={{ fontWeight: 700, marginTop: 4 }}>{(p.tags as { short_code: string }[] | null)?.map((t) => `#${t.short_code}`).join(' · ')}</div>
              <span className="chip" style={{ display: 'inline-block', marginTop: 6, padding: '4px 10px', fontSize: 12, fontWeight: 800, border: 0, background: p.lost ? 'var(--terra-tint)' : 'var(--green-tint)', color: p.lost ? 'var(--terra)' : 'var(--green-dark)' }}>{p.lost ? 'Обявен за изгубен' : 'Вкъщи е'}</span>
            </div>
          </div>
          <LostToggle petId={p.id} lost={!!p.lost} />
        </div>
      ))}
      <div>
        <div className="display" style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Сканирания</div>
        <div className="card flat" style={{ padding: 0, borderRadius: 22, overflow: 'hidden' }}>
          {(scans ?? []).length === 0 && <div className="hint" style={{ padding: 14 }}>Още никой не е сканирал тага.</div>}
          {(scans ?? []).map((s) => { const d = new Date(s.at); return (
            <div key={s.id} className="scanrow">
              <div style={{ width: 48, textAlign: 'center', flexShrink: 0 }}><div className="display" style={{ fontWeight: 600, fontSize: 15, lineHeight: 1 }}>{String(d.getDate()).padStart(2, '0')}.{String(d.getMonth() + 1).padStart(2, '0')}</div><div className="hint" style={{ fontSize: 11, fontWeight: 700 }}>{d.toTimeString().slice(0, 5)}</div></div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-2)', flex: 1 }}>{s.lat ? <a href={`https://maps.google.com/?q=${s.lat},${s.lng}`}>Виж на картата</a> : 'Без локация'}</div>
              <span className="dot" style={{ width: 8, height: 8, background: 'var(--gold)' }} />
            </div>); })}
        </div>
      </div>
      <a className="btn btn-tertiary" href="/">+ Добави таг</a>
      <div className="card gold" style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span className="dot" style={{ width: 12, height: 12, background: 'var(--gold)' }} /><span className="display" style={{ fontSize: 20, color: 'var(--gold-text)' }}>Premium</span><span style={{ marginLeft: 'auto', fontSize: 13, fontWeight: 800, color: 'var(--gold-text-2)' }}>€2,49 / мес.</span></div>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--gold-text)', lineHeight: 1.35 }}>· SMS при всяко сканиране<br />· История на карта<br />· Втори любимец безплатно</div>
        <button className="btn" style={{ height: 52, borderRadius: 16, background: 'var(--gold-text)', color: 'var(--cream)', fontSize: 17 }}>Вземи Premium</button>
      </div>
    </main>
  );
}
