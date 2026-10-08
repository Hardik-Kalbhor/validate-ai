'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { GoogleAuthButton } from '@/components/auth/GoogleAuthButton';
import { toast } from 'sonner';

function LoginForm() {
  const searchParams = useSearchParams();
  const errorParam = searchParams.get('error');

  useEffect(() => {
    if (errorParam) {
      toast.error(decodeURIComponent(errorParam));
    }
  }, [errorParam]);

  return (
    <Card className="shadow-sm border-border/80">
      <CardHeader className="space-y-1.5 text-center">
        <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
        <CardDescription className="text-sm">
          Sign in to your account to continue to your dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-2">
        <GoogleAuthButton label="Continue with Google" className="h-11 text-sm font-medium shadow-xs" />
      </CardContent>
      <CardFooter className="flex flex-col gap-2 text-xs text-center text-muted-foreground justify-center border-t pt-4">
        <p>
          Don&apos;t have an account?&nbsp;
          <Link href="/signup" className="underline hover:text-foreground font-medium">
            Sign up
          </Link>
        </p>
        <p className="text-[11px] text-muted-foreground/80">Secure one-click authentication powered by Google</p>
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
