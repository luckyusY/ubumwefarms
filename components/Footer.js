import Link from 'next/link';
import { SITE, CATEGORIES, whatsappLink } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div>
          <div className="logo">
            <span className="logo-mark" aria-hidden>🐇</span>
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
                <Link href={`/animals?category=${c.slug}`}>{c.icon} {c.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Contact</h3>
          <ul>
            <li><a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>📞 {SITE.phone}</a></li>
            <li>
              <a href={whatsappLink(`Hello ${SITE.name}!`)} target="_blank" rel="noopener noreferrer">💬 WhatsApp us</a>
            </li>
            <li>📍 {SITE.location}</li>
            <li><Link href="/admin">Farm login</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
