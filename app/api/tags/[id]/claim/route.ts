import { NextResponse } from 'next/server';
import { admin } from '@/lib/supabase';

// POST JSON {code, verify:true}  -> само проверка на кода
// POST multipart {code,name,phone,notes,email,photo?} -> активира тага
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sb = admin();
  const ct = req.headers.get('content-type') ?? '';

  if (ct.includes('application/json')) {
    const { code } = await req.json();
    const { data } = await sb.from('tags').select('id').eq('id', id).eq('claim_code', String(code).toUpperCase()).in('status', ['produced', 'assigned']).maybeSingle();
    return data ? NextResponse.json({ ok: true }) : NextResponse.json({ ok: false }, { status: 400 });
  }

  const fd = await req.formData();
  const code = String(fd.get('code') ?? '').toUpperCase();
  const name = String(fd.get('name') ?? '').trim();
  const phone = String(fd.get('phone') ?? '').trim();
  const email = String(fd.get('email') ?? '').trim().toLowerCase();
  const notes = String(fd.get('notes') ?? '').trim();
  if (!name || !phone || !email) return NextResponse.json({ error: 'missing' }, { status: 400 });

  // owner по имейл (без парола за MVP – по-късно magic link)
  const { data: owner } = await sb.from('owners').upsert({ email, phone }, { onConflict: 'email' }).select('id').single();
  if (!owner) return NextResponse.json({ error: 'owner' }, { status: 500 });

  const { data: petId, error } = await sb.rpc('claim_tag', { p_tag: id, p_code: code, p_owner: owner.id, p_pet_name: name });
  if (error) return NextResponse.json({ error: 'invalid code' }, { status: 400 });

  await sb.from('pets').update({ behaviour_notes: notes || null, phone_public: phone }).eq('id', petId);
  await sb.from('pet_contacts').insert({ pet_id: petId, label: 'Стопанин', phone, email, is_primary: true, show_public: true });

  const photo = fd.get('photo');
  if (photo instanceof File && photo.size > 0 && photo.size < 8_000_000) {
    const path = `${petId}/${Date.now()}.${photo.type.split('/')[1] ?? 'jpg'}`;
    const { error: upErr } = await sb.storage.from('pets').upload(path, photo, { contentType: photo.type, upsert: true });
    if (!upErr) {
      const { data: url } = sb.storage.from('pets').getPublicUrl(path);
      await sb.from('pets').update({ photo_url: url.publicUrl }).eq('id', petId);
    }
  }
  return NextResponse.json({ ok: true, petId });
}
