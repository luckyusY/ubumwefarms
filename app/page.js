import Link from 'next/link';
import AnimalCard from '@/components/AnimalCard';
import { getAnimals } from '@/lib/data';
import { HERO_PHOTO, FARM_PHOTOS, farmPhoto } from '@/lib/photos';
import { SITE, CATEGORIES, whatsappLink } from '@/lib/site';
import { CatIcon, WhatsAppIcon, PhoneIcon, LeafIcon, ArrowIcon, HealthIcon, BreedIcon, HandshakeIcon, AdviceIcon } from '@/components/Icons';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const { animals, error } = await getAnimals({ limit: 8 });

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow rise">Murakaza neza · Welcome</span>
            <h1 className="rise d1">
              Healthy <em>rabbits</em>, straight from our farm.
            </h1>
            <p className="lead rise d2">
              {SITE.name} raises rabbits, chickens, goats and more. Pick an animal, send your order,
              and we call you to arrange pickup or delivery.
            </p>
            <div className="hero-actions rise d3">
              <Link href="/animals?category=rabbits" className="btn btn-carrot"><CatIcon slug="rabbits" /> See rabbits</Link>
              <Link href="/animals" className="btn">All animals</Link>
            </div>
          </div>
          <div className="hero-art rise d2">
            <img className="hero-img" src={farmPhoto(HERO_PHOTO, 900, 900)} alt={HERO_PHOTO.alt} />
            <span className="hero-badge b1"><LeafIcon aria-hidden /> Farm raised</span>
            <span className="hero-badge b2">Fair prices</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <h2>What are you looking for?</h2>
              <p>Tap an animal to see what we have today.</p>
            </div>
          </div>
          <div className="cats">
            {CATEGORIES.map((c, i) => (
              <Link key={c.slug} href={`/animals?category=${c.slug}`} className={`cat ${i === 0 ? 'big' : ''}`}>
                <span className="icon"><CatIcon slug={c.slug} /></span>
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <h2>Available now</h2>
              <p>Fresh from the farm this week.</p>
            </div>
            <Link href="/animals" className="more">See all animals <ArrowIcon aria-hidden /></Link>
          </div>
          {animals.length > 0 ? (
            <div className="grid">
              {animals.map((a) => <AnimalCard key={a._id} animal={a} />)}
            </div>
          ) : (
            <div className="notice">
              <div className="big"><CatIcon slug="rabbits" /></div>
              <h3>{error ? 'Our list is loading slowly today' : 'New animals are coming soon'}</h3>
              <p>Message us and we will tell you what is available right now.</p>
              <a className="btn btn-wa" href={whatsappLink(`Hello ${SITE.name}, what animals do you have available?`)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon aria-hidden /> Ask on WhatsApp
              </a>
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <h2>From our farm</h2>
              <p>Real photos of our rabbits, taken in our hutches.</p>
            </div>
          </div>
          <div className="farm-photos">
            {FARM_PHOTOS.map((p) => (
              <figure key={p.id}>
                <img src={farmPhoto(p, 600, 720)} alt={p.alt} loading="lazy" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="wrap">
          <div className="section-head">
            <div>
              <h2>Buying is easy</h2>
              <p>Three steps. No account needed.</p>
            </div>
          </div>
          <div className="steps">
            <div className="step">
              <h3>Choose</h3>
              <p>Look through the animals and open the one you like.</p>
            </div>
            <div className="step">
              <h3>Send your order</h3>
              <p>Give your name and phone number, or message us on WhatsApp.</p>
            </div>
            <div className="step">
              <h3>We call you</h3>
              <p>We confirm the price and arrange pickup or delivery. You pay when you receive.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div><h2>Why farmers buy from us</h2></div>
          </div>
          <div className="perks">
            <div className="perk"><div className="icon"><HealthIcon aria-hidden /></div><h3>Healthy stock</h3><p>Animals are checked and well fed before they leave the farm.</p></div>
            <div className="perk"><div className="icon"><BreedIcon aria-hidden /></div><h3>Good breeds</h3><p>Strong breeding rabbits and animals that grow well.</p></div>
            <div className="perk"><div className="icon"><HandshakeIcon aria-hidden /></div><h3>Honest prices</h3><p>The price you see is the price you pay.</p></div>
            <div className="perk"><div className="icon"><AdviceIcon aria-hidden /></div><h3>Advice included</h3><p>We help you with feeding and housing after you buy.</p></div>
          </div>
        </div>
      </section>

      <section className="section" id="contact">
        <div className="wrap">
          <div className="cta">
            <div>
              <h2>Want to visit or ask a question?</h2>
              <p>Call {SITE.phone} or message us. We are in {SITE.location}.</p>
            </div>
            <div className="hero-actions">
              <a className="btn btn-wa" href={whatsappLink(`Hello ${SITE.name}!`)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon aria-hidden /> WhatsApp</a>
              <a className="btn" href={`tel:${SITE.phone.replace(/\s/g, '')}`}><PhoneIcon aria-hidden /> Call us</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
