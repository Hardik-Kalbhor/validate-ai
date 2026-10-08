import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';

const CompetitorAnalysisSchema = z.object({
  competitors: z.array(z.object({
    name: z.string(),
    website: z.string(),
    category: z.enum(['direct', 'indirect']),
    features: z.array(z.string()),
    pricing: z.object({
      model: z.enum(['free', 'freemium', 'subscription', 'one-time', 'usage-based']),
      starting_price_inr: z.number().nullable(),
      pricing_details: z.string(),
    }),
    strengths: z.array(z.string()),
    weaknesses: z.array(z.string()),
    market_sentiment: z.enum(['positive', 'mixed', 'negative']),
    sentiment_reason: z.string(),
    usability_rating: z.number(),
  })),
  market_gap: z.string(),
  competitive_intensity: z.enum(['low', 'medium', 'high']),
});

async function main() {
  const model = google('gemini-3.8-flash');
  const idea = 'online ticket booking platform for shows and concerts of comedians';
  console.log('Testing live generateObject with idea:', idea);
  const start = Date.now();

  try {
    const { object } = await generateObject({
      model,
      schema: CompetitorAnalysisSchema,
      abortSignal: AbortSignal.timeout(25000),
      prompt: `You are a startup business analyst specializing in competitive intelligence for the Indian market.

Search for and analyze 3-8 REAL competitors for this business idea:

IDEA: "${idea}"
OUTPUT LANGUAGE: English

Instructions:
1. Identify actual competitors operating in India and globally.
2. Retrieve realistic pricing details in INR where appropriate.
3. Check market sentiment, user reviews, and app ratings.
4. Mark Indian-focused direct competitors appropriately (e.g. BookMyShow, Paytm Insider, Skillbox).
5. Identify the distinct market gap this idea can fill.
6. Only return real, verifiable companies.`,
    });

    console.log('Success in', Date.now() - start, 'ms:');
    console.log('Competitors:', object.competitors.map(c => c.name));
    console.log('Market Gap:', object.market_gap);
  } catch (err) {
    console.error('Failed in', Date.now() - start, 'ms:', err);
  }
}

main();
