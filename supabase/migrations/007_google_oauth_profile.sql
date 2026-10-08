-- ============================================================
-- 007_google_oauth_profile.sql — Support Google OAuth metadata in profile creation
-- ============================================================

-- Update trigger function to handle Google OAuth user metadata ('full_name' or 'name')
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
      ELSE profiles.runs_limit
    END;
  RETURN NEW;
END;
$$;
