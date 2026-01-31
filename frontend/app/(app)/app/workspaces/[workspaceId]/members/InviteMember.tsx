"use client";

import { useState } from "react";
import { api } from "@/lib/axios";

export default function InviteMemberForm({
  workspaceId,
}: {
  workspaceId: string;
}) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const invite = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      await api.post(`/workspaces/${workspaceId}/invite`, { email });

      setEmail("");
      setMessage("Invite sent successfully");
    } catch (err) {
      setMessage("Failed to send invite");
    }
  };

  return (
    <section style={{ marginTop: 32 }}>
      <h2>Invite Members</h2>

      <form onSubmit={invite}>
        <input
          type="email"
          placeholder="Invite by email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button type="submit">Invite</button>
      </form>

      {message && <p>{message}</p>}
    </section>
  );
}
