'use client';

import { useValidationRun } from '@/hooks/useValidationRun';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CompetitorTable } from './CompetitorTable';
import { TechFeasibilityView } from './TechFeasibilityView';
import { FinancialCharts } from './FinancialCharts';
import { SynthesisView } from './SynthesisView';
import { Skeleton } from '@/components/ui/skeleton';
import type { CompetitorAnalysis } from '@/schemas/competitor.schema';
import type { TechFeasibility } from '@/schemas/tech-feasibility.schema';
import type { FinancialModel } from '@/schemas/financial-model.schema';
import type { Synthesis } from '@/schemas/synthesis.schema';

interface Props { runId: string }

export function ResultsTabs({ runId }: Props) {
  const { results } = useValidationRun(runId);

  const tabs = [
    { value: 'competitors', label: 'Competitors', status: results?.competitor_status, data: results?.competitors },
    { value: 'tech', label: 'Tech', status: results?.tech_status, data: results?.tech_feasibility },
    { value: 'finance', label: 'Finance', status: results?.financial_status, data: results?.financial_model },
    { value: 'synthesis', label: 'Synthesis', status: results?.synthesis_status, data: results?.synthesis },
  ];

  return (
    <Tabs defaultValue="competitors">
      <TabsList className="w-full grid grid-cols-4">
        {tabs.map(({ value, label, status }) => (
          <TabsTrigger key={value} value={value} disabled={!status || status === 'pending'}>
            {label}
            {status === 'running' && ' ⟳'}
            {status === 'completed' && ' ✓'}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="competitors" className="mt-4">
        {results?.competitor_status === 'completed' && results.competitors
          ? <CompetitorTable data={results.competitors as CompetitorAnalysis} />
          : <Skeleton className="h-64 w-full rounded-xl" />}
      </TabsContent>

      <TabsContent value="tech" className="mt-4">
        {results?.tech_status === 'completed' && results.tech_feasibility
          ? <TechFeasibilityView data={results.tech_feasibility as TechFeasibility} />
          : <Skeleton className="h-64 w-full rounded-xl" />}
      </TabsContent>

      <TabsContent value="finance" className="mt-4">
        {results?.financial_status === 'completed' && results.financial_model
          ? <FinancialCharts data={results.financial_model as FinancialModel} />
          : <Skeleton className="h-64 w-full rounded-xl" />}
      </TabsContent>

      <TabsContent value="synthesis" className="mt-4">
        {results?.synthesis_status === 'completed' && results.synthesis
          ? <SynthesisView data={results.synthesis as Synthesis} />
          : <Skeleton className="h-64 w-full rounded-xl" />}
      </TabsContent>
    </Tabs>
  );
}
