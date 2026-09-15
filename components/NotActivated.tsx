'use client';
import { useState } from 'react';
import { Wordmark } from './Brand';
import ActivateForm from './ActivateForm';

export default function NotActivated({ tagId, presetName }: { tagId: string; presetName?: string | null }) {
  const [code, setCode] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'error' | 'ok'>('idle');
  const [msg, setMsg] = useState('');

  async function activate() {
    if (code.length !== 6) { setState('error'); setMsg('Кодът трябва да е 6 знака.'); return; }
    setState('loading');
    const r = await fetch(`/api/tags/${tagId}/claim`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ code, verify: true }) });
    if (r.ok) setState('ok'); else { setState('error'); setMsg('Кодът не е валиден. Провери картончето и опитай пак.'); }
  }

  if (state === 'ok') return <ActivateForm tagId={tagId} code={code} presetName={presetName} />;

  return (
    <main className="pscreen pad">
      <Wordmark size={20} />
      <div style={{ width: 140, height: 140, borderRadius: '50%', margin: '40px auto 0', background: 'repeating-linear-gradient(135deg,#E9DCC3 0 10px,#F1E7D3 10px 20px)', border: '6px solid var(--surface)', boxShadow: '0 10px 30px rgba(70,50,20,.12)' }} />
      <h1 style={{ marginTop: 28, fontSize: 30, lineHeight: 1.1, textAlign: 'center', textWrap: 'pretty' }}>Този таг още не е активиран.</h1>
      <p className="lead" style={{ fontSize: 15, color: 'var(--text-3)', textAlign: 'center', marginTop: 10 }}>Ако е твой – въведи 6-знаковия код от картончето в кутийката.</p>
      <label className="label" htmlFor="code" style={{ marginTop: 28 }}>Код от картончето</label>
      <input id="code" className={`input input-code${state === 'error' ? ' error' : ''}`} style={{ marginTop: 8 }} value={code} maxLength={6} placeholder="A1B2C3" autoCapitalize="characters" autoComplete="one-time-code"
        onChange={(e) => { setCode(e.target.value.toUpperCase().replace(/[^0-9A-Z]/g, '').slice(0, 6)); setState('idle'); }} />
      {state === 'error' && <div className="err" role="alert"><span className="dot" style={{ width: 8, height: 8, background: 'var(--terra)' }} />{msg}</div>}
      <button className="btn btn-primary btn-block" style={{ marginTop: 14 }} onClick={activate} disabled={state === 'loading'}>
        {state === 'loading' ? <><span className="spinner" />Проверявам…</> : state === 'error' ? 'Опитай пак' : 'Активирай'}
      </button>
      <div className="infobox"><strong>Какво е това?</strong> Ръчно изработен кръгъл епоксиден таг за нашийник с NFC и QR. При сканиране се отваря профилът на любимеца и информация за връзка със стопанина.</div>
      <a className="link" href="/order">Нямаш таг? Създай своя</a>
    </main>
  );
}
