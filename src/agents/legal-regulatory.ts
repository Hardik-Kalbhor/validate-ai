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
  directive?: string,
  statutoryContext?: string,
  courtPrecedents?: string,
  pitchDeckContext?: string,
  rocCompliance?: string,
  governmentSchemes?: string
): Promise<LegalRegulatory> {
  const promptParts = [
    `You are a senior Indian startup lawyer and compliance expert advising founders across fintech, edtech, food-tech, consumer internet, and platform-economy sectors.`,
    `Analyze the legal and regulatory landscape for this business idea operating in India:`,
    `IDEA: "${idea}"`,
    `OUTPUT LANGUAGE: ${language === 'hi' ? 'Hindi' : language === 'mr' ? 'Marathi' : 'English'}`,
    directive ? `LEGAL DIRECTIVE & COMPLIANCE FOCUS:\n${directive}` : null,
    pitchDeckContext ? `PITCH DECK REGULATORY & CONTRACT STRUCTURE:\n${pitchDeckContext.slice(0, 15000)}` : null,
    statutoryContext ? `INDIAN STATUTORY ACTS & REGULATORY PROVISIONS:\n${statutoryContext}` : null,
    courtPrecedents ? `LANDMARK COURT PRECEDENTS & ENFORCEMENT ORDERS:\n${courtPrecedents}` : null,
    rocCompliance ? `STATUTORY ROC FILINGS, LICENSING & PORTAL WORKFLOW ROADMAP:\n${rocCompliance}` : null,
    governmentSchemes ? `CENTRAL & STATE STARTUP SCHEMES, SUBSIDIES & TAX EXEMPTIONS:\n${governmentSchemes}` : null,
    `Instructions:
1. Identify 3-6 niche-specific legal challenges & operational liability traps (intermediated escrow, CCPA dark patterns, IT Act Section 79 safe harbour, statutory TDS).
2. Detail non-obvious licenses and registrations required under Indian statutes. Cross-examine against the statutory acts provided above.
3. Assess DPDP Act 2023 obligations and purpose limitation rules.
4. Provide IP & trademark class recommendations (Class 35, 25, 42, etc.).
5. Specify tax implications (18% GST, Section 194O marketplace TDS, Section 9(5) aggregator liabilities, Section 80-IAC tax holiday).
6. Recommend entity structure (Pvt Ltd vs LLP) with rationale, including MCA21 SPICe+ incorporation requirements and state stamp duties.
7. Be SPECIFIC to Indian law (RBI, SEBI, CCPA, MeitY, FSSAI, DPIIT).`,
  ].filter(Boolean).join('\n\n');

  const { object } = await generateObject({
    model: geminiModel,
    schema: LegalRegulatorySchema,
    abortSignal: AbortSignal.timeout(AGENT_TIMEOUT_MS),
    prompt: promptParts,
  });

  if (!object) {
    throw new Error('Legal & regulatory analysis returned empty output');
  }

  return object;
}
