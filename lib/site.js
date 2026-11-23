// The farm's phone and WhatsApp number. Set here in the code on purpose, so an old
// value left in the hosting dashboard (Vercel) can't override it.
const FARM_NUMBER = '250789229296';

export const SITE = {
  name: 'Ubumwe Farms',
  tagline: 'Healthy rabbits, farm animals and fresh mushrooms.',
  whatsapp: FARM_NUMBER,
  phone: '+250 789 229 296',
  location: process.env.NEXT_PUBLIC_LOCATION || 'Rwanda',
  currency: 'RWF',
};

export const CATEGORIES = [
  { slug: 'rabbits', label: 'Rabbits' },
  { slug: 'mushrooms', label: 'Mushrooms' },
  { slug: 'chickens', label: 'Chickens' },
  { slug: 'goats', label: 'Goats' },
  { slug: 'pigs', label: 'Pigs' },
  { slug: 'cows', label: 'Cows' },
  { slug: 'sheep', label: 'Sheep' },
  { slug: 'ducks', label: 'Ducks' },
  { slug: 'other', label: 'Other' },
];

export function categoryOf(slug) {
  return CATEGORIES.find((c) => c.slug === slug) || CATEGORIES[CATEGORIES.length - 1];
}

export function formatPrice(n) {
  return `${Number(n || 0).toLocaleString('en-US')} ${SITE.currency}`;
}

// "each" for animals, "per kg" for produce sold by weight.
export function unitLabel(unit) {
  return !unit || unit === 'each' ? 'each' : `per ${unit}`;
}

export function whatsappLink(text) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}

// Ask Cloudinary for a smaller, optimized version of an uploaded photo.
export function img(url, width = 700) {
  if (!url || !url.includes('/upload/')) return url;
  return url.replace('/upload/', `/upload/f_auto,q_auto,c_fill,w_${width}/`);
}
