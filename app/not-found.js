import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="notice">
          <div className="big" aria-hidden>🐇</div>
          <h3>This one hopped away</h3>
          <p>The page or animal you are looking for is no longer here.</p>
          <Link href="/animals" className="btn btn-carrot">See available animals</Link>
        </div>
      </div>
    </section>
  );
}
