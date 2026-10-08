import { AppSidebar } from '@/components/layout/AppSidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { UserProfileNav } from '@/components/layout/UserProfileNav';
import { createServerClient } from '@/lib/supabase/server';
import { getUserUsage } from '@/lib/user-usage';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  let initialUser = null;

  try {
    const supabase = await createServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const usage = await getUserUsage(user.id, user.email);
      const meta = user.user_metadata || {};
      initialUser = {
        id: user.id,
        email: user.email || '',
        fullName:
          (meta.full_name as string) ||
          (user.email ? user.email.split('@')[0] : 'Founder'),
        company: (meta.company as string) || '',
        industry: (meta.industry as string) || '',
        runsUsed: usage.runsUsed,
        runsLimit: usage.runsLimit,
        canValidate: usage.canValidate,
        isUnlimited: usage.isUnlimited,
      };
    }
  } catch {
    // ignore
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-4" />
            <span className="font-semibold text-sm">ValidateAI</span>
          </div>
          <div className="flex items-center gap-3">
            <UserProfileNav initialUser={initialUser} />
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
