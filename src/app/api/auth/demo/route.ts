import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { isUnlimitedUser, UNLIMITED_RUNS_LIMIT, getUserUsage } from '@/lib/user-usage';

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const email = (body.email || 'test@validateai.dev').toLowerCase().trim();
  const fullName =
    body.full_name ||
    body.name ||
    (email === 'test@validateai.dev' ? 'Test Founder' : email.split('@')[0]);

  // For default test account keep constant ID; for other users generate deterministic valid UUID
  let id = '00000000-0000-0000-0000-000000000001';
  if (email !== 'test@validateai.dev') {
    const hash = crypto.createHash('md5').update(email).digest('hex');
    id = `${hash.slice(0, 8)}-${hash.slice(8, 12)}-4${hash.slice(13, 16)}-a${hash.slice(17, 20)}-${hash.slice(20, 32)}`;
  }

  const isUnlimited = isUnlimitedUser(id, email);

  // Pre-seed usage store with email & appropriate limit
  await getUserUsage(id, email);

  const user = {
    id,
    email,
    full_name: fullName,
    runs_used: 0,
    runs_limit: isUnlimited ? UNLIMITED_RUNS_LIMIT : 1,
    is_unlimited: isUnlimited,
  };

  const response = NextResponse.json({ user });

  // Set the demo session cookie
  response.cookies.set('validateai_demo_user', JSON.stringify(user), {
    path: '/',
    httpOnly: false,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
}
