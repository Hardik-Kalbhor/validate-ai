import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { validationRatelimit } from '@/lib/redis';
import { runValidationPipeline } from '@/pipeline/validate-idea';
import { z } from 'zod';

const RequestSchema = z.object({
  idea: z.string().min(30, 'Idea must be at least 30 characters'),
  language: z.enum(['en', 'hi', 'mr']).default('en'),
});

export async function POST(req: NextRequest) {
  // ── 1. Auth ─────────────────────────────────────────────────────
  const supabase = await createServerClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // ── 2. Rate Limit ───────────────────────────────────────────────
  const { success, remaining } = await validationRatelimit.limit(user.id);
  if (!success) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Max 10 validations per hour.' },
      { status: 429, headers: { 'X-RateLimit-Remaining': String(remaining) } }
    );
  }

  // ── 3. Validate Request Body ─────────────────────────────────────
  let body: z.infer<typeof RequestSchema>;
  try {
    body = RequestSchema.parse(await req.json());
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request', details: err }, { status: 400 });
  }

  const admin = createAdminClient();

  // ── 4. Check Runs Limit ──────────────────────────────────────────
  const { data: profile } = await admin
    .from('profiles')
    .select('runs_used, runs_limit')
    .eq('id', user.id)
    .single();

  if (profile && profile.runs_used >= profile.runs_limit) {
    return NextResponse.json(
      { error: 'Monthly validation limit reached.' },
      { status: 429 }
    );
  }

  // ── 5. Create Run Record ─────────────────────────────────────────
  const { data: run, error: runError } = await admin
    .from('validation_runs')
    .insert({ user_id: user.id, idea_text: body.idea, language: body.language })
    .select('id')
    .single();

  if (runError || !run) {
    return NextResponse.json({ error: 'Failed to create run' }, { status: 500 });
  }

  // Increment runs_used
  await admin
    .from('profiles')
    .update({ runs_used: (profile?.runs_used ?? 0) + 1 })
    .eq('id', user.id);

  // ── 6. Fire-and-forget Pipeline ──────────────────────────────────
  // Render free tier = persistent Node.js server = no timeout issue
  runValidationPipeline(run.id, body.idea, body.language).catch((err) => {
    console.error(`[Pipeline] Run ${run.id} failed:`, err);
  });

  return NextResponse.json({ runId: run.id }, { status: 200 });
}
