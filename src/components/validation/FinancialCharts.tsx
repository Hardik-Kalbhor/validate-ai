'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatINRCompact, formatINR } from '@/lib/utils';
import type { FinancialModel } from '@/schemas/financial-model.schema';
import { FinancialBmcView } from './FinancialBmcView';

interface Props { data: FinancialModel }

export function FinancialCharts({ data }: Props) {
  const { revenue_forecast: rf, cost_structure: cs, market_size_inr: ms } = data;

  const revenueData = [
    { year: 'Year 1', Conservative: rf.year1_conservative, Optimistic: rf.year1_optimistic },
    { year: 'Year 2', Conservative: rf.year2_conservative, Optimistic: rf.year2_optimistic },
    { year: 'Year 3', Conservative: rf.year3_conservative, Optimistic: rf.year3_optimistic },
  ];

  return (
    <div className="space-y-6">
      {/* Key metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
        {[
          { label: 'Break-Even', value: `${data.break_even_months} months` },
          { label: 'Gross Margin', value: `${cs.gross_margin_percent}%` },
          { label: 'CAC', value: formatINR(cs.cac) },
          { label: 'LTV', value: formatINR(cs.ltv) },
        ].map(({ label, value }) => (
          <Card key={label}><CardContent className="p-4">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="font-bold mt-1">{value}</p>
          </CardContent></Card>
        ))}
      </div>

      {/* Market size */}
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm">Market Size (INR)</CardTitle></CardHeader>
        <CardContent className="flex gap-4 text-sm flex-wrap">
          {[['TAM', ms.tam], ['SAM', ms.sam], ['SOM', ms.som]].map(([k, v]) => (
            <div key={k}><p className="text-xs text-muted-foreground">{k}</p>
              <p className="font-bold">{formatINRCompact(v as number)}</p>
            </div>
          ))}
          <Badge variant="outline" className="self-end">{data.market_growth_rate_percent}% growth/yr</Badge>
        </CardContent>
      </Card>

      {/* Revenue chart */}
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm">3-Year Revenue Forecast</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" fontSize={12} />
              <YAxis tickFormatter={(v) => formatINRCompact(v)} fontSize={11} />
              <Tooltip formatter={(v) => formatINR(v as number)} />
              <Legend />
              <Bar dataKey="Conservative" fill="hsl(var(--chart-2))" />
              <Bar dataKey="Optimistic" fill="hsl(var(--chart-1))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pricing + India notes */}
      <Card><CardContent className="p-4 text-sm space-y-2">
        <p><span className="font-medium">Pricing Strategy: </span>
          {data.pricing_strategy.model} · <strong>{formatINR(data.pricing_strategy.recommended_price_inr)}</strong></p>
        <p className="text-muted-foreground">{data.pricing_strategy.rationale}</p>
        <p className="text-muted-foreground border-t pt-2">{data.india_market_notes}</p>
      </CardContent></Card>

      <FinancialBmcView bmc={data.bmc} />
    </div>
  );
}
