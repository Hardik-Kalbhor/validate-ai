import { Langfuse } from 'langfuse';

const hasLangfuse = Boolean(
  process.env.LANGFUSE_PUBLIC_KEY && process.env.LANGFUSE_SECRET_KEY
);

/**
 * Langfuse client for LLM observability.
 * Traces token usage, latency, and cost per agent call.
 * Server-side only — never import in client components.
 */
export const langfuse = hasLangfuse
  ? new Langfuse({
      publicKey: process.env.LANGFUSE_PUBLIC_KEY!,
      secretKey: process.env.LANGFUSE_SECRET_KEY!,
      baseUrl: process.env.LANGFUSE_BASEURL ?? 'https://cloud.langfuse.com',
    })
  : null;
