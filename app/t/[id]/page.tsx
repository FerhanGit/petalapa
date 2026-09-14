import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { admin, type PublicTag } from '@/lib/supabase';
import PetProfile from '@/components/PetProfile';
import NotActivated from '@/components/NotActivated';

export const dynamic = 'force-dynamic';

export default async function TagPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sb = admin();
  const { data: tag } = await sb.from('tags').select('id,status,pet_id,pets(name)').eq('id', id).maybeSingle();
  if (!tag) notFound();

  if (tag.status === 'disabled') {
    return (<main className="screen pad" style={{ justifyContent: 'center', textAlign: 'center' }}><h1 style={{ fontSize: 30 }}>Този таг е деактивиран.</h1><p className="lead">Ако си стопанинът – влез в профила си и го активирай пак.</p><a className="link" href="/dashboard">Към профила</a></main>);
  }
  if (tag.status === 'blank' || tag.status === 'produced' || tag.status === 'assigned') {
    const preset = (tag as unknown as { pets?: { name?: string } | null }).pets?.name ?? null;
    return <NotActivated tagId={id} presetName={preset} />;
  }

  // claimed / lost: публичен профил + запис на сканирането
  const { data: pub } = await sb.from('public_tag').select('*').eq('id', id).single<PublicTag>();
  if (!pub) notFound();
  const ua = (await headers()).get('user-agent') ?? '';
  const { data: scan } = await sb.from('scans').insert({ tag_id: id, user_agent: ua.slice(0, 200) }).select('id').single();
  return <PetProfile tag={pub} scanId={scan?.id ?? null} />;
}
