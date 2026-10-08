import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { createServerClient } from '@/lib/supabase/server';
import { RunHistoryItem } from '@/components/layout/RunHistoryItem';
import { PlusCircle, Inbox } from 'lucide-react';

export default async function DashboardPage() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  let runsList = null;
  try {
    const { data: runs } = await supabase
      .from('validation_runs')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    runsList = runs;
  } catch {
    // fallback below
  }

  // Include user-submitted runs from this session
  const { getPendingRunsByUser } = await import('@/lib/pending-runs');
  const userPendingRuns = getPendingRunsByUser(user.id);

  if (!runsList || runsList.length === 0) {
    const { DEMO_RUNS } = await import('@/lib/demo-data');
    runsList = [...userPendingRuns, ...DEMO_RUNS];
  } else if (userPendingRuns.length > 0) {
    runsList = [...userPendingRuns, ...runsList];
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Validations</h1>
        <Button asChild>
          <Link href="/validate"><PlusCircle className="mr-2 h-4 w-4" />New Validation</Link>
        </Button>
      </div>

      {!runsList || runsList.length === 0 ? (
        <div className="border rounded-xl p-12 text-center text-muted-foreground">
          <Inbox className="h-10 w-10 mx-auto mb-3 opacity-40" />
          <p className="font-medium">No validations yet</p>
          <p className="text-sm mt-1">Validate your first business idea to get started.</p>
          <Button className="mt-4" asChild>
            <Link href="/validate">Validate an Idea</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {runsList.map((run) => (
            <RunHistoryItem key={run.id} run={run as Parameters<typeof RunHistoryItem>[0]['run']} />
          ))}
        </div>
      )}
    </div>
  );
}
