/**
 * Landmark Indian Court & Regulatory Precedents (CCI, Supreme Court, High Courts, NCLAT).
 * Ground truth legal liability and litigation risk for Indian technology platforms.
 */

export interface CourtPrecedent {
  caseTitle: string;
  forum: string;
  year: number;
  tags: string[];
  coreRuling: string;
  operationalImpactOnStartups: string;
}

export const COURT_PRECEDENTS: CourtPrecedent[] = [
  {
    caseTitle: 'CCI vs Google In-App Billing (Case No. 07 of 2020 & 14 of 2021)',
    forum: 'Competition Commission of India (CCI) & NCLAT',
    year: 2022,
    tags: ['app', 'fintech', 'payments', 'platform', 'saas', 'monopoly'],
    coreRuling: 'CCI held that imposing mandatory use of Google Play Billing System (GPBS) for in-app digital purchases and charging up to 30% commission was an abuse of dominant position under Section 4 of Competition Act. Google was fined ₹936.44 Crore and ordered to permit third-party payment gateways.',
    operationalImpactOnStartups: 'Startups selling digital services in India can legally offer alternative payment gateways (Razorpay, PhonePe, UPI) at 2-3% processing cost instead of paying 15-30% platform tax, preserving contribution margins.',
  },
  {
    caseTitle: 'Shreya Singhal vs Union of India (AIR 2015 SC 1523)',
    forum: 'Supreme Court of India',
    year: 2015,
    tags: ['content', 'platform', 'social', 'ugc', 'marketplace', 'all'],
    coreRuling: 'Struck down Section 66A of IT Act as unconstitutional. Crucially read down Section 79(3)(b) to establish that an intermediary must take down user-generated content ONLY upon receiving actual knowledge by way of a Court Order or government notification, not upon mere private complaint.',
    operationalImpactOnStartups: 'Protects user-generated content platforms, marketplaces, and forums from frivolous takedown threats. However, Rule 3 of 2021 Intermediary Rules now requires internal grievance mechanism within 24-72 hours for privacy/copyright complaints.',
  },
  {
    caseTitle: 'Rajasthan Platform Based Gig Workers (Registration and Welfare) Act, 2023 & Karnataka Gig Workers Bill 2024',
    forum: 'State Legislative Assemblies & High Courts',
    year: 2023,
    tags: ['gig_economy', 'delivery', 'hyperlocal', 'marketplace', 'logistics', 'cloud_kitchen'],
    coreRuling: 'Statutory enactment mandating a 1% to 2% welfare cess on the transaction value of every aggregator order to fund social security, accident insurance, and healthcare for gig workers. Establishes a tripartite Welfare Board with penalty for non-compliance.',
    operationalImpactOnStartups: 'Aggregators (delivery, rides, home services) can no longer treat delivery and service partners as pure zero-overhead independent contractors. 1-2% welfare cess directly impacts unit economics and must be factored into gross order pricing.',
  },
  {
    caseTitle: 'Federation of Hotel & Restaurant Associations of India (FHRAI) vs MakeMyTrip, Goibibo & OYO (CCI Case No. 14 of 2019)',
    forum: 'Competition Commission of India (CCI)',
    year: 2022,
    tags: ['travel', 'hospitality', 'marketplace', 'aggregator', 'pricing'],
    coreRuling: 'CCI fined MMT-Go ₹223.48 Cr and OYO ₹168.88 Cr for anti-competitive agreements, specifically: (1) Price Parity Clauses (preventing hotels from offering cheaper rates elsewhere or on own websites) and (2) Exclusivity pacts that delisted competitors.',
    operationalImpactOnStartups: 'New marketplaces cannot enforce strict price-parity agreements or lock sellers into exclusive distribution covenants. Seller contracts must allow multi-homing.',
  },
];

/**
 * Returns relevant landmark legal precedents based on idea domain.
 */
export function getCourtPrecedentsForIdea(idea: string): string {
  const query = idea.toLowerCase();
  const matches = COURT_PRECEDENTS.filter((p) => {
    if (p.tags.includes('all')) return true;
    for (const tag of p.tags) {
      if (query.includes(tag.replace(/_/g, ' '))) return true;
      if (query.includes(tag)) return true;
    }
    return false;
  });

  const selected = matches.slice(0, 3);
  return selected.map((p) => `
### Landmark Precedent: ${p.caseTitle} (${p.year})
- Forum: ${p.forum}
- Core Legal Principle: ${p.coreRuling}
- Direct Operational Impact on Startups: ${p.operationalImpactOnStartups}
`).join('\n---\n');
}
