'use client';

import { useState, useRef } from 'react';
import { UploadCloud, X, CheckCircle2, Loader2 } from 'lucide-react';

interface PitchDeckUploadProps {
  onTextExtracted: (text: string, fileName: string) => void;
  onClear: () => void;
  disabled?: boolean;
}

export function PitchDeckUpload({ onTextExtracted, onClear, disabled }: PitchDeckUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [charCount, setCharCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/validate/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to extract document text');
      }

      setFileName(data.fileName);
      setCharCount(data.charCount);
      onTextExtracted(data.pitchDeckText, data.fileName);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setFileName(null);
    setCharCount(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onClear();
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx,.txt,.md"
        onChange={handleFileChange}
        disabled={disabled || isUploading}
        className="hidden"
        id="pitch-deck-file-input"
      />

      {!fileName && !isUploading && (
        <label
          htmlFor="pitch-deck-file-input"
          className="flex items-center justify-between p-3 border border-dashed border-border rounded-lg bg-card/40 hover:bg-card/70 hover:border-primary/40 cursor-pointer transition-all duration-150 text-xs text-muted-foreground group"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-md bg-muted group-hover:bg-primary/10 group-hover:text-primary transition-colors">
              <UploadCloud className="w-4 h-4" />
            </div>
            <div>
              <span className="font-medium text-foreground">Attach Pitch Deck or Doc</span>
              <span className="text-muted-foreground ml-1.5">(PDF, DOCX, TXT — optional)</span>
            </div>
          </div>
          <span className="text-[11px] font-medium text-primary underline underline-offset-2">
            Upload file
          </span>
        </label>
      )}

      {isUploading && (
        <div className="flex items-center gap-3 p-3 border border-primary/20 rounded-lg bg-primary/5 text-xs text-primary animate-pulse">
          <Loader2 className="w-4 h-4 animate-spin text-primary shrink-0" />
          <span>Parsing document & extracting key slides...</span>
        </div>
      )}

      {fileName && !isUploading && (
        <div className="flex items-center justify-between p-2.5 border border-emerald-500/30 rounded-lg bg-emerald-500/5 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <div className="truncate">
              <span className="font-medium text-foreground truncate">{fileName}</span>
              {charCount && (
                <span className="text-muted-foreground ml-2 text-[11px]">
                  ({Math.round(charCount / 4).toLocaleString()} tokens injected)
                </span>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            disabled={disabled}
            className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors ml-2 shrink-0"
            title="Remove attachment"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {error && (
        <p className="mt-1.5 text-[11px] text-destructive flex items-center gap-1">
          {error}
        </p>
      )}
    </div>
  );
}
