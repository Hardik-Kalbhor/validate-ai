import { generateObject } from 'ai';
import { geminiModel, AGENT_TIMEOUT_MS } from '@/lib/ai';
import { TechFeasibilitySchema, type TechFeasibility } from '@/schemas/tech-feasibility.schema';

/**
 * Agent 2: Technical Feasibility (Dynamic AI Agent)
 * Assesses technical complexity, architecture, tech stack, and development timelines using Google Gemini.
 */
export async function assessTechFeasibility(
  idea: string,
  language: string,
  directive?: string
): Promise<TechFeasibility> {
  const { object } = await generateObject({
    model: geminiModel,
    schema: TechFeasibilitySchema,
    abortSignal: AbortSignal.timeout(AGENT_TIMEOUT_MS),
    prompt: `You are a senior software architect with deep experience in Indian startup tech stacks.

Assess the technical feasibility of this business idea:

IDEA: "${idea}"
OUTPUT LANGUAGE: ${language === 'hi' ? 'Hindi' : language === 'mr' ? 'Marathi' : 'English'}${directive ? `\n\nTECHNICAL DIRECTIVE & ARCHITECTURE FOCUS:\n${directive}` : ''}

Instructions:
1. First, determine if this is an online, offline, or hybrid business.
   - Online: primarily digital product/service delivery (SaaS, apps, e-commerce)
   - Offline: requires physical presence (retail, restaurants, local services)
   - Hybrid: combination of both (hyperlocal, O2O)
2. Recommend a practical technology stack suitable for Indian startup budgets.
3. Give REALISTIC timelines — Indian dev rates are ~₹40-80K/month per developer.
4. Identify genuine engineering challenges, not generic ones.
5. Consider India-specific tech constraints: low bandwidth in tier-2/3 cities,
   UPI/RazorPay payment integrations, multilingual requirements (Hindi, regional).
6. Score complexity 1-10 where:
   1-3 = No-code/low-code feasible
   4-6 = Standard web/mobile dev
   7-9 = Requires specialized engineers
   10 = Research-level difficulty
7. List 3-8 NICHE UNIQUE TECHNOLOGIES specifically suited to this idea — idea-specific
   tools, APIs, or platforms (e.g. Runway Gen-3 for AI video, FSSAI FoSCoS API for food,
   LiveKit for real-time tutoring audio) that a generic startup would NOT use. Do NOT
   list common items like "React", "PostgreSQL", or "Node.js" in this list.

Be honest and specific. Do not give generic tech buzzwords.`,
  });

  if (!object) {
    throw new Error('Technical feasibility assessment returned empty output');
  }

  return object;
}
