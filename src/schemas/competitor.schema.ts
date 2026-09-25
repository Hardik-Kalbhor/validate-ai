import { z } from 'zod';

const CompetitorSchema = z.object({
  name: z.string(),
  website: z.string(),
  category: z.enum(['direct', 'indirect']),
  features: z.array(z.string()).min(3).max(6),
  pricing: z.object({
    model: z.enum(['free', 'freemium', 'subscription', 'one-time', 'usage-based']),
    starting_price_inr: z.number().nullable(),
    pricing_details: z.string(),
  }),
  strengths: z.array(z.string()).min(2).max(4),
  weaknesses: z.array(z.string()).min(2).max(4),
  market_sentiment: z.enum(['positive', 'mixed', 'negative']),
  sentiment_reason: z.string(),
  usability_rating: z.number().min(1).max(5),
});

export const CompetitorAnalysisSchema = z.object({
  competitors: z.array(CompetitorSchema).min(3).max(8),
  market_gap: z.string(),
  competitive_intensity: z.enum(['low', 'medium', 'high']),
});

export type CompetitorAnalysis = z.infer<typeof CompetitorAnalysisSchema>;
export type Competitor = z.infer<typeof CompetitorSchema>;
