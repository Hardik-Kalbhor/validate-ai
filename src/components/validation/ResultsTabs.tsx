'use client';

import { useValidationRun, type ValidationRun, type ValidationResults } from '@/hooks/useValidationRun';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CompetitorTable } from './CompetitorTable';
import { TechFeasibilityView } from './TechFeasibilityView';
import { FinancialCharts } from './FinancialCharts';
import { SynthesisView } from './SynthesisView';
import { LegalComplianceView } from './LegalComplianceView';
import { GlobalBenchmarksView } from './GlobalBenchmarksView';
import { Skeleton } from '@/components/ui/skeleton';
import type { CompetitorAnalysis } from '@/schemas/competitor.schema';
import type { TechFeasibility } from '@/schemas/tech-feasibility.schema';
import type { FinancialModel } from '@/schemas/financial-model.schema';
import type { Synthesis } from '@/schemas/synthesis.schema';
import type { LegalRegulatory } from '@/schemas/legal-regulatory.schema';
import type { GlobalPrecedents } from '@/schemas/global-precedents.schema';

import { AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface Props {
  runId: string;
  initialRun?: ValidationRun;
  initialResults?: ValidationResults;
}

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

export function ResultsTabs({ runId, initialRun, initialResults }: Props) {
  const { results } = useValidationRun(runId, initialRun, initialResults);

  const tabs = [
    { value: 'competitors', label: 'Competitors', status: results?.competitor_status, data: results?.competitors },
    { value: 'tech', label: 'Tech', status: results?.tech_status, data: results?.tech_feasibility },
    { value: 'finance', label: 'Finance', status: results?.financial_status, data: results?.financial_model },
    { value: 'legal', label: 'Legal', status: results?.legal_status, data: results?.legal_regulatory },
    { value: 'global', label: 'Global Models', status: results?.global_status, data: results?.global_benchmarks },
    { value: 'synthesis', label: 'Synthesis', status: results?.synthesis_status, data: results?.synthesis },
  ];

  return (
    <Tabs defaultValue="competitors">
      <TabsList className="w-full grid grid-cols-6">
        {tabs.map(({ value, label, status }) => (
          <TabsTrigger key={value} value={value}>
            {label}
            {status === 'running' && ' ⟳'}
            {status === 'completed' && ' ✓'}
            {status === 'failed' && ' ✗'}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="competitors" className="mt-4">
        {results?.competitor_status === 'completed' && results.competitors
          ? <CompetitorTable data={results.competitors as CompetitorAnalysis} />
          : <AgentStatusPlaceholder status={results?.competitor_status} label="Competitor Analysis" />}
      </TabsContent>

      <TabsContent value="tech" className="mt-4">
        {results?.tech_status === 'completed' && results.tech_feasibility
          ? <TechFeasibilityView data={results.tech_feasibility as TechFeasibility} />
          : <AgentStatusPlaceholder status={results?.tech_status} label="Tech Feasibility" />}
      </TabsContent>

      <TabsContent value="finance" className="mt-4">
        {results?.financial_status === 'completed' && results.financial_model
          ? <FinancialCharts data={results.financial_model as FinancialModel} />
          : <AgentStatusPlaceholder status={results?.financial_status} label="Financial Modeling" />}
      </TabsContent>

      <TabsContent value="legal" className="mt-4">
        {results?.legal_status === 'completed' && results.legal_regulatory
          ? <LegalComplianceView data={results.legal_regulatory as LegalRegulatory} />
          : <AgentStatusPlaceholder status={results?.legal_status} label="Legal & Compliance" />}
      </TabsContent>

      <TabsContent value="global" className="mt-4">
        {results?.global_status === 'completed' && results.global_benchmarks
          ? <GlobalBenchmarksView data={results.global_benchmarks as GlobalPrecedents} />
          : <AgentStatusPlaceholder status={results?.global_status} label="Global Benchmarks & Precedents" />}
      </TabsContent>

      <TabsContent value="synthesis" className="mt-4">
        {results?.synthesis_status === 'completed' && results.synthesis
          ? <SynthesisView data={results.synthesis as Synthesis} />
          : <AgentStatusPlaceholder status={results?.synthesis_status} label="Synthesis" />}
      </TabsContent>
    </Tabs>
  );
}
