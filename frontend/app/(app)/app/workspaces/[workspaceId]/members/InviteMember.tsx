"use client";

import { useState } from "react";

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

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/workspaces/${workspaceId}/invite/accept`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email }),
      }
    );

    if (!res.ok) {
      setMessage("Failed to send invite");
      return;
    }

    setEmail("");
    setMessage("Invite sent successfully");
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
