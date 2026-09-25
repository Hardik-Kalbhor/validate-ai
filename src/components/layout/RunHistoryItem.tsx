import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { truncate } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export interface Run {
  id: string;
  idea_text: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  language: string;
  created_at: string;
}

const statusVariant: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
  pending: 'secondary',
  running: 'default',
  completed: 'outline',
  failed: 'destructive',
};

export function RunHistoryItem({ run }: { run: Run }) {
  return (
    <Link href={`/validate/${run.id}`}>
      <Card className="hover:border-primary/50 transition-colors cursor-pointer">
        <CardContent className="p-4 flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium truncate">{truncate(run.idea_text, 90)}</p>
            <div className="flex items-center gap-2 mt-1.5">
              <Badge variant={statusVariant[run.status]} className="text-xs">{run.status}</Badge>
              <Badge variant="outline" className="text-xs">{run.language.toUpperCase()}</Badge>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(run.created_at), { addSuffix: true })}
              </span>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
        </CardContent>
      </Card>
    </Link>
  );
}
