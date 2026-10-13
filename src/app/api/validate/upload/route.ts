import { NextRequest, NextResponse } from 'next/server';
import { extractPitchDeckText } from '@/lib/pitch-deck';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No document file uploaded' }, { status: 400 });
    }

    // Size check: 20MB max
    const MAX_SIZE = 20 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'File exceeds 20MB limit. Please upload a smaller document.' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const extractedText = await extractPitchDeckText(buffer, file.type, file.name);

    if (!extractedText || extractedText.trim().length === 0) {
      return NextResponse.json(
        { error: 'Could not extract readable text from document. Ensure file is not scanned/empty.' },
        { status: 422 }
      );
    }

    return NextResponse.json({
      success: true,
      fileName: file.name,
      charCount: extractedText.length,
      pitchDeckText: extractedText,
    });
  } catch (error) {
    console.error('Error processing pitch deck upload:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to extract text from document' },
      { status: 500 }
    );
  }
}
