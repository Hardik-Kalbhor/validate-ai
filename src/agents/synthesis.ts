import { generateObject } from 'ai';
import { geminiModel, AGENT_TIMEOUT_MS } from '@/lib/ai';
import { SynthesisSchema, type Synthesis } from '@/schemas/synthesis.schema';
import type { CompetitorAnalysis } from '@/schemas/competitor.schema';
import type { TechFeasibility } from '@/schemas/tech-feasibility.schema';
import type { FinancialModel } from '@/schemas/financial-model.schema';
import type { LegalRegulatory } from '@/schemas/legal-regulatory.schema';
import type { GlobalPrecedents } from '@/schemas/global-precedents.schema';

interface SynthesisInput {
  idea: string;
  language: string;
  competitors: CompetitorAnalysis | null;
  tech: TechFeasibility | null;
  finance: FinancialModel | null;
  legal: LegalRegulatory | null;
  global?: GlobalPrecedents | null;
}

/**
 * Agent 4: Synthesis (Dynamic AI Agent)
 * Deep reasoning over all parallel agent outputs (Competitors, Tech, Finance, Legal, Global Precedents) using Google Gemini.
 */
export async function synthesizeResults(input: SynthesisInput): Promise<Synthesis> {
  const { idea, language, competitors, tech, finance, legal, global } = input;

  const context = [
    competitors ? `COMPETITOR ANALYSIS:\n${JSON.stringify(competitors, null, 2)}` : 'Competitor analysis unavailable.',
    tech ? `TECHNICAL FEASIBILITY:\n${JSON.stringify(tech, null, 2)}` : 'Tech feasibility unavailable.',
    finance ? `FINANCIAL MODEL:\n${JSON.stringify(finance, null, 2)}` : 'Financial model unavailable.',
    legal ? `LEGAL & REGULATORY ANALYSIS:\n${JSON.stringify(legal, null, 2)}` : 'Legal analysis unavailable.',
    global ? `GLOBAL BENCHMARKS & INTERNATIONAL PRECEDENTS:\n${JSON.stringify(global, null, 2)}` : 'Global benchmarks unavailable.',
  ].join('\n\n---\n\n');

  const { object } = await generateObject({
    model: geminiModel,
    schema: SynthesisSchema,
    abortSignal: AbortSignal.timeout(AGENT_TIMEOUT_MS),
    prompt: `You are a senior venture analyst at a top Indian VC firm with 15+ years of experience.

Synthesize ALL the research below into a comprehensive verdict for this business idea:

IDEA: "${idea}"
OUTPUT LANGUAGE: ${language === 'hi' ? 'Hindi' : language === 'mr' ? 'Marathi' : 'English'}

RESEARCH DATA:
${context}

Your task:
1. Give an honest viability verdict based on the COMBINED evidence across local competitors, technical build, financials, regulatory compliance, and international precedents.
   CRITICAL: If the legal analysis shows 'has_blocker_issues: true', the verdict CANNOT be 'highly_viable'.
2. Assign a confidence score (0-100) reflecting how strong the evidence is overall.
3. Write a sharp executive summary (3-4 sentences) that captures the core insight, factoring in international model validation and Indian market readiness.
4. Identify the 3-6 MOST IMPORTANT risks with specific mitigations — include regulatory traps and risks learned from international peers.
5. Identify the 3-6 BEST opportunities, prioritized by impact and timing.
6. Define a clear, prioritized action plan — what should the founder do FIRST?
   (Regulatory filings / entity incorporation often must precede product launch.)
7. Score each dimension 0-100 based on the data, not assumptions:
   - market_opportunity: strength of market, TAM, and growth
   - competitive_position: differentiation vs existing players
   - technical_feasibility: build complexity and timeline
   - financial_viability: unit economics and path to profitability
   - legal_compliance: regulatory clarity (100 = low burden, 0 = severe blockers)

Be decisive and clear. Indian entrepreneurs need actionable clarity.`,
  });

  if (!object) {
    throw new Error('Synthesis analysis returned empty output');
  }

  return object;
}
