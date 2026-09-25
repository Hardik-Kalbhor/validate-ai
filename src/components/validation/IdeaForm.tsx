'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const schema = z.object({
  idea: z.string().min(30, 'Please describe your idea in at least 30 characters'),
  language: z.enum(['en', 'hi', 'mr']),
});

type FormValues = z.infer<typeof schema>;

export function IdeaForm() {
  const router = useRouter();
  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { idea: '', language: 'en' },
  });

  const idea = watch('idea');

  async function onSubmit(values: FormValues) {
    const res = await fetch('/api/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      const data = await res.json();
      toast.error(data.error ?? 'Something went wrong');
      return;
    }

    const { runId } = await res.json();
    router.push(`/validate/${runId}`);
  }

  return (
    <Card>
      <CardHeader><CardTitle>Your Business Idea</CardTitle></CardHeader>
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
              <span>{errors.idea?.message}</span>
              <span>{idea.length} chars</span>
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

          <Button type="submit" className="w-full" disabled={isSubmitting} size="lg">
            {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Starting analysis…</> : 'Validate My Idea →'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
