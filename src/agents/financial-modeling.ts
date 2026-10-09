import { generateObject } from 'ai';
import { geminiModel, AGENT_TIMEOUT_MS } from '@/lib/ai';
import { FinancialModelSchema, type FinancialModel } from '@/schemas/financial-model.schema';

/**
 * Agent 3: Financial Modeling (Dynamic AI Agent)
 * Builds TAM/SAM/SOM in INR, unit economics, CAC benchmarks, and Business Model Canvas using Google Gemini.
 */
export async function modelFinancials(
  idea: string,
  language: string,
  directive?: string
): Promise<FinancialModel> {
  const { object } = await generateObject({
    model: geminiModel,
    schema: FinancialModelSchema,
    abortSignal: AbortSignal.timeout(AGENT_TIMEOUT_MS),
    prompt: `You are a financial analyst specializing in Indian startup economics and market sizing.

Build a detailed financial model for this business idea:

IDEA: "${idea}"
OUTPUT LANGUAGE: ${language === 'hi' ? 'Hindi' : language === 'mr' ? 'Marathi' : 'English'}${directive ? `\n\nFINANCIAL DIRECTIVE & UNIT ECONOMICS HYPOTHESIS:\n${directive}` : ''}

Instructions:
1. Estimate real market size for this industry in India (TAM/SAM/SOM in INR).
2. Assess recent funding appetite for this sector in India.
3. Provide realistic Customer Acquisition Cost (CAC) and Lifetime Value (LTV) benchmarks.
4. Model pricing strategy tailored to Indian consumers or businesses.
5. Build revenue projections based on realistic Indian market penetration rates:
   - Year 1: conservative & optimistic
   - Year 2: conservative & optimistic
   - Year 3: conservative & optimistic
6. All monetary values must be in Indian Rupees (INR).
7. Factor in Indian startup realities: high churn rates, price sensitivity, UPI adoption, GST implications.
8. Complete the Business Model Canvas with India-specific channels and key partners.`,
  });

  if (!object) {
    throw new Error('Financial model returned empty output');
  }

  return object;
}
