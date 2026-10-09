'use client';

import { useEffect, useState, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';

export interface ValidationRun {
  id: string;
  idea_text: string;
  language: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  error_message: string | null;
  created_at: string;
  completed_at: string | null;
}

export interface ValidationResults {
  run_id: string;
  brief?: unknown;
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
  updated_at: string;
}

/**
 * Subscribes to Supabase Realtime for a specific validation run.
 * Returns live-updating run + results as each agent completes.
 * If initialRun / initialResults are provided (from server components),
 * it seeds the state immediately so no client-side re-fetch is required.
 */
export function useValidationRun(
  runId: string,
  initialRun?: ValidationRun,
  initialResults?: ValidationResults
) {
  const [run, setRun] = useState<ValidationRun | null>(initialRun ?? null);
  const [results, setResults] = useState<ValidationResults | null>(initialResults ?? null);
  const [isLoading, setIsLoading] = useState(!initialRun || !initialResults);

  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    let isSubscribed = true;
    let pollInterval: NodeJS.Timeout | null = null;
    let channel: ReturnType<typeof supabase.channel> | null = null;

    async function loadInitialData() {
      if (runId.startsWith('demo-')) {
        const { DEMO_RUNS, DEMO_RESULTS } = await import('@/lib/demo-data');
        const demoRun = DEMO_RUNS.find((r) => r.id === runId);

        if (demoRun) {
          // Pre-built demo fixture (demo-run-1 / demo-run-2) — show full data
          if (isSubscribed) {
            setRun(demoRun as ValidationRun);
            const demoRes = DEMO_RESULTS[runId];
            if (demoRes) setResults(demoRes as unknown as ValidationResults);
            setIsLoading(false);
          }
        } else {
          // User-submitted run (demo / offline / in-memory mode)
          if (initialRun) setRun(initialRun);
          if (initialResults) setResults(initialResults);

          // If already completed or failed, no polling needed
          if (initialRun?.status === 'completed' || initialRun?.status === 'failed') {
            setIsLoading(false);
            return;
          }

          const poll = async () => {
            if (!isSubscribed) return;
            try {
              const res = await fetch(`/api/pending-run/${runId}`);
              if (res.ok && isSubscribed) {
                const data = (await res.json()) as { run?: ValidationRun; results?: ValidationResults };
                if (data.run) setRun(data.run);
                if (data.results) setResults(data.results);
                setIsLoading(false);

                if (data.run?.status === 'completed' || data.run?.status === 'failed') {
                  if (pollInterval) {
                    clearInterval(pollInterval);
                    pollInterval = null;
                  }
                }
              }
            } catch {
              // ignore network errors in polling
            } finally {
              if (isSubscribed) setIsLoading(false);
            }
          };

          await poll();
          if (isSubscribed) {
            pollInterval = setInterval(poll, 2500);
          }
        }
        return;
      }

      try {
        const [{ data: runData }, { data: resultsData }] = await Promise.all([
          supabase.from('validation_runs').select('*').eq('id', runId).single(),
          supabase.from('validation_results').select('*').eq('run_id', runId).single(),
        ]);
        if (isSubscribed) {
          if (runData) {
            setRun(runData as ValidationRun);
          } else {
            const { DEMO_RUNS } = await import('@/lib/demo-data');
            const demoRun = DEMO_RUNS.find((r) => r.id === runId);
            if (demoRun) setRun(demoRun as ValidationRun);
          }

          if (resultsData) {
            setResults(resultsData as ValidationResults);
          } else {
            const { DEMO_RESULTS } = await import('@/lib/demo-data');
            const demoRes = DEMO_RESULTS[runId];
            if (demoRes) setResults(demoRes as unknown as ValidationResults);
          }
          setIsLoading(false);
        }
      } catch {
        if (isSubscribed) {
          const { DEMO_RUNS, DEMO_RESULTS } = await import('@/lib/demo-data');
          const demoRun = DEMO_RUNS.find((r) => r.id === runId);
          if (demoRun) setRun(demoRun as ValidationRun);
          const demoRes = DEMO_RESULTS[runId];
          if (demoRes) setResults(demoRes as unknown as ValidationResults);
          setIsLoading(false);
        }
      }
    }

    void loadInitialData();

    // Skip Supabase realtime for demo runs or when running purely offline
    if (runId.startsWith('demo-')) {
      return () => {
        isSubscribed = false;
        if (pollInterval) {
          clearInterval(pollInterval);
        }
      };
    }

    try {
      const channelId = `run-${runId}-${Math.random().toString(36).slice(2, 7)}`;
      channel = supabase
        .channel(channelId)
        .on('postgres_changes', {
          event: 'UPDATE',
          schema: 'public',
          table: 'validation_runs',
          filter: `id=eq.${runId}`,
        }, (payload) => {
          if (isSubscribed) setRun(payload.new as ValidationRun);
        })
        .on('postgres_changes', {
          event: 'UPDATE',
          schema: 'public',
          table: 'validation_results',
          filter: `run_id=eq.${runId}`,
        }, (payload) => {
          if (isSubscribed) setResults(payload.new as ValidationResults);
        })
        .subscribe();
    } catch {
      // Realtime subscription fallback
    }

    return () => {
      isSubscribed = false;
      if (pollInterval) {
        clearInterval(pollInterval);
      }
      if (channel) {
        void supabase.removeChannel(channel);
      }
    };
  }, [runId, supabase, initialRun, initialResults]);

  return { run, results, isLoading };
}
