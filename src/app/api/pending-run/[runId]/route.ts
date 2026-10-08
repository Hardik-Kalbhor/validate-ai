import { NextRequest, NextResponse } from 'next/server';
import { getPendingRun, getPendingResults } from '@/lib/pending-runs';

interface Props {
  params: Promise<{ runId: string }>;
}

/**
 * GET /api/pending-run/[runId]
 *
 * Returns run metadata and generated results for a user-submitted validation.
 */
export async function GET(_req: NextRequest, { params }: Props) {
  const { runId } = await params;
  const run = getPendingRun(runId);
  const results = getPendingResults(runId);

  if (!run && !results) {
    return NextResponse.json({ error: 'Run not found' }, { status: 404 });
  }

  return NextResponse.json({ run, results });
}
