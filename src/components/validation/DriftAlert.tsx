'use client';

import { GitCompare, ArrowRight } from 'lucide-react';
import type { DriftAlertData } from '@/lib/pivot-tracker';

interface DriftAlertProps {
  drift: DriftAlertData;
}

export function DriftAlert({ drift }: DriftAlertProps) {
  if (!drift.drifts || drift.drifts.length === 0) return null;

  return (
    <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 mb-6 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 shrink-0">
          <GitCompare className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <span>Strategic Pivot Detected</span>
              <span className="text-[11px] font-normal text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                Compared to Run from {drift.priorRunDate}
              </span>
            </h4>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Previous Concept: <span className="text-foreground font-medium italic">&ldquo;{drift.priorIdeaSummary}&rdquo;</span>
          </p>

          <div className="mt-3 space-y-2.5">
            {drift.drifts.map((d, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg bg-background/80 border border-border/60 text-xs"
              >
                <div className="flex items-center gap-2 font-medium text-foreground mb-1">
                  <span className="px-1.5 py-0.5 rounded text-[10px] uppercase font-bold bg-muted text-muted-foreground">
                    {d.dimension.replace(/_/g, ' ')}
                  </span>
                  <span className="text-muted-foreground line-through">{d.previousAssumption}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span className="text-primary font-semibold">{d.currentAssumption}</span>
                </div>
                <p className="text-[11px] text-muted-foreground pl-1 leading-relaxed">
                  {d.strategicImplication}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
