import Link from 'next/link';
import AnimalCard from '@/components/AnimalCard';
import { getAnimals } from '@/lib/data';
import { SITE, CATEGORIES, whatsappLink } from '@/lib/site';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Animals for sale' };

export default async function AnimalsPage({ searchParams }) {
  const sp = await searchParams;
  const category = CATEGORIES.some((c) => c.slug === sp.category) ? sp.category : '';
  const q = typeof sp.q === 'string' ? sp.q.trim() : '';
  const { animals, error } = await getAnimals({ category: category || undefined, q: q || undefined });
  const current = CATEGORIES.find((c) => c.slug === category);

  return (
    <section className="section">
      <div className="wrap">
        <div className="section-head">
          <div>
            <h2>{current ? `${current.icon} ${current.label}` : 'All animals'}</h2>
            <p>{animals.length} available{q ? ` for "${q}"` : ''}</p>
          </div>
        </div>

        <form className="search" action="/animals">
          {category && <input type="hidden" name="category" value={category} />}
          <input type="search" name="q" defaultValue={q} placeholder="Search, for example: New Zealand White" aria-label="Search animals" />
          <button className="btn btn-forest">Search</button>
        </form>

        <div className="chips">
          <Link href="/animals" className={`chip ${!category ? 'on' : ''}`}>All</Link>
          {CATEGORIES.map((c) => (
            <Link key={c.slug} href={`/animals?category=${c.slug}`} className={`chip ${category === c.slug ? 'on' : ''}`}>
              {c.icon} {c.label}
            </Link>
          ))}
        </div>

        {animals.length > 0 ? (
          <div className="grid">
            {animals.map((a) => <AnimalCard key={a._id} animal={a} />)}
          </div>
        ) : (
          <div className="notice">
            <div className="big" aria-hidden>{current?.icon || '🌾'}</div>
            <h3>{error ? 'Our list is loading slowly today' : 'Nothing here right now'}</h3>
            <p>Message us and we will tell you what is available or when more arrive.</p>
            <a className="btn btn-wa" href={whatsappLink(`Hello ${SITE.name}, do you have ${current ? current.label.toLowerCase() : 'animals'} available?`)} target="_blank" rel="noopener noreferrer">
              💬 Ask on WhatsApp
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
