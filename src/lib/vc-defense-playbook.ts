/**
 * VC Partner Investment Committee (IC) Interrogation & Defense Playbook.
 * Curated from Tier-1 venture funds (Peak XV/Sequoia, Accel, Matrix Partners, Elevation Capital, Lightspeed, Nexus, Blume, Ribbit).
 * Simulates the hardest partner-meeting cross-examinations with model institutional defense scripts.
 */

export interface VCPartnerDefenseQuestion {
  id: string;
  questionNumber: number;
  questionTitle: string;
  interrogationPrompt: string;
  fundArchetype:
    | 'Peak XV / Sequoia'
    | 'Accel'
    | 'Matrix Partners'
    | 'Elevation Capital'
    | 'Lightspeed'
    | 'Nexus Venture Partners'
    | 'Blume Ventures'
    | 'Ribbit Capital'
    | 'Omnivore'
    | 'HealthQuad'
    | '3one4 Capital';
  hiddenPartnerConcern: string;
  fatalMistakeAnswer: string;
  modelDefenseScript: string;
  compBenchmarkReference: string;
  strategicLever:
    | 'Unit Economics'
    | 'Regulatory Moat'
    | 'Switching Costs'
    | 'Disintermediation Hedge'
    | 'Gross Margin Defense'
    | 'Working Capital Moat'
    | 'AI Defensibility';
  sectorRelevance: string[];
}

export const VC_PARTNER_DEFENSE_QUESTIONS: VCPartnerDefenseQuestion[] = [
  {
    id: 'vc-q1-incumbent-bundling',
    questionNumber: 1,
    questionTitle: 'The Incumbent Free-Bundling Threat',
    interrogationPrompt:
      'What prevents Zomato, Swiggy, Reliance Retail, or Amazon from building this feature in 6 weeks and offering it at zero commission or negative margin to choke your customer acquisition?',
    fundArchetype: 'Peak XV / Sequoia',
    hiddenPartnerConcern:
      'Is this startup a feature or an enduring enterprise? If distribution can be co-opted by existing super-apps, terminal value is zero.',
    fatalMistakeAnswer:
      '"We move faster than big companies, our UI is much cleaner, and big corporations have too much bureaucracy to care about this niche."',
    modelDefenseScript:
      'Incumbents are structurally optimized for high-velocity standard consumer checkout, not domain-specific workflows. In our model, fulfillment requires specialized SLA auditing, proprietary micro-temperature logging, and custom local mandi khata reconciliation that conflicts with their generalized logistics stack. Copying this would dilute their primary 18% take-rate margin profile. Furthermore, our contractual lock-in gives suppliers dedicated ERP integrations that create prohibitive switching frictions.',
    compBenchmarkReference:
      'Similar to how Delhivery carved out 21.5% express parcel share despite Amazon developing ATS internally, because independent merchants refuse to give Amazon their primary customer and supplier ledger.',
    strategicLever: 'Switching Costs',
    sectorRelevance: ['all', 'b2b', 'logistics', 'delivery', 'marketplace', 'food', 'agri'],
  },
  {
    id: 'vc-q2-disintermediation',
    questionNumber: 2,
    questionTitle: 'The WhatsApp / UPI Disintermediation Risk',
    interrogationPrompt:
      'Once a buyer and a seller discover each other through your platform on transaction #2 or #3, why will they pay your 8-12% take-rate instead of just settling directly over WhatsApp and UPI?',
    fundArchetype: 'Elevation Capital',
    hiddenPartnerConcern:
      'Does the marketplace provide ongoing terminal value beyond match-making, or is the founder paying customer acquisition cost only for users to leak off-platform?',
    fatalMistakeAnswer:
      '"Our terms of service strictly forbid off-platform transactions, and our platform is so convenient that users won’t bother taking the risk."',
    modelDefenseScript:
      'We do not monetize the introduction; we monetize the continuous counterparty risk elimination. Off-platform WhatsApp transactions carry 100% counterparty credit risk, no automated transit insurance, zero escrow dispute resolution, and no working capital invoice discounting. We tie our platform fees to automated GST e-way bill generation, real-time telemetry dispute settlements, and 3-day working capital access. The moment a party steps off-platform, their cost of capital jumps from 1.2% to informal moneylender rates of 3.5%/month.',
    compBenchmarkReference:
      'DRHP comps from Indiamart and DeHaat reveal that when escrow protection and invoice discounting are bundled, transaction retention exceeds 84% even across high-frequency B2B trading partners.',
    strategicLever: 'Disintermediation Hedge',
    sectorRelevance: ['marketplace', 'b2b', 'agri', 'service', 'freelance', 'supply-chain'],
  },
  {
    id: 'vc-q3-rider-diesel-margin-squeeze',
    questionNumber: 3,
    questionTitle: 'The Inflationary Unit-Economic Squeeze',
    interrogationPrompt:
      'If diesel prices rise 12% and gig worker delivery incentives increase due to state platform worker welfare acts, what does your Contribution Margin 2 (CM2) look like?',
    fundArchetype: 'Matrix Partners',
    hiddenPartnerConcern:
      'Is the model fragile to macro cost shocks? Will positive unit economics instantly flip negative under normal labor and fuel fluctuations?',
    fatalMistakeAnswer:
      '"We will easily pass the additional cost onto the consumer through a small convenience fee hike."',
    modelDefenseScript:
      'Our financial model already stress-tests a 20% surge in last-mile fulfillment costs. We maintain positive CM2 through dynamic route batching (averaging 2.4 deliveries per hub dispatch) and a variable tiered surge fee tied to fuel spot rates. Because our target AOV is structured at ₹1,400+ (rather than sub-₹200 micro-orders), fulfillment cost represents only 5.2% of order value, compared to 28-35% for quick-commerce grocery apps. A 15% surge in fuel drops CM2 by only 78 basis points, safely absorbing the shock without eroding gross margins.',
    compBenchmarkReference:
      'Zomato DRHP reveals that operational profitability was achieved when batching density reached 1.8 drops per trip, transforming a -₹32 per delivery CM2 in FY20 to +₹20.5 in FY23.',
    strategicLever: 'Unit Economics',
    sectorRelevance: ['logistics', 'delivery', 'hyperlocal', 'ecommerce', 'agri', 'consumer'],
  },
  {
    id: 'vc-q4-working-capital-drag',
    questionNumber: 4,
    questionTitle: 'The Working Capital & Receivables Debt Trap',
    interrogationPrompt:
      'If your enterprise and institutional buyers insist on Net-45 or Net-60 payment terms, but your upstream suppliers demand payment on delivery, how will you finance that cash float without bleeding your equity round?',
    fundArchetype: 'Accel',
    hiddenPartnerConcern:
      'Will our equity investment be used for high-growth tech expansion, or will it get swallowed up as cheap working capital financing unpaid customer invoices?',
    fatalMistakeAnswer:
      '"We will use our Seed / Series A funding to cover the cash flow until clients pay us back at the end of the month."',
    modelDefenseScript:
      'Zero equity dollars will be allocated to invoice float. We have pre-structured institutional co-lending partnerships with licensed NBFCs and TReDS (Trade Receivables Electronic Discounting System) platforms. Approved invoices are factored with recourse at 9-11% annualized APR directly through partner credit lines, where the buyer bears the financing interest in exchange for extended credit terms. Our balance sheet remains completely asset-light, and our days-sales-outstanding (DSO) cash collection risk is ring-fenced.',
    compBenchmarkReference:
      'As demonstrated by Ninjacart and Udaan, using venture equity to fund customer khata credit resulted in massive write-offs; decoupling via RBI-regulated factoring channels is mandatory for institutional scale.',
    strategicLever: 'Working Capital Moat',
    sectorRelevance: ['b2b', 'agri', 'supply-chain', 'wholesale', 'saas', 'enterprise'],
  },
  {
    id: 'vc-q5-statutory-antitrust-clampdown',
    questionNumber: 5,
    questionTitle: 'The Regulatory & Platform Fee Intervention',
    interrogationPrompt:
      'What is your regulatory defense if the Competition Commission of India (CCI) or Central Consumer Protection Authority (CCPA) issues directives capping platform convenience fees or algorithm priority listings?',
    fundArchetype: 'Lightspeed',
    hiddenPartnerConcern:
      'Does the revenue model depend on grey-area platform fees, dark patterns, or algorithmic self-preferencing that invites legal injunctions?',
    fatalMistakeAnswer:
      '"We operate legally, and regulators in India take years to enact and enforce online platform policies anyway."',
    modelDefenseScript:
      'Our monetization architecture does not rely on hidden convenience surcharges or dark patterns under the CCPA 2023 Guidelines. Instead, revenue is split into transparent, legally defended components: (1) software SaaS subscription for warehouse/inventory telemetry, (2) audited third-party escrow settlement fee, and (3) performance-based logistics fulfillment. We strictly adhere to Section 79 safe harbor intermediary protections under the IT Act and maintain algorithmic neutrality audit trails, insulating our EBITDA from arbitrary commission caps.',
    compBenchmarkReference:
      'Supreme Court precedent (Shreya Singhal v. UOI) and CCI investigations into Google and Apple app store commissions confirm that transparent SaaS billing models withstand regulatory scrutiny far better than arbitrary platform surcharges.',
    strategicLever: 'Regulatory Moat',
    sectorRelevance: ['all', 'marketplace', 'legal', 'fintech', 'consumer', 'tech'],
  },
  {
    id: 'vc-q6-performance-marketing-cac-inflation',
    questionNumber: 6,
    questionTitle: 'The Meta / Google CAC Auction Death Spiral',
    interrogationPrompt:
      'Your financial projections show CAC staying flat while scaling from 10k to 500k users. Why won’t ad fatigue and rising Meta/Google auction bidding drive your CAC up 3x as you expand outside your core early adopters?',
    fundArchetype: 'Peak XV / Sequoia',
    hiddenPartnerConcern:
      'Unrealistic linear financial modeling. Does the company have organic distribution loops, or is it fundamentally an arbitrage play on ad spend?',
    fatalMistakeAnswer:
      '"We will optimize our Facebook ad campaigns, use influencer marketing, and achieve viral organic word of mouth."',
    modelDefenseScript:
      'We model blended CAC rising by 35% in Year 2 and 60% in Year 3. However, our payback period remains under 4.5 months because we utilize a B2B2C distribution flywheel: onboarding single hub operators or anchor wholesale suppliers who each programmatically bring 40-60 transacting buyers into the network without direct ad spend. In addition, our referral mechanic offers operational credits rather than cash discounts, maintaining cohort repeat frequency at 72% within 90 days.',
    compBenchmarkReference:
      'Mamaearth DRHP shows performance marketing ad spend stabilized from 38% of revenue down to 32% only after physical distribution and anchor partner offline presence were built.',
    strategicLever: 'Unit Economics',
    sectorRelevance: ['consumer', 'b2c', 'd2c', 'marketplace', 'app', 'saas'],
  },
  {
    id: 'vc-q7-b2b-payment-defaults',
    questionNumber: 7,
    questionTitle: 'The 90-Day Credit Default & SME Insolvency Risk',
    interrogationPrompt:
      'Small and medium enterprises in India routinely face cash crunches. If 5% of your buyers default or delay payment past 90 days, how do you prevent bad debt from wiping out your annual net margin?',
    fundArchetype: 'Nexus Venture Partners',
    hiddenPartnerConcern:
      'Credit risk disguised as marketplace volume. Will the company end up absorbing supplier defaults or having its working capital frozen in legal recovery courts?',
    fatalMistakeAnswer:
      '"We only work with trusted merchants who have a good reputation in the local market."',
    modelDefenseScript:
      'We do not extend unsecured open-account credit. All transactions over ₹25,000 utilize irrevocable Bank Guarantees (BG), automated UPI e-NACH mandates, or Letter of Credit (LC) backing through our partner scheduled commercial banks. Furthermore, our platform integrates with MCA21 and GSTN to monitor buyer tax filing regularity in real-time; any missed GST return immediately lowers their credit limit before goods are dispatched.',
    compBenchmarkReference:
      'Indiamart DRHP reveals that requiring upfront annual subscription fees rather than transaction-level commissions eliminated 99% of default and bad debt risk across 100,000+ SME suppliers.',
    strategicLever: 'Working Capital Moat',
    sectorRelevance: ['b2b', 'manufacturing', 'wholesale', 'supply-chain', 'fintech'],
  },
  {
    id: 'vc-q8-tier2-willingness-to-pay',
    questionNumber: 8,
    questionTitle: 'The Tier-2/3 Willingness-to-Pay Ceiling',
    interrogationPrompt:
      'Founders consistently overestimate Indian Tier-2 disposable income. When users can buy unorganized local alternatives for 30% less, why will they pay your premium software or convenience fee?',
    fundArchetype: 'Blume Ventures',
    hiddenPartnerConcern:
      'Is the TAM an illusion? Does the market size collapse when transitioning from the top 30M English-speaking urban elites to the next 300M vernacular population?',
    fatalMistakeAnswer:
      '"Tier-2 customers also want high-quality modern experiences and will pay for convenience once they try it."',
    modelDefenseScript:
      'We do not position our service as a discretionary lifestyle luxury; we position it as an income-enhancer or direct input-cost reducer. In our pricing model, the customer saves an audited ₹400-₹600 per month compared to unorganized middlemen markups through collective bargaining and direct manufacturer sourcing. By packaging our value proposition around proven cost-savings rather than convenience surcharges, price sensitivity transforms into a customer acquisition tailwind.',
    compBenchmarkReference:
      'Meesho proved that Tier-2 e-commerce scale is achieved by delivering zero-commission unbranded price parity with local street bazaars, not by charging Western convenience fees.',
    strategicLever: 'Gross Margin Defense',
    sectorRelevance: ['tier-2', 'consumer', 'vernacular', 'b2c', 'marketplace', 'social'],
  },
  {
    id: 'vc-q9-rbi-fintech-regulatory-sword',
    questionNumber: 9,
    questionTitle: 'The Central Bank Disintermediation & License Barrier',
    interrogationPrompt:
      'The Reserve Bank of India has repeatedly clamped down on non-bank fintech aggregators (PPI circulars, PA/PG licenses, P2P lending norms). How do you ensure your product won’t be banned by an RBI master circular?',
    fundArchetype: 'Ribbit Capital',
    hiddenPartnerConcern:
      'Regulatory regulatory shock. Will central bank directives force an expensive multi-year licensing pause or mandate an unviable bank partnership?',
    fatalMistakeAnswer:
      '"We are just a technology platform and software intermediary; our partner bank handles all financial compliance."',
    modelDefenseScript:
      'We do not hold, pool, or escrow customer funds directly on our balance sheet, avoiding Section 4 Payment & Settlement Systems Act licensing triggers. All flows occur through RBI-authorized Payment Aggregator (PA) nodal escrow accounts (via Cashfree/Razorpay) under explicit bipartite agreements approved by the RBI. We built our product architecture strictly around Account Aggregator (AA) and OCEN (Open Credit Enablement Network) protocols, aligning 100% with RBI’s formal digital public infrastructure.',
    compBenchmarkReference:
      'Fintechs that built on proprietary credit card loading (Slice, Uni) faced multi-month freezes, whereas platforms leveraging native UPI AutoPay rails operated without regulatory disruption.',
    strategicLever: 'Regulatory Moat',
    sectorRelevance: ['fintech', 'lending', 'payments', 'bnpl', 'banking'],
  },
  {
    id: 'vc-q10-rural-monsoon-shocks',
    questionNumber: 10,
    questionTitle: 'The Monsoon Failure & Perishable Shrinkage Squeeze',
    interrogationPrompt:
      'In rural and agricultural logistics, a 2-week drought or unseasonal monsoon rain creates 30% price spikes and supply disruptions. How does your take-rate survive agricultural volatility?',
    fundArchetype: 'Omnivore',
    hiddenPartnerConcern:
      'Biological and weather risk. Is the business model viable only during bumper crop harvests, or can it withstand cyclical monsoon failures?',
    fatalMistakeAnswer:
      '"Our proprietary AI climate predictive algorithms forecast crop yields with 95% accuracy to prevent supply shortages."',
    modelDefenseScript:
      'We operate on a geographically hedged multi-basin sourcing model across 4 distinct agro-climatic zones (e.g. Nashik, Kolar, Indore, and Malwa). When unseasonal rain damages crops in one corridor, supply automatically shifts to secondary certified clusters through pre-contracted Farmer Producer Organizations (FPOs). Furthermore, our farmer contracts utilize indexed floor pricing with mutual volume flex (+/- 20%), preventing contract abandonment during market price surges.',
    compBenchmarkReference:
      'DeHaat scaled through 3 severe El Niño drought cycles by diversifying sourcing across 11 states and bundling micro-crop weather insurance with every seed transaction.',
    strategicLever: 'Gross Margin Defense',
    sectorRelevance: ['agri', 'farm', 'rural', 'food', 'supply-chain', 'perishable'],
  },
  {
    id: 'vc-q11-clinical-adoption-friction',
    questionNumber: 11,
    questionTitle: 'The Doctor Adoption Skepticism & Clinical Liability',
    interrogationPrompt:
      'Indian medical practitioners are notoriously conservative and reject software that adds even 30 seconds to patient consultations. How do you drive adoption without paying massive doctor referral kickbacks?',
    fundArchetype: 'HealthQuad',
    hiddenPartnerConcern:
      'Unethical referral traps and slow institutional sales cycles. Will the company face medical council ethics violations or multi-year clinic pilot stagnation?',
    fatalMistakeAnswer:
      '"Doctors will love our AI diagnostics because it saves them hours of manual documentation every day."',
    modelDefenseScript:
      'We do not replace clinical workflow or demand that doctors change their diagnostic behavior. Our integration operates via passive ambient voice recognition in 6 regional languages, converting doctor-patient conversation directly into FHIR-compliant electronic health records (EHR) and prescriptions without screen interaction. Adoption is driven by eliminating junior resident typing duties, and our software is backed by CDSCO Class B SaMD certification and ₹5 Crore medical indemnity coverage.',
    compBenchmarkReference:
      'Practo struggled to monetize clinic SaaS because it forced manual typing, whereas modern AI scribe platforms achieve 92% doctor retention by requiring zero behavioral friction.',
    strategicLever: 'Switching Costs',
    sectorRelevance: ['healthtech', 'medical', 'doctors', 'diagnostics', 'ai'],
  },
  {
    id: 'vc-q12-genai-llm-wrapper-obsolescence',
    questionNumber: 12,
    questionTitle: 'The Foundational LLM Wrapper Obsolescence',
    interrogationPrompt:
      'If OpenAI, Google Gemini, or Anthropic releases their next foundation model update with multimodal Indian vernacular support for free, does your proprietary software become obsolete overnight?',
    fundArchetype: '3one4 Capital',
    hiddenPartnerConcern:
      'Thin wrapper vulnerability. Is the company building an enduring data moat and workflow lock-in, or merely reselling API calls at a fragile markup?',
    fatalMistakeAnswer:
      '"Our prompts are highly proprietary, and we have fine-tuned an open-source Llama model on custom data."',
    modelDefenseScript:
      'Foundation models provide generic intelligence, but zero domain execution rails. Our value is not the prompt; it is the proprietary bidirectional system of record integrated into state government land registries, local mandi billing databases, and corporate ERPs that foundation models cannot access. Furthermore, our edge data feedback loop continuously captures proprietary real-world edge telemetry (ground sensor readings, offline khata disputes) that is physically impossible for web-crawled models to train on. Model intelligence is our commoditized input cost, not our competitive moat.',
    compBenchmarkReference:
      'Similar to how Harvey AI built a $1.5B legal tech valuation by securing proprietary law firm DMS workflow integrations rather than relying solely on raw GPT-4 legal reasoning.',
    strategicLever: 'AI Defensibility',
    sectorRelevance: ['ai', 'saas', 'tech', 'software', 'deeptech', 'automation'],
  },
];

export const VC_STRATEGIC_LEVERS = [
  'All Levers',
  'Unit Economics',
  'Switching Costs',
  'Disintermediation Hedge',
  'Working Capital Moat',
  'Gross Margin Defense',
  'Regulatory Moat',
  'AI Defensibility',
] as const;

/**
 * Retrieves the top relevant VC Partner defense questions for an idea.
 */
export function getVCPartnerDefenseQuestions(
  idea: string,
  sectorHint?: string,
  limit: number = 12
): VCPartnerDefenseQuestion[] {
  const normalized = `${idea} ${sectorHint || ''}`.toLowerCase();

  return VC_PARTNER_DEFENSE_QUESTIONS.map((q) => {
    let relevanceScore = 0;
    if (q.sectorRelevance.includes('all')) relevanceScore += 1;
    for (const kw of q.sectorRelevance) {
      if (normalized.includes(kw)) relevanceScore += 3;
    }
    return { ...q, relevanceScore };
  })
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, limit);
}

/**
 * Formats VC partner defense playbook into prompt context for the Synthesis Agent.
 */
export function formatVCPartnerDefenseContext(questions: VCPartnerDefenseQuestion[]): string {
  if (!questions || questions.length === 0) return '';

  return `
--- TIER-1 VC PARTNER INVESTMENT COMMITTEE (IC) INTERROGATION SIMULATOR ---
Prepare the founder for the hardest institutional cross-examinations that Tier-1 venture partners (Peak XV, Accel, Matrix, Elevation, Nexus, Blume, Ribbit) ask during Investment Committee partner meetings:

${questions
  .map(
    (q) => `
[IC Question #${q.questionNumber}: "${q.questionTitle}" - Lead Fund Archetype: ${q.fundArchetype}]
- Interrogation Challenge: "${q.interrogationPrompt}"
- Behind-Closed-Doors Partner Concern: ${q.hiddenPartnerConcern}
- Fatal Naive Answer to Avoid: ${q.fatalMistakeAnswer}
- Model Institutional Defense Script: ${q.modelDefenseScript}
- Verified Benchmark Precedent: ${q.compBenchmarkReference}
- Primary Strategic Lever: ${q.strategicLever}
`
  )
  .join('\n')}
--------------------------------------------------------------------------
`.trim();
}
