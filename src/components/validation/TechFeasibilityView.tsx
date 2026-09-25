'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import type { TechFeasibility } from '@/schemas/tech-feasibility.schema';

interface Props { data: TechFeasibility }

const complexityLabel = (score: number) => {
  if (score <= 3) return { label: 'Low', color: 'text-green-600' };
  if (score <= 6) return { label: 'Medium', color: 'text-amber-600' };
  return { label: 'High', color: 'text-red-600' };
};

export function TechFeasibilityView({ data }: Props) {
  const { label, color } = complexityLabel(data.complexity_score);

  return (
    <div className="space-y-4">
      {/* Summary row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Business Type', value: <Badge variant="outline">{data.business_type}</Badge> },
          { label: 'Complexity', value: <span className={`font-bold ${color}`}>{label} ({data.complexity_score}/10)</span> },
          { label: 'MVP Timeline', value: `${data.mvp_timeline_months} months` },
          { label: 'Full Product', value: `${data.full_product_timeline_months} months` },
        ].map(({ label, value }) => (
          <Card key={label}><CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">{label}</p>
            <div className="text-sm font-medium">{value}</div>
          </CardContent></Card>
        ))}
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-sm"><span>Complexity</span><span className={color}>{data.complexity_score}/10</span></div>
        <Progress value={data.complexity_score * 10} />
      </div>

      <Card><CardHeader><CardTitle className="text-sm">Recommended Stack</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-2 gap-2 text-sm">
          {Object.entries(data.technology_stack).filter(([, v]) => v).map(([k, v]) => (
            <div key={k}><span className="text-muted-foreground capitalize">{k.replace('_', ' ')}: </span>{v}</div>
          ))}
        </CardContent>
      </Card>

      <Accordion type="multiple">
        {[
          { id: 'hurdles', title: 'Engineering Hurdles', items: data.engineering_hurdles },
          { id: 'infra', title: 'Infrastructure Needs', items: data.infrastructure_needs },
          { id: 'integrations', title: 'Integration Points', items: data.integration_points },
          { id: 'security', title: 'Security Considerations', items: data.security_considerations },
        ].map(({ id, title, items }) => (
          <AccordionItem key={id} value={id}>
            <AccordionTrigger className="text-sm">{title}</AccordionTrigger>
            <AccordionContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                {items.map((item) => <li key={item}>• {item}</li>)}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Card><CardContent className="p-4 text-sm space-y-2">
        <p><span className="font-medium">Build vs Buy: </span>{data.build_vs_buy}</p>
        <p><span className="font-medium">Scalability: </span>{data.scalability_notes}</p>
      </CardContent></Card>
    </div>
  );
}
