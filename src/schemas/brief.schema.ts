import { z } from 'zod';

export const ValidationBriefSchema = z.object({
  // Core business identity
  formal_title: z.string(),
  core_problem: z.string(),
  value_proposition: z.string(),

  // Market & Model Framing
  target_audience: z.object({
    segment: z.string(),
    tier_focus: z.enum(['tier_1', 'tier_2', 'tier_3_rural', 'pan_india', 'global']),
    business_model: z.enum(['b2b', 'b2c', 'b2b2c', 'd2c', 'p2p_marketplace', 'saas']),
  }),
  monetization_hypothesis: z.string(),

  // Domain Directives for Downstream Agents
  agent_directives: z.object({
    competitor_focus: z.string(),
    tech_focus: z.string(),
    financial_focus: z.string(),
    legal_focus: z.string(),
    global_focus: z.string(),
  }),
});

export type ValidationBrief = z.infer<typeof ValidationBriefSchema>;
