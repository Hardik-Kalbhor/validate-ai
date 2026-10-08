import test from 'node:test';
import assert from 'node:assert/strict';
import {
  setPendingRun,
  getPendingRun,
  getPendingResults,
  initPendingResults,
} from '../src/lib/pending-runs.ts';

test('Pending runs store records initial run state and default results', () => {
  const runId = 'test-run-123';
  setPendingRun({
    id: runId,
    user_id: 'test-user',
    idea_text: 'online athlete clothes selling used by indian female cricketers with bidding',
    language: 'en',
    business_type: 'online',
    status: 'running',
    error_message: null,
    created_at: new Date().toISOString(),
    completed_at: null,
  });

  const run = getPendingRun(runId);
  assert.ok(run);
  assert.equal(run.status, 'running');
  assert.equal(run.idea_text, 'online athlete clothes selling used by indian female cricketers with bidding');

  const results = getPendingResults(runId);
  assert.ok(results);
  assert.equal(results.competitor_status, 'pending');
  assert.equal(results.tech_status, 'pending');
  assert.equal(results.financial_status, 'pending');
  assert.equal(results.legal_status, 'pending');
  assert.equal(results.global_status, 'pending');
  assert.equal(results.synthesis_status, 'pending');
});

test('Pending results initialize with empty fields and pending statuses', () => {
  const blank = initPendingResults('blank-run');
  assert.equal(blank.run_id, 'blank-run');
  assert.equal(blank.competitors, null);
  assert.equal(blank.tech_feasibility, null);
  assert.equal(blank.financial_model, null);
  assert.equal(blank.legal_regulatory, null);
  assert.equal(blank.global_benchmarks, null);
  assert.equal(blank.synthesis, null);
  assert.equal(blank.synthesis_status, 'pending');
});

