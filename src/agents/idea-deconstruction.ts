import { generateObject } from 'ai';
import { geminiModel, AGENT_TIMEOUT_MS } from '@/lib/ai';
import { ValidationBriefSchema, type ValidationBrief } from '@/schemas/brief.schema';

/**
 * Phase 0: Idea Deconstruction & Framing Agent (Venture Architect)
 * Deconstructs raw user ideas into a structured Validation Brief before running domain specialists.
 */
export async function deconstructIdea(
  idea: string,
  language: string
): Promise<ValidationBrief> {
  const timeoutMs = Math.min(AGENT_TIMEOUT_MS, 30000); // Fast 30s ceiling for brief generation

  const { object } = await generateObject({
    model: geminiModel,
    schema: ValidationBriefSchema,
    abortSignal: AbortSignal.timeout(timeoutMs),
    prompt: `You are a Principal Venture Architect at a top startup accelerator.
Your task is to analyze and deconstruct this early-stage business idea into a crystal-clear, structured Validation Brief before dispatching domain research specialists.

BUSINESS IDEA:
"${idea}"

OUTPUT LANGUAGE: ${language === 'hi' ? 'Hindi' : language === 'mr' ? 'Marathi' : 'English'}

Instructions:
1. Formal Title: Give this concept a sharp, professional venture title (e.g., "Hyperlocal Cold Storage Micro-Warehousing Network").
2. Core Problem: Clarify the fundamental, acute customer pain point being addressed.
3. Value Proposition: Articulate the core promise and differentiation.
4. Target Audience:
   - Specific customer segment (e.g. "Tier-2 hospital procurement managers", "College students in Pune")
   - Tier focus: 'tier_1', 'tier_2', 'tier_3_rural', 'pan_india', or 'global'
   - Business model: 'b2b', 'b2c', 'b2b2c', 'd2c', 'p2p_marketplace', or 'saas'
5. Monetization Hypothesis: Formulate a realistic monetization model (subscription, take-rate commission, unit pricing) in INR where applicable.
6. Tailored Directives for Research Specialists:
   - competitor_focus: Suggest specific direct/indirect competitors, unorganized alternatives, and search angles.
   - tech_focus: Identify the core engineering hurdles, architecture requirements, and critical third-party APIs/telemetry.
   - financial_focus: Highlight the key unit economic metrics, ticket size assumptions, and margin drivers to test.
   - legal_focus: Identify the key Indian regulatory bodies (RBI, FSSAI, SEBI, MeitY, DPDP 2023) and liability traps to examine.
   - global_focus: Suggest relevant international analogs (US, Europe, China, Southeast Asia, Latin America) to benchmark against.

Be decisive, practical, and highly specific to the Indian startup ecosystem.`,
  });

  if (!object) {
    throw new Error('Idea deconstruction returned empty output');
  }

  return object;
}
