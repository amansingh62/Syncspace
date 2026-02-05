"use client";

import { useEffect, useState } from "react";
import { fetchMe } from "@/lib/auth.client";
import ProfileInfo from "@/components/profile/ProfileInfo";
import UpdateNameForm from "@/components/profile/UpdateNameForm";
import ChangePasswordForm from "@/components/profile/ChangePassword";
import { Loader2, AlertCircle } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMe()
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="h-full bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-white/50 animate-spin mx-auto mb-4" />
          <p className="text-white/50 font-light">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-full bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="w-16 h-16 border border-red-500/30 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-lg text-white/70 font-light mb-2">Failed to load profile</h3>
          <p className="text-white/40 font-light">
            There was an error loading your profile information. Please try refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-[#0A0A0A] overflow-y-auto">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#E08476]" />
            <span className="text-[#E08476]/80 text-sm font-light tracking-[0.2em] uppercase">
              Account
            </span>
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 border border-white/10 flex items-center justify-center text-white/70 text-2xl font-light">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-2">
                Profile
              </h1>
              <p className="text-lg text-white/50 font-light">
                Manage your account settings
              </p>
            </div>
          </div>
        </div>

        {/* Profile Sections */}
        <div className="space-y-8">
          <ProfileInfo user={user} />

          <UpdateNameForm
            currentName={user.name}
            onUpdated={name =>
              setUser(prev => (prev ? { ...prev, name } : prev))
            }
          />

          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}