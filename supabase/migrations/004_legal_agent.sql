-- ============================================================
-- 004_legal_agent.sql — Add Legal & Regulatory Agent columns
-- ============================================================

ALTER TABLE validation_results
  ADD COLUMN IF NOT EXISTS legal_regulatory  JSONB,
  ADD COLUMN IF NOT EXISTS legal_status      agent_status NOT NULL DEFAULT 'pending';
