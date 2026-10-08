'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Send,
  Loader2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner';

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ideaSnippet?: string;
  defaultEmail?: string;
  defaultName?: string;
  isUnlimited?: boolean;
}

export function ContactModal({
  open,
  onOpenChange,
  ideaSnippet,
  defaultEmail = '',
  defaultName = '',
  isUnlimited = false,
}: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: defaultName,
    email: defaultEmail,
    message: ideaSnippet
      ? (isUnlimited
          ? `Hi, I am validating this idea on ValidateAI: "${ideaSnippet.slice(0, 100)}..."`
          : `Hi, I have completed my 1 free validation run on ValidateAI. I would like to validate this idea further: "${ideaSnippet.slice(0, 100)}..."`)
      : (isUnlimited
          ? 'Hi, I would like to contact your team regarding my ValidateAI account.'
          : 'Hi, I have completed my 1 free validation run on ValidateAI and would like to contact your team for further validations.'),
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.email) {
      toast.error('Please enter your email address');
      return;
    }
    if (!formData.message || formData.message.trim().length < 5) {
      toast.error('Please enter a brief message');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          idea: ideaSnippet,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to submit message');
      }

      setSubmitted(true);
      toast.success('Your message has been sent! Our team will contact you shortly.');
    } catch {
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className={
                isUnlimited
                  ? 'gap-1 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20'
                  : 'gap-1 bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20'
              }
            >
              <Sparkles className="h-3 w-3" /> {isUnlimited ? 'Unlimited Plan' : '1 Free Run Completed'}
            </Badge>
          </div>
          <DialogTitle className="text-xl font-bold tracking-tight">
            {isUnlimited ? 'Contact ValidateAI Support' : 'Contact for Further Validations'}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {isUnlimited
              ? 'Have feedback, questions, or custom enterprise requirements? Let our team know below.'
              : 'You have used your 1 free idea validation run. To validate more business ideas, unlock detailed competitor intelligence, or explore custom founder plans, please contact our team.'}
          </DialogDescription>
        </DialogHeader>

        {/* What further validations include */}
        <div className="rounded-lg border bg-card/60 p-3.5 space-y-2 text-xs">
          <div className="font-semibold text-foreground flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-primary" /> What you get with further validations:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <span className="text-primary font-bold">✓</span> Unlimited business idea runs
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-primary font-bold">✓</span> Deep live Google competitor scans
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-primary font-bold">✓</span> 3-year Indian market financial models
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-primary font-bold">✓</span> Tech stack & founder consultation
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="border-t pt-3">
          {submitted ? (
            <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-5 text-center space-y-2">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto" />
              <h4 className="font-semibold text-sm">Request Submitted Successfully!</h4>
              <p className="text-xs text-muted-foreground">
                Thank you for your interest. We will contact you at <strong>{formData.email}</strong> within 24 hours with custom validation access options.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2 text-xs"
                onClick={() => onOpenChange(false)}
              >
                Close
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-foreground">Send a message to our team:</span>
                <span className="text-[11px] text-muted-foreground">We reply in &lt; 24h</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <Label htmlFor="contact-name" className="text-xs">Your Name</Label>
                  <Input
                    id="contact-name"
                    placeholder="Rahul Sharma"
                    className="h-8 text-xs"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="contact-email" className="text-xs">Your Email *</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="rahul@startup.in"
                    className="h-8 text-xs"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="contact-message" className="text-xs">Message / Idea details</Label>
                <Textarea
                  id="contact-message"
                  rows={2}
                  className="text-xs resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-9 text-xs gap-1.5"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Sending request…
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    Send Request for Further Validations
                  </>
                )}
              </Button>
            </form>
          )}
        </div>

        <DialogFooter className="flex-row items-center justify-between gap-2 border-t pt-3 sm:justify-between">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-xs"
            asChild
          >
            <Link href="/dashboard">
              Go to Dashboard <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
