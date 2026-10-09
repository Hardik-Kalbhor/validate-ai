import { analyzeCompetitors } from '@/agents/competitor-analysis';
import { assessTechFeasibility } from '@/agents/tech-feasibility';
import { modelFinancials } from '@/agents/financial-modeling';
import { synthesizeResults } from '@/agents/synthesis';
import { analyzeLegalRegulatory } from '@/agents/legal-regulatory';
import { analyzeGlobalBenchmarks } from '@/agents/global-benchmarks';
import { updatePendingRun, updatePendingResults } from '@/lib/pending-runs';
import type { CompetitorAnalysis } from '@/schemas/competitor.schema';
import type { TechFeasibility } from '@/schemas/tech-feasibility.schema';
import type { FinancialModel } from '@/schemas/financial-model.schema';
import type { LegalRegulatory } from '@/schemas/legal-regulatory.schema';
import type { GlobalPrecedents } from '@/schemas/global-precedents.schema';
import type { ValidationBrief } from '@/schemas/brief.schema';

/**
 * In-memory validation pipeline orchestrator.
 * Used when database persistence is bypassed or running in self-contained/demo mode.
 * Executes all 6 specialized dynamic AI agents, writing live progress and results to the in-memory store.
 * Pure dynamic execution with zero static fallbacks.
 */
export async function runInMemoryPipeline(
  runId: string,
  idea: string,
  language: string,
  approvedBrief?: ValidationBrief
): Promise<void> {
  updatePendingRun(runId, { status: 'running' });

  if (approvedBrief) {
    updatePendingResults(runId, {
      brief: approvedBrief,
      brief_status: 'completed',
    });
  }

  try {
    // Stagger requests slightly (1.2s) to avoid Google Gemini burst concurrency rate-limiting
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const agentErrors: string[] = [];

    // ── Phase 1: Run Agents 1, 2, 3, 5, 6 in parallel (with spaced start & directives) ──
    const [competitors, tech, finance, legal, global] = await Promise.allSettled([
      (async () => {
        updatePendingResults(runId, { competitor_status: 'running' });
        try {
          const res = await analyzeCompetitors(idea, language, approvedBrief?.agent_directives?.competitor_focus);
          updatePendingResults(runId, { competitors: res, competitor_status: 'completed' });
          return res;
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          console.error(`[In-Memory Agent: Competitors] Failed for run ${runId}:`, msg);
          agentErrors.push(`Competitors: ${msg}`);
          updatePendingResults(runId, { competitor_status: 'failed' });
          throw err;
        }
      })(),
      (async () => {
        await delay(1200);
        updatePendingResults(runId, { tech_status: 'running' });
        try {
          const res = await assessTechFeasibility(idea, language, approvedBrief?.agent_directives?.tech_focus);
          updatePendingResults(runId, { tech_feasibility: res, tech_status: 'completed' });
          return res;
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          console.error(`[In-Memory Agent: Tech] Failed for run ${runId}:`, msg);
          agentErrors.push(`Tech: ${msg}`);
          updatePendingResults(runId, { tech_status: 'failed' });
          throw err;
        }
      })(),
      (async () => {
        await delay(2400);
        updatePendingResults(runId, { financial_status: 'running' });
        try {
          const res = await modelFinancials(idea, language, approvedBrief?.agent_directives?.financial_focus);
          updatePendingResults(runId, { financial_model: res, financial_status: 'completed' });
          return res;
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          console.error(`[In-Memory Agent: Finance] Failed for run ${runId}:`, msg);
          agentErrors.push(`Finance: ${msg}`);
          updatePendingResults(runId, { financial_status: 'failed' });
          throw err;
        }
      })(),
      (async () => {
        await delay(3600);
        updatePendingResults(runId, { legal_status: 'running' });
        try {
          const res = await analyzeLegalRegulatory(idea, language, approvedBrief?.agent_directives?.legal_focus);
          updatePendingResults(runId, { legal_regulatory: res, legal_status: 'completed' });
          return res;
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          console.error(`[In-Memory Agent: Legal] Failed for run ${runId}:`, msg);
          agentErrors.push(`Legal: ${msg}`);
          updatePendingResults(runId, { legal_status: 'failed' });
          throw err;
        }
      })(),
      (async () => {
        await delay(4800);
        updatePendingResults(runId, { global_status: 'running' });
        try {
          const res = await analyzeGlobalBenchmarks(idea, language, approvedBrief?.agent_directives?.global_focus);
          updatePendingResults(runId, { global_benchmarks: res, global_status: 'completed' });
          return res;
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          console.error(`[In-Memory Agent: Global Precedents] Failed for run ${runId}:`, msg);
          agentErrors.push(`Global: ${msg}`);
          updatePendingResults(runId, { global_status: 'failed' });
          throw err;
        }
      })(),
    ]);

    const agentResults = {
      competitors: competitors.status === 'fulfilled' ? (competitors.value as CompetitorAnalysis) : null,
      tech: tech.status === 'fulfilled' ? (tech.value as TechFeasibility) : null,
      finance: finance.status === 'fulfilled' ? (finance.value as FinancialModel) : null,
      legal: legal.status === 'fulfilled' ? (legal.value as LegalRegulatory) : null,
      global: global.status === 'fulfilled' ? (global.value as GlobalPrecedents) : null,
    };

    // ── Phase 2: Synthesis Agent (combines all outputs + brief) ──────────────
    updatePendingResults(runId, { synthesis_status: 'running' });
    try {
      const synthesis = await synthesizeResults({
        idea,
        language,
        competitors: agentResults.competitors,
        tech: agentResults.tech,
        finance: agentResults.finance,
        legal: agentResults.legal,
        global: agentResults.global,
        brief: approvedBrief ?? null,
      });
      updatePendingResults(runId, {
        synthesis,
        synthesis_status: 'completed',
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`[In-Memory Agent: Synthesis] Failed for run ${runId}:`, msg);
      agentErrors.push(`Synthesis: ${msg}`);
      updatePendingResults(runId, {
        synthesis_status: 'failed',
      });
    }

    const anySuccess =
      agentResults.competitors ||
      agentResults.tech ||
      agentResults.finance ||
      agentResults.legal ||
      agentResults.global;

    updatePendingRun(runId, {
      status: anySuccess ? 'completed' : 'failed',
      completed_at: new Date().toISOString(),
      ...(anySuccess ? {} : { error_message: agentErrors.join(' | ') || 'All validation agents failed to complete analysis' }),
    });
  } catch (error) {
    console.error(`[In-Memory Pipeline] Unexpected error for run ${runId}:`, error);
    updatePendingRun(runId, {
      status: 'failed',
      completed_at: new Date().toISOString(),
      error_message: error instanceof Error ? error.message : String(error),
    });
  }
}
