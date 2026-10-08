'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface GoogleAuthButtonProps {
  label?: string;
  disabled?: boolean;
}

export function GoogleAuthButton({ label = 'Continue with Google', disabled }: GoogleAuthButtonProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  async function handleGoogleSignIn() {
    setIsLoading(true);

    try {
      // Offline fallback only when Supabase is not configured (e.g. offline preview mode)
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')) {
        const res = await fetch('/api/auth/demo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: 'google.founder@validateai.dev', full_name: 'Google Founder' }),
        });
        if (res.ok) {
          toast.success('Signed in with Google (Preview mode)');
          const redirectParam = searchParams.get('redirect') || searchParams.get('next') || '/dashboard';
          router.push(redirectParam);
          router.refresh();
          setIsLoading(false);
          return;
        }
      }

      const redirectParam = searchParams.get('redirect') || searchParams.get('next') || '/dashboard';
      const callbackUrl = new URL('/auth/callback', window.location.origin);
      callbackUrl.searchParams.set('next', redirectParam);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: callbackUrl.toString(),
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        toast.error(error.message);
        setIsLoading(false);
        return;
      }

      // In browser contexts, signInWithOAuth navigates automatically, but if a URL is provided we ensure navigation
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to initialize Google authentication';
      toast.error(message);
      setIsLoading(false);
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full flex items-center justify-center gap-2.5 font-medium border-border/80 hover:bg-accent/60 transition-colors"
      onClick={handleGoogleSignIn}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      ) : (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
      )}
      <span>{isLoading ? 'Connecting to Google…' : label}</span>
    </Button>
  );
}
