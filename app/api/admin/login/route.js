import { NextResponse } from 'next/server';
import { checkPassword, makeToken, COOKIE, cookieOptions } from '@/lib/auth';

export async function POST(req) {
  const { password } = await req.json().catch(() => ({}));
  if (!checkPassword(password || '')) {
    await new Promise((r) => setTimeout(r, 600));
    return NextResponse.json({ error: 'Wrong password' }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, makeToken(), cookieOptions);
  return res;
}
