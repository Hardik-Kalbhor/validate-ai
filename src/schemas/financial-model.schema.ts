import { z } from 'zod';

export const FinancialModelSchema = z.object({
  market_size_inr: z.object({
    tam: z.number(),
    sam: z.number(),
    som: z.number(),
  }),
  market_growth_rate_percent: z.number(),
  revenue_forecast: z.object({
    year1_conservative: z.number(),
    year1_optimistic: z.number(),
    year2_conservative: z.number(),
    year2_optimistic: z.number(),
    year3_conservative: z.number(),
    year3_optimistic: z.number(),
  }),
  cost_structure: z.object({
    initial_investment: z.number(),
    monthly_opex: z.number(),
    cac: z.number(),
    ltv: z.number(),
    gross_margin_percent: z.number(),
  }),
  break_even_months: z.number(),
  pricing_strategy: z.object({
    model: z.enum(['subscription', 'one-time', 'freemium', 'usage-based', 'marketplace']),
    recommended_price_inr: z.number(),
    rationale: z.string(),
  }),
  bmc: z.object({
    key_partners: z.array(z.string()),
    key_activities: z.array(z.string()),
    key_resources: z.array(z.string()),
    value_proposition: z.string(),
    customer_relationships: z.array(z.string()),
    channels: z.array(z.string()),
    customer_segments: z.array(z.string()),
    cost_structure_items: z.array(z.string()),
    revenue_streams: z.array(z.string()),
  }),
  funding_insights: z.string(),
  india_market_notes: z.string(),
});

export type FinancialModel = z.infer<typeof FinancialModelSchema>;
