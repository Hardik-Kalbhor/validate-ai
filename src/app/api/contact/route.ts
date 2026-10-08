import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createServerClient } from '@/lib/supabase/server';

const ContactSchema = z.object({
  name: z.string().min(1, 'Name is required').optional().or(z.literal('')),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(5, 'Message must be at least 5 characters'),
  idea: z.string().optional(),
});

export interface ContactInquiry {
  id: string;
  name?: string;
  email: string;
  message: string;
  idea?: string;
  createdAt: string;
}

const globalInquiries = globalThis as unknown as {
  __contactInquiries?: ContactInquiry[];
};

if (!globalInquiries.__contactInquiries) {
  globalInquiries.__contactInquiries = [];
}

export async function POST(req: NextRequest) {
  try {
    const json = await req.json().catch(() => ({}));
    const parsed = ContactSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { name, email, message, idea } = parsed.data;

    let userId: string | null = null;
    try {
      const supabase = await createServerClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) userId = user.id;
    } catch {
      // ignore
    }

    const inquiry: ContactInquiry = {
      id: `inquiry-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
      name: name || undefined,
      email,
      message,
      idea: idea || undefined,
      createdAt: new Date().toISOString(),
    };

    globalInquiries.__contactInquiries?.push(inquiry);
    console.log(`[Contact Inquiry Received] From: ${email} (User: ${userId || 'anonymous'}):`, inquiry);

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for reaching out! Our team will contact you within 24 hours.',
        inquiryId: inquiry.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in POST /api/contact:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
