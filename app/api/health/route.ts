import { NextResponse } from 'next/server';
import { admin } from '@/lib/supabase';
export const dynamic = 'force-dynamic';
export async function GET() {
  const { data, error } = await admin().from('tags').select('id,status').limit(3);
  return NextResponse.json({ ok: !error, error: error?.message ?? null, hint: (error as { hint?: string } | null)?.hint ?? null, sample: data ?? null,
    env: { url: !!process.env.NEXT_PUBLIC_SUPABASE_URL, service: (process.env.SUPABASE_SERVICE_KEY ?? '').slice(0, 10) } });
}
