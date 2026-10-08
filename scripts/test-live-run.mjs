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

  console.log('2. Submitting validation idea...');
  const validateRes = await fetch(`${BASE}/api/validate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', cookie },
    body: JSON.stringify({
      idea: 'An AI-powered vernacular mental health support platform connecting certified Indian psychologists with tier-2 city youth in Hindi and Marathi.',
      language: 'en',
    }),
  });

  const validateData = await validateRes.json();
  console.log('Validation response:', validateData);
  if (!validateData.runId) {
    console.error('Failed to get runId');
    process.exit(1);
  }

  const runId = validateData.runId;
  console.log(`3. Polling run ${runId}...`);

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
      console.log('Synthesis verdict:', results?.synthesis?.verdict);
      console.log('Overall score:', results?.synthesis?.overall_score);
      console.log('Competitors count:', results?.competitors?.competitors?.length);
      console.log('Tech stack recommended:', results?.tech_feasibility?.recommended_stack);
      console.log('Year 3 projected revenue:', results?.financial_model?.year3_revenue_inr);
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
