'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatINR } from '@/lib/utils';
import type { CompetitorAnalysis } from '@/schemas/competitor.schema';

interface Props { data: CompetitorAnalysis }

const sentimentColors = { positive: 'text-green-600', mixed: 'text-amber-600', negative: 'text-red-600' };
const intensityBadge = { low: 'outline', medium: 'secondary', high: 'destructive' } as const;

export function CompetitorTable({ data }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{data.competitors.length} competitors found</p>
        <Badge variant={intensityBadge[data.competitive_intensity]}>
          {data.competitive_intensity} competition
        </Badge>
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4 text-sm">
          <span className="font-medium">Market Gap: </span>{data.market_gap}
        </CardContent>
      </Card>

      <div className="space-y-3">
        {data.competitors.map((c) => (
          <Card key={c.name}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <CardTitle className="text-base">{c.name}</CardTitle>
                  <a href={`https://${c.website}`} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:underline">{c.website}</a>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Badge variant={c.category === 'direct' ? 'default' : 'outline'}>{c.category}</Badge>
                  <Badge variant="secondary">⭐ {c.usability_rating}/5</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="font-medium mb-1">Pricing</p>
                <p className="text-muted-foreground">
                  {c.pricing.model}
                  {c.pricing.starting_price_inr ? ` · from ${formatINR(c.pricing.starting_price_inr)}/mo` : ' · Free'}
                  {' — '}{c.pricing.pricing_details}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="font-medium text-green-700 mb-1">Strengths</p>
                  <ul className="text-muted-foreground space-y-0.5">
                    {c.strengths.map((s) => <li key={s}>• {s}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-red-700 mb-1">Weaknesses</p>
                  <ul className="text-muted-foreground space-y-0.5">
                    {c.weaknesses.map((w) => <li key={w}>• {w}</li>)}
                  </ul>
                </div>
              </div>
              <p className={`text-xs ${sentimentColors[c.market_sentiment]}`}>
                {c.market_sentiment} sentiment — {c.sentiment_reason}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
