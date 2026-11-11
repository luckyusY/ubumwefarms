export const SITE = {
  name: 'Ubumwe Farms',
  tagline: 'Healthy rabbits and farm animals, raised with care.',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '250700000000',
  phone: process.env.NEXT_PUBLIC_PHONE || '+250 700 000 000',
  location: process.env.NEXT_PUBLIC_LOCATION || 'Rwanda',
  currency: 'RWF',
};

export const CATEGORIES = [
  { slug: 'rabbits', label: 'Rabbits' },
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

export function whatsappLink(text) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}

// Ask Cloudinary for a smaller, optimized version of an uploaded photo.
export function img(url, width = 700) {
  if (!url || !url.includes('/upload/')) return url;
  return url.replace('/upload/', `/upload/f_auto,q_auto,c_fill,w_${width}/`);
}
