'use client';
import { useState } from 'react';
import { CATEGORIES, img } from '@/lib/site';

const EMPTY = {
  name: '', category: 'rabbits', breed: '', age: '', sex: '', weight: '',
  price: '', unit: 'each', quantity: 1, description: '', images: [], featured: false, available: true,
};

async function uploadPhoto(file) {
  const signRes = await fetch('/api/upload', { method: 'POST' });
  const sign = await signRes.json();
  if (!signRes.ok) throw new Error(sign.error || 'Could not start upload');
  const body = new FormData();
  body.append('file', file);
  body.append('api_key', sign.apiKey);
  body.append('timestamp', sign.timestamp);
  body.append('folder', sign.folder);
  body.append('signature', sign.signature);
  const res = await fetch(sign.url, { method: 'POST', body });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || 'Photo upload failed');
  return data.secure_url;
}

export default function AnimalForm({ animal, onCancel, onSaved }) {
  const isNew = !animal._id;
  const [form, setForm] = useState({ ...EMPTY, ...animal });
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const set = (k) => (e) =>
    setForm({ ...form, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  async function addPhotos(e) {
    const files = [...e.target.files];
    e.target.value = '';
    if (!files.length) return;
    setUploading(true);
    setError('');
    try {
      const urls = [];
      for (const f of files) urls.push(await uploadPhoto(f));
      setForm((f) => ({ ...f, images: [...f.images, ...urls] }));
    } catch (err) {
      setError(err.message);
    }
    setUploading(false);
  }

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await fetch(isNew ? '/api/animals' : `/api/animals/${animal._id}`, {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, price: Number(form.price), quantity: Number(form.quantity) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not save');
      onSaved();
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <form className="panel" onSubmit={submit} style={{ maxWidth: 720, margin: '0 auto' }}>
      <h2>{isNew ? 'Add an animal' : `Edit ${animal.name}`}</h2>
      <p>Only the name, type and price are required.</p>

      <div className="field">
        <span className="label">Photos</span>
        <div className="uploads">
          {form.images.map((src) => (
            <div className="upload" key={src}>
              <img src={img(src, 200)} alt="" />
              <button
                type="button"
                aria-label="Remove photo"
                onClick={() => setForm({ ...form, images: form.images.filter((s) => s !== src) })}
              >
                ×
              </button>
            </div>
          ))}
          <label className="add-photo">
            {uploading ? 'Uploading…' : '+ Add photo'}
            <input type="file" accept="image/*" multiple onChange={addPhotos} disabled={uploading} />
          </label>
        </div>
      </div>

      <div className="row2">
        <div className="field">
          <label htmlFor="a-name">Name</label>
          <input id="a-name" type="text" required placeholder="Breeding rabbit, white" value={form.name} onChange={set('name')} />
        </div>
        <div className="field">
          <label htmlFor="a-cat">Type</label>
          <select id="a-cat" value={form.category} onChange={set('category')}>
            {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.label}</option>)}
          </select>
        </div>
      </div>

      <div className="row3">
        <div className="field">
          <label htmlFor="a-price">Price (RWF)</label>
          <input id="a-price" type="number" min="0" required inputMode="numeric" value={form.price} onChange={set('price')} />
        </div>
        <div className="field">
          <label htmlFor="a-unit">Price is for</label>
          <select id="a-unit" value={form.unit} onChange={set('unit')}>
            <option value="each">One (each)</option>
            <option value="kg">1 kg</option>
            <option value="tray">1 tray</option>
            <option value="pair">1 pair</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="a-qty">How many in stock</label>
          <input id="a-qty" type="number" min="0" inputMode="numeric" value={form.quantity} onChange={set('quantity')} />
        </div>
      </div>

      <div className="row3">
        <div className="field">
          <label htmlFor="a-breed">Breed</label>
          <input id="a-breed" type="text" value={form.breed} onChange={set('breed')} />
        </div>
        <div className="field">
          <label htmlFor="a-age">Age</label>
          <input id="a-age" type="text" placeholder="3 months" value={form.age} onChange={set('age')} />
        </div>
        <div className="field">
          <label htmlFor="a-sex">Sex</label>
          <select id="a-sex" value={form.sex} onChange={set('sex')}>
            <option value="">Not set</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="mixed">Mixed</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="a-weight">Weight</label>
        <input id="a-weight" type="text" placeholder="2.5 kg" value={form.weight} onChange={set('weight')} />
      </div>

      <div className="field">
        <label htmlFor="a-desc">Description</label>
        <textarea id="a-desc" value={form.description} onChange={set('description')} />
      </div>

      <div className="field">
        <label className="check">
          <input type="checkbox" checked={form.available} onChange={set('available')} /> Show on the website
        </label>
        <label className="check">
          <input type="checkbox" checked={form.featured} onChange={set('featured')} /> Feature at the top
        </label>
      </div>

      {error && <p className="error" role="alert">{error}</p>}

      <div className="hero-actions">
        <button className="btn btn-carrot" disabled={busy || uploading}>{busy ? 'Saving…' : 'Save animal'}</button>
        <button type="button" className="btn btn-plain" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
