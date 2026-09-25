'use client';

import { useEffect, useState, useCallback } from 'react';
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
  competitors: unknown;
  competitor_status: string;
  tech_feasibility: unknown;
  tech_status: string;
  financial_model: unknown;
  financial_status: string;
  synthesis: unknown;
  synthesis_status: string;
  updated_at: string;
}

/**
 * Subscribes to Supabase Realtime for a specific validation run.
 * Returns live-updating run + results as each agent completes.
 */
export function useValidationRun(runId: string) {
  const [run, setRun] = useState<ValidationRun | null>(null);
  const [results, setResults] = useState<ValidationResults | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const supabase = createClient();

  const fetchInitialData = useCallback(async () => {
    const [{ data: runData }, { data: resultsData }] = await Promise.all([
      supabase.from('validation_runs').select('*').eq('id', runId).single(),
      supabase.from('validation_results').select('*').eq('run_id', runId).single(),
    ]);
    if (runData) setRun(runData as ValidationRun);
    if (resultsData) setResults(resultsData as ValidationResults);
    setIsLoading(false);
  }, [runId, supabase]);

  useEffect(() => {
    fetchInitialData();

    // Subscribe to live updates
    const channel = supabase
      .channel(`run-${runId}`)
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'validation_runs',
        filter: `id=eq.${runId}`,
      }, (payload) => setRun(payload.new as ValidationRun))
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'validation_results',
        filter: `run_id=eq.${runId}`,
      }, (payload) => setResults(payload.new as ValidationResults))
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [runId, fetchInitialData, supabase]);

  return { run, results, isLoading };
}
