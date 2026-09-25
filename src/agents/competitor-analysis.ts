import { generateText, Output } from 'ai';
import { google } from '@ai-sdk/google';
import { geminiModel } from '@/lib/ai';
import { CompetitorAnalysisSchema, type CompetitorAnalysis } from '@/schemas/competitor.schema';

/**
 * Agent 1: Competitor Analysis
 * Uses Google Search grounding to discover and analyze REAL, current competitors.
 */
export async function analyzeCompetitors(
  idea: string,
  language: string
): Promise<CompetitorAnalysis> {
  const { output } = await generateText({
    model: geminiModel,
    tools: {
      google_search: google.tools.googleSearch({}),
    },
    output: Output.object({ schema: CompetitorAnalysisSchema }),
    prompt: `You are a startup business analyst specializing in competitive intelligence for the Indian market.

Search for and analyze 3-8 REAL competitors for this business idea:

IDEA: "${idea}"
OUTPUT LANGUAGE: ${language === 'hi' ? 'Hindi' : language === 'mr' ? 'Marathi' : 'English'}

Instructions:
1. Search the web for actual competitors operating in India and globally.
2. Retrieve current pricing details (convert USD to INR where appropriate: 1 USD ≈ 84 INR).
3. Check market sentiment, user reviews, and app ratings.
4. Mark Indian-focused direct competitors appropriately.
5. Identify the distinct market gap this idea can fill.
6. Only return real, verifiable companies.`,
  });

  if (!output) {
    throw new Error('Competitor analysis returned empty output');
  }

  return output;
}
