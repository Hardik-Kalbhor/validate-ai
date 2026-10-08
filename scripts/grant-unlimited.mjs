import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error('Supabase credentials missing from environment');
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const TARGET_EMAIL = 'nvanalyticalsolutions@gmail.com';

async function grantUnlimited() {
  console.log(`Checking for user: ${TARGET_EMAIL}...`);

  const { data: usersData, error: userError } = await supabase.auth.admin.listUsers();
  if (userError) {
    console.error('Error fetching auth users:', userError);
  } else {
    const targetUser = usersData.users.find(
      (u) => u.email?.toLowerCase() === TARGET_EMAIL.toLowerCase()
    );

    if (targetUser) {
      console.log(`Found auth user ID: ${targetUser.id}. Updating profile...`);
      const { data, error } = await supabase
        .from('profiles')
        .upsert(
          {
            id: targetUser.id,
            runs_limit: 999999,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'id' }
        )
        .select();

      if (error) {
        console.error('Error updating profile in Supabase:', error);
      } else {
        console.log('Successfully updated Supabase profile for', TARGET_EMAIL, ':', data);
      }
    } else {
      console.log(
        `User ${TARGET_EMAIL} is not yet registered in Supabase Auth. It will automatically receive unlimited runs upon registration.`
      );
    }
  }
}

grantUnlimited().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
