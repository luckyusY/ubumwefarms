import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { isAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

function cloudinaryConfig() {
  let cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  let apiKey = process.env.CLOUDINARY_API_KEY;
  let apiSecret = process.env.CLOUDINARY_API_SECRET;
  const m = (process.env.CLOUDINARY_URL || '').match(/^cloudinary:\/\/([^:]+):([^@]+)@(.+)$/);
  if (m) {
    apiKey ||= m[1];
    apiSecret ||= m[2];
    cloudName ||= m[3];
  }
  return { cloudName, apiKey, apiSecret };
}

// Gives the admin's browser a short-lived signature so photos upload
// straight to Cloudinary: no server file-size limit, and the secret stays here.
export async function POST() {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Not allowed' }, { status: 401 });
  const { cloudName, apiKey, apiSecret } = cloudinaryConfig();
  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json({ error: 'Cloudinary is not configured' }, { status: 500 });
  }
  const timestamp = Math.floor(Date.now() / 1000);
  const folder = 'ubumwefarms';
  const signature = crypto
    .createHash('sha1')
    .update(`folder=${folder}&timestamp=${timestamp}${apiSecret}`)
    .digest('hex');
  return NextResponse.json({
    url: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    apiKey,
    timestamp,
    folder,
    signature,
  });
}
