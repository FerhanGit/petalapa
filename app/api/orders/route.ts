import { NextResponse } from 'next/server';
import { admin } from '@/lib/supabase';
export async function POST(req: Request) {
  const fd = await req.formData();
  const payload = JSON.parse(String(fd.get('payload') ?? '{}'));
  if (!payload?.owner?.email || !payload?.pet?.name) return NextResponse.json({ error: 'missing' }, { status: 400 });
  const sb = admin();
  const { data, error } = await sb.from('orders').insert({ style: payload.style, pet: payload.pet, owner: payload.owner, pay_method: payload.pay, price: payload.price, ship: payload.ship, total: payload.total, status: 'new' }).select('id').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const photo = fd.get('photo');
  if (photo instanceof File && photo.size > 0 && photo.size < 8_000_000) {
    const path = `orders/${data.id}.${photo.type.split('/')[1] ?? 'jpg'}`;
    const { error: e } = await sb.storage.from('pets').upload(path, photo, { contentType: photo.type, upsert: true });
    if (!e) { const { data: u } = sb.storage.from('pets').getPublicUrl(path); await sb.from('orders').update({ photo_url: u.publicUrl }).eq('id', data.id); }
  }
  return NextResponse.json({ id: data.id });
}
