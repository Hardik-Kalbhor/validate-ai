'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Globe2,
  ExternalLink,
  Building2,
  TrendingUp,
  Lightbulb,
  CheckCircle2,
  ArrowRightLeft,
  Compass,
  Coins,
  Layers,
} from 'lucide-react';
import type { GlobalPrecedents, InternationalPrecedent } from '@/schemas/global-precedents.schema';

interface Props {
  data: GlobalPrecedents;
}

const noveltyConfig: Record<
  GlobalPrecedents['novelty_assessment'],
  { label: string; bg: string; text: string; border: string; desc: string }
> = {
  globally_proven: {
    label: 'Globally Proven Business Model',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-500/30',
    desc: 'Validated at scale by multiple successful companies outside India with proven unit economics.',
  },
  emerging_internationally: {
    label: 'Emerging Internationally',
    bg: 'bg-blue-500/10',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-500/30',
    desc: 'Rapidly growing category abroad with recent venture funding and expanding market adoption.',
  },
  failed_internationally: {
    label: 'Historically Challenged Abroad',
    bg: 'bg-amber-500/10',
    text: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-500/30',
    desc: 'Overseas predecessors faced severe unit economic or operational headwinds — crucial to analyze why.',
  },
  globally_novel: {
    label: 'Globally Novel / First-of-its-Kind',
    bg: 'bg-purple-500/10',
    text: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-500/30',
    desc: 'No direct foreign precedents identified. Hyper-localized to India or presents a wide-open blue ocean.',
  },
};

const statusConfig: Record<
  InternationalPrecedent['current_status'],
  { label: string; variant: 'default' | 'secondary' | 'outline' | 'destructive' }
> = {
  active: { label: 'Active & Operating', variant: 'outline' },
  acquired: { label: 'Acquired / M&A', variant: 'secondary' },
  ipo: { label: 'Publicly Listed (IPO)', variant: 'default' },
  shut_down: { label: 'Shut Down / Defunct', variant: 'destructive' },
  pivoted: { label: 'Pivoted Model', variant: 'secondary' },
  unknown: { label: 'Status Unknown', variant: 'outline' },
};

export function GlobalBenchmarksView({ data }: Props) {
  const novelty = noveltyConfig[data.novelty_assessment] || noveltyConfig.globally_proven;
  const businesses = data.similar_businesses || [];

  return (
    <div className="space-y-6">
      {/* ── 1. Top Executive Banner: Novelty & Global Status ── */}
      <Card className={`border ${novelty.border} ${novelty.bg}`}>
        <CardContent className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2">
              <Globe2 className={`h-5 w-5 ${novelty.text}`} />
              <span className={`text-base font-bold ${novelty.text}`}>
                {novelty.label}
              </span>
            </div>
            <p className="text-xs md:text-sm text-foreground/85 leading-relaxed">
              {novelty.desc}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 self-start md:self-auto">
            {data.geographical_distribution.map((region, idx) => (
              <Badge key={idx} variant="outline" className="text-xs bg-background/80">
                📍 {region}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── 2. Global Landscape Synthesis ── */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Compass className="h-5 w-5 text-primary" />
            International Market Overview &amp; Adoption
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {data.global_summary}
          </p>
        </CardContent>
      </Card>

      {/* ── 3. Similar Businesses Implemented Outside India ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Similar Businesses Outside India ({businesses.length})
            </h3>
            <p className="text-xs text-muted-foreground">
              Real international counterparts that built and scaled this business model abroad
            </p>
          </div>
        </div>

        {businesses.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="p-8 text-center space-y-3">
              <Globe2 className="h-10 w-10 text-muted-foreground/40 mx-auto" />
              <h4 className="font-semibold text-sm">No Direct Overseas Counterparts Identified</h4>
              <p className="text-xs text-muted-foreground max-w-lg mx-auto">
                Our global web search did not find an identical business model operating in foreign markets.
                This indicates this concept is uniquely positioned for the Indian domestic landscape or offers a high-novelty first-mover opportunity.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-5">
            {businesses.map((biz, idx) => {
              const statusMeta = statusConfig[biz.current_status] || statusConfig.active;
              return (
                <Card key={idx} className="overflow-hidden border transition-shadow hover:shadow-md">
                  <div className="border-b bg-muted/40 px-5 py-3.5 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="font-bold text-base">{biz.name}</span>
                      <Badge variant="outline" className="text-xs font-medium">
                        🌍 {biz.country}
                      </Badge>
                      {biz.year_founded && (
                        <span className="text-xs text-muted-foreground">
                          Est. {biz.year_founded}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={statusMeta.variant} className="text-xs">
                        {statusMeta.label}
                      </Badge>
                      {biz.website_or_domain && (
                        <a
                          href={biz.website_or_domain.startsWith('http') ? biz.website_or_domain : `https://${biz.website_or_domain}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary flex items-center gap-1 hover:underline ml-1"
                        >
                          Visit <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  <CardContent className="p-5 space-y-4">
                    {/* Business Overview */}
                    <div>
                      <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-1">
                        Business Overview
                      </p>
                      <p className="text-sm text-foreground/90 leading-relaxed">
                        {biz.business_overview}
                      </p>
                    </div>

                    {/* Operational & Financial Mechanics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                      <div className="rounded-lg border bg-card p-3 space-y-1">
                        <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                          <Layers className="h-3.5 w-3.5 text-primary" />
                          Implementation Model
                        </span>
                        <p className="text-xs text-foreground/80 leading-relaxed">
                          {biz.implementation_model}
                        </p>
                      </div>

                      <div className="rounded-lg border bg-card p-3 space-y-1">
                        <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                          <Coins className="h-3.5 w-3.5 text-primary" />
                          Monetization Model
                        </span>
                        <p className="text-xs text-foreground/80 leading-relaxed">
                          {biz.monetization_model}
                        </p>
                      </div>

                      <div className="rounded-lg border bg-card p-3 space-y-1">
                        <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                          <TrendingUp className="h-3.5 w-3.5 text-primary" />
                          Scale &amp; Traction
                        </span>
                        <p className="text-xs text-foreground/80 leading-relaxed">
                          {biz.traction_and_scale || 'Private / Bootstrapped'}
                        </p>
                      </div>
                    </div>

                    {/* Key Strategic Learnings for Indian Market */}
                    <div className="rounded-lg border border-amber-200/80 bg-amber-50/50 dark:border-amber-900/40 dark:bg-amber-950/20 p-3.5 space-y-1">
                      <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-400 font-semibold text-xs">
                        <Lightbulb className="h-4 w-4" />
                        Key Learnings &amp; Takeaways for the Indian Market
                      </div>
                      <p className="text-xs text-foreground/85 leading-relaxed">
                        {biz.key_learnings_for_india}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* ── 4. Cross-Border Comparison: Overseas vs India ── */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <ArrowRightLeft className="h-5 w-5 text-primary" />
            Market Differences: Overseas Conditions vs. India
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
            {data.market_differences_vs_india}
          </p>
        </CardContent>
      </Card>

      {/* ── 5. Actionable Lessons for Indian Founders ── */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            Strategic Playbook: Adapting the International Model to India
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.lessons_for_indian_founders.map((lesson, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 rounded-lg border bg-muted/20 p-3"
              >
                <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-xs text-foreground/85 leading-relaxed">
                  {lesson}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
