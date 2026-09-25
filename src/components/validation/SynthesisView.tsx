'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { Synthesis } from '@/schemas/synthesis.schema';

interface Props { data: Synthesis }

const verdictConfig = {
  highly_viable: { label: 'Highly Viable', className: 'bg-green-100 text-green-800 border-green-300' },
  viable: { label: 'Viable', className: 'bg-blue-100 text-blue-800 border-blue-300' },
  risky: { label: 'Risky', className: 'bg-amber-100 text-amber-800 border-amber-300' },
  not_viable: { label: 'Not Viable', className: 'bg-red-100 text-red-800 border-red-300' },
};

const severityBadge = { low: 'outline', medium: 'secondary', high: 'default', critical: 'destructive' } as const;

export function SynthesisView({ data }: Props) {
  const verdict = verdictConfig[data.viability_verdict];

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
    </div>
  );
}
