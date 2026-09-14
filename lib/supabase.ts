import { createClient } from '@supabase/supabase-js';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Service role – само на сървъра, за /t/[id] и API. Никога в client компонент.
export const admin = () =>
  createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!, { auth: { persistSession: false }, db: { schema: 'petalapa' } });

// Auth-aware клиент за dashboard (RLS).
export async function serverClient() {
  const store = await cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    db: { schema: 'petalapa' },
    cookies: {
      getAll: () => store.getAll(),
      setAll: (all: { name: string; value: string; options?: Record<string, unknown> }[]) => {
        try { all.forEach(({ name, value, options }) => store.set(name, value, options as Parameters<typeof store.set>[2])); } catch {}
      },
    },
  });
}

export type TagStatus = 'blank' | 'produced' | 'assigned' | 'claimed' | 'lost' | 'disabled';
export type Contact = { label: string; phone: string | null; email: string | null };
export type PublicTag = {
  id: string; status: TagStatus; pet_id: string | null; name: string | null; species: string | null; breed: string | null;
  photo_url: string | null; medical_notes: string | null; behaviour_notes: string | null; diet_notes: string | null;
  lost: boolean | null; lost_since: string | null; lost_message: string | null; reward_text: string | null;
  microchip_no: string | null; vet_name: string | null; vet_phone: string | null; contacts: Contact[] | null;
};
