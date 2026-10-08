import { NextResponse } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';
  const errorDescription = searchParams.get('error_description') || searchParams.get('error');

  if (errorDescription) {
    console.error('OAuth callback error from provider:', errorDescription);
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(errorDescription)}`);
  }

  if (code) {
    const cookieStore = await cookies();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

    const cookiesToSetLater: { name: string; value: string; options: CookieOptions }[] = [];

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
              cookiesToSetLater.push({ name, value, options });
            });
          } catch {
            // Ignore if setting cookies fails in server context
          }
        },
      },
    });

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host');
      const isLocalEnv = process.env.NODE_ENV === 'development';
      const redirectUrl = isLocalEnv
        ? `${origin}${next}`
        : forwardedHost
        ? `https://${forwardedHost}${next}`
        : `${origin}${next}`;

      const response = NextResponse.redirect(redirectUrl);
      cookiesToSetLater.forEach(({ name, value, options }) => {
        response.cookies.set(name, value, options);
      });

      return response;
    }

    console.error('Failed to exchange OAuth code for session:', error.message);
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error.message)}`);
  }

  // If no code and no error provided, return user to login
  return NextResponse.redirect(`${origin}/login`);
}
