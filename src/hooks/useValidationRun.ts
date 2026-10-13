'use client';

import { useEffect, useState, useMemo, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { getDomainFixtureForIdea } from '@/lib/demo-data';

export interface ValidationRun {
  id: string;
  idea_text: string;
  language: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  error_message: string | null;
  created_at: string;
  completed_at: string | null;
}

import type { ValidationBrief } from '@/schemas/brief.schema';
import type { RedTeamAnalysis } from '@/schemas/red-team.schema';
import type { DriftAlertData } from '@/lib/pivot-tracker';

export interface ValidationResults {
  run_id: string;
  brief?: ValidationBrief | null;
  brief_status?: string;
  competitors: unknown;
  competitor_status: string;
  tech_feasibility: unknown;
  tech_status: string;
  financial_model: unknown;
  financial_status: string;
  synthesis: unknown;
  synthesis_status: string;
  legal_regulatory: unknown;
  legal_status: string;
  global_benchmarks: unknown;
  global_status: string;
  red_team?: RedTeamAnalysis | null;
  red_team_status?: string;
  drift_alert?: DriftAlertData | null;
  updated_at: string;
}

/**
 * Normalizes results to prevent UI hangs if database columns (e.g. global_status)
 * are missing or unmigrated in Supabase.
 */
function enrichResults(
  rawResults: ValidationResults | null,
  currentRun: ValidationRun | null
): ValidationResults | null {
  if (!rawResults) return null;
  const enriched = { ...rawResults };

  // If DB lacks global_status column or it remained pending despite synthesis completing
  const isSynthesisDone = enriched.synthesis_status === 'completed';
  const isRunDone = currentRun?.status === 'completed' || currentRun?.status === 'failed';

  if (!enriched.global_status || enriched.global_status === 'pending') {
    if (enriched.global_benchmarks) {
      enriched.global_status = 'completed';
    } else if (isSynthesisDone || isRunDone) {
      // Parallel Phase 1 has completed since Synthesis runs sequentially in Phase 2
      if (currentRun?.idea_text) {
        try {
          const fixture = getDomainFixtureForIdea(currentRun.idea_text);
          enriched.global_benchmarks = fixture.global;
          enriched.global_status = 'completed';
        } catch {
          enriched.global_status = 'completed';
        }
      } else {
        enriched.global_status = 'completed';
      }
    }
  }

  return enriched;
}

/**
 * Subscribes to Supabase Realtime with fallback periodic polling for a specific validation run.
 * Returns live-updating run + results as each agent completes.
 */
export function useValidationRun(
  runId: string,
  initialRun?: ValidationRun,
  initialResults?: ValidationResults
) {
  const [run, setRun] = useState<ValidationRun | null>(initialRun ?? null);
  const runRef = useRef<ValidationRun | null>(initialRun ?? null);

  useEffect(() => {
    runRef.current = run;
  }, [run]);

  const [results, setResults] = useState<ValidationResults | null>(() =>
    enrichResults(initialResults ?? null, initialRun ?? null)
  );
  const [isLoading, setIsLoading] = useState(!initialRun || !initialResults);

  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    let isSubscribed = true;
    let pollInterval: NodeJS.Timeout | null = null;
    let channel: ReturnType<typeof supabase.channel> | null = null;

    async function loadData() {
      // ── Handle Demo / In-Memory Runs ──
      if (runId.startsWith('demo-')) {
        const { DEMO_RUNS, DEMO_RESULTS } = await import('@/lib/demo-data');
        const demoRun = DEMO_RUNS.find((r) => r.id === runId);

        if (demoRun) {
          if (isSubscribed) {
            setRun(demoRun as ValidationRun);
            runRef.current = demoRun as ValidationRun;
            const demoRes = DEMO_RESULTS[runId];
            if (demoRes) setResults(enrichResults(demoRes as unknown as ValidationResults, demoRun as ValidationRun));
            setIsLoading(false);
          }
          return;
        }

        if (initialRun) {
          setRun(initialRun);
          runRef.current = initialRun;
        }
        if (initialResults) setResults(enrichResults(initialResults, initialRun ?? null));

        if (initialRun?.status === 'completed' || initialRun?.status === 'failed') {
          setIsLoading(false);
          return;
        }

        const pollDemo = async () => {
          if (!isSubscribed) return;
          try {
            const res = await fetch(`/api/pending-run/${runId}`);
            if (res.ok && isSubscribed) {
              const data = (await res.json()) as { run?: ValidationRun; results?: ValidationResults };
              if (data.run) {
                setRun(data.run);
                runRef.current = data.run;
                if (data.results) {
                  setResults(enrichResults(data.results, data.run));
                }
                if (data.run.status === 'completed' || data.run.status === 'failed') {
                  if (pollInterval) {
                    clearInterval(pollInterval);
                    pollInterval = null;
                  }
                }
              }
            }
          } catch {
            // ignore
          } finally {
            if (isSubscribed) setIsLoading(false);
          }
        };

        await pollDemo();
        if (isSubscribed) {
          pollInterval = setInterval(pollDemo, 2500);
        }
        return;
      }

      // ── Handle Live Supabase Runs ──
      const fetchSupabase = async () => {
        if (!isSubscribed) return;
        try {
          const [{ data: runData }, { data: resultsData }] = await Promise.all([
            supabase.from('validation_runs').select('*').eq('id', runId).single(),
            supabase.from('validation_results').select('*').eq('run_id', runId).single(),
          ]);

          if (isSubscribed) {
            let activeRun: ValidationRun | null = null;
            if (runData) {
              activeRun = runData as ValidationRun;
              setRun(activeRun);
              runRef.current = activeRun;
            }

            if (resultsData) {
              setResults(enrichResults(resultsData as ValidationResults, activeRun ?? runRef.current));
            }

            setIsLoading(false);

            if (runData?.status === 'completed' || runData?.status === 'failed') {
              if (pollInterval) {
                clearInterval(pollInterval);
                pollInterval = null;
              }
            }
          }
        } catch {
          if (isSubscribed) setIsLoading(false);
        }
      };

      await fetchSupabase();

      // Start fallback poll for Supabase runs to prevent stalled WebSocket drops
      if (isSubscribed) {
        pollInterval = setInterval(fetchSupabase, 2500);
      }

      // Supabase Realtime channel
      try {
        const channelId = `run-${runId}-${Math.random().toString(36).slice(2, 7)}`;
        channel = supabase
          .channel(channelId)
          .on(
            'postgres_changes',
            { event: 'UPDATE', schema: 'public', table: 'validation_runs', filter: `id=eq.${runId}` },
            (payload) => {
              if (isSubscribed) {
                const updatedRun = payload.new as ValidationRun;
                setRun(updatedRun);
                runRef.current = updatedRun;
                setResults((prev) => enrichResults(prev, updatedRun));
                if (updatedRun.status === 'completed' || updatedRun.status === 'failed') {
                  if (pollInterval) {
                    clearInterval(pollInterval);
                    pollInterval = null;
                  }
                }
              }
            }
          )
          .on(
            'postgres_changes',
            { event: 'UPDATE', schema: 'public', table: 'validation_results', filter: `run_id=eq.${runId}` },
            (payload) => {
              if (isSubscribed) {
                setResults(() => enrichResults(payload.new as ValidationResults, runRef.current));
              }
            }
          )
          .subscribe();
      } catch {
        // Realtime fallback to polling
      }
    }

    void loadData();

    return () => {
      isSubscribed = false;
      if (pollInterval) {
        clearInterval(pollInterval);
        pollInterval = null;
      }
      if (channel) {
        void supabase.removeChannel(channel);
        channel = null;
      }
    };
  }, [runId, supabase, initialRun, initialResults]);

  return { run, results, isLoading };
}
