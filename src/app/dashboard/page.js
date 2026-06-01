import { redirect } from 'next/navigation';
import { getUser } from '@/lib/getUser';
import DashboardClient from './DashboardClient';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  // Retrieve user session server-side
  const user = await getUser();

  // Redirect to login if user session is invalid/expired
  if (!user) {
    redirect('/login');
  }

  // Serialize Mongoose model document to plain JavaScript object for safety
  const plainUser = {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
  };

  return <DashboardClient user={plainUser} />;
}
