-- ============================================================
-- 008_three_free_runs.sql — Update Free Runs Limit to 3
-- ============================================================

-- 1. Update default column value for profiles
ALTER TABLE profiles ALTER COLUMN runs_limit SET DEFAULT 3;

-- 2. Update existing standard profiles that had runs_limit = 1 to 3
UPDATE profiles
SET runs_limit = 3
WHERE runs_limit = 1;

-- 3. Update handle_new_user trigger function to default new users to 3 free runs
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_runs_limit INT := 3;
BEGIN
  IF LOWER(NEW.email) IN ('nvanalyticalsolutions@gmail.com', 'test@validateai.dev') OR NEW.id = '00000000-0000-0000-0000-000000000001' THEN
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
      WHEN LOWER(NEW.email) IN ('nvanalyticalsolutions@gmail.com', 'test@validateai.dev') OR NEW.id = '00000000-0000-0000-0000-000000000001' THEN 999999
      ELSE GREATEST(profiles.runs_limit, 3)
    END;
  RETURN NEW;
END;
$$;
