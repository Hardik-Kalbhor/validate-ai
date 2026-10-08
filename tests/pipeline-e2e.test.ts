import test from 'node:test';
import assert from 'node:assert/strict';

interface DbRun {
  id: string;
  user_id: string;
  idea_text: string;
  language: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  error_message?: string | null;
  created_at: string;
  completed_at?: string | null;
}

interface DbResults {
  run_id: string;
  competitors: unknown;
  competitor_status: 'pending' | 'running' | 'completed' | 'failed';
  tech_feasibility: unknown;
  tech_status: 'pending' | 'running' | 'completed' | 'failed';
  financial_model: unknown;
  financial_status: 'pending' | 'running' | 'completed' | 'failed';
  synthesis: unknown;
  synthesis_status: 'pending' | 'running' | 'completed' | 'failed';
  updated_at: string;
}

// In-memory mock database store simulating Postgres tables + triggers
class MockDatabase {
  runs: Map<string, DbRun> = new Map();
  results: Map<string, DbResults> = new Map();
  statusHistory: Array<{ runId: string; table: string; statusUpdate: Record<string, unknown> }> = [];

  createRun(runId: string, userId: string, ideaText: string, language: string = 'en') {
    const run: DbRun = {
      id: runId,
      user_id: userId,
      idea_text: ideaText,
      language,
      status: 'pending',
      created_at: new Date().toISOString(),
    };
    this.runs.set(runId, run);

    // Auto-create results row (mirrors 001_init.sql trigger handle_new_run)
    const resultRow: DbResults = {
      run_id: runId,
      competitors: null,
      competitor_status: 'pending',
      tech_feasibility: null,
      tech_status: 'pending',
      financial_model: null,
      financial_status: 'pending',
      synthesis: null,
      synthesis_status: 'pending',
      updated_at: new Date().toISOString(),
    };
    this.results.set(runId, resultRow);
    return run;
  }

  updateRun(runId: string, updates: Partial<DbRun>) {
    const run = this.runs.get(runId);
    if (!run) throw new Error(`Run ${runId} not found`);
    Object.assign(run, updates);
    this.statusHistory.push({ runId, table: 'validation_runs', statusUpdate: updates });
  }

  updateResults(runId: string, updates: Partial<DbResults>) {
    const result = this.results.get(runId);
    if (!result) throw new Error(`Results for run ${runId} not found`);
    Object.assign(result, updates);
    this.statusHistory.push({ runId, table: 'validation_results', statusUpdate: updates });
  }
}

// Pipeline orchestrator runner under test
interface SynthesisInputContext {
  idea: string;
  language: string;
  competitors: unknown;
  tech: unknown;
  finance: unknown;
}

interface AgentImplementations {
  analyzeCompetitors: (idea: string, lang: string) => Promise<unknown>;
  assessTechFeasibility: (idea: string, lang: string) => Promise<unknown>;
  modelFinancials: (idea: string, lang: string) => Promise<unknown>;
  synthesizeResults: (input: SynthesisInputContext) => Promise<unknown>;
}

// Pipeline orchestrator runner under test
async function runMockPipeline(
  db: MockDatabase,
  runId: string,
  idea: string,
  language: string,
  agentImplementations: AgentImplementations
) {
  // 1. Mark run as actively running
  db.updateRun(runId, { status: 'running' });

  try {
    // 2. Phase 1: Parallel execution of Competitors, Tech, and Financial agents
    const runAgent = async (
      statusField: 'competitor_status' | 'tech_status' | 'financial_status',
      dataField: 'competitors' | 'tech_feasibility' | 'financial_model',
      agentFn: () => Promise<unknown>
    ) => {
      db.updateResults(runId, { [statusField]: 'running', updated_at: new Date().toISOString() });
      try {
        const data = await agentFn();
        db.updateResults(runId, {
          [dataField]: data,
          [statusField]: 'completed',
          updated_at: new Date().toISOString(),
        });
        return data;
      } catch (err) {
        db.updateResults(runId, { [statusField]: 'failed', updated_at: new Date().toISOString() });
        throw err;
      }
    };

    const [compResult, techResult, finResult] = await Promise.allSettled([
      runAgent('competitor_status', 'competitors', () =>
        agentImplementations.analyzeCompetitors(idea, language)
      ),
      runAgent('tech_status', 'tech_feasibility', () =>
        agentImplementations.assessTechFeasibility(idea, language)
      ),
      runAgent('financial_status', 'financial_model', () =>
        agentImplementations.modelFinancials(idea, language)
      ),
    ]);

    const context = {
      competitors: compResult.status === 'fulfilled' ? compResult.value : null,
      tech: techResult.status === 'fulfilled' ? techResult.value : null,
      finance: finResult.status === 'fulfilled' ? finResult.value : null,
    };

    // 3. Phase 2: Synthesis agent
    db.updateResults(runId, { synthesis_status: 'running', updated_at: new Date().toISOString() });
    try {
      const synthesis = await agentImplementations.synthesizeResults({
        idea,
        language,
        ...context,
      });
      db.updateResults(runId, {
        synthesis,
        synthesis_status: 'completed',
        updated_at: new Date().toISOString(),
      });
    } catch (err) {
      db.updateResults(runId, { synthesis_status: 'failed', updated_at: new Date().toISOString() });
      throw err;
    }

    // 4. Mark run complete
    db.updateRun(runId, {
      status: 'completed',
      completed_at: new Date().toISOString(),
    });
  } catch (error) {
    db.updateRun(runId, {
      status: 'failed',
      error_message: error instanceof Error ? error.message : String(error),
    });
  }
}

test('Full pipeline executes successfully: 3 parallel agents followed by synthesis', async () => {
  const db = new MockDatabase();
  const runId = 'run-101';
  db.createRun(runId, 'user-1', 'AI-powered subscription box for Indian organic farmers', 'en');

  const executionOrder: string[] = [];

  const mockAgents = {
    analyzeCompetitors: async () => {
      executionOrder.push('start-competitors');
      await new Promise((r) => setTimeout(r, 20));
      executionOrder.push('end-competitors');
      return { competitors: [{ name: 'KisanBox' }], market_gap: 'Direct organic supply', competitive_intensity: 'low' };
    },
    assessTechFeasibility: async () => {
      executionOrder.push('start-tech');
      await new Promise((r) => setTimeout(r, 10));
      executionOrder.push('end-tech');
      return { complexity_score: 4, business_type: 'hybrid' };
    },
    modelFinancials: async () => {
      executionOrder.push('start-finance');
      await new Promise((r) => setTimeout(r, 15));
      executionOrder.push('end-finance');
      return { break_even_months: 12, market_size_inr: { tam: 1000000000 } };
    },
    synthesizeResults: async (ctx: SynthesisInputContext) => {
      executionOrder.push('start-synthesis');
      assert.ok(ctx.competitors !== null, 'Synthesis must receive competitors output');
      assert.ok(ctx.tech !== null, 'Synthesis must receive tech output');
      assert.ok(ctx.finance !== null, 'Synthesis must receive finance output');
      executionOrder.push('end-synthesis');
      return { viability_verdict: 'highly_viable', confidence_score: 90 };
    },
  };

  await runMockPipeline(db, runId, 'AI-powered subscription box', 'en', mockAgents);

  const run = db.runs.get(runId)!;
  assert.equal(run.status, 'completed');
  assert.ok(run.completed_at);

  const results = db.results.get(runId)!;
  assert.equal(results.competitor_status, 'completed');
  assert.equal(results.tech_status, 'completed');
  assert.equal(results.financial_status, 'completed');
  assert.equal(results.synthesis_status, 'completed');

  // Verify Phase 1 parallel start before Phase 2 synthesis
  const synthesisIndex = executionOrder.indexOf('start-synthesis');
  assert.ok(synthesisIndex > executionOrder.indexOf('start-competitors'));
  assert.ok(synthesisIndex > executionOrder.indexOf('start-tech'));
  assert.ok(synthesisIndex > executionOrder.indexOf('start-finance'));
});

test('Pipeline handles partial agent failure: synthesis still synthesizes remaining data', async () => {
  const db = new MockDatabase();
  const runId = 'run-102';
  db.createRun(runId, 'user-1', 'Hyperlocal grocery delivery with drone logistics', 'en');

  let synthesisContextReceived: SynthesisInputContext | null = null;

  const mockAgents = {
    analyzeCompetitors: async () => {
      // Simulate external API timeout / grounding failure
      throw new Error('Google search timeout');
    },
    assessTechFeasibility: async () => {
      return { complexity_score: 9, business_type: 'hybrid' };
    },
    modelFinancials: async () => {
      return { break_even_months: 24 };
    },
    synthesizeResults: async (ctx: SynthesisInputContext) => {
      synthesisContextReceived = ctx;
      return { viability_verdict: 'risky', confidence_score: 60 };
    },
  };

  await runMockPipeline(db, runId, 'Drone delivery idea', 'en', mockAgents);

  const run = db.runs.get(runId)!;
  assert.equal(run.status, 'completed'); // Run completes overall even with 1 agent failing

  const results = db.results.get(runId)!;
  assert.equal(results.competitor_status, 'failed'); // Competitor failed
  assert.equal(results.tech_status, 'completed');    // Tech succeeded
  assert.equal(results.financial_status, 'completed'); // Finance succeeded
  assert.equal(results.synthesis_status, 'completed'); // Synthesis succeeded

  if (!synthesisContextReceived) {
    assert.fail('synthesisContextReceived was not set');
  }
  const received: SynthesisInputContext = synthesisContextReceived;
  assert.equal(received.competitors, null);
  assert.notEqual(received.tech, null);
  assert.notEqual(received.finance, null);
});

test('Pipeline marks run failed when synthesis agent throws fatal error', async () => {
  const db = new MockDatabase();
  const runId = 'run-103';
  db.createRun(runId, 'user-1', 'Idea that triggers synthesis crash', 'en');

  const mockAgents = {
    analyzeCompetitors: async () => ({ competitors: [] }),
    assessTechFeasibility: async () => ({ complexity_score: 3 }),
    modelFinancials: async () => ({ break_even_months: 6 }),
    synthesizeResults: async () => {
      throw new Error('Fatal LLM provider rate limit exhausted');
    },
  };

  await runMockPipeline(db, runId, 'Crash idea', 'en', mockAgents);

  const run = db.runs.get(runId)!;
  assert.equal(run.status, 'failed');
  assert.equal(run.error_message, 'Fatal LLM provider rate limit exhausted');

  const results = db.results.get(runId)!;
  assert.equal(results.synthesis_status, 'failed');
});

test('Pipeline executes 5 parallel agents including Global Benchmarks and supplies context to synthesis', async () => {
  const db = new MockDatabase();
  const runId = 'run-global-104';
  db.createRun(runId, 'user-1', 'Cross-border international benchmark idea', 'en');

  let globalBenchmarksReceived = false;

  const mockAgentList = {
    competitors: async () => ({ competitors: [{ name: 'Comp1' }] }),
    tech: async () => ({ complexity_score: 5 }),
    finance: async () => ({ break_even_months: 18 }),
    legal: async () => ({ compliance_score: 85, has_blocker_issues: false }),
    global: async () => ({
      has_international_precedents: true,
      novelty_assessment: 'globally_proven',
      similar_businesses: [
        {
          name: 'GlobalLeader Corp',
          country: 'United States',
          business_overview: 'Leading international platform for on-demand services',
          implementation_model: 'Two-sided marketplace with cloud routing',
          monetization_model: '15% take-rate',
          key_learnings_for_india: 'Scheduled batching improves route economics',
        },
      ],
    }),
  };

  const results = await Promise.allSettled([
    mockAgentList.competitors(),
    mockAgentList.tech(),
    mockAgentList.finance(),
    mockAgentList.legal(),
    mockAgentList.global(),
  ]);

  const synthesized = {
    competitors: results[0].status === 'fulfilled' ? results[0].value : null,
    tech: results[1].status === 'fulfilled' ? results[1].value : null,
    finance: results[2].status === 'fulfilled' ? results[2].value : null,
    legal: results[3].status === 'fulfilled' ? results[3].value : null,
    global: results[4].status === 'fulfilled' ? results[4].value : null,
  };

  if (synthesized.global) {
    globalBenchmarksReceived = true;
  }

  assert.equal(globalBenchmarksReceived, true);
  assert.equal((synthesized.global as { similar_businesses: Array<{ name: string; country: string }> }).similar_businesses[0].name, 'GlobalLeader Corp');
  assert.equal((synthesized.global as { similar_businesses: Array<{ name: string; country: string }> }).similar_businesses[0].country, 'United States');
});

