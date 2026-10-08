'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { GoogleAuthButton } from '@/components/auth/GoogleAuthButton';
import { toast } from 'sonner';

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const redirectTarget = searchParams.get('redirect') || searchParams.get('next') || '/dashboard';

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setIsLoading(true);

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')) {
      const res = await fetch('/api/auth/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, full_name: form.name }),
      });
      if (res.ok) {
        toast.success('Account created in preview mode! Redirecting…');
        router.push(redirectTarget);
        router.refresh();
        setIsLoading(false);
        return;
      }
    }

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: { full_name: form.name } },
    });
    if (error) {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')) {
        const res = await fetch('/api/auth/demo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: form.email, full_name: form.name }),
        });
        if (res.ok) {
          toast.success('Account created in preview mode! Redirecting…');
          router.push(redirectTarget);
          router.refresh();
          setIsLoading(false);
          return;
        }
      }
      toast.error(error.message);
    } else {
      toast.success('Account created! Redirecting…');
      router.push(redirectTarget);
      router.refresh();
    }
    setIsLoading(false);
  }

  return (
    <Card className="shadow-sm border-border/80">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl">Create your account</CardTitle>
        <CardDescription>Get started with 1 free AI-powered idea validation</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <GoogleAuthButton label="Sign up with Google" disabled={isLoading} />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-muted" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground font-medium">Or continue with email</span>
          </div>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={form.name}
              onChange={update('name')}
              required
              placeholder="Rahul Sharma"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={update('email')}
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
              value={form.password}
              onChange={update('password')}
              required
              placeholder="Min. 6 characters"
              disabled={isLoading}
            />
          </div>
          <Button type="submit" className="w-full font-medium" disabled={isLoading}>
            {isLoading ? 'Creating account…' : 'Create account with Email'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-sm text-center text-muted-foreground justify-center">
        Already have an account?&nbsp;<Link href="/login" className="underline hover:text-foreground">Sign in</Link>
      </CardFooter>
    </Card>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm text-muted-foreground">Loading sign up…</div>}>
      <SignupForm />
    </Suspense>
  );
}
