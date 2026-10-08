import { notFound } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import { UnifiedResultsView } from '@/components/validation/UnifiedResultsView';
import { Badge } from '@/components/ui/badge';
import { truncate } from '@/lib/utils';
import type { ValidationRun, ValidationResults } from '@/hooks/useValidationRun';

interface Props {
  params: Promise<{ runId: string }>;
}

const statusColors: Record<string, string> = {
  pending: 'secondary',
  running: 'default',
  completed: 'outline',
  failed: 'destructive',
};

export default async function ResultsPage({ params }: Props) {
  const { runId } = await params;
  const supabase = await createServerClient();

  const { data: run } = await supabase
    .from('validation_runs')
    .select('*')
    .eq('id', runId)
    .single();

  let runData: ValidationRun | null = run as ValidationRun | null;

  if (!runData) {
    // Check in-memory store for runs created in demo/offline mode
    const { getPendingRun } = await import('@/lib/pending-runs');
    const pending = getPendingRun(runId);
    if (pending) runData = pending as ValidationRun;
  }
  if (!runData) {
    // Fall back to static demo fixtures
    const { DEMO_RUNS } = await import('@/lib/demo-data');
    runData = (DEMO_RUNS.find((r) => r.id === runId) ?? null) as ValidationRun | null;
  }

  if (!runData) return notFound();

  // Retrieve initial results for this specific run
  let initialResults: ValidationResults | null = null;

  if (run) {
    try {
      const { data: dbResults } = await supabase
        .from('validation_results')
        .select('*')
        .eq('run_id', runId)
        .single();
      if (dbResults) {
        initialResults = dbResults as unknown as ValidationResults;
      }
    } catch {
      // ignore
    }
  }

  if (!initialResults) {
    const { getPendingResults } = await import('@/lib/pending-runs');
    const pendingResults = getPendingResults(runId);

    if (pendingResults) {
      initialResults = pendingResults as unknown as ValidationResults;
    } else {
      const { DEMO_RESULTS } = await import('@/lib/demo-data');
      if (DEMO_RESULTS[runId]) {
        initialResults = DEMO_RESULTS[runId] as unknown as ValidationResults;
      }
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-xl font-bold truncate">{truncate(runData.idea_text, 80)}</h1>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant={statusColors[runData.status] as 'default' | 'secondary' | 'outline' | 'destructive'}>
              {runData.status}
            </Badge>
            <Badge variant="outline">{runData.language.toUpperCase()}</Badge>
            <span className="text-xs text-muted-foreground">
              {new Date(runData.created_at).toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {/* Unified view with interactive card jumping and Full Report view toggle */}
      <UnifiedResultsView
        runId={runId}
        initialRun={runData}
        initialResults={initialResults ?? undefined}
      />
    </div>
  );
}
