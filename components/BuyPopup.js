'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SITE, whatsappLink } from '@/lib/site';
import { FARM_PHOTOS, farmPhoto } from '@/lib/photos';
import { WhatsAppIcon, CheckIcon, PhoneIcon } from '@/components/Icons';
import { Carrot } from '@/components/Art';

const KEY = 'uf_popup_seen';
const DELAY_MS = 12000;

function alreadySeen() {
  try { return sessionStorage.getItem(KEY) === '1'; } catch { return false; }
}
function markSeen() {
  try { sessionStorage.setItem(KEY, '1'); } catch {}
}

// Shown once per visit: after a short while, or when the visitor has scrolled half the page.
export default function BuyPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ customerName: '', phone: '' });
  const [state, setState] = useState('idle'); // idle | sending | done
  const [error, setError] = useState('');
  const closeRef = useRef(null);
  const blocked = pathname.startsWith('/admin');

  useEffect(() => {
    if (blocked || alreadySeen()) return;
    const show = () => {
      // Do not interrupt someone who is already typing in the order form.
      const el = document.activeElement;
      if (el && ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName)) return;
      markSeen();
      setOpen(true);
      cleanup();
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 400 && window.scrollY / max > 0.5) show();
    };
    const timer = setTimeout(show, DELAY_MS);
    window.addEventListener('scroll', onScroll, { passive: true });
    function cleanup() {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    }
    return cleanup;
  }, [blocked]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (!open || blocked) return null;

  async function submit(e) {
    e.preventDefault();
    setError('');
    setState('sending');
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, message: 'Call-back request from the website popup' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setState('done');
    } catch (err) {
      setError(err.message);
      setState('idle');
    }
  }

  const photo = FARM_PHOTOS[0];
  const wa = whatsappLink(`Hello ${SITE.name}, I would like to buy rabbits. What do you have available?`);

  return (
    <div className="popup-backdrop" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
      <div className="popup" role="dialog" aria-modal="true" aria-labelledby="popup-title">
        <button ref={closeRef} className="popup-close" onClick={() => setOpen(false)} aria-label="Close">×</button>
        <div className="popup-photo">
          <img src={farmPhoto(photo, 520, 680)} alt={photo.alt} />
          <span className="popup-sticker">Raised on our farm</span>
        </div>
        <div className="popup-body">
          <Carrot className="art popup-carrot" />
          {state === 'done' ? (
            <div className="success" role="status">
              <div className="big ok"><CheckIcon aria-hidden /></div>
              <h2 id="popup-title">Thank you, {form.customerName}!</h2>
              <p>We will call you on {form.phone} soon.</p>
              <Link href="/animals?category=rabbits" className="btn btn-carrot btn-block" onClick={() => setOpen(false)}>
                See our rabbits
              </Link>
            </div>
          ) : (
            <>
              <span className="eyebrow">Ready to start?</span>
              <h2 id="popup-title">Take home healthy rabbits</h2>
              <p>Leave your number and we call you with what is available and the prices. You pay when you receive.</p>
              <form onSubmit={submit}>
                <input type="text" required placeholder="Your name" aria-label="Your name" autoComplete="name"
                  value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} />
                <input type="tel" required placeholder="Phone number (07...)" aria-label="Phone number" autoComplete="tel"
                  value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                {error && <p className="error" role="alert">{error}</p>}
                <button className="btn btn-carrot btn-block" disabled={state === 'sending'}>
                  <PhoneIcon aria-hidden /> {state === 'sending' ? 'Sending…' : 'Call me back'}
                </button>
              </form>
              <a className="btn btn-wa btn-block" href={wa} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon aria-hidden /> Chat on WhatsApp
              </a>
              <button className="popup-later" onClick={() => setOpen(false)}>No thanks, I am just looking</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
