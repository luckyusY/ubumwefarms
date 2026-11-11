import Link from 'next/link';
import { categoryOf, formatPrice, img } from '@/lib/site';

export default function AnimalCard({ animal }) {
  const cat = categoryOf(animal.category);
  const soldOut = animal.quantity <= 0;
  const meta = [animal.breed, animal.age, animal.sex].filter(Boolean).join(' · ');
  return (
    <Link href={`/animals/${animal._id}`} className="card">
      <div className="card-photo">
        {animal.images?.[0] ? (
          <img src={img(animal.images[0], 600)} alt={animal.name} loading="lazy" />
        ) : (
          <div className="no-photo" aria-hidden>{cat.icon}</div>
        )}
        <span className={`tag ${soldOut ? 'sold' : ''}`}>
          {soldOut ? 'Sold out' : `${cat.icon} ${cat.label}`}
        </span>
      </div>
      <div className="card-body">
        <h3>{animal.name}</h3>
        {meta && <div className="meta">{meta}</div>}
        <div className="price">
          {formatPrice(animal.price)} <small>each</small>
        </div>
      </div>
    </Link>
  );
}
