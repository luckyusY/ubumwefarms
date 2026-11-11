import Link from 'next/link';
import { SITE } from '@/lib/site';

export default function Header() {
  return (
    <header className="header">
      <div className="wrap">
        <Link href="/" className="logo">
          <span className="logo-mark" aria-hidden>🐇</span>
          {SITE.name}
        </Link>
        <nav className="nav">
          <Link href="/animals?category=rabbits" className="link hide-sm">Rabbits</Link>
          <Link href="/animals" className="link hide-sm">All animals</Link>
          <Link href="/#contact" className="link hide-sm">Contact</Link>
          <Link href="/animals" className="btn btn-carrot btn-small">Buy now</Link>
        </nav>
      </div>
    </header>
  );
}
