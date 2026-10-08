'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ArrowRight, Sparkles } from 'lucide-react';
import { ContactModal } from '@/components/validation/ContactModal';

const schema = z.object({
  idea: z.string().min(130, 'Please describe your idea in at least 130 characters'),
  language: z.enum(['en', 'hi', 'mr']),
});

const EXAMPLE_IDEA =
  'A hyperlocal cold storage and micro-warehousing network for rural horticulture farmers in Maharashtra and Gujarat, leveraging IoT temperature telemetry and AI demand forecasting to prevent perishables spoilage and connect farm gate producers directly with urban B2B restaurant chains and supermarket procurement desks.';

type FormValues = z.infer<typeof schema>;

interface IdeaFormProps {
  initialUsage?: {
    runsUsed: number;
    runsLimit: number;
    canValidate: boolean;
    hasFreeRunRemaining?: boolean;
    isUnlimited?: boolean;
  };
  userEmail?: string;
  userName?: string;
}

export function IdeaForm({ initialUsage, userEmail, userName }: IdeaFormProps) {
  const router = useRouter();
  const [usage, setUsage] = useState(
    initialUsage ?? { runsUsed: 0, runsLimit: 1, canValidate: true, isUnlimited: false }
  );
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const { register, handleSubmit, setValue, control, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { idea: '', language: 'en' },
  });

  const idea = useWatch({ control, name: 'idea' }) || '';

  // Refresh latest usage on client mount
  useEffect(() => {
    fetch('/api/user/usage')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setUsage({
            runsUsed: data.runsUsed ?? 0,
            runsLimit: data.runsLimit ?? 1,
            canValidate: data.canValidate ?? true,
            isUnlimited: data.isUnlimited ?? (data.runsLimit > 1000),
          });
        }
      })
      .catch(() => {});
  }, []);

  /**
   * Intercept clicks on the "Validate Idea" button.
   * If the user has already used their 1 free run, immediately pop up
   * the "Contact for further" modal without running form validation or submission.
   */
  const handleValidateButtonClick = (e: React.MouseEvent) => {
    if (!usage.canValidate) {
      e.preventDefault();
      e.stopPropagation();
      setIsContactModalOpen(true);
      toast.info('You have completed your 1 free validation run. Please contact us for further validations.');
    }
  };

  async function onSubmit(values: FormValues) {
    if (!usage.canValidate) {
      setIsContactModalOpen(true);
      return;
    }

    try {
      const res = await fetch('/api/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      let data: {
        runId?: string;
        error?: string;
        contactRequired?: boolean;
        message?: string;
        runsUsed?: number;
      } = {};

      try {
        const text = await res.text();
        if (text) data = JSON.parse(text);
      } catch {
        // Non-JSON or empty response
      }

      // Check if user limit was reached
      if (res.status === 403 || data.contactRequired || data.error === 'limit_reached') {
        setUsage((prev) => ({
          ...prev,
          runsUsed: Math.max(prev.runsUsed, 1),
          canValidate: false,
        }));
        setIsContactModalOpen(true);
        toast.error(
          data.message || '1 free run limit reached. Please contact us for further validations.'
        );
        return;
      }

      if (!res.ok) {
        toast.error(data.error ?? `Validation failed (${res.status}). Please try again.`);
        return;
      }

      if (!data.runId) {
        toast.error('Unable to initialize validation run. Please try again.');
        return;
      }

      // Update local usage state
      setUsage((prev) => {
        const isUnlimited = Boolean(prev.isUnlimited || prev.runsLimit > 1000);
        const nextUsed = prev.runsUsed + 1;
        return {
          ...prev,
          runsUsed: nextUsed,
          canValidate: isUnlimited ? true : nextUsed < prev.runsLimit,
        };
      });

      router.push(`/validate/${data.runId}`);
    } catch (err) {
      console.error('Submission error:', err);
      toast.error('Network error. Please try again.');
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Your Business Idea</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="idea">Describe your idea</Label>
              <Textarea
                id="idea"
                {...register('idea')}
                rows={5}
                placeholder="e.g. A platform that connects home cooks in tier-2 Indian cities with nearby customers who want homemade tiffin meals delivered to their office…"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span className={errors.idea ? 'text-destructive font-medium' : ''}>
                  {errors.idea?.message ||
                    ((idea || '').length < 130
                      ? `${130 - (idea || '').length} more characters needed for analysis`
                      : 'Minimum requirement met')}
                </span>
                <span
                  className={
                    (idea || '').length >= 130
                      ? 'text-emerald-600 dark:text-emerald-400 font-medium'
                      : ''
                  }
                >
                  {(idea || '').length} / 130 min chars
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Report language</Label>
              <Select defaultValue="en" onValueChange={(v) => setValue('language', v as FormValues['language'])}>
                <SelectTrigger id="language"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                  <SelectItem value="mr">मराठी (Marathi)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type={usage.canValidate ? 'submit' : 'button'}
              onClick={handleValidateButtonClick}
              className="w-full"
              disabled={isSubmitting}
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Starting analysis…
                </>
              ) : (
                <>
                  Validate Idea <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>

            {/* Example Idea Box (Minimum 200 Characters) */}
            <div className="rounded-lg border border-border/80 bg-muted/40 p-3.5 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-primary" /> Example Idea (200+ characters)
                </span>
                <button
                  type="button"
                  onClick={() => setValue('idea', EXAMPLE_IDEA, { shouldValidate: true })}
                  className="text-primary hover:underline font-medium text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  Fill into form
                </button>
              </div>
              <p className="text-muted-foreground leading-relaxed italic bg-background/60 p-2.5 rounded border border-border/50">
                &ldquo;{EXAMPLE_IDEA}&rdquo;
              </p>
              <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-0.5">
                <span>Tip: Detailed ideas with target audience and monetization yield richer AI validation.</span>
                <span className="font-mono text-muted-foreground font-medium">{EXAMPLE_IDEA.length} chars</span>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <ContactModal
        open={isContactModalOpen}
        onOpenChange={setIsContactModalOpen}
        ideaSnippet={idea}
        defaultEmail={userEmail}
        defaultName={userName}
        isUnlimited={Boolean(usage.isUnlimited || usage.runsLimit > 1000)}
      />
    </>
  );
}
