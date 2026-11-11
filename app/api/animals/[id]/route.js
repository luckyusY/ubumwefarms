import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDB } from '@/lib/db';
import { Animal, ANIMAL_FIELDS, pick } from '@/lib/models';
import { isAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

async function guard(params) {
  if (!(await isAdmin())) return { fail: NextResponse.json({ error: 'Not allowed' }, { status: 401 }) };
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) return { fail: NextResponse.json({ error: 'Not found' }, { status: 404 }) };
  return { id };
}

export async function PUT(req, { params }) {
  const { id, fail } = await guard(params);
  if (fail) return fail;
  try {
    const body = await req.json();
    await connectDB();
    const animal = await Animal.findByIdAndUpdate(id, pick(body, ANIMAL_FIELDS), {
      returnDocument: 'after',
      runValidators: true,
    });
    if (!animal) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ animal });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  const { id, fail } = await guard(params);
  if (fail) return fail;
  try {
    await connectDB();
    await Animal.findByIdAndDelete(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
