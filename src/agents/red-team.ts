import { generateObject } from 'ai';
import { geminiModel, AGENT_TIMEOUT_MS } from '@/lib/ai';
import { RedTeamSchema, type RedTeamAnalysis } from '@/schemas/red-team.schema';
import type { Synthesis } from '@/schemas/synthesis.schema';
import type { ValidationBrief } from '@/schemas/brief.schema';

interface RedTeamInput {
  idea: string;
  language: string;
  synthesis: Synthesis;
  brief?: ValidationBrief | null;
  pitchDeckContext?: string;
  patentLandscape?: string;
  ycFrameworks?: string;
  startupAutopsies?: string;
}

/**
 * Agent 7: Adversarial Red-Team (Devil's Advocate)
 * Ruthlessly stress-tests the synthesis verdict, assumptions, and business model
 * to identify hidden fatal flaws before capital is committed.
 */
export async function runRedTeamAnalysis(input: RedTeamInput): Promise<RedTeamAnalysis> {
  const { idea, language, synthesis, brief, pitchDeckContext, patentLandscape, ycFrameworks, startupAutopsies } = input;

  const promptContext = [
    `BUSINESS CONCEPT: "${idea}"`,
    `OUTPUT LANGUAGE: ${language === 'hi' ? 'Hindi' : language === 'mr' ? 'Marathi' : 'English'}`,
    brief ? `APPROVED VALIDATION BRIEF:\n${JSON.stringify(brief, null, 2)}` : null,
    `SYNTHESIS VERDICT & SCORES:\n- Verdict: ${synthesis.viability_verdict}\n- Confidence: ${synthesis.confidence_score}/100\n- Executive Summary: ${synthesis.executive_summary}\n- Risks: ${JSON.stringify(synthesis.top_risks, null, 2)}\n- Opportunities: ${JSON.stringify(synthesis.top_opportunities, null, 2)}`,
    pitchDeckContext ? `PITCH DECK CONTEXT:\n${pitchDeckContext.slice(0, 25000)}` : null,
    patentLandscape ? `PATENT PRIOR ART & FREEDOM-TO-OPERATE DISCLOSURES:\n${patentLandscape}` : null,
    ycFrameworks ? `YC FAILURE POST-MORTEMS & DISINTERMEDIATION TRAPS:\n${ycFrameworks}` : null,
    startupAutopsies ? `HISTORICAL STARTUP AUTOPSIES & FAILURE PRECEDENTS (Dunzo, TinyOwl, PepperTap, FrontRow):\n${startupAutopsies}` : null,
  ].filter(Boolean).join('\n\n---\n\n');

  try {
    const { object } = await generateObject({
      model: geminiModel,
      schema: RedTeamSchema,
      abortSignal: AbortSignal.timeout(AGENT_TIMEOUT_MS),
      prompt: `You are a ruthless Venture Partner and Chief Risk Officer at a Tier-1 VC firm known for adversarial stress-testing.

Your sole objective is to ATTACK this business idea and the optimistic synthesis verdict. Do NOT be polite. Do NOT give boilerplate encouragement. Your fiduciary duty is to prevent founders and investors from losing ₹10 Crore on unexamined assumptions.

INPUT DOSSIER:
${promptContext}

ADVERSARIAL STRESS-TEST GUIDELINES:
1. Examine unit economics under stress: What happens if CAC is 3x higher than modeled and retention is 50% lower? Apply the YC failure frameworks above.
2. Incumbent retaliation: If a well-capitalized player (e.g. Jio, Zomato, Tata, Amazon, Swiggy) copies this feature next month, why doesn't this startup die?
3. Regulatory trapdoor & Patent infringement: What compliance rule, licensing hurdle (DPDP, RBI, FSSAI, GST), or patent claim could trigger an injunction or freeze operations?
4. Customer inertia / apathy: Is this a "vitamin" disguised as a "painkiller"? Will Indian customers actually pay or just use the free tier forever?
5. Historical Autopsy Mapping: Directly compare the business model to the historical startup autopsies provided (e.g., Dunzo dark store burn, TinyOwl discount addiction, PepperTap perishability trap, FrontRow high CAC). Explicitly warn against identical operational dead-ends.
6. Assign a realistic devil_score (0-100), where:
   - 0-35: Unusually defensible, genuine proprietary moat
   - 36-65: Standard early-stage venture risk, survivable with discipline
   - 66-100: Severe systemic fragilities, high probability of capital destruction
7. Provide a 'steelman_argument': To demonstrate intellectual honesty, articulate the strongest possible counter-thesis for how the founder could prove you wrong and win.

Output completely valid structured JSON matching the schema.`,
    });

    if (!object) {
      throw new Error('Red Team agent returned empty object');
    }

    return object;
  } catch (error) {
    console.error('[Red Team Agent] Failed to generate adversarial analysis:', error);
    throw error;
  }
}
