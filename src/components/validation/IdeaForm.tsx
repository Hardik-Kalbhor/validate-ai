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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, ArrowRight, Sparkles } from 'lucide-react';
import { ContactModal } from '@/components/validation/ContactModal';
import { DeconstructedBriefReview } from '@/components/validation/DeconstructedBriefReview';
import type { ValidationBrief } from '@/schemas/brief.schema';

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
    initialUsage ?? { runsUsed: 0, runsLimit: 3, canValidate: true, isUnlimited: false }
  );
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Phase 0 Workflow States
  const [step, setStep] = useState<'input' | 'review'>('input');
  const [isDeconstructing, setIsDeconstructing] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [brief, setBrief] = useState<ValidationBrief | null>(null);

  const { register, handleSubmit, setValue, getValues, control, formState: { errors } } = useForm<FormValues>({
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
            runsLimit: data.runsLimit ?? 3,
            canValidate: data.canValidate ?? true,
            isUnlimited: data.isUnlimited ?? (data.runsLimit > 1000),
          });
        }
      })
      .catch(() => {});
  }, []);

  /**
   * Phase 0: Deconstruct Idea (No Quota Decrement)
   */
  async function onDeconstruct(values: FormValues) {
    if (!usage.canValidate) {
      setIsContactModalOpen(true);
      toast.info(`You have completed your ${usage.runsLimit} free validation runs. Please contact us for further validations.`);
      return;
    }

    setIsDeconstructing(true);
    try {
      const res = await fetch('/api/validate/deconstruct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        toast.error(errData.error || 'Failed to analyze idea. Please try again.');
        return;
      }

      const data = await res.json();
      if (data?.brief) {
        setBrief(data.brief);
        setStep('review');
        toast.success('Concept framed! Review the assumptions before launching the audit.');
      } else {
        toast.error('Unable to parse idea brief. Please try again.');
      }
    } catch (err) {
      console.error('Deconstruction error:', err);
      toast.error('Network error during idea framing.');
    } finally {
      setIsDeconstructing(false);
    }
  }

  /**
   * Phase 1 Execution: User approves the deconstructed brief (Consumes 1 Run)
   */
  async function handleApprove(approvedBrief: ValidationBrief) {
    if (!usage.canValidate) {
      setIsContactModalOpen(true);
      return;
    }

    setIsApproving(true);
    try {
      const values = getValues();
      const res = await fetch('/api/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idea: values.idea,
          language: values.language,
          approvedBrief,
        }),
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
          data.message || 'Free validation limit reached. Please contact us for further validations.'
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
    } finally {
      setIsApproving(false);
    }
  }

  return (
    <>
      {step === 'review' && brief ? (
        <DeconstructedBriefReview
          brief={brief}
          onApprove={handleApprove}
          onBack={() => setStep('input')}
          isSubmitting={isApproving}
        />
      ) : (
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Describe Your Business Idea</CardTitle>
                <CardDescription className="mt-1 text-xs text-muted-foreground">
                  Step 1: AI frames your business model in ~1.5s. You review assumptions before consuming a run.
                </CardDescription>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-full border">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span>Zero quota consumed for review</span>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onDeconstruct)} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="idea">Idea Description</Label>
                <Textarea
                  id="idea"
                  {...register('idea')}
                  rows={5}
                  placeholder="e.g. A platform that connects home cooks in tier-2 Indian cities with nearby customers who want homemade tiffin meals delivered to their office…"
                  disabled={isDeconstructing}
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
                <Label htmlFor="language">Report Language</Label>
                <Select
                  defaultValue="en"
                  onValueChange={(v) => setValue('language', v as FormValues['language'])}
                  disabled={isDeconstructing}
                >
                  <SelectTrigger id="language"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                    <SelectItem value="mr">मराठी (Marathi)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full gap-2 text-sm font-semibold shadow-sm"
                disabled={isDeconstructing}
                size="lg"
              >
                {isDeconstructing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Framing Concept & Directives (~1.5s)...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 text-amber-300" />
                    Deconstruct & Review Framing (Free)
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </>
                )}
              </Button>

              {/* Example Idea Box */}
              <div className="rounded-lg border border-border/80 bg-muted/40 p-3.5 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-primary" /> Example Idea (200+ characters)
                  </span>
                  <button
                    type="button"
                    onClick={() => setValue('idea', EXAMPLE_IDEA, { shouldValidate: true })}
                    className="text-primary hover:underline font-medium text-[11px] flex items-center gap-1 cursor-pointer"
                    disabled={isDeconstructing}
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
      )}

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
