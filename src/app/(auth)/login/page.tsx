'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { GoogleAuthButton } from '@/components/auth/GoogleAuthButton';
import { toast } from 'sonner';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirectTarget = searchParams.get('redirect') || searchParams.get('next') || '/dashboard';
  const errorParam = searchParams.get('error');

  useEffect(() => {
    if (errorParam) {
      toast.error(decodeURIComponent(errorParam));
    }
  }, [errorParam]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      // Offline fallback only when Supabase is not configured (e.g. offline local dev)
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')) {
        const res = await fetch('/api/auth/demo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        if (res.ok) {
          toast.success('Signed in with preview mode');
          router.push(redirectTarget);
          router.refresh();
          setIsLoading(false);
          return;
        }
      }
      toast.error(error.message);
    } else {
      toast.success('Signed in successfully');
      router.push(redirectTarget);
      router.refresh();
    }
    setIsLoading(false);
  }

  return (
    <Card className="shadow-sm border-border/80">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl">Welcome back</CardTitle>
        <CardDescription>Sign in to your account to continue</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <GoogleAuthButton label="Continue with Google" disabled={isLoading} />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-muted" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground font-medium">Or continue with email</span>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>
          <Button type="submit" className="w-full font-medium" disabled={isLoading}>
            {isLoading ? 'Signing in…' : 'Sign in with Email'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-sm text-center text-muted-foreground justify-center">
        No account?&nbsp;<Link href="/signup" className="underline hover:text-foreground">Sign up</Link>
      </CardFooter>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm text-muted-foreground">Loading sign in…</div>}>
      <LoginForm />
    </Suspense>
  );
}
