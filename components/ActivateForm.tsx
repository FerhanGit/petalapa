'use client';
import { useState } from 'react';

export default function ActivateForm({ tagId, code, presetName }: { tagId: string; code: string; presetName?: string | null }) {
  const [f, setF] = useState({ name: presetName ?? '', phone: '', notes: '', email: '' });
  const [photo, setPhoto] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });

  async function submit() {
    if (!f.name.trim()) return setErr('Напиши името на любимеца.');
    if (!/^\+?[0-9 ]{8,}$/.test(f.phone)) return setErr('Телефонът трябва да е с код на държавата, напр. +359 88 123 4567.');
    if (!/^\S+@\S+\.\S+$/.test(f.email)) return setErr('Имейлът не изглежда валиден.');
    setErr(''); setBusy(true);
    const fd = new FormData();
    fd.append('code', code); Object.entries(f).forEach(([k, v]) => fd.append(k, v)); if (photo) fd.append('photo', photo);
    const r = await fetch(`/api/tags/${tagId}/claim`, { method: 'POST', body: fd });
    setBusy(false);
    if (r.ok) location.href = `/t/${tagId}?activated=1`; else setErr('Нещо се обърка. Опитай пак след малко.');
  }

  return (
    <main className="screen pad">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span className="chip" style={{ background: 'var(--green-tint)', border: 0, color: 'var(--green-dark)', fontSize: 12, fontWeight: 800, padding: '6px 12px' }}>Код приет</span>
        <span className="hint" style={{ fontWeight: 700 }}>Таг #{tagId.slice(0, 4).toUpperCase()}</span>
      </div>
      <h1 style={{ marginTop: 16, fontSize: 30, lineHeight: 1.1 }}>Разкажи ни за любимеца</h1>
      <p className="lead" style={{ fontSize: 15, color: 'var(--text-3)', marginTop: 6 }}>Отнема минута. Можеш да редактираш после.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 22, flex: 1 }}>
        <div className="field"><label className="label" htmlFor="name">Име на любимеца</label><input id="name" className="input" placeholder="Атина" value={f.name} onChange={set('name')} /></div>
        <div className="field"><label className="label" htmlFor="photo">Снимка</label>
          <label htmlFor="photo" style={{ display: 'flex', alignItems: 'center', gap: 14, height: 76, borderRadius: 18, border: '2px dashed var(--border-dash)', background: 'var(--surface)', padding: '0 14px', cursor: 'pointer' }}>
            <span style={{ width: 48, height: 48, borderRadius: 14, background: photo ? `url(${URL.createObjectURL(photo)}) center/cover` : 'repeating-linear-gradient(135deg,#E9DCC3 0 6px,#F1E7D3 6px 12px)', flexShrink: 0 }} />
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-2)', lineHeight: 1.3 }}>{photo ? photo.name : 'Качи снимка'}<br /><span className="hint">ясна, отблизо, на светло</span></div>
          </label>
          <input id="photo" type="file" accept="image/*" hidden onChange={(e) => setPhoto(e.target.files?.[0] ?? null)} />
        </div>
        <div className="field"><label className="label" htmlFor="phone">Телефон за обаждане</label><input id="phone" className="input" type="tel" placeholder="+359 88 123 4567" value={f.phone} onChange={set('phone')} /><span className="hint">Номерът остава скрит – хората звънят през бутона.</span></div>
        <div className="field"><label className="label" htmlFor="notes">Бележки</label><textarea id="notes" className="input" placeholder="Алергии, характер, лекарства…" value={f.notes} onChange={set('notes')} /></div>
        <div className="field"><label className="label" htmlFor="email">Имейл за известия</label><input id="email" className="input" type="email" placeholder="maria@example.com" value={f.email} onChange={set('email')} /></div>
        {err && <div className="err" role="alert"><span className="dot" style={{ width: 8, height: 8, background: 'var(--terra)' }} />{err}</div>}
      </div>
      <button className="btn btn-form" style={{ marginTop: 14, flexShrink: 0 }} onClick={submit} disabled={busy}>{busy ? <><span className="spinner" />Записвам…</> : 'Готово'}</button>
    </main>
  );
}
