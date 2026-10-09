import { createAdminClient } from './supabase/admin.ts';

export interface UserUsage {
  userId: string;
  runsUsed: number;
  runsLimit: number;
  canValidate: boolean;
  hasFreeRunRemaining: boolean;
  isUnlimited?: boolean;
}

/**
 * Whitelist of emails granted unlimited validation access.
 */
export const UNLIMITED_EMAILS: string[] = [
  'nvanalyticalsolutions@gmail.com',
  'test@validateai.dev',
];

export const TEST_FOUNDER_USER_ID = '00000000-0000-0000-0000-000000000001';
export const TEST_FOUNDER_EMAIL = 'test@validateai.dev';

export const UNLIMITED_RUNS_LIMIT = 999999;

/**
 * Checks whether an email address has unlimited validation access.
 */
export function isUnlimitedEmail(email?: string | null): boolean {
  if (!email) return false;
  const normalized = email.toLowerCase().trim();
  const envList = (process.env.UNLIMITED_USERS_EMAILS || '')
    .split(',')
    .map((e) => e.toLowerCase().trim())
    .filter(Boolean);
  return UNLIMITED_EMAILS.includes(normalized) || envList.includes(normalized);
}

/**
 * Checks whether a user (by ID or email) has unlimited validation access.
 */
export function isUnlimitedUser(userId?: string | null, email?: string | null): boolean {
  if (userId === TEST_FOUNDER_USER_ID) return true;
  if (email && isUnlimitedEmail(email)) return true;
  return false;
}

const globalUsage = globalThis as unknown as {
  __demoUserUsageStore?: Map<string, { runs_used: number; runs_limit: number; email?: string }>;
  __userEmailStore?: Map<string, string>;
};

if (!globalUsage.__demoUserUsageStore) {
  globalUsage.__demoUserUsageStore = new Map();
}
if (!globalUsage.__userEmailStore) {
  globalUsage.__userEmailStore = new Map();
}

const demoUsageStore = globalUsage.__demoUserUsageStore;
const emailStore = globalUsage.__userEmailStore;

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return Boolean(url && !url.includes('placeholder'));
}

function withTimeout<T>(promise: Promise<T> | PromiseLike<T>, ms = 1200): Promise<T> {
  return Promise.race([
    Promise.resolve(promise),
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error('Supabase query timeout')), ms)),
  ]);
}

/**
 * Retrieves the current validation usage and limit for a given user.
 * Standard users receive 3 free validation runs; whitelisted accounts receive unlimited runs.
 */
export async function getUserUsage(userId: string, email?: string | null): Promise<UserUsage> {
  const DEFAULT_LIMIT = 3;

  if (email) {
    emailStore.set(userId, email.toLowerCase().trim());
  }

  let userEmail = email?.toLowerCase().trim() || emailStore.get(userId);
  if (!userEmail && userId === TEST_FOUNDER_USER_ID) {
    userEmail = TEST_FOUNDER_EMAIL;
    emailStore.set(userId, userEmail);
  }

  // 1. Check Supabase profiles table if available
  if (isSupabaseConfigured()) {
    try {
      const admin = createAdminClient();

      // If email isn't known yet, attempt to fetch it from Supabase auth
      if (!userEmail) {
        const authUser = await withTimeout(admin.auth.admin.getUserById(userId)).catch(() => ({ data: { user: null } }));
        if (authUser?.data?.user?.email) {
          userEmail = authUser.data.user.email.toLowerCase().trim();
          emailStore.set(userId, userEmail);
        }
      }

      const isUnlimited = isUnlimitedUser(userId, userEmail);

      const profileRes = await withTimeout(
        admin
          .from('profiles')
          .select('runs_used, runs_limit')
          .eq('id', userId)
          .single()
      );
      const profile = profileRes?.data;

      if (profile) {
        let runsLimit = profile.runs_limit ?? DEFAULT_LIMIT;
        const runsUsed = profile.runs_used ?? 0;

        if (isUnlimited || runsLimit >= 1000) {
          runsLimit = UNLIMITED_RUNS_LIMIT;
          // Ensure Supabase profile has the unlimited limit synced
          if (profile.runs_limit !== UNLIMITED_RUNS_LIMIT) {
            Promise.resolve(
              admin
                .from('profiles')
                .update({ runs_limit: UNLIMITED_RUNS_LIMIT, updated_at: new Date().toISOString() })
                .eq('id', userId)
            ).catch(() => {});
          }

          return {
            userId,
            runsUsed,
            runsLimit: UNLIMITED_RUNS_LIMIT,
            canValidate: true,
            hasFreeRunRemaining: true,
            isUnlimited: true,
          };
        }

        return {
          userId,
          runsUsed,
          runsLimit,
          canValidate: runsUsed < runsLimit,
          hasFreeRunRemaining: runsUsed < runsLimit,
          isUnlimited: false,
        };
      } else if (isUnlimited) {
        // Profile not yet created but email is whitelisted
        return {
          userId,
          runsUsed: 0,
          runsLimit: UNLIMITED_RUNS_LIMIT,
          canValidate: true,
          hasFreeRunRemaining: true,
          isUnlimited: true,
        };
      }
    } catch {
      // Supabase unavailable or table missing — continue to fallback
    }
  }

  // 2. In-memory / demo mode fallback
  let storeEntry = demoUsageStore.get(userId);
  if (!storeEntry) {
    const isUnlimited = isUnlimitedUser(userId, userEmail);
    storeEntry = {
      runs_used: 0,
      runs_limit: isUnlimited ? UNLIMITED_RUNS_LIMIT : DEFAULT_LIMIT,
      email: userEmail,
    };
    demoUsageStore.set(userId, storeEntry);
  }

  if (storeEntry.email && !userEmail) {
    userEmail = storeEntry.email.toLowerCase().trim();
  }

  const isUnlimited = isUnlimitedUser(userId, userEmail);
  const runsUsed = storeEntry.runs_used;
  let runsLimit = isUnlimited ? UNLIMITED_RUNS_LIMIT : (storeEntry.runs_limit ?? DEFAULT_LIMIT);

  if (isUnlimited || runsLimit >= 1000) {
    runsLimit = UNLIMITED_RUNS_LIMIT;
    storeEntry.runs_limit = UNLIMITED_RUNS_LIMIT;
    if (userEmail) storeEntry.email = userEmail;

    return {
      userId,
      runsUsed,
      runsLimit: UNLIMITED_RUNS_LIMIT,
      canValidate: true,
      hasFreeRunRemaining: true,
      isUnlimited: true,
    };
  }

  return {
    userId,
    runsUsed,
    runsLimit,
    canValidate: runsUsed < runsLimit,
    hasFreeRunRemaining: runsUsed < runsLimit,
    isUnlimited: false,
  };
}

/**
 * Increments the runs_used count for a user after a validation run is initiated.
 * For unlimited users, canValidate and hasFreeRunRemaining always stay true.
 */
export async function incrementUserUsage(userId: string, email?: string | null): Promise<UserUsage> {
  const currentUsage = await getUserUsage(userId, email);
  const userEmail = email?.toLowerCase().trim() || emailStore.get(userId);
  const isUnlimited = currentUsage.isUnlimited || isUnlimitedUser(userId, userEmail);

  const nextUsed = currentUsage.runsUsed + 1;
  const runsLimit = isUnlimited ? UNLIMITED_RUNS_LIMIT : currentUsage.runsLimit;

  if (isSupabaseConfigured()) {
    try {
      const admin = createAdminClient();
      await withTimeout(
        admin
          .from('profiles')
          .update({
            runs_used: nextUsed,
            runs_limit: runsLimit,
            updated_at: new Date().toISOString(),
          })
          .eq('id', userId)
      );
    } catch {
      // Supabase unavailable
    }
  }

  demoUsageStore.set(userId, {
    runs_used: nextUsed,
    runs_limit: runsLimit,
    email: userEmail,
  });

  return {
    userId,
    runsUsed: nextUsed,
    runsLimit,
    canValidate: isUnlimited ? true : nextUsed < runsLimit,
    hasFreeRunRemaining: isUnlimited ? true : nextUsed < runsLimit,
    isUnlimited,
  };
}

/**
 * Resets user usage (useful for testing or customer support).
 */
export async function resetUserUsage(userId: string): Promise<void> {
  demoUsageStore.delete(userId);

  if (isSupabaseConfigured()) {
    try {
      const admin = createAdminClient();
      await admin
        .from('profiles')
        .update({ runs_used: 0, updated_at: new Date().toISOString() })
        .eq('id', userId);
    } catch {
      // Supabase unavailable
    }
  }
}
