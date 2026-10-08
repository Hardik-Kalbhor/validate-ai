import { z } from 'zod';

const RegulatoryIssueSchema = z.object({
  title: z.string(),
  description: z.string(),
  severity: z.enum(['info', 'warning', 'critical', 'blocker']),
  regulation_name: z.string(),
  governing_body: z.string(),
  action_required: z.string(),
  estimated_cost_inr: z.number().nullable(),
  estimated_timeline_weeks: z.number().nullable(),
});

const LicenseRequirementSchema = z.object({
  license_name: z.string(),
  mandatory: z.boolean(),
  governing_body: z.string(),
  typical_timeline_weeks: z.number(),
  typical_cost_inr: z.number().nullable(),
  notes: z.string(),
});

export const NicheLegalChallengeSchema = z.object({
  title: z.string(),
  niche_context: z.string(), // Why this specific business niche faces this distinct legal challenge
  legal_precedent_or_statute: z.string(), // Exact Indian act, rule, circular, or court precedent
  severity: z.enum(['info', 'warning', 'critical', 'blocker']),
  operational_impact: z.string(), // Real-world operational consequence (e.g. frozen payouts, criminal liability, RWA bans)
  mitigation_strategy: z.string(), // Step-by-step operational / technical / legal defense
  contractual_safeguards: z.array(z.string()).min(1).max(5), // Specific clauses needed in founder's vendor/customer agreements
});

export const LegalRegulatorySchema = z.object({
  // Overall compliance posture
  compliance_complexity: z.enum(['low', 'medium', 'high', 'very_high']),
  compliance_score: z.number().min(0).max(100), // Higher = lower compliance burden
  is_regulated_sector: z.boolean(),
  has_blocker_issues: z.boolean(),

  // Recommended legal entity
  recommended_entity: z.enum(['pvt_ltd', 'llp', 'opc', 'proprietorship', 'partnership']),
  entity_rationale: z.string(),

  // Sector classification
  detected_sectors: z.array(z.string()).min(1).max(5),
  applicable_regulations: z.array(z.string()).min(1).max(10),

  // ── 65% PRIMARY FOCUS: Business Niche-Specific Legal Challenges & Liability Traps ──
  niche_legal_challenges: z.array(NicheLegalChallengeSchema).default([]),

  // Issues (statutory & regulatory)
  regulatory_issues: z.array(RegulatoryIssueSchema).min(2).max(10),

  // Licenses needed
  required_licenses: z.array(LicenseRequirementSchema).min(0).max(6),

  // Data & privacy
  data_privacy: z.object({
    is_data_fiduciary: z.boolean(),
    handles_children_data: z.boolean(),
    cross_border_transfer: z.boolean(),
    dpdp_obligations: z.array(z.string()).min(1).max(6),
  }),

  // Intellectual property
  ip_recommendations: z.object({
    trademark_urgency: z.enum(['immediate', 'within_6_months', 'low_priority']),
    patent_potential: z.boolean(),
    trademark_classes: z.array(z.number()).min(1).max(5),
    ip_risks: z.array(z.string()).min(1).max(4),
  }),

  // Tax
  tax_overview: z.object({
    gst_rate_percent: z.number().nullable(),
    gst_registration_required: z.boolean(),
    startup_india_eligible: z.boolean(),
    tax_notes: z.string(),
  }),

  // Summary
  legal_executive_summary: z.string(),
  immediate_action_items: z.array(z.string()).min(2).max(6),
  estimated_compliance_setup_cost_inr: z.number(),
});

export type LegalRegulatory = z.infer<typeof LegalRegulatorySchema>;
export type RegulatoryIssue = z.infer<typeof RegulatoryIssueSchema>;
export type LicenseRequirement = z.infer<typeof LicenseRequirementSchema>;
export type NicheLegalChallenge = z.infer<typeof NicheLegalChallengeSchema>;
