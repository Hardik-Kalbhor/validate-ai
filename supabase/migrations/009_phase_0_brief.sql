-- ============================================================
-- 009_phase_0_brief.sql — Add Phase 0 Idea Brief columns
-- ============================================================

ALTER TABLE validation_results
  ADD COLUMN IF NOT EXISTS brief        JSONB,
  ADD COLUMN IF NOT EXISTS brief_status agent_status NOT NULL DEFAULT 'completed';
