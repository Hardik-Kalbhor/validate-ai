import { z } from 'zod';

export const RedTeamChallengeSchema = z.object({
  category: z.enum([
    'unit_economics',
    'regulatory_trap',
    'incumbent_response',
    'customer_apathy',
    'operational_collapse',
  ]),
  claim: z.string().describe('The optimistic assumption made by the founder or synthesis'),
  counter_argument: z.string().describe('The adversarial counter-reality and failure mode'),
  severity: z.enum(['critical', 'high', 'medium']),
  stress_test_scenario: z.string().describe('A concrete worst-case stress test scenario'),
  required_contingency: z.string().describe('The defensive pivot or moat required to survive'),
});

export const RedTeamSchema = z.object({
  devil_score: z
    .number()
    .min(0)
    .max(100)
    .describe('0 = exceptionally resilient, 100 = fatal vulnerability detected'),
  verdict: z.enum(['resilient_with_caution', 'severe_vulnerabilities', 'fatal_flaw_detected']),
  fatal_flaws: z
    .array(z.string())
    .min(1)
    .max(3)
    .describe('The 1 to 3 primary reasons this company could run out of cash or fail'),
  adversarial_challenges: z
    .array(RedTeamChallengeSchema)
    .min(3)
    .max(6)
    .describe('Rigorous counter-arguments testing each pillar of the business'),
  steelman_argument: z
    .string()
    .describe('The strongest, most credible defense of why the business COULD succeed despite these risks'),
});

export type RedTeamChallenge = z.infer<typeof RedTeamChallengeSchema>;
export type RedTeamAnalysis = z.infer<typeof RedTeamSchema>;
