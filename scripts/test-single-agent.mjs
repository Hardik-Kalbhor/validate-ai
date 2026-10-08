import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { CompetitorAnalysisSchema } from '../src/schemas/competitor.schema.ts';

const model = google(process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite');

console.log('Testing model:', process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite');
const start = Date.now();

try {
  const { object } = await generateObject({
    model,
    schema: CompetitorAnalysisSchema,
    abortSignal: AbortSignal.timeout(30000),
    prompt: `Analyze 3-5 competitors for: "AI-driven vernacular mental health app in India". Output in English.`
  });
  console.log('Success in', (Date.now() - start) / 1000, 'seconds');
  console.log('Found competitors:', object.competitors.map(c => c.name));
} catch (err) {
  console.error('Error in', (Date.now() - start) / 1000, 'seconds:', err.message);
}
