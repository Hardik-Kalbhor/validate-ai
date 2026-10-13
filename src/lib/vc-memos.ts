/**
 * Authentic, anonymized Indian Venture Capital Investment Memos.
 * Used as few-shot prompts to train the Synthesis agent to think like an
 * experienced Tier-1 Partner (underwriting risks, unit economics, anti-portfolio traps).
 */

export const VC_MEMO_FEW_SHOTS = `
[EXAMPLE 1: PARTNER INVESTMENT MEMO - B2B SAAS / CLOUD PLATFORM]
TARGET: DevMetrics.io (Seed Round, $1.5M at $7.5M Post)
RECOMMENDATION: INVEST ($1.2M Lead)

1. Executive Thesis:
Engineering leadership in Indian and US mid-market tech companies is overwhelmed by tool sprawl. DevMetrics aggregates GitHub, Jira, and CI/CD pipelines into actionable engineering velocity signals. Founders are ex-BrowserStack senior leads with deep technical credibility.

2. Unit Economics & Underwriting:
- Annual Contract Value (ACV): $12,000 blended ($24k US, $6k India).
- Net Revenue Retention (NRR): 128% across 14 pilot customers. Seat expansion is organic without dedicated account managers.
- Gross Margin: 82% (pure cloud software, low LLM API pass-through cost).
- CAC Payback Period: 7 months on product-led growth (PLG) inbound motions.

3. Key Investment Risks & Mitigation:
- Risk: Feature risk from GitHub/GitLab native analytics releases.
  Mitigation: Proprietary attribution layer connecting commits to business impact and Jira sprint velocity, not just raw PR counts.
- Risk: Cross-border IP and tax complexity.
  Condition: Founder must complete Delaware C-Corp flip with Indian wholly-owned subsidiary (WOS) under transfer pricing compliance before disbursement.

---

[EXAMPLE 2: PARTNER INVESTMENT MEMO - HYPERLOCAL ON-DEMAND CONSUMER]
TARGET: FreshDrop (15-Minute Artisan Grocery) (Series A, $5M at $22M Pre)
RECOMMENDATION: PASS (Structural Unit Economics Defect)

1. Executive Thesis:
Artisan produce and bakery delivered in 15 minutes across South Bangalore. Founders are strong operators, but the macro physics of hyperlocal delivery in India contradict venture scale without sustained 50%+ gross margins.

2. Unit Economics Stress Test:
- Average Order Value (AOV): ₹320.
- Product Gross Margin: 32% = ₹102 gross profit per order.
- Fully Burdened Delivery Cost: ₹68 (payout ₹50 + batching loss ₹18).
- Dark Store Fixed Cost allocation: ₹34 per order at 700 orders/day.
- Payment gateway + packaging: ₹12.
- Net Contribution Margin: -₹12 per order (-3.75%).

3. Why We Are Passing:
- "Density Delusion": The pitch relies on reaching 2,000 orders/day per dark store to turn contribution margin positive. However, artisan goods have a narrow addressable base (top 2% of households), making that density mathematically unreachable in 90% of pin codes.
- High perishability wastage (8-11%) wipes out product gross margin gains.
- The business will require permanent equity subsidization to maintain delivery times against incumbents (Zepto, Blinkit).

---

[EXAMPLE 3: PARTNER INVESTMENT MEMO - B2B INDUSTRIAL MARKETPLACE]
TARGET: SteelBridge (B2B Secondary Steel & Raw Materials) (Seed, $2M at $9M Post)
RECOMMENDATION: CONDITIONALLY INVEST ($1.0M Co-Lead)

1. Executive Thesis:
Fragmented Tier 2/3 MSME manufacturers buy secondary steel with zero price transparency and high default risk. SteelBridge aggregates certified mill excess inventory and provides verified digital logistics.

2. Critical Underwriting Safeguards:
- Disintermediation Danger: In B2B commodities, buyers and sellers routinely bypass the platform after the first transaction to save the 2.5% take rate.
- Mandatory Moat: Platform must control quality inspection and integrate digital escrow / invoice discounting so neither party can settle safely off-platform.
- Working Capital Trap: The platform must NEVER take inventory onto its own balance sheet or extend uncollateralized 60-day credit. Must remain a pure matchmaking + logistics broker.

3. Term Sheet Covenants:
- Cap single-buyer concentration to <15% of GMV.
- Mandatory integration of Section 194-O TDS and GST e-invoicing compliance before Series A.
`;

/**
 * Returns formatted few-shot investment memos to guide synthesis depth.
 */
export function getVCMemoExamples(): string {
  return VC_MEMO_FEW_SHOTS.trim();
}
