import { NextResponse } from 'next/server';
import { admin } from '@/lib/supabase';

const PRICES: Record<string, number> = { ocean: 29, forest: 29, galaxy: 29, floral: 29, wood: 32, minimal: 27, love: 29, custom: 39 };
const SHIP = 4.9;

export async function POST(req: Request) {
  try {
    const fd = await req.formData();
    const payload = JSON.parse(String(fd.get('payload') ?? '{}'));
    const style = String(payload?.style ?? '');
    const price = PRICES[style];
    const payMethod = payload?.pay === 'cod' ? 'cod' : 'card';
    const pet = payload?.pet ?? {};
    const owner = payload?.owner ?? {};

    const petName = String(pet.name ?? '').trim();
    const ownerName = String(owner.name ?? '').trim();
    const email = String(owner.email ?? '').trim();
    const phone = String(owner.phone ?? '').trim();
    const city = String(owner.city ?? '').trim();
    const address = String(owner.address ?? '').trim();

    if (!price || !petName || !ownerName || !/^\S+@\S+\.\S+$/.test(email) || !/^\+?[0-9 ]{8,}$/.test(phone) || !city || !address) {
      return NextResponse.json({ error: 'invalid_order' }, { status: 400 });
    }

    const sb = admin();
    const { data, error } = await sb.from('orders').insert({
      style,
      pet,
      owner: { ...owner, name: ownerName, email, phone, city, address },
      pay_method: payMethod,
      price,
      ship: SHIP,
      total: price + SHIP,
      status: 'new',
    }).select('id').single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const photo = fd.get('photo');
    if (photo instanceof File && photo.size > 0 && photo.size < 8_000_000 && photo.type.startsWith('image/')) {
      const ext = photo.type === 'image/png' ? 'png' : photo.type === 'image/webp' ? 'webp' : 'jpg';
      const path = `orders/${data.id}.${ext}`;
      const { error: uploadError } = await sb.storage.from('pets').upload(path, photo, { contentType: photo.type, upsert: true });
      if (!uploadError) {
        const { data: u } = sb.storage.from('pets').getPublicUrl(path);
        await sb.from('orders').update({ photo_url: u.publicUrl }).eq('id', data.id);
      }
    }

    return NextResponse.json({ id: data.id });
  } catch {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  }
}
