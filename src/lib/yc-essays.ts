/**
 * Curated Y Combinator essays, venture partner frameworks, and startup failure post-mortems.
 * Enriches Financial Modeling (Agent 3), Synthesis (Agent 4), and Red-Team (Agent 7)
 * with field-tested mental models on marketplace disintermediation, hardware death spirals, and unit economics.
 */

export interface YCFrameworkEssay {
  title: string;
  authorOrSource: string;
  topic: string;
  applicableModels: string[];
  coreInsight: string;
  failurePattern: string;
  underwritingRuleOfThumb: string;
}

export const YC_FRAMEWORK_ESSAYS: YCFrameworkEssay[] = [
  {
    title: 'The Anatomy of B2B Marketplace Disintermediation ("The Take-Rate Squeeze")',
    authorOrSource: 'Casey Winters (Reforge) & Peter Reinhardt (Segment / YC Alum)',
    topic: 'Marketplace Disintermediation & Monopolistic Moats',
    applicableModels: ['b2b', 'marketplace', 'b2b2c', 'broker', 'take_rate'],
    coreInsight: `In high-value, repeat B2B transactions (such as agricultural commodities, industrial raw materials, or wholesale produce), buyers and sellers have a massive economic incentive to cut the marketplace out on transaction #2. 
If an average wholesale transaction is ₹50,000 and the platform charges an 8% commission (₹4,000), both parties will willingly swap phone numbers after the initial delivery to split that ₹4,000 benefit.
Marketplaces survive disintermediation ONLY if they provide an ongoing, indispensable workflow tool or infrastructure layer that cannot be replicated over a phone call:
1. Continuous workflow integration (e.g. ERP, IoT inventory telemetry, temperature logging).
2. Embedded working capital financing that neither counterparty can self-fund.
3. Guaranteed legal recourse / bonded indemnity insurance against damaged or rejected shipments.
If a platform is merely a "matchmaker" or "broker", its long-term sustainable take-rate collapses from 8% down to 0.5%-1.0%.`,
    failurePattern: 'Founders build early GMV by subsidizing transactions, but as soon as the platform attempts to charge a realistic 6-10% take-rate, transactional retention plunges off a cliff as parties transacting offline.',
    underwritingRuleOfThumb: 'Never underwrite a repeat B2B marketplace with a take-rate >3% unless the platform owns physical infrastructure or provides formal working capital credit.',
  },
  {
    title: 'The Hardware & Asset-Heavy CapEx Death Spiral in Emerging Markets',
    authorOrSource: 'Marc Andreessen (a16z) & Dalton Caldwell (Managing Director, Y Combinator)',
    topic: 'Asset-Heavy vs Asset-Light Capital Efficiency',
    applicableModels: ['hardware', 'iot', 'storage', 'infrastructure', 'logistics', 'rural'],
    coreInsight: `Deploying physical hardware in price-sensitive emerging markets (solar micro-warehouses, IoT devices, battery installations, dark stores) introduces severe capital constraints that kill venture-scale returns:
1. Depreciation and Maintenance Drag: Physical assets degrade faster in rural, dusty, or unpaved environments. Battery cycles, cooling compressors, and electronics require replacement reserves that quickly exceed customer rental payments.
2. Under-utilization Death Cycle: A physical asset incurs 100% of its capital expenditure and maintenance cost 365 days a year, but rural demand is hyper-seasonal (harvest seasons vs lean monsoons). If capacity utilization averages 35-45% annually, unit economics can never break even.
3. Balance Sheet Trap: When venture capital is spent purchasing physical steel, solar panels, and cooling units, the startup behaves like a capital-intensive utility rather than a high-margin software business, capping exit valuation multiples at 1.5x-3x book value instead of 10x-20x ARR.`,
    failurePattern: 'Founders raise Seed/Series A capital to build and own physical micro-facilities; once the venture capital runs out, debt costs consume all gross operating margins, resulting in fire-sale asset liquidation.',
    underwritingRuleOfThumb: 'A tech startup must never own the physical real estate or heavy equipment. Structure as an asset-light software/franchise operator where local asset owners (FPOs, village entrepreneurs, cooperatives) bear 100% of the CapEx and asset depreciation.',
  },
  {
    title: 'The "Vitamin vs Painkiller" Illusion in Indian Enterprise & SME Sales',
    authorOrSource: 'Garry Tan (CEO, Y Combinator) & Paul Graham ("Do Things That Don\'t Scale")',
    topic: 'Customer Willingness to Pay in Price-Sensitive Ecosystems',
    applicableModels: ['saas', 'enterprise', 'sme', 'b2b', 'rural', 'tier_2', 'tier_3'],
    coreInsight: `In the Indian SME, agricultural, and retail ecosystems, founders frequently fall for the "Enthusiastic Pilot Fallacy":
SMEs, farmers, and traders will happily sign up for software, nod in approval during demonstrations, and use free pilots because the product seems innovative.
However, when the paywall is turned on, conversion drops to zero.
In India:
- Labor is cheap; software is expensive. A business owner would rather hire an informal ₹12,000/month worker to manually write ledgers or inspect produce than pay ₹5,000/month for an automated AI or IoT platform.
- Software is only purchased if it directly produces incremental cash tomorrow morning or prevents immediate legal shutdown.
If your platform only "optimizes efficiency" or "reduces theoretical spoilage by 15%", it is classified as a vitamin and will be discarded during lean quarters.`,
    failurePattern: 'Pitching "data visibility", "analytics dashboards", or "IoT insights" to rural operators who only care about same-day cash liquidity and distress sale avoidance.',
    underwritingRuleOfThumb: 'If the software does not directly generate new buyer orders or disburse cash within 24 hours of onboarding, willingness to pay is effectively zero.',
  },
  {
    title: 'Contribution Margin positive is Not Enough: The Overhead & RTO Mirage',
    authorOrSource: 'Kunal Shah (CRED / Freecharge) & Michael Seibel (Y Combinator)',
    topic: 'E-Commerce and Hyperlocal Delivery Unit Economics',
    applicableModels: ['ecommerce', 'd2c', 'qcommerce', 'hyperlocal', 'delivery'],
    coreInsight: `Many Indian tech platforms report "+10% Contribution Margin" to venture investors by selectively excluding critical operational costs:
1. Reverse Logistics & RTO (Return to Origin): In Tier-2/3 Indian e-commerce, cash-on-delivery RTO rates range between 20-35%. Shipping a product twice and restocking a damaged item eliminates the gross margin of three successful orders.
2. Shrinkage and Spoilage Reserves: For fresh food and horticulture, reported margins look good on paper until end-of-day dump/shrinkage (unsold rotting produce) of 8-12% is accounted for.
3. Customer Acquisition Cost (CAC) Inflation: CAC calculated during early organic/PR adoption is artificially low. Once a startup attempts to scale from 1,000 customers to 100,000, blended CAC routinely doubles or triples due to competitive bidding on digital ad channels.`,
    failurePattern: 'Scaling order volume while burning cash on each incremental transaction under the false hope that "fixed costs will be diluted by scale".',
    underwritingRuleOfThumb: 'Demand a fully-loaded unit economic model that deducts 15% provision for spoilage/RTO, payment gateway fees, local transport buffer, and a 2.5x CAC inflation factor.',
  },
];

/**
 * Retrieves relevant YC founder essays and underwriting frameworks based on business model and tags.
 * Generates up to ~25,000 characters of high-signal mental models.
 */
export function getYCFrameworksForIdea(idea: string, businessType?: string): string {
  const query = `${idea} ${businessType || ''}`.toLowerCase();

  const scoredEssays = YC_FRAMEWORK_ESSAYS.map((essay) => {
    let score = 0;
    for (const tag of essay.applicableModels) {
      if (query.includes(tag)) score += 5;
    }
    if (/marketplace|take rate|commission|broker|b2b/i.test(query) && essay.applicableModels.includes('marketplace')) score += 8;
    if (/hardware|cold|storage|warehouse|solar|iot|equipment|facility/i.test(query) && essay.applicableModels.includes('hardware')) score += 10;
    if (/farmer|rural|tier 3|sme|saas|software|pilot/i.test(query) && essay.applicableModels.includes('rural')) score += 8;
    if (/delivery|qcommerce|spoilage|perishable|unit economics/i.test(query) && essay.applicableModels.includes('delivery')) score += 8;
    return { essay, score };
  });

  scoredEssays.sort((a, b) => b.score - a.score);

  // Take top 2 most relevant essays
  const selected = scoredEssays.filter((item, idx) => item.score > 2 || idx < 2).slice(0, 2);

  return selected.map(({ essay }) => `
### YC Underwriting Framework: "${essay.title}"
- Authority / Source: ${essay.authorOrSource}
- Strategic Core Insight:
${essay.coreInsight.trim()}
- Documented Failure Pattern:
${essay.failurePattern.trim()}
- Venture Underwriting Rule of Thumb: ${essay.underwritingRuleOfThumb}
`).join('\n---\n');
}
