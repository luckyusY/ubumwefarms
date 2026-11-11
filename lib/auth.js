import crypto from 'crypto';
import { cookies } from 'next/headers';

export const COOKIE = 'uf_admin';
const WEEK = 60 * 60 * 24 * 7;

function sign(value) {
  return crypto.createHmac('sha256', process.env.ADMIN_PASSWORD || '').update(value).digest('hex');
}

function safeEqual(a, b) {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}

export function checkPassword(password) {
  const real = process.env.ADMIN_PASSWORD;
  if (!real) return false;
  // Compare hashes so length differences do not leak.
  return safeEqual(sign(`pw:${password}`), sign(`pw:${real}`));
}

export function makeToken() {
  const exp = String(Math.floor(Date.now() / 1000) + WEEK);
  return `${exp}.${sign(exp)}`;
}

export function validToken(token) {
  if (!token || !process.env.ADMIN_PASSWORD) return false;
  const [exp, sig] = token.split('.');
  if (!exp || !sig || !safeEqual(sig, sign(exp))) return false;
  return Number(exp) > Date.now() / 1000;
}

export async function isAdmin() {
  const store = await cookies();
  return validToken(store.get(COOKIE)?.value);
}

export const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: WEEK,
};
