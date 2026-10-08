import { NextResponse } from 'next/server';

/** Health check endpoint — used by Render to keep service alive */
export function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'validate-ai',
  });
}

