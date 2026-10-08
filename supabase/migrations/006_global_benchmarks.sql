-- ============================================================
-- 006_global_benchmarks.sql — Add Global Benchmarks Agent columns
-- ============================================================

ALTER TABLE validation_results
  ADD COLUMN IF NOT EXISTS global_benchmarks JSONB,
  ADD COLUMN IF NOT EXISTS global_status     agent_status NOT NULL DEFAULT 'pending';
