import { createAdminClient } from '@/lib/supabase/admin';
import {
  runCompetitorAgent,
  runTechAgent,
  runFinancialAgent,
  runSynthesisAgent,
} from './agent-runners';

/**
 * Main validation pipeline orchestrator.
 * Runs Agents 1, 2, 3 in PARALLEL, then Agent 4 (Synthesis) sequentially.
 * Each agent writes to DB as it completes — Supabase Realtime pushes updates to UI.
 *
 * Called as fire-and-forget from the API route — no return value needed.
 */
export async function runValidationPipeline(
  runId: string,
  idea: string,
  language: string
): Promise<void> {
  const admin = createAdminClient();

  // Mark run as actively running
  await admin
    .from('validation_runs')
    .update({ status: 'running' })
    .eq('id', runId);

  try {
    // ── Phase 1: Run Agents 1, 2, 3 in parallel ──────────────────────
    const [competitors, tech, finance] = await Promise.allSettled([
      runCompetitorAgent(admin, runId, idea, language),
      runTechAgent(admin, runId, idea, language),
      runFinancialAgent(admin, runId, idea, language),
    ]);

    // Extract results (null if agent failed — synthesis handles gracefully)
    const agentResults = {
      competitors: competitors.status === 'fulfilled' ? competitors.value : null,
      tech: tech.status === 'fulfilled' ? tech.value : null,
      finance: finance.status === 'fulfilled' ? finance.value : null,
    };

    // ── Phase 2: Synthesis (needs all 3 results as context) ──────────
    await runSynthesisAgent(admin, runId, idea, language, agentResults);

    // ── Mark run complete ─────────────────────────────────────────────
    await admin.from('validation_runs').update({
      status: 'completed',
      completed_at: new Date().toISOString(),
    }).eq('id', runId);

  } catch (error) {
    // Unexpected top-level error — mark run as failed
    await admin.from('validation_runs').update({
      status: 'failed',
      error_message: error instanceof Error ? error.message : String(error),
    }).eq('id', runId);
  }
}
