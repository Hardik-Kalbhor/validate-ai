import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';
import { CompetitorAnalysisSchema } from '../src/schemas/competitor.schema.ts';
import { TechFeasibilitySchema } from '../src/schemas/tech-feasibility.schema.ts';
import { FinancialModelSchema } from '../src/schemas/financial-model.schema.ts';
import { SynthesisSchema } from '../src/schemas/synthesis.schema.ts';
import { LegalRegulatorySchema } from '../src/schemas/legal-regulatory.schema.ts';
import { GlobalPrecedentsSchema } from '../src/schemas/global-precedents.schema.ts';
import { ValidationBriefSchema } from '../src/schemas/brief.schema.ts';

const RequestSchema = z.object({
  idea: z.string().min(130, 'Idea must be at least 130 characters'),
  language: z.enum(['en', 'hi', 'mr']).default('en'),
});

test('RequestSchema validates valid idea and rejects short text', () => {
  const valid = RequestSchema.safeParse({
    idea: 'This is a comprehensive business idea description providing deep market context, technical requirements, target customer persona, and monetization model in India.',
    language: 'hi',
  });
  assert.equal(valid.success, true);
  if (valid.success) {
    assert.equal(valid.data.language, 'hi');
  }

  const short = RequestSchema.safeParse({
    idea: 'Too short idea with under one hundred and thirty characters.',
  });
  assert.equal(short.success, false);
});

test('CompetitorAnalysisSchema validates realistic competitor data', () => {
  const sampleCompetitorAnalysis = {
    competitors: [
      {
        name: 'Zomato Daily',
        website: 'zomato.com',
        category: 'direct',
        features: ['Scheduled meals', 'Local kitchen partners', 'In-app tracking'],
        pricing: {
          model: 'subscription',
          starting_price_inr: 2500,
          pricing_details: '₹2,500/month for lunch tiffins',
        },
        strengths: ['Massive brand recall', 'Established logistics network'],
        weaknesses: ['Higher commission fees', 'Focus is shifting to quick commerce'],
        market_sentiment: 'mixed',
        sentiment_reason: 'Users love food quality but complain about recurring delivery delays',
        usability_rating: 4.2,
      },
      {
        name: 'Curefoods / EatClub',
        website: 'curefoods.in',
        category: 'direct',
        features: ['Cloud kitchen meal plans', 'Healthy options', 'App subscriptions'],
        pricing: {
          model: 'subscription',
          starting_price_inr: 3000,
          pricing_details: '₹3,000/month for calorie-counted boxes',
        },
        strengths: ['High food hygiene standards', 'Standardized menu'],
        weaknesses: ['Limited tier-2 city presence', 'Premium pricing'],
        market_sentiment: 'positive',
        sentiment_reason: 'Strong reputation among urban working professionals',
        usability_rating: 4.5,
      },
      {
        name: 'Local Dabba Services',
        website: 'localdabbas.in',
        category: 'indirect',
        features: ['Unorganized home tiffins', 'Cash / UPI on delivery', 'WhatsApp ordering'],
        pricing: {
          model: 'subscription',
          starting_price_inr: 1800,
          pricing_details: '₹1,800/month average offline rate',
        },
        strengths: ['Extremely low price', 'Personalized taste'],
        weaknesses: ['No digital tracking', 'Inconsistent hygiene', 'No scale'],
        market_sentiment: 'mixed',
        sentiment_reason: 'Affordable but completely unstandardized',
        usability_rating: 2.8,
      },
    ],
    market_gap: 'Affordable, standardized homemade food delivery for tier-2 city white-collar workers with WhatsApp/App hybrid ordering.',
    competitive_intensity: 'medium',
  };

  const parsed = CompetitorAnalysisSchema.safeParse(sampleCompetitorAnalysis);
  assert.equal(parsed.success, true);
});

test('TechFeasibilitySchema validates complexity and stack breakdown', () => {
  const sampleTechFeasibility = {
    business_type: 'hybrid',
    technology_stack: {
      frontend: 'Next.js 16 (React 19, Tailwind CSS)',
      backend: 'Node.js serverless and Supabase edge functions',
      database: 'PostgreSQL with Supabase Realtime',
      ai_ml: 'Gemini 3.8 Flash for intelligent menu matching',
      infrastructure: 'Render / Vercel with Upstash Redis cache',
    },
    complexity_score: 5,
    mvp_timeline_months: 3,
    full_product_timeline_months: 8,
    engineering_hurdles: [
      'Realtime delivery partner tracking with low battery consumption',
      'Offline/low-connectivity fallback for tier-2/3 network drops',
      'High concurrency order surges between 11 AM and 1 PM',
    ],
    infrastructure_needs: [
      'Managed PostgreSQL database with automatic backups',
      'Geocoding and Maps API integration (Google Maps / MapmyIndia)',
      'Reliable transactional SMS and WhatsApp notifications gateway',
    ],
    integration_points: [
      'Razorpay / UPI Payment Gateway with automatic refund handling',
      'Shiprocket / Porter API for on-demand fleet delivery',
    ],
    security_considerations: [
      'End-to-end encryption for customer PII and phone numbers',
      'Strict Row Level Security (RLS) on all Supabase tables',
      'Rate limiting on validation and authentication endpoints',
    ],
    build_vs_buy: 'Buy SMS/WhatsApp APIs and Maps, build core order orchestration and meal scheduling engine.',
    scalability_notes: 'Horizontal scaling on Render web services with Redis connection pooling handles 10,000+ daily orders.',
    niche_unique_technologies: [
      'PostgreSQL RLS for tenant isolation',
      'Upstash Redis for meal reservation concurrency locking',
      'Razorpay Route for marketplace multi-vendor escrow split payouts',
    ],
  };

  const parsed = TechFeasibilitySchema.safeParse(sampleTechFeasibility);
  assert.equal(parsed.success, true);
});

test('FinancialModelSchema validates 3-year revenue and BMC fields', () => {
  const sampleFinancialModel = {
    market_size_inr: {
      tam: 40000000000,
      sam: 8000000000,
      som: 500000000,
    },
    market_growth_rate_percent: 18.5,
    revenue_forecast: {
      year1_conservative: 2500000,
      year1_optimistic: 6000000,
      year2_conservative: 15000000,
      year2_optimistic: 35000000,
      year3_conservative: 50000000,
      year3_optimistic: 120000000,
    },
    cost_structure: {
      initial_investment: 1200000,
      monthly_opex: 250000,
      cac: 350,
      ltv: 2800,
      gross_margin_percent: 32,
    },
    break_even_months: 14,
    pricing_strategy: {
      model: 'subscription',
      recommended_price_inr: 2200,
      rationale: 'Positioned between cheap unorganized tiffins and premium cloud kitchen brands.',
    },
    bmc: {
      key_partners: ['Home cooks', 'Local delivery riders', 'Packaging material suppliers'],
      key_activities: ['Cook verification and food audit', 'Route optimization', 'Customer support'],
      key_resources: ['Cook community network', 'Order routing technology', 'Brand trust'],
      value_proposition: 'Hygienic, authentic homemade daily meals delivered hot to your desk at pocket-friendly prices.',
      customer_relationships: ['Automated WhatsApp notifications', 'Dedicated meal plan managers', 'Easy pause/resume'],
      channels: ['Instagram local reels', 'Tech park booth activations', 'Corporate tie-ups'],
      customer_segments: ['Bachelors in IT hubs', 'Single working professionals', 'Students in hostels'],
      cost_structure_items: ['Cook payouts (65%)', 'Rider fees (15%)', 'Customer acquisition & tech (10%)'],
      revenue_streams: ['Subscription commission', 'Priority delivery charges', 'Corporate meal plans'],
    },
    funding_insights: 'Strong early-stage angel investor appetite in India for B2C consumer subscription and food-tech models.',
    india_market_notes: 'Tier-2 cities show higher repeat retention (>65%) compared to Tier-1 due to fewer competing alternatives.',
  };

  const parsed = FinancialModelSchema.safeParse(sampleFinancialModel);
  assert.equal(parsed.success, true);
});

test('SynthesisSchema validates verdict and dimension score constraints', () => {
  const sampleSynthesis = {
    viability_verdict: 'viable',
    confidence_score: 84,
    executive_summary: 'The homemade tiffin delivery platform addresses a genuine pain point for office workers in tier-2 cities. Unit economics are positive with a healthy LTV/CAC ratio of 8x, provided food quality consistency is maintained.',
    top_risks: [
      {
        risk: 'Food quality inconsistency across decentralized home kitchens',
        severity: 'high',
        mitigation: 'Implement mandatory FSSAI registration, surprise inspections, and auto-suspension for ratings below 4.0.',
      },
      {
        risk: 'High lunchtime delivery cluster congestion causing late arrivals',
        severity: 'medium',
        mitigation: 'Pre-dispatch batching 45 minutes ahead with dedicated zone delivery routes.',
      },
      {
        risk: 'High cook turnover as home cooks get overwhelmed',
        severity: 'medium',
        mitigation: 'Cap max daily orders per cook to 25 meals to preserve sustainable workload.',
      },
    ],
    top_opportunities: [
      {
        opportunity: 'Exclusive B2B corporate cafeteria contracts for daily lunches',
        impact: 'high',
        timeframe: 'short-term',
      },
      {
        opportunity: 'Regional festive meal specials and healthy diabetic diet subscriptions',
        impact: 'medium',
        timeframe: 'immediate',
      },
      {
        opportunity: 'Private label spices and cookware kits sold to top cooks',
        impact: 'medium',
        timeframe: 'long-term',
      },
    ],
    next_steps: [
      { step: 'Onboard 10 vetted home cooks in one pilot neighborhood', priority: 1, timeframe: 'Month 1' },
      { step: 'Launch beta WhatsApp bot to take first 50 daily subscriptions', priority: 2, timeframe: 'Month 1-2' },
      { step: 'Validate 30-day retention and unit economics on rider costs', priority: 3, timeframe: 'Month 2-3' },
      { step: 'Release production web app with automated Razorpay recurring billing', priority: 4, timeframe: 'Month 3-4' },
    ],
    improvement_suggestions: [
      'Offer weekend flexibility to let users skip Saturday/Sunday meals effortlessly',
      'Provide eco-friendly stainless steel tiffin containers with deposit refund',
      'Enable customer-cook messaging with automated translations for local dialects',
    ],
    dimension_scores: {
      market_opportunity: 88,
      competitive_position: 78,
      technical_feasibility: 85,
      financial_viability: 82,
      legal_compliance: 80,
    },
  };

  const parsed = SynthesisSchema.safeParse(sampleSynthesis);
  assert.equal(parsed.success, true);
});

test('GlobalPrecedentsSchema validates international benchmarks and similar business overviews', () => {
  const sampleGlobalPrecedents = {
    has_international_precedents: true,
    novelty_assessment: 'globally_proven' as const,
    global_summary: 'Curated home chef and tiffin meal delivery models have raised significant capital abroad in the US and Europe, validating consumer demand for home-cooked food subscriptions.',
    geographical_distribution: ['United States', 'United Kingdom', 'Singapore'],
    similar_businesses: [
      {
        name: 'Shef',
        country: 'United States',
        website_or_domain: 'shef.com',
        year_founded: 2019,
        business_overview: 'Two-sided marketplace connecting food safety-certified immigrant home cooks with customers ordering weekly meal batches.',
        implementation_model: 'Asset-light platform; pre-scheduled batch delivery windows; centralized background screening.',
        monetization_model: '15-20% take-rate on orders + diner delivery fee.',
        traction_and_scale: 'Raised $100M+ from a16z and YC; operating in 10+ US metropolitan areas.',
        current_status: 'active' as const,
        key_learnings_for_india: 'Scheduled batching is mandatory for sustainable unit economics; on-demand courier dispatch destroys margins.',
      },
    ],
    market_differences_vs_india: 'Higher willingness to pay in the US allows $5+ courier fees, whereas in India dense clustered delivery is needed to keep per-drop costs under ₹20.',
    lessons_for_indian_founders: [
      'Batch 10-15 meals per delivery route during the 12:00 PM - 1:30 PM office lunch rush',
      'Use WhatsApp bot automation with UPI AutoPay to reduce friction in tier-2 cities',
    ],
  };

  const parsed = GlobalPrecedentsSchema.safeParse(sampleGlobalPrecedents);
  assert.equal(parsed.success, true);
  if (parsed.success) {
    assert.equal(parsed.data.similar_businesses[0].name, 'Shef');
    assert.equal(parsed.data.similar_businesses[0].country, 'United States');
  }
});

test('DEMO_RESULTS for all 5 distinct ideas validate against all 6 schemas with differentiated domain data', async () => {
  const { DEMO_RESULTS } = await import('../src/lib/demo-data.ts');
  const { initPendingResults } = await import('../src/lib/pending-runs.ts');

  const pending = initPendingResults('test-pending');
  assert.equal(pending.run_id, 'test-pending');
  assert.equal(pending.competitor_status, 'pending');
  assert.equal(pending.synthesis_status, 'pending');

  const ideasToTest = [
    { id: 'demo-run-1', expectedName: 'Zomato Daily', expectedTech: 'PostGIS', expectedCountry: 'United States' },
    { id: 'demo-video', expectedName: 'Pocket FM', expectedTech: 'HLS', expectedCountry: 'United States' },
    { id: 'demo-edtech', expectedName: 'UrbanPro', expectedTech: 'WebRTC', expectedCountry: 'United States' },
    { id: 'demo-run-2', expectedName: 'Khatabook', expectedTech: 'WhatsApp Cloud API', expectedCountry: 'Indonesia' },
    { id: 'demo-saas', expectedName: 'IndiaMART', expectedTech: 'Three.js', expectedCountry: 'United States' },
  ];

  type AnyFixture = {
    competitors: { competitors: Array<{ name: string }> };
    tech_feasibility: { technology_stack: unknown; niche_unique_technologies?: string[] };
    financial_model: { market_size_inr: { tam: number } };
    legal_regulatory: { applicable_regulations: string[] };
    global_benchmarks: { similar_businesses: Array<{ country: string }> };
    synthesis: { confidence_score: number };
  };

  for (const { id, expectedName, expectedTech, expectedCountry } of ideasToTest) {
    const fixture = DEMO_RESULTS[id] as unknown as AnyFixture;
    assert.ok(fixture, `Fixture for ${id} must exist`);

    // 1. Competitors Schema
    const compValid = CompetitorAnalysisSchema.safeParse(fixture.competitors);
    assert.equal(compValid.success, true, `Competitors schema failed for ${id}`);
    const compNames = fixture.competitors.competitors.map((c) => c.name);
    assert.ok(compNames.some((n: string) => n.includes(expectedName)), `${id} competitors should include ${expectedName}`);

    // 2. Tech Feasibility Schema
    const techValid = TechFeasibilitySchema.safeParse(fixture.tech_feasibility);
    assert.equal(techValid.success, true, `Tech schema failed for ${id}`);
    const stackStr = JSON.stringify(fixture.tech_feasibility.technology_stack) + ' ' + (fixture.tech_feasibility.niche_unique_technologies || []).join(' ');
    assert.ok(stackStr.includes(expectedTech), `${id} tech stack should mention ${expectedTech}`);

    // 3. Financial Model Schema
    const finValid = FinancialModelSchema.safeParse(fixture.financial_model);
    assert.equal(finValid.success, true, `Finance schema failed for ${id}`);
    assert.ok(fixture.financial_model.market_size_inr.tam > 0, `${id} TAM should be positive`);

    // 4. Legal & Regulatory Schema
    const legalValid = LegalRegulatorySchema.safeParse(fixture.legal_regulatory);
    assert.equal(legalValid.success, true, `Legal schema failed for ${id}`);
    assert.ok(fixture.legal_regulatory.applicable_regulations.length >= 2, `${id} should have applicable regulations`);

    // 5. Global Benchmarks / Precedents Schema
    const globalValid = GlobalPrecedentsSchema.safeParse(fixture.global_benchmarks);
    assert.equal(globalValid.success, true, `Global precedents schema failed for ${id}`);
    assert.ok(fixture.global_benchmarks.similar_businesses.length >= 1, `${id} should have international precedents`);
    assert.ok(fixture.global_benchmarks.similar_businesses.some((b) => b.country.includes(expectedCountry)), `${id} should mention ${expectedCountry}`);

    // 6. Synthesis Schema
    const synthValid = SynthesisSchema.safeParse(fixture.synthesis);
    assert.equal(synthValid.success, true, `Synthesis schema failed for ${id}`);
    assert.ok(fixture.synthesis.confidence_score > 70, `${id} confidence score should be valid`);
  }
});

test('ValidationBriefSchema validates structured idea brief', () => {
  const sampleBrief = {
    formal_title: 'Hyperlocal Agro Cold Storage Micro-Warehousing Network',
    core_problem: 'Post-harvest spoilage for small horticulture farmers in rural India',
    value_proposition: 'IoT-monitored decentralized solar micro-cold rooms connecting directly to B2B food businesses',
    target_audience: {
      segment: 'Rural horticulture farmers in Maharashtra and Gujarat, urban B2B restaurant procurement managers',
      tier_focus: 'tier_3_rural',
      business_model: 'b2b',
    },
    monetization_hypothesis: 'Monthly pallet rental fee of ₹250/crate + 4% platform commission on B2B farm gate orders',
    agent_directives: {
      competitor_focus: 'Search for Ecozen, Tan90, CoolCrop, and unorganized mandi cold storages in western India',
      tech_focus: 'Evaluate IoT temperature telemetry, low-power LoRaWAN, and offline synchronization in rural areas',
      financial_focus: 'Model capex per micro-hub (~₹15-20L), farmer ROI, and operating margins with solar power',
      legal_focus: 'Analyze APMC mandi market regulations, WDRA warehouse accreditation, and FSSAI cold chain compliance',
      global_focus: 'Examine ColdHubs Nigeria and InspiraFarms Kenya for rural off-grid refrigeration precedents',
    },
  };

  const result = ValidationBriefSchema.safeParse(sampleBrief);
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.target_audience.business_model, 'b2b');
    assert.equal(result.data.target_audience.tier_focus, 'tier_3_rural');
  }
});

