'use client';
import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';

export default function LostToggle({ petId, lost: initial }: { petId: string; lost: boolean }) {
  const [lost, setLost] = useState(initial);
  const sb = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  async function toggle() {
    const next = !lost; setLost(next);
    const { error } = await sb.rpc('set_lost', { p_pet: petId, p_lost: next, p_message: next ? 'моля, обади се веднага.' : null, p_reward: next ? 'Награда' : null });
    if (error) setLost(!next);
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--cream)', borderRadius: 18, padding: '12px 14px' }}>
      <div><div className="display" style={{ fontWeight: 600, fontSize: 17 }}>Изгубен режим</div><div className="hint">Червен банер + „Обади се веднага“</div></div>
      <button className={`toggle${lost ? ' on' : ''}`} onClick={toggle} aria-label="Изгубен режим" aria-pressed={lost}><span /></button>
    </div>
  );
}
