import { NextResponse } from 'next/server';
import { admin } from '@/lib/supabase';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;
// POST {url, name} с header x-admin-secret → сваля файла и го качва в Storage bucket "pets" под assets/<name>
export async function POST(req: Request) {
  if (req.headers.get('x-admin-secret') !== process.env.ADMIN_SECRET) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  const { url, name } = await req.json();
  const r = await fetch(url);
  if (!r.ok) return NextResponse.json({ error: `fetch ${r.status}` }, { status: 502 });
  const buf = Buffer.from(await r.arrayBuffer());
  const ct = r.headers.get('content-type') ?? 'image/jpeg';
  const sb = admin();
  const { error } = await sb.storage.from('pets').upload(`assets/${name}`, buf, { contentType: ct, upsert: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const { data } = sb.storage.from('pets').getPublicUrl(`assets/${name}`);
  return NextResponse.json({ url: data.publicUrl, bytes: buf.length });
}
