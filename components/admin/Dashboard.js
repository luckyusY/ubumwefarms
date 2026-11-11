'use client';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AnimalForm from './AnimalForm';
import { categoryOf, formatPrice, img } from '@/lib/site';

async function api(url, options) {
  const res = await fetch(url, {
    ...options,
    headers: options?.body ? { 'Content-Type': 'application/json' } : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Something went wrong');
  return data;
}

const STATUS_LABEL = { new: 'New', contacted: 'Contacted', done: 'Done', cancelled: 'Cancelled' };

export default function Dashboard({ dbReady }) {
  const router = useRouter();
  const [tab, setTab] = useState('animals');
  const [animals, setAnimals] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editing, setEditing] = useState(null); // null | {} (new) | animal
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setError('');
    try {
      const [a, o] = await Promise.all([api('/api/animals?all=1'), api('/api/orders')]);
      setAnimals(a.animals);
      setOrders(o.orders);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function run(fn) {
    setError('');
    try {
      await fn();
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  const removeAnimal = (a) => {
    if (confirm(`Delete "${a.name}"? This cannot be undone.`)) {
      run(() => api(`/api/animals/${a._id}`, { method: 'DELETE' }));
    }
  };
  const toggle = (a) =>
    run(() => api(`/api/animals/${a._id}`, { method: 'PUT', body: JSON.stringify({ available: !a.available }) }));
  const setStatus = (o, status) =>
    run(() => api(`/api/orders/${o._id}`, { method: 'PATCH', body: JSON.stringify({ status }) }));
  const removeOrder = (o) => {
    if (confirm(`Delete the order from ${o.customerName}?`)) {
      run(() => api(`/api/orders/${o._id}`, { method: 'DELETE' }));
    }
  };

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.refresh();
  }

  const newOrders = orders.filter((o) => o.status === 'new').length;

  if (editing) {
    return (
      <AnimalForm
        animal={editing}
        onCancel={() => setEditing(null)}
        onSaved={() => { setEditing(null); load(); }}
      />
    );
  }

  return (
    <>
      <div className="admin-top">
        <h1>Farm admin</h1>
        <div className="hero-actions">
          <button className="btn btn-carrot" onClick={() => setEditing({})}>+ Add animal</button>
          <button className="btn btn-plain" onClick={logout}>Log out</button>
        </div>
      </div>

      {!dbReady && (
        <p className="error">
          The database is not connected yet. Set MONGODB_URI (with your Atlas cluster address) and redeploy.
        </p>
      )}
      {error && <p className="error" role="alert">{error}</p>}

      <div className="tabs">
        <button className={`chip ${tab === 'animals' ? 'on' : ''}`} onClick={() => setTab('animals')}>
          Animals ({animals.length})
        </button>
        <button className={`chip ${tab === 'orders' ? 'on' : ''}`} onClick={() => setTab('orders')}>
          Orders ({orders.length}){newOrders > 0 ? ` · ${newOrders} new` : ''}
        </button>
      </div>

      {loading && <p>Loading…</p>}

      {!loading && tab === 'animals' && (
        <div className="list">
          {animals.length === 0 && (
            <div className="notice">
              <h3>No animals yet</h3>
              <p>Add your first animal so customers can see it on the website.</p>
              <button className="btn btn-carrot" onClick={() => setEditing({})}>+ Add animal</button>
            </div>
          )}
          {animals.map((a) => (
            <div className="item" key={a._id}>
              <div className="pic">
                {a.images?.[0] ? <img src={img(a.images[0], 160)} alt="" /> : categoryOf(a.category).icon}
              </div>
              <div>
                <h3>{a.name}</h3>
                <div className="meta">
                  {formatPrice(a.price)} · {a.quantity} in stock ·{' '}
                  <span className={`badge ${a.available ? '' : 'off'}`}>{a.available ? 'On website' : 'Hidden'}</span>
                  {a.featured && <> <span className="badge">★ Featured</span></>}
                </div>
              </div>
              <div className="actions">
                <button className="btn btn-small" onClick={() => setEditing(a)}>Edit</button>
                <button className="btn btn-small btn-plain" onClick={() => toggle(a)}>{a.available ? 'Hide' : 'Show'}</button>
                <button className="btn btn-small btn-plain btn-danger" onClick={() => removeAnimal(a)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && tab === 'orders' && (
        <div className="list">
          {orders.length === 0 && (
            <div className="notice"><h3>No orders yet</h3><p>Customer orders will appear here.</p></div>
          )}
          {orders.map((o) => (
            <div className="item order" key={o._id}>
              <div>
                <h3>
                  {o.customerName} <span className={`badge ${o.status}`}>{STATUS_LABEL[o.status]}</span>
                </h3>
                <div className="meta">
                  Wants <b>{o.quantity} × {o.animalName || 'an animal'}</b>
                  {o.location ? ` · ${o.location}` : ''} · {new Date(o.createdAt).toLocaleString()}
                </div>
                {o.message && <div className="meta">“{o.message}”</div>}
              </div>
              <div className="actions">
                <a className="btn btn-small btn-forest" href={`tel:${o.phone}`}>📞 {o.phone}</a>
                <select
                  aria-label="Order status"
                  value={o.status}
                  onChange={(e) => setStatus(o, e.target.value)}
                  style={{ width: 'auto', minHeight: 40 }}
                >
                  {Object.entries(STATUS_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
                <button className="btn btn-small btn-plain btn-danger" onClick={() => removeOrder(o)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
