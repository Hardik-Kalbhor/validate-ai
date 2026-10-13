import type { ValidationBrief } from '@/schemas/brief.schema';
import { getPendingRunsByUser, getPendingResults, type PendingRun } from './pending-runs.ts';
import type { SupabaseClient } from '@supabase/supabase-js';

export interface PriorRunSummary {
  runId: string;
  createdAt: string;
  ideaText: string;
  businessType: string;
  brief?: ValidationBrief | null;
}

export interface DriftAlertData {
  priorRunId: string;
  priorRunDate: string;
  priorIdeaSummary: string;
  drifts: Array<{
    dimension: 'target_tier' | 'business_model' | 'monetization' | 'core_positioning';
    previousAssumption: string;
    currentAssumption: string;
    strategicImplication: string;
  }>;
}

/**
 * Retrieves up to 3 prior validation runs for a given user to enable cross-run pivot tracking.
 */
export async function getPriorRunsForUser(
  userId?: string,
  admin?: SupabaseClient
): Promise<PriorRunSummary[]> {
  if (!userId) return [];

  // Try DB first if admin client provided
  if (admin) {
    try {
      const { data: runs, error } = await admin
        .from('validation_runs')
        .select('id, created_at, idea_text, business_type')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(4);

      if (!error && runs && runs.length > 0) {
        // Fetch brief for these runs
        const runIds = runs.map((r) => r.id);
        const { data: results } = await admin
          .from('validation_results')
          .select('run_id, brief')
          .in('run_id', runIds);

        const briefMap = new Map((results || []).map((res) => [res.run_id, res.brief as ValidationBrief]));

        return runs.map((r) => ({
          runId: r.id,
          createdAt: r.created_at,
          ideaText: r.idea_text,
          businessType: r.business_type,
          brief: briefMap.get(r.id) || null,
        }));
      }
    } catch {
      // Fall through to in-memory store
    }
  }

  // Fallback: check in-memory store
  const inMemory = getPendingRunsByUser(userId);
  return inMemory
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 4)
    .map((r: PendingRun) => {
      const res = getPendingResults(r.id);
      return {
        runId: r.id,
        createdAt: r.created_at,
        ideaText: r.idea_text,
        businessType: r.business_type,
        brief: res?.brief || null,
      };
    });
}

/**
 * Compares current run assumptions against the most recent prior run to detect assumption drift.
 */
export function detectAssumptionDrift(
  currentRunId: string,
  currentIdea: string,
  currentBrief?: ValidationBrief | null,
  priorRuns?: PriorRunSummary[]
): DriftAlertData | null {
  if (!priorRuns || priorRuns.length === 0) return null;

  // Find the most recent run that is NOT the current run
  const prior = priorRuns.find((r) => r.runId !== currentRunId);
  if (!prior) return null;

  const drifts: DriftAlertData['drifts'] = [];

  // Compare business model if briefs exist
  if (currentBrief && prior.brief) {
    if (currentBrief.target_audience.business_model !== prior.brief.target_audience.business_model) {
      drifts.push({
        dimension: 'business_model',
        previousAssumption: prior.brief.target_audience.business_model.toUpperCase(),
        currentAssumption: currentBrief.target_audience.business_model.toUpperCase(),
        strategicImplication: `Shifted from ${prior.brief.target_audience.business_model} to ${currentBrief.target_audience.business_model}. Sales cycle, margin structure, and go-to-market funnel will require completely different acquisition channels.`,
      });
    }

    if (currentBrief.target_audience.tier_focus !== prior.brief.target_audience.tier_focus) {
      drifts.push({
        dimension: 'target_tier',
        previousAssumption: prior.brief.target_audience.tier_focus.replace(/_/g, ' ').toUpperCase(),
        currentAssumption: currentBrief.target_audience.tier_focus.replace(/_/g, ' ').toUpperCase(),
        strategicImplication: `Geographic focus shifted from ${prior.brief.target_audience.tier_focus} to ${currentBrief.target_audience.tier_focus}. Willingness-to-pay, vernacular language support, and delivery density dynamics will fundamentally alter unit economics.`,
      });
    }

    if (
      currentBrief.monetization_hypothesis &&
      prior.brief.monetization_hypothesis &&
      currentBrief.monetization_hypothesis !== prior.brief.monetization_hypothesis
    ) {
      drifts.push({
        dimension: 'monetization',
        previousAssumption: prior.brief.monetization_hypothesis.slice(0, 100),
        currentAssumption: currentBrief.monetization_hypothesis.slice(0, 100),
        strategicImplication: 'Monetization hypothesis has been recalibrated. Ensure customer willingness-to-pay is re-validated under this new pricing mechanism.',
      });
    }
  }

  // If text has significant change
  if (drifts.length === 0 && prior.ideaText.trim().toLowerCase() !== currentIdea.trim().toLowerCase()) {
    drifts.push({
      dimension: 'core_positioning',
      previousAssumption: prior.ideaText.slice(0, 120) + '...',
      currentAssumption: currentIdea.slice(0, 120) + '...',
      strategicImplication: 'Core problem statement or product framing has pivoted between runs. Downstream competitor analysis will reflect this shifted competitive set.',
    });
  }

  if (drifts.length === 0) return null;

  return {
    priorRunId: prior.runId,
    priorRunDate: new Date(prior.createdAt).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
    priorIdeaSummary: prior.brief?.formal_title || prior.ideaText.slice(0, 80) + '...',
    drifts,
  };
}
