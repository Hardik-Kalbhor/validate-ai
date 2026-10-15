/**
 * Statutory RoC, Licensing & Government Portal Compliance Roadmap.
 * Covers Indian incorporation, DPIIT recognition, FSSAI FoSCoS, RBI FIRMS, and Annual Statutory Filings across all Indian States.
 */

export interface ComplianceFiling {
  id: string;
  portalName: string;
  filingName: string;
  regulatoryBody: string;
  statutoryDeadline: string;
  governmentFeeINR: string;
  penaltyForNonCompliance: string;
  stepByStepInstructions: string[];
  requiredArtifacts: string[];
  mandatoryFor: string;
}

export interface StateStampDuty {
  state: string;
  incorporationStampDuty1Lakh: string;
  incorporationStampDuty10Lakh: string;
  moaAoaStampDuty: string;
  rocOfficeJurisdiction: string;
}

export const STATE_STAMP_DUTY_RATES: StateStampDuty[] = [
  {
    state: 'Karnataka',
    incorporationStampDuty1Lakh: '₹1,000',
    incorporationStampDuty10Lakh: '₹5,000',
    moaAoaStampDuty: '₹1,000 (MoA) + ₹1,000 (AoA)',
    rocOfficeJurisdiction: 'RoC Bangalore (Kendriya Sadan, Koramangala)',
  },
  {
    state: 'Maharashtra',
    incorporationStampDuty1Lakh: '₹1,000',
    incorporationStampDuty10Lakh: '₹10,000 (0.1% of authorized capital)',
    moaAoaStampDuty: '₹1,000 (MoA) + ₹1,000 (AoA)',
    rocOfficeJurisdiction: 'RoC Mumbai (100 Everest, Marine Drive) / RoC Pune',
  },
  {
    state: 'Delhi (NCT)',
    incorporationStampDuty1Lakh: '₹360',
    incorporationStampDuty10Lakh: '₹3,600',
    moaAoaStampDuty: '₹200 (MoA) + ₹200 (AoA)',
    rocOfficeJurisdiction: 'RoC Delhi & Haryana (IFCI Tower, Nehru Place)',
  },
  {
    state: 'Telangana',
    incorporationStampDuty1Lakh: '₹1,500',
    incorporationStampDuty10Lakh: '₹7,500',
    moaAoaStampDuty: '₹1,000 (MoA) + ₹1,000 (AoA)',
    rocOfficeJurisdiction: 'RoC Hyderabad (CPWD Complex, Koti)',
  },
  {
    state: 'Tamil Nadu',
    incorporationStampDuty1Lakh: '₹1,000',
    incorporationStampDuty10Lakh: '₹5,000',
    moaAoaStampDuty: '₹500 (MoA) + ₹300 (AoA)',
    rocOfficeJurisdiction: 'RoC Chennai (Shastri Bhawan, Haddows Road)',
  },
  {
    state: 'Uttar Pradesh',
    incorporationStampDuty1Lakh: '₹500',
    incorporationStampDuty10Lakh: '₹5,000',
    moaAoaStampDuty: '₹500 (MoA) + ₹500 (AoA)',
    rocOfficeJurisdiction: 'RoC Kanpur (10/499-B, Allen Ganj)',
  },
  {
    state: 'Gujarat',
    incorporationStampDuty1Lakh: '₹1,200',
    incorporationStampDuty10Lakh: '₹6,000',
    moaAoaStampDuty: '₹600 (MoA) + ₹600 (AoA)',
    rocOfficeJurisdiction: 'RoC Ahmedabad (ROC Bhavan, Naranpura)',
  },
  {
    state: 'Haryana',
    incorporationStampDuty1Lakh: '₹400',
    incorporationStampDuty10Lakh: '₹4,000',
    moaAoaStampDuty: '₹250 (MoA) + ₹250 (AoA)',
    rocOfficeJurisdiction: 'RoC Delhi & Haryana (IFCI Tower, Nehru Place)',
  },
  {
    state: 'West Bengal',
    incorporationStampDuty1Lakh: '₹1,000',
    incorporationStampDuty10Lakh: '₹5,000',
    moaAoaStampDuty: '₹1,000 (MoA) + ₹1,000 (AoA)',
    rocOfficeJurisdiction: 'RoC Kolkata (Nizam Palace, 234/4 AJC Bose Road)',
  },
  {
    state: 'Rajasthan',
    incorporationStampDuty1Lakh: '₹1,000',
    incorporationStampDuty10Lakh: '₹5,000',
    moaAoaStampDuty: '₹500 (MoA) + ₹500 (AoA)',
    rocOfficeJurisdiction: 'RoC Jaipur (Corporate Bhawan, G-7, Jhalana)',
  },
  {
    state: 'Kerala',
    incorporationStampDuty1Lakh: '₹1,000',
    incorporationStampDuty10Lakh: '₹5,000',
    moaAoaStampDuty: '₹1,000 (MoA) + ₹1,000 (AoA)',
    rocOfficeJurisdiction: 'RoC Ernakulam (Company Law Bhawan, BMC Road, Thrikkakara)',
  },
  {
    state: 'Andhra Pradesh',
    incorporationStampDuty1Lakh: '₹1,000',
    incorporationStampDuty10Lakh: '₹5,000',
    moaAoaStampDuty: '₹500 (MoA) + ₹500 (AoA)',
    rocOfficeJurisdiction: 'RoC Vijayawada (Auto Nagar, Vijayawada)',
  },
  {
    state: 'Punjab',
    incorporationStampDuty1Lakh: '₹500',
    incorporationStampDuty10Lakh: '₹5,000',
    moaAoaStampDuty: '₹250 (MoA) + ₹250 (AoA)',
    rocOfficeJurisdiction: 'RoC Chandigarh (Corporate Bhawan, Sector 27-B)',
  },
  {
    state: 'Madhya Pradesh',
    incorporationStampDuty1Lakh: '₹1,000',
    incorporationStampDuty10Lakh: '₹5,000',
    moaAoaStampDuty: '₹500 (MoA) + ₹500 (AoA)',
    rocOfficeJurisdiction: 'RoC Gwalior (Sanjay Complex, Jayendra Ganj)',
  },
  {
    state: 'Odisha',
    incorporationStampDuty1Lakh: '₹1,000',
    incorporationStampDuty10Lakh: '₹5,000',
    moaAoaStampDuty: '₹300 (MoA) + ₹300 (AoA)',
    rocOfficeJurisdiction: 'RoC Cuttack (Chalchitra Bhawan, Buxi Bazaar)',
  },
  {
    state: 'Bihar',
    incorporationStampDuty1Lakh: '₹1,000',
    incorporationStampDuty10Lakh: '₹5,000',
    moaAoaStampDuty: '₹500 (MoA) + ₹500 (AoA)',
    rocOfficeJurisdiction: 'RoC Patna (Maurya Lok Complex, Dak Bungalow Road)',
  },
  {
    state: 'Assam',
    incorporationStampDuty1Lakh: '₹1,000',
    incorporationStampDuty10Lakh: '₹5,000',
    moaAoaStampDuty: '₹200 (MoA) + ₹200 (AoA)',
    rocOfficeJurisdiction: 'RoC Guwahati (Prithvi Planet, Ulubari, GS Road)',
  },
  {
    state: 'Uttarakhand',
    incorporationStampDuty1Lakh: '₹750',
    incorporationStampDuty10Lakh: '₹5,000',
    moaAoaStampDuty: '₹500 (MoA) + ₹500 (AoA)',
    rocOfficeJurisdiction: 'RoC Dehradun (Mile Stone Building, Saharanpur Road)',
  },
  {
    state: 'Goa',
    incorporationStampDuty1Lakh: '₹1,000',
    incorporationStampDuty10Lakh: '₹5,000',
    moaAoaStampDuty: '₹500 (MoA) + ₹500 (AoA)',
    rocOfficeJurisdiction: 'RoC Goa (EDC Complex, Patto, Panaji)',
  },
  {
    state: 'Chhattisgarh',
    incorporationStampDuty1Lakh: '₹1,000',
    incorporationStampDuty10Lakh: '₹5,000',
    moaAoaStampDuty: '₹500 (MoA) + ₹500 (AoA)',
    rocOfficeJurisdiction: 'RoC Bilaspur (High Court Road, Bodri)',
  },
  {
    state: 'Jharkhand',
    incorporationStampDuty1Lakh: '₹1,000',
    incorporationStampDuty10Lakh: '₹5,000',
    moaAoaStampDuty: '₹500 (MoA) + ₹500 (AoA)',
    rocOfficeJurisdiction: 'RoC Ranchi (Mangal Tower, Old Hazaribagh Road)',
  },
  {
    state: 'Himachal Pradesh',
    incorporationStampDuty1Lakh: '₹500',
    incorporationStampDuty10Lakh: '₹5,000',
    moaAoaStampDuty: '₹250 (MoA) + ₹250 (AoA)',
    rocOfficeJurisdiction: 'RoC Chandigarh (Corporate Bhawan, Sector 27-B)',
  },
  {
    state: 'Jammu & Kashmir',
    incorporationStampDuty1Lakh: '₹1,000',
    incorporationStampDuty10Lakh: '₹5,000',
    moaAoaStampDuty: '₹500 (MoA) + ₹500 (AoA)',
    rocOfficeJurisdiction: 'RoC Jammu & Kashmir (Rail Head Complex, Jammu)',
  },
];

export const MANDATORY_STATUTORY_FILINGS: ComplianceFiling[] = [
  {
    id: 'mca-spice-plus',
    portalName: 'MCA21 (mca.gov.in)',
    filingName: 'SPICe+ Part A & Part B (INC-32) + AGILE-PRO-S',
    regulatoryBody: 'Ministry of Corporate Affairs (MCA)',
    statutoryDeadline: 'Day 0 (Pre-launch Incorporation)',
    governmentFeeINR: '₹0 (Zero MCA fee for capital up to ₹15 Lakhs; only state stamp duty applies)',
    penaltyForNonCompliance: 'Operating as unorganized sole proprietorship exposes founders to unlimited personal debt and asset liability.',
    stepByStepInstructions: [
      'File SPICe+ Part A for company name reservation (two proposed name choices checked against trademark registry).',
      'Fill SPICe+ Part B with registered office address, director DIN/PAN details, and authorized share capital structure.',
      'Draft electronic Memorandum of Association (e-MoA INC-33) and Articles of Association (e-AoA INC-34) with Class 3 Digital Signature Certificate (DSC).',
      'Submit integrated AGILE-PRO-S form for instantaneous automatic issuance of GSTIN, EPFO, ESIC, Professional Tax, and Corporate Bank Account opening.',
    ],
    requiredArtifacts: ['PAN card & Aadhaar of all Directors', 'Electricity/Utility bill of registered office (≤ 2 months old)', 'No Objection Certificate (NOC) from property owner', 'Director DSCs (Class 3)'],
    mandatoryFor: 'All Private Limited Companies',
  },
  {
    id: 'dpiit-recognition',
    portalName: 'Startup India Portal (startupindia.gov.in)',
    filingName: 'DPIIT Startup Recognition Certificate',
    regulatoryBody: 'Department for Promotion of Industry and Internal Trade (DPIIT)',
    statutoryDeadline: 'Immediately post-incorporation',
    governmentFeeINR: '₹0 (Free government application)',
    penaltyForNonCompliance: 'Ineligibility for Section 80-IAC tax holiday, Angel Tax exemptions u/s 56(2)(viib), and 80% patent filing fee subsidies.',
    stepByStepInstructions: [
      'Log in to Startup India Portal using Company credentials.',
      'Fill out the Recognition Form detailing business model innovation, market scalability, and employment generation potential.',
      'Upload pitch deck and optional 2-minute video presentation explaining novel product features.',
      'Receive instant Certificate of Recognition containing unique DIPP registration number.',
    ],
    requiredArtifacts: ['Certificate of Incorporation', 'Memorandum of Association', 'Product pitch deck', 'Website / App link'],
    mandatoryFor: 'All Early-Stage Tech & Product Startups seeking grants and tax exemptions',
  },
  {
    id: 'inc-20a-commencement',
    portalName: 'MCA21 (mca.gov.in)',
    filingName: 'Form INC-20A (Declaration of Commencement of Business)',
    regulatoryBody: 'Registrar of Companies (RoC)',
    statutoryDeadline: 'Within 180 days of incorporation',
    governmentFeeINR: '₹300 - ₹600',
    penaltyForNonCompliance: '₹50,000 fine on company + ₹1,000/day on directors; RoC initiates strike-off (suo-motu deregistration) and freezes corporate bank accounts.',
    stepByStepInstructions: [
      'All initial subscribers must deposit their subscribed share capital amount into the company corporate bank account.',
      'Obtain bank statement showing paid-up capital credit matching MoA subscription sheet.',
      'File Form INC-20A on MCA portal verified by a practicing CA, CS, or Cost Accountant.',
    ],
    requiredArtifacts: ['Bank statement showing share capital credit', 'Photographs of registered office with company nameplate'],
    mandatoryFor: 'All Indian Companies with share capital',
  },
  {
    id: 'adt-1-auditor',
    portalName: 'MCA21 (mca.gov.in)',
    filingName: 'Form ADT-1 (Appointment of Statutory Auditor)',
    regulatoryBody: 'Ministry of Corporate Affairs (MCA)',
    statutoryDeadline: 'Within 30 days of first Board Meeting (or 15 days of AGM)',
    governmentFeeINR: '₹300 - ₹600',
    penaltyForNonCompliance: '₹1,000 per month late fee; invalidates financial statements for subsequent venture due diligence rounds.',
    stepByStepInstructions: [
      'Board of Directors passes resolution appointing first statutory Chartered Accountant firm.',
      'Obtain written consent and eligibility certificate (Section 139) from auditor.',
      'File Form ADT-1 on MCA21 portal.',
    ],
    requiredArtifacts: ['Board resolution extract', 'Auditor consent letter', 'Intimation letter copy'],
    mandatoryFor: 'All Incorporated Companies',
  },
  {
    id: 'rbi-firms-fc-gpr',
    portalName: 'RBI FIRMS Portal (firms.rbi.org.in)',
    filingName: 'Single Master Form (SMF) & Form FC-GPR',
    regulatoryBody: 'Reserve Bank of India (RBI Foreign Exchange Dept)',
    statutoryDeadline: 'Within 30 days of issuing shares to foreign / NRI investors',
    governmentFeeINR: '₹0 (RBI filing; compounding fee applies if delayed)',
    penaltyForNonCompliance: 'Heavy compounding penalties under FEMA 1999 (up to 300% of foreign investment amount) and freezing of foreign capital repatriation.',
    stepByStepInstructions: [
      'Register business Entity User and Business User credentials on RBI FIRMS portal.',
      'Obtain Foreign Inward Remittance Certificate (FIRC) and Know Your Customer (KYC) report from Authorized Dealer (AD) Category-1 bank.',
      'Secure Valuation Certificate from SEBI-registered Merchant Banker or Chartered Accountant using DCF methodology.',
      'File Form FC-GPR online with CS certification within 30 days of share allotment.',
    ],
    requiredArtifacts: ['FIRC from bank', 'Valuation certificate', 'CS compliance certificate', 'Board resolution for allotment'],
    mandatoryFor: 'Any Startup raising foreign capital, overseas accelerator funding (Y Combinator), or NRI investment',
  },
  {
    id: 'foscos-fssai',
    portalName: 'FoSCoS FSSAI Portal (foscos.fssai.gov.in)',
    filingName: 'FSSAI State / Central Food Business Operator (FBO) License',
    regulatoryBody: 'Food Safety and Standards Authority of India (FSSAI)',
    statutoryDeadline: 'Prior to handling, storing, or transporting food or agricultural produce',
    governmentFeeINR: '₹2,000 - ₹7,500 annually',
    penaltyForNonCompliance: 'Imprisonment up to 6 months and fine up to ₹5 Lakhs under Section 63 of FSS Act 2006 for operating without valid license.',
    stepByStepInstructions: [
      'Create FBO account on FoSCoS portal using authorized signatory mobile and email.',
      'Select relevant Food Category (e.g. 04 - Fruits & vegetables, 15 - Ready-to-eat savouries, or Storage / Cold Chain).',
      'Upload layout plan of warehouse / cold storage, list of equipment, and water test report from NABL lab.',
      'Submit Form-B and pay government fee based on turnover bracket (<₹12L: Registration; ₹12L-₹20Cr: State License; >₹20Cr: Central License).',
    ],
    requiredArtifacts: ['Premises rental agreement / ownership deed', 'FSMS Plan / Hazard Analysis', 'Medical fitness certificates of food handlers'],
    mandatoryFor: 'All FoodTech, Agri-Produce Storage, Cloud Kitchen, and Perishable Logistics Ventures',
  },
  {
    id: 'dpdp-consent-manager',
    portalName: 'Data Protection Board of India Portal',
    filingName: 'DPDP Act 2023 Consent Notice & DPO Designation',
    regulatoryBody: 'Data Protection Board of India (DPBI) & MeitY',
    statutoryDeadline: 'Prior to collecting customer personal or location data',
    governmentFeeINR: '₹0 internal compliance implementation',
    penaltyForNonCompliance: 'Fines up to ₹250 Crore under DPDP Act 2023 for failure to protect personal data or unauthorized processing.',
    stepByStepInstructions: [
      'Draft bilingual itemized consent notice in clear, plain language with options to withdraw consent easily.',
      'Appoint an accessible Data Grievance Redressal Officer published on homepage footer and app settings.',
      'Implement automated data erasure workflow upon user account deletion.',
      'Conduct periodic Data Protection Impact Assessments (DPIA) if classified as Significant Data Fiduciary (SDF).',
    ],
    requiredArtifacts: ['Itemized Privacy Policy', 'Consent manager workflow architecture', 'Data breach response protocol'],
    mandatoryFor: 'All Consumer, Fintech, Food Delivery, and Mobile Platforms processing user data',
  },
  {
    id: 'mca-annual-returns',
    portalName: 'MCA21 (mca.gov.in)',
    filingName: 'Forms AOC-4, MGT-7, and DIR-3 KYC',
    regulatoryBody: 'Registrar of Companies (RoC)',
    statutoryDeadline: 'DIR-3 KYC by Sept 30; AOC-4 within 30 days of AGM; MGT-7 within 60 days of AGM',
    governmentFeeINR: '₹600 - ₹1,200',
    penaltyForNonCompliance: '₹100 per day per form cumulative late fee; deactivation of Director Identification Number (DIN) and ₹5,000 DIN reactivation fee.',
    stepByStepInstructions: [
      'File web-based DIR-3 KYC for all directors using registered mobile OTP and email verification.',
      'Adopt audited Balance Sheet, P&L, and Board Report at Annual General Meeting (AGM).',
      'Upload audited accounts via Form AOC-4 and shareholding details via Form MGT-7 certified by practicing professional.',
    ],
    requiredArtifacts: ['Audited Financial Statements', 'Board Report with MGT-9 extract', 'Auditor Report'],
    mandatoryFor: 'All Registered Private Limited Companies annually',
  },
  {
    id: 'msme-1-dpt-3',
    portalName: 'MCA21 (mca.gov.in)',
    filingName: 'Form MSME-1 (Vendor Dues) & Form DPT-3 (Deposits Return)',
    regulatoryBody: 'Ministry of Corporate Affairs (MCA)',
    statutoryDeadline: 'MSME-1 half-yearly (Apr 30 / Oct 31); DPT-3 annually by June 30',
    governmentFeeINR: '₹300 - ₹600',
    penaltyForNonCompliance: '₹20,000 - ₹1 Lakh on company; director disqualification risks for non-disclosure of investor loans/safe notes.',
    stepByStepInstructions: [
      'Reconcile all outstanding vendor dues to micro and small enterprises exceeding 45 days.',
      'Disclose all convertible notes, founder loans, and bank credit facilities in annual Form DPT-3.',
    ],
    requiredArtifacts: ['Vendor age-wise ledger', 'Loan and CCD register extract'],
    mandatoryFor: 'All Companies with MSME suppliers or external loans/convertible notes',
  },
];

/**
 * Retrieves the state stamp duty details for a chosen Indian state.
 */
export function getStateStampDuty(stateName: string): StateStampDuty {
  const matched = STATE_STAMP_DUTY_RATES.find(
    (s) => s.state.toLowerCase() === stateName.toLowerCase()
  );
  return matched || STATE_STAMP_DUTY_RATES[0]; // Default to Karnataka
}

/**
 * Returns tailored compliance checklist and state stamp duty for an idea.
 */
export function getComplianceChecklistForIdea(
  idea: string,
  stateName: string = 'Karnataka'
): { filings: ComplianceFiling[]; stampDuty: StateStampDuty } {
  const stampDuty = getStateStampDuty(stateName);
  const normalized = (idea || '').toLowerCase();

  const filings = MANDATORY_STATUTORY_FILINGS.filter((f) => {
    if (f.id === 'foscos-fssai') {
      return (
        normalized.includes('food') ||
        normalized.includes('produce') ||
        normalized.includes('agri') ||
        normalized.includes('restaurant') ||
        normalized.includes('grocery') ||
        normalized.includes('snack') ||
        normalized.includes('beverage') ||
        normalized.includes('farm') ||
        normalized.includes('storage') ||
        normalized.includes('kitchen')
      );
    }
    if (f.id === 'rbi-firms-fc-gpr') {
      return (
        normalized.includes('venture') ||
        normalized.includes('fdi') ||
        normalized.includes('foreign') ||
        normalized.includes('global') ||
        normalized.includes('cross-border') ||
        normalized.includes('institutional') ||
        normalized.includes('logistics')
      );
    }
    return true;
  });

  return { filings, stampDuty };
}


export function formatComplianceContext(idea: string, stateName: string = 'Karnataka'): string {
  const stamp = getStateStampDuty(stateName);

  return `
--- STATUTORY ROC PORTALS & COMPLIANCE ROADMAP (${stamp.state}) ---
Jurisdictional RoC Office: ${stamp.rocOfficeJurisdiction}
State Incorporation Stamp Duty: ${stamp.incorporationStampDuty1Lakh} (Capital ≤ ₹1L) | ${stamp.incorporationStampDuty10Lakh} (Capital ≤ ₹10L)
e-MoA & e-AoA Stamp Duty: ${stamp.moaAoaStampDuty}

Mandatory Statutory Filings Matrix & MANDATORY STATUTORY FILING STEPS:
${MANDATORY_STATUTORY_FILINGS.map(
  (f, idx) => `
[Filing ${idx + 1}: ${f.filingName} (${f.portalName})]
- Regulatory Body: ${f.regulatoryBody} | Statutory Deadline: ${f.statutoryDeadline}
- Government Fee: ${f.governmentFeeINR}
- Non-Compliance Penalty: ${f.penaltyForNonCompliance}
- Key Procedures: ${f.stepByStepInstructions.slice(0, 2).join('; ')}
- Required Artifacts: ${f.requiredArtifacts.join(', ')}
`
).join('\n')}
-------------------------------------------------------------------
`.trim();
}
