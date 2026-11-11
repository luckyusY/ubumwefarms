import { isAdmin } from '@/lib/auth';
import { dbConfigured } from '@/lib/db';
import Login from '@/components/admin/Login';
import Dashboard from '@/components/admin/Dashboard';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Farm admin', robots: { index: false } };

export default async function AdminPage() {
  const ok = await isAdmin();
  return (
    <div className="wrap admin">
      {ok ? <Dashboard dbReady={dbConfigured()} /> : <Login passwordSet={Boolean(process.env.ADMIN_PASSWORD)} />}
    </div>
  );
}
