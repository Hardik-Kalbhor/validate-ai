import { generateObject } from 'ai';
import { geminiModel, AGENT_TIMEOUT_MS } from '@/lib/ai';
import { LegalRegulatorySchema, type LegalRegulatory } from '@/schemas/legal-regulatory.schema';

/**
 * Agent 5: Legal & Regulatory Analysis (Dynamic AI Agent)
 * Analyzes Indian regulations, sector-specific challenges, licenses, compliance, and IP using Google Gemini.
 */
export async function analyzeLegalRegulatory(
  idea: string,
  language: string,
  directive?: string
): Promise<LegalRegulatory> {
  const { object } = await generateObject({
    model: geminiModel,
    schema: LegalRegulatorySchema,
    abortSignal: AbortSignal.timeout(AGENT_TIMEOUT_MS),
    prompt: `You are a senior Indian startup lawyer and compliance expert advising founders across fintech, edtech, food-tech, consumer internet, and platform-economy sectors.

Analyze the legal and regulatory landscape for this business idea operating in India:

IDEA: "${idea}"
OUTPUT LANGUAGE: ${language === 'hi' ? 'Hindi' : language === 'mr' ? 'Marathi' : 'English'}${directive ? `\n\nLEGAL DIRECTIVE & COMPLIANCE FOCUS:\n${directive}` : ''}

Instructions:
1. Identify 3-6 niche-specific legal challenges & operational liability traps (intermediated escrow, CCPA dark patterns, IT Act Section 79 safe harbour, statutory TDS).
2. Detail non-obvious licenses and registrations required under Indian statutes.
3. Assess DPDP Act 2023 obligations and purpose limitation rules.
4. Provide IP & trademark class recommendations (Class 35, 25, 42, etc.).
5. Specify tax implications (18% GST, Section 194O marketplace TDS, Section 9(5) aggregator liabilities).
6. Recommend entity structure (Pvt Ltd vs LLP) with rationale.
7. Be SPECIFIC to Indian law (RBI, SEBI, CCPA, MeitY, FSSAI, DPIIT).`,
  });

  if (!object) {
    throw new Error('Legal & regulatory analysis returned empty output');
  }

  return object;
}
