import { NextResponse } from 'next/server';

export function middleware(request) {
  const isAdmin = request.cookies.get('isAdmin')?.value === 'true';

  const adminPaths = ['/admin', '/dashboard/admin'];

  if (adminPaths.some(path => request.nextUrl.pathname.startsWith(path)) && !isAdmin) {
    return NextResponse.redirect(new URL('/not-authorized', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/admin/:path*'],
};