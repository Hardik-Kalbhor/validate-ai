import test from 'node:test';
import assert from 'node:assert/strict';
import {
  setPendingRun,
  getPendingRun,
  getPendingResults,
  initPendingResults,
  updatePendingResults,
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
  assert.equal(blank.brief, null);
  assert.equal(blank.brief_status, 'pending');
  assert.equal(blank.competitors, null);
  assert.equal(blank.tech_feasibility, null);
  assert.equal(blank.financial_model, null);
  assert.equal(blank.legal_regulatory, null);
  assert.equal(blank.global_benchmarks, null);
  assert.equal(blank.synthesis, null);
  assert.equal(blank.synthesis_status, 'pending');
});

test('Pending results persist approved Phase 0 brief', () => {
  const runId = 'test-brief-run';
  const sampleBrief = {
    formal_title: 'Hyperlocal Agro Cold Storage',
    core_problem: 'Post-harvest spoilage in rural India',
    value_proposition: 'IoT decentralized cold rooms',
    target_audience: {
      segment: 'Farmers & B2B procurement',
      tier_focus: 'tier_3_rural' as const,
      business_model: 'b2b' as const,
    },
    monetization_hypothesis: 'Monthly pallet fee + 5% take rate',
    agent_directives: {
      competitor_focus: 'Ecozen, Tan90, CoolCrop',
      tech_focus: 'IoT telemetry & solar battery life',
      financial_focus: 'Capex per unit & farmer ROI',
      legal_focus: 'APMC & WDRA warehouse norms',
      global_focus: 'ColdHubs Nigeria',
    },
  };

  setPendingRun({
    id: runId,
    user_id: 'test-user-brief',
    idea_text: 'sample idea text with over 130 characters for valid run initialization in test suite',
    language: 'en',
    business_type: 'offline',
    status: 'running',
    error_message: null,
    created_at: new Date().toISOString(),
    completed_at: null,
  });

  updatePendingResults(runId, {
    brief: sampleBrief,
    brief_status: 'completed',
  });

  const results = getPendingResults(runId);
  assert.ok(results);
  assert.equal(results.brief_status, 'completed');
  assert.equal(results.brief?.formal_title, 'Hyperlocal Agro Cold Storage');
  assert.equal(results.brief?.target_audience.business_model, 'b2b');
});

