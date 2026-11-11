import mongoose from 'mongoose';
import { connectDB } from './db';
import { Animal } from './models';

const plain = (doc) => JSON.parse(JSON.stringify(doc));

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Returns { animals, error }. Pages show a friendly notice when error is true.
export async function getAnimals({ category, q, featured, limit = 60, includeHidden = false } = {}) {
  try {
    await connectDB();
    const filter = {};
    if (!includeHidden) filter.available = true;
    if (category) filter.category = category;
    if (featured) filter.featured = true;
    if (q) {
      const rx = new RegExp(escapeRegex(q.slice(0, 60)), 'i');
      filter.$or = [{ name: rx }, { breed: rx }, { description: rx }];
    }
    const animals = await Animal.find(filter).sort({ featured: -1, createdAt: -1 }).limit(limit).lean();
    return { animals: plain(animals), error: false };
  } catch (err) {
    console.error('getAnimals failed:', err.message);
    return { animals: [], error: true };
  }
}

export async function getAnimal(id) {
  if (!mongoose.isValidObjectId(id)) return null;
  try {
    await connectDB();
    const animal = await Animal.findById(id).lean();
    return animal ? plain(animal) : null;
  } catch (err) {
    console.error('getAnimal failed:', err.message);
    return null;
  }
}
