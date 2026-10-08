-- ============================================================
-- 001_init.sql — ValidateAI Full Schema
-- ============================================================

-- ── CUSTOM TYPES ────────────────────────────────────────────
CREATE TYPE run_status    AS ENUM ('pending', 'running', 'completed', 'failed');
CREATE TYPE language_code AS ENUM ('en', 'hi', 'mr');
CREATE TYPE business_type AS ENUM ('online', 'offline', 'hybrid');
CREATE TYPE agent_status  AS ENUM ('pending', 'running', 'completed', 'failed');

-- ── PROFILES (extends auth.users) ───────────────────────────
CREATE TABLE profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   TEXT,
  runs_used   INT NOT NULL DEFAULT 0,
  runs_limit  INT NOT NULL DEFAULT 1,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── VALIDATION RUNS ──────────────────────────────────────────
CREATE TABLE validation_runs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  idea_text       TEXT NOT NULL,
  language        language_code NOT NULL DEFAULT 'en',
  business_type   business_type,
  status          run_status NOT NULL DEFAULT 'pending',
  error_message   TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at    TIMESTAMPTZ
);

-- ── VALIDATION RESULTS (incremental per agent) ───────────────
CREATE TABLE validation_results (
  run_id              UUID PRIMARY KEY REFERENCES validation_runs(id) ON DELETE CASCADE,
  competitors         JSONB,
  competitor_status   agent_status NOT NULL DEFAULT 'pending',
  tech_feasibility    JSONB,
  tech_status         agent_status NOT NULL DEFAULT 'pending',
  financial_model     JSONB,
  financial_status    agent_status NOT NULL DEFAULT 'pending',
  synthesis           JSONB,
  synthesis_status    agent_status NOT NULL DEFAULT 'pending',
  total_tokens        INT DEFAULT 0,
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── ROW LEVEL SECURITY ───────────────────────────────────────
ALTER TABLE profiles           ENABLE ROW LEVEL SECURITY;
ALTER TABLE validation_runs    ENABLE ROW LEVEL SECURITY;
ALTER TABLE validation_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_own"  ON profiles          FOR ALL USING (auth.uid() = id);
CREATE POLICY "runs_own"      ON validation_runs   FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "results_own"   ON validation_results FOR ALL
  USING (run_id IN (SELECT id FROM validation_runs WHERE user_id = auth.uid()));

-- ── REALTIME PUBLICATIONS ────────────────────────────────────
ALTER PUBLICATION supabase_realtime ADD TABLE validation_results;
ALTER PUBLICATION supabase_realtime ADD TABLE validation_runs;

-- ── TRIGGER: Auto-create profile on signup ───────────────────
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO profiles (id, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ── TRIGGER: Auto-create results row per run ─────────────────
CREATE OR REPLACE FUNCTION handle_new_run()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO validation_results (run_id) VALUES (NEW.id);
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_run_created
  AFTER INSERT ON validation_runs
  FOR EACH ROW EXECUTE FUNCTION handle_new_run();

-- ── INDEXES ──────────────────────────────────────────────────
CREATE INDEX idx_runs_user_id    ON validation_runs(user_id);
CREATE INDEX idx_runs_created_at ON validation_runs(created_at DESC);
CREATE INDEX idx_runs_status     ON validation_runs(status);
