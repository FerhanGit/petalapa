'use client';

import { FormEvent, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Wordmark } from '@/components/Brand';
import { RandomPic } from '@/components/Pics';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setState('error');
      setMessage('Въведи валиден имейл адрес.');
      return;
    }

    setState('sending');
    setMessage('');
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      auth: { persistSession: true },
    });
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });

    if (error) {
      setState('error');
      setMessage('Не успяхме да изпратим линка. Опитай отново след малко.');
      return;
    }
    setState('sent');
  }

  return (
    <main className="login-shell">
      <section className="login-card">
        <Wordmark sub />
        <div className="login-pic"><RandomPic pool="singles" sizes="440px" /></div>
        <h1>Твоят petalapa профил</h1>
        <p className="sub">Влез без парола. Ще изпратим защитен линк на имейла, с който е активиран тагът ти.</p>

        {state === 'sent' ? (
          <div className="infobox" style={{ marginTop: 24 }}><strong>Провери имейла си.</strong> Изпратихме ти линк за вход. Можеш да затвориш тази страница и да отвориш линка от същото устройство.</div>
        ) : (
          <form onSubmit={submit}>
            <div className="field">
              <label className="label" htmlFor="email">Имейл</label>
              <input id="email" className="input" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => { setEmail(e.target.value); setState('idle'); }} />
            </div>
            {state === 'error' && <div className="err" role="alert">{message}</div>}
            <button className="btn btn-primary btn-block" type="submit" disabled={state === 'sending'}>{state === 'sending' ? <><span className="spinner" />Изпращам…</> : 'Изпрати линк за вход'}</button>
          </form>
        )}
        <p className="login-note">Използваме magic link, за да няма пароли за запомняне. Линкът е еднократен и се изпраща само на посочения имейл.</p>
        <a className="link" href="/" style={{ display: 'inline-block', marginTop: 12 }}>← Към началото</a>
      </section>
    </main>
  );
}
