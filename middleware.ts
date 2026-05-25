import { updateSession } from '@/lib/supabase/middleware';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { user, response } = await updateSession(request);
  const isLoggedIn = !!user;
  const pathname = request.nextUrl.pathname;
  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/login';

  // Membership & account features are hidden for now. Redirect all of these
  // public account routes to the homepage. (Pages/components remain in the repo
  // so memberships can be re-enabled by removing this block + matcher entries.)
  if (pathname.startsWith('/membership') || pathname.startsWith('/account')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (isAdminRoute && !isLoggedIn) {
    const url = new URL('/login', request.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/login', '/membership/:path*', '/account/:path*'],
};
