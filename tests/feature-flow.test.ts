import test from 'node:test';
import assert from 'node:assert/strict';

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:3000';

test('FEATURE TEST: 1 Free Run Per User & Contact Requirement Flow', async (t) => {
  // Check if test server is running
  const isServerRunning = await fetch(`${BASE_URL}/api/health`, { signal: AbortSignal.timeout(2500) })
    .then((r) => r.ok)
    .catch(() => false);

  if (!isServerRunning) {
    t.skip('Local server not running on port 3000 — skipping live HTTP feature test');
    return;
  }

  // ── STEP 1: New User Sign-in ──────────────────────────────────────
  const user1Email = `founder_${Date.now()}@startup.in`;
  const loginRes = await fetch(`${BASE_URL}/api/auth/demo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: user1Email, full_name: 'Aarav Patel' }),
  });

  assert.equal(loginRes.status, 200, 'Login/Signup should succeed');
  const user1Cookie = loginRes.headers.get('set-cookie') || '';
  assert.ok(user1Cookie.includes('validateai_demo_user'), 'Cookie must be set');

  const cookieHeader = user1Cookie.split(';')[0];

  // ── STEP 2: Verify Initial Usage for New User ─────────────────────
  const usageRes = await fetch(`${BASE_URL}/api/user/usage`, {
    headers: { cookie: cookieHeader },
  });
  assert.equal(usageRes.status, 200);
  const initialUsage = await usageRes.json();
  assert.equal(initialUsage.runsUsed, 0, 'New user must start with 0 runs used');
  assert.equal(initialUsage.runsLimit, 1, 'New user must have 1 free run limit');
  assert.equal(initialUsage.canValidate, true, 'New user can validate 1st idea');
  assert.equal(initialUsage.hasFreeRunRemaining, true);

  // ── STEP 3: First Idea Validation (Should SUCCEED) ────────────────
  const firstIdeaRes = await fetch(`${BASE_URL}/api/validate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie: cookieHeader,
    },
    body: JSON.stringify({
      idea: 'An AI-driven cold storage monitoring system for rural horticulture farmers in Maharashtra and Gujarat to prevent crop spoilage and track temperature in real-time.',
      language: 'en',
    }),
  });

  assert.equal(firstIdeaRes.status, 200, 'First validation must succeed with 200');
  const firstIdeaData = await firstIdeaRes.json();
  assert.ok(firstIdeaData.runId, 'Must return a generated runId');

  // Verify updated cookie header if set
  const updatedCookieHeader = firstIdeaRes.headers.get('set-cookie')?.split(';')[0] || cookieHeader;

  // ── STEP 4: Verify Usage After 1st Run (Limit Reached) ────────────
  const usageAfterRes = await fetch(`${BASE_URL}/api/user/usage`, {
    headers: { cookie: updatedCookieHeader },
  });
  assert.equal(usageAfterRes.status, 200);
  const usageAfter = await usageAfterRes.json();
  assert.equal(usageAfter.runsUsed, 1, 'Runs used must now be 1');
  assert.equal(usageAfter.runsLimit, 1, 'Runs limit is 1');
  assert.equal(usageAfter.canValidate, false, 'User must NOT be allowed further runs');
  assert.equal(usageAfter.hasFreeRunRemaining, false);

  // ── STEP 5: Second Validation Attempt (Must be REJECTED 403) ──────
  const secondIdeaRes = await fetch(`${BASE_URL}/api/validate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie: updatedCookieHeader,
    },
    body: JSON.stringify({
      idea: 'A second business idea trying to run after using the 1 free run with enough descriptive context about target market, customer persona, and pricing structure.',
      language: 'en',
    }),
  });

  assert.equal(secondIdeaRes.status, 403, 'Second validation must be rejected with 403 Forbidden');
  const secondIdeaData = await secondIdeaRes.json();
  assert.equal(secondIdeaData.error, 'limit_reached');
  assert.equal(secondIdeaData.contactRequired, true, 'contactRequired must be true');
  assert.ok(secondIdeaData.message.includes('free validation run'), 'Message must inform user of 1 free run limit');

  // ── STEP 6: Submit "Contact for Further" Inquiry ──────────────────
  const contactRes = await fetch(`${BASE_URL}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie: updatedCookieHeader,
    },
    body: JSON.stringify({
      name: 'Aarav Patel',
      email: user1Email,
      message: 'I completed my free run and want an enterprise plan for 10 more validations.',
      idea: 'A second business idea trying to run after using the 1 free run with enough descriptive context about target market, customer persona, and pricing structure.',
    }),
  });

  assert.equal(contactRes.status, 200, 'Contact submission must return 200 OK');
  const contactData = await contactRes.json();
  assert.equal(contactData.success, true);
  assert.ok(contactData.inquiryId, 'Must return inquiryId');

  // ── STEP 7: Second Distinct User Gets Their Own Free Run ──────────
  const user2Email = `founder_${Date.now() + 1}@startup.in`;
  const user2Login = await fetch(`${BASE_URL}/api/auth/demo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: user2Email, full_name: 'Priya Sen' }),
  });
  const user2CookieHeader = user2Login.headers.get('set-cookie')?.split(';')[0] || '';

  const user2UsageRes = await fetch(`${BASE_URL}/api/user/usage`, {
    headers: { cookie: user2CookieHeader },
  });
  const user2Usage = await user2UsageRes.json();
  assert.equal(user2Usage.runsUsed, 0, 'New user 2 must still have 0 runs used');
  assert.equal(user2Usage.canValidate, true, 'New user 2 can validate their idea');

  // ── STEP 8: Pending Run Polling Endpoint ───────────────────────────
  const pendingRes = await fetch(`${BASE_URL}/api/pending-run/${firstIdeaData.runId}`);
  assert.equal(pendingRes.status, 200, 'Pending run endpoint should return 200');
  const pendingData = await pendingRes.json();
  assert.ok(pendingData.run, 'Should contain run object');
  assert.ok(pendingData.results, 'Should contain results object');
  assert.equal(pendingData.run.id, firstIdeaData.runId);

  // ── STEP 9: Whitelisted Account Has Unlimited Validations ──────────
  const unlimitedEmail = 'nvanalyticalsolutions@gmail.com';
  const unlimitedLogin = await fetch(`${BASE_URL}/api/auth/demo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: unlimitedEmail, full_name: 'Admin Founder' }),
  });
  const unlimitedCookie = unlimitedLogin.headers.get('set-cookie')?.split(';')[0] || '';

  const unlimitedUsageRes = await fetch(`${BASE_URL}/api/user/usage`, {
    headers: { cookie: unlimitedCookie },
  });
  const unlimitedUsage = await unlimitedUsageRes.json();
  assert.equal(unlimitedUsage.isUnlimited, true, 'Whitelisted email must have isUnlimited: true');
  assert.equal(unlimitedUsage.canValidate, true, 'Whitelisted email must always be able to validate');
  assert.ok(unlimitedUsage.runsLimit >= 1000, 'Whitelisted email must have high runs limit');

  // Run 1 for unlimited user
  const run1Res = await fetch(`${BASE_URL}/api/validate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', cookie: unlimitedCookie },
    body: JSON.stringify({
      idea: 'An AI-powered B2B supply chain optimization platform for pharma manufacturing plants across Gujarat and Telangana with automated vendor tracking.',
      language: 'en',
    }),
  });
  assert.equal(run1Res.status, 200, 'Whitelisted user first validation must succeed');

  // Run 2 for unlimited user (must NOT be blocked)
  const run2Res = await fetch(`${BASE_URL}/api/validate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', cookie: unlimitedCookie },
    body: JSON.stringify({
      idea: 'A predictive maintenance IoT solution for industrial solar microgrids and decentralized rooftop installations in tier-2 Indian manufacturing zones.',
      language: 'en',
    }),
  });
  assert.equal(run2Res.status, 200, 'Whitelisted user second validation must also succeed without 403');

  // ── STEP 10: User Profile API Verification ─────────────────────────
  const profileRes = await fetch(`${BASE_URL}/api/user/profile`, {
    headers: { cookie: unlimitedCookie },
  });
  assert.equal(profileRes.status, 200, 'Profile endpoint returns 200');
  const profileData = await profileRes.json();
  assert.equal(profileData.email, unlimitedEmail);
  assert.equal(profileData.isUnlimited, true);

  // ── STEP 11: Logout API Clears Session ─────────────────────────────
  const logoutRes = await fetch(`${BASE_URL}/api/auth/logout`, {
    method: 'POST',
  });
  const logoutCookie = (logoutRes.headers.get('set-cookie') || '').toLowerCase();
  assert.ok(
    logoutCookie.includes('max-age=0') || logoutCookie.includes('expires') || logoutCookie.includes('validateai_demo_user=;'),
    'Logout must clear cookie'
  );

  // ── STEP 12: Health Check Endpoint ─────────────────────────────────
  const healthRes = await fetch(`${BASE_URL}/api/health`);
  assert.equal(healthRes.status, 200, 'Health check returns 200');
  const healthData = await healthRes.json();
  assert.equal(healthData.status, 'ok');
  assert.equal(healthData.service, 'validate-ai');
});
