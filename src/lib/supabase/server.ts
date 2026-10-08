import { createServerClient as createSupabaseServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

/**
 * Server-side Supabase client — uses session cookies for auth context.
 * Use inside Server Components, Server Actions, and API Routes.
 */
export async function createServerClient() {
  const cookieStore = await cookies();

  const client = createSupabaseServerClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Can be ignored if called from a Server Component
          }
        },
      },
    }
  );

  const demoCookie = cookieStore.get('validateai_demo_user');
  if (demoCookie?.value) {
    try {
      const demoUser = JSON.parse(demoCookie.value);
      const originalAuth = client.auth;
      client.auth = {
        ...originalAuth,
        getUser: async () => ({
          data: {
            user: {
              id: demoUser.id || '00000000-0000-0000-0000-000000000001',
              email: demoUser.email || 'test@validateai.dev',
              user_metadata: { full_name: demoUser.full_name || 'Test Founder' },
              app_metadata: {},
              aud: 'authenticated',
              created_at: new Date().toISOString(),
            } as unknown as import('@supabase/supabase-js').User,
          },
          error: null,
        }),
      } as unknown as typeof client.auth;
    } catch {
      // ignore
    }
  }

  return client;
}
