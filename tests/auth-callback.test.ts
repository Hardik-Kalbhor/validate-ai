import test from 'node:test';
import assert from 'node:assert/strict';

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:3000';

test('OAuth callback route: redirects correctly when called with error or empty code', async (t) => {
  const isServerRunning = await fetch(`${BASE_URL}/api/health`, { signal: AbortSignal.timeout(2000) })
    .then((r) => r.ok)
    .catch(() => false);

  if (!isServerRunning) {
    t.skip('Local server not running on port 3000 — skipping live HTTP OAuth callback test');
    return;
  }

  // 1. Error description from provider redirects to login with error parameter
  const errRes = await fetch(`${BASE_URL}/auth/callback?error_description=Access+denied+by+user`, {
    redirect: 'manual',
  });
  assert.equal(errRes.status, 307);
  const errLocation = errRes.headers.get('location');
  assert.ok(errLocation && errLocation.includes('/login?error=Access%20denied%20by%20user'));

  // 2. Empty code redirects to login
  const emptyRes = await fetch(`${BASE_URL}/auth/callback`, {
    redirect: 'manual',
  });
  assert.equal(emptyRes.status, 307);
  const emptyLocation = emptyRes.headers.get('location');
  assert.ok(emptyLocation && emptyLocation.endsWith('/login'));
});
