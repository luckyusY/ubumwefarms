import mongoose from 'mongoose';

const AnimalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    category: { type: String, required: true, default: 'rabbits' },
    breed: { type: String, trim: true, maxlength: 80, default: '' },
    age: { type: String, trim: true, maxlength: 40, default: '' },
    sex: { type: String, enum: ['', 'male', 'female', 'mixed'], default: '' },
    weight: { type: String, trim: true, maxlength: 40, default: '' },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, default: 1, min: 0 },
    description: { type: String, trim: true, maxlength: 2000, default: '' },
    images: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const OrderSchema = new mongoose.Schema(
  {
    animal: { type: mongoose.Schema.Types.ObjectId, ref: 'Animal' },
    animalName: { type: String, default: '' },
    customerName: { type: String, required: true, trim: true, maxlength: 100 },
    phone: { type: String, required: true, trim: true, maxlength: 30 },
    location: { type: String, trim: true, maxlength: 120, default: '' },
    quantity: { type: Number, default: 1, min: 1 },
    message: { type: String, trim: true, maxlength: 1000, default: '' },
    status: { type: String, enum: ['new', 'contacted', 'done', 'cancelled'], default: 'new' },
  },
  { timestamps: true }
);

export const Animal = mongoose.models.Animal || mongoose.model('Animal', AnimalSchema);
export const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

export const ANIMAL_FIELDS = [
  'name', 'category', 'breed', 'age', 'sex', 'weight', 'price',
  'quantity', 'description', 'images', 'featured', 'available',
];

export function pick(body, fields) {
  const out = {};
  for (const f of fields) if (body[f] !== undefined) out[f] = body[f];
  return out;
}
