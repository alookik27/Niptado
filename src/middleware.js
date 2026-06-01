import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Edge-compatible JWT verifier using the Web Crypto API.
 * This is necessary because Next.js Middleware runs in the Edge Runtime
 * which does not support Node.js core libraries (like crypto or jsonwebtoken).
 */
async function verifyJWT(token, secret) {
  try {
    if (!token || !secret) return null;
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [headerB64, payloadB64, signatureB64] = parts;
    
    // Normalize Base64Url to Base64
    const base64Url = (str) => {
      let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
      while (base64.length % 4) {
        base64 += '=';
      }
      return base64;
    };

    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const key = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const message = encoder.encode(`${headerB64}.${payloadB64}`);
    
    const signatureBin = atob(base64Url(signatureB64));
    const signature = new Uint8Array(signatureBin.length);
    for (let i = 0; i < signatureBin.length; i++) {
      signature[i] = signatureBin.charCodeAt(i);
    }

    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      signature,
      message
    );

    if (!isValid) return null;

    const payload = JSON.parse(atob(base64Url(payloadB64)));
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return null;
    }

    return payload;
  } catch (err) {
    console.error('Middleware JWT verify error:', err);
    return null;
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  const decoded = await verifyJWT(token, JWT_SECRET);

  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register');
  const isProtectedRoute = pathname.startsWith('/dashboard');

  if (isProtectedRoute) {
    if (!decoded) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (isAuthRoute) {
    if (decoded) {
      const dashboardUrl = new URL('/dashboard', request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};
