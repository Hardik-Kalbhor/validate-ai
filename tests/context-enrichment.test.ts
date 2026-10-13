import { describe, it } from 'node:test';
import assert from 'node:assert';
import { getRelevantRegulatoryActs } from '../src/lib/regulatory-acts.ts';
import { getDRHPBenchmarksForIdea } from '../src/lib/drhp-benchmarks.ts';
import { getCourtPrecedentsForIdea } from '../src/lib/court-precedents.ts';
import { getVCMemoExamples } from '../src/lib/vc-memos.ts';
import { getPatentLandscapeForIdea } from '../src/lib/patent-search.ts';
import { getYCFrameworksForIdea } from '../src/lib/yc-essays.ts';
import { detectAssumptionDrift } from '../src/lib/pivot-tracker.ts';
import { extractPitchDeckText } from '../src/lib/pitch-deck.ts';
import { RedTeamSchema } from '../src/schemas/red-team.schema.ts';
import type { ValidationBrief } from '../src/schemas/brief.schema.ts';

describe('Phase 1 Context Enrichment Suite', () => {
  it('extractPitchDeckText extracts plain text and enforces character limit', async () => {
    const raw = 'Slide 1: Problem statement\nSlide 2: Solution & Market Size';
    const text = await extractPitchDeckText(Buffer.from(raw, 'utf-8'), 'text/plain', 'deck.txt');
    assert.ok(text.includes('Problem statement'));
    assert.ok(text.includes('Market Size'));
  });

  it('getRelevantRegulatoryActs matches domain-specific Indian statutes', () => {
    const foodIdea = 'A cloud kitchen delivering organic fresh fruit bowls';
    const foodActs = getRelevantRegulatoryActs(foodIdea);
    assert.ok(foodActs.includes('FSSAI'));

    const fintechIdea = 'An escrow and wallet payment checkout gateway for freelance designers';
    const fintechActs = getRelevantRegulatoryActs(fintechIdea);
    assert.ok(fintechActs.includes('Payment Aggregators') || fintechActs.includes('RBI'));
  });

  it('getDRHPBenchmarksForIdea matches public company disclosures', () => {
    const quickCommerce = '10-minute dark store grocery delivery network';
    const quickComps = getDRHPBenchmarksForIdea(quickCommerce);
    assert.ok(quickComps.includes('Zomato') || quickComps.includes('Blinkit'));

    const beautyIdea = 'Direct-to-consumer cosmetics and skincare brand for women';
    const beautyComps = getDRHPBenchmarksForIdea(beautyIdea);
    assert.ok(beautyComps.includes('Nykaa'));
  });

  it('getCourtPrecedentsForIdea returns relevant case law', () => {
    const platformIdea = 'A social community for independent app developers with in-app digital tips';
    const precedents = getCourtPrecedentsForIdea(platformIdea);
    assert.ok(precedents.includes('Google In-App Billing') || precedents.includes('Shreya Singhal'));
  });

  it('getVCMemoExamples returns structured few-shot investment memos', () => {
    const memos = getVCMemoExamples();
    assert.ok(memos.includes('DevMetrics.io'));
    assert.ok(memos.includes('FreshDrop'));
    assert.ok(memos.includes('SteelBridge'));
  });

  it('detectAssumptionDrift detects when a founder pivots business model or tier focus', () => {
    const currentBrief: ValidationBrief = {
      formal_title: 'TiffinFlow Pro',
      core_problem: 'Offices lack fresh meals',
      value_proposition: 'Corporate tiffin subscriptions',
      target_audience: {
        segment: 'Corporate HR desks',
        tier_focus: 'tier_1',
        business_model: 'b2b',
      },
      monetization_hypothesis: 'Annual corporate billing per employee',
      agent_directives: {
        competitor_focus: 'Corporate catering',
        tech_focus: 'ERP integration',
        financial_focus: 'ACV expansion',
        legal_focus: 'FSSAI central license',
        global_focus: 'ZeroCater',
      },
    };

    const priorRuns = [
      {
        runId: 'prior-run-1',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        ideaText: 'Consumer tiffin meal delivery for college students',
        businessType: 'online',
        brief: {
          ...currentBrief,
          target_audience: {
            segment: 'College students',
            tier_focus: 'tier_2' as const,
            business_model: 'b2c' as const,
          },
        },
      },
    ];

    const drift = detectAssumptionDrift('current-run-2', 'Corporate tiffin subscription', currentBrief, priorRuns);
    assert.ok(drift !== null);
    assert.strictEqual(drift.drifts.length >= 1, true);
    assert.ok(drift.drifts.some((d) => d.dimension === 'business_model'));
  });

  it('RedTeamSchema validates an adversarial challenge payload', () => {
    const sample = {
      devil_score: 72,
      verdict: 'severe_vulnerabilities',
      fatal_flaws: [
        'Incumbents can bundle this feature for zero marginal cost.',
        'Customer churn rate exceeds 45% after initial onboarding promotion.',
      ],
      adversarial_challenges: [
        {
          category: 'unit_economics',
          claim: 'High margin subscription renewals',
          counter_argument: 'CAC payback period stretches to 18 months once digital ad bidding rises.',
          severity: 'critical',
          stress_test_scenario: 'Meta/Google CAC increases 40% during Q4.',
          required_contingency: 'Build outbound direct sales force and annual locking contracts.',
        },
        {
          category: 'incumbent_response',
          claim: 'Proprietary workflow moat',
          counter_argument: 'Incumbents replicate the core dashboard within 60 days.',
          severity: 'high',
          stress_test_scenario: 'Market leader launches competing add-on for free.',
          required_contingency: 'Deep ERP integrations that create high switching costs.',
        },
        {
          category: 'regulatory_trap',
          claim: 'Standard corporate registrations suffice',
          counter_argument: 'Escrow nodal account guidelines require PA authorization.',
          severity: 'medium',
          stress_test_scenario: 'Bank freezes settlement account pending authorization.',
          required_contingency: 'Integrate with licensed payment aggregators on day 1.',
        },
      ],
      steelman_argument: 'If the founder executes rapidly on Tier-1 customer retention and locks in 3 enterprise design partners, switching costs could protect the business against late-arriving clones.',
    };

    const parsed = RedTeamSchema.parse(sample);
    assert.strictEqual(parsed.devil_score, 72);
    assert.strictEqual(parsed.adversarial_challenges.length, 3);
  });

  it('getPatentLandscapeForIdea returns technical patent prior art and claim disclosures', () => {
    const iotIdea = 'Solar powered cold storage micro warehouses with IoT temperature telemetry';
    const patents = getPatentLandscapeForIdea(iotIdea);
    assert.ok(patents.includes('Patent'));
    assert.ok(patents.includes('Claims'));
    assert.ok(patents.includes('Freedom-to-Operate'));
  });

  it('getYCFrameworksForIdea returns venture underwriting mental models and failure post-mortems', () => {
    const marketplaceIdea = 'A B2B wholesale marketplace taking 8% commission on farmer produce';
    const essays = getYCFrameworksForIdea(marketplaceIdea);
    assert.ok(essays.includes('Disintermediation') || essays.includes('CapEx'));
    assert.ok(essays.includes('Rule of Thumb'));
  });
});
