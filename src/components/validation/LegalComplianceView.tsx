'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  AlertTriangle,
  ShieldCheck,
  ShieldAlert,
  Building2,
  Fingerprint,
  Scale,
  BadgeIndianRupee,
  Tag,
  Info,
  Gavel,
  FileCheck2,
  ScrollText,
} from 'lucide-react';
import type { LegalRegulatory } from '@/schemas/legal-regulatory.schema';

interface Props { data: LegalRegulatory }

const complexityConfig = {
  low:       { label: 'Low Complexity',      color: 'text-green-600',  bg: 'bg-green-50 border-green-200' },
  medium:    { label: 'Medium Complexity',   color: 'text-amber-600',  bg: 'bg-amber-50 border-amber-200' },
  high:      { label: 'High Complexity',     color: 'text-orange-600', bg: 'bg-orange-50 border-orange-200' },
  very_high: { label: 'Very High Complexity',color: 'text-red-600',    bg: 'bg-red-50 border-red-200' },
};

const entityLabels: Record<string, string> = {
  pvt_ltd:        'Private Limited Company',
  llp:            'Limited Liability Partnership',
  opc:            'One Person Company',
  proprietorship: 'Sole Proprietorship',
  partnership:    'Partnership Firm',
};

const severityConfig = {
  info:     { variant: 'outline' as const,      icon: Info,          color: 'text-blue-500' },
  warning:  { variant: 'secondary' as const,    icon: AlertTriangle, color: 'text-amber-500' },
  critical: { variant: 'default' as const,      icon: ShieldAlert,   color: 'text-orange-600' },
  blocker:  { variant: 'destructive' as const,  icon: ShieldAlert,   color: 'text-red-600' },
};

const urgencyConfig = {
  immediate:        { label: 'File Immediately',   className: 'bg-red-100 text-red-800 border-red-300' },
  within_6_months:  { label: 'Within 6 months',    className: 'bg-amber-100 text-amber-800 border-amber-300' },
  low_priority:     { label: 'Low Priority',        className: 'bg-green-100 text-green-800 border-green-300' },
};

export function LegalComplianceView({ data }: Props) {
  const complexity = complexityConfig[data.compliance_complexity] || complexityConfig.medium;
  const nicheChallenges = data.niche_legal_challenges || [];

  return (
    <div className="space-y-6">
      {/* Blocker Alert */}
      {data.has_blocker_issues && (
        <Alert variant="destructive">
          <ShieldAlert className="h-4 w-4" />
          <AlertTitle>⚠️ Blocker Issues Detected</AlertTitle>
          <AlertDescription>
            This business idea has one or more regulatory blockers that must be resolved before the business can legally operate in India.
            Review the issues below immediately.
          </AlertDescription>
        </Alert>
      )}

      {/* Compliance Overview */}
      <Card>
        <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="text-center md:text-left">
            <span className={`inline-block px-4 py-1.5 rounded-full border text-sm font-semibold ${complexity.bg} ${complexity.color}`}>
              {complexity.label}
            </span>
            <div className="mt-3">
              <p className="text-4xl font-bold">{data.compliance_score}<span className="text-xl text-muted-foreground">/100</span></p>
              <p className="text-xs text-muted-foreground">Compliance Score <span className="italic">(higher = lower burden)</span></p>
            </div>
            <Progress value={data.compliance_score} className="mt-2 w-32" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/10 text-[11px] font-semibold">
                65% Business Niche Focus
              </Badge>
              <Badge variant="outline" className="text-[11px] text-muted-foreground">
                35% Baseline Licenses &amp; Registrations
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{data.legal_executive_summary}</p>
          </div>
        </CardContent>
      </Card>

      {/* Sectors & Entity Recommendation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2"><Scale className="h-4 w-4" /> Detected Business Sectors</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {data.detected_sectors.map((s) => (
              <Badge key={s} variant="secondary" className="capitalize">{s.replace(/_/g, ' ')}</Badge>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2"><Building2 className="h-4 w-4" /> Recommended Legal Entity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold text-sm">{entityLabels[data.recommended_entity] ?? data.recommended_entity}</p>
            <p className="text-xs text-muted-foreground mt-1">{data.entity_rationale}</p>
          </CardContent>
        </Card>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* ── 65% PRIMARY FOCUS: Business Niche Legal Challenges ─────── */}
      {/* ───────────────────────────────────────────────────────────── */}
      {nicheChallenges.length > 0 && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b">
            <div className="flex items-center gap-2">
              <Gavel className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-bold text-base tracking-tight text-foreground">
                  Business Niche Legal Challenges &amp; Liability Traps
                </h3>
                <p className="text-xs text-muted-foreground">
                  High-stakes operational minefields, liability chains, and dispute scenarios unique to this specific business model.
                </p>
              </div>
            </div>
            <Badge className="bg-primary text-primary-foreground font-semibold text-[11px] px-2.5 py-0.5 self-start sm:self-auto shadow-sm">
              65% Output Weight
            </Badge>
          </div>

          <div className="space-y-3.5">
            {nicheChallenges.map((challenge, i) => {
              const cfg = severityConfig[challenge.severity] || severityConfig.warning;
              const SeverityIcon = cfg.icon;
              return (
                <Card
                  key={i}
                  className={`overflow-hidden border transition-all ${
                    challenge.severity === 'blocker'
                      ? 'border-red-500/50 bg-red-500/[0.015]'
                      : challenge.severity === 'critical'
                      ? 'border-orange-500/40 bg-orange-500/[0.015]'
                      : 'border-border/80'
                  }`}
                >
                  <div
                    className={`h-1 w-full ${
                      challenge.severity === 'blocker'
                        ? 'bg-red-500'
                        : challenge.severity === 'critical'
                        ? 'bg-orange-500'
                        : 'bg-amber-500'
                    }`}
                  />
                  <CardContent className="p-4 sm:p-5 space-y-3 text-sm">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <SeverityIcon className={`h-4 w-4 mt-0.5 flex-shrink-0 ${cfg.color}`} />
                        <div>
                          <h4 className="font-semibold text-sm leading-tight text-foreground">{challenge.title}</h4>
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground mt-0.5">
                            📜 <span>{challenge.legal_precedent_or_statute}</span>
                          </span>
                        </div>
                      </div>
                      <Badge variant={cfg.variant} className="capitalize flex-shrink-0 text-[10px] font-semibold">
                        {challenge.severity}
                      </Badge>
                    </div>

                    {/* Niche Context & Vulnerability */}
                    <div className="bg-muted/40 rounded-lg p-3 space-y-1 border border-border/40">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                        🎯 Why This Niche Is Specifically Vulnerable
                      </p>
                      <p className="text-xs leading-relaxed text-foreground/90">{challenge.niche_context}</p>
                    </div>

                    {/* Real-World Operational Impact */}
                    <div className="rounded-lg p-3 bg-amber-500/5 border border-amber-500/20 space-y-1">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1">
                        ⚠️ Real-World Operational &amp; Legal Impact
                      </p>
                      <p className="text-xs text-amber-900/90 dark:text-amber-200/90 leading-relaxed">
                        {challenge.operational_impact}
                      </p>
                    </div>

                    {/* Mitigation Strategy & Contractual Safeguards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                      <div className="space-y-1.5">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-primary flex items-center gap-1">
                          🛡️ Mitigation Strategy
                        </p>
                        <p className="text-xs text-muted-foreground leading-relaxed bg-muted/20 p-2.5 rounded border border-border/30">
                          {challenge.mitigation_strategy}
                        </p>
                      </div>

                      <div className="space-y-1.5">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-foreground flex items-center gap-1">
                          📝 Contractual Safeguards &amp; Clauses Needed
                        </p>
                        <div className="space-y-1">
                          {challenge.contractual_safeguards.map((clause, idx) => (
                            <div key={idx} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                              <span className="text-primary font-bold">•</span>
                              <span className="leading-snug">{clause}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* ── 35% SECONDARY FOCUS: Licenses, Registrations & Governance ── */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b">
          <div className="flex items-center gap-2">
            <FileCheck2 className="h-5 w-5 text-muted-foreground" />
            <div>
              <h3 className="font-semibold text-sm text-foreground">
                Statutory Licenses, Registrations &amp; Governance
              </h3>
              <p className="text-xs text-muted-foreground">
                Mandatory sector licenses, DPDP privacy rules, tax compliance, and startup corporate setup.
              </p>
            </div>
          </div>
          <Badge variant="outline" className="text-[10px] font-medium self-start sm:self-auto">
            35% Baseline Compliance
          </Badge>
        </div>

        {/* Regulatory Issues (statutory requirements) */}
        <div>
          <h4 className="font-medium text-xs text-muted-foreground mb-2.5 flex items-center gap-1.5 uppercase tracking-wider">
            <ScrollText className="h-3.5 w-3.5" /> Sector Statutory Requirements
          </h4>
          <div className="space-y-2">
            {data.regulatory_issues.map((issue, i) => {
              const cfg = severityConfig[issue.severity] || severityConfig.warning;
              const SeverityIcon = cfg.icon;
              return (
                <Card key={i} className={issue.severity === 'blocker' ? 'border-red-400' : issue.severity === 'critical' ? 'border-orange-400' : ''}>
                  <CardContent className="p-4 text-sm space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <SeverityIcon className={`h-4 w-4 flex-shrink-0 ${cfg.color}`} />
                        <p className="font-medium">{issue.title}</p>
                      </div>
                      <Badge variant={cfg.variant} className="flex-shrink-0">{issue.severity}</Badge>
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed">{issue.description}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span>📜 <span className="font-medium">{issue.regulation_name}</span></span>
                      <span>🏛️ {issue.governing_body}</span>
                      {issue.estimated_cost_inr !== null && issue.estimated_cost_inr !== undefined && (
                        <span>💰 ₹{issue.estimated_cost_inr.toLocaleString('en-IN')}</span>
                      )}
                      {issue.estimated_timeline_weeks && <span>⏱ {issue.estimated_timeline_weeks}w</span>}
                    </div>
                    <p className="text-xs font-medium text-primary">Action: {issue.action_required}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Required Licenses */}
        {data.required_licenses.length > 0 && (
          <div>
            <h4 className="font-medium text-xs text-muted-foreground mb-2.5 flex items-center gap-1.5 uppercase tracking-wider">
              <ShieldCheck className="h-3.5 w-3.5" /> Required Licenses &amp; Registrations
            </h4>
            <div className="space-y-2">
              {data.required_licenses.map((lic, i) => (
                <Card key={i}>
                  <CardContent className="p-4 text-sm">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium">{lic.license_name}</p>
                      <Badge variant={lic.mandatory ? 'default' : 'outline'}>{lic.mandatory ? 'Mandatory' : 'Optional'}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span>🏛️ {lic.governing_body}</span>
                      <span>⏱ ~{lic.typical_timeline_weeks} weeks</span>
                      {lic.typical_cost_inr !== null && lic.typical_cost_inr !== undefined && (
                        <span>💰 ₹{lic.typical_cost_inr.toLocaleString('en-IN')}</span>
                      )}
                    </div>
                    {lic.notes && <p className="text-xs text-muted-foreground mt-1">{lic.notes}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Detailed Sections via Accordion */}
        <Accordion type="multiple" className="space-y-2">
          {/* DPDP Act */}
          <AccordionItem value="dpdp" className="border rounded-lg px-4">
            <AccordionTrigger className="text-sm font-semibold hover:no-underline">
              <div className="flex items-center gap-2">
                <Fingerprint className="h-4 w-4" />
                DPDP Act 2023 &amp; Data Privacy
                {data.data_privacy.is_data_fiduciary && (
                  <Badge variant="secondary" className="ml-2">Data Fiduciary</Badge>
                )}
                {data.data_privacy.handles_children_data && (
                  <Badge variant="destructive" className="ml-1">Children&apos;s Data</Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm space-y-3 pb-4">
              <div className="flex flex-wrap gap-3 text-sm">
                <span className={`flex items-center gap-1 ${data.data_privacy.is_data_fiduciary ? 'text-amber-600' : 'text-green-600'}`}>
                  {data.data_privacy.is_data_fiduciary ? '⚠️ Is a Data Fiduciary' : '✅ Not a Data Fiduciary'}
                </span>
                <span className={`flex items-center gap-1 ${data.data_privacy.handles_children_data ? 'text-red-600' : 'text-green-600'}`}>
                  {data.data_privacy.handles_children_data ? '🔴 Handles children\'s data' : '✅ No children\'s data'}
                </span>
                <span className={`flex items-center gap-1 ${data.data_privacy.cross_border_transfer ? 'text-amber-600' : 'text-green-600'}`}>
                  {data.data_privacy.cross_border_transfer ? '⚠️ Cross-border transfers' : '✅ No cross-border transfers'}
                </span>
              </div>
              <div>
                <p className="text-xs font-medium mb-1">DPDP Obligations:</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground text-xs">
                  {data.data_privacy.dpdp_obligations.map((o, i) => <li key={i}>{o}</li>)}
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* IP */}
          <AccordionItem value="ip" className="border rounded-lg px-4">
            <AccordionTrigger className="text-sm font-semibold hover:no-underline">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Intellectual Property &amp; Trademarks
                <span className={`ml-2 text-xs px-2 py-0.5 rounded-full border font-medium ${urgencyConfig[data.ip_recommendations.trademark_urgency]?.className || ''}`}>
                  Trademark: {urgencyConfig[data.ip_recommendations.trademark_urgency]?.label || data.ip_recommendations.trademark_urgency}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm space-y-3 pb-4">
              <div className="flex flex-wrap gap-3">
                <span>Trademark Classes: {data.ip_recommendations.trademark_classes.map(c => `Class ${c}`).join(', ')}</span>
                <span>{data.ip_recommendations.patent_potential ? '⚡ Patent potential identified' : '— No patent angle'}</span>
              </div>
              <div>
                <p className="text-xs font-medium mb-1">IP Risks:</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground text-xs">
                  {data.ip_recommendations.ip_risks.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Tax */}
          <AccordionItem value="tax" className="border rounded-lg px-4">
            <AccordionTrigger className="text-sm font-semibold hover:no-underline">
              <div className="flex items-center gap-2">
                <BadgeIndianRupee className="h-4 w-4" />
                Tax, GST &amp; DPIIT Recognition
                {data.tax_overview.startup_india_eligible && (
                  <Badge className="ml-2 bg-green-100 text-green-800 border-green-300 hover:bg-green-100">Startup India Eligible</Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-sm space-y-3 pb-4">
              <div className="flex flex-wrap gap-4">
                {data.tax_overview.gst_rate_percent !== null && (
                  <div>
                    <p className="text-xs text-muted-foreground">GST Rate</p>
                    <p className="font-semibold text-lg">{data.tax_overview.gst_rate_percent}%</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-muted-foreground">GST Registration</p>
                  <p className="font-medium">{data.tax_overview.gst_registration_required ? 'Required' : 'Not Required Initially'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Startup India / DPIIT</p>
                  <p className="font-medium">{data.tax_overview.startup_india_eligible ? '✅ Eligible (Sec 80-IAC)' : '— Not eligible'}</p>
                </div>
              </div>
              <p className="text-muted-foreground text-xs">{data.tax_overview.tax_notes}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Immediate Actions */}
        <div>
          <h4 className="font-medium text-xs text-muted-foreground mb-2.5 flex items-center gap-1.5 uppercase tracking-wider">
            ⚡ Immediate Action Items
          </h4>
          <div className="space-y-2">
            {data.immediate_action_items.map((action, i) => (
              <div key={i} className="flex gap-3 text-sm">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </span>
                <p className="leading-relaxed">{action}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground bg-muted rounded-lg p-3">
            <span className="font-medium">Disclaimer:</span> This is AI-generated analysis for research purposes only.
            Estimated compliance setup cost: ₹{data.estimated_compliance_setup_cost_inr.toLocaleString('en-IN')}.
            Consult a qualified legal professional before making any business decisions.
          </p>
        </div>
      </div>
    </div>
  );
}
