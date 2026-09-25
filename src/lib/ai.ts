import { google } from '@ai-sdk/google';

/**
 * Gemini 3.8 Flash model instance.
 * Used across all 4 agents with specific options (tools, thinking, etc.)
 * configured per agent call.
 */
export const geminiModel = google('gemini-3.8-flash');
