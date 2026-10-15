'use client';

import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatINRCompact, formatINR } from '@/lib/utils';
import type { FinancialModel } from '@/schemas/financial-model.schema';
import { FinancialBmcView } from './FinancialBmcView';
import { FinancialSensitivitySimulator } from './FinancialSensitivitySimulator';
import { getEligibleGovernmentSchemes, ALL_INDIAN_STATES } from '@/lib/government-schemes';
import { ArrowUpRight, TrendingUp, Coins, Landmark, ExternalLink, MapPin } from 'lucide-react';

interface Props {
  data: FinancialModel;
  ideaText?: string;
}

interface TooltipPayloadItem {
  dataKey: string;
  value: number;
  color?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const conservative = payload.find((p) => p.dataKey === 'Conservative')?.value ?? 0;
    const optimistic = payload.find((p) => p.dataKey === 'Optimistic')?.value ?? 0;
    const multiple = conservative > 0 ? (optimistic / conservative).toFixed(1) : null;

    return (
      <div className="bg-popover border border-border rounded-lg p-3 shadow-xl text-xs space-y-2 min-w-[200px]">
        <p className="font-bold text-sm text-popover-foreground border-b border-border pb-1.5 flex items-center justify-between">
          <span>{label} Forecast</span>
          <span className="text-[10px] font-normal text-muted-foreground uppercase tracking-wider">Annual</span>
        </p>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-medium">
              <span className="h-2.5 w-2.5 rounded-sm bg-blue-500 inline-block" />
              Conservative:
            </span>
            <span className="font-bold text-foreground">{formatINR(conservative)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
              <span className="h-2.5 w-2.5 rounded-sm bg-emerald-500 inline-block" />
              Optimistic:
            </span>
            <span className="font-bold text-foreground">{formatINR(optimistic)}</span>
          </div>
        </div>
        {multiple && (
          <div className="text-[11px] text-muted-foreground pt-1.5 border-t border-border flex items-center gap-1 font-medium">
            <ArrowUpRight className="h-3.5 w-3.5 text-emerald-500" />
            <span>Optimistic scenario is <strong className="text-foreground">{multiple}x</strong> base</span>
          </div>
        )}
      </div>
    );
  }
  return null;
}

export function FinancialCharts({ data, ideaText }: Props) {
  const { revenue_forecast: rf, cost_structure: cs, market_size_inr: ms } = data;
  const [selectedState, setSelectedState] = useState<string>('Karnataka');

  const eligibleSchemes = getEligibleGovernmentSchemes(
    ideaText || 'agritech logistics platform',
    undefined,
    selectedState
  );

  const revenueData = [
    { year: 'Year 1', Conservative: rf.year1_conservative, Optimistic: rf.year1_optimistic },
    { year: 'Year 2', Conservative: rf.year2_conservative, Optimistic: rf.year2_optimistic },
    { year: 'Year 3', Conservative: rf.year3_conservative, Optimistic: rf.year3_optimistic },
  ];

  return (
    <div className="space-y-6">
      {/* ── Key Metrics ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-sm">
        {[
          { label: 'Break-Even', value: `${data.break_even_months} months` },
          { label: 'Gross Margin', value: `${cs.gross_margin_percent}%` },
          { label: 'Initial CapEx', value: formatINRCompact(cs.initial_investment) },
          { label: 'Monthly OpEx', value: formatINRCompact(cs.monthly_opex) },
          { label: 'CAC (Acquisition)', value: formatINR(cs.cac) },
          { label: 'LTV (Lifetime Value)', value: formatINR(cs.ltv) },
        ].map(({ label, value }) => (
          <Card key={label}>
            <CardContent className="p-3.5">
              <p className="text-[11px] text-muted-foreground">{label}</p>
              <p className="text-base font-bold mt-0.5 text-foreground">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Real-Time Interactive Sensitivity Simulator ── */}
      <FinancialSensitivitySimulator
        initialAOV={data.pricing_strategy.recommended_price_inr || 1400}
        initialCAC={cs.cac || 340}
        initialTakeRate={16}
        initialDeliveryCost={55}
        initialFixedOpEx={cs.monthly_opex || 375000}
      />

      {/* ── Market Size ── */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <CardTitle className="text-sm font-semibold">Addressable Market Sizing (INR)</CardTitle>
            <Badge variant="outline" className="text-xs font-medium">
              <TrendingUp className="h-3 w-3 mr-1 text-emerald-500" />
              {data.market_growth_rate_percent}% annual category growth
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex gap-6 text-sm flex-wrap pt-1">
          {[
            { tag: 'TAM', label: 'Total Market', val: ms.tam },
            { tag: 'SAM', label: 'Serviceable Market', val: ms.sam },
            { tag: 'SOM', label: 'Target Year 1-3', val: ms.som },
          ].map(({ tag, label, val }) => (
            <div key={tag} className="space-y-0.5">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-muted-foreground">{tag}</span>
                <span className="text-[11px] text-muted-foreground/75">({label})</span>
              </div>
              <p className="text-lg font-bold text-foreground">{formatINRCompact(val)}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ── Enhanced 3-Year Revenue Forecast Bar Chart ── */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <CardTitle className="text-base font-bold">3-Year Revenue Projections</CardTitle>
              <CardDescription className="text-xs mt-0.5">
                Comparative trajectory: Conservative baseline vs. Optimistic expansion
              </CardDescription>
            </div>
            <div className="flex items-center gap-3 text-xs font-medium">
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-sm bg-blue-500 inline-block" />
                Conservative
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-sm bg-emerald-500 inline-block" />
                Optimistic
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-2">
          {/* Summary Range Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-5">
            {revenueData.map((d) => (
              <div key={d.year} className="bg-muted/40 border border-border/60 rounded-lg p-2.5 text-xs">
                <div className="flex items-center justify-between text-muted-foreground mb-1 font-medium">
                  <span className="font-semibold text-foreground">{d.year}</span>
                  <span>Projected Range</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">
                    {formatINRCompact(d.Conservative)}
                  </span>
                  <span className="text-muted-foreground/60 text-xs">to</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                    {formatINRCompact(d.Optimistic)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* High-Clarity Bar Chart */}
          <div className="w-full h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={revenueData}
                margin={{ top: 28, right: 16, left: 0, bottom: 8 }}
                barGap={8}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                <XAxis
                  dataKey="year"
                  tickLine={false}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                  fontSize={13}
                  fontWeight={600}
                  tickMargin={8}
                />
                <YAxis
                  tickFormatter={(v) => formatINRCompact(v)}
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  width={75}
                  tickMargin={6}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="Conservative"
                  name="Conservative"
                  fill="#3b82f6"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={52}
                >
                  <LabelList
                    dataKey="Conservative"
                    position="top"
                    formatter={(v: unknown) => formatINRCompact(Number(v))}
                    fontSize={11}
                    className="font-bold fill-blue-600 dark:fill-blue-400"
                    offset={8}
                  />
                </Bar>
                <Bar
                  dataKey="Optimistic"
                  name="Optimistic"
                  fill="#10b981"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={52}
                >
                  <LabelList
                    dataKey="Optimistic"
                    position="top"
                    formatter={(v: unknown) => formatINRCompact(Number(v))}
                    fontSize={11}
                    className="font-bold fill-emerald-600 dark:fill-emerald-400"
                    offset={8}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* ── Pricing Strategy & Market Context ── */}
      <Card>
        <CardContent className="p-5 text-sm space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-foreground">Recommended Pricing Model:</span>
            <Badge variant="secondary" className="capitalize text-xs font-semibold">
              {data.pricing_strategy.model}
            </Badge>
            <span className="text-muted-foreground">·</span>
            <span className="text-base font-bold text-foreground">
              {formatINR(data.pricing_strategy.recommended_price_inr)}
            </span>
          </div>
          <p className="text-muted-foreground leading-relaxed">{data.pricing_strategy.rationale}</p>
          <div className="border-t border-border pt-3">
            <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1">
              India Market Dynamics
            </p>
            <p className="text-muted-foreground leading-relaxed">{data.india_market_notes}</p>
          </div>
          {data.funding_insights && (
            <div className="border-t border-border pt-3">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Coins className="h-3.5 w-3.5 text-primary" />
                Venture Capital & Funding Climate
              </p>
              <p className="text-muted-foreground leading-relaxed">{data.funding_insights}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Central & State Government Grants & Subsidies Engine ── */}
      <Card className="border-emerald-500/20 bg-gradient-to-br from-card via-card to-emerald-500/5">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600">
                <Landmark className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  Eligible Government Subsidies & Non-Dilutive Capital
                  <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 text-xs font-medium">
                    Verified Schemes
                  </Badge>
                </CardTitle>
                <CardDescription className="text-xs">
                  Central and state-level startup grants, interest subventions, and tax exemptions eligible for this venture.
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 bg-background/80 border border-emerald-500/30 rounded-lg px-2.5 py-1 text-xs shadow-sm">
                <MapPin className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span className="text-muted-foreground font-medium text-[11px]">State Policy:</span>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="bg-transparent text-foreground font-semibold text-xs border-none focus:outline-none cursor-pointer pr-1"
                >
                  {ALL_INDIAN_STATES.map((st) => (
                    <option key={st} value={st} className="bg-popover text-foreground">
                      {st}
                    </option>
                  ))}
                </select>
              </div>
              <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 px-2.5 py-1 text-xs font-semibold">
                Up to ₹70L+ Non-Dilutive Grant Potential
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {eligibleSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className="p-3.5 rounded-xl border bg-card/60 hover:bg-card transition-all flex flex-col justify-between space-y-2.5"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-xs text-foreground leading-snug">
                      {scheme.name}
                    </h4>
                    <Badge variant="secondary" className="text-[10px] shrink-0 font-medium">
                      {scheme.level}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    {scheme.ministryOrDepartment}
                  </p>
                  <p className="text-xs text-foreground font-medium mt-2 leading-relaxed">
                    {scheme.financialBenefit}
                  </p>
                  <div className="mt-2 text-[11px] text-muted-foreground">
                    <span className="font-semibold text-foreground">Eligibility: </span>
                    {scheme.eligibilitySummary}
                  </div>
                </div>
                <div className="pt-2 border-t flex items-center justify-between text-xs">
                  <span className="text-[10px] font-mono text-emerald-600 font-semibold">
                    {scheme.fundingType}
                  </span>
                  <a
                    href={scheme.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-primary hover:underline flex items-center gap-1 font-medium"
                  >
                    Official Portal <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── Business Model Canvas ── */}
      <FinancialBmcView bmc={data.bmc} />
    </div>
  );
}
