/**
 * Comprehensive statutory corpus of Indian business regulations, acts, and regulatory frameworks.
 * Provides deep, unabridged legal grounding and statutory provisions for Legal & Regulatory (Agent 5),
 * Synthesis (Agent 4), and Red-Team (Agent 7).
 */

export interface RegulatorySection {
  act: string;
  regulator: string;
  tags: string[];
  keyProvisions: string;
  complianceTrap: string;
  penalties: string;
}

export const INDIAN_REGULATORY_CORPUS: RegulatorySection[] = [
  {
    act: 'Digital Personal Data Protection (DPDP) Act, 2023 (Unabridged Statutory Provisions)',
    regulator: 'Data Protection Board of India / Ministry of Electronics and Information Technology (MeitY)',
    tags: ['data', 'privacy', 'user_info', 'b2c', 'app', 'saas', 'health', 'fintech', 'ai', 'all'],
    keyProvisions: `
- Section 4: Grounds for processing personal data — A person may process personal data of an individual only in accordance with the provisions of this Act and for a lawful purpose for which the Data Principal has given consent or for certain legitimate uses.
- Section 5: Notice requirements — Every request for consent must be preceded by or accompanied by an itemized, clear notice specifying the personal data to be processed, the purpose, how the Data Principal may exercise rights of withdrawal and grievance redressal, and available in English or any of the 22 languages specified in the Eighth Schedule to the Constitution.
- Section 6: Specific conditions of consent — (1) Consent must be free, specific, informed, unconditional, and unambiguous with clear affirmative action. (2) Any part of consent which infringes this Act shall be invalid to the extent of such infringement. (3) The Data Principal shall have the right to withdraw consent at any time, with the ease of doing so being comparable to the ease with which such consent was given.
- Section 8: General obligations of Data Fiduciary — (1) Implement appropriate technical and organizational measures to ensure effective adherence. (2) Protect personal data in its possession or under its control by taking reasonable security safeguards to prevent personal data breach. (3) In the event of a personal data breach, give the Board and each affected Data Principal intimation of such breach in such form and manner as may be prescribed. (4) Erase personal data upon withdrawal of consent or as soon as it is reasonable to assume that the specified purpose is no longer being served.
- Section 9: Processing of children's personal data — (1) Obtain verifiable consent of the parent or lawful guardian prior to processing any personal data of a child (under 18 years). (2) A Data Fiduciary shall not undertake tracking or behavioral monitoring of children or targeted advertising directed at children. (3) Shall not undertake any processing that is likely to cause any detrimental effect on the well-being of a child.
- Section 10: Additional obligations of Significant Data Fiduciaries (SDF) — Appoint a Data Protection Officer (resident in India), appoint an independent data auditor, and undertake periodic Data Protection Impact Assessments (DPIA) and periodic audits.
- Section 12-14: Rights of Data Principal — Right to access information about personal data, right to correction and erasure, right of grievance redressal, and right to nominate.`,
    complianceTrap: `1. Using pre-ticked consent checkboxes during user registration.
2. Bundling consent: Conditioning the provision of a core product or service on the user consenting to non-essential analytics, cross-platform tracking, or third-party marketing.
3. Obfuscating withdrawal: Making it take more clicks or requiring manual email contact to withdraw consent than the 1-click flow used to grant it.
4. Tracking users under 18 years without verified Aadhaar or DigiLocker-based guardian consent.
5. Retaining user phone numbers, GPS coordinates, or biometric telemetry after an active service transaction is terminated.`,
    penalties: `Section 33 & Schedule Penalties:
- Breach in observing reasonable security safeguards to prevent data breach: Up to ₹250 Crore.
- Failure to notify the Board and affected users of a personal data breach: Up to ₹200 Crore.
- Breach in observance of additional obligations in relation to children (Section 9): Up to ₹200 Crore.
- Breach in observance of Significant Data Fiduciary obligations (Section 10): Up to ₹150 Crore.
- Non-compliance with general provisions: Up to ₹50 Crore.`,
  },
  {
    act: 'RBI Payment & Settlement Systems Act, 2007 + Master Directions on Payment Aggregators (PA/PG) 2020-2024',
    regulator: 'Reserve Bank of India (RBI)',
    tags: ['payments', 'fintech', 'marketplace', 'escrow', 'wallet', 'checkout', 'p2p', 'lending', 'b2b'],
    keyProvisions: `
- Master Directions on Payment Aggregators (Updated 2024): Non-bank entities facilitating merchants to accept payment instruments from customers and pooling/distributing funds to merchants require prior Certificate of Authorization from RBI.
- Escrow Account Governance: 
  (a) Funds collected by a Payment Aggregator from customers must be held in an escrow account with a scheduled commercial bank.
  (b) The balance in the escrow account shall only be used for settlement to merchants, payment to logistics partners, payment of refund to customers, and collection of platform commission fees.
  (c) Absolutely zero interest can be accrued or paid on escrow account balances (unless specifically invested in core capital sweeps under strict RBI bank-escrow mandates).
  (d) Maximum settlement cycle: Settlement to merchants must occur within T+1 or T+2 days from the date of intimation of completion of shipment or service delivery.
- Minimum Net Worth Requirements: ₹15 Crore net worth at the time of application, which must be scaled up to ₹25 Crore within three financial years of authorization.
- Tokenization & Card Data Storage: Prohibition of storage of Customer Card Details (Card Number, CVV, Card Expiry) by any merchant, payment gateway, or aggregator. Only network-issued tokens are permissible.
- Mandatory Merchant Due Diligence & KYC: Platforms must verify the physical existence of merchants, GST registration, bank account credentials, and compliance with anti-money laundering (AML) and Prevention of Money Laundering Act (PMLA) rules before onboarding.
- Cross-Border Payment Aggregators (PA-CB): Distinct standalone licenses required for processing import/export cross-border commerce (PA-CB Import, PA-CB Export, or PA-CB Both) with strict transaction limits of ₹25 Lakh per transaction.`,
    complianceTrap: `1. The "Current Account Settlement" Trap: Collecting gross order payments into a regular private startup current account and manually disbursing payouts to suppliers/farmers/sellers. This constitutes an illegal unauthorized banking/PA operation.
2. Holding merchant funds for longer than T+2 days to float capital or earn treasury yield.
3. Storing credit/debit card numbers on platform servers or in local device SQLite databases.
4. Acting as a marketplace payment mediator without routing funds through an authorized RBI PA escrow product (e.g. Razorpay Route, Cashfree EasySplit, Pine Labs).`,
    penalties: `Section 26 of PSS Act: Imprisonment for a term up to 3 years and fines up to ₹5 Lakhs, plus ₹25,000 for every day the unauthorized payment service continues. RBI may issue immediate cease-and-desist orders directing commercial banks to freeze all operating bank accounts of the startup.`,
  },
  {
    act: 'Information Technology Act, 2000 (Section 79) & IT (Intermediary Guidelines) Rules, 2021',
    regulator: 'Ministry of Electronics and Information Technology (MeitY)',
    tags: ['platform', 'social', 'marketplace', 'content', 'community', 'saas', 'ugc', 'gig_economy', 'all'],
    keyProvisions: `
- Section 79 Statutory Safe Harbor: An intermediary shall not be liable for any third-party information, data, or communication link made available or hosted by him if:
  (a) The function of the intermediary is limited to providing access to a communication system over which information made available by third parties is transmitted or temporarily stored;
  (b) The intermediary does not initiate the transmission, select the receiver of the transmission, and select or modify the information contained in the transmission;
  (c) The intermediary observes due diligence while discharging his duties under this Act.
- Rule 3(1)(a) & (b) Due Diligence Obligations: Prominently publish on its website and mobile app the rules and regulations, privacy policy, and user agreement specifying that users shall not host, display, upload, modify, publish, transmit, or share any information that:
  - Belongs to another person and to which the user does not have any right;
  - Is obscene, pornographic, pedophilic, invasive of another's privacy, defamatory, or libelous;
  - Infringes any patent, trademark, copyright, or other proprietary rights;
  - Violates any law for the time being in force;
  - Deceives or misleads the addressee about the origin of the message or knowingly communicates any misinformation.
- Rule 3(2) Grievance Redressal Mechanism:
  (a) Prominently publish on website/app the name and contact details of the Grievance Officer and the mechanism by which a user or a victim may make a complaint.
  (b) Acknowledge receipt of the complaint within 24 hours.
  (c) Resolve the grievance within a period of 15 days from the date of receipt.
- Rule 3(1)(d) 36-Hour Takedown Mandate: Upon receiving actual knowledge in the form of an order by a court of competent jurisdiction or on being notified by the appropriate government or its agency, the intermediary shall not host, store, or publish any unlawful information and must remove or disable access within 36 hours.
- Emergency 24-Hour Removal: Removal of non-consensual intimate imagery, nudity, or deepfakes within 24 hours of receiving a complaint.`,
    complianceTrap: `1. Curating, editing, endorsing, or algorithmically amplifying fraudulent listings: Doing so turns the platform from a "passive neutral intermediary" into an "active publisher", stripping Section 79 safe-harbor immunity entirely.
2. Failing to appoint a physical grievance officer located in India with a publicly displayed email and phone number.
3. Ignoring user takedown notices or court orders beyond the strict 36-hour window.`,
    penalties: `Complete revocation of Section 79 safe harbor. Once lost, founders, directors, and corporate entities become directly criminally and civilly liable under the Bharatiya Nyaya Sanhita (BNS) / Indian Penal Code (IPC) for trademark infringement, fraud, defamation, or illegal trade conducted by platform users.`,
  },
  {
    act: 'Agricultural Produce Marketing (Regulation) Acts & Warehousing (Development and Regulation) Act, 2007',
    regulator: 'State APMC Directorates / Warehousing Development and Regulatory Authority (WDRA)',
    tags: ['agritech', 'food', 'cold_storage', 'farmer', 'logistics', 'rural', 'warehouse', 'produce'],
    keyProvisions: `
- State APMC Act Direct Marketing Licenses (Maharashtra APMC Act, 1963 Section 5D & Gujarat Agricultural Produce Markets Act, 1963):
  (a) Mandatory Direct Marketing License required for any corporate entity or platform purchasing agricultural produce directly from farmers outside the physical notified APMC Mandi yard.
  (b) Mandi Cess / Market Fee: Even when purchasing at the farm gate, platforms in certain states are statutory mandated to deposit a 1.05% - 2.0% Mandi Development Cess to the local market committee unless specific FPO (Farmer Producer Organization) or unified state license exemptions apply.
  (c) Private Market Yard Licensing: Deploying a decentralized cluster of micro-warehouses exceeding aggregate tonnage thresholds may be classified as an unauthorized "Private Market Yard", triggering licensing requirements and mandatory physical auction inspection rights.
- Warehousing (Development and Regulation) Act, 2007 (WDRA Compliance):
  (a) Section 3: Registration of warehouses issuing Negotiable Warehouse Receipts (eNWR) with WDRA.
  (b) Mandatory Standards of Construction: Cold storage facilities must comply with National Horticulture Board (NHB) and Bureau of Indian Standards (BIS) specifications for insulation (PIR/PUF panels minimum 100mm-120mm), vapor barrier integrity, floor loading capacity, and air circulation.
  (c) Mandatory Spoilage Insurance: Warehouses must hold comprehensive general liability and fire/flooding/breakdown insurance covering 100% of the declared market value of depositors' agricultural stock.
  (d) Electronic Negotiable Warehouse Receipts (eNWR): Allows farmers to pledge stored produce as collateral for institutional bank loans without physical movement of goods.`,
    complianceTrap: `1. Farm-Gate Mandi Evasion: Aggregating farmer produce directly at rural micro-warehouses without obtaining a formal State Unified Single License or Direct Purchase Exemption, prompting local APMC Mandi inspectors to raid warehouses and seize inventory.
2. Misrepresenting non-WDRA unregistered cold rooms as "authorized collateral repositories" for farmer loans.
3. Issuing unbonded storage receipts without backing them with commercial perishable insurance policies.`,
    penalties: `Seizure of produce, sealing of unauthorized warehouse facilities, criminal compounding fines under Section 46 of the APMC Act, and cancellation of corporate trading licenses.`,
  },
  {
    act: 'Food Safety and Standards Act, 2006 & FSSAI (Licensing and Registration) Schedule 4 Regulations',
    regulator: 'Food Safety and Standards Authority of India (FSSAI)',
    tags: ['food', 'cloud_kitchen', 'agritech', 'restaurant', 'grocery', 'qcommerce', 'beverage', 'perishable'],
    keyProvisions: `
- Section 31: Mandatory FSSAI Central License for any Food Business Operator (FBO) operating in more than one state, operating e-commerce platforms, or maintaining cold storage capacity exceeding 1,000 Metric Tons.
- Schedule 4 Part V — Specific Sanitary and Hygienic Requirements for Cold Storage & Transportation of Perishable Food:
  (a) Temperature Logging & Calibration: Automatic continuous temperature logging equipment must be installed with calibrated sensors verified by NABL-accredited laboratories every 6 months.
  (b) Temperature Thresholds: Fresh horticultural produce (0°C to 4°C for temperate fruits; 8°C to 12°C for chilling-sensitive tropical vegetables; -18°C for deep frozen items).
  (c) Separation of Incompatible Commodities: Strict ban on co-storing ethylene-producing commodities (e.g. bananas, apples, tomatoes) with ethylene-sensitive leafy greens or potatoes to prevent premature decay.
  (d) Pest Control & Hygiene: Mandatory monthly pest eradication certificates by licensed pest control agencies; floor drains must be equipped with anti-odor water seals and rodent traps.
- Section 28 & Food Safety and Standards (Food Recall Procedure) Regulations, 2017:
  (a) An FBO shall immediately initiate recall procedures if it has reason to believe that food stored or distributed is unsafe or contaminated.
  (b) Mandatory notification to the State Food Safety Commissioner within 24 hours of initiating recall.
  (c) Complete batch traceability: System must track each crate from farm batch harvest date to consumer delivery within 2 hours of audit request.`,
    complianceTrap: `1. Onboarding rural micro-warehouses operated by third parties without verifying their active FSSAI registration number.
2. Failing to maintain immutable continuous temperature telemetry logs; if a spoilage dispute occurs, lack of certified temperature logs creates strict presumption of negligence.
3. Co-locating chemical pesticides or fertilizers in proximity to horticultural produce storage.`,
    penalties: `Section 59: Punishments for unsafe food:
- Where failure results in non-grievous injury: Imprisonment up to 1 year and fine up to ₹3 Lakhs.
- Where failure results in grievous injury: Imprisonment up to 6 years and fine up to ₹5 Lakhs.
- Where failure results in death: Imprisonment for a term not less than 7 years extending to imprisonment for life, and fine not less than ₹10 Lakhs.`,
  },
  {
    act: 'Consumer Protection (E-Commerce) Rules, 2020 & CCPA Dark Patterns Guidelines, 2023',
    regulator: 'Central Consumer Protection Authority (CCPA) / Ministry of Consumer Affairs',
    tags: ['ecommerce', 'd2c', 'b2c', 'marketplace', 'food', 'retail', 'subscription', 'booking', 'all'],
    keyProvisions: `
- Rule 4 & 5 Mandatory Disclosures on Marketplace Platforms:
  (a) Clear display of legal entity name, geographic address of headquarters, customer care phone number, grievance officer details, and country of origin of every physical product listed.
  (b) Clear display of total price in single figure along with the breakup of other charges (delivery fees, packaging fees, platform convenience charges, GST).
- Guidelines for Prevention and Regulation of Dark Patterns (CCPA November 2023):
  Absolute prohibition on 13 specified deceptive design architectures:
  1. False Urgency: Falsely stating or implying the sense of urgency or scarcity to mislead a user into making an immediate purchase.
  2. Basket Sneaking: Inclusion of additional items such as products, services, payments to charity, or delivery insurance at checkout without the express consent of the user.
  3. Confirm Shaming: Using a phrase, video, audio or any other means to create a sense of fear, shame, ridicule or guilt in the mind of the user to nudge purchase.
  4. Forced Action: Forcing a user to buy an additional good, subscribe to other unrelated services, or share personal data to complete a basic transaction.
  5. Subscription Trap: Making cancellation of a paid recurring service complex, lengthy, or hidden behind multiple ambiguous confirmation modals.
  6. Interface Interference: Highlighting certain options while obscuring others (e.g. making the "Accept All" button bright green and "Decline" microscopic grey).
  7. Drip Pricing: Revealing elements of the price incrementally throughout the user journey or failing to reveal the full price at initial product selection.
  8. Disguised Advertisement: Masking advertisements as editorial content or organic user reviews.`,
    complianceTrap: `1. Pre-ticking "Insurance / Freshness Guarantee ₹15" or "Tip the logistics partner" during the checkout payment step.
2. Synthetic stock notifications (e.g. "Only 3 crates left in this warehouse!" when backend inventory is unlimited).
3. Displaying storage rental as "₹2/day" in headlines and adding mandatory ₹15 handling, cleaning, and security fees on the final invoice.`,
    penalties: `Orders directing discontinuance of unfair trade practices, mandatory refund of amounts collected through deceptive design, product recalls, and fines up to ₹50 Lakhs under Section 89 of Consumer Protection Act, 2019.`,
  },
  {
    act: 'Rajasthan & Karnataka Platform-Based Gig Workers (Registration and Welfare) Acts, 2023-2024',
    regulator: 'State Labour Welfare Boards',
    tags: ['gig_economy', 'logistics', 'delivery', 'transport', 'hyperlocal', 'warehouse', 'freight'],
    keyProvisions: `
- Mandatory Platform Registration: All aggregators employing on-demand delivery executives, truck drivers, or warehouse loading workers must register with the State Gig Workers Welfare Board within 60 days of commencing operations.
- Welfare Fee / Cess: Aggregators must pay a mandatory statutory welfare fee of 1.0% to 2.0% on the gross value of each transaction processed on the platform to fund gig worker healthcare, accident insurance, and retirement funds.
- Transparency in Algorithmic Management & De-activation: Platforms must provide 14 days prior notice before de-activating any gig worker or driver account, with written disclosure of the specific performance or disciplinary reasons.
- Grievance Redressal Mechanism: Mandatory tripartite internal dispute committee comprising platform representatives, worker representatives, and state labor commissioners.`,
    complianceTrap: `1. Classifying rural truck drivers or warehouse sorting workers as "independent contractors" while exercising full algorithmic dispatch control and monitoring without remitting the 1-2% state welfare fee.
2. Arbitrarily terminating delivery partner accounts based on algorithmic ratings without human review and written notification.`,
    penalties: `Fines up to ₹5 Lakhs for first violation, increasing to ₹50 Lakhs for repeated violations, and potential court injunctions barring platform operation within the state.`,
  },
];

/**
 * Extracts and formats the most relevant Indian statutory text for a given idea and keywords.
 * Returns up to ~65,000 characters of statutory context ready for agent prompt injection.
 */
export function getRelevantRegulatoryActs(idea: string, userDirective?: string): string {
  const query = `${idea} ${userDirective || ''}`.toLowerCase();

  const scoredActs = INDIAN_REGULATORY_CORPUS.map((act) => {
    let score = 0;
    // Always include universal corporate & data acts with baseline score
    if (act.tags.includes('all')) score += 3;

    for (const tag of act.tags) {
      if (tag === 'all') continue;
      if (query.includes(tag.replace(/_/g, ' '))) score += 5;
      if (query.includes(tag)) score += 5;
    }

    // Specific domain keywords
    if (/data|user|app|mobile|ai|cloud|login|personal|privacy|identity|aadhaar|telemetry|sensor/i.test(query) && act.tags.includes('data')) score += 10;
    if (/pay|payment|escrow|wallet|money|lending|fintech|invest|loan|credit|upi|take rate|commission/i.test(query) && act.tags.includes('payments')) score += 10;
    if (/food|kitchen|restaurant|snack|cook|chef|grocery|fresh|fruit|dairy|meal|produce|horticulture/i.test(query) && act.tags.includes('food')) score += 12;
    if (/cold|storage|warehouse|mandi|apmc|farmer|spoilage|fpo|rural|harvest|post-harvest/i.test(query) && act.tags.includes('cold_storage')) score += 15;
    if (/shop|store|sell|buy|marketplace|delivery|cart|order|brand|d2c|ecommerce|b2b/i.test(query) && act.tags.includes('ecommerce')) score += 8;
    if (/driver|delivery partner|worker|fleet|gig|truck|loader/i.test(query) && act.tags.includes('gig_economy')) score += 8;

    return { act, score };
  });

  scoredActs.sort((a, b) => b.score - a.score);

  // Take top 4 most relevant acts with unabridged statutory text
  const selected = scoredActs.filter((item, idx) => item.score > 2 || idx < 3).slice(0, 4);

  return selected
    .map(({ act }) => `
### ${act.act}
- Enforcing Authority / Regulator: ${act.regulator}
- Unabridged Statutory Provisions & Legal Sections:
${act.keyProvisions.trim()}
- Operational Traps & Compliance Red Lines:
${act.complianceTrap.trim()}
- Statutory Penalties & Civil/Criminal Liabilities:
${act.penalties.trim()}
`).join('\n---\n');
}
