/**
 * Startup Post-Mortems & Historical Failure Pattern Corpus.
 * Detailed financial and operational autopsies of 100+ failed or distressed Indian and global startups.
 * Used by the Adversarial Red-Team agent to perform precise historical failure mapping.
 */

export interface StartupAutopsy {
  id: string;
  startupName: string;
  sector: string;
  geography: string;
  peakFundingUSD: string;
  status: 'Defunct' | 'Distressed Acquisition' | 'Pivot After Near-Bankruptcy' | (string & {});
  peakValuationOrBurn: string;
  primaryFailureMode: string;
  fatalMetrics: {
    blendedCAC: string;
    averageOrderValue: string;
    contributionMargin: string;
    burnRate: string;
  };
  fatalStrategicFlaws: string[];
  founderAutopsyQuoteOrLesson: string;
  relevanceKeywords: string[];
}

export const STARTUP_POST_MORTEMS: StartupAutopsy[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // 1. HYPERLOCAL & QUICK COMMERCE (10 cases)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'dunzo-darkstore',
    startupName: 'Dunzo',
    sector: 'Hyperlocal Delivery & Quick Commerce',
    geography: 'India (Bengaluru, Mumbai, Pune, NCR)',
    peakFundingUSD: '$498M (Reliance Retail, Google, Lightbox)',
    status: 'Distressed Acquisition',
    peakValuationOrBurn: 'Valuation $775M; peak monthly burn of ₹45-50 Cr ($6M/mo)',
    primaryFailureMode: 'CapEx Dark Store Overexpansion & High Runner Attrition on Sub-Economic AOV',
    fatalMetrics: {
      blendedCAC: '₹350 - ₹500 per transacting user',
      averageOrderValue: '₹140 - ₹180 in early runner network; ₹280 in Dunzo Daily',
      contributionMargin: 'Negative ₹38 to ₹52 per delivery after picker/rider payouts',
      burnRate: '₹550 Cr annual loss against ₹226 Cr operating revenue (FY23)',
    },
    fatalStrategicFlaws: [
      'Transitioned from an asset-light concierge runner marketplace (profitable per city in early Bengaluru) into an asset-heavy 19-minute dark store model (Dunzo Daily) without dark store density.',
      'Average order basket was dominated by single milk packets and pan shop items (AOV < ₹200) where 15-20% gross take-rate (₹30-40) could never offset ₹65 rider delivery cost.',
      'Working capital lockup: credit lines to distributors froze when funding winter arrived, resulting in empty shelves and 40% immediate app churn.',
    ],
    founderAutopsyQuoteOrLesson:
      'Never pivot an asset-light marketplace into a fixed-cost asset-heavy infrastructure game unless AOV exceeds ₹500 and repeat order frequency can sustain rider density without subsidies.',
    relevanceKeywords: ['delivery', 'logistics', 'hyperlocal', 'quick-commerce', 'b2c', 'marketplace', 'runner', 'consumer'],
  },
  {
    id: 'grofers-90min',
    startupName: 'Grofers (Early 90-Min On-Demand Model)',
    sector: 'On-Demand Grocery Delivery',
    geography: 'India (17 Tier 1/2 Cities)',
    peakFundingUSD: '$500M+ (SoftBank, Tiger Global) before Blinkit pivot',
    status: 'Pivot After Near-Bankruptcy',
    peakValuationOrBurn: 'Peak burn $8M/month; shut down operations in 9 cities in 2016',
    primaryFailureMode: 'Merchant Inventory Mismatch & Perishable Shrinkage in Aggregator Model',
    fatalMetrics: {
      blendedCAC: '₹450 per user on ₹200 introductory voucher discount',
      averageOrderValue: '₹420',
      contributionMargin: '-₹75 per order',
      burnRate: '₹30 Cr/month burn across 17 cities',
    },
    fatalStrategicFlaws: [
      'Dispatched riders to local supermarket shelves without automated inventory integration; 22% of orders had missing SKUs causing customer cancellations.',
      'Offered free delivery on orders above ₹250 when actual picking and 90-min bike courier delivery cost Grofers ₹85.',
      'Customer acquisition was heavily discount-driven with 75% 60-day cohort churn.',
    ],
    founderAutopsyQuoteOrLesson:
      'Aggregating offline mom-and-pop grocery inventory without owning the backend supply chain is fundamentally unscalable because inventory error rates destroy delivery SLAs.',
    relevanceKeywords: ['grocery', 'retail', 'hyperlocal', 'delivery', 'kirana', 'inventory', 'consumer'],
  },
  {
    id: 'peppertap',
    startupName: 'PepperTap',
    sector: 'On-Demand Hyperlocal Grocery',
    geography: 'India (18 Cities)',
    peakFundingUSD: '$51M (Sequoia Capital, SAIF Partners, Snapdeal)',
    status: 'Defunct',
    peakValuationOrBurn: 'Peak burn $2M/month; shut down completely in April 2016',
    primaryFailureMode: 'Losing Money on Every Single Order due to Deep Discounting and Flat Margin Cap',
    fatalMetrics: {
      blendedCAC: '₹550 per user',
      averageOrderValue: '₹350',
      contributionMargin: '-₹110 per delivery',
      burnRate: 'Burned $35M in under 15 months',
    },
    fatalStrategicFlaws: [
      'Subsidized 20% discounts on groceries where partner retail margin was only 4-6%, losing 15% gross margin before rider delivery fees.',
      'Expanded into Tier-2 cities like Jaipur, Chandigarh, and Surat before proving unit economics in Gurgaon.',
      'Manual integration with mom-and-pop stores caused widespread order cancellations.',
    ],
    founderAutopsyQuoteOrLesson:
      'You cannot subsidize your way to scale in low-margin grocery. When you give ₹100 discounts on ₹300 baskets, customer loyalty is to the discount, not your company.',
    relevanceKeywords: ['grocery', 'peppertap', 'hyperlocal', 'delivery', 'discount', 'b2c'],
  },
  {
    id: 'localbanya',
    startupName: 'LocalBanya',
    sector: 'Online Supermarket & Fresh Grocery',
    geography: 'India (Mumbai, Pune, Hyderabad)',
    peakFundingUSD: '$5M (Shrem Capital, Karmvir Avant Group)',
    status: 'Defunct',
    peakValuationOrBurn: 'Shut down operations in 2015 after supplier credit freeze',
    primaryFailureMode: 'Working Capital Dry-Up & Perishable Fruit/Vegetable Spoilage',
    fatalMetrics: {
      blendedCAC: '₹600 per customer',
      averageOrderValue: '₹850',
      contributionMargin: '-₹45 per delivery',
      burnRate: '₹2.5 Cr/month burn with 18% perishable dump rate',
    },
    fatalStrategicFlaws: [
      'Maintained centralized warehouse refrigeration capex without reaching delivery route density.',
      'Suppliers placed delivery holds on orders when payment dues crossed 45 days, crashing fulfillment rates to <60%.',
    ],
    founderAutopsyQuoteOrLesson:
      'Perishable fresh grocery requires clockwork warehouse turnaround; holding inventory for even 36 hours in Indian ambient heat turns gross margin into 100% loss.',
    relevanceKeywords: ['grocery', 'fresh', 'perishable', 'cold-chain', 'warehouse', 'mumbai'],
  },
  {
    id: 'doodhwala',
    startupName: 'Doodhwala (Banger Tech)',
    sector: 'Daily Morning Milk & Micro-Delivery Subscription',
    geography: 'India (Bengaluru, Pune, Hyderabad)',
    peakFundingUSD: '$4.2M (Omnivore Partners)',
    status: 'Defunct',
    peakValuationOrBurn: 'Shut down in October 2019; assets transferred to FreshToHome',
    primaryFailureMode: 'Negative Gross Margins on Regulated Milk Prices with High Reverse Logistics Bottle Costs',
    fatalMetrics: {
      blendedCAC: '₹350 per subscriber',
      averageOrderValue: '₹65 per daily drop',
      contributionMargin: '-₹4.5 per doorstep drop',
      burnRate: '₹1.8 Cr/month burn on ₹8 Cr annual GMV',
    },
    fatalStrategicFlaws: [
      'Milk in India has statutory MRP with retail distributor margin capped at ₹1.50–₹2.00 per liter, while doorstep delivery cost ₹6.50 per drop.',
      'Assumed customers would add high-margin bread, eggs, and cheese to their daily milk basket; over 70% of households only ordered single ₹24 milk packets.',
    ],
    founderAutopsyQuoteOrLesson:
      'Milk subscription is an incredible retention hook, but an impossible business if users refuse to buy cross-merchandised high-margin breakfast items.',
    relevanceKeywords: ['milk', 'dairy', 'subscription', 'hyperlocal', 'morning', 'delivery', 'b2c'],
  },
  {
    id: 'townrush',
    startupName: 'Townrush',
    sector: 'B2B & B2C On-Demand White-Label Logistics',
    geography: 'India (Bengaluru)',
    peakFundingUSD: '$1.2M (Lightspeed Venture Partners angel)',
    status: 'Distressed Acquisition',
    peakValuationOrBurn: 'Acquired by Grofers in 2015 in an all-equity acqui-hire',
    primaryFailureMode: 'Severe Lunch/Dinner Rush Rider Idleness in Mid-Day Hours',
    fatalMetrics: {
      blendedCAC: '₹150 per merchant onboarding',
      averageOrderValue: '₹35 per delivery payout',
      contributionMargin: '-₹18 per delivery',
      burnRate: 'Burnt seed funding in under 9 months',
    },
    fatalStrategicFlaws: [
      'Guaranteed fixed hourly wages to bike riders (₹400/day) during 10 AM - 8 PM, but 80% of merchant deliveries occurred during 12-2 PM and 7-9 PM peak windows.',
      'Zero delivery volume during 2-6 PM mid-day slump caused rider payroll costs to consume 2.2x total revenue.',
    ],
    founderAutopsyQuoteOrLesson:
      'In on-demand delivery, utilization rate is everything. If riders sit idle for 4 hours between meal peaks on fixed pay, you run out of cash in months.',
    relevanceKeywords: ['logistics', 'delivery', 'b2b', 'fleet', 'riders', 'hyperlocal'],
  },
  {
    id: 'milkbasket-early',
    startupName: 'Milkbasket (Pre-Reliance Distress Sale)',
    sector: 'Daily Micro-Delivery Grocery Subscription',
    geography: 'India (NCR, Bengaluru, Hyderabad)',
    peakFundingUSD: '$38M (Unilever Ventures, Mayfield, Blume)',
    status: 'Distressed Acquisition',
    peakValuationOrBurn: 'Sold to Reliance Retail at steep valuation haircut in 2021',
    primaryFailureMode: 'CapEx Drain on Multi-City Dark Hubs & Inability to Close Series C in Funding Winter',
    fatalMetrics: {
      blendedCAC: '₹400 per subscriber',
      averageOrderValue: '₹190 per basket',
      contributionMargin: '+₹4 per delivery at peak density, but negative across new cities',
      burnRate: '₹12 Cr/month burn across expansion clusters',
    },
    fatalStrategicFlaws: [
      'Achieved operational profitability in Gurgaon clusters with 85 drops per apartment complex, but attempted rapid expansion into Bangalore and Hyderabad before reaching cluster density.',
      'Capital-intensive hub lease commitments created fixed cost traps when follow-on venture rounds stalled.',
    ],
    founderAutopsyQuoteOrLesson:
      'Hyperlocal cluster profitability does not travel automatically to new cities. Replicating density takes 18-24 months of localized grind per neighborhood.',
    relevanceKeywords: ['grocery', 'subscription', 'milkbasket', 'delivery', 'apartments', 'reliance'],
  },
  {
    id: 'roadrunnr',
    startupName: 'Roadrunnr (Carthero Technologies)',
    sector: 'B2B Hyperlocal Merchant Delivery Fleet',
    geography: 'India (11 Cities)',
    peakFundingUSD: '$21M (Sequoia Capital, Nexus Venture Partners)',
    status: 'Pivot After Near-Bankruptcy',
    peakValuationOrBurn: 'Merged with TinyOwl to form Runnr; acquired by Zomato for ~$40M',
    primaryFailureMode: 'Rider Strikes, Aggregator Fleet Poaching & Negative Gross Margins',
    fatalMetrics: {
      blendedCAC: '₹2,500 per rider onboarding',
      averageOrderValue: '₹45 per delivery fee charged to restaurants',
      contributionMargin: '-₹20 per delivery after ₹65 rider payouts',
      burnRate: '$2M/month burn at peak',
    },
    fatalStrategicFlaws: [
      'Subsidized rider incentives up to ₹15,000/week to lure drivers from Swiggy/Ola; riders struck work and rioted when incentive targets were tightened.',
      'Restaurants negotiated down per-order delivery fees to ₹35 while traffic congestion increased rider delivery duration to 48 minutes.',
    ],
    founderAutopsyQuoteOrLesson:
      'Supplying commoditized two-wheeler delivery capacity to aggregators who have pricing power over you guarantees zero operating margin.',
    relevanceKeywords: ['logistics', 'fleet', 'b2b', 'delivery', 'riders', 'zomato'],
  },
  {
    id: 'parcelled',
    startupName: 'Parcelled.in',
    sector: 'On-Demand Courier Pickup & Packaging Aggregator',
    geography: 'India (13 Cities)',
    peakFundingUSD: '$5M (Delhivery, Tracxn Labs)',
    status: 'Defunct',
    peakValuationOrBurn: 'Shut down operations in mid-2016',
    primaryFailureMode: 'High First-Mile Pickup Cost for Low-Margin C2C Peer Parcels',
    fatalMetrics: {
      blendedCAC: '₹300 per consumer',
      averageOrderValue: '₹140 parcel fee',
      contributionMargin: '-₹60 per pickup after free doorstep packaging and rider travel',
      burnRate: '₹1.5 Cr/month burn with zero repeat booking frequency',
    },
    fatalStrategicFlaws: [
      'Offered free doorstep bubble wrap packaging and pickup for individual consumer packages; first-mile pickup cost ₹90, while regional courier margin was only ₹30.',
      'C2C parcel shipping is an infrequent need (1-2 times per year per consumer), resulting in near-zero organic LTV.',
    ],
    founderAutopsyQuoteOrLesson:
      'Doorstep pickup of infrequent consumer packages is structurally unviable; first-mile labor and packaging costs swallow the entire margin.',
    relevanceKeywords: ['courier', 'parcel', 'logistics', 'c2c', 'delhivery', 'pickup'],
  },
  {
    id: 'ola-dash',
    startupName: 'Ola Dash / Ola Store (Bhavish Aggarwal)',
    sector: '10-Minute Quick Commerce',
    geography: 'India (9 Cities with 200 Dark Stores)',
    peakFundingUSD: 'Funded from Ola treasury ($100M+ allocated)',
    status: 'Defunct',
    peakValuationOrBurn: 'Shut down in June 2022 after burning estimated ₹300+ Cr in 8 months',
    primaryFailureMode: 'Reckless Dark Store Rollout Without Fresh Produce Supply Chain Backend',
    fatalMetrics: {
      blendedCAC: '₹400 via Ola cab app cross-promotions',
      averageOrderValue: '₹210',
      contributionMargin: '-₹65 per delivered basket',
      burnRate: 'Closed all 200 dark stores with huge lease cancellation penalties',
    },
    fatalStrategicFlaws: [
      'Opened 200 dark stores in 8 months by renting expensive commercial street-front properties with zero neighborhood order density.',
      'Stocked mostly packaged snacks and soda without fresh fruits, vegetables, or dairy, which constitute 65% of daily household quick commerce baskets.',
    ],
    founderAutopsyQuoteOrLesson:
      'Distribution on an existing app does not compensate for weak supply chains. Quick commerce is an inventory and warehouse replenishment science, not an app banner contest.',
    relevanceKeywords: ['quick-commerce', 'ola', 'dark-store', '10-minute', 'delivery', 'grocery'],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. FOODTECH & CLOUD KITCHENS (8 cases)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'tinyowl',
    startupName: 'TinyOwl',
    sector: 'On-Demand Food Ordering & Delivery',
    geography: 'India (Mumbai, Pune, Bengaluru, Delhi NCR)',
    peakFundingUSD: '$28M (Sequoia Capital, Nexus Venture Partners, Matrix)',
    status: 'Defunct',
    peakValuationOrBurn: 'Peak burn $3M/month; shut down after hostage incident with laid-off staff in Pune',
    primaryFailureMode: 'Deep Discount-Fueled Customer Acquisition with Zero Organic Retention Moat',
    fatalMetrics: {
      blendedCAC: '₹400 via ₹150 first-order cashback coupons',
      averageOrderValue: '₹220',
      contributionMargin: '-₹60 per delivered order',
      burnRate: 'Burnt 85% of treasury within 14 months of Series B',
    },
    fatalStrategicFlaws: [
      'Subsidized 40-50% of meal cost to buy market share from Swiggy/Zomato; users churned the instant the voucher discount expired.',
      'Manual order confirmation dispatch center with 18% restaurant cancellation rates and 45-minute average fulfillment delays.',
      'Expanded across 6 metro cities simultaneously before reaching unit-economic positive density in any single neighborhood.',
    ],
    founderAutopsyQuoteOrLesson:
      'Cashback and discounts do not validate Product-Market Fit. If repeat cohorts do not re-order at full un-discounted price, you do not have a business—you have a subsidized donation pool.',
    relevanceKeywords: ['food', 'b2c', 'restaurant', 'delivery', 'aggregator', 'discount', 'marketplace'],
  },
  {
    id: 'yumist',
    startupName: 'Yumist',
    sector: 'Daily Home-Style Food & Cloud Kitchen',
    geography: 'India (Gurgaon, South Delhi, Bengaluru)',
    peakFundingUSD: '$3M (Orios Venture Partners)',
    status: 'Defunct',
    peakValuationOrBurn: 'Shut down in September 2017',
    primaryFailureMode: 'High Food Production CapEx & 25-Minute Hot Food Delivery Guarantee',
    fatalMetrics: {
      blendedCAC: '₹350 per customer',
      averageOrderValue: '₹110 (Single lunch thali)',
      contributionMargin: '-₹28 per meal',
      burnRate: '₹80 Lakhs/month burn on central kitchen capex',
    },
    fatalStrategicFlaws: [
      'Built massive automated steam-cooking centralized base kitchen with high fixed depreciation overhead, requiring 15,000 meals/day to break even while operating at 3,200 meals.',
      'Promised 25-minute delivery for fresh hot meals; riders carried warmers on bikes with high rejection rates during lunch traffic jams.',
      'Daily lunch thali priced at ₹99 left less than ₹15 gross margin, completely wiped out by ₹45 rider delivery cost.',
    ],
    founderAutopsyQuoteOrLesson:
      'From Day 1, your unit economics must work at small scale. Hoping that massive scale will somehow cover negative contribution margins is a death wish in Indian food tech.',
    relevanceKeywords: ['food', 'cloud-kitchen', 'thali', 'tiffin', 'meals', 'lunch', 'home-cooked'],
  },
  {
    id: 'spoonjoy',
    startupName: 'SpoonJoy',
    sector: 'Subscription-Based Office Lunch & Healthy Meals',
    geography: 'India (Bengaluru)',
    peakFundingUSD: '$1M (SAIF Partners, Sachin Bansal, Sahil Barua)',
    status: 'Distressed Acquisition',
    peakValuationOrBurn: 'Acquired by Grofers in 2015 after cash exhaustion',
    primaryFailureMode: 'Low Ticket Size Subscription with High Rider Idle Time Between Lunch Peaks',
    fatalMetrics: {
      blendedCAC: '₹280 per subscriber',
      averageOrderValue: '₹90 per meal box',
      contributionMargin: '-₹22 per order',
      burnRate: 'Burned out cash float within 10 months',
    },
    fatalStrategicFlaws: [
      'Priced healthy cut fruit bowls and sprout salads at ₹70-90, attracting price-sensitive tech park interns with near-zero customer lifetime value.',
      'Fulfillment took place in a single 12:30 PM - 1:30 PM crunch hour, requiring massive rider fleets that sat unutilized for the rest of the day.',
    ],
    founderAutopsyQuoteOrLesson:
      'Office lunch delivery is fundamentally broken if your average order value is below ₹200. You cannot deliver a ₹90 meal with a ₹50 rider cost and survive.',
    relevanceKeywords: ['food', 'lunch', 'office', 'tiffin', 'salad', 'subscription', 'healthy'],
  },
  {
    id: 'innerchef',
    startupName: 'InnerChef',
    sector: 'Cloud Kitchen & Ready-to-Eat Gourmet Food',
    geography: 'India (Delhi NCR, Bengaluru, Mumbai)',
    peakFundingUSD: '$12M (Mistletoe, Brand Capital, angel investors)',
    status: 'Distressed Acquisition',
    peakValuationOrBurn: 'Sold to BigBasket / Tata at steep discount in 2022',
    primaryFailureMode: 'High Cold Kitchen CapEx, Aggressive Multi-Brand Confusion & Swiggy 30% Commissions',
    fatalMetrics: {
      blendedCAC: '₹650 per user on third-party aggregators',
      averageOrderValue: '₹320',
      contributionMargin: '-4% after paying 28-32% commission to Swiggy/Zomato',
      burnRate: '₹2 Cr/month burn across 25 cloud kitchens',
    },
    fatalStrategicFlaws: [
      'Relied almost entirely on Swiggy and Zomato for customer discovery; aggregator commission hikes from 18% to 30% wiped out all operating profit.',
      'Launched 6 distinct culinary brands (desserts, sandwiches, Asian) out of each kitchen, causing ingredient waste and 14% inventory write-offs.',
    ],
    founderAutopsyQuoteOrLesson:
      'If you build a cloud kitchen brand dependent on food aggregator discovery algorithms, you are an indentured tenant farmer on someone else’s land.',
    relevanceKeywords: ['food', 'cloud-kitchen', 'brands', 'swiggy', 'zomato', 'restaurant'],
  },
  {
    id: 'holachef',
    startupName: 'Holachef',
    sector: 'Curated Home Chef Food Marketplace',
    geography: 'India (Mumbai, Pune)',
    peakFundingUSD: '$13.5M (Kalaari Capital, SIDBI)',
    status: 'Distressed Acquisition',
    peakValuationOrBurn: 'Sold to Foodpanda (Ola) for pennies in 2018',
    primaryFailureMode: 'Quality Inconsistency Across Home Chefs & Transit Packaging Spillage',
    fatalMetrics: {
      blendedCAC: '₹500 per customer',
      averageOrderValue: '₹280',
      contributionMargin: '-₹48 per meal',
      burnRate: '₹3 Cr/month burn on chef pickup corridors',
    },
    fatalStrategicFlaws: [
      'Attempted to aggregate independent home chefs who cooked in domestic kitchens without standard recipe scales, resulting in wildly erratic salt, spice, and portion sizes.',
      'Required a dedicated courier runner to visit each home cook’s apartment to pick up 2-3 meals, driving first-mile logistics cost to ₹110 per order.',
      'Customer return rate exceeded 16% due to curry spillage in standard plastic containers.',
    ],
    founderAutopsyQuoteOrLesson:
      'Home chef aggregation sounds romantic on pitch slides, but decentralized home kitchen pickups kill logistics economics, and non-commercial kitchens fail hygiene audits.',
    relevanceKeywords: ['food', 'home-chef', 'cooks', 'tiffin', 'marketplace', 'homestyle', 'curated'],
  },
  {
    id: 'eatlo',
    startupName: 'Eatlo',
    sector: 'On-Demand Lunch Ordering Platform',
    geography: 'India (Bengaluru)',
    peakFundingUSD: '$1M (Powai Lake Ventures)',
    status: 'Defunct',
    peakValuationOrBurn: 'Shut down in December 2015 within 14 months of founding',
    primaryFailureMode: 'No Sourcing Moat & Severe Lunch Hour Delivery Bottlenecks',
    fatalMetrics: {
      blendedCAC: '₹220 per user',
      averageOrderValue: '₹120',
      contributionMargin: '-₹35 per delivery',
      burnRate: '₹35 Lakhs/month burn on zero working capital reserves',
    },
    fatalStrategicFlaws: [
      'Sourced food from local commercial caterers who routinely delayed pickups by 30 minutes, leading to cold lunches and office worker fury.',
      'Operated on negative gross margins hoping scale would renegotiate bulk chef costs.',
    ],
    founderAutopsyQuoteOrLesson:
      'If you do not control the kitchen timing and food temperature, you will take 100% of the customer blame while having zero control over the product.',
    relevanceKeywords: ['food', 'lunch', 'tiffin', 'delivery', 'caterer', 'b2c'],
  },
  {
    id: 'foodpanda-india',
    startupName: 'Foodpanda India (Pre-Ola Acquisition)',
    sector: 'Food Aggregation & Restaurant Marketplace',
    geography: 'India (Pan-India)',
    peakFundingUSD: '$300M+ (Rocket Internet)',
    status: 'Distressed Acquisition',
    peakValuationOrBurn: 'Sold to Ola in 2017 for ~$40M after massive operational fraud scandals',
    primaryFailureMode: 'Ghost Restaurant Listings, Voucher Coupon Abuse & Zero QC',
    fatalMetrics: {
      blendedCAC: '₹450 via ₹200 free food voucher blitz',
      averageOrderValue: '₹240',
      contributionMargin: '-₹80 per order',
      burnRate: 'Burnt $150M+ in 2 years with 40% fake coupon claims',
    },
    fatalStrategicFlaws: [
      'Sales reps onboarded hundreds of fake "ghost kitchens" to meet quarterly listing targets; merchants colluded with customers to claim voucher cashback loops.',
      'Aggregator software suffered frequent server crashes during dinner peaks with no live driver GPS tracking.',
    ],
    founderAutopsyQuoteOrLesson:
      'Voucher campaigns without robust fraud detection and phone-device fingerprinting turn your growth budget into a criminal syndicate feeding trough.',
    relevanceKeywords: ['food', 'marketplace', 'restaurant', 'coupons', 'fraud', 'rocket-internet'],
  },
  {
    id: 'frshly',
    startupName: 'Frshly',
    sector: 'Automated Food Vending Machines in Transit Hubs',
    geography: 'India (Airports, Railway Stations, Tech Parks)',
    peakFundingUSD: '$5M (Refex Group)',
    status: 'Defunct',
    peakValuationOrBurn: 'Shut down operations in 2020 post-pandemic travel collapse',
    primaryFailureMode: 'High Hardware Maintenance Overhead & Exorbitant Airport Concession Fees',
    fatalMetrics: {
      blendedCAC: 'High fixed airport/railway tender lease fees (₹3-8 Lakhs/month per kiosk)',
      averageOrderValue: '₹160 per robotic meal',
      contributionMargin: '-15% due to 35% unsold meal discard rate at end of day',
      burnRate: '₹80 Lakhs monthly cash burn',
    },
    fatalStrategicFlaws: [
      'Robotic dispensers suffered frequent heating element and dispenser arm jams in dusty railway environments.',
      'Unsold fresh meals had a 6-hour shelf-life; low evening footfall resulted in discarding 30% of daily stocked food.',
    ],
    founderAutopsyQuoteOrLesson:
      'Robotic food hardware requires high fixed rent locations to get footfall, but high airport concession fees and unsold perishability eat all your unit margins.',
    relevanceKeywords: ['food', 'hardware', 'vending', 'transit', 'automation', 'airports', 'railways'],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. EDTECH & SKILLING (8 cases)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'frontrow',
    startupName: 'FrontRow',
    sector: 'Hobbies & Passion-Economy EdTech',
    geography: 'India',
    peakFundingUSD: '$18M (Elevation Capital, Lightspeed, 8i Ventures)',
    status: 'Defunct',
    peakValuationOrBurn: 'Valuation $50M; returned remaining capital after $15M burn',
    primaryFailureMode: 'High Performance-Marketing CAC for Non-Accredited Discretionary Learning',
    fatalMetrics: {
      blendedCAC: '₹3,200 via Facebook/Instagram ad funnels',
      averageOrderValue: '₹1,999 one-time course fee',
      contributionMargin: 'Negative ₹1,200 per customer at acquisition',
      burnRate: '₹6-8 Cr monthly burn with <5% course completion rates',
    },
    fatalStrategicFlaws: [
      'Consumers treated celebrity hobby courses (comedy, cricket, singing) as low-urgency entertainment rather than career-advancing credentials (unlike coding or UPSC).',
      'Absence of subscription retention: 94% of users completed fewer than 2 lessons; organic word-of-mouth referral was negligible, requiring continuous ad spending.',
      'Unit economics were negative on first purchase with zero downstream lifetime value (LTV:CAC ratio was 0.6x).',
    ],
    founderAutopsyQuoteOrLesson:
      'If your product sells "nice-to-have" leisure rather than "must-have" income growth or statutory compliance, your CAC will invariably skyrocket past your customer lifetime value.',
    relevanceKeywords: ['edtech', 'consumer', 'education', 'courses', 'b2c', 'subscription', 'content'],
  },
  {
    id: 'lido-learning',
    startupName: 'Lido Learning',
    sector: 'Live Online Tuition (K-12 STEM & English)',
    geography: 'India',
    peakFundingUSD: '$24M (BAce Capital, Ronnie Screwvala)',
    status: 'Defunct',
    peakValuationOrBurn: 'Filed for insolvency in NCLT in 2022 after salary defaults',
    primaryFailureMode: 'High Teacher Payouts, Aggressive Sales Team Attrition & 10-Month EMI Defaults',
    fatalMetrics: {
      blendedCAC: '₹18,000 per closed student enrollment',
      averageOrderValue: '₹40,000 annual subscription',
      contributionMargin: '-₹6,000 after 1:4 live teacher payroll and 15% NBFC loan processing fees',
      burnRate: '₹15 Cr/month burn with 35% student course refund requests',
    },
    fatalStrategicFlaws: [
      'Relied on third-party NBFC loans to finance annual parent subscriptions; when parents saw student disinterest, they canceled direct debits, forcing Lido to refund NBFCs.',
      '1:4 live teacher-to-student ratio had zero operating leverage; as student numbers grew, teacher payroll grew linearly.',
    ],
    founderAutopsyQuoteOrLesson:
      'Live 1:4 small-group tutoring does not scale like software. It is a high-touch services business where teacher attrition and customer acquisition costs consume all upfront gross revenue.',
    relevanceKeywords: ['edtech', 'tuition', 'live', 'k12', 'teachers', 'nbfc', 'education'],
  },
  {
    id: 'udayy',
    startupName: 'Udayy',
    sector: 'Early Childhood Live Math & English Learning',
    geography: 'India',
    peakFundingUSD: '$13M (Falcon Edge, Info Edge, Lightspeed India)',
    status: 'Defunct',
    peakValuationOrBurn: 'Shut down operations in June 2022; returned $8.5M unspent cash to investors',
    primaryFailureMode: 'Post-Pandemic School Reopening & Digital Fatigue in 4-10 Age Group',
    fatalMetrics: {
      blendedCAC: 'Surged from ₹3,000 in 2020 to ₹12,000+ in early 2022',
      averageOrderValue: '₹15,000 for 3-month course',
      contributionMargin: 'Turned negative as trial-to-paid conversion collapsed from 18% to 3.5%',
      burnRate: 'Founders prudently returned remaining capital instead of burning in an unviable post-COVID market',
    },
    fatalStrategicFlaws: [
      'Product market fit was an artifact of COVID school lockdowns; the moment offline schools reopened, parents refused to force 6-year-olds in front of laptop screens.',
      'Digital ad bidding wars against Byju’s and WhiteHat Jr drove Google/Meta acquisition costs to astronomical heights.',
    ],
    founderAutopsyQuoteOrLesson:
      'Recognizing when your tailwind was an artificial temporary macro event (like pandemic lockdowns) rather than structural consumer shift saves millions of dollars of founder and investor capital.',
    relevanceKeywords: ['edtech', 'children', 'k12', 'covid', 'screen-fatigue', 'education', 'math'],
  },
  {
    id: 'superlearn',
    startupName: 'SuperLearn',
    sector: 'Freemium Co-Curricular Webinars for Kids',
    geography: 'India',
    peakFundingUSD: '$1.1M (Incubate Fund India, Titan Capital)',
    status: 'Defunct',
    peakValuationOrBurn: 'Shut down operations in 2022',
    primaryFailureMode: 'Free-to-Paid Conversion Wall (<1.2%) for Non-Academic Life Skills',
    fatalMetrics: {
      blendedCAC: '₹40 per webinar registrant',
      averageOrderValue: '₹499 monthly subscription',
      contributionMargin: '-70% due to near-zero subscription renewals',
      burnRate: 'Burnt seed runway within 16 months',
    },
    fatalStrategicFlaws: [
      'Over 200,000 parents enrolled kids for free origami, chess, and coding webinars, but fewer than 1.2% were willing to pay ₹499/month for access.',
      'Indian middle-class parents prioritize competitive exam prep (JEE, NEET, Olympiads) over non-academic leisure skills when budgets tighten.',
    ],
    founderAutopsyQuoteOrLesson:
      'High free user engagement in India is vanity metric quicksand. If your offering does not impact a school grade or career outcome, parents will never pay.',
    relevanceKeywords: ['edtech', 'freemium', 'kids', 'co-curricular', 'webinar', 'b2c'],
  },
  {
    id: 'crejo-fun',
    startupName: 'Crejo.Fun',
    sector: 'Extracurricular Arts & Yoga for Children',
    geography: 'India',
    peakFundingUSD: '$3M (Matrix Partners India, 021 Capital)',
    status: 'Defunct',
    peakValuationOrBurn: 'Shut down operations in 2022 after 2 years',
    primaryFailureMode: 'High Live Teacher Overhead & Extreme Churn After 1 Month',
    fatalMetrics: {
      blendedCAC: '₹4,500 via Meta ad lead funnels',
      averageOrderValue: '₹3,000',
      contributionMargin: '-₹2,200 at customer acquisition',
      burnRate: '₹1.5 Cr/month burn with 85% 30-day drop-off',
    },
    fatalStrategicFlaws: [
      'Parents treat extracurricular dance, art, and yoga as seasonal summer camp activities, resulting in zero recurring subscription lifetime value in September-February.',
      'High live instructor payroll with zero economies of scale.',
    ],
    founderAutopsyQuoteOrLesson:
      'Seasonal discretionary spending cannot support a full-time salaried edtech workforce.',
    relevanceKeywords: ['edtech', 'extracurricular', 'kids', 'arts', 'summer', 'b2c'],
  },
  {
    id: 'camp-k12',
    startupName: 'Camp K12',
    sector: 'Global Coding & Metaverse School for Kids',
    geography: 'India, US, Middle East',
    peakFundingUSD: '$12M (Matrix Partners India, Elevation Capital)',
    status: 'Defunct',
    peakValuationOrBurn: 'Laid off all staff and shut operations in 2023',
    primaryFailureMode: 'WhiteHat Jr Negative Reputation Spillover & Steep US Digital CAC',
    fatalMetrics: {
      blendedCAC: '$450 in US market; ₹8,000 in India',
      averageOrderValue: '$600 (US) / ₹25,000 (India)',
      contributionMargin: 'Negative after live 1:1 teacher payouts and sales commissions',
      burnRate: '₹4-5 Cr monthly burn',
    },
    fatalStrategicFlaws: [
      'The consumer backlash against toxic sales tactics in K-12 coding in India poisoned the entire category, dropping parent inquiry volume by 70%.',
      'Attempted to pivot to US consumers where Meta ad CAC exploded past $500 per closed booking.',
    ],
    founderAutopsyQuoteOrLesson:
      'When an aggressive competitor poisons public trust in your product category, even ethical players get wiped out by the industry-wide demand freeze.',
    relevanceKeywords: ['edtech', 'coding', 'metaverse', 'kids', 'global', '1-on-1'],
  },
  {
    id: 'qin1',
    startupName: 'Qin1 (DhyanHealth Edtech)',
    sector: 'Spoken English & Math for Pre-Primary Kids',
    geography: 'India (Tier 2/3 Cities)',
    peakFundingUSD: '$1.5M (Venture Catalysts, AngelList)',
    status: 'Defunct',
    peakValuationOrBurn: 'Shut down in late 2022 after running out of cash',
    primaryFailureMode: 'Low Willingness to Pay in Tier 2/3 and High Tele-Calling Sales Attrition',
    fatalMetrics: {
      blendedCAC: '₹3,800 per enrollment via tele-sales reps',
      averageOrderValue: '₹4,500 course fee',
      contributionMargin: '-₹800 after sales incentives and teacher costs',
      burnRate: '₹50 Lakhs/month burn',
    },
    fatalStrategicFlaws: [
      'Tier 2 and 3 parents were intrigued by free trials but refused to pay ₹5,000+ upfront, demanding monthly ₹500 installments with high collection drop-offs.',
      'Tele-sales conversion teams had 40% monthly staff attrition, destroying lead follow-up efficiency.',
    ],
    founderAutopsyQuoteOrLesson:
      'Selling discretionary edtech via tele-calling in Tier-2 India is an uphill battle where customer collection friction destroys the spreadsheet math.',
    relevanceKeywords: ['edtech', 'tier-2', 'spoken-english', 'telesales', 'kids', 'b2c'],
  },
  {
    id: 'byjus-alpha',
    startupName: "Byju's (Think & Learn)",
    sector: 'K-12 & Test Prep Megacorp',
    geography: 'India, US, Middle East',
    peakFundingUSD: '$5.8B+ (General Atlantic, Silver Lake, Chan Zuckerberg, Sofina)',
    status: 'Distressed Acquisition',
    peakValuationOrBurn: 'Valuation crashed from $22B peak to zero in insolvency proceedings (2024)',
    primaryFailureMode: 'Aggressive Debt-Financed M&A (Term Loan B), Misgovernance & Predatory Offline Sales',
    fatalMetrics: {
      blendedCAC: '₹28,000+ per student including massive offline sales rep commissions & celebrity sponsorships',
      averageOrderValue: '₹60,000 - ₹120,000 multi-year tablet bundles',
      contributionMargin: 'Severely negative when loan processing defaults, refunds, and corporate debt interest were accounted',
      burnRate: 'Annual loss exceeded ₹8,000 Cr ($1B) in FY22',
    },
    fatalStrategicFlaws: [
      'Raised $1.2B Term Loan B at high interest to buy disparate legacy offline assets (Aakash, Great Learning, Epic) right before global interest rates spiked.',
      'Predatory hard-selling of tablet courses via aggressive tele-sales resulted in massive consumer forum complaints, regulatory scrutiny, and loan defaults.',
      'Delayed statutory financial audits by over 18 months, causing auditor resignations and investor legal litigation.',
    ],
    founderAutopsyQuoteOrLesson:
      'Financial leverage and debt-fueled acquisitions destroy tech companies when core organic product retention is hollowed out by predatory sales culture.',
    relevanceKeywords: ['edtech', 'byjus', 'debt', 'governance', 'insolvency', 'sales', 'tablets'],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 4. SOCIAL COMMERCE, D2C & CONTENT (8 cases)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'trell',
    startupName: 'Trell & Shop101',
    sector: 'Social Commerce & Video-Led Shopping',
    geography: 'India (Tier 2 and Tier 3 towns)',
    peakFundingUSD: '$62M (Mirae Asset, KIP, Sequoia India, Fosun)',
    status: 'Defunct',
    peakValuationOrBurn: 'Valuation $120M; operations frozen following compliance audit',
    primaryFailureMode: 'Cash-on-Delivery (COD) Return-to-Origin (RTO) Spiral & Creator Commission Leakage',
    fatalMetrics: {
      blendedCAC: '₹220 per install, but ₹1,100 per paid transacting user',
      averageOrderValue: '₹380 in Tier 2/3 lifestyle/beauty',
      contributionMargin: 'Negative ₹95 due to 38% Return-to-Origin (RTO) courier penalties',
      burnRate: '$2.5M/month burn with 40% fake order surge during coupon events',
    },
    fatalStrategicFlaws: [
      'High COD order share (>80%): customers ordered impulsively from video reels, but 35-40% refused delivery at the doorstep, leaving Trell with double courier reverse logistics fees (₹140 per return).',
      'Influencer creators demanded upfront cash retainers rather than performance-linked revenue shares.',
      'Aggressive vanity metric reporting over actual delivered net GMV.',
    ],
    founderAutopsyQuoteOrLesson:
      'In Indian e-commerce, gross GMV is a vanity illusion. Net delivered prepaid GMV after doorstep rejections is the only number that pays the payroll.',
    relevanceKeywords: ['creator', 'video', 'social-commerce', 'e-commerce', 'tier-2', 'influencer', 'd2c', 'cod'],
  },
  {
    id: 'bulbul-app',
    startupName: 'Bulbul.tv',
    sector: 'Live Video Social Commerce',
    geography: 'India (Tier 2/3/4 Regional Languages)',
    peakFundingUSD: '$15M (Sequoia Capital India, Info Edge, Leo Capital)',
    status: 'Distressed Acquisition',
    peakValuationOrBurn: 'Acquired by Good Glamm Group in distress deal in 2022',
    primaryFailureMode: 'Low Cart Conversion on Live Streams & High Streaming Bandwidth Bills',
    fatalMetrics: {
      blendedCAC: '₹450 per purchaser',
      averageOrderValue: '₹310',
      contributionMargin: '-₹65 per completed sale',
      burnRate: '₹3 Cr/month burn with 45% RTO rates',
    },
    fatalStrategicFlaws: [
      'Copied Chinese live-stream commerce (Taobao Live) without realizing Indian Tier-2 users treated video streams as free entertainment with <1% checkout conversion.',
      'Live interactive video streaming infrastructure (WebRTC/HLS) created massive AWS/Twilio server bills while user basket sizes remained sub-₹300.',
    ],
    founderAutopsyQuoteOrLesson:
      'China social commerce models do not map directly to India because Indian Tier-2 consumers have far lower disposable income and near-zero impulse card checkouts.',
    relevanceKeywords: ['social-commerce', 'video', 'live-streaming', 'tier-2', 'regional', 'vernacular', 'd2c'],
  },
  {
    id: 'koo',
    startupName: 'Koo (Bombinate Technologies)',
    sector: 'Vernacular Microblogging & Social Media',
    geography: 'India, Nigeria, Brazil',
    peakFundingUSD: '$60M+ (Tiger Global, Accel, 3one4 Capital, Blume Ventures)',
    status: 'Defunct',
    peakValuationOrBurn: 'Valuation $275M; shut down in July 2024 after failing to secure acquisition',
    primaryFailureMode: 'Hyper-Growth on Subsidized Vernacular Acquisition with Zero Ad ARPU Monetization',
    fatalMetrics: {
      blendedCAC: '₹40 - ₹70 per app install via patriotic/vernacular ad blitz',
      averageOrderValue: '₹0 (Free ad-supported platform)',
      contributionMargin: 'Negative; AWS server bills ran into hundreds of thousands of dollars per month',
      burnRate: 'Burnt through $60M within 4 years with < $100k annual revenue',
    },
    fatalStrategicFlaws: [
      'Digital ad buyers in India pay 80% lower CPMs for Indian vernacular language content (Hindi, Kannada, Tamil) compared to English-speaking Tier 1 users.',
      'Massive server hosting and content moderation costs scaled linearly with active user count, while average revenue per user (ARPU) stayed at under ₹2/year.',
      'When Twitter/X political controversies cooled down, daily active engagement plummeted by over 70%.',
    ],
    founderAutopsyQuoteOrLesson:
      'Consumer social platforms in emerging markets face an existential ARPU paradox: user growth in vernacular cohorts is cheap to acquire, but digital advertisers pay near-zero CPMs to reach them.',
    relevanceKeywords: ['social', 'media', 'vernacular', 'consumer', 'free', 'ad-supported', 'b2c', 'app'],
  },
  {
    id: 'voonik',
    startupName: 'Voonik',
    sector: 'Affordable Fashion Marketplace for Tier-2 Women',
    geography: 'India',
    peakFundingUSD: '$35M (Sequoia Capital, Beenos, RB Investments)',
    status: 'Defunct',
    peakValuationOrBurn: 'Merged with Bangladesh startup ShopUp in 2020 after equity wipeout',
    primaryFailureMode: 'Unbranded Fast-Fashion Quality Complaints & Crushing Myntra/Ajio Discounts',
    fatalMetrics: {
      blendedCAC: '₹380 per user',
      averageOrderValue: '₹450',
      contributionMargin: '-₹85 after reverse logistics on 42% product return rate',
      burnRate: '₹8 Cr/month burn at peak',
    },
    fatalStrategicFlaws: [
      'Sourced unbranded clothes from Surat and Tirupur; customer product dissatisfaction caused return rates above 40%, where shipping clothes back cost more than the garment value.',
      'Flipkart, Myntra, and Reliance Ajio launched deep discounted private labels, suffocating Voonik’s unbranded seller margins.',
    ],
    founderAutopsyQuoteOrLesson:
      'Selling unbranded apparel online in India is a return-to-origin death trap. When a ₹400 dress is returned, double courier fees eat your entire operating margin.',
    relevanceKeywords: ['fashion', 'marketplace', 'apparel', 'returns', 'rto', 'e-commerce', 'tier-2'],
  },
  {
    id: 'koovs',
    startupName: 'Koovs',
    sector: 'Western Fast-Fashion E-Commerce',
    geography: 'India & UK',
    peakFundingUSD: '$120M+ (Listed on London AIM stock exchange)',
    status: 'Defunct',
    peakValuationOrBurn: 'Entered administration in London in 2019; assets liquidated',
    primaryFailureMode: 'High Inventory Holding Risk & Inditex/Zara Brand Dominance',
    fatalMetrics: {
      blendedCAC: '₹1,200 via London runway marketing campaigns',
      averageOrderValue: '₹1,400',
      contributionMargin: '-12% after discounting obsolete seasonal fashion inventory',
      burnRate: '£15M annual burn',
    },
    fatalStrategicFlaws: [
      'Purchased private inventory upfront from UK designers with 6-month lead times; unsold summer collections had to be liquidated at 70% discounts.',
      'Zara, H&M, and Myntra expanded physical and omnichannel distribution across Indian metros, crushing Koovs’ standalone niche.',
    ],
    founderAutopsyQuoteOrLesson:
      'Fast-fashion inventory holding is an unforgiving balance sheet killer. If your inventory turnover is slower than seasonal fashion cycles, write-downs wipe out equity.',
    relevanceKeywords: ['fashion', 'ecommerce', 'retail', 'inventory', 'apparel', 'd2c'],
  },
  {
    id: 'yepme',
    startupName: 'Yepme',
    sector: 'Private Label Online Apparel',
    geography: 'India',
    peakFundingUSD: '$88M (Khazanah Nasional, Helion Venture Partners)',
    status: 'Defunct',
    peakValuationOrBurn: 'Shut down operations in 2017 amid vendor lawsuits',
    primaryFailureMode: 'Excessive Celebrity Brand Spending with Zero Supply Chain Advantage',
    fatalMetrics: {
      blendedCAC: '₹900 via TV ads featuring Shah Rukh Khan',
      averageOrderValue: '₹600',
      contributionMargin: '-30% net margin',
      burnRate: 'Burnt entire $88M treasury without establishing profitable unit economics',
    },
    fatalStrategicFlaws: [
      'Spent millions of dollars on prime-time television advertising and Bollywood brand ambassadors while garment fabric quality received widespread poor reviews.',
      'Demonetization in November 2016 froze COD liquidity (85% of Yepme sales), causing total working capital paralysis.',
    ],
    founderAutopsyQuoteOrLesson:
      'Celebrity endorsements cannot fix fundamental product quality deficits. If the fabric feels cheap at doorstep delivery, no movie star will convince the customer to re-order.',
    relevanceKeywords: ['fashion', 'apparel', 'd2c', 'brand', 'celebrity', 'advertising', 'cod'],
  },
  {
    id: 'craftsvilla',
    startupName: 'Craftsvilla',
    sector: 'Ethnic Wear & Handcrafted Artisan Marketplace',
    geography: 'India',
    peakFundingUSD: '$54M (Sequoia Capital, Nexus Venture Partners, Lightspeed)',
    status: 'Defunct',
    peakValuationOrBurn: 'Valuation $200M peak; quietly wound down in 2021',
    primaryFailureMode: 'Artisan Fulfillment Delays & High Lead-Time Return Rates',
    fatalMetrics: {
      blendedCAC: '₹650 per user',
      averageOrderValue: '₹950',
      contributionMargin: '-₹80 after 28% order return rates',
      burnRate: '₹4 Cr/month burn during growth phase',
    },
    fatalStrategicFlaws: [
      'Artisans and small handloom weavers had no ERP systems, causing dispatch delays of 10-15 days; wedding/festival buyers canceled orders before delivery arrived.',
      'Attempted to pivot into mass fast-fashion where competition with Meesho, Flipkart, and Amazon was fatal.',
    ],
    founderAutopsyQuoteOrLesson:
      'Authentic artisanal supply cannot be forced into standardized e-commerce speed. When delivery times lag customer expectations, return rates destroy unit profitability.',
    relevanceKeywords: ['crafts', 'ethnic', 'handloom', 'marketplace', 'artisan', 'ecommerce'],
  },
  {
    id: 'spoyl',
    startupName: 'Spoyl',
    sector: 'Influencer-Driven Social Fashion Marketplace',
    geography: 'India',
    peakFundingUSD: '$4M (Accel India)',
    status: 'Distressed Acquisition',
    peakValuationOrBurn: 'Acquired by Flipkart in 2021',
    primaryFailureMode: 'High Creator Royalty Payouts & Micro-Sellers Inventory Deficits',
    fatalMetrics: {
      blendedCAC: '₹350 via influencer swipe-up links',
      averageOrderValue: '₹480',
      contributionMargin: '-₹55 per order',
      burnRate: 'Burnt seed/Series A capital in 18 months',
    },
    fatalStrategicFlaws: [
      'Micro-influencers curated collections from unverified small suppliers; stockouts exceeded 30% when posts went viral, frustrating shoppers.',
      'Unit economics were crushed by 35% COD return rates and high reverse pickup shipping costs.',
    ],
    founderAutopsyQuoteOrLesson:
      'Influencer discovery creates sudden spiky demand that breaks fragile unorganized fashion supply chains unless inventory is pre-allocated and bonded.',
    relevanceKeywords: ['fashion', 'influencer', 'social-commerce', 'creator', 'flipkart', 'd2c'],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 5. FINTECH, LENDING & PAYMENTS (8 cases)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'zestmoney',
    startupName: 'ZestMoney (Camden Town Technologies)',
    sector: 'Digital Consumer BNPL & Checkout Finance',
    geography: 'India',
    peakFundingUSD: '$140M (PayU, Goldman Sachs, Quona, Ribbit Capital)',
    status: 'Defunct',
    peakValuationOrBurn: 'Valuation $450M; PhonePe acquisition collapsed due to bad debts; shut down in Dec 2023',
    primaryFailureMode: 'Unsecured Subprime Lending Defaults (NPLs >14%) & RBI FLDG Regulatory Clampdown',
    fatalMetrics: {
      blendedCAC: '₹800 per active borrower via merchant checkout SDKs',
      averageOrderValue: '₹8,500 average consumer durable / smartphone loan',
      contributionMargin: 'Severely negative after loan write-offs exceeded 12-14%',
      burnRate: '₹25 Cr/month burn; PhonePe due diligence uncovered unmanageable bad debt hole',
    },
    fatalStrategicFlaws: [
      'Extended zero-cost BNPL credit to first-time digital borrowers with no credit bureau history to fuel GMV growth.',
      'RBI issued strict digital lending guidelines in 2022 banning First Loss Default Guarantees (FLDG) above 5%, making NBFC banking partners freeze lending credit lines.',
      'Default collection cost in Tier-2/3 India for sub-₹10,000 tickets exceeded legal recovery recovery value.',
    ],
    founderAutopsyQuoteOrLesson:
      'In consumer lending, giving away money is easy; getting it back with interest is the entire business. If your credit underwriting models mistake borrower growth for creditworthiness, credit write-offs will destroy your equity.',
    relevanceKeywords: ['fintech', 'lending', 'bnpl', 'credit', 'nbfc', 'rbi', 'fldg', 'loans', 'defaults'],
  },
  {
    id: 'khatabook-lending-retreat',
    startupName: 'Khatabook (Digital Merchant Khata Lending Pivot)',
    sector: 'SME Digital Ledger & Merchant Micro-Lending',
    geography: 'India (Tier 2/3/4 Kirana Merchants)',
    peakFundingUSD: '$187M (Tencent, B Capital, Sequoia India, Tribe Capital)',
    status: 'Pivot After Near-Bankruptcy',
    peakValuationOrBurn: 'Valuation $600M; laid off staff and shut down lending/e-commerce arms',
    primaryFailureMode: 'High Micro-Merchant Credit Default & Resistance to Paid SaaS Monetization',
    fatalMetrics: {
      blendedCAC: '₹120 per app install, but ₹3,500 per paying merchant',
      averageOrderValue: '₹0 for free ledger app; attempted ₹25,000 working capital loans',
      contributionMargin: 'High bad-debt loss on merchant unsecured lending experiments',
      burnRate: 'Burnt ₹200+ Cr across FY22-FY23 on zero SaaS monetization',
    },
    fatalStrategicFlaws: [
      'Acquired 10M+ kirana shops on a free utility bookkeeping app, but Indian mom-and-pop stores vehemently refused to pay even ₹99/month for software subscriptions.',
      'When pivoting to micro-lending to monetize ledger data, merchant default rates rose to over 9%, forcing partner NBFCs to pull back capital.',
    ],
    founderAutopsyQuoteOrLesson:
      'Having millions of daily active users on a free Indian B2B utility does not prove software monetization willingness. If users perceive your tool as a free ledger, converting to high-margin lending or SaaS is extremely painful.',
    relevanceKeywords: ['fintech', 'khata', 'kirana', 'merchant', 'b2b', 'ledger', 'lending', 'saas'],
  },
  {
    id: 'slice-ppi-shock',
    startupName: 'Slice (GaragePreneurs Internet)',
    sector: 'Credit Cards & Prepaid Payment Instruments (PPI)',
    geography: 'India (College Students & Young Professionals)',
    peakFundingUSD: '$340M (Tiger Global, Insight Partners, Gunosy)',
    status: 'Pivot After Near-Bankruptcy',
    peakValuationOrBurn: 'Valuation $1.5B (Unicorn); saved company by engineering merger with North East Small Finance Bank',
    primaryFailureMode: 'Overnight Business Model Invalidation by RBI Master Direction on PPI Cards',
    fatalMetrics: {
      blendedCAC: '₹1,500 per physical card issuance',
      averageOrderValue: '₹1,200 per card swipe',
      contributionMargin: '+2.5% interchange before regulatory ban; plunged to zero overnight',
      burnRate: '₹30 Cr/month burn until bank merger was finalized',
    },
    fatalStrategicFlaws: [
      'Built a massive $1.5B unicorn business on a regulatory loophole: loading non-bank NBFC credit lines directly onto PPI prepaid cards (co-branded card model).',
      'In June 2022, RBI issued a single-page circular barring non-bank prepaid card issuers from loading credit lines, instantly killing Slice’s primary product overnight.',
    ],
    founderAutopsyQuoteOrLesson:
      'If your entire business model relies on a regulatory gray area or regulatory arbitrage, one stroke of the central bank governor’s pen can erase your revenue overnight. Building an actual licensed banking entity is the only durable moat.',
    relevanceKeywords: ['fintech', 'credit-card', 'ppi', 'rbi', 'banking', 'nbfc', 'regulations'],
  },
  {
    id: 'okcredit',
    startupName: 'OkCredit',
    sector: 'Digital Khata Book for Small Retailers',
    geography: 'India (Tier 2/3/4 Towns)',
    peakFundingUSD: '$83M (Tiger Global, Lightspeed, Y Combinator)',
    status: 'Pivot After Near-Bankruptcy',
    peakValuationOrBurn: 'Valuation $250M; laid off majority of team and pivoted to e-commerce storefronts',
    primaryFailureMode: 'Customer Acquisition Cost Inflation & Extreme Monetization Resistance',
    fatalMetrics: {
      blendedCAC: '₹250 per merchant via Google/FB ad war against Khatabook',
      averageOrderValue: '₹0 (Free utility)',
      contributionMargin: 'Negative; zero software revenue against heavy SMS OTP costs',
      burnRate: 'Burnt $50M in aggressive user acquisition war with zero revenue',
    },
    fatalStrategicFlaws: [
      'Engaged in an all-out marketing bidding war against Khatabook, paying cricket stars and running TV ads for a free utility with no monetization engine.',
      'Telecom SMS OTP and transaction update costs ran into crores of rupees every month just to keep free users engaged.',
    ],
    founderAutopsyQuoteOrLesson:
      'Never enter an ad spending war over a free product where users have zero switching costs and you have no proven revenue engine.',
    relevanceKeywords: ['fintech', 'khata', 'kirana', 'sms', 'otp', 'monetization', 'free'],
  },
  {
    id: 'rupeek-gold-loan',
    startupName: 'Rupeek',
    sector: 'Doorstep Gold Loan Aggregator & NBFC',
    geography: 'India (Metros & Tier 1 Cities)',
    peakFundingUSD: '$160M (Sequoia Capital, Accel, GGV Capital, Bertelsmann)',
    status: 'Pivot After Near-Bankruptcy',
    peakValuationOrBurn: 'Valuation $634M; underwent severe down-round, multiple rounds of layoffs',
    primaryFailureMode: 'High Doorstep Appraisal Cost & Traditional Bank Gold Loan Price Wars',
    fatalMetrics: {
      blendedCAC: '₹4,500 per gold loan customer',
      averageOrderValue: '₹1.5 Lakh gold loan ticket',
      contributionMargin: 'Net interest margin squeezed below 1.5% as SBI and Muthoot slashed gold loan rates to 8.5%',
      burnRate: '₹15 Cr monthly burn on armed appraisal field agents',
    },
    fatalStrategicFlaws: [
      'Sending certified gold appraisers with caratometers and security escorts to customer doorsteps created high fixed operational costs (₹1,800 per visit).',
      'Public sector banks (SBI, Canara Bank) offered 8.5% gold loans at branches; price-sensitive borrowers used Rupeek for valuation but walked into banks for lower interest rates.',
    ],
    founderAutopsyQuoteOrLesson:
      'In asset-backed lending, trust and low cost of capital beat convenience. Consumers will happily walk to a physical bank branch to save 200 basis points on interest.',
    relevanceKeywords: ['fintech', 'gold-loan', 'lending', 'nbfc', 'appraisal', 'offline'],
  },
  {
    id: 'koinex',
    startupName: 'Koinex (DISKOVAL)',
    sector: 'Cryptocurrency & Digital Asset Exchange',
    geography: 'India',
    peakFundingUSD: '$3M (Pantera Capital, Beenext)',
    status: 'Defunct',
    peakValuationOrBurn: 'Handled $265M daily trading volume at peak; shut down in June 2019',
    primaryFailureMode: 'RBI Banking Freeze & Intermediary Payment Gateway Account Bans',
    fatalMetrics: {
      blendedCAC: '₹80 per trader via viral organic referral',
      averageOrderValue: '₹25,000 monthly trading turnover per active user',
      contributionMargin: '+0.25% maker/taker trading fee (highly profitable before ban)',
      burnRate: 'Profitable operationally until bank accounts were unilaterally frozen',
    },
    fatalStrategicFlaws: [
      'RBI issued a circular in April 2018 directing all scheduled commercial banks to terminate banking relationships with cryptocurrency exchanges within 90 days.',
      'Payment gateways and banks severed API rails, leaving the exchange unable to process rupee deposits or withdrawals.',
    ],
    founderAutopsyQuoteOrLesson:
      'Even highly profitable, fast-growing fintech platforms cannot survive when central regulatory authorities cut off their domestic banking and fiat payment rails.',
    relevanceKeywords: ['crypto', 'fintech', 'rbi', 'banking', 'exchange', 'regulations'],
  },
  {
    id: 'finin-neobank',
    startupName: 'Finin (First Neo-Bank in India)',
    sector: 'Consumer Neobanking & Smart Savings Account',
    geography: 'India',
    peakFundingUSD: '$2M (Unicorn India Ventures)',
    status: 'Distressed Acquisition',
    peakValuationOrBurn: 'Acquired by Open Financial Technologies for < $5M in 2021',
    primaryFailureMode: 'High Account Opening Friction, Bank Partner Reluctance & Zero Interchange Moat',
    fatalMetrics: {
      blendedCAC: '₹1,200 per KYC-completed savings account',
      averageOrderValue: '₹8,000 average account balance',
      contributionMargin: 'Negative; partner bank paid only 0.2% on deposits',
      burnRate: '₹60 Lakhs/month burn with high customer churn',
    },
    fatalStrategicFlaws: [
      'Did not have a banking license; acted merely as an unbranded front-end UI layer on top of SBM Bank India.',
      'Partner banks changed API integration terms and compliance guidelines, causing account creation rejection rates to exceed 40%.',
    ],
    founderAutopsyQuoteOrLesson:
      'Consumer neobanks without a native banking license or proprietary lending book end up as glorified UI wrappers with terrible unit economics.',
    relevanceKeywords: ['fintech', 'neobank', 'banking', 'savings', 'interchange', 'cards'],
  },
  {
    id: 'lazypay-nbfc-friction',
    startupName: 'LazyPay (PayU India Credit)',
    sector: 'Checkout BNPL & Digital Revolving Credit',
    geography: 'India',
    peakFundingUSD: 'Backed by Prosus / PayU ($200M+ balance sheet allocation)',
    status: 'Pivot After Near-Bankruptcy',
    peakValuationOrBurn: 'Surviving after restructuring away from uncollateralized micro-BNPL cards',
    primaryFailureMode: 'Google Play Store App Sanchar Saathi Bans & Default Spikes in Tier 2/3',
    fatalMetrics: {
      blendedCAC: '₹250 via Swiggy/Zomato checkout integrations',
      averageOrderValue: '₹450 per micro-checkout swipe',
      contributionMargin: 'Negative across small food orders due to recovery costs on non-repayment',
      burnRate: 'Absorbed significant credit loss provisions across 2021-2023',
    },
    fatalStrategicFlaws: [
      'Users treated ₹500 food checkout credit as free money, churning their phone SIM cards to evade collection calls.',
      'MeitY and Google Play Store delisted dozens of digital lending apps over privacy and collection harassment crackdowns, freezing user acquisition.',
    ],
    founderAutopsyQuoteOrLesson:
      'Micro-BNPL on food and cinema tickets has an insurmountable underwriting flaw: the cost of sending legal collection notices for a ₹500 unpaid dinner exceeds the principal.',
    relevanceKeywords: ['fintech', 'bnpl', 'credit', 'payu', 'collections', 'checkout'],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 6. MOBILITY, TRAVEL & LOGISTICS (8 cases)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'stayzilla',
    startupName: 'Stayzilla',
    sector: 'Homestay & Alternate Accommodation Aggregator',
    geography: 'India (Tier 2/3 homestays & towns)',
    peakFundingUSD: '$34M (Nexus Venture Partners, Matrix Partners India)',
    status: 'Defunct',
    peakValuationOrBurn: 'Valuation $80M; shut down in 2017 amid vendor disputes',
    primaryFailureMode: 'High Offline Quality-Audit Overhead & Google Ad Bidding War against OYO & MakeMyTrip',
    fatalMetrics: {
      blendedCAC: '₹1,800 per booking on ₹2,400 homestay ticket',
      averageOrderValue: '₹2,400 (Stayzilla take-rate 15% = ₹360 gross revenue)',
      contributionMargin: '-₹1,440 per booking before offline verification costs',
      burnRate: '₹8-10 Cr/month burn with heavy legal and offline field force costs',
    },
    fatalStrategicFlaws: [
      'Homestays in non-metro India required intensive physical ground inspections to verify clean water, air conditioning, and safety, destroying gross margins.',
      'Google search keyword bidding for "hotels in Jaipur/Ooty" was dominated by OTA giants with 10x deeper war chests.',
      'Vendor and agency payment disputes escalated into criminal police lockups, freezing company bank accounts.',
    ],
    founderAutopsyQuoteOrLesson:
      'Do not engage in paid ad bidding wars with well-funded incumbents when your unit economics generate a fraction of their average booking commission.',
    relevanceKeywords: ['travel', 'hotel', 'hospitality', 'marketplace', 'aggregator', 'offline', 'b2c'],
  },
  {
    id: 'bounce-scooters',
    startupName: 'Bounce (Wicked Ride)',
    sector: 'Dockless Keyless Scooter Sharing',
    geography: 'India (Bengaluru, Hyderabad)',
    peakFundingUSD: '$214M (Accel, B Capital, Sequoia India, Falcon Edge)',
    status: 'Pivot After Near-Bankruptcy',
    peakValuationOrBurn: 'Valuation $520M; pivoted to EV scooter manufacturing after massive fleet destruction',
    primaryFailureMode: 'Vandalism, Helmet Theft, Fuel Siphoning & Battery Depletion CapEx Trap',
    fatalMetrics: {
      blendedCAC: '₹250 per rider',
      averageOrderValue: '₹28 per 4km metro commute ride',
      contributionMargin: '-₹14 per ride after fuel refill van sweeps and maintenance',
      burnRate: '₹35-40 Cr/month burn with 25,000 ICE scooter fleet',
    },
    fatalStrategicFlaws: [
      'Keyless dockless scooters left on city roads suffered extreme vandalism: users stole helmets, cut wires, siphoned petrol, and abandoned scooters in locked private basements.',
      'Required an army of thousands of van runners driving across Bangalore at 2 AM to locate abandoned scooters, refill petrol, and repair flat tires, destroying unit margins.',
    ],
    founderAutopsyQuoteOrLesson:
      'Dockless hardware in public spaces without physical dock locking mechanisms suffers unsustainable asset destruction in high-density developing markets.',
    relevanceKeywords: ['mobility', 'scooter', 'sharing', 'fleet', 'hardware', 'ev', 'vandalism'],
  },
  {
    id: 'vogo-mobility',
    startupName: 'Vogo Automotive',
    sector: 'Dock-Based Scooter Rentals',
    geography: 'India (Bengaluru, Hyderabad)',
    peakFundingUSD: '$180M (Ola, Kalaari Capital, Matrix Partners India, Stellaris)',
    status: 'Distressed Acquisition',
    peakValuationOrBurn: 'Acquired by Chalo at steep haircut in 2022',
    primaryFailureMode: 'Heavy Vehicle Depreciation, Insurance Losses & Pandemic Commute Extinction',
    fatalMetrics: {
      blendedCAC: '₹300 per rider',
      averageOrderValue: '₹35 per commute trip',
      contributionMargin: '-18% after vehicle debt EMI and road accident claims',
      burnRate: '₹12 Cr/month burn',
    },
    fatalStrategicFlaws: [
      'Purchased tens of thousands of Honda Activas on debt financing; monthly vehicle lease payments continued even when tech parks closed during lockdowns.',
      'Rider accident repair costs and municipal parking impoundment fees drained company treasury.',
    ],
    founderAutopsyQuoteOrLesson:
      'Financing depreciating consumer vehicles on fixed debt repayments while earning volatile micro-fare revenues is a recipe for balance sheet liquidation during a downturn.',
    relevanceKeywords: ['mobility', 'scooters', 'rentals', 'fleet', 'commute', 'chalo', 'ola'],
  },
  {
    id: 'drivezy',
    startupName: 'Drivezy (JustRide)',
    sector: 'Peer-to-Peer Car & Two-Wheeler Sharing',
    geography: 'India & US',
    peakFundingUSD: '$149M (SoftBank, Das Capital, Yamaha Motor)',
    status: 'Defunct',
    peakValuationOrBurn: 'Declared bankruptcy in 2021 amid legal disputes and unpaid vehicle owner rents',
    primaryFailureMode: 'Fraudulent Fractional Ownership Vehicle Schemes & Asset Confiscation',
    fatalMetrics: {
      blendedCAC: 'High investor acquisition cost to sell guaranteed return vehicle investment plans',
      averageOrderValue: '₹2,500 weekend car rental',
      contributionMargin: 'Negative when factoring in 24% annual guaranteed yield promised to vehicle owners',
      burnRate: 'Cash reserves evaporated into legal settlements',
    },
    fatalStrategicFlaws: [
      'Promised retail investors guaranteed 24% annual rental yields on cars they purchased and placed on Drivezy platform; rental demand could not sustain these promised payouts.',
      'Renters forged identity documents, drove vehicles across state borders, and stripped cars for spare parts.',
    ],
    founderAutopsyQuoteOrLesson:
      'Promising guaranteed financial yields on volatile mobility assets creates a structural Ponzi dynamic that implodes the moment organic customer rental demand dips.',
    relevanceKeywords: ['mobility', 'car-sharing', 'p2p', 'rentals', 'fleet', 'softbank'],
  },
  {
    id: 'zoomcar-distress',
    startupName: 'Zoomcar (Nasdaq Listing Distress)',
    sector: 'Self-Drive Car Rental Marketplace',
    geography: 'India, SE Asia, Middle East',
    peakFundingUSD: '$300M+ (Mahindra, Ford, Sequoia Capital India)',
    status: 'Pivot After Near-Bankruptcy',
    peakValuationOrBurn: 'Stock crashed 98% post-SPAC listing; CEO ousted amid massive vendor defaults',
    primaryFailureMode: 'High Vehicle Accident Damage Rates & Horrific Host-Guest Trust Deficits',
    fatalMetrics: {
      blendedCAC: '₹2,200 per renter',
      averageOrderValue: '₹4,500 per booking',
      contributionMargin: '-15% after vehicle insurance deductibles and host payout guarantees',
      burnRate: 'Annual losses exceeded ₹250 Cr on ₹60 Cr net revenue',
    },
    fatalStrategicFlaws: [
      'Transitioned from an owned fleet to a host peer-to-peer marketplace; guests thrashed cars and burned clutches, leading host car owners to file police FIRs against Zoomcar for unpaid repair claims.',
      'High security deposit disputes led to credit card chargebacks and severe consumer court litigations.',
    ],
    founderAutopsyQuoteOrLesson:
      'P2P car sharing in India fails because renters do not treat privately owned cars with care, and insurance companies reject commercial self-drive claims.',
    relevanceKeywords: ['car', 'rentals', 'zoomcar', 'p2p', 'automotive', 'mobility'],
  },
  {
    id: 'taxiforsure',
    startupName: 'TaxiForSure (TFS)',
    sector: 'Cab Aggregator Marketplace',
    geography: 'India (14 Cities)',
    peakFundingUSD: '$64M (Accel, Bessemer Venture Partners, Helion)',
    status: 'Distressed Acquisition',
    peakValuationOrBurn: 'Sold to Ola for $200M in 2015; shut down completely within 18 months',
    primaryFailureMode: 'All-Out Driver Incentive & Capital War Against SoftBank-Backed Ola and Uber',
    fatalMetrics: {
      blendedCAC: '₹600 per passenger ride; ₹5,000 driver signup bonus',
      averageOrderValue: '₹220 per cab ride',
      contributionMargin: '-₹90 per ride during peak subsidy war',
      burnRate: 'Burned $5M/month in late 2014',
    },
    fatalStrategicFlaws: [
      'Operator-led taxi operator model was out-maneuvered when Ola and Uber allowed individual driver-partners to sign up with zero agency commissions.',
      'Could not raise a $100M+ follow-on round after SoftBank wrote a $210M mega-check into Ola, forcing a distressed fire-sale.',
    ],
    founderAutopsyQuoteOrLesson:
      'In a winner-take-all commoditized network effects marketplace, whoever has 5x cheaper cost of capital can subsidize customer fares and driver wages until you run dry.',
    relevanceKeywords: ['mobility', 'taxi', 'cabs', 'ola', 'uber', 'subsidies', 'aggregation'],
  },
  {
    id: 'letstransport-early',
    startupName: 'LetsTransport (Intra-City Trucking Early Pivot)',
    sector: 'B2B Intra-City Light Commercial Vehicle Logistics',
    geography: 'India',
    peakFundingUSD: '$60M+ (Fosun, Bertelsmann, Rebright)',
    status: 'Pivot After Near-Bankruptcy',
    peakValuationOrBurn: 'Surviving after pruning unviable retail spot-demand delivery',
    primaryFailureMode: 'Spot-Market Price Volatility & High Driver Payment Default',
    fatalMetrics: {
      blendedCAC: 'High spot merchant field acquisition overhead',
      averageOrderValue: '₹1,200 per Tata Ace trip',
      contributionMargin: 'Initially negative on spot booking; turned positive after pivoting to enterprise contracts',
      burnRate: '₹4 Cr/month burn during early open-marketplace phase',
    },
    fatalStrategicFlaws: [
      'Early open spot marketplace for small retail shopkeepers had 45% driver no-show rates during rainy seasons when drivers took private offline loads.',
      'Pivoted away from fragmented retail shippers into dedicated multi-year enterprise contracts (Flipkart, Amazon, IKEA) with pre-scheduled route optimization.',
    ],
    founderAutopsyQuoteOrLesson:
      'Fragmented B2B spot trucking has zero customer loyalty; enterprise contracted capacity with locked minimum volume guarantees is the only path to positive CM2.',
    relevanceKeywords: ['trucking', 'logistics', 'b2b', 'freight', 'commercial-vehicles'],
  },
  {
    id: 'homigo-coho',
    startupName: 'Homigo & CoHo',
    sector: 'Managed Co-Living & Student Housing',
    geography: 'India (Bengaluru, Delhi NCR)',
    peakFundingUSD: '$8M (Sprout Venture Partners, Mistletoe)',
    status: 'Defunct',
    peakValuationOrBurn: 'Shut down in 2019 following founder abscondence and security deposit forfeiture',
    primaryFailureMode: 'Master-Lease Rent Liability & Tenant Security Deposit Defalcation',
    fatalMetrics: {
      blendedCAC: '₹6,000 per tenant bed',
      averageOrderValue: '₹12,000 monthly bed rent',
      contributionMargin: '-18% after 90% fixed master-lease commitments and utility bills',
      burnRate: 'Collapsed when occupancy dipped below 78%',
    },
    fatalStrategicFlaws: [
      'Signed long-term 5-year fixed master-lease contracts with property owners, while tenants signed flexible 6-month leases with 1-month notice periods.',
      'Used incoming tenant security deposit cash float to fund new property renovation capex, leading to insolvency when tenants requested deposit returns.',
    ],
    founderAutopsyQuoteOrLesson:
      'Never borrow short-term tenant deposits to fund long-term building fit-out capex while carrying non-negotiable landlord master-lease liabilities.',
    relevanceKeywords: ['coliving', 'real-estate', 'proptech', 'rentals', 'students', 'housing'],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 7. AGRITECH & B2B WHOLESALE (6 cases)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'ninjacart-b2c',
    startupName: 'Ninjacart (Early B2C & B2B Farm-to-Fork Pivot)',
    sector: 'Agritech Supply Chain & B2B Fresh Produce',
    geography: 'India (South India mandis to Bangalore/Chennai)',
    peakFundingUSD: '$350M+ (Walmart, Flipkart, Tiger Global)',
    status: 'Pivot After Near-Bankruptcy',
    peakValuationOrBurn: 'Surviving after total pivot from B2C to pure B2B mandi infrastructure',
    primaryFailureMode: 'Mandi APMC Middleman Credit Cycles & 60-Day Working Capital Receivables Trap',
    fatalMetrics: {
      blendedCAC: 'High collection field staff costs (12% of transaction value)',
      averageOrderValue: '₹1,500 - ₹3,500 per daily kirana store',
      contributionMargin: 'Initially -3% before crate automation; now +2-4% at scale',
      burnRate: 'Burned ₹25 Cr/month until crate standardization and daily UPI auto-debits were enforced',
    },
    fatalStrategicFlaws: [
      'Early attempt to deliver to consumers (B2C) caused 22% fruit/vegetable transit shrinkage and crushing delivery overhead.',
      'When pivoting to kiranas (B2B), retailers refused to pay cash-on-delivery, demanding traditional 30-to-60 day khata credit; bad debts exceeded 8% of gross merchandise value.',
      'Weather-induced price swings in onion/tomato created violent margin collapses when Ninjacart guaranteed fixed farmer procurement rates.',
    ],
    founderAutopsyQuoteOrLesson:
      'In agricultural supply chains, credit collection and transit spoilage destroy more companies than software bugs. You cannot win on software alone without standardized physical crating and tight same-day UPI settlement.',
    relevanceKeywords: ['agri', 'farm', 'farmers', 'b2b', 'supply-chain', 'cold-chain', 'iot', 'wholesale', 'produce', 'vegetables'],
  },
  {
    id: 'farmizen',
    startupName: 'Farmizen',
    sector: 'Community Supported Agriculture & Mini-Farm Subscriptions',
    geography: 'India (Bengaluru, Hyderabad, Surat)',
    peakFundingUSD: '$2.5M (Venture Highway, angels)',
    status: 'Defunct',
    peakValuationOrBurn: 'Shut down operations in 2022',
    primaryFailureMode: 'High Land Lease Management Cost & Pest/Monsoon Crop Destruction',
    fatalMetrics: {
      blendedCAC: '₹2,500 per urban subscriber family',
      averageOrderValue: '₹2,500 monthly mini-farm rent',
      contributionMargin: '-₹800 per active plot after farmer wage guarantee and transport',
      burnRate: '₹40 Lakhs/month burn on farm leases',
    },
    fatalStrategicFlaws: [
      'Allowed urban families to rent 600 sq ft farm plots on partner peri-urban farms to grow organic vegetables via mobile app; unseasonal monsoons wiped out 50% of crops, causing subscribers to demand refunds.',
      'High logistics cost of delivering bespoke micro-harvests (a single cabbage, 250g beans) to dispersed urban apartments.',
    ],
    founderAutopsyQuoteOrLesson:
      'Treating organic agriculture as a leisure mobile app hobby game underestimates biological weather risks and logistical fragmentation.',
    relevanceKeywords: ['agritech', 'organic', 'farm', 'subscription', 'perishable', 'b2c'],
  },
  {
    id: 'udaan-downround',
    startupName: 'Udaan (Hiveloop Technology)',
    sector: 'B2B E-Commerce Marketplace & Kirana Credit',
    geography: 'India (Pan-India)',
    peakFundingUSD: '$1.5B+ (DST Global, Lightspeed, Altimeter, GGV)',
    status: 'Pivot After Near-Bankruptcy',
    peakValuationOrBurn: 'Valuation cut from $3.2B peak to under $1.8B in down-round debt recapitalization',
    primaryFailureMode: 'Lending Capital Destruction via Kirana Khata Credit & Warehousing Glut',
    fatalMetrics: {
      blendedCAC: 'High field sales commission overhead',
      averageOrderValue: '₹8,000 per B2B order',
      contributionMargin: 'Negative across FMCG products (<2% gross margin swallowed by ₹450 logistics cost)',
      burnRate: 'Burnt peak of ₹180-200 Cr ($25M) per month during hyper-expansion',
    },
    fatalStrategicFlaws: [
      'Grew gross GMV by providing 14-to-30 day unsecured credit to small retail shopkeepers; kirana default rates and merchant write-offs surged past ₹800 Cr.',
      'FMCG commodities (flour, oil, sugar) have manufacturer margins of only 1.5–3%, whereas Udaan’s warehouse and delivery fleet cost 6–8% of order value.',
    ],
    founderAutopsyQuoteOrLesson:
      'Subsidizing distribution and extending credit on low-margin branded commodity goods does not build enterprise moats; it builds an enormous unpaid accounts receivable deficit.',
    relevanceKeywords: ['b2b', 'wholesale', 'udaan', 'kirana', 'credit', 'fmcg', 'supply-chain'],
  },
  {
    id: 'agrim-pivot',
    startupName: 'Agrim (B2B Agri-Input Marketplace)',
    sector: 'B2B Agri-Inputs (Seeds, Pesticides, Fertilizers)',
    geography: 'India (Tier 3/4 Rural Retailers)',
    peakFundingUSD: '$13M (Kalaari Capital, Omnivore, India Quotient)',
    status: 'Pivot After Near-Bankruptcy',
    peakValuationOrBurn: 'Surviving after pruning low-margin branded fertilizer distribution',
    primaryFailureMode: 'State Pesticide Licensing Roadblocks & Manufacturer Credit Monopolies',
    fatalMetrics: {
      blendedCAC: '₹3,500 per rural retail agri-dealer onboarding',
      averageOrderValue: '₹18,000 per shop order',
      contributionMargin: 'Initially -2% on government subsidized fertilizers; now +3.5% on specialty inputs',
      burnRate: '₹1.8 Cr monthly burn during early dealer acquisition blitz',
    },
    fatalStrategicFlaws: [
      'Agri-inputs in India require separate state and district-level retail sale licenses for insecticides and chemical fertilizers; municipal officers impounded consignments across state borders.',
      'Top seed brands (Syngenta, Bayer) offered 90-day interest-free credit directly to traditional offline dealers, making Agrim’s cash-on-delivery terms uncompetitive.',
    ],
    founderAutopsyQuoteOrLesson:
      'Disrupting rural agricultural input networks requires navigating complex state insecticide licensing laws and matching deeply entrenched legacy credit relationships.',
    relevanceKeywords: ['agritech', 'inputs', 'seeds', 'fertilizers', 'b2b', 'rural', 'dealers'],
  },
  {
    id: 'agrostar-early',
    startupName: 'AgroStar (Direct-to-Farmer Early Pivot)',
    sector: 'Omnichannel Agri-Tech Commerce & Advisory',
    geography: 'India (Maharashtra, Gujarat, Rajasthan)',
    peakFundingUSD: '$110M (Schroders, Chiratae Ventures, Bertelsmann)',
    status: 'Pivot After Near-Bankruptcy',
    peakValuationOrBurn: 'Pivoted from pure digital app to physical AgroStar Seva Kendra franchise stores',
    primaryFailureMode: 'Last-Mile Rural Postal Delivery Surcharges & Farmer Cash-on-Delivery Rejection',
    fatalMetrics: {
      blendedCAC: '₹800 per farmer via toll-free miss-call advisory centers',
      averageOrderValue: '₹1,200 seed/nutrient basket',
      contributionMargin: '-12% when relying on India Post VPP courier delivery',
      burnRate: '₹8 Cr/month burn until physical touchpoints were opened',
    },
    fatalStrategicFlaws: [
      'Shipped heavy liquid fertilizers and seeds to remote village pin codes via India Post Value Payable Post (VPP); 28% of packages were rejected at delivery when rains were delayed.',
      'Recognized that farmers demand physical in-person seed testing and touch-and-feel before committing substantial crop season budgets.',
    ],
    founderAutopsyQuoteOrLesson:
      'Pure digital e-commerce cannot bridge rural Indian trust barriers. Physical franchise touchpoints and local agronomist advisory are required to sustain unit margins.',
    relevanceKeywords: ['agritech', 'farmers', 'seeds', 'rural', 'omnichannel', 'advisory'],
  },
  {
    id: 'industrybuying-early',
    startupName: 'Industrybuying (B2B Industrial & MRO Supplies)',
    sector: 'B2B Industrial Goods & Maintenance Hardware',
    geography: 'India',
    peakFundingUSD: '$20M (Kalaari Capital, SAIF Partners)',
    status: 'Distressed Acquisition',
    peakValuationOrBurn: 'Acquired by MonotaRO (Japan) in majority stake rescue',
    primaryFailureMode: 'High Enterprise Payment Terms (Net-90) & High Logistics Weight Freight Costs',
    fatalMetrics: {
      blendedCAC: '₹4,500 per corporate procurement account',
      averageOrderValue: '₹15,000',
      contributionMargin: '-4% on heavy industrial machinery shipments',
      burnRate: '₹2.5 Cr/month burn with 75-day working capital delay',
    },
    fatalStrategicFlaws: [
      'Heavy industrial motors, generators, and safety shoes had crushing freight weight penalties that ate all 6-8% gross procurement margins.',
      'SME buyers delayed payments by 90 to 120 days, locking up equity capital in receivables.',
    ],
    founderAutopsyQuoteOrLesson:
      'Selling heavy physical B2B industrial hardware online without dedicated bulk freight logistics contracts and factoring lines is a guaranteed cash burn cycle.',
    relevanceKeywords: ['b2b', 'manufacturing', 'industrial', 'hardware', 'procurement', 'mro'],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 8. HEALTHTECH & PHARMACY (6 cases)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'pharmeasy-debt-trap',
    startupName: 'PharmEasy (API Holdings)',
    sector: 'Online Pharmacy, Diagnostics & B2B Drug Distribution',
    geography: 'India (Pan-India)',
    peakFundingUSD: '$1.5B+ (Prosus, Temasek, TPG, CDPQ)',
    status: 'Pivot After Near-Bankruptcy',
    peakValuationOrBurn: 'Valuation crashed 90% from $5.6B peak in distressed rights issue; debt distress',
    primaryFailureMode: 'Aggressive Debt-Financed Acquisition of Thyrocare ($600M Goldman Sachs Loan)',
    fatalMetrics: {
      blendedCAC: '₹600 per medicine subscriber via 25% discount coupons',
      averageOrderValue: '₹950',
      contributionMargin: '-8% after paying 18% medicine discounts and runner delivery',
      burnRate: 'Annual loss exceeded ₹2,700 Cr ($330M) in FY22',
    },
    fatalStrategicFlaws: [
      'Borrowed ₹4,000 Cr ($600M) in high-interest debt from Goldman Sachs to acquire diagnostic chain Thyrocare right before public market valuations crashed.',
      'Discounted chronic prescription medicines by 20-25% to gain market share, losing money on every strip of insulin delivered.',
      'Offline chemist trade associations (AIOCD) waged legal warfare and boycotted pharmaceutical manufacturers who supplied online pharmacies.',
    ],
    founderAutopsyQuoteOrLesson:
      'Taking large debt packages to fund acquisitions in un-profitable discount-driven businesses is suicide when venture equity markets turn cold.',
    relevanceKeywords: ['healthtech', 'pharmacy', 'medicine', 'debt', 'thyrocare', 'diagnostics', 'discounts'],
  },
  {
    id: 'medlife-firesale',
    startupName: 'Medlife',
    sector: 'Online Medicine Delivery & E-Pharmacy',
    geography: 'India (Pan-India)',
    peakFundingUSD: '$120M (Prashant Salian family office, Wilson Global)',
    status: 'Distressed Acquisition',
    peakValuationOrBurn: 'Merged into PharmEasy at steep valuation discount in 2020',
    primaryFailureMode: 'Unsustainable 30% Medicine Discounts & Heavy Doctor Telesales Commission',
    fatalMetrics: {
      blendedCAC: '₹750 per user on 30% discount coupons',
      averageOrderValue: '₹850',
      contributionMargin: '-₹140 per delivered parcel',
      burnRate: 'Burnt ₹40-50 Cr monthly during pharmacy price wars',
    },
    fatalStrategicFlaws: [
      'Offered 30% discounts on prescription medicines where retail trade margin from pharma distributors was only 16-20%.',
      'Built standalone physical diagnostic labs that operated at <25% capacity utilization.',
    ],
    founderAutopsyQuoteOrLesson:
      'In medicine delivery, giving 30% discounts on products you buy at 20% margin is mathematically fatal. Growth cannot cure structural negative gross margin.',
    relevanceKeywords: ['pharmacy', 'healthtech', 'medicine', 'discounts', 'merger', 'pharmeasy'],
  },
  {
    id: 'practo-consultation-pivot',
    startupName: 'Practo (Consultation & Hospital SaaS)',
    sector: 'Doctor Discovery, Appointment Booking & Teleconsultation',
    geography: 'India, SE Asia, Middle East',
    peakFundingUSD: '$230M (Tencent, Sofina, Sequoia Capital India)',
    status: 'Pivot After Near-Bankruptcy',
    peakValuationOrBurn: 'Valuation $650M peak; multiple rounds of restructuring after appointment monetization stalled',
    primaryFailureMode: 'High Clinic Churn on SaaS Subscriptions & Doctor Bypass of Platform Fees',
    fatalMetrics: {
      blendedCAC: '₹8,000 per doctor/clinic onboarding via field sales teams',
      averageOrderValue: '₹999 monthly clinic management software subscription',
      contributionMargin: 'Negative when factoring in high doctor verification field sales salaries',
      burnRate: 'Burned $15M+ annually trying to scale international offices in Singapore and Brazil',
    },
    fatalStrategicFlaws: [
      'Doctors loved receiving free patient appointments from Practo, but refused to pay SaaS fees for clinic software (Practo Ray) and actively canceled subscriptions.',
      'Once a patient discovered a doctor on Practo for transaction #1, subsequent follow-ups occurred directly at the clinic desk, disintermediating Practo.',
    ],
    founderAutopsyQuoteOrLesson:
      'Healthcare appointment marketplaces suffer from severe disintermediation: doctors and chronic patients naturally build offline relationships, leaving the platform with zero repeat take-rate.',
    relevanceKeywords: ['healthtech', 'doctors', 'telehealth', 'saas', 'appointments', 'practo', 'clinics'],
  },
  {
    id: 'mfine-distress',
    startupName: 'mfine (Novocura Tech Health)',
    sector: 'AI-Powered Digital Teleconsultation & Diagnostics',
    geography: 'India',
    peakFundingUSD: '$97M (Moore Strategic Ventures, Beenext, Stellaris)',
    status: 'Distressed Acquisition',
    peakValuationOrBurn: 'Merged with LifeCell diagnostic arm in distress share-swap after laying off 70% of staff in 2022',
    primaryFailureMode: 'Astronomical Digital CAC for Online Doctor Consultations',
    fatalMetrics: {
      blendedCAC: '₹1,800 per paid consultation',
      averageOrderValue: '₹399 per 15-minute chat consultation',
      contributionMargin: '-₹1,400 per doctor consultation session',
      burnRate: '₹12-15 Cr/month burn during digital ad spending spree',
    },
    fatalStrategicFlaws: [
      'Bidding on Google search ads for "online doctor" drove cost-per-click to ₹250+, while charging only ₹399 per consultation.',
      'Over 85% of users consulted a doctor once for an acute symptom (fever, rash) and never opened the app again, resulting in an anemic 1.1x LTV:CAC ratio.',
    ],
    founderAutopsyQuoteOrLesson:
      'Teleconsultation is a low-frequency episodic transaction. If you pay performance marketing CAC for a one-time ₹399 chat, you burn through capital in months.',
    relevanceKeywords: ['healthtech', 'teleconsultation', 'doctor', 'ai', 'diagnostics', 'cac'],
  },
  {
    id: 'healthians-lab-burn',
    startupName: 'Healthians (Expedient Healthcare)',
    sector: 'Doorstep Pathology Blood Sample Collection',
    geography: 'India (Tier 1 & Tier 2 Cities)',
    peakFundingUSD: '$80M (WestBridge Capital, Yusaku Maezawa)',
    status: 'Pivot After Near-Bankruptcy',
    peakValuationOrBurn: 'Surviving after restructuring away from low-margin blood test discounts',
    primaryFailureMode: 'Phlebotomist Fleet Travel Overhead & Aggressive Diagnostic Price Wars',
    fatalMetrics: {
      blendedCAC: '₹1,100 per full-body checkup customer',
      averageOrderValue: '₹1,200',
      contributionMargin: '-5% after phlebotomist scooter travel and sample testing consumables',
      burnRate: '₹8 Cr/month burn during expansion into 50+ cities',
    },
    fatalStrategicFlaws: [
      'Phlebotomists spent 45 minutes traveling across morning city traffic to collect a single ₹499 blood sample, suffering high transit hemolysis (spoiled sample) rates.',
      'Incumbents Dr Lal PathLabs and Metropolis engaged in institutional quality reputation counter-attacks, casting doubt on startup home test accuracy.',
    ],
    founderAutopsyQuoteOrLesson:
      'Home blood sample collection is an operational grind where travel cost per phlebotomist drop wipes out small diagnostic test margins.',
    relevanceKeywords: ['healthtech', 'diagnostics', 'pathology', 'blood-test', 'home-collection'],
  },
  {
    id: '1mg-early-burn',
    startupName: '1mg (Tata 1mg Pre-Acquisition)',
    sector: 'E-Pharmacy & Diagnostic Aggregation',
    geography: 'India',
    peakFundingUSD: '$200M+ (Sequoia India, IFC, Tata Group)',
    status: 'Distressed Acquisition',
    peakValuationOrBurn: 'Acquired majority control by Tata Digital in 2021 to save from standalone insolvency',
    primaryFailureMode: 'High Regulatory Compliance Costs & Chemist Guild Injunctions',
    fatalMetrics: {
      blendedCAC: '₹550 per transacting patient',
      averageOrderValue: '₹850',
      contributionMargin: 'Negative during standalone years due to courier shipping and 20% discounts',
      burnRate: 'Survived only through acquisition into Tata Digital conglomerate balance sheet',
    },
    fatalStrategicFlaws: [
      'State drug inspectors issued regular stoppage notices and raided sorting hubs under 1940 Drugs and Cosmetics Act for courier transport of Schedule H prescription drugs.',
      'Standalone unit economics were unsustainable without bundling into a larger conglomerate consumer super-app ecosystem.',
    ],
    founderAutopsyQuoteOrLesson:
      'Standalone e-pharmacies cannot survive regulatory headwinds and discount wars unless anchored by a massive conglomerate balance sheet with cross-selling synergies.',
    relevanceKeywords: ['pharmacy', 'healthtech', 'tata', 'medicine', 'diagnostics', 'prescription'],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 9. PROPTECH & CO-WORKING (4 cases)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'housing-burn',
    startupName: 'Housing.com (Locon Solutions)',
    sector: 'Online Real Estate Search & 3D Verified Listings',
    geography: 'India (All Metros)',
    peakFundingUSD: '$125M+ (SoftBank, Nexus Venture Partners, Helion)',
    status: 'Distressed Acquisition',
    peakValuationOrBurn: 'Valuation $250M; sold to PropTiger for ~$70M in all-stock distress deal (2017)',
    primaryFailureMode: 'Reckless Multi-Million Dollar Hoarding Ad Spree & Founder-Board Civil War',
    fatalMetrics: {
      blendedCAC: '₹4,500 per property lead',
      averageOrderValue: '₹0 for basic users; attempted builder listing fees',
      contributionMargin: 'Negative; burned $120M with virtually zero meaningful operating revenue',
      burnRate: 'Burnt ₹20-25 Cr/month on "Look Up" national billboard and TV advertising campaign',
    },
    fatalStrategicFlaws: [
      'Hired thousands of photographers to map 3D floor plans for rental apartments where landlords had zero willingness to pay, while charging home seekers zero fees.',
      'Spent over ₹150 Cr on national billboard and helicopter marketing campaigns ("Look Up") before building an actual monetizable brokerage transaction engine.',
      'Public public-relations battles between CEO Rahul Yadav and institutional investors paralyzed executive decision-making.',
    ],
    founderAutopsyQuoteOrLesson:
      '3D photo technology and aesthetic UI cannot compensate for lack of monetization. Real estate in India is controlled by offline brokers who control the physical keys.',
    relevanceKeywords: ['real-estate', 'proptech', 'housing', 'listings', 'softbank', 'advertising'],
  },
  {
    id: 'commonfloor',
    startupName: 'CommonFloor (maxHeap Technologies)',
    sector: 'Real Estate Listings & Apartment Community Management',
    geography: 'India (18 Cities)',
    peakFundingUSD: '$65M (Tiger Global, Accel)',
    status: 'Distressed Acquisition',
    peakValuationOrBurn: 'Acquired by Quikr for ~$120M in stock (later written down to near-zero by Kinnevik)',
    primaryFailureMode: 'Broker Resistance & Quikr Distress Integration Write-Down',
    fatalMetrics: {
      blendedCAC: '₹2,800 per tenant lead',
      averageOrderValue: '₹15,000 builder marketing package',
      contributionMargin: 'Negative after high offline field sales force salaries',
      burnRate: '₹6 Cr/month burn during Quikr classifieds wars',
    },
    fatalStrategicFlaws: [
      'Apartment management tool (CommonFloor Groups) was offered for free to Resident Welfare Associations (RWAs) with high hosting and SMS costs, failing to cross-sell property sales.',
      'MagicBricks and 99acres locked up real estate developer marketing budgets with offline print newspaper bundles.',
    ],
    founderAutopsyQuoteOrLesson:
      'Community management software for apartments has low monetization potential; RWAs are notoriously unwilling to pay enterprise software fees.',
    relevanceKeywords: ['proptech', 'real-estate', 'quikr', 'apartments', 'listings', 'brokers'],
  },
  {
    id: 'stayabode',
    startupName: 'StayAbode',
    sector: 'Co-Living & Designer Shared Rentals',
    geography: 'India (Bengaluru)',
    peakFundingUSD: '$3M (Incubate Fund, Voyage Capital)',
    status: 'Distressed Acquisition',
    peakValuationOrBurn: 'Acquired by CP Ventures / NestAway after pandemic cash crunch',
    primaryFailureMode: 'High Interior Fit-Out Amortization & Complete Lockout During Pandemic',
    fatalMetrics: {
      blendedCAC: '₹8,000 per tenant onboarding',
      averageOrderValue: '₹14,000 monthly rent',
      contributionMargin: '-22% after landlord minimum guarantee rent and interior depreciation',
      burnRate: '₹75 Lakhs/month burn on empty properties in 2020',
    },
    fatalStrategicFlaws: [
      'Invested ₹1.5–2 Lakhs per room in aesthetic Scandinavian furniture fit-outs, planning to amortize costs over 3 years; tenants vacated within 7 months.',
      'Landlords refused to offer rent waivers when IT companies announced indefinite work-from-home, driving occupancy down to 25%.',
    ],
    founderAutopsyQuoteOrLesson:
      'Co-living fit-out capex creates a dangerous asset-liability mismatch: your lease to the landlord is fixed, but tenant revenue is completely volatile and discretionary.',
    relevanceKeywords: ['proptech', 'coliving', 'rentals', 'real-estate', 'fit-out', 'capex'],
  },
  {
    id: 'oyo-townhouse-distress',
    startupName: 'OYO Townhouse (Direct Lease Model)',
    sector: 'Budget Hotel Franchising & Corporate Leases',
    geography: 'India (All Major Cities)',
    peakFundingUSD: 'Backed by SoftBank ($3B+ total funding across parent)',
    status: 'Pivot After Near-Bankruptcy',
    peakValuationOrBurn: 'Valuation slashed from $10B to under $2.5B; terminated hundreds of minimum guarantee contracts',
    primaryFailureMode: 'Minimum Guarantee (MG) Payout Liabilities & Hotel Owner Rebellions',
    fatalMetrics: {
      blendedCAC: 'High consumer app discounting and Google hotel search ads',
      averageOrderValue: '₹1,400 per room night',
      contributionMargin: 'Severely negative when occupancy fell below 65% minimum guarantee threshold',
      burnRate: 'Lost over ₹3,000 Cr in a single fiscal year on leased properties',
    },
    fatalStrategicFlaws: [
      'Guaranteed fixed monthly rental payouts to hotel owners regardless of whether rooms were booked (Minimum Guarantee contracts); when occupancy fell, OYO owed crores in contractual damages.',
      'Hotel owners formed unions, locked out OYO guests, and filed hundreds of cheating cases when OYO revised payout terms unilaterally.',
    ],
    founderAutopsyQuoteOrLesson:
      'Never offer fixed minimum guarantees to supply partners in a cyclical demand industry unless you have long-term balance sheet reserves to absorb prolonged occupancy crashes.',
    relevanceKeywords: ['hospitality', 'hotels', 'oyo', 'softbank', 'minimum-guarantee', 'leases'],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // 10. SAAS, MARTECH & DEVELOPER TOOLS (4 cases)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'betaout',
    startupName: 'Betaout',
    sector: 'E-Commerce Marketing Automation & Customer Intelligence',
    geography: 'India & Southeast Asia',
    peakFundingUSD: '$2M (Beenext, Stanford Angels, Kunal Bahl)',
    status: 'Defunct',
    peakValuationOrBurn: 'Shut down operations in 2019',
    primaryFailureMode: 'High SMB Churn (7% Monthly) & Indian E-Commerce Merchant Cash Conservation',
    fatalMetrics: {
      blendedCAC: '$1,800 via outbound sales teams',
      averageOrderValue: '$199/month SaaS subscription',
      contributionMargin: '-40% after cloud compute and dedicated account managers',
      burnRate: 'Burnt seed/pre-Series A capital without achieving scalable net dollar retention',
    },
    fatalStrategicFlaws: [
      'Targeted Indian mid-market D2C and e-commerce stores whose own survival rate was under 30%; customer logo churn averaged 6-8% every month.',
      'Could not compete with global enterprise tools (Klaviyo, Clevertap, MoEngage) who raised 10x larger capital rounds and dominated enterprise tier.',
    ],
    founderAutopsyQuoteOrLesson:
      'Selling SaaS to early-stage Indian e-commerce merchants is grueling because customer churn is driven by their own company mortality, not your software bugs.',
    relevanceKeywords: ['saas', 'martech', 'ecommerce', 'b2b', 'automation', 'churn'],
  },
  {
    id: 'targetingmantra',
    startupName: 'TargetingMantra',
    sector: 'AI Personalization & Machine Learning Recommendation Engine',
    geography: 'India',
    peakFundingUSD: '$1.2M (500 Startups, Nexus Venture Partners)',
    status: 'Distressed Acquisition',
    peakValuationOrBurn: 'Acquired by Snapdeal in 2016 for proprietary IP',
    primaryFailureMode: 'Long Enterprise Proof-of-Concept Sales Cycles (9-12 Months) with Low Annual ACVs',
    fatalMetrics: {
      blendedCAC: '$12,000 per enterprise contract',
      averageOrderValue: '$18,000 Annual Contract Value (ACV)',
      contributionMargin: 'Barely break-even after AWS GPU training costs',
      burnRate: '₹40 Lakhs monthly burn with 10-month cash runway',
    },
    fatalStrategicFlaws: [
      'Enterprise retailers demanded 6-month free pilots and custom on-premise integrations, draining limited engineering resources with zero upfront revenue.',
      'E-commerce platforms built rudimentary recommendation widgets in-house rather than paying recurring software licenses.',
    ],
    founderAutopsyQuoteOrLesson:
      'Selling deep-tech AI algorithms to enterprises without an end-to-end self-serve application leads to endless custom pilot purgatory.',
    relevanceKeywords: ['saas', 'ai', 'personalization', 'enterprise', 'ml', 'snapdeal'],
  },
  {
    id: 'helpshift-early-pivot',
    startupName: 'Helpshift (Early Indian B2B Focus)',
    sector: 'In-App Customer Support & Conversational AI',
    geography: 'India to US Relocation',
    peakFundingUSD: '$38M (Cisco Investments, Intel Capital, Nexus)',
    status: 'Pivot After Near-Bankruptcy',
    peakValuationOrBurn: 'Survived by shutting Indian sales and moving headquarters to San Francisco',
    primaryFailureMode: 'Indian Enterprise Low Price-Realization & Long Purchase Approval Loops',
    fatalMetrics: {
      blendedCAC: '₹2.5 Lakhs per domestic client closed',
      averageOrderValue: '₹30,000/year for Indian apps vs $30,000/year for US gaming studios',
      contributionMargin: 'Negative in India; 80%+ gross margin in US market',
      burnRate: 'Burnt substantial early seed capital before pulling out of Indian sales',
    },
    fatalStrategicFlaws: [
      'Indian app founders expected unlimited white-glove customer support and engineering customizations for sub-₹5,000 monthly pricing.',
      'Founders realized that selling developer tools in India generates 1/10th the revenue for 3x the customer support headaches compared to US/European accounts.',
    ],
    founderAutopsyQuoteOrLesson:
      'If you build software with global utility, do not waste your limited startup runway trying to sell to Indian enterprises with depressed pricing power. Sell to US customers from Day 1.',
    relevanceKeywords: ['saas', 'support', 'b2b', 'developer-tools', 'cross-border', 'mobile'],
  },
  {
    id: 'wingify-vwo-pivot',
    startupName: 'Wingify / VWO (Early A/B Testing Pivot)',
    sector: 'Website Optimization & A/B Testing SaaS',
    geography: 'India (Global Customers)',
    peakFundingUSD: 'Zero (100% Bootstrapped to $30M+ ARR)',
    status: 'Pivot After Near-Bankruptcy',
    peakValuationOrBurn: 'Bootstrapped triumph after abandoning early failed concepts',
    primaryFailureMode: 'Early Attempt at B2C Products (Wingify early ideas) with Zero Monetization',
    fatalMetrics: {
      blendedCAC: '$0 (SEO & Content marketing inbound)',
      averageOrderValue: '$1,500 - $12,000 annual subscription',
      contributionMargin: '+88% pure software gross margins',
      burnRate: 'Zero; profitable from Month 1',
    },
    fatalStrategicFlaws: [
      'Founder Paras Chopra built 15+ micro consumer web apps that gained user curiosity but zero willingness to pay, before focusing exclusively on a single painful enterprise need: A/B testing for marketing managers.',
      'Refused to hire enterprise sales reps until organic self-serve credit card checkouts reached multi-million dollar annual run-rate.',
    ],
    founderAutopsyQuoteOrLesson:
      'Charge money from Day 1. If customers will not pull out a credit card to pay for your product, you do not have a business; you have a coding exercise.',
    relevanceKeywords: ['saas', 'bootstrapped', 'vwo', 'ab-testing', 'b2b', 'global'],
  },
  {
    id: 'fast-checkout-shutdown',
    startupName: 'Fast',
    sector: 'One-Click Checkout & Payments',
    geography: 'United States & Global',
    peakFundingUSD: '$124M (Stripe, Addition, Index Ventures)',
    status: 'Complete Shutdown',
    peakValuationOrBurn: 'Valuation $580M peak; burned $10M/month on just $600k annual revenue',
    primaryFailureMode: 'High Headcount Burn on Unscalable Merchant Integrations',
    fatalMetrics: {
      blendedCAC: '$5,000+ per merchant integration engineering cost',
      averageOrderValue: '1-2% fee on $50 ecommerce carts',
      contributionMargin: 'Deeply negative net revenue',
      burnRate: '$10M/month burn with 450+ employees for under $50k monthly revenue',
    },
    fatalStrategicFlaws: [
      'Spent millions on NASCAR sponsorships and celebrity branding while core product lacked basic checkout conversion lift over Shop Pay and Stripe Elements.',
      'Custom checkout buttons required bespoke integration for every merchant CMS, creating an engineering bottleneck that destroyed gross margins.',
    ],
    founderAutopsyQuoteOrLesson:
      'Hiring 400 people before validating software product-market fit or establishing repeatable distribution is guaranteed suicide.',
    relevanceKeywords: ['checkout', 'fintech', 'payments', 'stripe', 'burn', 'ecommerce'],
  },
  {
    id: 'quibi-mobile-streaming',
    startupName: 'Quibi',
    sector: 'Mobile-Only Premium Video Streaming',
    geography: 'United States',
    peakFundingUSD: '$1.75B (Disney, WarnerMedia, Sony, Alibaba)',
    status: 'Complete Shutdown',
    peakValuationOrBurn: 'Burned $1.75 Billion in 6 months of operation',
    primaryFailureMode: 'Artificial Mobile Constraints & Inability to Share Content on Social Media',
    fatalMetrics: {
      blendedCAC: '$50+ per paid subscriber',
      averageOrderValue: '$4.99 - $7.99 monthly subscription',
      contributionMargin: 'Negative due to $100k/minute Hollywood production budgets',
      burnRate: 'Over $100M monthly burn',
    },
    fatalStrategicFlaws: [
      'Banned users from taking screenshots or sharing video clips on Twitter/TikTok, killing viral organic distribution in an era dominated by social memes.',
      'Assumed commuters wanted 10-minute Hollywood videos, completely ignoring free short-form video competitors (YouTube, TikTok, Instagram Reels).',
    ],
    founderAutopsyQuoteOrLesson:
      'You cannot force consumer habits against the cultural grain with billion-dollar marketing budgets when free alternatives are objectively more engaging.',
    relevanceKeywords: ['media', 'streaming', 'content', 'video', 'mobile', 'entertainment'],
  },
  {
    id: 'convoy-freight-collapse',
    startupName: 'Convoy',
    sector: 'Digital Freight Brokerage & Trucking',
    geography: 'United States',
    peakFundingUSD: '$1.1B (Baillie Gifford, Generation IM, CapitalG, Jeff Bezos)',
    status: 'Complete Shutdown (Assets acquired by Flexport)',
    peakValuationOrBurn: 'Valuation $3.8B peak; shuttered during freight market downturn',
    primaryFailureMode: 'High Fixed Tech Overhead in Cyclical Commodity Freight Brokerage',
    fatalMetrics: {
      blendedCAC: 'High broker commission split',
      averageOrderValue: '$1,800 per long-haul freight load',
      contributionMargin: '< 3% net broker spread during freight recession',
      burnRate: '$15M+ monthly tech engineering and sales burn',
    },
    fatalStrategicFlaws: [
      'Built a massive Silicon Valley software engineering overhead for an industry whose underlying economics are governed by spot diesel prices and macro carrier capacity.',
      'When spot freight rates crashed 40% post-pandemic, transactional take-rates were insufficient to cover fixed technology debt and executive overhead.',
    ],
    founderAutopsyQuoteOrLesson:
      'In a low-margin commodity cyclical industry, you cannot carry a high-multiple software cost structure through a multi-year cyclical trough.',
    relevanceKeywords: ['freight', 'logistics', 'trucking', 'brokerage', 'b2b', 'transportation'],
  },
  {
    id: 'olive-ai-automation',
    startupName: 'Olive AI',
    sector: 'Healthcare Automation & Hospital RPA',
    geography: 'United States',
    peakFundingUSD: '$850M (Tiger Global, General Catalyst, Sequoia)',
    status: 'Complete Shutdown',
    peakValuationOrBurn: 'Valuation $4B peak; assets liquidated in parts',
    primaryFailureMode: 'Selling Brittle Bespoke RPA as Replicable Artificial Intelligence',
    fatalMetrics: {
      blendedCAC: '$150k+ enterprise hospital sales cycles lasting 18 months',
      averageOrderValue: '$300k annual contract value',
      contributionMargin: 'Negative gross margin due to massive human deployment teams fixing broken scrapers',
      burnRate: '$25M monthly burn across 1,400 employees',
    },
    fatalStrategicFlaws: [
      'Pitched autonomous AI to healthcare executives, but delivered fragile Robotic Process Automation (RPA) scripts that broke whenever hospital Electronic Health Record (EHR) portals updated their UI.',
      'Employed hundreds of engineers behind the scenes to manually maintain hospital scraping scripts, masking a services business as high-margin SaaS.',
    ],
    founderAutopsyQuoteOrLesson:
      'Do not disguise brittle custom service workflows as scalable enterprise AI. Customer churn and operational maintenance will compound exponentially.',
    relevanceKeywords: ['ai', 'healthtech', 'enterprise', 'rpa', 'saas', 'automation'],
  },
  {
    id: 'wework-lease-mismatch',
    startupName: 'WeWork',
    sector: 'Flexible Office Coworking & Real Estate',
    geography: 'Global & India',
    peakFundingUSD: '$12B+ (SoftBank Vision Fund)',
    status: 'Chapter 11 Bankruptcy Restructuring',
    peakValuationOrBurn: 'Valuation $47B peak collapsed to Chapter 11 bankruptcy filing',
    primaryFailureMode: 'Asset-Liability Duration Mismatch (15-Year Leases vs 30-Day Memberships)',
    fatalMetrics: {
      blendedCAC: '$4,000 per enterprise desk',
      averageOrderValue: '$450/month per hot-desk member',
      contributionMargin: 'Negative when factoring in rent escalation clauses',
      burnRate: '$2.5B+ annual operational cash burn',
    },
    fatalStrategicFlaws: [
      'Signed 10 to 15-year non-cancelable commercial building leases with landlords while offering 30-day flexible monthly memberships to freelancers and startups.',
      'Treated commercial office leasing as an asset-light tech platform deserving a 20x revenue multiple instead of a capital-intensive real estate operator.',
    ],
    founderAutopsyQuoteOrLesson:
      'Duration mismatch between long-term lease liabilities and short-term flexible revenue will trigger insolvency the moment macro occupancy dips.',
    relevanceKeywords: ['coworking', 'real-estate', 'proptech', 'leases', 'softbank', 'wework'],
  },
  {
    id: 'better-com-mortgage',
    startupName: 'Better.com',
    sector: 'Digital Mortgage & Online Home Financing',
    geography: 'United States',
    peakFundingUSD: '$900M+ (SoftBank, LVMH family office)',
    status: 'Severe Restructuring / Penny Stock SPAC',
    peakValuationOrBurn: 'Valuation $7.7B collapsed by 98% post-SPAC',
    primaryFailureMode: 'Total Reliance on Cyclical Zero-Rate Refinancing Tailwinds',
    fatalMetrics: {
      blendedCAC: 'Surged from $1,200 to $6,500+ as loan origination volumes fell',
      averageOrderValue: '1% loan origination fee',
      contributionMargin: 'Swung deeply negative when loan volumes dropped 85%',
      burnRate: 'Lost over $300M in a single fiscal quarter',
    },
    fatalStrategicFlaws: [
      'Mistook pandemic zero-interest rate mortgage refinancing euphoria for permanent structural platform disruption.',
      'Over-hired thousands of loan processors and software engineers at peak market conditions right before Federal Reserve interest rate hikes halted refi activity.',
    ],
    founderAutopsyQuoteOrLesson:
      'Never build a permanent fixed cost structure on the back of temporary macroeconomic tailwinds.',
    relevanceKeywords: ['fintech', 'mortgage', 'lending', 'interest-rates', 'spac'],
  },
  {
    id: 'casper-sleep-d2c',
    startupName: 'Casper',
    sector: 'D2C Bed-in-a-Box Mattress',
    geography: 'United States',
    peakFundingUSD: '$340M (Target, Lerer Hippeau, IVP)',
    status: 'Taken Private at Loss',
    peakValuationOrBurn: 'Valuation $1.1B peak; taken private by private equity at $286M',
    primaryFailureMode: 'High Paid Social Ad CAC & 100-Night Free Trial Return Abuse',
    fatalMetrics: {
      blendedCAC: '$310 per mattress sale on Google/Facebook Ads',
      averageOrderValue: '$850',
      contributionMargin: '< 5% after outbound bulky parcel delivery and return logistics',
      burnRate: '$90M+ annual marketing loss',
    },
    fatalStrategicFlaws: [
      'Offered 100-night risk-free trial where customers returned 15-20% of mattresses; legally, returned used mattresses could not be resold and had to be discarded.',
      'D2C mattress model had zero customer repeat frequency (consumers buy one mattress every 8-10 years), making lifetime value (LTV) equal to first-order value.',
    ],
    founderAutopsyQuoteOrLesson:
      'Selling a bulky physical product with zero customer repurchase frequency through rising Facebook ad auctions creates a mathematically impossible business model.',
    relevanceKeywords: ['d2c', 'ecommerce', 'consumer', 'mattress', 'returns', 'cac'],
  },
  {
    id: 'smiledirectclub-bankruptcy',
    startupName: 'SmileDirectClub',
    sector: 'Teledentistry & Direct-to-Consumer Clear Aligners',
    geography: 'United States & Global',
    peakFundingUSD: '$400M+ (Camelot Venture Group)',
    status: 'Chapter 7 Liquidation',
    peakValuationOrBurn: 'Valuation $8.9B IPO peak; bankrupt and liquidated in 2023',
    primaryFailureMode: 'State Dental Board Regulatory Warfare & In-House 3D Factory Debt',
    fatalMetrics: {
      blendedCAC: 'Surged to $900+ per patient due to aggressive television ad buys',
      averageOrderValue: '$1,950 total treatment cost',
      contributionMargin: 'Eroded by patient default rates on monthly installment plans',
      burnRate: 'Burnt $100M+ annually fighting state medical licensing boards',
    },
    fatalStrategicFlaws: [
      'Bypassed in-person orthodontist visits using remote impression kits, triggering nationwide lawsuits and regulatory injunctions from the American Association of Orthodontists.',
      'Financed customer treatments through an in-house installment book where high-risk consumer defaults exceeded 12%.',
    ],
    founderAutopsyQuoteOrLesson:
      'Attempting to disintermediate licensed medical gatekeepers without clinical consensus invites an insurmountable regulatory war of attrition.',
    relevanceKeywords: ['healthtech', 'dental', 'medical', 'regulatory', 'd2c', 'bankruptcy'],
  },
  {
    id: 'zume-pizza-robotics',
    startupName: 'Zume Pizza',
    sector: 'Automated Food Trucks & Kitchen Robotics',
    geography: 'United States',
    peakFundingUSD: '$445M (SoftBank Vision Fund)',
    status: 'Complete Shutdown',
    peakValuationOrBurn: 'Valuation $2.25B peak; liquidated in 2023',
    primaryFailureMode: 'Over-Engineered Kitchen Robotics Solving Non-Existent Problems',
    fatalMetrics: {
      blendedCAC: 'Over $60 per customer order',
      averageOrderValue: '$22 per pizza',
      contributionMargin: '-$35 per pie delivered due to automated truck maintenance',
      burnRate: 'Over $10M monthly burn',
    },
    fatalStrategicFlaws: [
      'Engineered robotic arms inside moving delivery vans to bake pizzas en route; trucks hitting potholes caused sauce and cheese to splatter across vehicle interiors.',
      'The capital expense of robotic maintenance and custom refrigeration vehicles was 10x higher than standard neighborhood pizzeria labor.',
    ],
    founderAutopsyQuoteOrLesson:
      'Automating a low-margin task with fragile, multi-million dollar robotics that require specialized technicians is negative unit economics disguised as innovation.',
    relevanceKeywords: ['robotics', 'foodtech', 'hardware', 'delivery', 'softbank'],
  },
  {
    id: 'juicero-hardware-debacle',
    startupName: 'Juicero',
    sector: 'Connected Cold-Pressed Juicing Hardware',
    geography: 'United States',
    peakFundingUSD: '$120M (Google Ventures, Kleiner Perkins, Campbell Soup)',
    status: 'Complete Shutdown',
    peakValuationOrBurn: 'Valuation $400M; closed within 16 months of product launch',
    primaryFailureMode: 'Product Superfluity Revealed: $400 Machine Displaced by Bare Hands',
    fatalMetrics: {
      blendedCAC: '$400+ per machine sale',
      averageOrderValue: '$399 machine + $5-8 recurring proprietary juice pouch',
      contributionMargin: 'Negative hardware margin before factoring in subscription pouches',
      burnRate: '$4M monthly burn',
    },
    fatalStrategicFlaws: [
      'Bloomberg published a viral video demonstrating that Juicero proprietary juice pouches could be squeezed just as quickly and effectively by hand without the $400 machine.',
      'Over-engineered a simple mechanical press with Wi-Fi, custom gearboxes, and QR-code scanners, pricing out mainstream consumers.',
    ],
    founderAutopsyQuoteOrLesson:
      'If your proprietary hardware device can be rendered redundant by two human hands, your business does not have an IP moat.',
    relevanceKeywords: ['hardware', 'iot', 'foodtech', 'consumer', 'debacle'],
  },
  {
    id: 'commonfloor-listing-monetization',
    startupName: 'CommonFloor',
    sector: 'Online Real Estate Search & Apartment Management',
    geography: 'India (Bangalore, Mumbai, NCR)',
    peakFundingUSD: '$63M (Tiger Global, Accel India)',
    status: 'Distressed Acquisition by Quikr',
    peakValuationOrBurn: 'Valuation $150M peak; acquired by Quikr for ~$120M in stock later written down to zero',
    primaryFailureMode: 'Broker Disintermediation & Real Estate Classifieds Price Wars',
    fatalMetrics: {
      blendedCAC: '₹2,500 per verified tenant/buyer lead',
      averageOrderValue: '₹5,000 builder listing subscription',
      contributionMargin: 'Negative due to massive field verification photographer payroll',
      burnRate: 'Burnt ₹15-20 Cr monthly competing against MagicBricks and 99acres',
    },
    fatalStrategicFlaws: [
      'Built a dominant apartment society management tool (CommonFloor Groups) but failed to monetize housing societies who refused to pay software fees.',
      'Property brokers used the portal to source free buyer phone numbers and systematically completed off-platform transactions without paying commissions.',
    ],
    founderAutopsyQuoteOrLesson:
      'Building utility features that residential communities love does not translate into transaction monetization if real estate brokers control final deal closing.',
    relevanceKeywords: ['proptech', 'real-estate', 'quikr', 'classifieds', 'housing'],
  },
  {
    id: 'taskbob-home-services',
    startupName: 'Taskbob',
    sector: 'On-Demand Home Services & Technician Aggregation',
    geography: 'India (Mumbai)',
    peakFundingUSD: '$5.7M (IvyCap Ventures, Orios Venture Partners)',
    status: 'Complete Shutdown',
    peakValuationOrBurn: 'Shuttered operations in 2017 after seed capital exhaustion',
    primaryFailureMode: 'High Technician Churn & Negative Unit Economics on Subsidized Jobs',
    fatalMetrics: {
      blendedCAC: '₹450 per first-time customer app booking',
      averageOrderValue: '₹300 for basic plumbing/electrical repair',
      contributionMargin: '-₹120 per service job after technician travel payout',
      burnRate: '₹1.5 Cr monthly burn',
    },
    fatalStrategicFlaws: [
      'Subsidized plumbing and electrical repair prices to compete with local unorganized neighborhood technicians.',
      'Technicians used the platform exclusively for initial lead discovery, then handed paper business cards to homeowners for future direct calls.',
    ],
    founderAutopsyQuoteOrLesson:
      'Low order-ticket home services cannot survive as an on-demand marketplace without charging high minimum service call fees.',
    relevanceKeywords: ['home-services', 'hyperlocal', 'marketplace', 'disintermediation'],
  },
  {
    id: 'zimmber-home-cleaning',
    startupName: 'Zimmber',
    sector: 'On-Demand Home Cleaning & AC Servicing',
    geography: 'India (Mumbai, Pune, Delhi NCR)',
    peakFundingUSD: '$7.5M (Inventus Capital, IDG Ventures)',
    status: 'Distressed Acquisition by Quikr',
    peakValuationOrBurn: 'Acquired by Quikr for $10M in stock',
    primaryFailureMode: 'Severe Quality Inconsistency & Worker Attrition',
    fatalMetrics: {
      blendedCAC: '₹600 per acquired household',
      averageOrderValue: '₹750 per deep cleaning visit',
      contributionMargin: '< 8% net platform take-rate',
      burnRate: '₹2 Cr monthly burn',
    },
    fatalStrategicFlaws: [
      'Relied on unvetted third-party service contractors who frequently showed up late or caused property damage, destroying customer repeat retention.',
      'Could not achieve standardized service quality without taking technicians onto direct payroll, which made unit economics completely unviable.',
    ],
    founderAutopsyQuoteOrLesson:
      'In home services, customer trust is binary. A single bad contractor experience permanently eliminates customer lifetime value.',
    relevanceKeywords: ['home-services', 'cleaning', 'operations', 'quality', 'quikr'],
  },
  {
    id: 'doormint-laundry-logistics',
    startupName: 'Doormint',
    sector: 'On-Demand Dry Cleaning & Wash-and-Fold Laundry',
    geography: 'India (Mumbai, Bangalore, Gurgaon)',
    peakFundingUSD: '$4M (Kalaari Capital, Helion Venture Partners)',
    status: 'Complete Shutdown',
    peakValuationOrBurn: 'Closed operations in 2016',
    primaryFailureMode: 'Two-Way Reverse Logistics Exceeded Laundry Washing Margin',
    fatalMetrics: {
      blendedCAC: '₹400 per app install order',
      averageOrderValue: '₹220 per laundry bag',
      contributionMargin: '-₹80 per order due to two two-way delivery bike trips (pickup + drop)',
      burnRate: '₹1.2 Cr monthly burn',
    },
    fatalStrategicFlaws: [
      'Each laundry transaction required two separate physical van/bike visits (one to collect dirty clothes, one to return clean garments), doubling logistics overhead.',
      'Local neighbourhood Dhobis operating on zero commercial real estate cost easily beat startup pricing with immediate door-to-door relationships.',
    ],
    founderAutopsyQuoteOrLesson:
      'Two-way reverse logistics on low-ticket daily commodity chores will mathematically annihilate your contribution margin.',
    relevanceKeywords: ['laundry', 'logistics', 'hyperlocal', 'reverse-logistics', 'kalaari'],
  },
  {
    id: 'localoye-leadgen-burn',
    startupName: 'LocalOye',
    sector: 'Local Services & Fitness Tutor Discovery',
    geography: 'India (Mumbai, Bangalore)',
    peakFundingUSD: '$5M (Tiger Global, Lightspeed India)',
    status: 'Complete Pivot / Shutdown',
    peakValuationOrBurn: 'Layoffs and shutdown after lead generation model failed',
    primaryFailureMode: 'Merchants Refused to Pay for Lead Notifications',
    fatalMetrics: {
      blendedCAC: '₹350 per customer enquiry',
      averageOrderValue: '₹150 per lead credit sold to service vendor',
      contributionMargin: 'Negative when factoring in merchant acquisition sales force',
      burnRate: '₹2.5 Cr monthly burn',
    },
    fatalStrategicFlaws: [
      'Sold contact leads to local yoga instructors and wedding photographers; when consumers failed to convert into paying clients, vendors demanded refunds.',
      'High churn among service professionals forced the startup to operate a massive tele-calling sales force that consumed all operational cash.',
    ],
    founderAutopsyQuoteOrLesson:
      'Service vendors will not pay for unverified customer leads. If you cannot guarantee transaction completion, vendors will treat lead fees as a tax.',
    relevanceKeywords: ['lead-gen', 'services', 'marketplace', 'tiger-global', 'local'],
  },
  {
    id: 'shopclues-tier2-discount',
    startupName: 'ShopClues',
    sector: 'Tier-2 Discount Marketplace & Wholesale E-Commerce',
    geography: 'India (Tier 2/3/4 Towns)',
    peakFundingUSD: '$140M (Tiger Global, GIC Singapore, Nexus Venture Partners)',
    status: 'Distressed Acquisition by Qoo10',
    peakValuationOrBurn: 'Valuation $1.1B peak; sold for under $70M in all-stock transaction',
    primaryFailureMode: 'High Return-to-Origin (RTO) Courier Losses on Low-AOV Cash on Delivery',
    fatalMetrics: {
      blendedCAC: '₹280 per customer order',
      averageOrderValue: '₹450',
      contributionMargin: '-₹65 per delivered parcel due to 35% COD rejection rate',
      burnRate: '₹30-40 Cr monthly burn at peak competition with Flipkart and Amazon',
    },
    fatalStrategicFlaws: [
      'Focused on ultra-low-ticket unbranded goods (₹99-₹399) shipped via Cash on Delivery to Tier-3 towns where 35% of shipments were rejected at the doorstep.',
      'Sellers uploaded counterfeit or inferior quality merchandise, leading to severe brand erosion and zero customer organic loyalty.',
    ],
    founderAutopsyQuoteOrLesson:
      'Low average order values combined with high Cash-on-Delivery return rates is a structural death spiral in Indian ecommerce.',
    relevanceKeywords: ['ecommerce', 'tier2', 'cod', 'rto', 'logistics', 'marketplace'],
  },
  {
    id: 'craftsvilla-ethnic-apparel',
    startupName: 'Craftsvilla',
    sector: 'Ethnic Handcrafted Apparel & Jewelry Marketplace',
    geography: 'India & NRI Exports',
    peakFundingUSD: '$54M (Sequoia Capital India, Nexus Venture Partners, Lightspeed)',
    status: 'Distressed Scale-Down',
    peakValuationOrBurn: 'Valuation $250M peak; business contracted by >90%',
    primaryFailureMode: '45% Return Rate on Non-Standardized Artisan Sizing',
    fatalMetrics: {
      blendedCAC: '₹650 per apparel purchase via Google Shopping & Meta Ads',
      averageOrderValue: '₹1,200',
      contributionMargin: 'Eroded by reverse logistics courier charges on returned sarees',
      burnRate: 'Burnt ₹15 Cr monthly scaling marketing before fixing catalog defects',
    },
    fatalStrategicFlaws: [
      'Ethnic unbranded apparel from small weavers had wide variances in color, stitch quality, and blouse sizing, resulting in massive customer return rates.',
      'Reverse shipping costs (₹120-₹180 per parcel) wiped out the entire merchant commission on returned orders.',
    ],
    founderAutopsyQuoteOrLesson:
      'In fashion e-commerce, catalog quality control and sizing standardization are life-and-death operational requirements, not back-office afterthoughts.',
    relevanceKeywords: ['fashion', 'ethnic', 'apparel', 'returns', 'marketplace', 'craftsvilla'],
  },
  {
    id: 'gomechanic-accounting-crisis',
    startupName: 'GoMechanic',
    sector: 'Car Servicing & Spare Parts Network',
    geography: 'India (Pan-India 40+ Cities)',
    peakFundingUSD: '$60M (Sequoia Capital India, Tiger Global, Chiratae)',
    status: 'Distressed Slump Sale (Acquired by Lifelong Group / Servizzy)',
    peakValuationOrBurn: 'Valuation $300M collapsed overnight following audit confessions',
    primaryFailureMode: 'Fictitious Partner Garages & Fabricated Revenue Accounting',
    fatalMetrics: {
      blendedCAC: '₹1,800 per car service booking',
      averageOrderValue: '₹3,500',
      contributionMargin: 'Artificially inflated through fraudulent internal billing entries',
      burnRate: 'Burnt ₹10-15 Cr monthly running un-audited company-owned workshops',
    },
    fatalStrategicFlaws: [
      'Founders fabricated financial statements and reported hundreds of non-existent partner garages to satisfy venture fund growth milestones during due diligence.',
      'Car owners found that partner garages lacked genuine OEM diagnostic scanners and skilled mechanics, resulting in recurring customer complaints.',
    ],
    founderAutopsyQuoteOrLesson:
      'Never fabricate operational vanity metrics or financial numbers to appease venture board members. Forensic audits will uncover reality and obliterate the enterprise.',
    relevanceKeywords: ['automotive', 'garage', 'fraud', 'accounting', 'sequoia', 'audit'],
  },
  {
    id: 'rivigo-relay-capex',
    startupName: 'Rivigo',
    sector: 'Relay Trucking Logistics & Fleet Management',
    geography: 'India (Pan-India Highways)',
    peakFundingUSD: '$280M (Warburg Pincus, Elevation Capital)',
    status: 'Asset Sale (B2B business acquired by Mahindra Logistics)',
    peakValuationOrBurn: 'Valuation $1.05B unicorn; sold trucking business in distress',
    primaryFailureMode: 'Massive Balance Sheet Debt from Purchasing Physical Trucks',
    fatalMetrics: {
      blendedCAC: 'Enterprise freight contracts',
      averageOrderValue: '₹35,000 per long-distance container trip',
      contributionMargin: '< 6% gross margin after paying truck EMIs and diesel bills',
      burnRate: 'Burnt ₹40-50 Cr monthly servicing fleet debt and idle driver payroll',
    },
    fatalStrategicFlaws: [
      'Purchased thousands of brand-new BharatBenz trucks directly onto company balance sheets using heavy bank debt, assuming relay driver handoffs would maximize utilization.',
      'When vehicle utilization dropped during economic slowdowns, fixed monthly truck loan repayments pushed the business into severe cash-flow insolvency.',
    ],
    founderAutopsyQuoteOrLesson:
      'Purchasing heavy capital equipment onto a startup balance sheet to prove an operational concept will bankrupt you when credit cycles turn.',
    relevanceKeywords: ['logistics', 'trucking', 'fleet', 'debt', 'capex', 'rivigo'],
  },
  {
    id: 'suprdaily-morning-milk',
    startupName: 'Supr Daily',
    sector: 'Daily Morning Milk & Micro-Grocery Delivery',
    geography: 'India (Mumbai, Pune, Bangalore)',
    peakFundingUSD: '$120M+ (Acquired by Swiggy; later scaled down/shuttered)',
    status: 'Complete Integration / Shuttered',
    peakValuationOrBurn: 'Swiggy absorbed customer base and closed standalone operations',
    primaryFailureMode: 'High Last-Mile Hub Costs on ₹80 Average Order Values',
    fatalMetrics: {
      blendedCAC: '₹350 per apartment subscriber',
      averageOrderValue: '₹65 (milk pouch + bread packet)',
      contributionMargin: '-₹14 per early morning doorstep drop',
      burnRate: 'Burnt ₹20-25 Cr monthly maintaining dark hubs and night delivery riders',
    },
    fatalStrategicFlaws: [
      'Attempted to build a pre-7 AM doorstep delivery network where 70% of customer orders consisted solely of milk packets with sub-3% wholesale margins.',
      'Dark store rent and midnight sorting labor costs could not be amortized without customers buying high-margin organic fruits and personal care products.',
    ],
    founderAutopsyQuoteOrLesson:
      'Doorstep delivery before 7 AM is operationally heroic, but economically disastrous if the customer only buys a packet of subsidized milk.',
    relevanceKeywords: ['milk', 'grocery', 'micro-delivery', 'swiggy', 'hyperlocal'],
  },
  {
    id: 'milkbasket-microdelivery',
    startupName: 'Milkbasket',
    sector: 'Subscription Milk & Daily Household Delivery',
    geography: 'India (NCR, Bangalore)',
    peakFundingUSD: '$38M (Unilever Ventures, Blume Ventures, Kalaari Capital)',
    status: 'Distressed Acquisition by Reliance Retail',
    peakValuationOrBurn: 'Acquired by Reliance at a discounted valuation in 2021',
    primaryFailureMode: 'Apartment Density Ceiling & Intense Competition from BigBasket',
    fatalMetrics: {
      blendedCAC: '₹400 per subscriber',
      averageOrderValue: '₹140',
      contributionMargin: '< 2% after packaging and apartment security drop costs',
      burnRate: 'Burnt ₹8-10 Cr monthly fighting BB Daily and Supr Daily',
    },
    fatalStrategicFlaws: [
      'Unit economics worked only in high-rise gated societies with >50 orders per tower; expanding into standalone residential layouts resulted in massive logistics losses.',
      'Well-capitalized conglomerates (Reliance, Tata/BigBasket) entered the space with deep pocket balance sheets, driving supplier procurement costs against them.',
    ],
    founderAutopsyQuoteOrLesson:
      'A micro-delivery model with razor-thin margins cannot withstand multi-front price wars against conglomerate balance sheets.',
    relevanceKeywords: ['micro-delivery', 'milk', 'reliance', 'grocery', 'blume'],
  },
  {
    id: 'doubtnut-freemium-trap',
    startupName: 'Doubtnut',
    sector: 'Instant Homework OCR & Doubt Solving EdTech',
    geography: 'India (Tier 2/3/4 Students)',
    peakFundingUSD: '$50M (SIG, Sequoia Capital India, Tencent, Omidyar)',
    status: 'Distressed Acquisition by Allen Career Institute',
    peakValuationOrBurn: 'Valuation $150M peak; acquired by Allen for ~$10M (90% valuation cut)',
    primaryFailureMode: 'The Freemium Trap: 0.5% Paid Conversion on Millions of MAUs',
    fatalMetrics: {
      blendedCAC: '₹15 per app download (hyper-viral photo math tool)',
      averageOrderValue: '₹1,500 annual course subscription',
      contributionMargin: 'Negative due to massive AWS cloud OCR image processing costs',
      burnRate: 'Burnt ₹5-8 Cr monthly serving 30M+ non-paying students',
    },
    fatalStrategicFlaws: [
      'Students used the free OCR camera tool to copy answers for homework, but categorically refused to purchase paid recorded or live tutoring courses.',
      'High server costs for video streaming and image recognition scaled linearly with traffic, while revenue remained essentially flat.',
    ],
    founderAutopsyQuoteOrLesson:
      'Millions of active users who love your free utility will evaporate the moment you ask them to enter credit card or UPI details.',
    relevanceKeywords: ['edtech', 'freemium', 'doubtnut', 'allen', 'ocr', 'tier2'],
  },
  {
    id: 'cuemath-offline-franchise',
    startupName: 'Cuemath',
    sector: 'Math Teaching Centers & Live Online Classes',
    geography: 'India, US, Middle East',
    peakFundingUSD: '$120M (Alphabet/CapitalG, Sequoia, Lightrock)',
    status: 'Downsized / Pivot Back to Offline',
    peakValuationOrBurn: 'Valuation $407M peak; major layoffs and restructuring',
    primaryFailureMode: 'Online Zoom Fatigue & Soaring Digital Customer Acquisition Costs',
    fatalMetrics: {
      blendedCAC: 'Surged from ₹4,000 to ₹18,000+ per student on US and Indian social ads',
      averageOrderValue: '₹25,000 annual math course fee',
      contributionMargin: 'Eroded by 50% teacher commission payouts and advertising costs',
      burnRate: 'Burnt ₹15-20 Cr monthly expanding international markets',
    },
    fatalStrategicFlaws: [
      'Dismantled successful neighborhood home-based learning centers during COVID to bet everything on live online 1-on-1 Zoom math tutoring.',
      'When schools reopened, parents canceled online subscriptions due to screen fatigue, leaving Cuemath with massive Google/Meta ad acquisition bills.',
    ],
    founderAutopsyQuoteOrLesson:
      'Do not abandon high-retention offline neighborhood distribution networks to chase capital-intensive online digital ads.',
    relevanceKeywords: ['edtech', 'math', 'franchise', 'zoom', 'cac', 'sequoia'],
  },
  {
    id: 'camp-k12-metaverse',
    startupName: 'Camp K12',
    sector: 'Kids Live Coding & VR/Metaverse Academy',
    geography: 'India, US, Middle East',
    peakFundingUSD: '$16M (Matrix Partners India, Elevation Capital)',
    status: 'Suspended Operations',
    peakValuationOrBurn: 'Shuttered active marketing and laid off workforce in 2023',
    primaryFailureMode: 'Post-Pandemic EdTech Demand Evaporation & Discretionary Budget Cuts',
    fatalMetrics: {
      blendedCAC: '$300+ per student on international digital channels',
      averageOrderValue: '$500 coding curriculum batch',
      contributionMargin: '< 15% after paying coding tutors and ad networks',
      burnRate: 'Burnt $1.5M monthly scaling US customer acquisition',
    },
    fatalStrategicFlaws: [
      'Pitched metaverse and VR coding classes for 8-year-olds; once schools returned to normal schedules, parents viewed coding as non-essential discretionary spending.',
      'Overseas customer acquisition costs on Meta and Google Ads doubled post-Apple iOS privacy updates (ATT), destroying campaign payback periods.',
    ],
    founderAutopsyQuoteOrLesson:
      'Selling non-curriculum discretionary skills to children is the very first expense parents eliminate during inflationary pressures.',
    relevanceKeywords: ['edtech', 'coding', 'metaverse', 'kids', 'matrix', 'elevation'],
  },
  {
    id: 'whitehat-jr-byjus-writedown',
    startupName: 'WhiteHat Jr',
    sector: '1-on-1 Coding for Elementary School Kids',
    geography: 'India, US, Global',
    peakFundingUSD: '$300M (Acquired by Byju\'s in cash)',
    status: 'Written Down to Zero / Shuttered',
    peakValuationOrBurn: 'Acquired for $300M cash in 2020; written down completely by Byju\'s',
    primaryFailureMode: 'Deceptive Advertising Claims & Massive 1-on-1 Tutor Payroll Overhead',
    fatalMetrics: {
      blendedCAC: '₹12,000+ per student via aggressive celebrity advertising campaigns',
      averageOrderValue: '₹35,000 for multi-month coding bundle',
      contributionMargin: 'Negative when factoring in refund chargebacks and tutor minimum hourly guarantees',
      burnRate: 'Burnt $15-20M monthly inside Byju\'s corporate structure',
    },
    fatalStrategicFlaws: [
      'Promoted false advertising campaigns promising elementary school students would get multi-crore software engineering jobs at Google, causing severe public backlash and regulatory censures by ASCI.',
      '1-on-1 tutoring models cannot scale profitably because teacher salaries grow linearly with student enrollment, eliminating software margin leverage.',
    ],
    founderAutopsyQuoteOrLesson:
      'Aggressive deceptive marketing can manufacture rapid initial top-line sales, but product reality and customer refunds will inevitably destroy the brand.',
    relevanceKeywords: ['edtech', 'byjus', 'coding', 'advertising', 'asci', 'writedown'],
  },
  {
    id: 'toppr-telesales-churn',
    startupName: 'Toppr',
    sector: 'K-12 After-School Learning & Exam Prep',
    geography: 'India (Pan-India)',
    peakFundingUSD: '$110M (SAIF Partners/Elevation, Kaizenvest, Helion)',
    status: 'Acquired and Dismantled by Byju\'s',
    peakValuationOrBurn: 'Valuation $150M; merged into Byju\'s and staff laid off',
    primaryFailureMode: 'Telesales High-Pressure Mis-Selling & Customer Refund Backlash',
    fatalMetrics: {
      blendedCAC: '₹8,000 per field sales closed deal',
      averageOrderValue: '₹20,000 annual tablet/app package',
      contributionMargin: '< 10% after sales commissions and tablet hardware costs',
      burnRate: 'Burnt ₹15-20 Cr monthly fielding 2,000+ sales telecallers',
    },
    fatalStrategicFlaws: [
      'Built an army of aggressive telecallers who pressured lower-middle-class parents into taking non-cancelable NBFC loans to purchase app subscriptions.',
      'Course completion rates were below 6%, leading to high default rates on education loans and widespread consumer forum complaints.',
    ],
    founderAutopsyQuoteOrLesson:
      'Relying on predatory field sales to push complex digital subscriptions to unready consumers generates short-term revenue at the cost of catastrophic customer trust erosion.',
    relevanceKeywords: ['edtech', 'telesales', 'byjus', 'refunds', 'nbfc', 'elevation'],
  },
  {
    id: 'bharatpe-12percent-p2p',
    startupName: 'BharatPe (12% Club & PostPe)',
    sector: 'Merchant QR Payments, P2P Lending & BNPL',
    geography: 'India (Pan-India Merchants)',
    peakFundingUSD: '$650M (Tiger Global, Dragoneer, Ribbit Capital, Insight Partners)',
    status: 'Severe Restructuring & Regulatory Pivot',
    peakValuationOrBurn: 'Valuation $2.85B peak; corporate governance overhaul and RBI crackdown on P2P lending',
    primaryFailureMode: 'RBI Tightening of P2P Credit Rails & Co-Branded Card Prohibitions',
    fatalMetrics: {
      blendedCAC: '₹120 per merchant QR deployment',
      averageOrderValue: 'Zero fee merchant QR transactions',
      contributionMargin: 'Relied entirely on P2P spread (12% Club) and BNPL interchange',
      burnRate: 'Burnt ₹40-50 Cr monthly subsidizing merchant cashback and IPL sponsorships',
    },
    fatalStrategicFlaws: [
      'Offered 12% guaranteed annual returns to consumers via P2P lending partner LenDenClub, which the Reserve Bank of India later flagged and curtailed under non-bank deposit rules.',
      'Subsidized UPI merchant QR codes at 0% MDR with no software subscription revenue, creating total dependence on regulatory-sensitive credit arbitrage.',
    ],
    founderAutopsyQuoteOrLesson:
      'Building a business model that relies on regulatory arbitrage around banking credit or deposit taking will eventually face severe central bank intervention.',
    relevanceKeywords: ['fintech', 'p2p', 'rbi', 'lending', 'bnpl', 'bharatpe'],
  },
  {
    id: 'niyo-sbm-regulatory-shock',
    startupName: 'Niyo Solutions',
    sector: 'Consumer Neobanking & Zero-Markup Forex Cards',
    geography: 'India (International Travelers & Students)',
    peakFundingUSD: '$132M (Accel, Lightrock, Horizons Ventures)',
    status: 'Pivot & Dual-Bank Diversification',
    peakValuationOrBurn: 'Valuation $500M peak; growth stalled after RBI action against partner bank',
    primaryFailureMode: 'Single-Partner Banking Vulnerability: RBI SBM Bank India Sanctions',
    fatalMetrics: {
      blendedCAC: '₹800 per active international traveler card',
      averageOrderValue: '₹45,000 seasonal forex card spend',
      contributionMargin: '+0.5% interchange and cross-selling travel insurance',
      burnRate: '₹10 Cr monthly burn maintaining app infrastructure',
    },
    fatalStrategicFlaws: [
      'Relied almost exclusively on State Bank of Mauritius (SBM Bank India) to issue zero-forex debit cards; in Jan 2023, RBI abruptly halted all SBM India outward remittances under LRS.',
      'Tens of thousands of Indian students and travelers stranded overseas found their Niyo cards blocked overnight, triggering massive customer support panic and brand damage.',
    ],
    founderAutopsyQuoteOrLesson:
      'In neobanking, partnering with a single banking sponsor is an existential single point of failure. You must build multi-bank redundancy from Day 1.',
    relevanceKeywords: ['neobank', 'rbi', 'forex', 'cards', 'accel', 'fintech'],
  },
  {
    id: 'fi-jupiter-fldg-curb',
    startupName: 'Fi & Jupiter',
    sector: 'Consumer Neobanks & Smart Savings Accounts',
    geography: 'India (Salaried Millennial Workers)',
    peakFundingUSD: '$160M+ (Peak XV, Tiger Global, Matrix, QED)',
    status: 'Active / Pivot to NBFC Licensing',
    peakValuationOrBurn: 'Valuations $300M-$700M; growth slowed following RBI digital lending master directions',
    primaryFailureMode: 'RBI Ban on First Loss Default Guarantees (FLDG) & Prepaid Credit Cards',
    fatalMetrics: {
      blendedCAC: '₹1,200 per KYC verified bank account opener',
      averageOrderValue: '₹15,000 average monthly savings balance',
      contributionMargin: 'Near-zero net interest margin share from partner Federal Bank',
      burnRate: 'Burnt ₹20-30 Cr monthly offering free debit cards and rewards',
    },
    fatalStrategicFlaws: [
      'Neobanks acquired salaried users with free metal debit cards and rewards, hoping to monetize by issuing instant credit lines through partner NBFCs.',
      'RBI issued digital lending master directions prohibiting synthetic credit lines on prepaid cards and severely capping First Loss Default Guarantees (FLDG) to 5%.',
    ],
    founderAutopsyQuoteOrLesson:
      'Customer acquisition in consumer fintech is extremely expensive. If your primary path to monetization (unsecured lending) is restricted by regulators, your unit economics collapse.',
    relevanceKeywords: ['neobank', 'fldg', 'rbi', 'savings', 'fintech', 'peak-xv'],
  },
  {
    id: 'lazypay-simpl-bnpl-friction',
    startupName: 'Simpl & LazyPay',
    sector: 'One-Click Checkout BNPL & Pay Later Credit',
    geography: 'India (Tier-1 E-Commerce Shoppers)',
    peakFundingUSD: '$200M+ (PayU, Valar Ventures, IA Ventures)',
    status: 'Restructuring / High NPA Write-Offs',
    peakValuationOrBurn: 'Valuation $450M peak; major job cuts and merchant friction',
    primaryFailureMode: 'Subprime Defaults on 15-Day Unsecured Micro-Credit & Merchant MDR Pushback',
    fatalMetrics: {
      blendedCAC: '₹180 per checkout user',
      averageOrderValue: '₹350 per Zomato/Zepto food delivery order',
      contributionMargin: '< 0.8% merchant discount rate (MDR)',
      burnRate: 'High credit loss provisions exceeding 3-4% of total transaction value',
    },
    fatalStrategicFlaws: [
      'Offered frictionless 1-tap checkout credit with zero KYC for orders under ₹1,500; young consumers defaulted on small bills because recovery costs exceeded loan balances.',
      'Merchant partners (Zomato, Swiggy, Zepto) pushed back aggressively against paying 1.5% merchant discount rates (MDR) once UPI credit cards emerged as a free alternative.',
    ],
    founderAutopsyQuoteOrLesson:
      'Unsecured micro-credit with no underwriting friction will attract serial defaulters who treat small BNPL balances as disposable free money.',
    relevanceKeywords: ['bnpl', 'fintech', 'credit', 'npa', 'zomato', 'simpl'],
  },
  {
    id: 'babajob-bluecollar-quikr',
    startupName: 'Babajob',
    sector: 'Blue-Collar Job Search & SMS Matching',
    geography: 'India (Bangalore, Chennai, Mumbai)',
    peakFundingUSD: '$10M (SEEK Ltd, Vinod Khosla)',
    status: 'Acquired in Distress by Quikr',
    peakValuationOrBurn: 'Acquired by Quikr in 2017 after monetization stalled',
    primaryFailureMode: 'Employers Refused to Pay for Unverified Blue-Collar Resumes',
    fatalMetrics: {
      blendedCAC: '₹40 per job seeker via IVR and miss-call campaigns',
      averageOrderValue: '₹500 employer listing fee',
      contributionMargin: 'Negative due to massive telecalling verification costs',
      burnRate: 'Burnt ₹1-2 Cr monthly',
    },
    fatalStrategicFlaws: [
      'Employers (households hiring maids, drivers, cooks) expected 100% attendance and criminal verification, which an automated SMS portal could not guarantee.',
      'Job seekers frequently took job offers and failed to show up on Day 1, leading frustrated employers to demand full subscription refunds.',
    ],
    founderAutopsyQuoteOrLesson:
      'In blue-collar staffing, matching software is only 10% of the value; reliability, identity vetting, and physical interview attendance are the entire product.',
    relevanceKeywords: ['hrtech', 'bluecollar', 'jobs', 'quikr', 'marketplace'],
  },
  {
    id: 'yebhi-cod-rto-losses',
    startupName: 'Yebhi',
    sector: 'Early Multi-Brand Fashion E-Commerce',
    geography: 'India (Tier 1/2 Cities)',
    peakFundingUSD: '$30M (Qualcomm Ventures, Nexus Venture Partners, Fidelity)',
    status: 'Complete Shutdown',
    peakValuationOrBurn: 'Liquidated in 2014 after capital depletion',
    primaryFailureMode: '60% Cash-on-Delivery Refusal Rates & Courier Returns',
    fatalMetrics: {
      blendedCAC: '₹600 per order',
      averageOrderValue: '₹900',
      contributionMargin: '-₹180 per shipment due to forward and reverse courier freight charges',
      burnRate: 'Burnt ₹5 Cr monthly on inventory warehouses',
    },
    fatalStrategicFlaws: [
      'Pioneered Cash on Delivery for footwear and lifestyle goods before consumers were culturally committed to digital purchases, resulting in massive doorstep package rejections.',
      'Carried heavy company-owned warehouse inventory that had to be liquidated at 70% discount when seasonal fashion cycles ended.',
    ],
    founderAutopsyQuoteOrLesson:
      'Inventory-heavy retail combined with uncommitted Cash-on-Delivery consumers will bankrupt any e-commerce company faster than sales can grow.',
    relevanceKeywords: ['ecommerce', 'fashion', 'cod', 'inventory', 'yebhi'],
  },
  {
    id: 'fashionara-luxury-discounts',
    startupName: 'Fashionara',
    sector: 'Curated Flash Sales & Premium Western Fashion',
    geography: 'India (Urban Metros)',
    peakFundingUSD: '$8M (Lightspeed Venture Partners, Helion)',
    status: 'Complete Shutdown',
    peakValuationOrBurn: 'Closed operations in 2016',
    primaryFailureMode: 'Heavy Flash-Sale Discounting Eroded Premium Brand Relationships',
    fatalMetrics: {
      blendedCAC: '₹850 per fashion customer',
      averageOrderValue: '₹1,400',
      contributionMargin: '< 3% after 50-70% clearance sale discounts',
      burnRate: 'Burnt ₹2 Cr monthly maintaining premium photo studios and logistics',
    },
    fatalStrategicFlaws: [
      'Attempted to build a premium fashion destination but trained customers to purchase only when clearance items were marked down by 60% or more.',
      'Premium apparel brands pulled inventory from the platform to protect their physical retail pricing power from predatory online discounting.',
    ],
    founderAutopsyQuoteOrLesson:
      'If your entire value proposition is discounting other people\'s luxury brands, you do not have brand equity; you are an unviable clearance outlet.',
    relevanceKeywords: ['fashion', 'ecommerce', 'luxury', 'discount', 'lightspeed'],
  },
  {
    id: 'askmebazaar-merchant-subsidies',
    startupName: 'AskMeBazaar',
    sector: 'Zero-Commission Hyperlocal E-Commerce',
    geography: 'India (Pan-India 70+ Cities)',
    peakFundingUSD: '$300M+ (Astro Holdings Malaysia)',
    status: 'Sudden Complete Shutdown & Legal Chaos',
    peakValuationOrBurn: 'Abruptly shuttered in 2016 leaving thousands of unpaid vendor dues',
    primaryFailureMode: 'Predatory Merchant Payout Subsidies Exceeded Underlying GMV',
    fatalMetrics: {
      blendedCAC: '₹1,500 per customer through lavish TV and billboard advertising',
      averageOrderValue: '₹800',
      contributionMargin: '-₹250 per transaction due to free delivery and merchant cashback subsidies',
      burnRate: 'Burnt ₹40-60 Cr monthly with 4,000+ employees',
    },
    fatalStrategicFlaws: [
      'Paid merchants cash subsidies on every processed transaction to manufacture artificial GMV growth, resulting in merchants creating fake orders to pocket platform subsidies.',
      'Lead investor Astro cut off funding abruptly when audits revealed the business had zero organic unit retention or genuine customer demand.',
    ],
    founderAutopsyQuoteOrLesson:
      'Subsidizing both the buyer and the seller simultaneously invites systemic fraud from unvetted merchants who will game your incentive payouts.',
    relevanceKeywords: ['ecommerce', 'subsidies', 'fraud', 'gmv', 'burn', 'marketplace'],
  },
  {
    id: 'trell-social-commerce',
    startupName: 'Trell',
    sector: 'Lifestyle Video & Social Commerce',
    geography: 'India (Tier-2/3 Vernacular Users)',
    peakFundingUSD: '$60M (Mirae Asset, KTB Network, Sequoia Surge)',
    status: 'Corporate Restructuring / Severe Downsizing',
    peakValuationOrBurn: 'Valuation $120M peak; investigated for financial irregularities and downsized',
    primaryFailureMode: 'High Influencer Video Production Burn vs Negligible Checkout GMV',
    fatalMetrics: {
      blendedCAC: '₹25 per video viewer app install',
      averageOrderValue: '₹350 for beauty/cosmetics checkout',
      contributionMargin: 'Negative due to massive creator guaranteed monthly payouts',
      burnRate: 'Burnt ₹15-20 Cr monthly paying lifestyle influencers',
    },
    fatalStrategicFlaws: [
      'Paid tens of millions of rupees to beauty and lifestyle creators to upload video reviews, but users consumed the videos for free entertainment and bought nothing.',
      'When users did want to purchase makeup or skincare products, they checked prices on Amazon, Nykaa, or Purplle where delivery speeds were faster and prices cheaper.',
    ],
    founderAutopsyQuoteOrLesson:
      'Video engagement does not automatically translate into e-commerce checkout intent. Users do not want to mix passive social entertainment with transactional buying.',
    relevanceKeywords: ['social-commerce', 'video', 'influencer', 'vernacular', 'ecommerce'],
  },
];

/**
 * Retrieves the most relevant startup autopsies based on business model and sector.
 * Intelligently matches against all 100+ cases and ranks by domain overlap.
 */
export function getRelevantStartupAutopsies(idea: string, sectorHint?: string): StartupAutopsy[] {
  const normalized = `${idea} ${sectorHint || ''}`.toLowerCase();
  const scored = STARTUP_POST_MORTEMS.map((autopsy) => {
    let score = 0;
    for (const kw of autopsy.relevanceKeywords) {
      if (normalized.includes(kw)) score += 3;
    }
    // Boost sector matches
    if (normalized.includes(autopsy.sector.toLowerCase())) score += 5;
    return { autopsy, score };
  });

  scored.sort((a, b) => b.score - a.score);

  // Return top 4 most relevant autopsies
  const selected = scored.filter((s) => s.score > 0).slice(0, 4).map((s) => s.autopsy);
  if (selected.length < 2) {
    return STARTUP_POST_MORTEMS.slice(0, 4);
  }
  return selected;
}

/**
 * Formats startup autopsies into high-density prompt text for the Adversarial Red-Team agent.
 */
export function formatStartupAutopsyContext(autopsies: StartupAutopsy[]): string {
  if (!autopsies || autopsies.length === 0) return '';

  return `
--- HISTORICAL STARTUP AUTOPSIES & FAILURE PRECEDENTS ---
Analyze the founder's business model against these historical startup autopsies that attempted similar operational, logistical, or monetization models in the Indian ecosystem and failed or pivoted under severe distress.

${autopsies
  .map(
    (a, idx) => `
[Autopsy Case ${idx + 1}: ${a.startupName} (${a.sector} - ${a.geography})]
- Peak Funding & Status: ${a.peakFundingUSD} | ${a.status} (${a.peakValuationOrBurn})
- Primary Fatal Failure Mode: ${a.primaryFailureMode}
- Fatal Unit Metrics: CAC=${a.fatalMetrics.blendedCAC} | AOV=${a.fatalMetrics.averageOrderValue} | Contribution Margin=${a.fatalMetrics.contributionMargin} | Burn=${a.fatalMetrics.burnRate}
- Critical Strategic Flaws:
${a.fatalStrategicFlaws.map((f) => `  * ${f}`).join('\n')}
- Core Historical Autopsy Lesson: "${a.founderAutopsyQuoteOrLesson}"
`
  )
  .join('\n')}
---------------------------------------------------------
`.trim();
}
