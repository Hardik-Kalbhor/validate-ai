import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { createServerClient } from '@/lib/supabase/server';
import { RunHistoryItem } from '@/components/layout/RunHistoryItem';
import { PlusCircle, Inbox, FileText } from 'lucide-react';

export default async function DashboardPage() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  let dbRuns: import('@/hooks/useValidationRun').ValidationRun[] = [];
  try {
    const { data: runs, error } = await supabase
      .from('validation_runs')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    if (!error && runs) {
      dbRuns = runs as unknown as import('@/hooks/useValidationRun').ValidationRun[];
    }
  } catch {
    // DB query fallback
  }

  // Include user-submitted runs from this session for this specific user
  const { getPendingRunsByUser } = await import('@/lib/pending-runs');
  const userPendingRuns = getPendingRunsByUser(user.id);

  // Combine user's pending runs and persisted DB runs (deduplicating by ID)
  const runsMap = new Map<string, import('@/hooks/useValidationRun').ValidationRun>();
  for (const run of userPendingRuns) {
    runsMap.set(run.id, run as unknown as import('@/hooks/useValidationRun').ValidationRun);
  }
  for (const run of dbRuns) {
    runsMap.set(run.id, run);
  }

  const userRuns = Array.from(runsMap.values()).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  // ONLY load static DEMO_RUNS if specifically running the mock offline test user in non-production
  const isMockDemoAccount =
    user.id === '00000000-0000-0000-0000-000000000001' &&
    process.env.NODE_ENV !== 'production' &&
    process.env.ENABLE_DEMO_AUTH === 'true';

  let displayRuns = userRuns;
  if (isMockDemoAccount && userRuns.length === 0) {
    const { DEMO_RUNS } = await import('@/lib/demo-data');
    displayRuns = DEMO_RUNS as unknown as import('@/hooks/useValidationRun').ValidationRun[];
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Validations</h1>
        <Button asChild>
          <Link href="/validate"><PlusCircle className="mr-2 h-4 w-4" />New Validation</Link>
        </Button>
      </div>

      {displayRuns.length === 0 ? (
        <div className="border rounded-xl p-12 text-center text-muted-foreground bg-card/40">
          <Inbox className="h-10 w-10 mx-auto mb-3 opacity-40 text-muted-foreground" />
          <p className="font-semibold text-foreground text-base">No validations yet</p>
          <p className="text-sm mt-1">Validate your first business idea to get started.</p>
          <div className="flex items-center justify-center gap-3 mt-5">
            <Button asChild>
              <Link href="/validate">
                <PlusCircle className="mr-1.5 h-4 w-4" />
                Validate an Idea
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/validate/demo-run-1">
                <FileText className="mr-1.5 h-4 w-4" />
                View Sample Report
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {displayRuns.map((run) => (
            <RunHistoryItem key={run.id} run={run as Parameters<typeof RunHistoryItem>[0]['run']} />
          ))}
        </div>
      )}
    </div>
  );
}
