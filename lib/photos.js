// Real photos from the farm, stored on Cloudinary.
const BASE = 'https://res.cloudinary.com/ckoclkoz/image/upload';
const photo = (n, alt) => ({ id: `ubumwefarms/farm-rabbit-${n}.jpg`, alt });

// Crops to the given size, keeping the animal in frame.
export function farmPhoto(p, w, h) {
  return `${BASE}/f_auto,q_auto,c_fill,g_auto,w_${w},h_${h}/${p.id}`;
}

export const HERO_PHOTO = photo(1, 'White rabbit with dark ears at Ubumwe Farms');

export const FARM_PHOTOS = [
  photo(8, 'Two young white rabbits eating greens'),
  photo(7, 'Mother rabbit with her young'),
  photo(6, 'Brown rabbit with a white blaze'),
  photo(4, 'White rabbit with grey ears'),
  photo(3, 'Two white rabbits feeding'),
  photo(2, 'White rabbit in its hutch'),
];
