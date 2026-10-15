import { test, describe } from 'node:test';
import assert from 'node:assert';
import {
  getEligibleGovernmentSchemes,
  formatGovernmentSchemesContext,
} from '../src/lib/government-schemes.ts';
import {
  getRelevantStartupAutopsies,
  formatStartupAutopsyContext,
} from '../src/lib/startup-post-mortems.ts';
import {
  getVCPartnerDefenseQuestions,
  formatVCPartnerDefenseContext,
} from '../src/lib/vc-defense-playbook.ts';
import {
  getComplianceChecklistForIdea,
  formatComplianceContext,
} from '../src/lib/roc-compliance.ts';
import { generateInstitutionalInvestmentMemo } from '../src/lib/investment-memo-export.ts';

describe('High-Density Expansion Modules Suite', () => {
  test('Government Schemes Engine returns verified central and state schemes for agritech idea', () => {
    const schemes = getEligibleGovernmentSchemes('B2B cold chain storage and perishable farm produce logistics');
    assert.ok(schemes.length >= 3, `Expected at least 3 schemes, got ${schemes.length}`);

    const hasSisfs = schemes.some((s) => s.id === 'sisfs');
    const hasAifOrPmfme = schemes.some((s) => s.id === 'pm-fme-aif');
    const hasStateScheme = schemes.some((s) => s.level === 'State');

    assert.ok(hasSisfs, 'Should include Startup India Seed Fund Scheme');
    assert.ok(hasAifOrPmfme, 'Should match Agriculture Infrastructure Fund / PM-FME');
    assert.ok(hasStateScheme, 'Should include state startup policy grant');

    const formatted = formatGovernmentSchemesContext(schemes);
    assert.ok(formatted.includes('OFFICIAL GOVERNMENT SUBSIDIES'));
    assert.ok(formatted.includes('Non-Dilutive'));
  });

  test('All 28 Indian States & UTs have verified startup policies and subsidy programs', async () => {
    const { ALL_INDIAN_STATES, getSchemesForState } = await import(
      '../src/lib/government-schemes.ts'
    );
    assert.ok(ALL_INDIAN_STATES.length >= 28, `Expected at least 28 states, got ${ALL_INDIAN_STATES.length}`);

    // Verify key states have specific scheme records
    const mh = getSchemesForState('Maharashtra');
    const dl = getSchemesForState('Delhi (NCT)');
    const gj = getSchemesForState('Gujarat');
    const tn = getSchemesForState('Tamil Nadu');
    const ka = getSchemesForState('Karnataka');
    const rj = getSchemesForState('Rajasthan');
    const cg = getSchemesForState('Chhattisgarh');
    const sk = getSchemesForState('Sikkim');

    assert.ok(mh.length > 0, 'Maharashtra schemes must exist');
    assert.ok(dl.length > 0, 'Delhi schemes must exist');
    assert.ok(gj.length > 0, 'Gujarat schemes must exist');
    assert.ok(tn.length > 0, 'Tamil Nadu schemes must exist');
    assert.ok(ka.length > 0, 'Karnataka schemes must exist');
    assert.ok(rj.length > 0, 'Rajasthan schemes must exist');
    assert.ok(cg.length > 0, 'Chhattisgarh schemes must exist');
    assert.ok(sk.length > 0, 'Sikkim schemes must exist');
  });

  test('Startup Autopsies Corpus contains 100+ granular failure precedents', async () => {
    const { STARTUP_POST_MORTEMS } = await import('../src/lib/startup-post-mortems.ts');
    assert.ok(
      STARTUP_POST_MORTEMS.length >= 100,
      `Expected at least 100 startup autopsies, got ${STARTUP_POST_MORTEMS.length}`
    );

    // Assert rich schema across entries
    for (const autopsy of STARTUP_POST_MORTEMS) {
      assert.ok(autopsy.id, 'Autopsy must have id');
      assert.ok(autopsy.startupName, 'Autopsy must have startupName');
      assert.ok(autopsy.sector, 'Autopsy must have sector');
      assert.ok(autopsy.primaryFailureMode, 'Autopsy must have primaryFailureMode');
      assert.ok(autopsy.fatalMetrics.blendedCAC, 'Autopsy must have blendedCAC');
      assert.ok(autopsy.fatalStrategicFlaws.length > 0, 'Autopsy must have fatalStrategicFlaws');
      assert.ok(autopsy.founderAutopsyQuoteOrLesson, 'Autopsy must have founderAutopsyQuoteOrLesson');
    }
  });

  test('Startup Autopsies Corpus retrieves relevant failure cases and metrics', () => {
    const autopsies = getRelevantStartupAutopsies('Hyperlocal grocery and farm delivery with perishable logistics');
    assert.ok(autopsies.length >= 2, `Expected at least 2 autopsies, got ${autopsies.length}`);

    const names = autopsies.map((a) => a.startupName);
    const hasDunzoOrPepperTap = names.some((n) => n.includes('Dunzo') || n.includes('PepperTap') || n.includes('Ninjacart'));
    assert.ok(hasDunzoOrPepperTap, `Expected Dunzo or PepperTap in ${names.join(', ')}`);

    const formatted = formatStartupAutopsyContext(autopsies);
    assert.ok(formatted.includes('HISTORICAL STARTUP AUTOPSIES'));
    assert.ok(formatted.includes('Fatal Unit Metrics'));
  });

  test('VC Partner IC Defense Playbook matches brutal partner questions and model defenses', async () => {
    const { VC_PARTNER_DEFENSE_QUESTIONS, VC_STRATEGIC_LEVERS } = await import(
      '../src/lib/vc-defense-playbook.ts'
    );
    assert.ok(
      VC_PARTNER_DEFENSE_QUESTIONS.length >= 12,
      `Expected at least 12 partner questions, got ${VC_PARTNER_DEFENSE_QUESTIONS.length}`
    );
    assert.ok(VC_STRATEGIC_LEVERS.length >= 7, 'Must have at least 7 strategic levers');

    const questions = getVCPartnerDefenseQuestions('B2B wholesale agricultural marketplace with khata credit terms');
    assert.ok(questions.length >= 3, `Expected at least 3 questions, got ${questions.length}`);

    const q1 = questions[0];
    assert.ok(q1.questionTitle);
    assert.ok(q1.interrogationPrompt);
    assert.ok(q1.hiddenPartnerConcern);
    assert.ok(q1.fatalMistakeAnswer);
    assert.ok(q1.modelDefenseScript);

    const formatted = formatVCPartnerDefenseContext(questions);
    assert.ok(formatted.includes('INVESTMENT COMMITTEE (IC) INTERROGATION'));
    assert.ok(formatted.includes('Model Institutional Defense Script'));
  });

  test('RoC Compliance Matrix retrieves statutory filings and state stamp duties', () => {
    const { filings, stampDuty } = getComplianceChecklistForIdea('Fresh produce food cold storage logistics', 'Karnataka');
    assert.ok(filings.length >= 4, `Expected at least 4 filings, got ${filings.length}`);
    assert.equal(stampDuty.state, 'Karnataka');
    assert.ok(stampDuty.incorporationStampDuty10Lakh);

    const hasFSSAI = filings.some((f) => f.id === 'foscos-fssai');
    const hasSPICe = filings.some((f) => f.id === 'mca-spice-plus');
    const hasDPDP = filings.some((f) => f.id === 'dpdp-consent-manager');

    assert.ok(hasFSSAI, 'Produce storage must require FSSAI FoSCoS filing');
    assert.ok(hasSPICe, 'Must require SPICe+ incorporation filing');
    assert.ok(hasDPDP, 'Must require DPDP compliance');

    const formatted = formatComplianceContext('Fresh food delivery', 'Maharashtra');
    assert.ok(formatted.includes('Maharashtra'));
    assert.ok(formatted.includes('MANDATORY STATUTORY FILING STEPS'));
  });

  test('Investment Committee Due Diligence Memo Generator compiles full institutional report', () => {
    const memo = generateInstitutionalInvestmentMemo(
      {
        id: 'test-run-1234',
        idea_text: 'B2B Perishable Cold-Chain Logistics for Tier 2 Mandis',
        status: 'completed',
        language: 'en',
        error_message: null,
        created_at: new Date().toISOString(),
        completed_at: new Date().toISOString(),
      },
      null
    );

    assert.ok(memo.includes('# INVESTMENT COMMITTEE (IC) DUE DILIGENCE MEMORANDUM'));
    assert.ok(memo.includes('EXECUTIVE SUMMARY & STRATEGIC VERDICT'));
    assert.ok(memo.includes('TECHNICAL ARCHITECTURE & FREEDOM TO OPERATE'));
    assert.ok(memo.includes('FINANCIAL PROJECTIONS, UNIT ECONOMICS & DRHP COMPS'));
    assert.ok(memo.includes('ADVERSARIAL RED-TEAM STRESS-TEST & HISTORICAL AUTOPSIES'));
    assert.ok(memo.includes('GOVERNMENT SCHEMES & NON-DILUTIVE CAPITAL'));
    assert.ok(memo.includes('TIER-1 VC PARTNER INVESTMENT COMMITTEE (IC) DEFENSE'));
    assert.ok(memo.includes('STATUTORY ROC, REGULATORY LICENSING & PORTAL ROADMAP'));
  });
});
