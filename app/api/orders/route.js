import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDB } from '@/lib/db';
import { Animal, Order } from '@/lib/models';
import { isAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Not allowed' }, { status: 401 });
  try {
    await connectDB();
    const orders = await Order.find().sort({ createdAt: -1 }).limit(300).lean();
    return NextResponse.json({ orders });
  } catch (err) {
    return NextResponse.json({ error: 'Database is not reachable' }, { status: 503 });
  }
}

// Public: a customer asks to buy an animal.
export async function POST(req) {
  try {
    const body = await req.json();
    const customerName = String(body.customerName || '').trim();
    const phone = String(body.phone || '').trim();
    if (!customerName || phone.replace(/\D/g, '').length < 7) {
      return NextResponse.json({ error: 'Please enter your name and a valid phone number.' }, { status: 400 });
    }
    await connectDB();
    let animalName = '';
    let animal;
    if (mongoose.isValidObjectId(body.animal)) {
      const found = await Animal.findById(body.animal).select('name').lean();
      if (found) {
        animal = found._id;
        animalName = found.name;
      }
    }
    const order = await Order.create({
      animal,
      animalName,
      customerName,
      phone,
      location: String(body.location || ''),
      quantity: Math.max(1, Math.min(10000, parseInt(body.quantity, 10) || 1)),
      message: String(body.message || ''),
    });
    return NextResponse.json({ ok: true, id: order._id }, { status: 201 });
  } catch (err) {
    console.error('order failed:', err.message);
    return NextResponse.json(
      { error: 'We could not save your order. Please contact us on WhatsApp.' },
      { status: 500 }
    );
  }
}
