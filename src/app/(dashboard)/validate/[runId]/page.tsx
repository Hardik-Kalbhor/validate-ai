import { notFound } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import { AgentStatusCards } from '@/components/validation/AgentStatusCards';
import { ResultsTabs } from '@/components/validation/ResultsTabs';
import { Badge } from '@/components/ui/badge';
import { truncate } from '@/lib/utils';

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

  if (!run) return notFound();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-xl font-bold truncate">{truncate(run.idea_text, 80)}</h1>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant={statusColors[run.status] as 'default' | 'secondary' | 'outline' | 'destructive'}>
              {run.status}
            </Badge>
            <Badge variant="outline">{run.language.toUpperCase()}</Badge>
            <span className="text-xs text-muted-foreground">
              {new Date(run.created_at).toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {/* Live agent status cards + results tabs */}
      <AgentStatusCards runId={runId} />
      <ResultsTabs runId={runId} />
    </div>
  );
}
