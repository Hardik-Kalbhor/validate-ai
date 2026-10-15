'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ShieldCheck, Compass, Filter } from 'lucide-react';
import type { Synthesis } from '@/schemas/synthesis.schema';
import { getVCPartnerDefenseQuestions, VC_STRATEGIC_LEVERS } from '@/lib/vc-defense-playbook';

interface Props {
  data: Synthesis;
  ideaText?: string;
}

const verdictConfig = {
  highly_viable: { label: 'Highly Viable', className: 'bg-green-100 text-green-800 border-green-300' },
  viable: { label: 'Viable', className: 'bg-blue-100 text-blue-800 border-blue-300' },
  risky: { label: 'Risky', className: 'bg-amber-100 text-amber-800 border-amber-300' },
  not_viable: { label: 'Not Viable', className: 'bg-red-100 text-red-800 border-red-300' },
};

const severityBadge = { low: 'outline', medium: 'secondary', high: 'default', critical: 'destructive' } as const;

export function SynthesisView({ data, ideaText }: Props) {
  const [selectedLever, setSelectedLever] = useState<string>('All Levers');
  const verdict = verdictConfig[data.viability_verdict];
  const allVcQuestions = getVCPartnerDefenseQuestions(ideaText || 'agritech logistics platform');
  const vcQuestions =
    selectedLever === 'All Levers'
      ? allVcQuestions
      : allVcQuestions.filter((q) => q.strategicLever === selectedLever);

  return (
    <div className="space-y-5">
      {/* Verdict + confidence */}
      <Card>
        <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="text-center md:text-left">
            <span className={`inline-block px-4 py-1.5 rounded-full border text-sm font-semibold ${verdict.className}`}>
              {verdict.label}
            </span>
            <div className="mt-3">
              <p className="text-4xl font-bold">{data.confidence_score}<span className="text-xl text-muted-foreground">/100</span></p>
              <p className="text-xs text-muted-foreground">Confidence Score</p>
            </div>
            <Progress value={data.confidence_score} className="mt-2 w-32" />
          </div>
          <p className="text-sm text-muted-foreground flex-1">{data.executive_summary}</p>
        </CardContent>
      </Card>

      {/* Dimension scores */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Dimension Scores</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {Object.entries(data.dimension_scores).map(([key, value]) => (
            <div key={key} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="capitalize">{key.replace(/_/g, ' ')}</span>
                <span className="font-medium">{value}/100</span>
              </div>
              <Progress value={value} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Risks */}
      <div>
        <h3 className="font-semibold text-sm mb-3">Top Risks</h3>
        <div className="space-y-2">
          {data.top_risks.map((r, i) => (
            <Card key={i}><CardContent className="p-4 text-sm space-y-1">
              <div className="flex items-center justify-between">
                <p className="font-medium">{r.risk}</p>
                <Badge variant={severityBadge[r.severity]}>{r.severity}</Badge>
              </div>
              <p className="text-muted-foreground">Mitigation: {r.mitigation}</p>
            </CardContent></Card>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div>
        <h3 className="font-semibold text-sm mb-3">Next Steps</h3>
        <div className="space-y-2">
          {data.next_steps.sort((a, b) => a.priority - b.priority).map((s, i) => (
            <div key={i} className="flex gap-3 text-sm">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">{s.priority}</span>
              <div><p>{s.step}</p><p className="text-xs text-muted-foreground">{s.timeframe}</p></div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategic Opportunities */}
      {data.top_opportunities && data.top_opportunities.length > 0 && (
        <div>
          <h3 className="font-semibold text-sm mb-3">Top Strategic Opportunities</h3>
          <div className="space-y-2">
            {data.top_opportunities.map((opp, i) => (
              <Card key={i}>
                <CardContent className="p-4 text-sm space-y-1">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <p className="font-medium text-foreground">{opp.opportunity}</p>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Badge variant="outline" className="capitalize text-[10px]">
                        {opp.timeframe}
                      </Badge>
                      <Badge
                        variant={opp.impact === 'high' ? 'default' : 'secondary'}
                        className="capitalize text-[10px]"
                      >
                        {opp.impact} Impact
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ── Tier-1 VC Partner Investment Committee (IC) Interrogation & Defense Simulator ── */}
      <Card className="border-primary/20 bg-gradient-to-br from-card via-card to-primary/5">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Compass className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  Tier-1 VC Partner Investment Committee (IC) Defense Playbook
                  <Badge variant="outline" className="border-primary/30 text-primary text-xs font-medium">
                    Partner Cross-Examination
                  </Badge>
                </CardTitle>
                <CardDescription className="text-xs">
                  Institutional partner-meeting cross-examinations from Peak XV, Accel, Matrix, Elevation, Nexus, Blume, and Ribbit with model institutional defense scripts.
                </CardDescription>
              </div>
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/20 text-xs font-semibold px-2.5 py-1">
              {vcQuestions.length} Institutional Defenses Prepared
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-1">
          {/* Strategic Lever Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap pb-1 text-xs">
            <span className="text-muted-foreground font-semibold text-[11px] mr-1 flex items-center gap-1">
              <Filter className="h-3 w-3" /> Filter by Lever:
            </span>
            {VC_STRATEGIC_LEVERS.map((lever) => (
              <button
                key={lever}
                type="button"
                onClick={() => setSelectedLever(lever)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedLever === lever
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {lever}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {vcQuestions.map((q) => (
              <div
                key={q.id}
                className="p-4 rounded-xl border bg-card/60 hover:bg-card transition-all space-y-3 text-xs"
              >
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold font-mono">
                      #{q.questionNumber}
                    </span>
                    <h4 className="font-bold text-sm text-foreground">
                      {q.questionTitle}
                    </h4>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Badge variant="secondary" className="text-[10px]">
                      Lead Fund: {q.fundArchetype}
                    </Badge>
                    <Badge variant="outline" className="text-[10px] text-primary border-primary/30">
                      {q.strategicLever}
                    </Badge>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-muted/60 border font-medium text-foreground text-xs leading-relaxed">
                  &ldquo;{q.interrogationPrompt}&rdquo;
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2.5 rounded bg-muted/30 border space-y-1">
                    <span className="font-semibold text-muted-foreground uppercase text-[10px] tracking-wider block">
                      Behind-Closed-Doors Partner Concern:
                    </span>
                    <p className="text-muted-foreground">{q.hiddenPartnerConcern}</p>
                  </div>
                  <div className="p-2.5 rounded bg-rose-500/5 border border-rose-500/20 space-y-1">
                    <span className="font-semibold text-rose-600 uppercase text-[10px] tracking-wider block">
                      Fatal Naive Answer to Avoid:
                    </span>
                    <p className="text-rose-950 dark:text-rose-200 italic">&ldquo;{q.fatalMistakeAnswer}&rdquo;</p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-emerald-600 font-semibold text-[11px] uppercase tracking-wider">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Model Institutional Defense Script</span>
                  </div>
                  <p className="text-foreground leading-relaxed text-xs">
                    {q.modelDefenseScript}
                  </p>
                  <p className="text-[10px] text-muted-foreground pt-1 border-t border-emerald-500/20">
                    <span className="font-semibold text-foreground">DRHP Comp Precedent: </span>
                    {q.compBenchmarkReference}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Founder Improvement Suggestions */}
      {data.improvement_suggestions && data.improvement_suggestions.length > 0 && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Strategic Improvements & Founder Optimizations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-1.5">
              {data.improvement_suggestions.map((sug, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <span className="text-muted-foreground">{sug}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
