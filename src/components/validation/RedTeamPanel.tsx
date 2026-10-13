'use client';

import { useState } from 'react';
import { Flame, ShieldAlert, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';
import type { RedTeamAnalysis } from '@/schemas/red-team.schema';

interface RedTeamPanelProps {
  analysis: RedTeamAnalysis;
}

export function RedTeamPanel({ analysis }: RedTeamPanelProps) {
  const [isOpen, setIsOpen] = useState(true);

  const getVerdictBadge = (verdict: RedTeamAnalysis['verdict']) => {
    switch (verdict) {
      case 'resilient_with_caution':
        return {
          label: 'Resilient with Caution',
          className: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        };
      case 'severe_vulnerabilities':
        return {
          label: 'Severe Vulnerabilities Detected',
          className: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
        };
      case 'fatal_flaw_detected':
        return {
          label: 'Fatal Flaw Flagged',
          className: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
        };
    }
  };

  const verdict = getVerdictBadge(analysis.verdict);

  return (
    <div className="rounded-xl border border-rose-500/20 bg-card shadow-sm overflow-hidden mt-6 mb-8">
      {/* Header Bar */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between p-4 cursor-pointer bg-gradient-to-r from-rose-500/5 via-card to-card hover:bg-muted/40 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-rose-500/10 text-rose-500">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-foreground text-sm flex items-center gap-1.5">
                <span>Agent 7: Adversarial Red-Team</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400">
                  Devil&apos;s Advocate
                </span>
              </h3>
              <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${verdict.className}`}>
                {verdict.label}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Uncompromising stress-test of founder assumptions & investor failure modes
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">
              Devil Score
            </span>
            <div className="flex items-baseline gap-1">
              <span className={`text-xl font-black ${analysis.devil_score >= 66 ? 'text-rose-500' : analysis.devil_score >= 36 ? 'text-amber-500' : 'text-emerald-500'}`}>
                {analysis.devil_score}
              </span>
              <span className="text-xs text-muted-foreground">/100</span>
            </div>
          </div>
          <button className="text-muted-foreground p-1 hover:text-foreground">
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="p-5 pt-2 border-t border-border/40 space-y-5">
          {/* Fatal Flaws Highlight */}
          {analysis.fatal_flaws && analysis.fatal_flaws.length > 0 && (
            <div className="rounded-lg p-3.5 bg-rose-500/10 border border-rose-500/20">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <ShieldAlert className="w-4 h-4" />
                <span>Primary Fatal Flaws (Underwriting Kill-Shots)</span>
              </div>
              <ul className="space-y-1.5">
                {analysis.fatal_flaws.map((flaw, idx) => (
                  <li key={idx} className="text-xs text-foreground/90 flex items-start gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>{flaw}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Adversarial Challenges */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
              Stress-Test Counter-Arguments ({analysis.adversarial_challenges.length})
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {analysis.adversarial_challenges.map((c, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-border bg-card/60 p-3.5 flex flex-col justify-between text-xs space-y-2.5"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-muted text-foreground">
                        {c.category.replace(/_/g, ' ')}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.2 rounded uppercase ${
                          c.severity === 'critical'
                            ? 'text-rose-500 bg-rose-500/10'
                            : c.severity === 'high'
                            ? 'text-amber-500 bg-amber-500/10'
                            : 'text-blue-500 bg-blue-500/10'
                        }`}
                      >
                        {c.severity} severity
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                          Optimistic Assumption:
                        </span>
                        <p className="text-muted-foreground italic text-[11px]">&ldquo;{c.claim}&rdquo;</p>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-bold text-rose-500 block">
                          Counter-Reality:
                        </span>
                        <p className="text-foreground leading-relaxed">{c.counter_argument}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border/40 space-y-1.5 text-[11px]">
                    <div>
                      <span className="font-semibold text-muted-foreground">Stress Test Scenario: </span>
                      <span className="text-foreground/80">{c.stress_test_scenario}</span>
                    </div>
                    <div className="p-2 rounded bg-muted/40 border border-border/50 text-[11px]">
                      <span className="font-semibold text-primary">Required Defensive Pivot: </span>
                      <span className="text-foreground">{c.required_contingency}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Steelman Defense */}
          {analysis.steelman_argument && (
            <div className="rounded-lg p-3.5 bg-emerald-500/5 border border-emerald-500/20">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Steelman Counter-Thesis (How the Founder Could Win)</span>
              </div>
              <p className="text-xs text-foreground/90 leading-relaxed">
                {analysis.steelman_argument}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
