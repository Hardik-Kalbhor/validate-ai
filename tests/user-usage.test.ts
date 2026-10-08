import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getUserUsage,
  incrementUserUsage,
  resetUserUsage,
  isUnlimitedEmail,
  UNLIMITED_RUNS_LIMIT,
} from '../src/lib/user-usage.ts';

test('Each new user gets exactly 1 free validation run by default', async () => {
  const newUserId = `test-user-${Date.now()}`;
  await resetUserUsage(newUserId);

  const usage = await getUserUsage(newUserId);
  assert.equal(usage.runsUsed, 0, 'New user starts with 0 runs used');
  assert.equal(usage.runsLimit, 1, 'New user gets exactly 1 free run');
  assert.equal(usage.canValidate, true, 'New user can validate their first idea');
  assert.equal(usage.hasFreeRunRemaining, true, 'New user has free run remaining');
  assert.equal(usage.isUnlimited, false);
});

test('After 1 free run is used, regular user cannot validate and must contact for further runs', async () => {
  const userId = `test-user-limit-${Date.now()}`;
  await resetUserUsage(userId);

  // User performs their 1 free run
  const afterFirstRun = await incrementUserUsage(userId, 'regular@startup.in');
  assert.equal(afterFirstRun.runsUsed, 1, 'Runs used is now 1');
  assert.equal(afterFirstRun.runsLimit, 1, 'Limit remains 1');
  assert.equal(afterFirstRun.canValidate, false, 'User can no longer validate without contacting');
  assert.equal(afterFirstRun.hasFreeRunRemaining, false, 'No free runs remaining');

  // Querying getUserUsage verifies the limit is strictly persisted
  const currentUsage = await getUserUsage(userId, 'regular@startup.in');
  assert.equal(currentUsage.runsUsed, 1);
  assert.equal(currentUsage.canValidate, false);
});

test('Resetting user usage restores the 1 free run', async () => {
  const userId = `test-user-reset-${Date.now()}`;
  await incrementUserUsage(userId);

  let usage = await getUserUsage(userId);
  assert.equal(usage.canValidate, false);

  await resetUserUsage(userId);
  usage = await getUserUsage(userId);
  assert.equal(usage.runsUsed, 0);
  assert.equal(usage.canValidate, true);
});

test('Whitelisted email nvanalyticalsolutions@gmail.com has permanent unlimited validation access', async () => {
  const targetEmail = 'nvanalyticalsolutions@gmail.com';
  assert.equal(isUnlimitedEmail(targetEmail), true, 'Direct email check returns true');
  assert.equal(isUnlimitedEmail('NVANALYTICALSOLUTIONS@GMAIL.COM'), true, 'Case-insensitive check returns true');
  assert.equal(isUnlimitedEmail('random@gmail.com'), false, 'Non-whitelisted email is not unlimited');

  const unlimitedUserId = `test-unlimited-${Date.now()}`;
  await resetUserUsage(unlimitedUserId);

  // Initial check
  const initialUsage = await getUserUsage(unlimitedUserId, targetEmail);
  assert.equal(initialUsage.canValidate, true);
  assert.equal(initialUsage.isUnlimited, true);
  assert.equal(initialUsage.runsLimit, UNLIMITED_RUNS_LIMIT);

  // Run 1
  const run1 = await incrementUserUsage(unlimitedUserId, targetEmail);
  assert.equal(run1.runsUsed, 1);
  assert.equal(run1.canValidate, true, 'canValidate stays true after run 1');
  assert.equal(run1.isUnlimited, true);

  // Run 2
  const run2 = await incrementUserUsage(unlimitedUserId, targetEmail);
  assert.equal(run2.runsUsed, 2);
  assert.equal(run2.canValidate, true, 'canValidate stays true after run 2');

  // Run 3
  const run3 = await incrementUserUsage(unlimitedUserId, targetEmail);
  assert.equal(run3.runsUsed, 3);
  assert.equal(run3.canValidate, true, 'canValidate stays true after run 3');

  // Verify subsequent fetch retains unlimited status
  const persisted = await getUserUsage(unlimitedUserId);
  assert.equal(persisted.runsUsed, 3);
  assert.equal(persisted.canValidate, true, 'persisted usage still allows validation');
  assert.equal(persisted.isUnlimited, true);
});
