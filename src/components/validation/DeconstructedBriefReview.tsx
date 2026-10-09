'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { ValidationBrief } from '@/schemas/brief.schema';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Edit3,
  Target,
  DollarSign,
  Search,
  Cpu,
  TrendingUp,
  Scale,
  Globe,
  Loader2,
} from 'lucide-react';

interface Props {
  brief: ValidationBrief;
  onApprove: (approvedBrief: ValidationBrief) => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

export function DeconstructedBriefReview({
  brief: initialBrief,
  onApprove,
  onBack,
  isSubmitting = false,
}: Props) {
  const [brief, setBrief] = useState<ValidationBrief>(initialBrief);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      <Card className="border-primary/30 shadow-sm overflow-hidden">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 border-b">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="default" className="text-xs gap-1 py-0.5">
                  <Sparkles className="h-3 w-3" /> Phase 0 Complete
                </Badge>
                <span className="text-xs text-muted-foreground font-medium">Idea Framed in ~1.5s</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                {brief.formal_title}
              </h2>
              <p className="text-sm text-muted-foreground">
                Review our interpretation of your business model and target market before launching the full 5-agent audit.
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="self-start sm:self-center gap-1.5 shrink-0"
              disabled={isSubmitting}
            >
              <Edit3 className="h-3.5 w-3.5" />
              {isEditing ? 'Done Editing' : 'Tweak Assumptions'}
            </Button>
          </div>
        </div>

        <CardContent className="p-6 space-y-6">
          {/* ── Problem & Value Proposition ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border bg-muted/30 space-y-1.5">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Core Problem Addressed
              </span>
              {isEditing ? (
                <Textarea
                  value={brief.core_problem}
                  onChange={(e) => setBrief({ ...brief, core_problem: e.target.value })}
                  rows={2}
                  className="text-sm mt-1"
                />
              ) : (
                <p className="text-sm font-medium leading-relaxed">{brief.core_problem}</p>
              )}
            </div>

            <div className="p-4 rounded-xl border bg-muted/30 space-y-1.5">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Value Proposition & Promise
              </span>
              {isEditing ? (
                <Textarea
                  value={brief.value_proposition}
                  onChange={(e) => setBrief({ ...brief, value_proposition: e.target.value })}
                  rows={2}
                  className="text-sm mt-1"
                />
              ) : (
                <p className="text-sm font-medium leading-relaxed">{brief.value_proposition}</p>
              )}
            </div>
          </div>

          {/* ── Market Model & Target Persona ── */}
          <div className="p-4 rounded-xl border bg-card space-y-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold">Target Market & Business Model</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <Label className="text-xs text-muted-foreground">Business Delivery Model</Label>
                {isEditing ? (
                  <Select
                    value={brief.target_audience.business_model}
                    onValueChange={(val: ValidationBrief['target_audience']['business_model']) =>
                      setBrief({
                        ...brief,
                        target_audience: { ...brief.target_audience, business_model: val },
                      })
                    }
                  >
                    <SelectTrigger className="mt-1 h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="b2b">B2B (Business-to-Business)</SelectItem>
                      <SelectItem value="b2c">B2C (Business-to-Consumer)</SelectItem>
                      <SelectItem value="b2b2c">B2B2C (Channel/Partner)</SelectItem>
                      <SelectItem value="d2c">D2C (Direct-to-Consumer)</SelectItem>
                      <SelectItem value="p2p_marketplace">P2P Marketplace</SelectItem>
                      <SelectItem value="saas">SaaS Subscription</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="mt-1.5">
                    <Badge variant="outline" className="text-xs uppercase font-bold tracking-wide">
                      {brief.target_audience.business_model.replace('_', ' ')}
                    </Badge>
                  </div>
                )}
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Geographic & Tier Focus</Label>
                {isEditing ? (
                  <Select
                    value={brief.target_audience.tier_focus}
                    onValueChange={(val: ValidationBrief['target_audience']['tier_focus']) =>
                      setBrief({
                        ...brief,
                        target_audience: { ...brief.target_audience, tier_focus: val },
                      })
                    }
                  >
                    <SelectTrigger className="mt-1 h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tier_1">Tier 1 Metros</SelectItem>
                      <SelectItem value="tier_2">Tier 2 Cities</SelectItem>
                      <SelectItem value="tier_3_rural">Tier 3 & Rural India</SelectItem>
                      <SelectItem value="pan_india">Pan-India</SelectItem>
                      <SelectItem value="global">Global / Cross-Border</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="mt-1.5">
                    <Badge variant="secondary" className="text-xs capitalize font-medium">
                      {brief.target_audience.tier_focus.replace('_', ' ')}
                    </Badge>
                  </div>
                )}
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Target Customer Persona</Label>
                {isEditing ? (
                  <Input
                    value={brief.target_audience.segment}
                    onChange={(e) =>
                      setBrief({
                        ...brief,
                        target_audience: { ...brief.target_audience, segment: e.target.value },
                      })
                    }
                    className="mt-1 h-9 text-xs"
                  />
                ) : (
                  <p className="text-xs font-medium text-foreground mt-1.5 truncate">
                    {brief.target_audience.segment}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-2 border-t">
              <Label className="text-xs text-muted-foreground">Monetization Hypothesis</Label>
              {isEditing ? (
                <Input
                  value={brief.monetization_hypothesis}
                  onChange={(e) => setBrief({ ...brief, monetization_hypothesis: e.target.value })}
                  className="mt-1 h-9 text-xs"
                />
              ) : (
                <div className="flex items-center gap-2 mt-1">
                  <DollarSign className="h-4 w-4 text-green-600 shrink-0" />
                  <p className="text-xs font-medium text-foreground">{brief.monetization_hypothesis}</p>
                </div>
              )}
            </div>
          </div>

          {/* ── Research Specialist Directives ── */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Directives Prepared for Phase 1 Parallel Agents
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg border bg-muted/20 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-foreground">
                  <Search className="h-3.5 w-3.5 text-primary" />
                  <span>Competitor Angle</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {brief.agent_directives.competitor_focus}
                </p>
              </div>

              <div className="p-3 rounded-lg border bg-muted/20 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-foreground">
                  <Cpu className="h-3.5 w-3.5 text-primary" />
                  <span>Tech Architecture Focus</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {brief.agent_directives.tech_focus}
                </p>
              </div>

              <div className="p-3 rounded-lg border bg-muted/20 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-foreground">
                  <TrendingUp className="h-3.5 w-3.5 text-primary" />
                  <span>Financial Metrics Focus</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {brief.agent_directives.financial_focus}
                </p>
              </div>

              <div className="p-3 rounded-lg border bg-muted/20 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-foreground">
                  <Scale className="h-3.5 w-3.5 text-primary" />
                  <span>Legal & Regulatory Traps</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {brief.agent_directives.legal_focus}
                </p>
              </div>

              <div className="p-3 rounded-lg border bg-muted/20 space-y-1 sm:col-span-2 lg:col-span-2">
                <div className="flex items-center gap-1.5 font-semibold text-foreground">
                  <Globe className="h-3.5 w-3.5 text-primary" />
                  <span>Global Precedents & Analogs</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {brief.agent_directives.global_focus}
                </p>
              </div>
            </div>
          </div>
        </CardContent>

        {/* Footer Actions */}
        <div className="bg-muted/40 p-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onBack}
            disabled={isSubmitting}
            className="w-full sm:w-auto gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Edit Idea Prompt
          </Button>

          <Button
            type="button"
            size="default"
            onClick={() => onApprove(brief)}
            disabled={isSubmitting}
            className="w-full sm:w-auto gap-2 text-sm font-semibold shadow-sm"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Initializing Agents & Consuming 1 Run...
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Approve & Run Full Validation
                <ArrowRight className="h-4 w-4 ml-1" />
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}
