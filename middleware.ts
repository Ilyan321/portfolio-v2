import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');

  if (isAdminRoute) {
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }
    const token = request.cookies.get('admin_token')?.value;

    // Simple check: In production, we'd verify a JWT. Here we just check for a secret string.
    if (token !== 'authenticated') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
