import type { CompetitorAnalysis } from '@/schemas/competitor.schema';
import type { TechFeasibility } from '@/schemas/tech-feasibility.schema';
import type { FinancialModel } from '@/schemas/financial-model.schema';
import type { LegalRegulatory } from '@/schemas/legal-regulatory.schema';
import type { GlobalPrecedents } from '@/schemas/global-precedents.schema';
import type { Synthesis } from '@/schemas/synthesis.schema';

export interface PendingRun {
  id: string;
  user_id: string;
  idea_text: string;
  language: string;
  business_type: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  error_message: string | null;
  created_at: string;
  completed_at: string | null;
}

export type AgentExecutionStatus = 'pending' | 'running' | 'completed' | 'failed';

export interface PendingResults {
  run_id: string;
  competitors: CompetitorAnalysis | null;
  competitor_status: AgentExecutionStatus;
  tech_feasibility: TechFeasibility | null;
  tech_status: AgentExecutionStatus;
  financial_model: FinancialModel | null;
  financial_status: AgentExecutionStatus;
  legal_regulatory: LegalRegulatory | null;
  legal_status: AgentExecutionStatus;
  global_benchmarks: GlobalPrecedents | null;
  global_status: AgentExecutionStatus;
  synthesis: Synthesis | null;
  synthesis_status: AgentExecutionStatus;
  updated_at: string;
}

// Global store to persist in-memory across hot reloads in Next.js development
const globalForStores = globalThis as unknown as {
  __pendingRunsStore?: Map<string, PendingRun>;
  __pendingResultsStore?: Map<string, PendingResults>;
};

if (!globalForStores.__pendingRunsStore) {
  globalForStores.__pendingRunsStore = new Map<string, PendingRun>();
}
if (!globalForStores.__pendingResultsStore) {
  globalForStores.__pendingResultsStore = new Map<string, PendingResults>();
}

const runsStore = globalForStores.__pendingRunsStore;
const resultsStore = globalForStores.__pendingResultsStore;

export function initPendingResults(runId: string): PendingResults {
  return {
    run_id: runId,
    competitors: null,
    competitor_status: 'pending',
    tech_feasibility: null,
    tech_status: 'pending',
    financial_model: null,
    financial_status: 'pending',
    legal_regulatory: null,
    legal_status: 'pending',
    global_benchmarks: null,
    global_status: 'pending',
    synthesis: null,
    synthesis_status: 'pending',
    updated_at: new Date().toISOString(),
  };
}

export function setPendingRun(run: PendingRun): void {
  runsStore.set(run.id, run);
  if (!resultsStore.has(run.id)) {
    resultsStore.set(run.id, initPendingResults(run.id));
  }
}

export function updatePendingRun(id: string, updates: Partial<PendingRun>): void {
  const existing = runsStore.get(id);
  if (existing) {
    runsStore.set(id, { ...existing, ...updates });
  }
}

export function getPendingRun(id: string): PendingRun | undefined {
  return runsStore.get(id);
}

export function setPendingResults(runId: string, results: PendingResults): void {
  resultsStore.set(runId, results);
}

export function updatePendingResults(runId: string, updates: Partial<PendingResults>): void {
  const existing = resultsStore.get(runId) ?? initPendingResults(runId);
  resultsStore.set(runId, {
    ...existing,
    ...updates,
    updated_at: new Date().toISOString(),
  });
}

export function getPendingResults(runId: string): PendingResults | undefined {
  return resultsStore.get(runId);
}

/** Returns all pending runs for a given user. */
export function getPendingRunsByUser(userId: string): PendingRun[] {
  return Array.from(runsStore.values()).filter((r) => r.user_id === userId);
}
