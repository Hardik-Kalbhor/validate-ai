-- ============================================================
-- 010_complete_production_setup.sql
-- Complete All Pending Supabase Migrations for ValidateAI
-- (Safe to run multiple times: uses IF NOT EXISTS and ON CONFLICT)
-- ============================================================

-- 1. Ensure Agent Status Enum has all required values
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'agent_status') THEN
    CREATE TYPE agent_status AS ENUM ('pending', 'running', 'completed', 'failed');
  END IF;
END $$;

-- 2. Add Global Benchmarks columns to validation_results
ALTER TABLE validation_results
  ADD COLUMN IF NOT EXISTS global_benchmarks JSONB,
  ADD COLUMN IF NOT EXISTS global_status     agent_status NOT NULL DEFAULT 'pending';

-- 3. Add Phase 0 Idea Brief & Agent 7 Red-Team columns to validation_results
ALTER TABLE validation_results
  ADD COLUMN IF NOT EXISTS brief             JSONB,
  ADD COLUMN IF NOT EXISTS brief_status      agent_status NOT NULL DEFAULT 'completed',
  ADD COLUMN IF NOT EXISTS red_team          JSONB,
  ADD COLUMN IF NOT EXISTS red_team_status   agent_status NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS drift_alert       JSONB;

-- 4. Set default free runs limit to 3 for profiles
ALTER TABLE profiles ALTER COLUMN runs_limit SET DEFAULT 3;

-- 5. Upgrade any existing profiles that had runs_limit = 1 to 3
UPDATE profiles
SET runs_limit = 3
WHERE runs_limit = 1;

-- 6. Update user creation trigger function to support Google OAuth metadata and 3 free runs
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_runs_limit INT := 3;
BEGIN
  -- Whitelist unlimited admin / test accounts
  IF LOWER(NEW.email) IN ('nvanalyticalsolutions@gmail.com', 'test@validateai.dev')
     OR NEW.id = '00000000-0000-0000-0000-000000000001' THEN
    v_runs_limit := 999999;
  END IF;

  INSERT INTO profiles (id, full_name, runs_limit)
  VALUES (
    NEW.id,
    COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'name',
      split_part(NEW.email, '@', 1)
    ),
    v_runs_limit
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = COALESCE(
      profiles.full_name,
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'name',
      split_part(NEW.email, '@', 1)
    ),
    runs_limit = CASE
      WHEN LOWER(NEW.email) IN ('nvanalyticalsolutions@gmail.com', 'test@validateai.dev')
           OR NEW.id = '00000000-0000-0000-0000-000000000001' THEN 999999
      ELSE GREATEST(profiles.runs_limit, 3)
    END;
  RETURN NEW;
END;
$$;

-- 7. Ensure Realtime Publication includes all relevant tables
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND tablename = 'validation_results'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE validation_results;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND tablename = 'validation_runs'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE validation_runs;
  END IF;
END $$;
