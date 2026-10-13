import mammoth from 'mammoth';

/**
 * Extracts raw textual context from an uploaded pitch deck or business document.
 * Supports PDF, DOCX, Markdown, and plain text.
 * Truncates to a maximum of 160,000 characters (~40,000 tokens) to preserve context balance.
 */
export async function extractPitchDeckText(
  buffer: Buffer,
  mimeType: string,
  fileName?: string
): Promise<string> {
  let extractedText = '';

  const lowerName = (fileName || '').toLowerCase();
  const isPdf = mimeType.includes('pdf') || lowerName.endsWith('.pdf');
  const isDocx =
    mimeType.includes('wordprocessingml') ||
    mimeType.includes('msword') ||
    lowerName.endsWith('.docx');

  if (isPdf) {
    try {
      // Dynamic import to handle pdf-parse CJS/ESM export cleanly
      const pdfModule = (await import('pdf-parse')) as unknown as {
        default?: (buf: Buffer) => Promise<{ text: string }>;
      } | ((buf: Buffer) => Promise<{ text: string }>);
      const pdfParse =
        typeof pdfModule === 'function'
          ? pdfModule
          : (pdfModule.default ?? ((buf: Buffer) => Promise.resolve({ text: buf.toString('utf-8') })));
      const parsed = await pdfParse(buffer);
      extractedText = parsed.text || '';
    } catch (err) {
      console.warn('[PitchDeck] Failed to parse PDF with pdf-parse:', err);
      // Fallback: extract printable strings from raw buffer
      extractedText = buffer.toString('utf-8').replace(/[^\x20-\x7E\n\r\t]/g, ' ');
    }
  } else if (isDocx) {
    try {
      const result = await mammoth.extractRawText({ buffer });
      extractedText = result.value || '';
    } catch (err) {
      console.warn('[PitchDeck] Failed to parse DOCX with mammoth:', err);
      extractedText = '';
    }
  } else {
    // Plain text / Markdown
    extractedText = buffer.toString('utf-8');
  }

  // Clean formatting: normalize excessive whitespace while preserving paragraph structure
  const cleaned = extractedText
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  // Enforce 160K chars max (~40k tokens)
  const MAX_CHARS = 160_000;
  if (cleaned.length > MAX_CHARS) {
    return cleaned.slice(0, MAX_CHARS) + '\n\n...[PITCH DECK TRUNCATED AT 160,000 CHARACTERS]...';
  }

  return cleaned;
}
