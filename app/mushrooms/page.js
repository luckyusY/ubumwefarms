import Link from 'next/link';
import { getAnimals } from '@/lib/data';
import { SITE, formatPrice, whatsappLink, img } from '@/lib/site';
import { CatIcon, WhatsAppIcon, PhoneIcon, CheckIcon, ArrowIcon, LeafIcon } from '@/components/Icons';
import { Sprig } from '@/components/Art';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Fresh oyster mushrooms',
  description:
    'Fresh oyster mushrooms grown at Ubumwe Farms in Rwanda: 3,000 RWF per kg. Nutrition, storage tips, simple recipes and how to order.',
};

const PRICE = 3000;

// Approximate values for raw oyster mushrooms (USDA FoodData Central).
const NUTRITION = [
  ['Energy', '33 kcal'],
  ['Protein', '3.3 g'],
  ['Fibre', '2.3 g'],
  ['Fat', '0.4 g'],
  ['Potassium', '420 mg'],
  ['Niacin (vitamin B3)', '5 mg'],
];

const BENEFITS = [
  ['Light and filling', 'Low in calories and fat, with fibre that keeps you full.'],
  ['Plant protein', 'Adds protein to meals with beans, rice or vegetables.'],
  ['B vitamins', 'A natural source of niacin and riboflavin, which help the body use energy.'],
  ['Minerals', 'Rich in potassium, with some iron and zinc.'],
];

const GROWING = [
  ['Prepare', 'We fill clean bags with pasteurised growing material and mix in mushroom seed (spawn).'],
  ['Rest', 'The bags rest in a warm, dark room while white roots (mycelium) grow through them.'],
  ['Fruit', 'We move the bags to our cool, humid grow room. Clusters of mushrooms appear within days.'],
  ['Harvest', 'We pick by hand when the caps open and sell them fresh, not stored for weeks.'],
];

const STORAGE = [
  'Keep them in the fridge in a paper bag or an open bowl, not a closed plastic bag.',
  'Do not wash them until you are ready to cook. Wipe or rinse quickly, then dry.',
  'Best eaten within 3 to 5 days. Fresh mushrooms are firm and smell mild.',
  'For long keeping, slice and dry them in the sun, then store in a dry jar.',
];

const RECIPES = [
  {
    title: 'Mushroom sauce for rice or ugali',
    time: '20 min',
    items: ['500 g mushrooms', '1 onion', '2 tomatoes', '2 cloves garlic', 'Oil, salt, pepper'],
    steps: [
      'Tear the mushrooms into strips by hand.',
      'Fry the onion and garlic in oil until soft.',
      'Add the mushrooms and cook until their water dries up and they turn golden.',
      'Add chopped tomatoes and salt, then simmer for 5 minutes.',
    ],
  },
  {
    title: 'Mushroom soup',
    time: '25 min',
    items: ['500 g mushrooms', '1 onion', '1 carrot', '2 potatoes', 'Water or stock'],
    steps: [
      'Fry the onion, then add the diced carrot and potatoes.',
      'Add the mushrooms and cover with water or stock.',
      'Simmer for 15 minutes until the potatoes are soft.',
      'Season, then mash a little for a thicker soup.',
    ],
  },
  {
    title: 'Fried mushrooms with eggs',
    time: '10 min',
    items: ['250 g mushrooms', '3 eggs', '1 small onion', 'Oil and salt'],
    steps: [
      'Fry the mushrooms in a hot pan until golden.',
      'Add the onion and cook for 2 minutes.',
      'Pour in the beaten eggs and stir until set.',
      'Serve with bread, chapati or rice.',
    ],
  },
];

const FAQ = [
  ['How much do they cost?', `${formatPrice(PRICE)} per kilogram. Tell us how many kilos you need when you order.`],
  ['Which mushrooms do you grow?', 'Oyster mushrooms: a mild, tender mushroom that is easy to cook and popular across East Africa.'],
  ['How fresh are they?', 'We pick to order, so you get mushrooms harvested close to the day you receive them.'],
  ['Can I order a large amount?', 'Yes. Restaurants, hotels, shops and event caterers can call or WhatsApp us to agree a regular supply.'],
  ['Do you deliver?', 'We arrange pickup or delivery when we call you to confirm your order. You pay when you receive.'],
  ['Are they safe to eat?', 'Yes. They are grown on our farm, not picked in the wild. Always cook mushrooms before eating.'],
];

export default async function MushroomsPage() {
  const { animals } = await getAnimals({ category: 'mushrooms', limit: 1 });
  const listing = animals[0];
  const orderHref = listing ? `/animals/${listing._id}` : '/animals?category=mushrooms';
  const photos = listing?.images || [];
  const wa = whatsappLink(`Hello ${SITE.name}, I would like to order fresh mushrooms. How many kilos are available?`);

  return (
    <>
      <section className="m-hero">
        <div className="wrap m-hero-grid">
          <div>
            <span className="eyebrow rise"><CatIcon slug="mushrooms" /> Grown on our farm</span>
            <h1 className="rise d1">Fresh <em>oyster mushrooms</em>, picked for you.</h1>
            <p className="lead rise d2">
              Tender, tasty and good for you. We grow oyster mushrooms in our own grow room and harvest them
              fresh for homes, restaurants and shops.
            </p>
            <div className="m-price rise d2">
              {formatPrice(PRICE)} <small>per kg</small>
            </div>
            <div className="hero-actions rise d3">
              <Link href={orderHref} className="btn btn-carrot">Order mushrooms <ArrowIcon aria-hidden /></Link>
              <a href={wa} className="btn btn-wa" target="_blank" rel="noopener noreferrer"><WhatsAppIcon aria-hidden /> WhatsApp</a>
            </div>
          </div>
          {photos.length > 0 && (
            <div className="m-collage rise d2">
              <Sprig className="art m-sprig" />
              {photos.slice(0, 3).map((src, i) => (
                <figure key={src} className={`m-photo p${i + 1}`}>
                  <img src={img(src, i === 0 ? 700 : 420)} alt={i === 0 ? 'Fresh oyster mushrooms from Ubumwe Farms' : ''} />
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="m-facts">
        <div className="wrap">
          {[
            ['Oyster mushrooms', <CatIcon key="i" slug="mushrooms" />],
            ['Picked to order', <LeafIcon key="i" aria-hidden />],
            ['Pickup or delivery', <ArrowIcon key="i" aria-hidden />],
            ['Pay when you receive', <CheckIcon key="i" aria-hidden />],
          ].map(([text, icon]) => (
            <span key={text}>{icon} {text}</span>
          ))}
        </div>
      </div>

      <section className="section">
        <div className="wrap m-split">
          <div>
            <h2>What are oyster mushrooms?</h2>
            <p>
              Oyster mushrooms are named for their fan shape, like an oyster shell. They have a soft texture and a
              mild, slightly sweet taste that soaks up the flavour of onions, tomatoes and spices.
            </p>
            <p>
              They cook in minutes and can replace or stretch meat in many dishes: sauces, soups, stews and
              stir-fries. They are one of the most grown mushrooms in Rwanda and the region.
            </p>
          </div>
          <div className="m-card">
            <h3>Nutrition</h3>
            <p className="meta">Per 100 g of raw mushrooms, approximately</p>
            <table className="nutri">
              <tbody>
                {NUTRITION.map(([k, v]) => (
                  <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>
                ))}
              </tbody>
            </table>
            <p className="meta small">Source: USDA FoodData Central. Values vary between harvests.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <h2>Why add mushrooms to your meals</h2>
              <p>Simple food that is good for the whole family.</p>
            </div>
          </div>
          <div className="perks">
            {BENEFITS.map(([title, text]) => (
              <div className="perk" key={title}>
                <div className="icon"><CatIcon slug="mushrooms" /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="wrap">
          <div className="section-head">
            <div>
              <h2>How we grow them</h2>
              <p>From clean bags to your kitchen in four steps.</p>
            </div>
          </div>
          <div className="steps steps-4">
            {GROWING.map(([title, text]) => (
              <div className="step" key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap m-split reverse">
          {photos[1] && (
            <figure className="m-feature">
              <img src={img(photos[1], 700)} alt="Oyster mushrooms growing in the Ubumwe Farms grow room" loading="lazy" />
            </figure>
          )}
          <div>
            <h2>Keep them fresh</h2>
            <ul className="checks">
              {STORAGE.map((t) => (
                <li key={t}><CheckIcon aria-hidden /> {t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <h2>Easy mushroom recipes</h2>
              <p>Ready in minutes with ingredients from any market.</p>
            </div>
          </div>
          <div className="recipes">
            {RECIPES.map((r) => (
              <article className="recipe" key={r.title}>
                <span className="recipe-time">{r.time}</span>
                <h3>{r.title}</h3>
                <h4>You need</h4>
                <ul>{r.items.map((i) => <li key={i}>{i}</li>)}</ul>
                <h4>Steps</h4>
                <ol>{r.steps.map((s) => <li key={s}>{s}</li>)}</ol>
              </article>
            ))}
          </div>
          <p className="meta tip">
            <b>Tip:</b> tear oyster mushrooms by hand instead of cutting, and cook them in a hot pan without
            crowding so they turn golden instead of watery.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="cta m-business">
            <div>
              <h2>For restaurants, hotels and shops</h2>
              <p>Need mushrooms every week? We can agree a regular supply, the amount and the delivery day.</p>
            </div>
            <div className="hero-actions">
              <a className="btn btn-wa" href={whatsappLink(`Hello ${SITE.name}, I would like a regular supply of mushrooms for my business.`)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon aria-hidden /> WhatsApp
              </a>
              <a className="btn" href={`tel:${SITE.phone.replace(/\s/g, '')}`}><PhoneIcon aria-hidden /> Call us</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap faq-wrap">
          <h2>Questions people ask</h2>
          <div className="faq">
            {FAQ.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
          <div className="hero-actions center">
            <Link href={orderHref} className="btn btn-carrot">Order fresh mushrooms <ArrowIcon aria-hidden /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
