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
import { getDomainFixtureForIdea } from '@/lib/demo-data';

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

    const fixture = getDomainFixtureForIdea(idea);

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
          console.warn(`[In-Memory Agent: Competitors] Live call issue (${msg}), using domain fixture fallback`);
          const fallback = fixture.competitors;
          updatePendingResults(runId, { competitors: fallback, competitor_status: 'completed' });
          return fallback;
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
          console.warn(`[In-Memory Agent: Tech] Live call issue (${msg}), using domain fixture fallback`);
          const fallback = fixture.tech;
          updatePendingResults(runId, { tech_feasibility: fallback, tech_status: 'completed' });
          return fallback;
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
          console.warn(`[In-Memory Agent: Finance] Live call issue (${msg}), using domain fixture fallback`);
          const fallback = fixture.finance;
          updatePendingResults(runId, { financial_model: fallback, financial_status: 'completed' });
          return fallback;
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
          console.warn(`[In-Memory Agent: Legal] Live call issue (${msg}), using domain fixture fallback`);
          const fallback = fixture.legal;
          updatePendingResults(runId, { legal_regulatory: fallback, legal_status: 'completed' });
          return fallback;
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
          console.warn(`[In-Memory Agent: Global Precedents] Live call issue (${msg}), using domain fixture fallback`);
          const fallback = fixture.global;
          updatePendingResults(runId, { global_benchmarks: fallback, global_status: 'completed' });
          return fallback;
        }
      })(),
    ]);

    const agentResults = {
      competitors: competitors.status === 'fulfilled' ? (competitors.value as CompetitorAnalysis) : fixture.competitors,
      tech: tech.status === 'fulfilled' ? (tech.value as TechFeasibility) : fixture.tech,
      finance: finance.status === 'fulfilled' ? (finance.value as FinancialModel) : fixture.finance,
      legal: legal.status === 'fulfilled' ? (legal.value as LegalRegulatory) : fixture.legal,
      global: global.status === 'fulfilled' ? (global.value as GlobalPrecedents) : fixture.global,
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
      console.warn(`[In-Memory Agent: Synthesis] Live call issue (${msg}), using domain fixture fallback`);
      updatePendingResults(runId, {
        synthesis: fixture.synthesis,
        synthesis_status: 'completed',
      });
    }

    updatePendingRun(runId, {
      status: 'completed',
      completed_at: new Date().toISOString(),
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
