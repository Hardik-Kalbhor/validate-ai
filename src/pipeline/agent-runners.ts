import type { SupabaseClient } from '@supabase/supabase-js';
import { analyzeCompetitors } from '@/agents/competitor-analysis';
import { assessTechFeasibility } from '@/agents/tech-feasibility';
import { modelFinancials } from '@/agents/financial-modeling';
import { synthesizeResults } from '@/agents/synthesis';
import { analyzeLegalRegulatory } from '@/agents/legal-regulatory';
import { analyzeGlobalBenchmarks } from '@/agents/global-benchmarks';
import { runRedTeamAnalysis } from '@/agents/red-team';
import type { ValidationBrief } from '@/schemas/brief.schema';
import type { Synthesis } from '@/schemas/synthesis.schema';
import type { DriftAlertData } from '@/lib/pivot-tracker';
import type { EnrichedContextBundle } from '@/lib/context-assembler';
import { getDomainFixtureForIdea } from '@/lib/demo-data';

type AgentStatus = 'running' | 'completed' | 'failed';

/** Update a single agent's status in the DB (triggers Supabase Realtime) */
async function setAgentStatus(
  admin: SupabaseClient,
  runId: string,
  field: string,
  status: AgentStatus
) {
  const { error } = await admin
    .from('validation_results')
    .update({ [field]: status, updated_at: new Date().toISOString() })
    .eq('run_id', runId);
  if (error) {
    console.warn(`[setAgentStatus] Warning updating ${field} to ${status} for run ${runId}:`, error.message);
  }
}

/** Save approved Phase 0 brief to DB */
export async function saveApprovedBrief(
  admin: SupabaseClient,
  runId: string,
  brief: ValidationBrief
) {
  try {
    const { error } = await admin.from('validation_results').update({
      brief,
      brief_status: 'completed',
      updated_at: new Date().toISOString(),
    }).eq('run_id', runId);
    if (error) {
      console.warn(`[Save Brief] Column 'brief' may not exist in DB:`, error.message);
    }
  } catch (error) {
    console.warn(`[Save Brief] Failed for run ${runId}:`, error);
  }
}

/** Save detected assumption drift to DB */
export async function saveDriftAlert(
  admin: SupabaseClient,
  runId: string,
  driftAlert: DriftAlertData | null
) {
  if (!driftAlert) return;
  try {
    const { error } = await admin.from('validation_results').update({
      drift_alert: driftAlert,
      updated_at: new Date().toISOString(),
    }).eq('run_id', runId);
    if (error) {
      console.warn(`[Save Drift Alert] DB column 'drift_alert' notice:`, error.message);
    }
  } catch (error) {
    console.warn(`[Save Drift Alert] Failed for run ${runId}:`, error);
  }
}

/** Run Agent 1 and write result to DB immediately on completion */
export async function runCompetitorAgent(
  admin: SupabaseClient,
  runId: string,
  idea: string,
  language: string,
  directive?: string,
  liveSentiment?: string,
  pitchDeckContext?: string
) {
  await setAgentStatus(admin, runId, 'competitor_status', 'running');
  try {
    let result;
    try {
      result = await analyzeCompetitors(idea, language, directive, liveSentiment, pitchDeckContext);
    } catch (apiErr) {
      console.warn(`[Agent 1: Competitors] Live call attempt 1 failed (${apiErr}), retrying...`);
      await new Promise((r) => setTimeout(r, 2000));
      result = await analyzeCompetitors(idea, language, directive, liveSentiment, pitchDeckContext);
    }

    const { error } = await admin.from('validation_results').update({
      competitors: result,
      competitor_status: 'completed',
      updated_at: new Date().toISOString(),
    }).eq('run_id', runId);
    if (error) {
      console.warn(`[Agent 1] DB update error:`, error.message);
    }
    return result;
  } catch (error) {
    console.warn(`[Agent 1: Competitors] Failed for run ${runId}, falling back to domain fixture:`, error);
    const fixture = getDomainFixtureForIdea(idea);
    try {
      await admin.from('validation_results').update({
        competitors: fixture.competitors,
        competitor_status: 'completed',
        updated_at: new Date().toISOString(),
      }).eq('run_id', runId);
    } catch (dbErr) {
      console.warn(`[Agent 1] DB fallback update warning:`, dbErr);
    }
    return fixture.competitors;
  }
}

/** Run Agent 2 and write result to DB immediately on completion */
export async function runTechAgent(
  admin: SupabaseClient,
  runId: string,
  idea: string,
  language: string,
  directive?: string,
  pitchDeckContext?: string,
  patentLandscape?: string
) {
  await setAgentStatus(admin, runId, 'tech_status', 'running');
  try {
    let result;
    try {
      result = await assessTechFeasibility(idea, language, directive, pitchDeckContext, patentLandscape);
    } catch (apiErr) {
      console.warn(`[Agent 2: Tech] Live call attempt 1 failed (${apiErr}), retrying...`);
      await new Promise((r) => setTimeout(r, 2000));
      result = await assessTechFeasibility(idea, language, directive, pitchDeckContext, patentLandscape);
    }

    const { error } = await admin.from('validation_results').update({
      tech_feasibility: result,
      tech_status: 'completed',
      updated_at: new Date().toISOString(),
    }).eq('run_id', runId);
    if (error) {
      console.warn(`[Agent 2] DB update error:`, error.message);
    }
    return result;
  } catch (error) {
    console.warn(`[Agent 2: Tech] Failed for run ${runId}, falling back to domain fixture:`, error);
    const fixture = getDomainFixtureForIdea(idea);
    try {
      await admin.from('validation_results').update({
        tech_feasibility: fixture.tech,
        tech_status: 'completed',
        updated_at: new Date().toISOString(),
      }).eq('run_id', runId);
    } catch (dbErr) {
      console.warn(`[Agent 2] DB fallback update warning:`, dbErr);
    }
    return fixture.tech;
  }
}

/** Run Agent 3 and write result to DB immediately on completion */
export async function runFinancialAgent(
  admin: SupabaseClient,
  runId: string,
  idea: string,
  language: string,
  directive?: string,
  drhpBenchmarks?: string,
  pitchDeckContext?: string,
  ycFrameworks?: string
) {
  await setAgentStatus(admin, runId, 'financial_status', 'running');
  try {
    let result;
    try {
      result = await modelFinancials(idea, language, directive, drhpBenchmarks, pitchDeckContext, ycFrameworks);
    } catch (apiErr) {
      console.warn(`[Agent 3: Financial] Live call attempt 1 failed (${apiErr}), retrying...`);
      await new Promise((r) => setTimeout(r, 2000));
      result = await modelFinancials(idea, language, directive, drhpBenchmarks, pitchDeckContext, ycFrameworks);
    }

    const { error } = await admin.from('validation_results').update({
      financial_model: result,
      financial_status: 'completed',
      updated_at: new Date().toISOString(),
    }).eq('run_id', runId);
    if (error) {
      console.warn(`[Agent 3] DB update error:`, error.message);
    }
    return result;
  } catch (error) {
    console.warn(`[Agent 3: Financial] Failed for run ${runId}, falling back to domain fixture:`, error);
    const fixture = getDomainFixtureForIdea(idea);
    try {
      await admin.from('validation_results').update({
        financial_model: fixture.finance,
        financial_status: 'completed',
        updated_at: new Date().toISOString(),
      }).eq('run_id', runId);
    } catch (dbErr) {
      console.warn(`[Agent 3] DB fallback update warning:`, dbErr);
    }
    return fixture.finance;
  }
}

/** Run Agent 5 and write result to DB immediately on completion */
export async function runLegalAgent(
  admin: SupabaseClient,
  runId: string,
  idea: string,
  language: string,
  directive?: string,
  statutoryContext?: string,
  courtPrecedents?: string,
  pitchDeckContext?: string
) {
  await setAgentStatus(admin, runId, 'legal_status', 'running');
  try {
    let result;
    try {
      result = await analyzeLegalRegulatory(
        idea,
        language,
        directive,
        statutoryContext,
        courtPrecedents,
        pitchDeckContext
      );
    } catch (apiErr) {
      console.warn(`[Agent 5: Legal] Live call attempt 1 failed (${apiErr}), retrying...`);
      await new Promise((r) => setTimeout(r, 2000));
      result = await analyzeLegalRegulatory(
        idea,
        language,
        directive,
        statutoryContext,
        courtPrecedents,
        pitchDeckContext
      );
    }

    const { error } = await admin.from('validation_results').update({
      legal_regulatory: result,
      legal_status: 'completed',
      updated_at: new Date().toISOString(),
    }).eq('run_id', runId);
    if (error) {
      console.warn(`[Agent 5] DB update error:`, error.message);
    }
    return result;
  } catch (error) {
    console.warn(`[Agent 5: Legal] Failed for run ${runId}, falling back to domain fixture:`, error);
    const fixture = getDomainFixtureForIdea(idea);
    try {
      await admin.from('validation_results').update({
        legal_regulatory: fixture.legal,
        legal_status: 'completed',
        updated_at: new Date().toISOString(),
      }).eq('run_id', runId);
    } catch (dbErr) {
      console.warn(`[Agent 5] DB fallback update warning:`, dbErr);
    }
    return fixture.legal;
  }
}

/** Run Agent 6: Global Precedents & Benchmarks */
export async function runGlobalBenchmarksAgent(
  admin: SupabaseClient,
  runId: string,
  idea: string,
  language: string,
  directive?: string,
  macroReport?: string,
  pitchDeckContext?: string
) {
  await setAgentStatus(admin, runId, 'global_status', 'running');
  try {
    let result;
    try {
      result = await analyzeGlobalBenchmarks(
        idea,
        language,
        directive,
        macroReport,
        pitchDeckContext
      );
    } catch (apiErr) {
      console.warn(`[Agent 6: Global Precedents] Live call attempt 1 failed (${apiErr}), retrying...`);
      await new Promise((r) => setTimeout(r, 2000));
      result = await analyzeGlobalBenchmarks(
        idea,
        language,
        directive,
        macroReport,
        pitchDeckContext
      );
    }

    const { error } = await admin.from('validation_results').update({
      global_benchmarks: result,
      global_status: 'completed',
      updated_at: new Date().toISOString(),
    }).eq('run_id', runId);

    if (error) {
      console.warn(`[Agent 6: Global Precedents] Note: Could not update global_benchmarks in DB (${error.message}).`);
    }
    return result;
  } catch (error) {
    console.warn(`[Agent 6: Global Precedents] Failed for run ${runId}, falling back to domain fixture:`, error);
    const fixture = getDomainFixtureForIdea(idea);
    try {
      await admin.from('validation_results').update({
        global_benchmarks: fixture.global,
        global_status: 'completed',
        updated_at: new Date().toISOString(),
      }).eq('run_id', runId);
    } catch (dbErr) {
      console.warn(`[Agent 6] DB fallback update warning:`, dbErr);
    }
    return fixture.global;
  }
}

/** Run Agent 4: Synthesis with Enriched Multi-Source Dossier */
export async function runSynthesisAgent(
  admin: SupabaseClient,
  runId: string,
  idea: string,
  language: string,
  agentResults: {
    competitors: unknown;
    tech: unknown;
    finance: unknown;
    legal: unknown;
    global?: unknown;
    brief?: unknown;
  },
  contextBundle?: Partial<EnrichedContextBundle>
) {
  await setAgentStatus(admin, runId, 'synthesis_status', 'running');
  try {
    let result: Synthesis;
    try {
      result = await synthesizeResults({
        idea,
        language,
        competitors: agentResults.competitors as Parameters<typeof synthesizeResults>[0]['competitors'],
        tech: agentResults.tech as Parameters<typeof synthesizeResults>[0]['tech'],
        finance: agentResults.finance as Parameters<typeof synthesizeResults>[0]['finance'],
        legal: agentResults.legal as Parameters<typeof synthesizeResults>[0]['legal'],
        global: agentResults.global as Parameters<typeof synthesizeResults>[0]['global'],
        brief: agentResults.brief as Parameters<typeof synthesizeResults>[0]['brief'],
        pitchDeckContext: contextBundle?.pitchDeckContext,
        vcMemos: contextBundle?.vcMemos,
        drhpBenchmarks: contextBundle?.drhpBenchmarks,
        statutoryContext: contextBundle?.statutoryContext,
        patentLandscape: contextBundle?.patentLandscape,
        ycFrameworks: contextBundle?.ycFrameworks,
        macroReport: contextBundle?.macroReport,
        driftAlert: contextBundle?.driftAlert,
      });
    } catch (apiErr) {
      console.warn(`[Agent 4: Synthesis] Live call attempt 1 failed (${apiErr}), retrying...`);
      await new Promise((r) => setTimeout(r, 2000));
      result = await synthesizeResults({
        idea,
        language,
        competitors: agentResults.competitors as Parameters<typeof synthesizeResults>[0]['competitors'],
        tech: agentResults.tech as Parameters<typeof synthesizeResults>[0]['tech'],
        finance: agentResults.finance as Parameters<typeof synthesizeResults>[0]['finance'],
        legal: agentResults.legal as Parameters<typeof synthesizeResults>[0]['legal'],
        global: agentResults.global as Parameters<typeof synthesizeResults>[0]['global'],
        brief: agentResults.brief as Parameters<typeof synthesizeResults>[0]['brief'],
        pitchDeckContext: contextBundle?.pitchDeckContext,
        vcMemos: contextBundle?.vcMemos,
        drhpBenchmarks: contextBundle?.drhpBenchmarks,
        statutoryContext: contextBundle?.statutoryContext,
        patentLandscape: contextBundle?.patentLandscape,
        ycFrameworks: contextBundle?.ycFrameworks,
        macroReport: contextBundle?.macroReport,
        driftAlert: contextBundle?.driftAlert,
      });
    }

    const { error } = await admin.from('validation_results').update({
      synthesis: result,
      synthesis_status: 'completed',
      updated_at: new Date().toISOString(),
    }).eq('run_id', runId);
    if (error) {
      console.warn(`[Agent 4] DB update error:`, error.message);
    }
    return result;
  } catch (error) {
    console.warn(`[Agent 4: Synthesis] Failed for run ${runId}, falling back to domain fixture:`, error);
    const fixture = getDomainFixtureForIdea(idea);
    try {
      await admin.from('validation_results').update({
        synthesis: fixture.synthesis,
        synthesis_status: 'completed',
        updated_at: new Date().toISOString(),
      }).eq('run_id', runId);
    } catch (dbErr) {
      console.warn(`[Agent 4] DB fallback update warning:`, dbErr);
    }
    return fixture.synthesis;
  }
}

/** Run Agent 7: Adversarial Red-Team Analysis */
export async function runRedTeamAgent(
  admin: SupabaseClient,
  runId: string,
  idea: string,
  language: string,
  synthesis: Synthesis,
  brief?: ValidationBrief | null,
  pitchDeckContext?: string,
  patentLandscape?: string,
  ycFrameworks?: string
) {
  await setAgentStatus(admin, runId, 'red_team_status', 'running');
  try {
    const result = await runRedTeamAnalysis({
      idea,
      language,
      synthesis,
      brief,
      pitchDeckContext,
      patentLandscape,
      ycFrameworks,
    });

    const { error } = await admin.from('validation_results').update({
      red_team: result,
      red_team_status: 'completed',
      updated_at: new Date().toISOString(),
    }).eq('run_id', runId);

    if (error) {
      console.warn(`[Agent 7: Red-Team] DB update notice:`, error.message);
    }
    return result;
  } catch (error) {
    console.error(`[Agent 7: Red-Team] Failed for run ${runId}:`, error);
    await setAgentStatus(admin, runId, 'red_team_status', 'failed');
    throw error;
  }
}
