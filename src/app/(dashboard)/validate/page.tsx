import { IdeaForm } from '@/components/validation/IdeaForm';
import { createServerClient } from '@/lib/supabase/server';
import { getUserUsage } from '@/lib/user-usage';

export default async function ValidatePage() {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let initialUsage = undefined;
  if (user) {
    initialUsage = await getUserUsage(user.id, user.email);
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Validate a Business Idea</h1>
        <p className="text-muted-foreground mt-1">
          6 specialized AI agents analyze your idea — 5 deep-dive specialists in parallel followed by master synthesis.
        </p>
      </div>
      <IdeaForm
        initialUsage={initialUsage}
        userEmail={user?.email}
        userName={(user?.user_metadata?.full_name as string) || undefined}
      />
    </div>
  );
}
