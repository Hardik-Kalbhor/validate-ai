import { analyzeCompetitors } from '@/agents/competitor-analysis';
import { assessTechFeasibility } from '@/agents/tech-feasibility';
import { modelFinancials } from '@/agents/financial-modeling';
import { synthesizeResults } from '@/agents/synthesis';
import { analyzeLegalRegulatory } from '@/agents/legal-regulatory';
import { analyzeGlobalBenchmarks } from '@/agents/global-benchmarks';
import { runRedTeamAnalysis } from '@/agents/red-team';
import { updatePendingRun, updatePendingResults } from '@/lib/pending-runs';
import type { CompetitorAnalysis } from '@/schemas/competitor.schema';
import type { TechFeasibility } from '@/schemas/tech-feasibility.schema';
import type { FinancialModel } from '@/schemas/financial-model.schema';
import type { LegalRegulatory } from '@/schemas/legal-regulatory.schema';
import type { GlobalPrecedents } from '@/schemas/global-precedents.schema';
import type { ValidationBrief } from '@/schemas/brief.schema';
import { assembleEnrichedContext } from '@/lib/context-assembler';

/**
 * In-memory validation pipeline orchestrator.
 * Used when database persistence is bypassed or running in self-contained/demo mode.
 * Executes all 7 specialized dynamic AI agents, writing live progress and results to the in-memory store.
 */
export async function runInMemoryPipeline(
  runId: string,
  idea: string,
  language: string,
  approvedBrief?: ValidationBrief,
  pitchDeckText?: string,
  userId?: string
): Promise<void> {
  updatePendingRun(runId, { status: 'running' });

  if (approvedBrief) {
    updatePendingResults(runId, {
      brief: approvedBrief,
      brief_status: 'completed',
    });
  }

  try {
    // ── Step 0: Assemble multi-source enriched context ──────────────────────
    const context = await assembleEnrichedContext({
      runId,
      idea,
      brief: approvedBrief,
      pitchDeckText,
      userId,
    });

    if (context.driftAlert) {
      updatePendingResults(runId, { drift_alert: context.driftAlert });
    }

    // Stagger requests slightly (1.2s) to avoid Google Gemini burst concurrency rate-limiting
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    // ── Phase 1: Run Agents 1, 2, 3, 5, 6 in parallel (with spaced start & directives) ──
    const [competitors, tech, finance, legal, global] = await Promise.allSettled([
      (async () => {
        updatePendingResults(runId, { competitor_status: 'running' });
        try {
          const res = await analyzeCompetitors(
            idea,
            language,
            approvedBrief?.agent_directives?.competitor_focus,
            context.liveSentiment,
            context.pitchDeckContext
          );
          updatePendingResults(runId, { competitors: res, competitor_status: 'completed' });
          return res;
        } catch (err) {
          console.warn(`[In-Memory Agent: Competitors] Live call attempt 1 failed (${err}), retrying...`);
          try {
            await delay(2000);
            const res = await analyzeCompetitors(
              idea,
              language,
              approvedBrief?.agent_directives?.competitor_focus,
              context.liveSentiment,
              context.pitchDeckContext
            );
            updatePendingResults(runId, { competitors: res, competitor_status: 'completed' });
            return res;
          } catch (retryErr) {
            console.error(`[In-Memory Agent: Competitors] Agent failed after retry:`, retryErr);
            updatePendingResults(runId, { competitor_status: 'failed' });
            return null;
          }
        }
      })(),
      (async () => {
        await delay(1200);
        updatePendingResults(runId, { tech_status: 'running' });
        try {
          const res = await assessTechFeasibility(
            idea,
            language,
            approvedBrief?.agent_directives?.tech_focus,
            context.pitchDeckContext,
            context.patentLandscape
          );
          updatePendingResults(runId, { tech_feasibility: res, tech_status: 'completed' });
          return res;
        } catch (err) {
          console.warn(`[In-Memory Agent: Tech] Live call attempt 1 failed (${err}), retrying...`);
          try {
            await delay(2000);
            const res = await assessTechFeasibility(
              idea,
              language,
              approvedBrief?.agent_directives?.tech_focus,
              context.pitchDeckContext,
              context.patentLandscape
            );
            updatePendingResults(runId, { tech_feasibility: res, tech_status: 'completed' });
            return res;
          } catch (retryErr) {
            console.error(`[In-Memory Agent: Tech] Agent failed after retry:`, retryErr);
            updatePendingResults(runId, { tech_status: 'failed' });
            return null;
          }
        }
      })(),
      (async () => {
        await delay(2400);
        updatePendingResults(runId, { financial_status: 'running' });
        try {
          const res = await modelFinancials(
            idea,
            language,
            approvedBrief?.agent_directives?.financial_focus,
            context.drhpBenchmarks,
            context.pitchDeckContext,
            context.ycFrameworks
          );
          updatePendingResults(runId, { financial_model: res, financial_status: 'completed' });
          return res;
        } catch (err) {
          console.warn(`[In-Memory Agent: Finance] Live call attempt 1 failed (${err}), retrying...`);
          try {
            await delay(2000);
            const res = await modelFinancials(
              idea,
              language,
              approvedBrief?.agent_directives?.financial_focus,
              context.drhpBenchmarks,
              context.pitchDeckContext,
              context.ycFrameworks
            );
            updatePendingResults(runId, { financial_model: res, financial_status: 'completed' });
            return res;
          } catch (retryErr) {
            console.error(`[In-Memory Agent: Finance] Agent failed after retry:`, retryErr);
            updatePendingResults(runId, { financial_status: 'failed' });
            return null;
          }
        }
      })(),
      (async () => {
        await delay(3600);
        updatePendingResults(runId, { legal_status: 'running' });
        try {
          const res = await analyzeLegalRegulatory(
            idea,
            language,
            approvedBrief?.agent_directives?.legal_focus,
            context.statutoryContext,
            context.courtPrecedents,
            context.pitchDeckContext
          );
          updatePendingResults(runId, { legal_regulatory: res, legal_status: 'completed' });
          return res;
        } catch (err) {
          console.warn(`[In-Memory Agent: Legal] Live call attempt 1 failed (${err}), retrying...`);
          try {
            await delay(2000);
            const res = await analyzeLegalRegulatory(
              idea,
              language,
              approvedBrief?.agent_directives?.legal_focus,
              context.statutoryContext,
              context.courtPrecedents,
              context.pitchDeckContext
            );
            updatePendingResults(runId, { legal_regulatory: res, legal_status: 'completed' });
            return res;
          } catch (retryErr) {
            console.error(`[In-Memory Agent: Legal] Agent failed after retry:`, retryErr);
            updatePendingResults(runId, { legal_status: 'failed' });
            return null;
          }
        }
      })(),
      (async () => {
        await delay(4800);
        updatePendingResults(runId, { global_status: 'running' });
        try {
          const res = await analyzeGlobalBenchmarks(
            idea,
            language,
            approvedBrief?.agent_directives?.global_focus,
            context.macroReport,
            context.pitchDeckContext
          );
          updatePendingResults(runId, { global_benchmarks: res, global_status: 'completed' });
          return res;
        } catch (err) {
          console.warn(`[In-Memory Agent: Global Precedents] Live call attempt 1 failed (${err}), retrying...`);
          try {
            await delay(2000);
            const res = await analyzeGlobalBenchmarks(
              idea,
              language,
              approvedBrief?.agent_directives?.global_focus,
              context.macroReport,
              context.pitchDeckContext
            );
            updatePendingResults(runId, { global_benchmarks: res, global_status: 'completed' });
            return res;
          } catch (retryErr) {
            console.error(`[In-Memory Agent: Global Precedents] Agent failed after retry:`, retryErr);
            updatePendingResults(runId, { global_status: 'failed' });
            return null;
          }
        }
      })(),
    ]);

    const agentResults = {
      competitors: competitors.status === 'fulfilled' ? competitors.value : null,
      tech: tech.status === 'fulfilled' ? tech.value : null,
      finance: finance.status === 'fulfilled' ? finance.value : null,
      legal: legal.status === 'fulfilled' ? legal.value : null,
      global: global.status === 'fulfilled' ? global.value : null,
    };

    // ── Phase 2: Synthesis Agent (combines all outputs + brief + VC memos) ──────────────
    updatePendingResults(runId, { synthesis_status: 'running' });
    let synthesisResult: Synthesis | null = null;
    try {
      synthesisResult = await synthesizeResults({
        idea,
        language,
        competitors: agentResults.competitors,
        tech: agentResults.tech,
        finance: agentResults.finance,
        legal: agentResults.legal,
        global: agentResults.global,
        brief: approvedBrief ?? null,
        pitchDeckContext: context.pitchDeckContext,
        vcMemos: context.vcMemos,
        drhpBenchmarks: context.drhpBenchmarks,
        statutoryContext: context.statutoryContext,
        patentLandscape: context.patentLandscape,
        ycFrameworks: context.ycFrameworks,
        macroReport: context.macroReport,
        driftAlert: context.driftAlert,
      });
      updatePendingResults(runId, {
        synthesis: synthesisResult,
        synthesis_status: 'completed',
      });
    } catch (err) {
      console.warn(`[In-Memory Agent: Synthesis] Attempt 1 failed, retrying in 2s:`, err);
      try {
        await delay(2000);
        synthesisResult = await synthesizeResults({
          idea,
          language,
          competitors: agentResults.competitors,
          tech: agentResults.tech,
          finance: agentResults.finance,
          legal: agentResults.legal,
          global: agentResults.global,
          brief: approvedBrief ?? null,
          pitchDeckContext: context.pitchDeckContext,
          vcMemos: context.vcMemos,
          drhpBenchmarks: context.drhpBenchmarks,
          statutoryContext: context.statutoryContext,
          patentLandscape: context.patentLandscape,
          ycFrameworks: context.ycFrameworks,
          macroReport: context.macroReport,
          driftAlert: context.driftAlert,
        });
        updatePendingResults(runId, {
          synthesis: synthesisResult,
          synthesis_status: 'completed',
        });
      } catch (retryErr) {
        console.error(`[In-Memory Agent: Synthesis] Agent failed after retry:`, retryErr);
        updatePendingResults(runId, {
          synthesis_status: 'failed',
        });
      }
    }

    // ── Phase 3: Adversarial Red-Team (Agent 7) ─────────────────────────────
    if (synthesisResult) {
      updatePendingResults(runId, { red_team_status: 'running' });
      try {
        const redTeam = await runRedTeamAnalysis({
          idea,
          language,
          synthesis: synthesisResult,
          brief: approvedBrief ?? null,
          pitchDeckContext: context.pitchDeckContext,
          patentLandscape: context.patentLandscape,
          ycFrameworks: context.ycFrameworks,
        });
        updatePendingResults(runId, {
          red_team: redTeam,
          red_team_status: 'completed',
        });
      } catch (err) {
        console.warn('[In-Memory Agent: Red-Team] Attempt 1 failed, retrying in 2s:', err);
        try {
          await delay(2000);
          const redTeam = await runRedTeamAnalysis({
            idea,
            language,
            synthesis: synthesisResult,
            brief: approvedBrief ?? null,
            pitchDeckContext: context.pitchDeckContext,
            patentLandscape: context.patentLandscape,
            ycFrameworks: context.ycFrameworks,
          });
          updatePendingResults(runId, {
            red_team: redTeam,
            red_team_status: 'completed',
          });
        } catch (retryErr) {
          console.error('[In-Memory Agent: Red-Team] Agent failed after retry:', retryErr);
          updatePendingResults(runId, {
            red_team_status: 'failed',
          });
        }
      }
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
