'use client';

import { useState } from 'react';
import { useValidationRun, type ValidationRun, type ValidationResults } from '@/hooks/useValidationRun';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { CompetitorTable } from './CompetitorTable';
import { TechFeasibilityView } from './TechFeasibilityView';
import { FinancialCharts } from './FinancialCharts';
import { LegalComplianceView } from './LegalComplianceView';
import { GlobalBenchmarksView } from './GlobalBenchmarksView';
import { SynthesisView } from './SynthesisView';
import type { CompetitorAnalysis } from '@/schemas/competitor.schema';
import type { TechFeasibility } from '@/schemas/tech-feasibility.schema';
import type { FinancialModel } from '@/schemas/financial-model.schema';
import type { LegalRegulatory } from '@/schemas/legal-regulatory.schema';
import type { GlobalPrecedents } from '@/schemas/global-precedents.schema';
import type { Synthesis } from '@/schemas/synthesis.schema';
import {
  Search,
  Cpu,
  TrendingUp,
  Scale,
  Globe,
  Brain,
  CheckCircle2,
  Loader2,
  Clock,
  XCircle,
  LayoutGrid,
  FileText,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type TabKey = 'competitors' | 'tech' | 'finance' | 'legal' | 'global' | 'synthesis';

interface Props {
  runId: string;
  initialRun?: ValidationRun;
  initialResults?: ValidationResults;
}

const AGENT_CONFIG = [
  {
    key: 'competitors' as TabKey,
    label: 'Competitor Analysis',
    shortLabel: 'Competitors',
    icon: Search,
    statusField: 'competitor_status' as const,
  },
  {
    key: 'tech' as TabKey,
    label: 'Tech Feasibility',
    shortLabel: 'Tech Feasibility',
    icon: Cpu,
    statusField: 'tech_status' as const,
  },
  {
    key: 'finance' as TabKey,
    label: 'Financial Modeling',
    shortLabel: 'Financial Model',
    icon: TrendingUp,
    statusField: 'financial_status' as const,
  },
  {
    key: 'legal' as TabKey,
    label: 'Legal & Compliance',
    shortLabel: 'Legal',
    icon: Scale,
    statusField: 'legal_status' as const,
  },
  {
    key: 'global' as TabKey,
    label: 'Global Precedents',
    shortLabel: 'Global Models',
    icon: Globe,
    statusField: 'global_status' as const,
  },
  {
    key: 'synthesis' as TabKey,
    label: 'Synthesis & Verdict',
    shortLabel: 'Synthesis',
    icon: Brain,
    statusField: 'synthesis_status' as const,
  },
];

function AgentStatusPlaceholder({ status, label }: { status?: string; label: string }) {
  if (status === 'failed') {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{label} Failed</AlertTitle>
        <AlertDescription>
          This agent encountered an issue during analysis. Other agent outputs remain available.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4 py-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin text-primary" />
        <span>
          {status === 'running'
            ? `${label} is analyzing in real-time...`
            : `Waiting for ${label} to start...`}
        </span>
      </div>
      <Skeleton className="h-64 w-full rounded-xl" />
    </div>
  );
}

export function UnifiedResultsView({ runId, initialRun, initialResults }: Props) {
  const { results, isLoading } = useValidationRun(runId, initialRun, initialResults);
  const [activeTab, setActiveTab] = useState<TabKey>('competitors');
  const [viewMode, setViewMode] = useState<'tabs' | 'all'>('tabs');

  // Count agent completion progress
  const completedCount = AGENT_CONFIG.filter(
    (a) => results?.[a.statusField] === 'completed'
  ).length;
  const isAllComplete = completedCount === AGENT_CONFIG.length;

  return (
    <div className="space-y-8">
      {/* ── 1. Top Navigation & Progress Bar ── */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-2 border-b">
          <div>
            <h2 className="text-xl font-bold tracking-tight">AI Agent Pipeline Results</h2>
            <p className="text-xs text-muted-foreground">
              {isAllComplete
                ? 'All 6 validation agents finished. Full synthesis ready.'
                : `${completedCount} of 6 agents finished. Real-time updates active.`}
            </p>
          </div>

          {/* Toggle between Tabbed View and Full Continuous Report */}
          <div className="flex items-center gap-1.5 bg-muted/60 p-1 rounded-lg border text-xs">
            <Button
              size="sm"
              variant={viewMode === 'tabs' ? 'default' : 'ghost'}
              className="h-7 px-3 text-xs gap-1.5"
              onClick={() => setViewMode('tabs')}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              Tabs View
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'all' ? 'default' : 'ghost'}
              className="h-7 px-3 text-xs gap-1.5"
              onClick={() => setViewMode('all')}
            >
              <FileText className="h-3.5 w-3.5" />
              Full Report
            </Button>
          </div>
        </div>

        {/* ── Agent Status Header Cards (Clickable Quick-Jump) ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {AGENT_CONFIG.map(({ key, label, icon: Icon, statusField }) => {
            const status = results?.[statusField] ?? 'pending';
            const isSelected = viewMode === 'tabs' && activeTab === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setActiveTab(key);
                  if (viewMode === 'all') {
                    // Scroll to section in full report mode
                    const el = document.getElementById(`section-${key}`);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
              >
                <Card
                  className={cn(
                    'h-full transition-all duration-200 cursor-pointer hover:shadow-md hover:border-primary/60',
                    isSelected && 'ring-2 ring-primary border-primary shadow-sm bg-primary/5',
                    status === 'completed' && !isSelected && 'border-green-500/40 bg-green-50/20 dark:bg-green-950/10',
                    status === 'failed' && 'border-destructive/50 bg-destructive/5',
                    status === 'running' && 'border-primary/50 animate-pulse'
                  )}
                >
                  <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                    <Icon
                      className={cn(
                        'h-5 w-5',
                        status === 'completed' ? 'text-green-600' : 'text-muted-foreground'
                      )}
                    />
                    <p className="text-xs font-semibold leading-tight">{label}</p>
                    {isLoading || status === 'pending' ? (
                      <Clock className="h-4 w-4 text-muted-foreground/50" />
                    ) : status === 'running' ? (
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    ) : status === 'completed' ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-destructive" />
                    )}
                    <Badge
                      variant={
                        status === 'completed'
                          ? 'outline'
                          : status === 'failed'
                          ? 'destructive'
                          : 'secondary'
                      }
                      className="text-xs capitalize"
                    >
                      {status}
                    </Badge>
                  </CardContent>
                </Card>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 2. Content Views (Tabs or Full Scrolling Report) ── */}
      {viewMode === 'tabs' ? (
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabKey)}>
          <TabsList className="w-full grid grid-cols-3 sm:grid-cols-6 h-auto p-1 gap-1">
            {AGENT_CONFIG.map(({ key, shortLabel, icon: Icon, statusField }) => {
              const status = results?.[statusField];
              return (
                <TabsTrigger key={key} value={key} className="text-xs md:text-sm gap-1.5 font-medium py-2">
                  <Icon className="h-4 w-4" />
                  <span>{shortLabel}</span>
                  {status === 'completed' && <span className="text-green-600 ml-0.5">✓</span>}
                  {status === 'running' && <span className="text-primary ml-0.5">⟳</span>}
                  {status === 'failed' && <span className="text-destructive ml-0.5">✗</span>}
                </TabsTrigger>
              );
            })}
          </TabsList>

          <TabsContent value="competitors" className="mt-4">
            {results?.competitor_status === 'completed' && results.competitors ? (
              <CompetitorTable data={results.competitors as CompetitorAnalysis} />
            ) : (
              <AgentStatusPlaceholder
                status={results?.competitor_status}
                label="Competitor Analysis"
              />
            )}
          </TabsContent>

          <TabsContent value="tech" className="mt-4">
            {results?.tech_status === 'completed' && results.tech_feasibility ? (
              <TechFeasibilityView data={results.tech_feasibility as TechFeasibility} />
            ) : (
              <AgentStatusPlaceholder
                status={results?.tech_status}
                label="Tech Feasibility"
              />
            )}
          </TabsContent>

          <TabsContent value="finance" className="mt-4">
            {results?.financial_status === 'completed' && results.financial_model ? (
              <FinancialCharts data={results.financial_model as FinancialModel} />
            ) : (
              <AgentStatusPlaceholder
                status={results?.financial_status}
                label="Financial Modeling"
              />
            )}
          </TabsContent>

          <TabsContent value="legal" className="mt-4">
            {results?.legal_status === 'completed' && results.legal_regulatory ? (
              <LegalComplianceView data={results.legal_regulatory as LegalRegulatory} />
            ) : (
              <AgentStatusPlaceholder
                status={results?.legal_status}
                label="Legal & Compliance"
              />
            )}
          </TabsContent>

          <TabsContent value="global" className="mt-4">
            {results?.global_status === 'completed' && results.global_benchmarks ? (
              <GlobalBenchmarksView data={results.global_benchmarks as GlobalPrecedents} />
            ) : (
              <AgentStatusPlaceholder
                status={results?.global_status}
                label="Global Benchmarks & Precedents"
              />
            )}
          </TabsContent>

          <TabsContent value="synthesis" className="mt-4">
            {results?.synthesis_status === 'completed' && results.synthesis ? (
              <SynthesisView data={results.synthesis as Synthesis} />
            ) : (
              <AgentStatusPlaceholder
                status={results?.synthesis_status}
                label="Synthesis & Verdict"
              />
            )}
          </TabsContent>
        </Tabs>
      ) : (
        /* ── Full Continuous Scrolling Report (All 6 sections) ── */
        <div className="space-y-12 pt-2">
          {/* Section 1: Competitors */}
          <section id="section-competitors" className="space-y-3">
            <div className="flex items-center gap-2 border-b pb-2">
              <Search className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold">1. Competitor Intelligence & Market Gap</h2>
            </div>
            {results?.competitor_status === 'completed' && results.competitors ? (
              <CompetitorTable data={results.competitors as CompetitorAnalysis} />
            ) : (
              <AgentStatusPlaceholder
                status={results?.competitor_status}
                label="Competitor Analysis"
              />
            )}
          </section>

          {/* Section 2: Tech Feasibility */}
          <section id="section-tech" className="space-y-3">
            <div className="flex items-center gap-2 border-b pb-2">
              <Cpu className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold">2. Technical Architecture & Feasibility</h2>
            </div>
            {results?.tech_status === 'completed' && results.tech_feasibility ? (
              <TechFeasibilityView data={results.tech_feasibility as TechFeasibility} />
            ) : (
              <AgentStatusPlaceholder
                status={results?.tech_status}
                label="Tech Feasibility"
              />
            )}
          </section>

          {/* Section 3: Financial Modeling */}
          <section id="section-finance" className="space-y-3">
            <div className="flex items-center gap-2 border-b pb-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold">3. Financial Projections & Unit Economics</h2>
            </div>
            {results?.financial_status === 'completed' && results.financial_model ? (
              <FinancialCharts data={results.financial_model as FinancialModel} />
            ) : (
              <AgentStatusPlaceholder
                status={results?.financial_status}
                label="Financial Modeling"
              />
            )}
          </section>

          {/* Section 4: Legal & Compliance */}
          <section id="section-legal" className="space-y-3">
            <div className="flex items-center gap-2 border-b pb-2">
              <Scale className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold">4. Legal, Regulatory & Compliance Framework</h2>
            </div>
            {results?.legal_status === 'completed' && results.legal_regulatory ? (
              <LegalComplianceView data={results.legal_regulatory as LegalRegulatory} />
            ) : (
              <AgentStatusPlaceholder
                status={results?.legal_status}
                label="Legal & Compliance"
              />
            )}
          </section>

          {/* Section 5: Global Benchmarks & Precedents */}
          <section id="section-global" className="space-y-3">
            <div className="flex items-center gap-2 border-b pb-2">
              <Globe className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold">5. Global Precedents & International Models</h2>
            </div>
            {results?.global_status === 'completed' && results.global_benchmarks ? (
              <GlobalBenchmarksView data={results.global_benchmarks as GlobalPrecedents} />
            ) : (
              <AgentStatusPlaceholder
                status={results?.global_status}
                label="Global Benchmarks & Precedents"
              />
            )}
          </section>

          {/* Section 6: Synthesis */}
          <section id="section-synthesis" className="space-y-3">
            <div className="flex items-center gap-2 border-b pb-2">
              <Brain className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold">6. Investment Synthesis & Action Plan</h2>
            </div>
            {results?.synthesis_status === 'completed' && results.synthesis ? (
              <SynthesisView data={results.synthesis as Synthesis} />
            ) : (
              <AgentStatusPlaceholder
                status={results?.synthesis_status}
                label="Synthesis & Verdict"
              />
            )}
          </section>
        </div>
      )}
    </div>
  );
}
