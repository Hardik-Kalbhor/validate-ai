'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { GoogleAuthButton } from '@/components/auth/GoogleAuthButton';
import { Sparkles } from 'lucide-react';
import { toast } from 'sonner';

function SignupForm() {
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
        <div className="mx-auto w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-1 text-primary">
          <Sparkles className="w-5 h-5" />
        </div>
        <CardTitle className="text-2xl font-bold">Create your account</CardTitle>
        <CardDescription className="text-sm">
          Sign in with Google to get 1 free AI-powered idea validation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-2">
        <GoogleAuthButton label="Sign up with Google" className="h-11 text-sm font-medium shadow-xs" />
      </CardContent>
      <CardFooter className="flex flex-col gap-2 text-xs text-center text-muted-foreground justify-center border-t pt-4">
        <p>
          Already have an account?&nbsp;
          <Link href="/login" className="underline hover:text-foreground font-medium">
            Sign in
          </Link>
        </p>
        <p className="text-[11px] text-muted-foreground/80">Secure one-click authentication powered by Google</p>
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
