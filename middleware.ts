import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  
  // Redirect .vercel.app to the custom domain in production
  if (
    process.env.VERCEL_ENV === 'production' && 
    hostname.endsWith('.vercel.app')
  ) {
    return NextResponse.redirect(`https://ilyankhan.tech${request.nextUrl.pathname}`, 301);
  }

  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');

  if (isAdminRoute) {
    if (request.nextUrl.pathname === '/admin/login') {
      const token = request.cookies.get('admin_token')?.value;
      if (token === 'authenticated') {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.next();
    }
    const token = request.cookies.get('admin_token')?.value;

    if (token !== 'authenticated') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Run on all paths so the redirect works everywhere, but optimize by ignoring static files
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
