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
import { ArrowLeft, RotateCw, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [step, setStep] = useState<'details' | 'verify'>('details');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [otp, setOtp] = useState('');

  const redirectTarget = searchParams.get('redirect') || searchParams.get('next') || '/dashboard';

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const interval = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCooldown]);

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  // Step 1: Submit details and trigger verification code
  async function handleInitialSignup(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error('Please enter your full name');
      return;
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setIsLoading(true);

    const isSupabaseConfigured =
      Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('placeholder');

    if (!isSupabaseConfigured) {
      setIsLoading(false);
      setStep('verify');
      setResendCooldown(60);
      toast.info('Verification code sent! (Preview mode: enter 123456)');
      return;
    }

    try {
      const callbackUrl = new URL('/auth/callback', window.location.origin);
      callbackUrl.searchParams.set('next', redirectTarget);

      const { data, error } = await supabase.auth.signUp({
        email: form.email.trim(),
        password: form.password,
        options: {
          data: { full_name: form.name.trim() },
          emailRedirectTo: callbackUrl.toString(),
        },
      });

      if (error) {
        toast.error(error.message);
        setIsLoading(false);
        return;
      }

      // If session exists immediately (email confirmation disabled in Supabase), user is already logged in
      if (data.session) {
        toast.success('Account created successfully! Welcome to ValidateAI');
        router.push(redirectTarget);
        router.refresh();
        return;
      }

      // Otherwise, transition to Step 2: OTP Verification
      setStep('verify');
      setResendCooldown(60);
      toast.success(`Verification code sent to ${form.email}`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to register account';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }

  // Step 2: Verify the 6-digit OTP code
  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    const cleanOtp = otp.trim();
    if (cleanOtp.length < 6) {
      toast.error('Please enter the complete 6-digit verification code');
      return;
    }

    setIsVerifying(true);

    const isSupabaseConfigured =
      Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('placeholder');

    if (!isSupabaseConfigured) {
      const res = await fetch('/api/auth/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, full_name: form.name }),
      });
      if (res.ok) {
        toast.success('Email verified successfully! Welcome to ValidateAI');
        router.push(redirectTarget);
        router.refresh();
      } else {
        toast.error('Failed to authenticate in preview mode');
      }
      setIsVerifying(false);
      return;
    }

    try {
      const { error } = await supabase.auth.verifyOtp({
        email: form.email.trim(),
        token: cleanOtp,
        type: 'signup',
      });

      if (error) {
        // Fallback to type 'email' in case of provider configuration differences
        const fallback = await supabase.auth.verifyOtp({
          email: form.email.trim(),
          token: cleanOtp,
          type: 'email',
        });

        if (fallback.error) {
          toast.error(fallback.error.message || error.message);
          setIsVerifying(false);
          return;
        }
      }

      toast.success('Email verified successfully! Welcome to ValidateAI');
      router.push(redirectTarget);
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Verification failed';
      toast.error(message);
    } finally {
      setIsVerifying(false);
    }
  }

  // Resend OTP
  async function handleResendCode() {
    if (resendCooldown > 0 || isResending) return;
    setIsResending(true);

    const isSupabaseConfigured =
      Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('placeholder');

    if (!isSupabaseConfigured) {
      setResendCooldown(60);
      setIsResending(false);
      toast.info('New verification code sent! (Preview mode: enter 123456)');
      return;
    }

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: form.email.trim(),
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success('A new verification code has been sent to your email');
        setResendCooldown(60);
      }
    } catch {
      toast.error('Could not resend verification code');
    } finally {
      setIsResending(false);
    }
  }

  return (
    <Card className="shadow-sm border-border/80">
      {step === 'details' ? (
        <>
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">Create your account</CardTitle>
            <CardDescription>Step 1 of 2: Enter your details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <GoogleAuthButton label="Sign up with Google" disabled={isLoading} />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-muted" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground font-medium">Or sign up with email</span>
              </div>
            </div>

            <form onSubmit={handleInitialSignup} className="space-y-4">
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
                {isLoading ? 'Sending verification code…' : 'Continue to Verification'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-sm text-center text-muted-foreground justify-center">
            Already have an account?&nbsp;<Link href="/login" className="underline hover:text-foreground">Sign in</Link>
          </CardFooter>
        </>
      ) : (
        <>
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-1 text-primary">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <CardTitle className="text-xl">Verify your email</CardTitle>
            <CardDescription className="text-xs">
              Step 2 of 2: We sent a 6-digit code to <strong className="text-foreground">{form.email}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="space-y-2 text-center">
                <Label htmlFor="otp" className="text-xs text-muted-foreground">
                  Enter 6-digit verification code
                </Label>
                <Input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="text-center text-2xl tracking-[0.35em] font-mono h-12 font-semibold"
                  disabled={isVerifying}
                  autoFocus
                />
              </div>

              <Button
                type="submit"
                className="w-full font-medium"
                disabled={isVerifying || otp.trim().length < 6}
              >
                {isVerifying ? 'Verifying…' : 'Verify & Complete Signup'}
              </Button>
            </form>

            <div className="flex items-center justify-between pt-1 text-xs">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 cursor-pointer transition-colors"
                disabled={isVerifying}
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Change email
              </button>

              <button
                type="button"
                onClick={handleResendCode}
                disabled={resendCooldown > 0 || isResending || isVerifying}
                className={`inline-flex items-center gap-1 font-medium transition-colors ${
                  resendCooldown > 0 || isResending
                    ? 'text-muted-foreground/60 cursor-not-allowed'
                    : 'text-primary hover:underline cursor-pointer'
                }`}
              >
                <RotateCw className={`w-3 h-3 ${isResending ? 'animate-spin' : ''}`} />
                {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : 'Resend code'}
              </button>
            </div>
          </CardContent>
          <CardFooter className="text-xs text-center text-muted-foreground justify-center border-t pt-3">
            Didn&apos;t receive the email? Check spam or resend code above.
          </CardFooter>
        </>
      )}
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
