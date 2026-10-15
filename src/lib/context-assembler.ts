import { getRelevantRegulatoryActs } from './regulatory-acts';
import { getDRHPBenchmarksForIdea } from './drhp-benchmarks';
import { getCourtPrecedentsForIdea } from './court-precedents';
import { getVCMemoExamples } from './vc-memos';
import { getYCFrameworksForIdea } from './yc-essays';
import { getMacroIndicators, formatMacroContext } from './macro-world-bank';
import {
  getEligibleGovernmentSchemes,
  formatGovernmentSchemesContext,
} from './government-schemes';
import {
  getRelevantStartupAutopsies,
  formatStartupAutopsyContext,
} from './startup-post-mortems';
import {
  getVCPartnerDefenseQuestions,
  formatVCPartnerDefenseContext,
} from './vc-defense-playbook';
import { formatComplianceContext } from './roc-compliance';
import {
  resolveCompetitorKeywords,
  fetchAppStoreReviews,
  fetchRedditSentiment,
  formatLiveSentimentContext,
} from './competitor-live-fetch';
import {
  getPriorRunsForUser,
  detectAssumptionDrift,
  type DriftAlertData,
} from './pivot-tracker';
import type { ValidationBrief } from '@/schemas/brief.schema';
import type { SupabaseClient } from '@supabase/supabase-js';

export interface EnrichedContextBundle {
  pitchDeckContext?: string;
  statutoryContext: string;
  drhpBenchmarks: string;
  courtPrecedents: string;
  vcMemos: string;
  patentLandscape: string;
  ycFrameworks: string;
  macroReport: string;
  liveSentiment: string;
  driftAlert: DriftAlertData | null;
  governmentSchemes: string;
  startupAutopsies: string;
  vcDefensePlaybook: string;
  rocCompliance: string;
}

export interface AssembleContextOptions {
  runId: string;
  idea: string;
  brief?: ValidationBrief | null;
  pitchDeckText?: string;
  userId?: string;
  admin?: SupabaseClient;
}

/**
 * Assembles all multi-source contextual knowledge packs in parallel:
 * - Pre-compiled Statutory Regulatory Corpus (Unabridged DPDP, RBI PA/PG, IT Act 79, FSSAI, CCPA Dark Patterns)
 * - Audited DRHP Unit Economics Benchmarks (Zomato, Delhivery, DeHaat/Ninjacart, Nykaa)
 * - Landmark Indian Court & Antitrust Precedents (CCI, Supreme Court Shreya Singhal)
 * - YC Venture Underwriting Frameworks & Failure Post-Mortems
 * - Central & State Government Startup Subsidies, Grants & Tax Holidays (SISFS, CGSS, 80-IAC, ELEVATE)
 * - 100+ Startup Post-Mortems & Historical Failure Patterns (Dunzo, TinyOwl, PepperTap, FrontRow)
 * - Tier-1 VC Partner Investment Committee Interrogation & Defense Playbook (Peak XV, Accel, Matrix)
 * - Statutory RoC & License Portal Filings Roadmap (MCA21 SPICe+, FoSCoS, FIRMS, Stamp Duty)
 * - World Bank Open API Macroeconomic Indicators (India)
 * - Live App Store Customer Reviews & Reddit Sentiment
 * - User Cross-Run Pivot & Assumption Drift Tracking
 */
export async function assembleEnrichedContext(
  options: AssembleContextOptions
): Promise<EnrichedContextBundle> {
  const { runId, idea, brief, pitchDeckText, userId, admin } = options;

  // 1. Instant Static Knowledge Packs (0ms)
  const statutoryContext = getRelevantRegulatoryActs(
    idea,
    brief?.agent_directives?.legal_focus
  );
  const drhpBenchmarks = getDRHPBenchmarksForIdea(idea);
  const courtPrecedents = getCourtPrecedentsForIdea(idea);
  const vcMemos = getVCMemoExamples();
  const patentLandscape = '';
  const ycFrameworks = getYCFrameworksForIdea(idea, brief?.target_audience?.business_model);

  // New High-Density Knowledge Packs
  const eligibleSchemes = getEligibleGovernmentSchemes(idea, brief?.target_audience?.business_model);
  const governmentSchemes = formatGovernmentSchemesContext(eligibleSchemes);

  const matchedAutopsies = getRelevantStartupAutopsies(idea, brief?.target_audience?.business_model);
  const startupAutopsies = formatStartupAutopsyContext(matchedAutopsies);

  const defenseQuestions = getVCPartnerDefenseQuestions(idea, brief?.target_audience?.business_model);
  const vcDefensePlaybook = formatVCPartnerDefenseContext(defenseQuestions);

  const rocCompliance = formatComplianceContext(idea, 'Karnataka');

  // Extract competitor target keywords for high-accuracy live sentiment
  const competitorCandidates = resolveCompetitorKeywords(
    idea,
    brief?.agent_directives?.competitor_focus
  );
  const primaryCompetitor = competitorCandidates[0] || 'Ninjacart';

  // 2. Parallel Fast-Resolving Async Sources (max 3.5s total)
  const [macroResult, appReviewsResult, redditResult, priorRunsResult] =
    await Promise.allSettled([
      getMacroIndicators(),
      fetchAppStoreReviews(primaryCompetitor),
      fetchRedditSentiment(competitorCandidates[0] || idea.slice(0, 30)),
      getPriorRunsForUser(userId, admin),
    ]);

  const macro = macroResult.status === 'fulfilled' ? macroResult.value : null;
  const macroReport = macro ? formatMacroContext(macro) : '';

  const appReviews = appReviewsResult.status === 'fulfilled' ? appReviewsResult.value : null;
  const redditPosts = redditResult.status === 'fulfilled' ? redditResult.value : null;
  const liveSentiment = formatLiveSentimentContext(
    primaryCompetitor,
    appReviews,
    redditPosts,
    idea
  );

  const priorRuns = priorRunsResult.status === 'fulfilled' ? priorRunsResult.value : [];
  const driftAlert = detectAssumptionDrift(runId, idea, brief, priorRuns);

  return {
    pitchDeckContext: pitchDeckText,
    statutoryContext,
    drhpBenchmarks,
    courtPrecedents,
    vcMemos,
    patentLandscape,
    ycFrameworks,
    macroReport,
    liveSentiment,
    driftAlert,
    governmentSchemes,
    startupAutopsies,
    vcDefensePlaybook,
    rocCompliance,
  };
}
