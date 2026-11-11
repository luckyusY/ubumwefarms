'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login({ passwordSet }) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    setBusy(false);
    if (res.ok) router.refresh();
    else setError('Wrong password. Try again.');
  }

  return (
    <form className="panel login" onSubmit={submit}>
      <h2>Farm login</h2>
      <p>Only for Ubumwe Farms staff.</p>
      {!passwordSet && (
        <p className="error">ADMIN_PASSWORD is not set on the server yet, so nobody can log in.</p>
      )}
      <div className="field">
        <label htmlFor="pw">Password</label>
        <input id="pw" type="password" required autoFocus value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      {error && <p className="error" role="alert">{error}</p>}
      <button className="btn btn-forest btn-block" disabled={busy}>{busy ? 'Checking…' : 'Log in'}</button>
    </form>
  );
}
