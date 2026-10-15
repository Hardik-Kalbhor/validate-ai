'use client';


import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FileText, Download, Printer, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import {
  downloadInvestmentMemoMarkdown,
  printInvestmentMemoPDF,
} from '@/lib/investment-memo-export';
import type { ValidationResults, ValidationRun } from '@/hooks/useValidationRun';

interface Props {
  run?: ValidationRun | null;
  results?: ValidationResults | null;
}

export function ExportMemoButton({ run, results }: Props) {
  const handleDownloadMarkdown = () => {
    try {
      downloadInvestmentMemoMarkdown(run, results);
      toast.success('Investment Committee Memo downloaded as Markdown (.md)');
    } catch {
      toast.error('Failed to export Markdown memo');
    }
  };

  const handlePrintPDF = () => {
    try {
      printInvestmentMemoPDF(run, results);
      toast.info('Print dialog opened. Select "Save as PDF" to save.');
    } catch {
      toast.error('Failed to prepare PDF print layout');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="h-8 gap-1.5 text-xs font-medium border-primary/30 hover:border-primary/60 bg-background/80 backdrop-blur-sm"
        >
          <FileText className="h-3.5 w-3.5 text-primary" />
          <span>Export IC Memo</span>
          <Sparkles className="h-3 w-3 text-amber-500 animate-pulse ml-0.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="text-xs font-semibold">
          Investment Committee Export
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleDownloadMarkdown}
          className="text-xs cursor-pointer flex items-center gap-2"
        >
          <Download className="h-4 w-4 text-primary" />
          <div>
            <p className="font-medium">Download Markdown (.md)</p>
            <p className="text-[10px] text-muted-foreground">Full dossier with tables & comps</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handlePrintPDF}
          className="text-xs cursor-pointer flex items-center gap-2"
        >
          <Printer className="h-4 w-4 text-emerald-600" />
          <div>
            <p className="font-medium">Print / Save as PDF</p>
            <p className="text-[10px] text-muted-foreground">Clean A4 publication layout</p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
