import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Animal, ANIMAL_FIELDS, pick } from '@/lib/models';
import { getAnimals } from '@/lib/data';
import { isAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const includeHidden = searchParams.get('all') === '1' && (await isAdmin());
  const { animals, error } = await getAnimals({
    category: searchParams.get('category') || undefined,
    q: searchParams.get('q') || undefined,
    includeHidden,
    limit: 200,
  });
  if (error) return NextResponse.json({ error: 'Database is not reachable' }, { status: 503 });
  return NextResponse.json({ animals });
}

export async function POST(req) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Not allowed' }, { status: 401 });
  try {
    const body = await req.json();
    await connectDB();
    const animal = await Animal.create(pick(body, ANIMAL_FIELDS));
    return NextResponse.json({ animal }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
