'use client';
import { useState } from 'react';
import { SITE, formatPrice, whatsappLink, unitLabel } from '@/lib/site';
import { WhatsAppIcon, CheckIcon } from '@/components/Icons';

export default function OrderForm({ animal }) {
  const [form, setForm] = useState({ customerName: '', phone: '', location: '', quantity: 1, message: '' });
  const [state, setState] = useState('idle'); // idle | sending | done
  const [error, setError] = useState('');
  const soldOut = animal.quantity <= 0;
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const qty = Math.max(1, parseInt(form.quantity, 10) || 1);
  const byUnit = animal.unit && animal.unit !== 'each';
  const amount = byUnit ? `${qty} ${animal.unit}` : `${qty} x`;

  const waText = `Hello ${SITE.name}, I want to buy ${amount} ${animal.name} (${formatPrice(animal.price)} ${unitLabel(animal.unit)}).${
    form.customerName ? ` My name is ${form.customerName}.` : ''
  }`;

  async function submit(e) {
    e.preventDefault();
    setError('');
    setState('sending');
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, quantity: qty, animal: animal._id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setState('done');
    } catch (err) {
      setError(err.message);
      setState('idle');
    }
  }

  if (state === 'done') {
    return (
      <div className="panel success" role="status">
        <div className="big ok"><CheckIcon aria-hidden /></div>
        <h2>Order received!</h2>
        <p>Thank you, {form.customerName}. We will call you on {form.phone} soon.</p>
        <a className="btn btn-wa" href={whatsappLink(waText)} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon aria-hidden /> Also message us on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form className="panel" onSubmit={submit}>
      <h2>{soldOut ? 'Ask about the next batch' : 'Order now'}</h2>
      <p>No payment now. We call you to confirm.</p>

      <div className="field">
        <label htmlFor="o-name">Your name</label>
        <input id="o-name" type="text" required autoComplete="name" value={form.customerName} onChange={set('customerName')} />
      </div>
      <div className="row2">
        <div className="field">
          <label htmlFor="o-phone">Phone number</label>
          <input id="o-phone" type="tel" required autoComplete="tel" placeholder="07..." value={form.phone} onChange={set('phone')} />
        </div>
        <div className="field">
          <label htmlFor="o-qty">{byUnit ? `How many ${animal.unit}?` : 'How many?'}</label>
          <input id="o-qty" type="number" min="1" inputMode="numeric" value={form.quantity} onChange={set('quantity')} />
        </div>
      </div>
      <div className="field">
        <label htmlFor="o-loc">Where are you? (optional)</label>
        <input id="o-loc" type="text" placeholder="District / sector" value={form.location} onChange={set('location')} />
      </div>
      <div className="field">
        <label htmlFor="o-msg">Message (optional)</label>
        <textarea id="o-msg" value={form.message} onChange={set('message')} />
      </div>

      {!soldOut && (
        <p className="meta" style={{ margin: '0 0 12px' }}>
          Total: <b>{formatPrice(animal.price * qty)}</b>
        </p>
      )}
      {error && <p className="error" role="alert">{error}</p>}

      <button className="btn btn-carrot btn-block" disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending…' : 'Send my order'}
      </button>
      <div className="or">or</div>
      <a className="btn btn-wa btn-block" href={whatsappLink(waText)} target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon aria-hidden /> Order on WhatsApp
      </a>
    </form>
  );
}
