import { generateObject } from 'ai';
import { geminiModel } from '@/lib/ai';
import { SynthesisSchema, type Synthesis } from '@/schemas/synthesis.schema';
import type { CompetitorAnalysis } from '@/schemas/competitor.schema';
import type { TechFeasibility } from '@/schemas/tech-feasibility.schema';
import type { FinancialModel } from '@/schemas/financial-model.schema';

interface SynthesisInput {
  idea: string;
  language: string;
  competitors: CompetitorAnalysis | null;
  tech: TechFeasibility | null;
  finance: FinancialModel | null;
}

/**
 * Agent 4: Synthesis
 * Deep reasoning over all 3 agent outputs. Uses thinkingBudget: 5000
 * for thorough analysis of risks, opportunities, and actionable next steps.
 */
export async function synthesizeResults(input: SynthesisInput): Promise<Synthesis> {
  const { idea, language, competitors, tech, finance } = input;

  const context = [
    competitors ? `COMPETITOR ANALYSIS:\n${JSON.stringify(competitors, null, 2)}` : 'Competitor analysis unavailable.',
    tech ? `TECHNICAL FEASIBILITY:\n${JSON.stringify(tech, null, 2)}` : 'Tech feasibility unavailable.',
    finance ? `FINANCIAL MODEL:\n${JSON.stringify(finance, null, 2)}` : 'Financial model unavailable.',
  ].join('\n\n---\n\n');

  const { object } = await generateObject({
    model: geminiModel,
    schema: SynthesisSchema,
    providerOptions: {
      google: {
        thinkingConfig: {
          thinkingBudget: 5000,
        },
      },
    },
    prompt: `You are a senior venture analyst at a top Indian VC firm with 15+ years of experience.

Synthesize ALL the research below into a comprehensive verdict for this business idea:

IDEA: "${idea}"
OUTPUT LANGUAGE: ${language === 'hi' ? 'Hindi' : language === 'mr' ? 'Marathi' : 'English'}

RESEARCH DATA:
${context}

Your task:
1. Give an honest viability verdict based on the COMBINED evidence — not just one dimension.
2. Assign a confidence score (0-100) reflecting how strong the evidence is overall.
3. Write a sharp executive summary (3-4 sentences) that captures the core insight.
4. Identify the 3-6 MOST IMPORTANT risks with specific mitigations for the Indian market.
5. Identify the 3-6 BEST opportunities, prioritized by impact and timing.
6. Define a clear, prioritized action plan — what should the founder do FIRST?
7. Score each dimension 0-100 based on the data, not assumptions.

Be decisive and clear. Indian entrepreneurs need actionable clarity.
If data was unavailable for some agents, acknowledge uncertainty in your confidence score.`,
  });

  return object;
}
