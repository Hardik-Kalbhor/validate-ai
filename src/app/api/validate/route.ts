import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { validationRatelimit } from '@/lib/redis';
import { runValidationPipeline } from '@/pipeline/validate-idea';
import { runInMemoryPipeline } from '@/pipeline/in-memory-pipeline';
import { setPendingRun } from '@/lib/pending-runs';
import { z } from 'zod';
import { ValidationBriefSchema } from '@/schemas/brief.schema';

const RequestSchema = z.object({
  idea: z.string().min(130, 'Idea must be at least 130 characters'),
  language: z.enum(['en', 'hi', 'mr']).default('en'),
  approvedBrief: ValidationBriefSchema.optional(),
});

export async function POST(req: NextRequest) {
  try {
    // ── 1. Auth ─────────────────────────────────────────────────────
    const supabase = await createServerClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // ── 2. Rate Limit ───────────────────────────────────────────────
    try {
      const { success, remaining } = await validationRatelimit.limit(user.id);
      if (!success) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Max 10 validations per hour.' },
          { status: 429, headers: { 'X-RateLimit-Remaining': String(remaining) } }
        );
      }
    } catch {
      // Redis unavailable — continue safely
    }

    // ── 3. Validate Request Body ─────────────────────────────────────
    let body: z.infer<typeof RequestSchema>;
    try {
      body = RequestSchema.parse(await req.json());
    } catch (err) {
      return NextResponse.json({ error: 'Invalid request', details: err }, { status: 400 });
    }

    // ── 4. Check Free Run Limit ─────────────────────────────────────
    const { getUserUsage, incrementUserUsage } = await import('@/lib/user-usage');
    const usage = await getUserUsage(user.id, user.email);

    if (!usage.canValidate) {
      return NextResponse.json(
        {
          error: 'limit_reached',
          contactRequired: true,
          message: 'You have used your 3 free validation runs. Please contact us for further validations.',
          runsUsed: usage.runsUsed,
          runsLimit: usage.runsLimit,
        },
        { status: 403 }
      );
    }

    // ── 5. Create Run Record ─────────────────────────────────────────
    let runId: string | null = null;

    try {
      const admin = createAdminClient();
      const { data: run } = await admin
        .from('validation_runs')
        .insert({ user_id: user.id, idea_text: body.idea, language: body.language })
        .select('id')
        .single();

      if (run?.id) {
        runId = run.id;

        await incrementUserUsage(user.id, user.email);

        // Fire-and-forget pipeline
        runValidationPipeline(run.id, body.idea, body.language, body.approvedBrief).catch((err) => {
          console.error(`[Pipeline] Run ${run.id} failed:`, err);
        });
      }
    } catch {
      // Supabase connection or table unavailable — fallback to in-memory pending run
    }

    // If no live DB record, seed in-memory pending run and execute in-memory pipeline
    if (!runId) {
      runId = `demo-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
      setPendingRun({
        id: runId,
        user_id: user.id,
        idea_text: body.idea,
        language: body.language,
        business_type: 'online',
        status: 'running',
        error_message: null,
        created_at: new Date().toISOString(),
        completed_at: null,
      });

      await incrementUserUsage(user.id, user.email);

      // Fire-and-forget real in-memory agent pipeline
      runInMemoryPipeline(runId, body.idea, body.language, body.approvedBrief).catch((err) => {
        console.error(`[In-Memory Pipeline] Run ${runId} failed:`, err);
      });
    }

    const response = NextResponse.json({ runId }, { status: 200 });

    // Update demo cookie if active so runs_used persists across browser reloads
    const demoCookie = req.cookies.get('validateai_demo_user');
    if (demoCookie?.value) {
      try {
        const parsed = JSON.parse(demoCookie.value);
        parsed.runs_used = (parsed.runs_used ?? 0) + 1;
        if (usage.isUnlimited) {
          parsed.runs_limit = 999999;
          parsed.is_unlimited = true;
        }
        response.cookies.set('validateai_demo_user', JSON.stringify(parsed), {
          path: '/',
          httpOnly: false,
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7,
        });
      } catch {
        // ignore
      }
    }

    return response;
  } catch (error) {
    console.error('Error in POST /api/validate:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal Server Error' },
      { status: 500 }
    );
  }
}
