import dns from 'node:dns';
import { google } from '@ai-sdk/google';

// Prevent Node.js on macOS from stalling on unresolved IPv6 routes to Google APIs
if (typeof dns.setDefaultResultOrder === 'function') {
  try {
    dns.setDefaultResultOrder('ipv4first');
  } catch {
    // ignore
  }
}

/**
 * List of available Google Gemini models supported by @ai-sdk/google
 * and compatible with the multi-agent validation pipeline.
 */
export const AVAILABLE_MODELS = [
  'gemini-3.5-flash-lite',
  'gemini-3.5-flash',
  'gemini-3.8-flash',
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-1.5-flash',
] as const;

export type SupportedModelId = (typeof AVAILABLE_MODELS)[number];

/**
 * Active Gemini model instance.
 * Defaults to 'gemini-3.5-flash-lite' (high-speed structured output generation tier),
 * or uses process.env.GEMINI_MODEL if specified.
 */
export const SELECTED_MODEL_ID = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';
export const geminiModel = google(SELECTED_MODEL_ID);

export const hasGeminiApiKey = Boolean(
  process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY
);

/**
 * Unified safety timeout for all validation agents (in milliseconds).
 * Defaults to 90 seconds (90,000ms), giving plenty of headroom for complex
 * structured JSON schemas while preventing indefinite hangs.
 */
export const AGENT_TIMEOUT_MS = Number(process.env.AGENT_TIMEOUT_MS) || 90000;

