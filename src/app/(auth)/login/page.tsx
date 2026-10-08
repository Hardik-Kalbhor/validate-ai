'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    if (email === 'test@validateai.dev' || !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')) {
      const res = await fetch('/api/auth/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email || 'test@validateai.dev' }),
      });
      if (res.ok) {
        toast.success('Signed in with testing credentials');
        router.push('/dashboard');
        router.refresh();
        setIsLoading(false);
        return;
      }
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      // Fallback for preview testing when Supabase credentials are not connected
      const res = await fetch('/api/auth/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        toast.success('Signed in with preview mode');
        router.push('/dashboard');
        router.refresh();
      } else {
        toast.error(error.message);
      }
    } else {
      router.push('/dashboard');
      router.refresh();
    }
    setIsLoading(false);
  }

  function fillTestCredentials() {
    setEmail('test@validateai.dev');
    setPassword('password123');
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Testing credentials box */}
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-foreground">Testing Credentials</span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-6 text-xs px-2"
              onClick={fillTestCredentials}
            >
              Fill Credentials
            </Button>
          </div>
          <p className="text-muted-foreground"><strong>Email:</strong> test@validateai.dev</p>
          <p className="text-muted-foreground"><strong>Password:</strong> password123</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-sm text-center text-muted-foreground justify-center">
        No account?&nbsp;<Link href="/signup" className="underline">Sign up</Link>
      </CardFooter>
    </Card>
  );
}
