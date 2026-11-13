import Link from 'next/link';
import { notFound } from 'next/navigation';
import Gallery from '@/components/Gallery';
import OrderForm from '@/components/OrderForm';
import { getAnimal } from '@/lib/data';
import { categoryOf, formatPrice, unitLabel } from '@/lib/site';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const animal = await getAnimal(id);
  return animal ? { title: animal.name, description: animal.description?.slice(0, 150) } : {};
}

export default async function AnimalPage({ params }) {
  const { id } = await params;
  const animal = await getAnimal(id);
  if (!animal || !animal.available) notFound();
  const cat = categoryOf(animal.category);
  const facts = [
    ['Breed', animal.breed],
    ['Age', animal.age],
    ['Sex', animal.sex],
    ['Weight', animal.weight],
    ['Availability', animal.quantity > 0 ? 'Available now' : 'Sold out'],
  ].filter(([, v]) => v);

  return (
    <div className="wrap">
      <div className="crumbs">
        <Link href="/animals">Shop</Link> / <Link href={`/animals?category=${cat.slug}`}>{cat.label}</Link>
      </div>
      <div className="detail">
        <Gallery images={animal.images} name={animal.name} category={cat.slug} />
        <div>
          <h1>{animal.name}</h1>
          <div className="price">
            {formatPrice(animal.price)} <small>{unitLabel(animal.unit)}</small>
          </div>
          <ul className="facts">
            {facts.map(([k, v]) => (
              <li key={k}><b>{k}</b>{v}</li>
            ))}
          </ul>
          {animal.description && <p className="desc">{animal.description}</p>}
          <OrderForm animal={{ _id: animal._id, name: animal.name, price: animal.price, unit: animal.unit, quantity: animal.quantity }} />
        </div>
      </div>
    </div>
  );
}
