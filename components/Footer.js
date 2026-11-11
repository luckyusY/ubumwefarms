import Link from 'next/link';
import { SITE, CATEGORIES, whatsappLink } from '@/lib/site';
import { CatIcon, PhoneIcon, WhatsAppIcon, PinIcon } from '@/components/Icons';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div>
          <div className="logo">
            <span className="logo-mark"><CatIcon slug="rabbits" /></span>
            {SITE.name}
          </div>
          <p>{SITE.tagline}</p>
          <p>© {new Date().getFullYear()} {SITE.name}</p>
        </div>
        <div>
          <h3>Animals</h3>
          <ul>
            {CATEGORIES.slice(0, 5).map((c) => (
              <li key={c.slug}>
                <Link href={`/animals?category=${c.slug}`}><CatIcon slug={c.slug} /> {c.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Contact</h3>
          <ul>
            <li><a href={`tel:${SITE.phone.replace(/\s/g, '')}`}><PhoneIcon aria-hidden /> {SITE.phone}</a></li>
            <li>
              <a href={whatsappLink(`Hello ${SITE.name}!`)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon aria-hidden /> WhatsApp us</a>
            </li>
            <li><span><PinIcon aria-hidden /> {SITE.location}</span></li>
            <li><Link href="/admin">Farm login</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
