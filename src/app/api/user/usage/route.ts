import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { getUserUsage, resetUserUsage } from '@/lib/user-usage';

export async function GET() {
  try {
    const supabase = await createServerClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const usage = await getUserUsage(user.id, user.email);
    return NextResponse.json(usage, { status: 200 });
  } catch (err) {
    console.error('Error fetching user usage:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    if (body.action === 'reset') {
      await resetUserUsage(user.id);
      const usage = await getUserUsage(user.id, user.email);
      return NextResponse.json({ message: 'Usage reset successfully', usage }, { status: 200 });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err) {
    console.error('Error in usage management route:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
