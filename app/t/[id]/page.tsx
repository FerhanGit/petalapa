import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { admin, type PublicTag } from '@/lib/supabase';
import PetProfile from '@/components/PetProfile';
import NotActivated from '@/components/NotActivated';

export const dynamic = 'force-dynamic';

export default async function TagPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sb = admin();
  const { data: tag, error } = await sb.from('tags').select('id,status,pet_id').eq('id', id).maybeSingle();
  if (error) { console.error('tag lookup failed', id, error); throw new Error('Supabase: ' + error.message); }
  if (!tag) notFound();
  let presetName: string | null = null;
  if (tag.pet_id) {
    const { data: pet } = await sb.from('pets').select('name').eq('id', tag.pet_id).maybeSingle();
    presetName = pet?.name ?? null;
  }

  if (tag.status === 'disabled') {
    return (<main className="screen pad" style={{ justifyContent: 'center', textAlign: 'center' }}><h1 style={{ fontSize: 30 }}>Този таг е деактивиран.</h1><p className="lead">Ако си стопанинът – влез в профила си и го активирай пак.</p><a className="link" href="/dashboard">Към профила</a></main>);
  }
  if (tag.status === 'blank' || tag.status === 'produced' || tag.status === 'assigned') {
    return <NotActivated tagId={id} presetName={presetName} />;
  }

  // claimed / lost: публичен профил + запис на сканирането
  const { data: pub } = await sb.from('public_tag').select('*').eq('id', id).single<PublicTag>();
  if (!pub) notFound();
  const ua = (await headers()).get('user-agent') ?? '';
  const { data: scan } = await sb.from('scans').insert({ tag_id: id, user_agent: ua.slice(0, 200) }).select('id').single();
  return <PetProfile tag={pub} scanId={scan?.id ?? null} />;
}
