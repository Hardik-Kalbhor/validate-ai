-- ============================================================
-- 011_red_team.sql — Add Agent 7 Red-Team & Drift Alert columns
-- ============================================================

ALTER TABLE validation_results
  ADD COLUMN IF NOT EXISTS red_team        JSONB,
  ADD COLUMN IF NOT EXISTS red_team_status agent_status NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS drift_alert     JSONB;
