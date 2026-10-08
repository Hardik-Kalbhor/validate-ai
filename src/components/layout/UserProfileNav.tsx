'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  User,
  UserPen,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  PlusCircle,
  Sparkles,
  Loader2,
  Building2,
  Briefcase,
  CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner';
import { ContactModal } from '@/components/validation/ContactModal';

export interface UserProfileData {
  id: string;
  email: string;
  fullName: string;
  company?: string;
  industry?: string;
  runsUsed?: number;
  runsLimit?: number;
  canValidate?: boolean;
  isUnlimited?: boolean;
}

interface UserProfileNavProps {
  initialUser?: UserProfileData | null;
}

export function UserProfileNav({ initialUser }: UserProfileNavProps) {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfileData | null>(initialUser ?? null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Form states for profile edit
  const [editFullName, setEditFullName] = useState(initialUser?.fullName || '');
  const [editCompany, setEditCompany] = useState(initialUser?.company || '');
  const [editIndustry, setEditIndustry] = useState(initialUser?.industry || '');

  // Fetch / sync latest profile on mount
  useEffect(() => {
    fetch('/api/user/profile')
      .then((res) => (res.ok ? res.json() : null))
      .then((data: UserProfileData | null) => {
        if (data) {
          setProfile(data);
          setEditFullName(data.fullName || '');
          setEditCompany(data.company || '');
          setEditIndustry(data.industry || '');
        }
      })
      .catch(() => {});
  }, []);

  function getInitials(name?: string, email?: string): string {
    if (name && name.trim()) {
      const parts = name.trim().split(/\s+/);
      if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return parts[0].slice(0, 2).toUpperCase();
    }
    if (email) {
      return email.slice(0, 2).toUpperCase();
    }
    return 'FD';
  }

  async function handleLogout() {
    setIsLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      await supabase.auth.signOut().catch(() => {});
      toast.success('Logged out successfully');
      router.push('/login');
      router.refresh();
    } catch {
      toast.error('Failed to log out');
    } finally {
      setIsLoggingOut(false);
    }
  }

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    if (!editFullName.trim()) {
      toast.error('Full name is required');
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch('/api/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: editFullName.trim(),
          company: editCompany.trim(),
          industry: editIndustry.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save profile');
      }

      setProfile(data.profile);
      toast.success('Profile updated successfully!');
      setIsEditOpen(false);
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : 'Error updating profile');
    } finally {
      setIsSaving(false);
    }
  }

  const displayName = profile?.fullName || profile?.email?.split('@')[0] || 'Founder';
  const displayEmail = profile?.email || '';
  const initials = getInitials(profile?.fullName, profile?.email);
  const runsUsed = profile?.runsUsed ?? 0;
  const runsLimit = profile?.runsLimit ?? 3;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2.5 h-9 px-2 hover:bg-accent/60 rounded-full sm:rounded-md transition-colors"
          >
            <Avatar className="h-7 w-7 text-xs font-semibold ring-1 ring-border">
              <AvatarFallback className="bg-primary/10 text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span className="hidden sm:inline-block max-w-[130px] truncate text-xs font-medium text-foreground text-left">
              {displayName}
            </span>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground opacity-70" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-64 p-2 shadow-lg">
          {/* User info banner */}
          <div className="flex items-start gap-2.5 p-2 rounded-md bg-muted/40">
            <Avatar className="h-9 w-9 text-xs font-semibold ring-1 ring-border shrink-0">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1 space-y-0.5">
              <p className="text-xs font-semibold truncate leading-none text-foreground">
                {displayName}
              </p>
              <p className="text-[11px] text-muted-foreground truncate">
                {displayEmail}
              </p>
              <div className="pt-1 flex items-center gap-1.5">
                <Badge
                  variant="outline"
                  className={
                    profile?.isUnlimited || runsLimit > 1000
                      ? 'text-[10px] px-1.5 py-0 h-4 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 font-medium'
                      : 'text-[10px] px-1.5 py-0 h-4 border-primary/20 text-primary font-normal'
                  }
                >
                  {profile?.isUnlimited || runsLimit > 1000
                    ? 'Unlimited Plan'
                    : runsUsed >= runsLimit
                    ? `${runsLimit} Runs Used`
                    : `${runsLimit - runsUsed} Free Runs Left`}
                </Badge>
              </div>
            </div>
          </div>

          <DropdownMenuSeparator className="my-1.5" />

          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => setIsEditOpen(true)}
              className="cursor-pointer gap-2 text-xs py-2"
            >
              <UserPen className="h-4 w-4 text-primary" />
              <span>Edit Profile</span>
            </DropdownMenuItem>

            <DropdownMenuItem asChild className="cursor-pointer gap-2 text-xs py-2">
              <Link href="/dashboard">
                <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                <span>My Validations</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild className="cursor-pointer gap-2 text-xs py-2">
              <Link href="/validate">
                <PlusCircle className="h-4 w-4 text-muted-foreground" />
                <span>New Validation</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => setIsContactOpen(true)}
              className="cursor-pointer gap-2 text-xs py-2 text-amber-600 dark:text-amber-400"
            >
              <Sparkles className="h-4 w-4" />
              <span>{profile?.isUnlimited || runsLimit > 1000 ? 'Contact Support' : 'Contact / Upgrade Plan'}</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="my-1.5" />

          <DropdownMenuItem
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="cursor-pointer gap-2 text-xs py-2 text-destructive focus:text-destructive focus:bg-destructive/10"
          >
            {isLoggingOut ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <LogOut className="h-4 w-4" />
            )}
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg font-bold">
              <User className="h-5 w-5 text-primary" /> Edit Founder Profile
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Update your founder details. These will be used to personalize your idea validation reports.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveProfile} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="profile-fullname" className="text-xs font-semibold">
                Full Name *
              </Label>
              <Input
                id="profile-fullname"
                value={editFullName}
                onChange={(e) => setEditFullName(e.target.value)}
                placeholder="Rahul Sharma"
                required
                className="h-9 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="profile-email" className="text-xs font-semibold">
                Email Address
              </Label>
              <Input
                id="profile-email"
                value={displayEmail}
                disabled
                className="h-9 text-xs bg-muted/40 cursor-not-allowed opacity-80"
              />
              <p className="text-[10px] text-muted-foreground">
                Email is tied to your login credentials and cannot be changed directly.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="profile-company" className="text-xs font-semibold flex items-center gap-1">
                  <Building2 className="h-3 w-3 text-muted-foreground" /> Company / Venture
                </Label>
                <Input
                  id="profile-company"
                  value={editCompany}
                  onChange={(e) => setEditCompany(e.target.value)}
                  placeholder="e.g. GreenWheels AI"
                  className="h-9 text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="profile-industry" className="text-xs font-semibold flex items-center gap-1">
                  <Briefcase className="h-3 w-3 text-muted-foreground" /> Domain / Industry
                </Label>
                <Input
                  id="profile-industry"
                  value={editIndustry}
                  onChange={(e) => setEditIndustry(e.target.value)}
                  placeholder="e.g. EV & Mobility"
                  className="h-9 text-xs"
                />
              </div>
            </div>

            {/* Validation Allowance Status Card */}
            <div className="rounded-lg border bg-muted/30 p-3 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">Current Plan</span>
                <Badge variant="secondary" className="text-[10px]">
                  Starter Free
                </Badge>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Free Validation Runs:</span>
                <span className="font-medium text-foreground">
                  {runsUsed} / {runsLimit} used
                </span>
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0 pt-2 border-t">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsEditOpen(false)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={isSaving}
                className="text-xs gap-1.5"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> Saving…
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5" /> Save Changes
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Upgrade / Contact Modal */}
      <ContactModal
        open={isContactOpen}
        onOpenChange={setIsContactOpen}
        defaultEmail={displayEmail}
        defaultName={displayName}
        isUnlimited={Boolean(profile?.isUnlimited || runsLimit > 1000)}
      />
    </>
  );
}
