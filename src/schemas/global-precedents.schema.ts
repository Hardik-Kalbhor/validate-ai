import { z } from 'zod';

export const InternationalPrecedentSchema = z.object({
  name: z.string(),
  country: z.string(),
  website_or_domain: z.string().nullable().optional(),
  year_founded: z.number().nullable().optional(),
  business_overview: z.string(),
  implementation_model: z.string(),
  monetization_model: z.string(),
  traction_and_scale: z.string().nullable().optional(),
  current_status: z.enum(['active', 'acquired', 'shut_down', 'pivoted', 'ipo', 'unknown']),
  key_learnings_for_india: z.string(),
});

export const GlobalPrecedentsSchema = z.object({
  has_international_precedents: z.boolean(),
  novelty_assessment: z.enum([
    'globally_proven',
    'emerging_internationally',
    'failed_internationally',
    'globally_novel',
  ]),
  global_summary: z.string(),
  geographical_distribution: z.array(z.string()).min(1).max(8),
  similar_businesses: z.array(InternationalPrecedentSchema).min(0).max(8),
  market_differences_vs_india: z.string(),
  lessons_for_indian_founders: z.array(z.string()).min(2).max(6),
});

export type InternationalPrecedent = z.infer<typeof InternationalPrecedentSchema>;
export type GlobalPrecedents = z.infer<typeof GlobalPrecedentsSchema>;
