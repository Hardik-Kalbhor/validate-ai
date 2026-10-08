import { z } from 'zod';

export const TechFeasibilitySchema = z.object({
  business_type: z.enum(['online', 'offline', 'hybrid']),
  technology_stack: z.object({
    frontend: z.string(),
    backend: z.string(),
    database: z.string(),
    ai_ml: z.string().nullable(),
    infrastructure: z.string(),
  }),
  complexity_score: z.number().min(1).max(10),
  mvp_timeline_months: z.number(),
  full_product_timeline_months: z.number(),
  engineering_hurdles: z.array(z.string()).min(3).max(8),
  infrastructure_needs: z.array(z.string()).min(3).max(6),
  integration_points: z.array(z.string()).min(2).max(6),
  security_considerations: z.array(z.string()).min(3).max(6),
  build_vs_buy: z.string(),
  scalability_notes: z.string(),
  niche_unique_technologies: z.array(z.string()).min(3).max(8),
});

export type TechFeasibility = z.infer<typeof TechFeasibilitySchema>;
