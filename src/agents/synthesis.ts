import { generateObject } from 'ai';
import { geminiModel, AGENT_TIMEOUT_MS } from '@/lib/ai';
import { SynthesisSchema, type Synthesis } from '@/schemas/synthesis.schema';
import type { CompetitorAnalysis } from '@/schemas/competitor.schema';
import type { TechFeasibility } from '@/schemas/tech-feasibility.schema';
import type { FinancialModel } from '@/schemas/financial-model.schema';
import type { LegalRegulatory } from '@/schemas/legal-regulatory.schema';
import type { GlobalPrecedents } from '@/schemas/global-precedents.schema';
import type { ValidationBrief } from '@/schemas/brief.schema';

import type { DriftAlertData } from '@/lib/pivot-tracker';

interface SynthesisInput {
  idea: string;
  language: string;
  competitors: CompetitorAnalysis | null;
  tech: TechFeasibility | null;
  finance: FinancialModel | null;
  legal: LegalRegulatory | null;
  global?: GlobalPrecedents | null;
  brief?: ValidationBrief | null;
  pitchDeckContext?: string;
  vcMemos?: string;
  drhpBenchmarks?: string;
  statutoryContext?: string;
  patentLandscape?: string;
  ycFrameworks?: string;
  macroReport?: string;
  driftAlert?: DriftAlertData | null;
}

/**
 * Agent 4: Synthesis (Dynamic AI Agent)
 * Deep reasoning over all parallel agent outputs, enriched by VC memos,
 * DRHP benchmarks, statutory acts, patent landscapes, YC post-mortems, and cross-run pivot tracking using Google Gemini.
 */
export async function synthesizeResults(input: SynthesisInput): Promise<Synthesis> {
  const {
    idea,
    language,
    competitors,
    tech,
    finance,
    legal,
    global,
    brief,
    pitchDeckContext,
    vcMemos,
    drhpBenchmarks,
    statutoryContext,
    patentLandscape,
    ycFrameworks,
    macroReport,
    driftAlert,
  } = input;

  const context = [
    brief ? `VALIDATION BRIEF (APPROVED ASSUMPTIONS & HYPOTHESES):\n${JSON.stringify(brief, null, 2)}` : null,
    pitchDeckContext ? `PITCH DECK CONTEXT:\n${pitchDeckContext.slice(0, 25000)}` : null,
    driftAlert ? `CROSS-RUN PIVOT & ASSUMPTION DRIFT DETECTED:\n${JSON.stringify(driftAlert, null, 2)}` : null,
    competitors ? `COMPETITOR ANALYSIS:\n${JSON.stringify(competitors, null, 2)}` : 'Competitor analysis unavailable.',
    tech ? `TECHNICAL FEASIBILITY:\n${JSON.stringify(tech, null, 2)}` : 'Tech feasibility unavailable.',
    finance ? `FINANCIAL MODEL:\n${JSON.stringify(finance, null, 2)}` : 'Financial model unavailable.',
    legal ? `LEGAL & REGULATORY ANALYSIS:\n${JSON.stringify(legal, null, 2)}` : 'Legal analysis unavailable.',
    global ? `GLOBAL BENCHMARKS & INTERNATIONAL PRECEDENTS:\n${JSON.stringify(global, null, 2)}` : 'Global benchmarks unavailable.',
    statutoryContext ? `INDIAN STATUTORY REGULATORY FRAMEWORKS & ACTS:\n${statutoryContext}` : null,
    drhpBenchmarks ? `SEBI AUDITED DRHP COMPARABLES & RESTATED P&L BENCHMARKS:\n${drhpBenchmarks}` : null,
    patentLandscape ? `TECHNICAL PATENT LANDSCAPE & FREEDOM-TO-OPERATE DISCLOSURES:\n${patentLandscape}` : null,
    ycFrameworks ? `YC VENTURE UNDERWRITING FRAMEWORKS & FAILURE POST-MORTEMS:\n${ycFrameworks}` : null,
    macroReport ? `MACROECONOMIC LANDSCAPE (India):\n${macroReport}` : null,
    vcMemos ? `TIER-1 VC PARTNER INVESTMENT MEMO BENCHMARKS (MODEL REASONING):\n${vcMemos}` : null,
  ].filter(Boolean).join('\n\n---\n\n');

  const { object } = await generateObject({
    model: geminiModel,
    schema: SynthesisSchema,
    abortSignal: AbortSignal.timeout(AGENT_TIMEOUT_MS),
    prompt: `You are a senior venture analyst and partner at a top Indian VC firm with 15+ years of experience.

Synthesize ALL the extensive research and evidence below into a comprehensive, deeply grounded verdict for this business idea:

IDEA: "${idea}"
OUTPUT LANGUAGE: ${language === 'hi' ? 'Hindi' : language === 'mr' ? 'Marathi' : 'English'}

RESEARCH DATA & GROUNDING DOSSIER:
${context}

Your task:
1. Give an honest viability verdict based on the COMBINED evidence across local competitors, technical build, financials, regulatory compliance, international precedents, audited DRHP comps, and patent landscapes.
   CRITICAL: If the legal analysis shows 'has_blocker_issues: true', the verdict CANNOT be 'highly_viable'.
2. Assign a confidence score (0-100) reflecting how strong the empirical evidence is overall.
3. Write a sharp executive summary (3-4 sentences) that captures the core insight, factoring in international model validation, Indian market readiness, and realistic unit economics.
4. Identify the 3-6 MOST IMPORTANT risks with specific mitigations — include regulatory traps, patent barriers, and risks learned from international and public peers.
5. Identify the 3-6 BEST opportunities, prioritized by impact and timing.
6. Define a clear, prioritized action plan — what should the founder do FIRST?
   (Regulatory filings / entity incorporation / pilot FPO agreements often must precede product launch.)
7. Score each dimension 0-100 based on the data, not assumptions:
   - market_opportunity: strength of market, TAM, and growth
   - competitive_position: differentiation vs existing players
   - technical_feasibility: build complexity and timeline
   - financial_viability: unit economics and path to profitability
   - legal_compliance: regulatory clarity (100 = low burden, 0 = severe blockers)

Be decisive, intellectually rigorous, and actionable. Indian entrepreneurs need hard truth and operational clarity.`,
  });

  if (!object) {
    throw new Error('Synthesis returned empty output');
  }

  return object;
}
