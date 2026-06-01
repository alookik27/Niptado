import { cookies } from 'next/headers';
import { verifyToken } from './auth';
import connectDB from './mongodb';
import User from '@/models/User';

/**
 * Retrieve the current authenticated user from cookies.
 * Works inside Next.js API route handlers, Server Components, and Server Actions.
 * 
 * @returns {Promise<object|null>} The user document (excluding password) or null
 */
export async function getUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return null;
    }

    const decoded = verifyToken(token);
    if (!decoded || !decoded.userId) {
      return null;
    }

    await connectDB();
    const user = await User.findById(decoded.userId).select('-password');
    
    return user;
  } catch (error) {
    console.error('Error retrieving user from session:', error);
    return null;
  }
}
