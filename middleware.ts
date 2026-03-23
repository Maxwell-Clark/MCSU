import { updateSession } from '@/lib/supabase/middleware';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { user, response } = await updateSession(request);
  const isLoggedIn = !!user;
  const pathname = request.nextUrl.pathname;
  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/login';
  const isAccountRoute = pathname.startsWith('/account');
  const isMemberProtected =
    pathname === '/membership/payment' || pathname === '/membership/dashboard';

  if (isAdminRoute && !isLoggedIn) {
    const url = new URL('/login', request.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if ((isMemberProtected || isAccountRoute) && !isLoggedIn) {
    const url = new URL('/login', request.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/login', '/membership/payment', '/membership/dashboard', '/account/:path*'],
};
