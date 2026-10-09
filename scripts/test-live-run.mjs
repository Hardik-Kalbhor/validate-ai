const BASE = 'http://127.0.0.1:3000';

async function testLiveRun() {
  console.log('1. Signing in...');
  const loginRes = await fetch(`${BASE}/api/auth/demo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: `founder_${Date.now()}@startup.in`, full_name: 'Test Founder' }),
  });
  const cookie = loginRes.headers.get('set-cookie')?.split(';')[0];
  console.log('Signed in. Cookie:', cookie ? 'Received' : 'None');

  const fullIdea =
    'An AI-powered vernacular mental health support platform connecting certified Indian psychologists with tier-2 city youth in Hindi and Marathi, featuring anonymous consultations, CBT-driven wellness exercises, and micro-pricing via UPI.';

  console.log('2. Testing Phase 0 input validation (< 130 chars)...');
  const shortRes = await fetch(`${BASE}/api/validate/deconstruct`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify({ idea: 'A short idea under 130 chars' }),
  });
  console.log('Short idea rejection status:', shortRes.status, shortRes.status === 400 ? '✓ (Correctly rejected)' : '✖');

  console.log('3. Deconstructing idea with Phase 0 Agent (AI Brief)...');
  const deconstructRes = await fetch(`${BASE}/api/validate/deconstruct`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify({ idea: fullIdea, language: 'en' }),
  });
  const deconstructData = await deconstructRes.json();
  console.log('Deconstruct status:', deconstructRes.status);
  console.log('Brief Formal Title:', deconstructData.brief?.formal_title);
  console.log('Brief Target Audience:', deconstructData.brief?.target_audience);

  console.log('4. Submitting validation run with approved brief...');
  const validateRes = await fetch(`${BASE}/api/validate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify({
      idea: fullIdea,
      language: 'en',
      brief: deconstructData.brief,
    }),
  });

  const validateData = await validateRes.json();
  console.log('Validation response:', validateData);
  if (!validateData.runId) {
    console.error('Failed to get runId');
    process.exit(1);
  }

  const runId = validateData.runId;
  console.log(`5. Polling run ${runId}...`);

  for (let i = 0; i < 40; i++) {
    await new Promise((r) => setTimeout(r, 2500));
    const res = await fetch(`${BASE}/api/pending-run/${runId}`);
    if (!res.ok) {
      console.log(`Poll ${i + 1}: status ${res.status}`);
      continue;
    }
    const data = await res.json();
    const run = data.run;
    const results = data.results;

    console.log(
      `[${i * 2.5}s] Status: ${run?.status} | Competitors: ${results?.competitor_status} | Tech: ${results?.tech_status} | Finance: ${results?.financial_status} | Legal: ${results?.legal_status} | Global: ${results?.global_status} | Synthesis: ${results?.synthesis_status}`
    );

    if (run?.status === 'completed') {
      console.log('\nSUCCESS! Full pipeline completed successfully.');
      console.log('Synthesis verdict:', results?.synthesis?.viability_verdict);
      console.log('Confidence score:', results?.synthesis?.confidence_score);
      console.log('Dimension scores:', results?.synthesis?.dimension_scores);
      console.log('Tech feasibility:', results?.tech_feasibility?.overall_feasibility);
      console.log('Year 3 optimistic revenue (INR):', results?.financial_model?.revenue_forecast?.year3_optimistic);
      console.log('Legal compliance difficulty:', results?.legal_regulatory?.compliance_difficulty);
      console.log('Global precedents found:', results?.global_benchmarks?.precedents?.length);
      return;
    }

    if (run?.status === 'failed') {
      console.error('\nRun failed! Error message:', run?.error_message);
      process.exit(1);
    }
  }

  console.error('\nTimed out waiting for run to complete');
  process.exit(1);
}

testLiveRun().catch((err) => {
  console.error(err);
  process.exit(1);
});
