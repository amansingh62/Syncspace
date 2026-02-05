"use client";

import { useState } from "react";
import { api } from "@/lib/axios";
import { Edit3, Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface Props {
  currentName: string;
  onUpdated: (name: string) => void;
}

export default function UpdateNameForm({
  currentName,
  onUpdated,
}: Props) {
  const [name, setName] = useState(currentName);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    
    const trimmedName = name.trim();
    if (!trimmedName || trimmedName === currentName) {
      return;
    }

    setLoading(true);
    setMessage(null);
    setMessageType(null);

    try {
      await api.patch("/auth/users/me", { name: trimmedName });
      onUpdated(trimmedName);
      setMessage("Name updated successfully");
      setMessageType("success");

      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    } catch {
      setMessage("Failed to update name");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  const hasChanges = name.trim() !== currentName && name.trim().length > 0;

  return (
    <section className="border border-white/5 bg-white/2 p-8">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <Edit3 className="w-5 h-5 text-[#E08476]" />
          <h2 className="text-xl font-light text-white">Update Name</h2>
        </div>
        <p className="text-sm text-white/50 font-light">
          Change how your name appears across the platform
        </p>
      </div>

      <form onSubmit={submit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm text-white/70 font-light tracking-wide uppercase mb-2">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            disabled={loading}
            className="w-full bg-white/2 border border-white/10 text-white text-base font-light px-4 py-3 focus:outline-none focus:border-[#E08476]/50 transition-colors placeholder:text-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Enter your name"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !hasChanges}
          className="group bg-[#E08476] hover:bg-[#D67567] text-white px-6 py-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#E08476] flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="font-normal tracking-wide">Saving...</span>
            </>
          ) : (
            <>
              <Edit3 className="w-4 h-4" />
              <span className="font-normal tracking-wide">Save</span>
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