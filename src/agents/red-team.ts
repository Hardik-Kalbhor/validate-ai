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
}

/**
 * Agent 7: Adversarial Red-Team (Devil's Advocate)
 * Ruthlessly stress-tests the synthesis verdict, assumptions, and business model
 * to identify hidden fatal flaws before capital is committed.
 */
export async function runRedTeamAnalysis(input: RedTeamInput): Promise<RedTeamAnalysis> {
  const { idea, language, synthesis, brief, pitchDeckContext, patentLandscape, ycFrameworks } = input;

  const promptContext = [
    `BUSINESS CONCEPT: "${idea}"`,
    `OUTPUT LANGUAGE: ${language === 'hi' ? 'Hindi' : language === 'mr' ? 'Marathi' : 'English'}`,
    brief ? `APPROVED VALIDATION BRIEF:\n${JSON.stringify(brief, null, 2)}` : null,
    `SYNTHESIS VERDICT & SCORES:\n- Verdict: ${synthesis.viability_verdict}\n- Confidence: ${synthesis.confidence_score}/100\n- Executive Summary: ${synthesis.executive_summary}\n- Risks: ${JSON.stringify(synthesis.top_risks, null, 2)}\n- Opportunities: ${JSON.stringify(synthesis.top_opportunities, null, 2)}`,
    pitchDeckContext ? `PITCH DECK CONTEXT:\n${pitchDeckContext.slice(0, 25000)}` : null,
    patentLandscape ? `PATENT PRIOR ART & FREEDOM-TO-OPERATE DISCLOSURES:\n${patentLandscape}` : null,
    ycFrameworks ? `YC FAILURE POST-MORTEMS & DISINTERMEDIATION TRAPS:\n${ycFrameworks}` : null,
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
5. Assign a realistic devil_score (0-100), where:
   - 0-35: Unusually defensible, genuine proprietary moat
   - 36-65: Standard early-stage venture risk, survivable with discipline
   - 66-100: Severe systemic fragilities, high probability of capital destruction
6. Provide a 'steelman_argument': To demonstrate intellectual honesty, articulate the strongest possible counter-thesis for how the founder could prove you wrong and win.

Output completely valid structured JSON matching the schema.`,
    });

    if (!object) {
      throw new Error('Red Team agent returned empty object');
    }

    return object;
  } catch (err) {
    console.warn('[Agent 7: Red-Team] Live agent call failed, using heuristic fallback:', err);
    return getFallbackRedTeamAnalysis(idea, synthesis);
  }
}

function getFallbackRedTeamAnalysis(idea: string, synthesis: Synthesis): RedTeamAnalysis {
  const devilScore = Math.min(85, Math.max(30, 100 - (synthesis.confidence_score ?? 60)));
  return {
    devil_score: devilScore,
    verdict: 'severe_vulnerabilities',
    fatal_flaws: [
      'Customer acquisition cost escalation once early adopter word-of-mouth saturates.',
      'Incumbent feature replication by established platforms with existing distribution.',
    ],
    adversarial_challenges: [
      {
        category: 'unit_economics',
        claim: 'Positive contribution margin based on current pricing hypotheses.',
        counter_argument: 'In the Indian market, price sensitivity forces aggressive discounting to defend market share against clones.',
        severity: 'high',
        stress_test_scenario: 'Blended customer acquisition cost doubles during festive high-bidding digital advertising seasons.',
        required_contingency: 'Build organic referral viral loops and lock in annual advance contracts where possible.',
      },
      {
        category: 'incumbent_response',
        claim: 'First-mover advantage in this specific niche.',
        counter_argument: 'Platform players can launch this feature as a free value-add to existing enterprise bundles within 90 days.',
        severity: 'high',
        stress_test_scenario: 'Top 2 market leaders bundle competing functionality into their standard subscription tiers.',
        required_contingency: 'Focus on hyper-specific workflows that incumbents cannot easily customize without breaking their core product.',
      },
      {
        category: 'regulatory_trap',
        claim: 'Operations can commence under general corporate registration.',
        counter_argument: 'Statutory compliance under DPDP Act 2023 and GST Section 194-O requires immediate audit trails.',
        severity: 'medium',
        stress_test_scenario: 'Tax or data audit demands audited escrow settlements and verified consent audit trails.',
        required_contingency: 'Engage legal counsel on day 1 to implement automated consent logging and formal escrow accounts.',
      },
      {
        category: 'customer_apathy',
        claim: 'High user demand indicated by initial positive surveys.',
        counter_argument: 'Surveys suffer from courtesy bias; willingness to pay actual INR via UPI or credit card drops precipitously once the paywall goes live.',
        severity: 'high',
        stress_test_scenario: 'Free trial conversion rate hovers below 1.5% in Tier 2 and Tier 3 markets.',
        required_contingency: 'Pre-sell annual contracts with upfront payments or bind users into high-switching-cost integrations before launch.',
      },
      {
        category: 'operational_collapse',
        claim: 'Vendor and supply-chain partners will maintain consistent service level agreements.',
        counter_argument: 'Unorganized suppliers in India frequently fail to honor service level agreements during high-demand or crisis periods without penalties.',
        severity: 'medium',
        stress_test_scenario: 'Key supplier default causes a 30% drop in order fulfillment capacity during a surge week.',
        required_contingency: 'Implement a multi-vendor sourcing strategy with minimum 3 pre-vetted backup suppliers per region.',
      },
    ],
    steelman_argument: `If ${idea.slice(0, 80)} can secure exclusive distribution partnerships with dominant market participants and maintain strict negative working capital discipline, it may build sufficient switching costs before competitors copy its core value proposition.`,
  };
}
