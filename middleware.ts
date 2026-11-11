import { updateSession } from '@/lib/supabase/middleware';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Supabase falls back to the Site URL (the homepage) when an email link's redirect
  // isn't on its allow list. Forward those auth codes to the callback that handles them.
  const code = request.nextUrl.searchParams.get('code');
  if (request.nextUrl.pathname === '/' && code) {
    const url = new URL('/auth/callback', request.url);
    url.searchParams.set('code', code);
    return NextResponse.redirect(url);
  }

  const { user, response } = await updateSession(request);
  const isLoggedIn = !!user;
  const pathname = request.nextUrl.pathname;
  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/login';

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
  matcher: ['/', '/admin/:path*', '/login', '/membership/:path*', '/account/:path*'],
};
