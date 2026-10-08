import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getUserUsage,
  incrementUserUsage,
  resetUserUsage,
  isUnlimitedEmail,
  UNLIMITED_RUNS_LIMIT,
} from '../src/lib/user-usage.ts';

test('Each new user gets exactly 3 free validation runs by default', async () => {
  const newUserId = `test-user-${Date.now()}`;
  await resetUserUsage(newUserId);

  const usage = await getUserUsage(newUserId);
  assert.equal(usage.runsUsed, 0, 'New user starts with 0 runs used');
  assert.equal(usage.runsLimit, 3, 'New user gets exactly 3 free runs');
  assert.equal(usage.canValidate, true, 'New user can validate ideas');
  assert.equal(usage.hasFreeRunRemaining, true, 'New user has free runs remaining');
  assert.equal(usage.isUnlimited, false);
});

test('After 3 free runs are used, regular user cannot validate and must contact for further runs', async () => {
  const userId = `test-user-limit-${Date.now()}`;
  await resetUserUsage(userId);

  // Run 1
  const run1 = await incrementUserUsage(userId, 'regular@startup.in');
  assert.equal(run1.runsUsed, 1);
  assert.equal(run1.runsLimit, 3);
  assert.equal(run1.canValidate, true, 'User can validate 2nd idea');
  assert.equal(run1.hasFreeRunRemaining, true);

  // Run 2
  const run2 = await incrementUserUsage(userId, 'regular@startup.in');
  assert.equal(run2.runsUsed, 2);
  assert.equal(run2.runsLimit, 3);
  assert.equal(run2.canValidate, true, 'User can validate 3rd idea');
  assert.equal(run2.hasFreeRunRemaining, true);

  // Run 3 (exhausts limit)
  const run3 = await incrementUserUsage(userId, 'regular@startup.in');
  assert.equal(run3.runsUsed, 3);
  assert.equal(run3.runsLimit, 3);
  assert.equal(run3.canValidate, false, 'User can no longer validate without contacting');
  assert.equal(run3.hasFreeRunRemaining, false, 'No free runs remaining');

  // Querying getUserUsage verifies the limit is strictly persisted
  const currentUsage = await getUserUsage(userId, 'regular@startup.in');
  assert.equal(currentUsage.runsUsed, 3);
  assert.equal(currentUsage.canValidate, false);
});

test('Resetting user usage restores the 3 free runs', async () => {
  const userId = `test-user-reset-${Date.now()}`;
  await incrementUserUsage(userId);
  await incrementUserUsage(userId);
  await incrementUserUsage(userId);

  let usage = await getUserUsage(userId);
  assert.equal(usage.runsUsed, 3);
  assert.equal(usage.canValidate, false);

  await resetUserUsage(userId);
  usage = await getUserUsage(userId);
  assert.equal(usage.runsUsed, 0);
  assert.equal(usage.canValidate, true);
  assert.equal(usage.runsLimit, 3);
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
