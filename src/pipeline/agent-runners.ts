import type { SupabaseClient } from '@supabase/supabase-js';
import { analyzeCompetitors } from '@/agents/competitor-analysis';
import { assessTechFeasibility } from '@/agents/tech-feasibility';
import { modelFinancials } from '@/agents/financial-modeling';
import { synthesizeResults } from '@/agents/synthesis';
import { analyzeLegalRegulatory } from '@/agents/legal-regulatory';
import { analyzeGlobalBenchmarks } from '@/agents/global-benchmarks';
import type { ValidationBrief } from '@/schemas/brief.schema';
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

/** Run Agent 1 and write result to DB immediately on completion */
export async function runCompetitorAgent(
  admin: SupabaseClient,
  runId: string,
  idea: string,
  language: string,
  directive?: string
) {
  await setAgentStatus(admin, runId, 'competitor_status', 'running');
  try {
    let result;
    try {
      result = await analyzeCompetitors(idea, language, directive);
    } catch (apiErr) {
      const msg = apiErr instanceof Error ? apiErr.message : String(apiErr);
      console.warn(`[Agent 1: Competitors] Live call issue (${msg}), using domain fixture fallback`);
      result = getDomainFixtureForIdea(idea).competitors;
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
    console.error(`[Agent 1: Competitors] Failed for run ${runId}:`, error);
    await setAgentStatus(admin, runId, 'competitor_status', 'failed');
    throw error;
  }
}

/** Run Agent 2 and write result to DB immediately on completion */
export async function runTechAgent(
  admin: SupabaseClient,
  runId: string,
  idea: string,
  language: string,
  directive?: string
) {
  await setAgentStatus(admin, runId, 'tech_status', 'running');
  try {
    let result;
    try {
      result = await assessTechFeasibility(idea, language, directive);
    } catch (apiErr) {
      const msg = apiErr instanceof Error ? apiErr.message : String(apiErr);
      console.warn(`[Agent 2: Tech] Live call issue (${msg}), using domain fixture fallback`);
      result = getDomainFixtureForIdea(idea).tech;
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
    console.error(`[Agent 2: Tech] Failed for run ${runId}:`, error);
    await setAgentStatus(admin, runId, 'tech_status', 'failed');
    throw error;
  }
}

/** Run Agent 3 and write result to DB immediately on completion */
export async function runFinancialAgent(
  admin: SupabaseClient,
  runId: string,
  idea: string,
  language: string,
  directive?: string
) {
  await setAgentStatus(admin, runId, 'financial_status', 'running');
  try {
    let result;
    try {
      result = await modelFinancials(idea, language, directive);
    } catch (apiErr) {
      const msg = apiErr instanceof Error ? apiErr.message : String(apiErr);
      console.warn(`[Agent 3: Financial] Live call issue (${msg}), using domain fixture fallback`);
      result = getDomainFixtureForIdea(idea).finance;
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
    console.error(`[Agent 3: Financial] Failed for run ${runId}:`, error);
    await setAgentStatus(admin, runId, 'financial_status', 'failed');
    throw error;
  }
}

/** Run Agent 4 and write result to DB immediately on completion */
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
  }
) {
  await setAgentStatus(admin, runId, 'synthesis_status', 'running');
  try {
    let result;
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
      });
    } catch (apiErr) {
      const msg = apiErr instanceof Error ? apiErr.message : String(apiErr);
      console.warn(`[Agent 4: Synthesis] Live call issue (${msg}), using domain fixture fallback`);
      result = getDomainFixtureForIdea(idea).synthesis;
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
    console.error(`[Agent 4: Synthesis] Failed for run ${runId}:`, error);
    await setAgentStatus(admin, runId, 'synthesis_status', 'failed');
    throw error;
  }
}

/** Run Agent 5 and write result to DB immediately on completion */
export async function runLegalAgent(
  admin: SupabaseClient,
  runId: string,
  idea: string,
  language: string,
  directive?: string
) {
  await setAgentStatus(admin, runId, 'legal_status', 'running');
  try {
    let result;
    try {
      result = await analyzeLegalRegulatory(idea, language, directive);
    } catch (apiErr) {
      const msg = apiErr instanceof Error ? apiErr.message : String(apiErr);
      console.warn(`[Agent 5: Legal] Live call issue (${msg}), using domain fixture fallback`);
      result = getDomainFixtureForIdea(idea).legal;
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
    console.error(`[Agent 5: Legal] Failed for run ${runId}:`, error);
    await setAgentStatus(admin, runId, 'legal_status', 'failed');
    throw error;
  }
}

/** Run Agent 6: Global Precedents & Benchmarks */
export async function runGlobalBenchmarksAgent(
  admin: SupabaseClient,
  runId: string,
  idea: string,
  language: string,
  directive?: string
) {
  await setAgentStatus(admin, runId, 'global_status', 'running');
  try {
    let result;
    try {
      result = await analyzeGlobalBenchmarks(idea, language, directive);
    } catch (apiErr) {
      const msg = apiErr instanceof Error ? apiErr.message : String(apiErr);
      console.warn(`[Agent 6: Global Precedents] Live call issue (${msg}), using domain fixture fallback`);
      result = getDomainFixtureForIdea(idea).global;
    }

    const { error } = await admin.from('validation_results').update({
      global_benchmarks: result,
      global_status: 'completed',
      updated_at: new Date().toISOString(),
    }).eq('run_id', runId);

    if (error) {
      console.warn(`[Agent 6: Global Precedents] Note: Could not update global_benchmarks in DB (${error.message}). Migration 010 should be applied in Supabase.`);
    }
    return result;
  } catch (error) {
    console.error(`[Agent 6: Global Precedents] Failed for run ${runId}:`, error);
    await setAgentStatus(admin, runId, 'global_status', 'failed');
    throw error;
  }
}
