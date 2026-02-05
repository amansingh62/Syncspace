"use client";

import { useState } from "react";
import { api } from "@/lib/axios";
import { Lock, Loader2, CheckCircle, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function ChangePassword() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!current || !next) return;

    if (next.length < 8) {
      setMessage("Password must be at least 8 characters");
      setMessageType("error");
      return;
    }

    setLoading(true);
    setMessage(null);
    setMessageType(null);

    try {
      await api.patch("/auth/users/me/password", {
        currentPassword: current,
        newPassword: next,
      });

      setCurrent("");
      setNext("");
      setMessage("Password updated successfully");
      setMessageType("success");

      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    } catch {
      setMessage("Failed to update password");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="border border-white/5 bg-white/2 p-8">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <Lock className="w-5 h-5 text-[#E08476]" />
          <h2 className="text-xl font-light text-white">Change Password</h2>
        </div>
        <p className="text-sm text-white/50 font-light">
          Update your password to keep your account secure
        </p>
      </div>

      <form onSubmit={submit} className="space-y-4">
        {/* Current Password */}
        <div>
          <label htmlFor="current-password" className="block text-sm text-white/70 font-light tracking-wide uppercase mb-2">
            Current Password
          </label>
          <div className="relative">
            <input
              id="current-password"
              type={showCurrent ? "text" : "password"}
              placeholder="Enter current password"
              value={current}
              onChange={e => setCurrent(e.target.value)}
              disabled={loading}
              className="w-full bg-white/2 border border-white/10 text-white text-base font-light px-4 py-3 pr-12 focus:outline-none focus:border-[#E08476]/50 transition-colors placeholder:text-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
              tabIndex={-1}
            >
              {showCurrent ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label htmlFor="new-password" className="block text-sm text-white/70 font-light tracking-wide uppercase mb-2">
            New Password
          </label>
          <div className="relative">
            <input
              id="new-password"
              type={showNew ? "text" : "password"}
              placeholder="Enter new password"
              value={next}
              onChange={e => setNext(e.target.value)}
              disabled={loading}
              className="w-full bg-white/2 border border-white/10 text-white text-base font-light px-4 py-3 pr-12 focus:outline-none focus:border-[#E08476]/50 transition-colors placeholder:text-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
              tabIndex={-1}
            >
              {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <p className="text-xs text-white/40 mt-2 font-light">
            Must be at least 8 characters long
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || !current || !next}
          className="group bg-[#E08476] hover:bg-[#D67567] text-white px-6 py-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#E08476] flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="font-normal tracking-wide">Updating...</span>
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              <span className="font-normal tracking-wide">Change password</span>
            </>
          )}
        </button>
      </form>

      {/* Message Display */}
      {message && (
        <div
          className={`mt-4 border-l-2 px-4 py-3 ${
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
              className={`text-sm font-light ${
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