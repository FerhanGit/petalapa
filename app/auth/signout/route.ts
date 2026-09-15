import { NextResponse } from 'next/server';
import { serverClient } from '@/lib/supabase';

export async function GET(req: Request) {
  const supabase = await serverClient();
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL('/', req.url));
}
