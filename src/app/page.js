import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from '@/lib/auth';
import LandingPageClient from './LandingPageClient';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  // Verify the JWT token
  const decoded = token ? verifyToken(token) : null;

  if (decoded && decoded.userId) {
    redirect('/dashboard');
  }

  return <LandingPageClient />;
}
