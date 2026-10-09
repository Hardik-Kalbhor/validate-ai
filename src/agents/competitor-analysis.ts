import { generateObject } from 'ai';
import { geminiModel, AGENT_TIMEOUT_MS } from '@/lib/ai';
import { CompetitorAnalysisSchema, type CompetitorAnalysis } from '@/schemas/competitor.schema';

/**
 * Agent 1: Competitor Analysis (Dynamic AI Agent)
 * Identifies and analyzes real, current competitors in India and globally using Google Gemini.
 */
export async function analyzeCompetitors(
  idea: string,
  language: string,
  directive?: string
): Promise<CompetitorAnalysis> {
  const { object } = await generateObject({
    model: geminiModel,
    schema: CompetitorAnalysisSchema,
    abortSignal: AbortSignal.timeout(AGENT_TIMEOUT_MS),
    prompt: `You are a startup business analyst specializing in competitive intelligence for the Indian market.

Search for and analyze 3-8 REAL competitors for this business idea:

IDEA: "${idea}"
OUTPUT LANGUAGE: ${language === 'hi' ? 'Hindi' : language === 'mr' ? 'Marathi' : 'English'}${directive ? `\n\nRESEARCH DIRECTIVE & SEARCH ANGLE:\n${directive}` : ''}

Instructions:
1. Identify actual competitors operating in India and globally (e.g. BookMyShow, Paytm Insider, Zomato District for ticketing/events, etc.).
2. Retrieve realistic pricing details in INR where appropriate.
3. Check market sentiment, user reviews, and app ratings.
4. Mark Indian-focused direct competitors appropriately.
5. Identify the distinct market gap this idea can fill.
6. Only return real, verifiable companies.`,
  });

  if (!object) {
    throw new Error('Competitor analysis returned empty output');
  }

  return object;
}
