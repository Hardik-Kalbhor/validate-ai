-- ============================================================
-- 005_test_founder_unlimited.sql — Grant Unlimited Access to Test Founder
-- ============================================================

-- 1. Ensure test founder account (and ID) has unlimited runs
UPDATE profiles
SET runs_limit = 999999
WHERE id IN (
  SELECT id FROM auth.users WHERE LOWER(email) = 'test@validateai.dev'
) OR id = '00000000-0000-0000-0000-000000000001';

-- 2. Update trigger to automatically assign 999999 runs_limit to unlimited accounts on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_runs_limit INT := 1;
BEGIN
  IF LOWER(NEW.email) IN ('nvanalyticalsolutions@gmail.com', 'test@validateai.dev') OR NEW.id = '00000000-0000-0000-0000-000000000001' THEN
    v_runs_limit := 999999;
  END IF;

  INSERT INTO profiles (id, full_name, runs_limit)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    v_runs_limit
  )
  ON CONFLICT (id) DO UPDATE SET
    runs_limit = CASE
      WHEN LOWER(NEW.email) IN ('nvanalyticalsolutions@gmail.com', 'test@validateai.dev') OR NEW.id = '00000000-0000-0000-0000-000000000001' THEN 999999
      ELSE profiles.runs_limit
    END;
  RETURN NEW;
END;
$$;
