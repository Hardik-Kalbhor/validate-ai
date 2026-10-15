import { createAdminClient } from '@/lib/supabase/admin';
import {
  runCompetitorAgent,
  runTechAgent,
  runFinancialAgent,
  runSynthesisAgent,
  runLegalAgent,
  runGlobalBenchmarksAgent,
  runRedTeamAgent,
  saveApprovedBrief,
  saveDriftAlert,
} from './agent-runners';
import type { ValidationBrief } from '@/schemas/brief.schema';
import { assembleEnrichedContext } from '@/lib/context-assembler';

/**
 * Main validation pipeline orchestrator.
 * 1. Assembles multi-source context (Statutory corpus, DRHP benchmarks, VC memos, App Store/Reddit sentiment).
 * 2. Runs Agents 1, 2, 3, 5, 6 in PARALLEL using the approved Phase 0 brief + enriched context.
 * 3. Runs Agent 4 (Synthesis) sequentially with full multi-source dossier.
 * 4. Runs Agent 7 (Adversarial Red-Team) sequentially to stress-test the synthesis verdict.
 *
 * Each agent writes to DB as it completes — Supabase Realtime pushes updates to UI.
 */
export async function runValidationPipeline(
  runId: string,
  idea: string,
  language: string,
  approvedBrief?: ValidationBrief,
  pitchDeckText?: string,
  userId?: string
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
    // ── Step 0: Assemble multi-source enriched context bundle ────────
    const context = await assembleEnrichedContext({
      runId,
      idea,
      brief: approvedBrief,
      pitchDeckText,
      userId,
      admin,
    });

    if (context.driftAlert) {
      await saveDriftAlert(admin, runId, context.driftAlert);
    }

    // ── Phase 1: Run Agents 1, 2, 3, 5, 6 in parallel with tailored directives & knowledge packs ──
    const [competitors, tech, finance, legal, global] = await Promise.allSettled([
      runCompetitorAgent(
        admin,
        runId,
        idea,
        language,
        approvedBrief?.agent_directives?.competitor_focus,
        context.liveSentiment,
        context.pitchDeckContext
      ),
      runTechAgent(
        admin,
        runId,
        idea,
        language,
        approvedBrief?.agent_directives?.tech_focus,
        context.pitchDeckContext,
        context.patentLandscape
      ),
      runFinancialAgent(
        admin,
        runId,
        idea,
        language,
        approvedBrief?.agent_directives?.financial_focus,
        context.drhpBenchmarks,
        context.pitchDeckContext,
        context.ycFrameworks,
        context.governmentSchemes
      ),
      runLegalAgent(
        admin,
        runId,
        idea,
        language,
        approvedBrief?.agent_directives?.legal_focus,
        context.statutoryContext,
        context.courtPrecedents,
        context.pitchDeckContext,
        context.rocCompliance,
        context.governmentSchemes
      ),
      runGlobalBenchmarksAgent(
        admin,
        runId,
        idea,
        language,
        approvedBrief?.agent_directives?.global_focus,
        context.macroReport,
        context.pitchDeckContext
      ),
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

    // ── Phase 2: Synthesis (sequential, needs all agent results + VC memo patterns) ──────────
    const synthesis = await runSynthesisAgent(
      admin,
      runId,
      idea,
      language,
      agentResults,
      context
    );

    // ── Phase 3: Adversarial Red-Team (Agent 7, stress-tests the verdict) ────────────────────
    await runRedTeamAgent(
      admin,
      runId,
      idea,
      language,
      synthesis,
      approvedBrief ?? null,
      context.pitchDeckContext,
      context.patentLandscape,
      context.ycFrameworks,
      context.startupAutopsies
    );

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
