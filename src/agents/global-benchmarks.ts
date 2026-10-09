import { generateObject } from 'ai';
import { geminiModel, AGENT_TIMEOUT_MS } from '@/lib/ai';
import { GlobalPrecedentsSchema, type GlobalPrecedents } from '@/schemas/global-precedents.schema';

/**
 * Agent 6: Global Precedents & International Benchmarks (Dynamic AI Agent)
 * Analyzes international predecessors and models outside India (US, UK, Europe, etc.) using Google Gemini.
 */
export async function analyzeGlobalBenchmarks(
  idea: string,
  language: string,
  directive?: string
): Promise<GlobalPrecedents> {
  const { object } = await generateObject({
    model: geminiModel,
    schema: GlobalPrecedentsSchema,
    abortSignal: AbortSignal.timeout(AGENT_TIMEOUT_MS),
    prompt: `You are an elite cross-border venture analyst and global startup scout specializing in international business model benchmarking.

Your mission is to evaluate whether this exact business idea or a very similar business model has been implemented in ANY COUNTRY OTHER THAN INDIA (e.g. USA, UK, Germany, China, Indonesia, Brazil, Singapore, Japan):

BUSINESS IDEA: "${idea}"
OUTPUT LANGUAGE: ${language === 'hi' ? 'Hindi' : language === 'mr' ? 'Marathi' : 'English'}${directive ? `\n\nGLOBAL BENCHMARK DIRECTIVE & INTERNATIONAL ANALOG FOCUS:\n${directive}` : ''}

Instructions:
1. Identify 2-5 real international precedents or analogous business models outside India.
2. For each, provide overview, implementation model, monetization model, traction, and key learnings for India.
3. Compare purchasing power, consumer behavior, and unit economic differences between Western/global markets vs India.
4. Provide actionable lessons for Indian founders adapting this model locally.`,
  });

  if (!object) {
    throw new Error('Global precedents analysis returned empty output');
  }

  return object;
}
