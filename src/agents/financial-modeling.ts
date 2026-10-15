import { generateObject } from 'ai';
import { geminiModel, AGENT_TIMEOUT_MS } from '@/lib/ai';
import { FinancialModelSchema, type FinancialModel } from '@/schemas/financial-model.schema';

/**
 * Agent 3: Financial Modeling (Dynamic AI Agent)
 * Builds TAM/SAM/SOM in INR, unit economics, CAC benchmarks, and Business Model Canvas
 * grounded in audited SEBI DRHPs, government subsidies, and YC failure post-mortems using Google Gemini.
 */
export async function modelFinancials(
  idea: string,
  language: string,
  directive?: string,
  drhpBenchmarks?: string,
  pitchDeckContext?: string,
  ycFrameworks?: string,
  governmentSchemes?: string
): Promise<FinancialModel> {
  const promptParts = [
    `You are a venture CFO and startup financial modeler specializing in Indian market unit economics, SEBI audited multiples, and capital efficiency.`,
    `Build a detailed financial model for this business idea:`,
    `IDEA: "${idea}"`,
    `OUTPUT LANGUAGE: ${language === 'hi' ? 'Hindi' : language === 'mr' ? 'Marathi' : 'English'}`,
    directive ? `FINANCIAL DIRECTIVE & UNIT ECONOMICS HYPOTHESIS:\n${directive}` : null,
    pitchDeckContext ? `PITCH DECK FINANCIAL PROJECTIONS & COHORT DATA:\n${pitchDeckContext.slice(0, 25000)}` : null,
    drhpBenchmarks ? `SEBI AUDITED DRHP BENCHMARKS & PUBLIC COMPARABLES:\n${drhpBenchmarks}` : null,
    governmentSchemes ? `CENTRAL & STATE GOVERNMENT SUBSIDIES & NON-DILUTIVE CAPITAL INCENTIVES:\n${governmentSchemes}` : null,
    ycFrameworks ? `YC VENTURE UNDERWRITING FRAMEWORKS & POST-MORTEMS:\n${ycFrameworks}` : null,
    `Instructions:
1. Estimate real market size for this industry in India (TAM/SAM/SOM in INR).
2. Assess recent funding appetite for this sector in India.
3. Provide realistic Customer Acquisition Cost (CAC) and Lifetime Value (LTV) benchmarks. Cross-check against the audited DRHP public peers above.
4. Model pricing strategy tailored to Indian consumers or businesses. Apply YC underwriting rules of thumb regarding marketplace take-rates and hardware CapEx depreciation drag.
5. Build revenue projections based on realistic Indian market penetration rates:
   - Year 1: conservative & optimistic
   - Year 2: conservative & optimistic
   - Year 3: conservative & optimistic
6. All monetary values must be in Indian Rupees (INR).
7. Factor in Indian startup realities: high churn rates, price sensitivity, UPI adoption, GST implications, and working capital financing requirements.
8. Evaluate eligibility for non-dilutive government capital (SISFS, CGSS, PM-FME, Section 80-IAC tax exemption) to extend runway without equity dilution.
9. Complete the Business Model Canvas with India-specific channels and key partners.`,
  ].filter(Boolean).join('\n\n');

  const { object } = await generateObject({
    model: geminiModel,
    schema: FinancialModelSchema,
    abortSignal: AbortSignal.timeout(AGENT_TIMEOUT_MS),
    prompt: promptParts,
  });

  if (!object) {
    throw new Error('Financial model returned empty output');
  }

  return object;
}
