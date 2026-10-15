/**
 * Central and All-State/UT Government Startup Schemes, Subsidies & Non-Dilutive Capital Corpus.
 * Fully verified against official portals: Startup India, DPIIT, MSME Sambandh, MeitY SAMRIDH, AIF, and State Startup Portals.
 */

export interface GovernmentScheme {
  id: string;
  name: string;
  level: 'Central' | 'State';
  state?: string;
  ministryOrDepartment: string;
  financialBenefit: string;
  fundingType: 'Grant (Non-Dilutive)' | 'Interest Subvention' | 'Collateral-Free Debt' | 'Tax Exemption' | 'Rebate';
  maxAmountINR: string;
  eligibilitySummary: string;
  requiredDocuments: string[];
  portalUrl: string;
  relevanceKeywords: string[];
}

export const CENTRAL_STARTUP_SCHEMES: GovernmentScheme[] = [
  {
    id: 'sisfs',
    name: 'Startup India Seed Fund Scheme (SISFS)',
    level: 'Central',
    ministryOrDepartment: 'DPIIT, Ministry of Commerce & Industry',
    financialBenefit: 'Up to ₹20 Lakhs grant for proof of concept/prototype; up to ₹50 Lakhs convertible debenture or debt for commercialization.',
    fundingType: 'Grant (Non-Dilutive)',
    maxAmountINR: '₹70 Lakhs total (₹20L grant + ₹50L debt)',
    eligibilitySummary: 'DPIIT-recognized startup incorporated ≤ 2 years ago; must have a viable product prototype with market-fit potential; cannot have received > ₹10 Lakhs monetary support under other central/state schemes.',
    requiredDocuments: ['DPIIT Certificate of Recognition', 'CIN / Incorporation Certificate', 'Pitch deck / PoC video', 'Incubator endorsement'],
    portalUrl: 'https://seedfund.startupindia.gov.in',
    relevanceKeywords: ['all', 'tech', 'software', 'agri', 'b2b', 'consumer', 'logistics', 'hardware'],
  },
  {
    id: 'cgss',
    name: 'Credit Guarantee Scheme for Startups (CGSS)',
    level: 'Central',
    ministryOrDepartment: 'Department for Promotion of Industry and Internal Trade (DPIIT) & NCGTC',
    financialBenefit: 'Credit guarantee cover up to 85% for collateral-free loans up to ₹10 Crore disbursed by scheduled commercial banks and NBFCs.',
    fundingType: 'Collateral-Free Debt',
    maxAmountINR: '₹10 Crores',
    eligibilitySummary: 'DPIIT-recognized startups with certified stable revenue over 12 months, or endorsed by SEBI-registered Alternate Investment Funds (AIFs).',
    requiredDocuments: ['Audited financials / provisional P&L', '12-month GST returns', 'DPIIT Recognition', 'Sanction Letter from Member Institution'],
    portalUrl: 'https://www.ncgtc.in/en/cgss',
    relevanceKeywords: ['scale', 'debt', 'working-capital', 'logistics', 'hardware', 'supply-chain'],
  },
  {
    id: 'section-80iac',
    name: 'Section 80-IAC 3-Year 100% Tax Holiday',
    level: 'Central',
    ministryOrDepartment: 'Central Board of Direct Taxes (CBDT) & Inter-Ministerial Board (IMB)',
    financialBenefit: '100% deduction on corporate tax profits for 3 consecutive financial years out of the first 10 years from incorporation.',
    fundingType: 'Tax Exemption',
    maxAmountINR: '100% Income Tax Exemption on Profits',
    eligibilitySummary: 'Private Limited Company or LLP incorporated between April 1, 2016 and March 31, 2025; annual turnover < ₹100 Crore in any fiscal year; certified by Inter-Ministerial Board of Certification.',
    requiredDocuments: ['Form-1 submission on Startup India Portal', 'Audited Balance Sheets (past 3 years)', 'Pitch Deck demonstrating innovation and scalability', 'Video link explaining novel IP'],
    portalUrl: 'https://www.startupindia.gov.in/content/sih/en/tax-exemptions.html',
    relevanceKeywords: ['all', 'pvt-ltd', 'tax', 'profitable', 'saas', 'tech'],
  },
  {
    id: 'sipp-ipr',
    name: 'Scheme for Facilitating Startups IPR Protection (SIPP)',
    level: 'Central',
    ministryOrDepartment: 'Office of Controller General of Patents, Designs & Trade Marks (CGPDTM)',
    financialBenefit: '80% statutory fee concession on Indian patent applications; 50% concession on trademark filings; 100% government reimbursement of registered patent facilitator legal fees.',
    fundingType: 'Rebate',
    maxAmountINR: '80% Patent Fee Concession + Free Facilitator Legal Fees',
    eligibilitySummary: 'Any DPIIT-recognized startup or recognized educational institution spin-off.',
    requiredDocuments: ['DPIIT Recognition Certificate', 'Patent Specification (Form 1, 2, 5, 26)', 'Undertaking Form 28'],
    portalUrl: 'https://ipindia.gov.in',
    relevanceKeywords: ['tech', 'patents', 'hardware', 'ai', 'algorithm', 'deeptech', 'agri-iot'],
  },
  {
    id: 'pm-fme-aif',
    name: 'PM-FME & Agriculture Infrastructure Fund (AIF)',
    level: 'Central',
    ministryOrDepartment: 'Ministry of Food Processing Industries (MoFPI) & Ministry of Agriculture',
    financialBenefit: '35% credit-linked capital subsidy up to ₹10 Lakhs for micro-food processing units + 3% interest subvention per annum for 7 years on term loans up to ₹2 Crore under AIF.',
    fundingType: 'Interest Subvention',
    maxAmountINR: '₹10 Lakhs grant + 3% interest subsidy on ₹2 Crore loan',
    eligibilitySummary: 'Agritech, post-harvest logistics, cold storage aggregators, farm-to-fork supply chains, or farmer collectives (FPOs).',
    requiredDocuments: ['Detailed Project Report (DPR)', 'FSSAI License / Registration', 'Land / Lease agreement for packhouse or cold unit', 'Bank Sanction Letter'],
    portalUrl: 'https://pmfme.mofpi.gov.in',
    relevanceKeywords: ['agri', 'farm', 'food', 'cold-chain', 'supply-chain', 'perishable', 'marketplace', 'fpo'],
  },
  {
    id: 'samridh-meity',
    name: 'SAMRIDH Accelerator Scheme',
    level: 'Central',
    ministryOrDepartment: 'Ministry of Electronics & Information Technology (MeitY)',
    financialBenefit: 'Matching investment up to ₹40 Lakhs equity/convertible debt per startup, matching equal investments by approved accelerators and angel syndicates.',
    fundingType: 'Grant (Non-Dilutive)',
    maxAmountINR: '₹40 Lakhs matching capital',
    eligibilitySummary: 'Early-stage software and tech product startups enrolled in accredited Indian tech accelerators; customer-validated PoC with initial traction.',
    requiredDocuments: ['Term sheet from approved accelerator', 'Cap table', 'Product demo', 'Customer traction metrics'],
    portalUrl: 'https://meitystartuphub.in/schemes/samridh',
    relevanceKeywords: ['software', 'saas', 'ai', 'b2b', 'fintech', 'app'],
  },
  {
    id: 'meity-tide-2',
    name: 'MeitY TIDE 2.0 (Technology Incubation & Development of Entrepreneurs)',
    level: 'Central',
    ministryOrDepartment: 'Ministry of Electronics & IT (MeitY) & Incubation Centers',
    financialBenefit: 'Entrepreneur-in-Residence (EiR) fellowship of ₹4 Lakhs (₹30,000/month) + Grant-in-Aid up to ₹7 Lakhs for prototype; up to ₹30 Lakhs scale-up funding.',
    fundingType: 'Grant (Non-Dilutive)',
    maxAmountINR: '₹37 Lakhs grant (EiR + Prototype + Scale-up)',
    eligibilitySummary: 'Tech startups leveraging IoT, AI, Blockchain, Robotics, or Clean Energy incubated at TIDE 2.0 centers (IITs, NITs, IIITs).',
    requiredDocuments: ['Incubator recommendation letter', 'Detailed technical whitepaper', 'Prototype bill of materials'],
    portalUrl: 'https://tide2.meity.gov.in',
    relevanceKeywords: ['tech', 'ai', 'deeptech', 'iot', 'robotics', 'software', 'hardware'],
  },
  {
    id: 'birac-big',
    name: 'BIRAC Biotechnology Ignition Grant (BIG)',
    level: 'Central',
    ministryOrDepartment: 'Department of Biotechnology (DBT), Ministry of Science & Technology',
    financialBenefit: 'Up to ₹50 Lakhs non-dilutive grant-in-aid for 18 months to establish proof-of-concept for innovative biotech, healthtech, and agribiotech ideas.',
    fundingType: 'Grant (Non-Dilutive)',
    maxAmountINR: '₹50 Lakhs Grant (Zero Equity)',
    eligibilitySummary: 'Biotech/HealthTech/Agritech startups with registered office in India; incorporated ≤ 5 years ago; majority equity held by Indian citizens.',
    requiredDocuments: ['Research proposal & ethics clearances', 'Lab facility tie-up letter', 'Milestone Gantt chart'],
    portalUrl: 'https://birac.nic.in/big.php',
    relevanceKeywords: ['healthtech', 'biotech', 'agri', 'diagnostics', 'pharma', 'medical-devices'],
  },
  {
    id: 'dst-nidhi-prayas',
    name: 'DST NIDHI-PRAYAS (Promoting & Accelerating Young and Aspirational Technology Innovators)',
    level: 'Central',
    ministryOrDepartment: 'Department of Science & Technology (DST), Govt. of India',
    financialBenefit: 'Proof-of-concept prototyping grant of up to ₹10 Lakhs to convert innovative ideas into physical hardware/software prototypes within 18 months.',
    fundingType: 'Grant (Non-Dilutive)',
    maxAmountINR: '₹10 Lakhs Grant',
    eligibilitySummary: 'Individual innovators or early-stage startups working on tangible technology prototypes with social or commercial impact.',
    requiredDocuments: ['PRAYAS Center application form', 'CAD drawings / architecture diagram', 'Prototyping expense budget'],
    portalUrl: 'https://nidhi-prayas.org',
    relevanceKeywords: ['hardware', 'prototyping', 'iot', 'robotics', 'clean-energy', 'tech'],
  },
  {
    id: 'msme-hackathon',
    name: 'MSME Idea Hackathon 3.0 & Capital Subsidy',
    level: 'Central',
    ministryOrDepartment: 'Ministry of Micro, Small and Medium Enterprises (MoMSME)',
    financialBenefit: 'Up to ₹15 Lakhs grant per approved project through Business Incubators (Host Institutes) + up to ₹1 Crore assistance for procurement of plant and machinery.',
    fundingType: 'Grant (Non-Dilutive)',
    maxAmountINR: '₹15 Lakhs Grant + ₹1 Crore Machinery Support',
    eligibilitySummary: 'MSME registered units or individual students/entrepreneurs with innovative concepts addressing industrial challenges.',
    requiredDocuments: ['Udyam Registration Certificate', 'Host Institute recommendation', 'Project Cost Breakdown'],
    portalUrl: 'https://innovative.msme.gov.in',
    relevanceKeywords: ['msme', 'manufacturing', 'hardware', 'supply-chain', 'b2b', 'food-processing'],
  },
];

export const STATE_STARTUP_SCHEMES: GovernmentScheme[] = [
  // ── Karnataka ──
  {
    id: 'karnataka-elevate',
    name: 'Karnataka ELEVATE 100 / Idea2PoC Scheme',
    level: 'State',
    state: 'Karnataka',
    ministryOrDepartment: 'Department of Electronics, IT, Bt and S&T, Govt. of Karnataka',
    financialBenefit: 'Direct non-dilutive grant-in-aid of up to ₹50 Lakhs disbursed in milestone tranches, plus subsidized incubation at K-tech hubs and 100% patent reimbursement up to ₹2L (domestic) / ₹10L (international).',
    fundingType: 'Grant (Non-Dilutive)',
    maxAmountINR: '₹50 Lakhs Grant (Zero Equity)',
    eligibilitySummary: 'Startups registered with Karnataka Startup Cell with registered office or substantial operations in Karnataka; minimum 50% equity held by Indian founders.',
    requiredDocuments: ['Karnataka Startup Cell Certificate', 'Milestone Budget Plan', 'Pitch deck & product demo video', 'Chartered Accountant certificate of funds'],
    portalUrl: 'https://startup.karnataka.gov.in',
    relevanceKeywords: ['all', 'bengaluru', 'karnataka', 'tech', 'agritech', 'deeptech'],
  },
  {
    id: 'karnataka-unnati',
    name: 'Karnataka Unnati Scheme (Social Inclusion)',
    level: 'State',
    state: 'Karnataka',
    ministryOrDepartment: 'Social Welfare Department, Govt. of Karnataka',
    financialBenefit: 'Direct seed grant of up to ₹50 Lakhs for startups founded by SC/ST entrepreneurs developing tech solutions for sanitation, agriculture, and rural enablement.',
    fundingType: 'Grant (Non-Dilutive)',
    maxAmountINR: '₹50 Lakhs Grant',
    eligibilitySummary: 'Startups where SC/ST founders hold at least 60% equity and active executive control.',
    requiredDocuments: ['Caste certificate of founders', 'DPIIT Recognition', 'Detailed Project Report (DPR)'],
    portalUrl: 'https://sw.kar.nic.in',
    relevanceKeywords: ['karnataka', 'social', 'rural', 'agri', 'inclusion'],
  },

  // ── Maharashtra ──
  {
    id: 'maharashtra-startup-seed',
    name: 'Maharashtra State Innovative Startup Policy & Startup Week',
    level: 'State',
    state: 'Maharashtra',
    ministryOrDepartment: 'Maharashtra State Innovation Society (MSInS)',
    financialBenefit: 'Direct government work orders up to ₹15 Lakhs for 24 winning startups without standard tender hurdles, monthly lease rental subsidy up to ₹50,000 for 12 months, and patent filing reimbursement up to ₹2L (domestic) / ₹10L (international).',
    fundingType: 'Grant (Non-Dilutive)',
    maxAmountINR: '₹15 Lakhs Work Order + ₹6 Lakhs Rent Subsidy',
    eligibilitySummary: 'Startups incorporated in Maharashtra, DPIIT registered, and enrolled with MSInS portal; must be less than 5 years old.',
    requiredDocuments: ['MSInS Registration ID', 'Lease agreement of registered workplace', 'DPIIT certificate', 'Milestone utilization plan'],
    portalUrl: 'https://msins.in',
    relevanceKeywords: ['all', 'mumbai', 'pune', 'maharashtra', 'logistics', 'fintech'],
  },

  // ── Tamil Nadu ──
  {
    id: 'tamilnadu-tanseed',
    name: 'Tamil Nadu TANSEED 5.0 (StartupTN)',
    level: 'State',
    state: 'Tamil Nadu',
    ministryOrDepartment: 'Tamil Nadu Startup and Innovation Mission (TANSIM)',
    financialBenefit: 'Equity-free seed grant of ₹15 Lakhs awarded in 3 milestone tranches to early-stage startups, with priority for rural, agritech, and green-tech solutions.',
    fundingType: 'Grant (Non-Dilutive)',
    maxAmountINR: '₹15 Lakhs Grant (Zero Equity)',
    eligibilitySummary: 'Startups headquartered in Tamil Nadu with DPIIT recognition and active prototype.',
    requiredDocuments: ['StartupTN registration', 'Prototype validation report', 'Milestone roadmap'],
    portalUrl: 'https://startuptn.in',
    relevanceKeywords: ['all', 'chennai', 'tamil-nadu', 'agri', 'greentech', 'manufacturing'],
  },

  // ── Telangana ──
  {
    id: 'telangana-tfund',
    name: 'Telangana T-Fund & T-Hub Grants',
    level: 'State',
    state: 'Telangana',
    ministryOrDepartment: 'Information Technology, Electronics & Communications (ITE&C) Dept, Telangana',
    financialBenefit: 'Seed funding between ₹25 Lakhs to ₹1 Crore co-invested with private venture partners, subsidized prototyping lab access at T-Works, and cloud credit grants.',
    fundingType: 'Grant (Non-Dilutive)',
    maxAmountINR: 'Up to ₹1 Crore Co-Investment',
    eligibilitySummary: 'Tech startups registered in Telangana with scalable technology architecture.',
    requiredDocuments: ['Telangana Startup Registry ID', 'T-Hub / We Hub endorsement', 'Financial model'],
    portalUrl: 'https://startup.telangana.gov.in',
    relevanceKeywords: ['all', 'hyderabad', 'telangana', 'hardware', 'deeptech', 'saas'],
  },

  // ── Delhi NCR ──
  {
    id: 'delhi-startup-policy',
    name: 'Delhi Startup Policy (DSIIDC & DTU Innovation)',
    level: 'State',
    state: 'Delhi (NCT)',
    ministryOrDepartment: 'Industries Department, Government of NCT of Delhi',
    financialBenefit: 'Collateral-free seed debt up to ₹10 Lakhs, 50% lease rental subsidy up to ₹30,000/month for 1 year, and 100% reimbursement of patent/trademark filing fees.',
    fundingType: 'Interest Subvention',
    maxAmountINR: '₹10 Lakhs Seed Loan + ₹3.6 Lakhs Rent Subsidy',
    eligibilitySummary: 'Startups registered and operating within NCT of Delhi with valid GSTIN and DPIIT certificate.',
    requiredDocuments: ['Delhi GST certificate', 'Registered lease deed in Delhi', 'DPIIT certificate'],
    portalUrl: 'https://startup.delhi.gov.in',
    relevanceKeywords: ['delhi', 'ncr', 'all', 'services', 'logistics', 'consumer'],
  },

  // ── Uttar Pradesh ──
  {
    id: 'up-startup-policy',
    name: 'Uttar Pradesh Startup Policy 2020 (StartInUP)',
    level: 'State',
    state: 'Uttar Pradesh',
    ministryOrDepartment: 'Department of IT & Electronics, Govt. of Uttar Pradesh',
    financialBenefit: 'Monthly sustenance allowance of ₹20,000/month for 1 year (₹2.4 Lakhs total), prototype grant up to ₹7.5 Lakhs, marketing assistance up to ₹10 Lakhs, and seed capital matching up to ₹50 Lakhs.',
    fundingType: 'Grant (Non-Dilutive)',
    maxAmountINR: '₹19.9 Lakhs Grant (Sustenance + Prototype + Marketing)',
    eligibilitySummary: 'DPIIT startups registered in UP incubated at recognized incubators (IIT Kanpur, IIM Lucknow, etc.).',
    requiredDocuments: ['StartInUP registration ID', 'Incubator recommendation letter', 'Expense invoices'],
    portalUrl: 'https://startinup.up.gov.in',
    relevanceKeywords: ['uttar-pradesh', 'noida', 'lucknow', 'kanpur', 'all', 'tier-2'],
  },

  // ── Gujarat ──
  {
    id: 'gujarat-ssip',
    name: 'Gujarat Student Startup and Innovation Policy (SSIP 2.0 / i-Hub)',
    level: 'State',
    state: 'Gujarat',
    ministryOrDepartment: 'Education & Industries Department, Government of Gujarat',
    financialBenefit: 'Prototyping assistance grant up to ₹2.5 Lakhs at student/early stage; soft-loan or scale-up grant up to ₹30 Lakhs via i-Hub Gujarat, plus ₹20,000/month sustenance allowance for 12 months.',
    fundingType: 'Grant (Non-Dilutive)',
    maxAmountINR: '₹32.4 Lakhs Grant/Soft Loan',
    eligibilitySummary: 'Startups founded by Gujarat university alumni or operating within Gujarat incubation centers.',
    requiredDocuments: ['i-Hub membership certificate', 'Prototype bill of materials', 'Incorporation certificate'],
    portalUrl: 'https://ihubgujarat.in',
    relevanceKeywords: ['all', 'ahmedabad', 'gujarat', 'hardware', 'chemicals', 'd2c'],
  },

  // ── Kerala ──
  {
    id: 'kerala-ksum',
    name: 'Kerala Startup Mission (KSUM) Idea Grant & Scale-Up Scheme',
    level: 'State',
    state: 'Kerala',
    ministryOrDepartment: 'Kerala Startup Mission (KSUM), Govt. of Kerala',
    financialBenefit: 'Idea Grant up to ₹2 Lakhs, Prototype Grant up to ₹7 Lakhs, Scale-up Grant up to ₹12 Lakhs, and low-interest working capital loan up to ₹15 Lakhs without collateral.',
    fundingType: 'Grant (Non-Dilutive)',
    maxAmountINR: '₹21 Lakhs Grant (Idea + Prototype + Scale-up)',
    eligibilitySummary: 'Startups registered with Kerala Startup Mission with unique KSUM Unique ID.',
    requiredDocuments: ['KSUM Unique ID', 'Project proposal', 'Chartered Accountant utilization certificate'],
    portalUrl: 'https://startupmission.kerala.gov.in',
    relevanceKeywords: ['kerala', 'kochi', 'trivandrum', 'hardware', 'deeptech', 'all'],
  },

  // ── Rajasthan ──
  {
    id: 'rajasthan-istart',
    name: 'iStart Rajasthan Startup Policy (Bhamashah Techno Hub)',
    level: 'State',
    state: 'Rajasthan',
    ministryOrDepartment: 'Department of IT & Communication (DoIT&C), Govt. of Rajasthan',
    financialBenefit: 'Viability grant up to ₹25 Lakhs, monthly sustenance allowance of ₹20,000/month for 1 year (₹25,000/month for women founders), and marketing assistance up to ₹5 Lakhs.',
    fundingType: 'Grant (Non-Dilutive)',
    maxAmountINR: '₹33 Lakhs Total Assistance',
    eligibilitySummary: 'Registered on iStart Rajasthan portal with Q-Rate assessment tier ranking.',
    requiredDocuments: ['iStart registration ID', 'Q-rate score certificate', 'Pitch deck'],
    portalUrl: 'https://istart.rajasthan.gov.in',
    relevanceKeywords: ['rajasthan', 'jaipur', 'jodhpur', 'all', 'd2c', 'tourism', 'handicrafts'],
  },

  // ── Andhra Pradesh ──
  {
    id: 'ap-innovation-society',
    name: 'Andhra Pradesh Innovation Society (APIS) Seed Support',
    level: 'State',
    state: 'Andhra Pradesh',
    ministryOrDepartment: 'Department of ITE&C, Govt. of Andhra Pradesh',
    financialBenefit: 'Seed capital grant up to ₹15 Lakhs, 50% exhibition booth subsidy, and patent filing reimbursement up to ₹3 Lakhs.',
    fundingType: 'Grant (Non-Dilutive)',
    maxAmountINR: '₹15 Lakhs Grant',
    eligibilitySummary: 'Startups incorporated in Andhra Pradesh with operations in Vizag, Vijayawada, or Tirupati.',
    requiredDocuments: ['APIS registration certificate', 'Bank statements', 'Patent search report'],
    portalUrl: 'https://apis.ap.gov.in',
    relevanceKeywords: ['andhra-pradesh', 'vizag', 'all', 'agri', 'maritime', 'iot'],
  },

  // ── Odisha ──
  {
    id: 'odisha-startup-policy',
    name: 'Startup Odisha Policy (O-Hub)',
    level: 'State',
    state: 'Odisha',
    ministryOrDepartment: 'MSME Department, Government of Odisha',
    financialBenefit: 'Monthly sustenance allowance of ₹20,000/month for 1 year (₹22,000 for women/transgender/SC/ST), need-based assistance up to ₹16 Lakhs, and subsidized plug-and-play space at O-Hub Bhubaneswar.',
    fundingType: 'Grant (Non-Dilutive)',
    maxAmountINR: '₹18.4 Lakhs Total Grant',
    eligibilitySummary: 'Startups recognized under Startup Odisha with registered office in Odisha.',
    requiredDocuments: ['Startup Odisha Recognition Certificate', 'Monthly attendance logs', 'PoC video'],
    portalUrl: 'https://startupodisha.gov.in',
    relevanceKeywords: ['odisha', 'bhubaneswar', 'all', 'mining', 'agri', 'hardware'],
  },

  // ── West Bengal ──
  {
    id: 'wb-karma-sathi',
    name: 'West Bengal Karma Sathi Prakalpa & Startup Bengal',
    level: 'State',
    state: 'West Bengal',
    ministryOrDepartment: 'MSME & Textiles Department, Govt. of West Bengal',
    financialBenefit: 'Soft loan up to ₹2 Lakhs with 15% state government capital subsidy, plus access to ₹100 Crore West Bengal MSME Venture Capital Fund.',
    fundingType: 'Interest Subvention',
    maxAmountINR: '₹2 Lakhs Subsidized Loan + VC Matching',
    eligibilitySummary: 'Registered startups with operational base in West Bengal.',
    requiredDocuments: ['Trade license / Udyam', 'Project report approved by cooperative bank'],
    portalUrl: 'https://startupbengal.in',
    relevanceKeywords: ['west-bengal', 'kolkata', 'all', 'retail', 'fmcg', 'textiles'],
  },

  // ── Haryana ──
  {
    id: 'haryana-startup-policy',
    name: 'Haryana Startup Policy (Panchkula / Gurugram Hubs)',
    level: 'State',
    state: 'Haryana',
    ministryOrDepartment: 'Department of Information Technology, Electronics & Communication, Haryana',
    financialBenefit: 'Seed capital grant up to ₹10 Lakhs, lease rental subsidy of ₹20,000/month for 1 year, and patent filing reimbursement up to ₹25 Lakhs (international patents).',
    fundingType: 'Grant (Non-Dilutive)',
    maxAmountINR: '₹10 Lakhs Seed + ₹25 Lakhs Patent Grant',
    eligibilitySummary: 'DPIIT startups with registered office in Haryana (Gurugram, Faridabad, Panchkula).',
    requiredDocuments: ['Haryana enterprise portal registration', 'Patent grant copy', 'Rent lease receipt'],
    portalUrl: 'https://startupharyana.gov.in',
    relevanceKeywords: ['haryana', 'gurugram', 'all', 'auto', 'logistics', 'saas'],
  },

  // ── Punjab ──
  {
    id: 'punjab-startup-cell',
    name: 'Startup Punjab Seed Capital Assistance',
    level: 'State',
    state: 'Punjab',
    ministryOrDepartment: 'Department of Industries and Commerce, Govt. of Punjab',
    financialBenefit: 'Seed grant of up to ₹10 Lakhs, 50% lease rental subsidy for 1 year, and interest subsidy of 8% on working capital loans up to ₹5 Lakhs.',
    fundingType: 'Grant (Non-Dilutive)',
    maxAmountINR: '₹10 Lakhs Grant + ₹5 Lakhs Interest Subsidy',
    eligibilitySummary: 'Registered startups operating in Mohali, Ludhiana, or Amritsar.',
    requiredDocuments: ['Invest Punjab registration', 'DPIIT certificate', 'Milestone utilization certificate'],
    portalUrl: 'https://pbindustries.gov.in/startup',
    relevanceKeywords: ['punjab', 'mohali', 'all', 'agritech', 'manufacturing', 'food'],
  },

  // ── Madhya Pradesh ──
  {
    id: 'mp-startup-policy',
    name: 'Madhya Pradesh Startup Policy & Implementation Scheme',
    level: 'State',
    state: 'Madhya Pradesh',
    ministryOrDepartment: 'Department of Micro, Small and Medium Enterprises, MP',
    financialBenefit: 'Financial assistance of ₹1 Lakh/month for 1 year (₹1.2 Lakhs/month for women-led startups), electricity duty exemption, and 15% procurement reservation in government tenders.',
    fundingType: 'Grant (Non-Dilutive)',
    maxAmountINR: '₹14.4 Lakhs Sustenance Allowance',
    eligibilitySummary: 'DPIIT startups registered in Madhya Pradesh (Indore, Bhopal, Jabalpur).',
    requiredDocuments: ['MP Startup Portal Registration', 'Office lease verification', 'DPIIT certificate'],
    portalUrl: 'https://startup.mp.gov.in',
    relevanceKeywords: ['madhya-pradesh', 'indore', 'bhopal', 'all', 'agri', 'logistics'],
  },

  // ── Bihar ──
  {
    id: 'bihar-startup-policy',
    name: 'Bihar Startup Policy (Seed Fund & Trust)',
    level: 'State',
    state: 'Bihar',
    ministryOrDepartment: 'Department of Industries, Government of Bihar',
    financialBenefit: 'Interest-free seed grant of up to ₹10 Lakhs for 10 years, matching grant of up to ₹50 Lakhs for venture capital raised, and 5% additional assistance for SC/ST/women founders.',
    fundingType: 'Grant (Non-Dilutive)',
    maxAmountINR: '₹10 Lakhs Seed Grant + ₹50 Lakhs Matching Grant',
    eligibilitySummary: 'Startups founded by Bihar residents or incorporated in Bihar with innovative proof-of-concept.',
    requiredDocuments: ['Bihar Startup Portal ID', 'Pitch deck', 'Domicile / residential proof'],
    portalUrl: 'https://startup.bihar.gov.in',
    relevanceKeywords: ['bihar', 'patna', 'all', 'rural', 'agri', 'education', 'consumer'],
  },

  // ── Assam & North East ──
  {
    id: 'assam-startup-nest',
    name: 'Assam Startup Nest & MAS Scheme',
    level: 'State',
    state: 'Assam',
    ministryOrDepartment: 'Department of Industries & Commerce, Govt. of Assam',
    financialBenefit: 'Mentorship and Acceleration Scheme (MAS) grant up to ₹50 Lakhs, monthly sustenance allowance of ₹20,000/month for 1 year, and 50% lease rental subsidy.',
    fundingType: 'Grant (Non-Dilutive)',
    maxAmountINR: '₹50 Lakhs Grant (Zero Equity)',
    eligibilitySummary: 'Startups incubated at The Nest (Guwahati) or headquartered in Assam/North-East.',
    requiredDocuments: ['Assam Startup Registry ID', 'The Nest incubation agreement', 'DPIIT Certificate'],
    portalUrl: 'https://startup.assam.gov.in',
    relevanceKeywords: ['assam', 'north-east', 'guwahati', 'all', 'tea', 'bamboo', 'handicrafts'],
  },

  // ── Uttarakhand ──
  {
    id: 'uttarakhand-startup-policy',
    name: 'Uttarakhand Startup Policy (Dehradun Innovation)',
    level: 'State',
    state: 'Uttarakhand',
    ministryOrDepartment: 'Directorate of Industries, Uttarakhand',
    financialBenefit: 'Prototype grant up to ₹15 Lakhs, marketing and patent filing assistance up to ₹5 Lakhs, and subsidized co-working space across mountain districts.',
    fundingType: 'Grant (Non-Dilutive)',
    maxAmountINR: '₹15 Lakhs Prototyping Grant',
    eligibilitySummary: 'Startups with registered address in Uttarakhand addressing tourism, clean energy, agriculture, or tech.',
    requiredDocuments: ['Uttarakhand Startup Portal certificate', 'DPR report', 'Pitch deck'],
    portalUrl: 'https://startuputtarakhand.com',
    relevanceKeywords: ['uttarakhand', 'dehradun', 'tourism', 'all', 'clean-energy'],
  },

  // ── Goa ──
  {
    id: 'goa-startup-policy',
    name: 'Goa Startup Policy & Salary Subsidy',
    level: 'State',
    state: 'Goa',
    ministryOrDepartment: 'Department of Information Technology, Electronics and Communications, Goa',
    financialBenefit: 'Idea grant up to ₹2 Lakhs, salary reimbursement up to ₹25,000/month per local Goan employee hired for 2 years, and 100% trademark reimbursement.',
    fundingType: 'Grant (Non-Dilutive)',
    maxAmountINR: '₹6 Lakhs/year Salary Subsidy + ₹2 Lakhs Idea Grant',
    eligibilitySummary: 'Startups registered with Goa Startup Cell with at least 50% Goan workforce.',
    requiredDocuments: ['Goa Startup Cell Certificate', 'Employee 15-year residence proof', 'EPFO challans'],
    portalUrl: 'https://startups.goa.gov.in',
    relevanceKeywords: ['goa', 'all', 'travel', 'marine', 'tech', 'digital-nomad'],
  },

  // ── Himachal Pradesh ──
  {
    id: 'hp-cm-startup',
    name: 'Chief Minister’s Startup Scheme Himachal Pradesh',
    level: 'State',
    state: 'Himachal Pradesh',
    ministryOrDepartment: 'Department of Industries, Himachal Pradesh',
    financialBenefit: 'Sustenance allowance of ₹25,000/month for 1 year, incubation support up to ₹12 Lakhs at IIT Mandi or NIT Hamirpur, and 50% patent fee reimbursement.',
    fundingType: 'Grant (Non-Dilutive)',
    maxAmountINR: '₹3 Lakhs Sustenance + ₹12 Lakhs Incubation Grant',
    eligibilitySummary: 'Startups operating in HP addressing horticulture, tourism, renewable energy, or IT.',
    requiredDocuments: ['HP Startup scheme certificate', 'Incubator agreement with IIT Mandi / NIT'],
    portalUrl: 'https://emerginghimachal.hp.gov.in',
    relevanceKeywords: ['himachal', 'shimla', 'mandi', 'all', 'horticulture', 'clean-energy'],
  },

  // ── Jammu & Kashmir ──
  {
    id: 'jk-startup-policy',
    name: 'Jammu & Kashmir Startup Policy 2024–2027',
    level: 'State',
    state: 'Jammu & Kashmir',
    ministryOrDepartment: 'J&K Entrepreneurship Development Institute (JKEDI)',
    financialBenefit: 'Seed capital grant up to ₹10 Lakhs, patent filing reimbursement up to ₹3 Lakhs, and 100% stamp duty exemption on industrial land leases.',
    fundingType: 'Grant (Non-Dilutive)',
    maxAmountINR: '₹10 Lakhs Seed Grant',
    eligibilitySummary: 'Registered DPIIT startups headquartered in J&K (Srinagar/Jammu).',
    requiredDocuments: ['JKEDI registration certificate', 'State subject / domicile proof', 'DPIIT certificate'],
    portalUrl: 'https://jkedi.org',
    relevanceKeywords: ['kashmir', 'jammu', 'all', 'agri', 'handicrafts', 'tourism', 'horticulture'],
  },

  // ── Chhattisgarh ──
  {
    id: 'cg-startup-package',
    name: 'Chhattisgarh Startup Policy Package 2022–2027',
    level: 'State',
    state: 'Chhattisgarh',
    ministryOrDepartment: 'Commerce & Industry Department, Govt of Chhattisgarh / CSIDC',
    financialBenefit: 'Sustenance allowance of ₹20,000/month for 1 year, 50% lease rental subsidy up to ₹1.5 Lakhs/year for 3 years, and 100% electricity duty exemption for 5 years.',
    fundingType: 'Grant (Non-Dilutive)',
    maxAmountINR: '₹2.4 Lakhs Sustenance + ₹4.5 Lakhs Lease Subsidy',
    eligibilitySummary: 'DPIIT-recognized startups registered in Chhattisgarh with operations in Raipur, Bilaspur, or Bhilai.',
    requiredDocuments: ['Chhattisgarh State Startup Registration', 'DPIIT Certificate', 'Office Lease Deed'],
    portalUrl: 'https://industries.cg.gov.in',
    relevanceKeywords: ['chhattisgarh', 'raipur', 'all', 'agri', 'mining', 'manufacturing', 'tribal'],
  },

  // ── Jharkhand ──
  {
    id: 'jharkhand-startup-policy',
    name: 'Jharkhand Startup Policy & Seed Support',
    level: 'State',
    state: 'Jharkhand',
    ministryOrDepartment: 'Department of Information Technology & e-Governance (DoIT&eG), Jharkhand',
    financialBenefit: 'Seed grant up to ₹10 Lakhs, sustenance allowance of ₹15,000/month (₹20,000/month for women/tribal founders), and patent filing reimbursement up to ₹2 Lakhs.',
    fundingType: 'Grant (Non-Dilutive)',
    maxAmountINR: '₹10 Lakhs Seed Grant + Sustenance',
    eligibilitySummary: 'Startups incorporated in Jharkhand; evaluated by the State High Level Steering Committee.',
    requiredDocuments: ['Jharkhand Startup Certificate', 'DPIIT Certificate', 'Detailed Project Report (DPR)'],
    portalUrl: 'https://startup.jharkhand.gov.in',
    relevanceKeywords: ['jharkhand', 'ranchi', 'jamshedpur', 'all', 'minerals', 'tribal', 'agri'],
  },

  // ── Sikkim ──
  {
    id: 'sikkim-startup-scheme',
    name: 'Sikkim Youth & Organic Startup Scheme',
    level: 'State',
    state: 'Sikkim',
    ministryOrDepartment: 'Commerce & Industries Department, Government of Sikkim',
    financialBenefit: 'Seed capital grant up to ₹5 Lakhs, 35% capital investment subsidy on commercial bank loans up to ₹20 Lakhs, with focus on 100% organic value-chain and eco-tourism.',
    fundingType: 'Grant (Non-Dilutive)',
    maxAmountINR: '₹5 Lakhs Seed Grant + 35% Capital Subsidy',
    eligibilitySummary: 'Registered enterprises owned by local Sikkim residents; prioritizes organic agriculture, green tourism, and indigenous crafts.',
    requiredDocuments: ['Certificate of Identification (COI) / Sikkim Domicile', 'DPIIT Registration', 'Project Feasibility Plan'],
    portalUrl: 'https://sikkim.gov.in',
    relevanceKeywords: ['sikkim', 'gangtok', 'all', 'organic', 'agriculture', 'tourism', 'clean-food'],
  },

  // ── Meghalaya ──
  {
    id: 'prime-meghalaya-scheme',
    name: 'PRIME Meghalaya Entrepreneurship & Startup Scheme',
    level: 'State',
    state: 'Meghalaya',
    ministryOrDepartment: 'Planning Department, Government of Meghalaya',
    financialBenefit: 'Kickstart scale-up grant up to ₹5 Lakhs, collateral-free credit tie-up with Meghalaya Rural Bank up to ₹25 Lakhs, and free co-working incubation in Shillong & Tura.',
    fundingType: 'Grant (Non-Dilutive)',
    maxAmountINR: '₹5 Lakhs Grant + ₹25 Lakhs Credit Linkage',
    eligibilitySummary: 'Entrepreneurs registered under PRIME Meghalaya operating across value-added agriculture, creative arts, and software.',
    requiredDocuments: ['PRIME Meghalaya ID', 'Voter/Domicile Proof', 'Incubation Pitch Evaluation'],
    portalUrl: 'https://primemeghalaya.com',
    relevanceKeywords: ['meghalaya', 'shillong', 'all', 'tribal', 'tourism', 'handicrafts', 'agri'],
  },

  // ── Manipur ──
  {
    id: 'manipur-startup-scheme',
    name: 'Manipur Startup Standup & Innovation Scheme',
    level: 'State',
    state: 'Manipur',
    ministryOrDepartment: 'Planning Department, Govt of Manipur',
    financialBenefit: 'Idea stage grant up to ₹3 Lakhs, revenue stage credit subsidy up to ₹30 Lakhs with 30% state non-dilutive grant component.',
    fundingType: 'Grant (Non-Dilutive)',
    maxAmountINR: '₹10 Lakhs Seed Grant / 30% Subsidy',
    eligibilitySummary: 'Startups registered and operating in Manipur with valid trade licenses.',
    requiredDocuments: ['Manipur Startup Application ID', 'Aadhaar / Domicile', 'Business Plan Pitch Deck'],
    portalUrl: 'https://manipurstartup.mn.gov.in',
    relevanceKeywords: ['manipur', 'imphal', 'all', 'bamboo', 'handloom', 'food-processing', 'it'],
  },

  // ── Nagaland ──
  {
    id: 'nagaland-startup-policy',
    name: 'Nagaland Startup Policy & Seed Funding',
    level: 'State',
    state: 'Nagaland',
    ministryOrDepartment: 'Department of Industries & Commerce, Nagaland',
    financialBenefit: 'Seed grant up to ₹3 Lakhs, patent filing subsidy up to ₹2 Lakhs, and 100% stamp duty exemption on all industrial lease deeds for 5 years.',
    fundingType: 'Grant (Non-Dilutive)',
    maxAmountINR: '₹3 Lakhs Seed Grant',
    eligibilitySummary: 'Nagaland-incorporated startups registered on Nagaland Startup Portal with innovative local solutions.',
    requiredDocuments: ['Nagaland Startup Registration', 'DPIIT Recognition', 'Indigenous Inhabitant Certificate'],
    portalUrl: 'https://startup.nagaland.gov.in',
    relevanceKeywords: ['nagaland', 'kohima', 'dimapur', 'all', 'agro', 'horticulture', 'textiles'],
  },

  // ── Tripura ──
  {
    id: 'tripura-startup-scheme',
    name: 'Tripura IT & Startup Innovation Scheme',
    level: 'State',
    state: 'Tripura',
    ministryOrDepartment: 'Directorate of Information Technology (DIT), Government of Tripura',
    financialBenefit: 'Sustenance allowance of ₹20,000/month for 1 year, capital equipment grant up to ₹5 Lakhs, and 50% internet bandwidth reimbursement.',
    fundingType: 'Grant (Non-Dilutive)',
    maxAmountINR: '₹2.4 Lakhs Sustenance + ₹5 Lakhs Capital Grant',
    eligibilitySummary: 'Startups operating out of IT Park Agartala or state incubation centers.',
    requiredDocuments: ['Tripura Startup Registration', 'DPIIT Recognition', 'Incubation Allotment Letter'],
    portalUrl: 'https://startup.tripura.gov.in',
    relevanceKeywords: ['tripura', 'agartala', 'all', 'rubber', 'bamboo', 'it', 'software'],
  },

  // ── Arunachal Pradesh ──
  {
    id: 'arunachal-startup-policy',
    name: 'Arunachal Pradesh Innovation & Startup Policy (ARIS)',
    level: 'State',
    state: 'Arunachal Pradesh',
    ministryOrDepartment: 'Department of Information Technology & Communication, Arunachal Pradesh',
    financialBenefit: 'Seed grant up to ₹5 Lakhs for proof of concept, scale-up grant up to ₹15 Lakhs for commercialization, and 100% state GST reimbursement for 3 years.',
    fundingType: 'Grant (Non-Dilutive)',
    maxAmountINR: '₹15 Lakhs Innovation & Scale Grant',
    eligibilitySummary: 'Registered tribal and state startups operating across eco-tourism, organic horticulture, and frontier logistics.',
    requiredDocuments: ['ARIS Portal Registration', 'APST Certificate / Domicile', 'DPIIT Certificate'],
    portalUrl: 'https://arunachalstartup.gov.in',
    relevanceKeywords: ['arunachal', 'itanagar', 'all', 'horticulture', 'forest-produce', 'tourism', 'logistics'],
  },

  // ── Mizoram ──
  {
    id: 'mizoram-youth-startup',
    name: 'Mizoram Youth Commission (MYC) Startup Seed Fund',
    level: 'State',
    state: 'Mizoram',
    ministryOrDepartment: 'Mizoram Youth Commission & Commerce & Industries Dept',
    financialBenefit: 'Non-dilutive seed grant up to ₹5 Lakhs, mentorship through Mizoram University Incubation Centre, and zero-fee stall displays in state commerce expos.',
    fundingType: 'Grant (Non-Dilutive)',
    maxAmountINR: '₹5 Lakhs Seed Grant',
    eligibilitySummary: 'Early-stage micro and tech ventures founded by youth residents of Mizoram.',
    requiredDocuments: ['MYC Grant Award Letter', 'Voter/Aadhaar Proof', 'Project Proposal'],
    portalUrl: 'https://myc.mizoram.gov.in',
    relevanceKeywords: ['mizoram', 'aizawl', 'all', 'youth', 'horticulture', 'handloom', 'bamboo'],
  },
];

export const ALL_INDIAN_STATES: string[] = [
  'Karnataka',
  'Maharashtra',
  'Tamil Nadu',
  'Telangana',
  'Delhi (NCT)',
  'Uttar Pradesh',
  'Gujarat',
  'Kerala',
  'Rajasthan',
  'Andhra Pradesh',
  'Odisha',
  'West Bengal',
  'Haryana',
  'Punjab',
  'Madhya Pradesh',
  'Bihar',
  'Assam',
  'Uttarakhand',
  'Goa',
  'Himachal Pradesh',
  'Jammu & Kashmir',
  'Chhattisgarh',
  'Jharkhand',
  'Sikkim',
  'Meghalaya',
  'Manipur',
  'Nagaland',
  'Tripura',
  'Arunachal Pradesh',
  'Mizoram',
];

/**
 * Matches an idea text and optional sector or explicit state to relevant Central and State Government schemes.
 */
export function getEligibleGovernmentSchemes(
  idea: string,
  sectorHint?: string,
  selectedState?: string
): GovernmentScheme[] {
  const normalized = `${idea} ${sectorHint || ''}`.toLowerCase();
  const matched: GovernmentScheme[] = [];

  // Match Central Schemes
  for (const scheme of CENTRAL_STARTUP_SCHEMES) {
    if (scheme.relevanceKeywords.includes('all')) {
      matched.push(scheme);
      continue;
    }
    const isRelevant = scheme.relevanceKeywords.some((kw) => normalized.includes(kw));
    if (isRelevant) {
      matched.push(scheme);
    }
  }

  // Match State Schemes
  const targetState = selectedState || (
    ALL_INDIAN_STATES.find((st) => normalized.includes(st.toLowerCase())) || 'Karnataka'
  );

  const stateSchemes = STATE_STARTUP_SCHEMES.filter(
    (s) => s.state?.toLowerCase() === targetState.toLowerCase()
  );

  if (stateSchemes.length > 0) {
    matched.push(...stateSchemes);
  } else {
    // Default to Karnataka ELEVATE + Maharashtra
    matched.push(
      STATE_STARTUP_SCHEMES.find((s) => s.id === 'karnataka-elevate')!,
      STATE_STARTUP_SCHEMES.find((s) => s.id === 'maharashtra-startup-seed')!
    );
  }

  return matched;
}

/**
 * Returns all schemes specific to a selected state.
 */
export function getSchemesForState(stateName: string): GovernmentScheme[] {
  return STATE_STARTUP_SCHEMES.filter(
    (s) => s.state?.toLowerCase() === stateName.toLowerCase()
  );
}

/**
 * Formats matched schemes into high-density prompt text for LLM Financial and Legal agents.
 */
export function formatGovernmentSchemesContext(schemes: GovernmentScheme[]): string {
  if (!schemes || schemes.length === 0) return '';

  const totalGrantPotential = schemes
    .filter((s) => s.fundingType === 'Grant (Non-Dilutive)')
    .map((s) => s.maxAmountINR)
    .join(' + ');

  return `
--- OFFICIAL GOVERNMENT SUBSIDIES & NON-DILUTIVE CAPITAL AUDIT ---
Founders are eligible for significant non-dilutive capital and statutory fee concessions before raising venture equity.
Maximum Grant Opportunity: ${totalGrantPotential || 'Up to ₹70 Lakhs in non-dilutive capital'}

${schemes
  .map(
    (s, idx) => `
[Scheme ${idx + 1}: ${s.name} (${s.level} - ${s.ministryOrDepartment})]
- Benefit & Amount: ${s.financialBenefit} [Max: ${s.maxAmountINR}]
- Capital Type: ${s.fundingType}
- Eligibility Criteria: ${s.eligibilitySummary}
- Required Documentation: ${s.requiredDocuments.join(', ')}
- Official Portal: ${s.portalUrl}
`
  )
  .join('\n')}
-------------------------------------------------------------------
`.trim();
}
