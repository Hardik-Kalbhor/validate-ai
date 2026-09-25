'use client';

import { useValidationRun } from '@/hooks/useValidationRun';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle2, XCircle, Clock, Search, Cpu, TrendingUp, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';

const AGENTS = [
  { key: 'competitor', label: 'Competitor Analysis', icon: Search, statusField: 'competitor_status' },
  { key: 'tech', label: 'Tech Feasibility', icon: Cpu, statusField: 'tech_status' },
  { key: 'financial', label: 'Financial Modeling', icon: TrendingUp, statusField: 'financial_status' },
  { key: 'synthesis', label: 'Synthesis', icon: Brain, statusField: 'synthesis_status' },
] as const;

interface Props { runId: string }

export function AgentStatusCards({ runId }: Props) {
  const { results, isLoading } = useValidationRun(runId);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {AGENTS.map(({ key, label, icon: Icon, statusField }) => {
        const status = results?.[statusField] ?? 'pending';
        return (
          <Card key={key} className={cn(
            'transition-all duration-300',
            status === 'completed' && 'border-green-500/50 bg-green-50/30 dark:bg-green-950/20',
            status === 'failed' && 'border-destructive/50 bg-destructive/5',
            status === 'running' && 'border-primary/50',
          )}>
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
              <Icon className={cn('h-5 w-5', status === 'completed' ? 'text-green-600' : 'text-muted-foreground')} />
              <p className="text-xs font-medium leading-tight">{label}</p>
              {isLoading || status === 'pending' ? (
                <Clock className="h-4 w-4 text-muted-foreground/50" />
              ) : status === 'running' ? (
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
              ) : status === 'completed' ? (
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              ) : (
                <XCircle className="h-4 w-4 text-destructive" />
              )}
              <Badge variant={status === 'completed' ? 'outline' : status === 'failed' ? 'destructive' : 'secondary'} className="text-xs">
                {status}
              </Badge>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
