import { z } from 'zod';

export const SynthesisSchema = z.object({
  viability_verdict: z.enum(['highly_viable', 'viable', 'risky', 'not_viable']),
  confidence_score: z.number().min(0).max(100),
  executive_summary: z.string(),
  top_risks: z.array(z.object({
    risk: z.string(),
    severity: z.enum(['low', 'medium', 'high', 'critical']),
    mitigation: z.string(),
  })).min(3).max(6),
  top_opportunities: z.array(z.object({
    opportunity: z.string(),
    impact: z.enum(['low', 'medium', 'high']),
    timeframe: z.enum(['immediate', 'short-term', 'long-term']),
  })).min(3).max(6),
  next_steps: z.array(z.object({
    step: z.string(),
    priority: z.number().min(1).max(5),
    timeframe: z.string(),
  })).min(4).max(8),
  improvement_suggestions: z.array(z.string()).min(3).max(6),
  dimension_scores: z.object({
    market_opportunity: z.number().min(0).max(100),
    competitive_position: z.number().min(0).max(100),
    technical_feasibility: z.number().min(0).max(100),
    financial_viability: z.number().min(0).max(100),
  }),
});

export type Synthesis = z.infer<typeof SynthesisSchema>;
