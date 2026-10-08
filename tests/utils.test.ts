import test from 'node:test';
import assert from 'node:assert/strict';
import { formatINR, formatINRCompact, truncate, cn } from '../src/lib/utils.ts';

test('formatINR formats currency in Indian numbering format', () => {
  const formatted = formatINR(150000);
  assert.ok(formatted.includes('1,50,000') || formatted.includes('150,000'));
  assert.ok(formatted.includes('₹') || formatted.includes('INR'));
});

test('formatINRCompact formats Lakhs and Crores accurately', () => {
  // 1 Crore = 10,000,000
  const crore = formatINRCompact(25000000);
  assert.equal(crore, '₹2.5 Cr');

  // 1 Lakh = 100,000
  const lakh = formatINRCompact(750000);
  assert.equal(lakh, '₹7.5 L');

  // Below 1 Lakh formats standard INR
  const small = formatINRCompact(5000);
  assert.ok(small.includes('5,000') || small.includes('5000'));
});

test('truncate cuts strings over maxLength and appends ellipsis', () => {
  const shortText = 'Hello World';
  assert.equal(truncate(shortText, 20), 'Hello World');

  const longText = 'This is a long business idea description that needs truncation';
  const truncated = truncate(longText, 20);
  assert.equal(truncated, 'This is a long busin...');
  assert.equal(truncated.length, 23); // 20 + '...'
});

test('cn merges classes and resolves Tailwind conflicts', () => {
  const result = cn('px-4 py-2', 'px-6', { 'text-red-500': true, 'hidden': false });
  assert.ok(result.includes('px-6'));
  assert.ok(!result.includes('px-4'));
  assert.ok(result.includes('text-red-500'));
});
