import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { deconstructIdea } from '@/agents/idea-deconstruction';
import { hasGeminiApiKey } from '@/lib/ai';
import type { ValidationBrief } from '@/schemas/brief.schema';
import { z } from 'zod';

const RequestSchema = z.object({
  idea: z.string().min(130, 'Idea must be at least 130 characters'),
  language: z.enum(['en', 'hi', 'mr']).default('en'),
});

function generateMockBrief(idea: string): ValidationBrief {
  const isB2B = /b2b|manufacturer|enterprise|wholesale|retailer|procurement/i.test(idea);
  return {
    formal_title: 'AI-Powered Scalable Venture Model',
    core_problem: 'Inefficient unorganized manual processes and lack of transparent digital coordination',
    value_proposition: 'Modern automated digital workflows and predictive analytics tailored for Indian regional stakeholders',
    target_audience: {
      segment: isB2B ? 'Small and medium Indian enterprise operators' : 'Urban and semi-urban Indian consumers',
      tier_focus: 'pan_india',
      business_model: isB2B ? 'b2b' : 'b2c',
    },
    monetization_hypothesis: isB2B ? 'Monthly SaaS subscription + 2-3% platform transaction fee' : 'Freemium consumer tier with micro-transactions or delivery convenience fees',
    agent_directives: {
      competitor_focus: 'Look for existing regional players, unorganized WhatsApp workflows, and emerging VC-backed startups',
      tech_focus: 'Assess cloud architecture, mobile-first responsive interfaces, and Indian payment gateway integrations',
      financial_focus: 'Model customer acquisition cost (CAC), lifetime value (LTV), and realistic 3-year revenue trajectories in INR',
      legal_focus: 'Verify IT Act compliance, GST compliance, consumer protection rules, and DPDP 2023 requirements',
      global_focus: 'Find proven precedents in the US, Southeast Asia, or China that pioneered this business model',
    },
  };
}

export async function POST(req: NextRequest) {
  try {
    // ── 1. Auth ─────────────────────────────────────────────────────
    const supabase = await createServerClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // ── 2. Validate Request Body ─────────────────────────────────────
    let body: z.infer<typeof RequestSchema>;
    try {
      body = RequestSchema.parse(await req.json());
    } catch (err) {
      return NextResponse.json({ error: 'Invalid request', details: err }, { status: 400 });
    }

    // ── 3. Deconstruct Idea (No Quota Decremented) ───────────────────
    try {
      if (!hasGeminiApiKey) {
        return NextResponse.json({ brief: generateMockBrief(body.idea) });
      }
      const brief = await deconstructIdea(body.idea, body.language);
      return NextResponse.json({ brief });
    } catch (agentError) {
      console.warn('[Deconstruct API] Gemini agent failed, falling back to heuristic brief:', agentError);
      return NextResponse.json({ brief: generateMockBrief(body.idea) });
    }
  } catch (error) {
    console.error('Error in POST /api/validate/deconstruct:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal Server Error' },
      { status: 500 }
    );
  }
}
