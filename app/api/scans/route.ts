import { NextResponse } from 'next/server';
import { admin } from '@/lib/supabase';

export async function PATCH(req: Request) {
  const { scanId, lat, lng } = await req.json();
  if (!scanId || typeof lat !== 'number' || typeof lng !== 'number') return NextResponse.json({}, { status: 400 });
  await admin().from('scans').update({ lat, lng }).eq('id', scanId).is('lat', null);
  return NextResponse.json({ ok: true });
}
