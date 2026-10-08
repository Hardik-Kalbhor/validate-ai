import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/', '/login', '/signup', '/api/health', '/api/contact'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths and api/health / api/contact
  if (
    PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith('/api/health') || pathname.startsWith('/api/contact')) ||
    pathname.startsWith('/auth/callback') ||
    pathname.startsWith('/api/auth/demo') ||
    pathname.startsWith('/api/auth/logout') ||
    pathname.startsWith('/api/pending-run')
  ) {
    return NextResponse.next();
  }

  // Allow demo user in preview / dev testing mode
  const demoCookie = request.cookies.get('validateai_demo_user');
  if (demoCookie?.value) {
    return NextResponse.next();
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
