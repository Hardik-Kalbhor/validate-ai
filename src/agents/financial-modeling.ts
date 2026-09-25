import { generateText, Output } from 'ai';
import { google } from '@ai-sdk/google';
import { geminiModel } from '@/lib/ai';
import { FinancialModelSchema, type FinancialModel } from '@/schemas/financial-model.schema';

/**
 * Agent 3: Financial Modeling
 * Uses Google Search grounding for REAL Indian market data:
 * TAM/SAM/SOM, funding trends, CAC benchmarks, pricing comparables.
 */
export async function modelFinancials(
  idea: string,
  language: string
): Promise<FinancialModel> {
  const { output } = await generateText({
    model: geminiModel,
    tools: {
      google_search: google.tools.googleSearch({}),
    },
    output: Output.object({ schema: FinancialModelSchema }),
    prompt: `You are a financial analyst specializing in Indian startup economics and market sizing.

Build a detailed financial model for this business idea:

IDEA: "${idea}"
OUTPUT LANGUAGE: ${language === 'hi' ? 'Hindi' : language === 'mr' ? 'Marathi' : 'English'}

Instructions:
1. SEARCH for real market size data for this industry in India (TAM/SAM/SOM in INR).
2. SEARCH for recent funding rounds and investor appetite for this sector in India.
3. SEARCH for realistic Customer Acquisition Cost (CAC) benchmarks for this industry.
4. SEARCH for comparable products' pricing in the Indian market.
5. Build revenue projections based on realistic Indian market penetration rates:
   - Year 1: 0.01-0.1% of SOM
   - Year 2: 0.1-1% of SOM
   - Year 3: 1-5% of SOM
6. All monetary values must be in Indian Rupees (INR).
7. Factor in Indian startup realities: high churn rates, price sensitivity, UPI adoption,
   GST implications, and tier-2/3 city expansion potential.
8. Complete the Business Model Canvas with India-specific channels and partners.

Use real data from your searches, not generic assumptions.`,
  });

  if (!output) {
    throw new Error('Financial model returned empty output');
  }

  return output;
}
