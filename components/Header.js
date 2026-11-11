import Link from 'next/link';
import { SITE } from '@/lib/site';
import { CatIcon } from '@/components/Icons';

export default function Header() {
  return (
    <header className="header">
      <div className="wrap">
        <Link href="/" className="logo">
          <span className="logo-mark"><CatIcon slug="rabbits" /></span>
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
