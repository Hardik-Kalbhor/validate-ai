-- ============================================================
-- 002_free_run_limit.sql — 1 Free Validation Run Policy
-- ============================================================

ALTER TABLE profiles ALTER COLUMN runs_limit SET DEFAULT 1;

-- Update existing profiles that had the default 10 to 1
UPDATE profiles SET runs_limit = 1 WHERE runs_limit = 10;
