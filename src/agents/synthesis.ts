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
  vcDefensePlaybook?: string;
  governmentSchemes?: string;
}

/**
 * Agent 4: Synthesis (Dynamic AI Agent)
 * Deep reasoning over all parallel agent outputs, enriched by VC memos,
 * DRHP benchmarks, statutory acts, patent landscapes, YC post-mortems,
 * VC Partner IC defense interrogations, and cross-run pivot tracking using Google Gemini.
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
    vcDefensePlaybook,
    governmentSchemes,
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
    vcDefensePlaybook ? `TIER-1 VC PARTNER INVESTMENT COMMITTEE (IC) INTERROGATION & DEFENSE PLAYBOOK:\n${vcDefensePlaybook}` : null,
    governmentSchemes ? `GOVERNMENT STARTUP SUBSIDIES & NON-DILUTIVE GRANTS:\n${governmentSchemes}` : null,
  ].filter(Boolean).join('\n\n---\n\n');

  const { object } = await generateObject({
    model: geminiModel,
    schema: SynthesisSchema,
    abortSignal: AbortSignal.timeout(AGENT_TIMEOUT_MS),
    prompt: `You are the Lead Investment Partner and Chief Strategy Officer at a premier venture fund.
Review the comprehensive findings from all 5 specialized validation agents, audited DRHP benchmarks, technical patents, YC frameworks, VC partner interrogation questions, and statutory acts for this business idea:

IDEA: "${idea}"
OUTPUT LANGUAGE: ${language === 'hi' ? 'Hindi' : language === 'mr' ? 'Marathi' : 'English'}

DOSSIER:
${context}

Instructions:
1. Give an honest viability verdict based on the COMBINED evidence across local competitors, technical build, financials, regulatory compliance, international precedents, audited DRHP comps, patent landscapes, and VC defense playbooks.
2. Calculate a calibrated confidence score (0-100) reflecting real-world execution difficulty in India.
3. If assumption drift is noted above from prior validation runs, directly address whether the pivot improves or worsens venture viability.
4. Identify the 3-6 MOST IMPORTANT risks with specific mitigations — include regulatory traps, patent barriers, and risks learned from international and public peers.
5. Provide actionable, high-impact strategic improvements and optimizations that the founder should immediately execute to raise institutional funding.
6. Synthesize realistic go-to-market opportunities with specific timeframe and business impact estimates.`,
  });

  if (!object) {
    throw new Error('Synthesis agent returned empty output');
  }

  return object;
}
