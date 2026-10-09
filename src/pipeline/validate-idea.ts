import { createAdminClient } from '@/lib/supabase/admin';
import {
  runCompetitorAgent,
  runTechAgent,
  runFinancialAgent,
  runSynthesisAgent,
  runLegalAgent,
  runGlobalBenchmarksAgent,
  saveApprovedBrief,
} from './agent-runners';
import type { ValidationBrief } from '@/schemas/brief.schema';

/**
 * Main validation pipeline orchestrator.
 * Runs Agents 1, 2, 3, 5, 6 in PARALLEL using the approved Phase 0 brief, then Agent 4 (Synthesis) sequentially.
 * Each agent writes to DB as it completes — Supabase Realtime pushes updates to UI.
 *
 * Called as fire-and-forget from the API route — no return value needed.
 */
export async function runValidationPipeline(
  runId: string,
  idea: string,
  language: string,
  approvedBrief?: ValidationBrief
): Promise<void> {
  const admin = createAdminClient();

  // Mark run as actively running
  await admin
    .from('validation_runs')
    .update({ status: 'running' })
    .eq('id', runId);

  // If approved brief provided, persist it immediately
  if (approvedBrief) {
    await saveApprovedBrief(admin, runId, approvedBrief);
  }

  try {
    // ── Phase 1: Run Agents 1, 2, 3, 5, 6 in parallel with tailored directives ──
    const [competitors, tech, finance, legal, global] = await Promise.allSettled([
      runCompetitorAgent(admin, runId, idea, language, approvedBrief?.agent_directives?.competitor_focus),
      runTechAgent(admin, runId, idea, language, approvedBrief?.agent_directives?.tech_focus),
      runFinancialAgent(admin, runId, idea, language, approvedBrief?.agent_directives?.financial_focus),
      runLegalAgent(admin, runId, idea, language, approvedBrief?.agent_directives?.legal_focus),
      runGlobalBenchmarksAgent(admin, runId, idea, language, approvedBrief?.agent_directives?.global_focus),
    ]);

    // Extract results (null if agent failed — synthesis handles gracefully)
    const agentResults = {
      competitors: competitors.status === 'fulfilled' ? competitors.value : null,
      tech: tech.status === 'fulfilled' ? tech.value : null,
      finance: finance.status === 'fulfilled' ? finance.value : null,
      legal: legal.status === 'fulfilled' ? legal.value : null,
      global: global.status === 'fulfilled' ? global.value : null,
      brief: approvedBrief ?? null,
    };

    // ── Phase 2: Synthesis (needs all results as context) ──────────
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
