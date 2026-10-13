'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { Cpu, ShieldAlert } from 'lucide-react';
import type { TechFeasibility } from '@/schemas/tech-feasibility.schema';
import { getStructuredPatentsForIdea } from '@/lib/patent-search';

interface Props {
  data: TechFeasibility;
  ideaText?: string;
}

const complexityLabel = (score: number) => {
  if (score <= 3) return { label: 'Low', color: 'text-green-600' };
  if (score <= 6) return { label: 'Medium', color: 'text-amber-600' };
  return { label: 'High', color: 'text-red-600' };
};

export function TechFeasibilityView({ data, ideaText }: Props) {
  const { label, color } = complexityLabel(data.complexity_score);
  const patents = (data.patent_landscape && data.patent_landscape.length > 0)
    ? data.patent_landscape
    : getStructuredPatentsForIdea(ideaText);


  return (
    <div className="space-y-4">
      {/* Overview card with badges */}
      <Card>
        <CardContent className="p-5 flex flex-col md:flex-row items-start md:items-center gap-5">
          <div className="text-center md:text-left shrink-0">
            <p className="text-4xl font-bold">
              {data.complexity_score}<span className="text-xl text-muted-foreground">/10</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">Complexity Score</p>
            <Progress value={data.complexity_score * 10} className="mt-2 w-28" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/10 text-[11px] font-semibold">
                75% Niche Oriented
              </Badge>
              <Badge variant="outline" className="text-[11px] text-muted-foreground">
                35% Baseline Info
              </Badge>
              <Badge variant="outline" className={`text-[11px] font-medium ${color}`}>
                {label} Complexity ({data.complexity_score}/10)
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {data.build_vs_buy}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Summary row */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          { label: 'Business Type', value: <Badge variant="outline">{data.business_type}</Badge> },
          { label: 'MVP Timeline', value: `${data.mvp_timeline_months} months` },
          { label: 'Full Product', value: `${data.full_product_timeline_months} months` },
        ].map(({ label, value }) => (
          <Card key={label}><CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">{label}</p>
            <div className="text-sm font-medium">{value}</div>
          </CardContent></Card>
        ))}
      </div>

      <Card><CardHeader><CardTitle className="text-sm">Recommended Stack</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-2 gap-2 text-sm">
          {Object.entries(data.technology_stack).filter(([, v]) => v).map(([k, v]) => (
            <div key={k}><span className="text-muted-foreground capitalize">{k.replace('_', ' ')}: </span>{v}</div>
          ))}
        </CardContent>
      </Card>

      {/* Niche Unique Technologies */}
      {data.niche_unique_technologies && data.niche_unique_technologies.length > 0 && (
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Cpu className="h-4 w-4 text-primary" />
              Niche Unique Technologies
              <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/10 text-[10px] ml-auto">
                75% Niche Oriented
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-1.5">
              {data.niche_unique_technologies.map((tech) => (
                <li key={tech} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  {tech}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Patent Landscape & Freedom-to-Operate (FTO) */}
      {patents && patents.length > 0 && (
        <Card className="border-amber-500/30 bg-amber-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-amber-500" />
              Patent Landscape & Freedom-to-Operate (FTO)
              <Badge variant="outline" className="text-amber-500 border-amber-500/30 text-[10px] ml-auto">
                Prior Art Citations
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {patents.map((patent) => (
              <div
                key={patent.patent_number}
                className="rounded-lg border border-border/60 bg-background/50 p-3 space-y-2 text-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="font-semibold text-foreground flex items-center gap-1.5">
                    <span>{patent.patent_number}</span>
                    <span className="text-muted-foreground font-normal">· {patent.title}</span>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      patent.fto_risk === 'critical'
                        ? 'bg-red-500/20 text-red-500 border-red-500/30 text-[10px]'
                        : patent.fto_risk === 'high'
                        ? 'bg-amber-500/20 text-amber-500 border-amber-500/30 text-[10px]'
                        : patent.fto_risk === 'medium'
                        ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30 text-[10px]'
                        : 'bg-green-500/20 text-green-500 border-green-500/30 text-[10px]'
                    }
                  >
                    {patent.fto_risk.toUpperCase()} FTO RISK
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Assignee / Owner:</span> {patent.assignee}
                </p>
                <div className="rounded bg-muted/40 p-2.5 text-xs space-y-1">
                  <span className="font-semibold text-primary block">Defensive Engineering Workaround:</span>
                  <span className="text-muted-foreground leading-relaxed block">{patent.defensive_workaround}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

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
        <p><span className="font-medium">Scalability: </span>{data.scalability_notes}</p>
      </CardContent></Card>
    </div>
  );
}
