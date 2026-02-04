"use client";

import { useState } from "react";
import { api } from "@/lib/axios";
import { UserPlus, Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function InviteMemberForm({
  workspaceId,
}: {
  workspaceId: string;
}) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);
  const [loading, setLoading] = useState(false);

  const invite = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setMessageType(null);
    setLoading(true);

    try {
      await api.post(`/workspaces/${workspaceId}/invite`, { email });

      setEmail("");
      setMessage("Invitation sent successfully");
      setMessageType("success");
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setMessage("");
        setMessageType(null);
      }, 5000);
    } catch {
      setMessage("Failed to send invitation");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="border border-white/5 bg-white/2 p-4 md:p-8">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2 md:mb-3">
          <UserPlus className="w-5 h-5 text-[#E08476]" />
          <h2 className="text-lg md:text-xl font-light text-white">Invite Members</h2>
        </div>
        <p className="text-xs md:text-sm text-white/50 font-light">
          Send an invitation to collaborate in this workspace
        </p>
      </div>

      <form onSubmit={invite} className="space-y-3 md:space-y-4">
        <div>
          <label htmlFor="invite-email" className="block text-sm text-white/70 font-light tracking-wide uppercase mb-2">
            Email Address
          </label>
          <input
            id="invite-email"
            type="email"
            placeholder="colleague@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            disabled={loading}
            className="w-full bg-white/2 border border-white/10 text-white text-sm md:text-base font-light px-3 md:px-4 py-2.5 md:py-3 focus:outline-none focus:border-[#E08476]/50 transition-colors placeholder:text-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !email.trim()}
          className="group bg-[#E08476] hover:bg-[#D67567] text-white px-4 md:px-6 py-2.5 md:py-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#E08476] flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="font-normal tracking-wide">Sending invitation...</span>
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4" />
              <span className="font-normal tracking-wide">Send Invitation</span>
            </>
          )}
        </button>
      </form>

      {/* Message Display */}
      {message && (
        <div
          className={`mt-3 md:mt-4 border-l-2 px-3 md:px-4 py-2.5 md:py-3 ${
            messageType === "success"
              ? "border-green-500/50 bg-green-500/5"
              : "border-red-500/50 bg-red-500/5"
          }`}
        >
          <div className="flex items-start gap-3">
            {messageType === "success" ? (
              <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            )}
            <p
              className={`text-xs md:text-sm font-light ${
                messageType === "success" ? "text-green-400" : "text-red-400"
              }`}
            >
              {message}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}