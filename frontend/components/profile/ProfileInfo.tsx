import { Mail, User } from "lucide-react";

interface Props {
  user: {
    name: string;
    email: string;
  };
}

export default function ProfileInfo({ user }: Props) {
  return (
    <section className="border border-white/5 bg-white/2 p-8">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <User className="w-5 h-5 text-[#E08476]" />
          <h2 className="text-xl font-light text-white">Profile Information</h2>
        </div>
        <p className="text-sm text-white/50 font-light">
          Your account details and personal information
        </p>
      </div>

      <div className="space-y-6">
        {/* Name */}
        <div>
          <div className="text-xs text-white/40 uppercase tracking-wider mb-2 font-light">
            Full Name
          </div>
          <div className="flex items-center gap-3 text-white font-light text-base">
            <User className="w-4 h-4 text-white/40" />
            <span>{user.name}</span>
          </div>
        </div>

        {/* Email */}
        <div>
          <div className="text-xs text-white/40 uppercase tracking-wider mb-2 font-light">
            Email Address
          </div>
          <div className="flex items-center gap-3 text-white font-light text-base">
            <Mail className="w-4 h-4 text-white/40" />
            <span>{user.email}</span>
          </div>
        </div>
      </div>
    </section>
  );
}