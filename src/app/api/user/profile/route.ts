import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getUserUsage } from '@/lib/user-usage';
import { z } from 'zod';

const UpdateProfileSchema = z.object({
  fullName: z.string().min(1, 'Full name cannot be empty').max(100),
  company: z.string().max(100).optional().or(z.literal('')),
  industry: z.string().max(100).optional().or(z.literal('')),
});

export async function GET(req: NextRequest) {
  try {
    const supabase = await createServerClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const usage = await getUserUsage(user.id, user.email);
    const meta = user.user_metadata || {};

    let fullName = (meta.full_name as string) || (user.email ? user.email.split('@')[0] : 'Founder');
    const company = (meta.company as string) || '';
    const industry = (meta.industry as string) || '';

    // Check if Supabase profile table has updated values
    try {
      const admin = createAdminClient();
      const { data: profile } = await admin
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single();
      if (profile?.full_name) {
        fullName = profile.full_name;
      }
    } catch {
      // ignore
    }

    const response = NextResponse.json({
      id: user.id,
      email: user.email || '',
      fullName,
      company,
      industry,
      runsUsed: usage.runsUsed,
      runsLimit: usage.runsLimit,
      canValidate: usage.canValidate,
      isUnlimited: usage.isUnlimited,
    });

    const demoCookie = req.cookies.get('validateai_demo_user');
    if (demoCookie?.value) {
      try {
        const parsed = JSON.parse(demoCookie.value);
        if (usage.isUnlimited && (!parsed.is_unlimited || parsed.runs_limit !== usage.runsLimit)) {
          parsed.runs_limit = usage.runsLimit;
          parsed.is_unlimited = true;
          response.cookies.set('validateai_demo_user', JSON.stringify(parsed), {
            path: '/',
            httpOnly: false,
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7,
          });
        }
      } catch {
        // ignore
      }
    }

    return response;
  } catch (error) {
    console.error('Error fetching profile:', error);
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
    const parsed = UpdateProfileSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid profile data', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { fullName, company, industry } = parsed.data;

    // 1. Update Supabase if available
    try {
      const admin = createAdminClient();
      await admin
        .from('profiles')
        .update({
          full_name: fullName,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      await supabase.auth.updateUser({
        data: {
          full_name: fullName,
          company: company || '',
          industry: industry || '',
        },
      });
    } catch {
      // Supabase unavailable or in demo mode
    }

    const usage = await getUserUsage(user.id, user.email);
    const updatedProfile = {
      id: user.id,
      email: user.email || '',
      fullName,
      company: company || '',
      industry: industry || '',
      runsUsed: usage.runsUsed,
      runsLimit: usage.runsLimit,
      canValidate: usage.canValidate,
      isUnlimited: usage.isUnlimited,
    };

    const response = NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      profile: updatedProfile,
    });

    // Update demo cookie if in demo / preview mode
    const demoCookie = req.cookies.get('validateai_demo_user');
    if (demoCookie?.value) {
      try {
        const parsedCookie = JSON.parse(demoCookie.value);
        parsedCookie.full_name = fullName;
        parsedCookie.company = company || '';
        parsedCookie.industry = industry || '';
        if (usage.isUnlimited) {
          parsedCookie.runs_limit = usage.runsLimit;
          parsedCookie.is_unlimited = true;
        }
        response.cookies.set('validateai_demo_user', JSON.stringify(parsedCookie), {
          path: '/',
          httpOnly: false,
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7,
        });
      } catch {
        // ignore
      }
    }

    return response;
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
