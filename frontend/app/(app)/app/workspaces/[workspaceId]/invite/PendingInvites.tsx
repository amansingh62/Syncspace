"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/axios";

interface Invite {
  id: string;
  token: string;
  workspace: {
    id: string;
    name: string;
  };
}

export default function PendingInvites() {
  const [invites, setInvites] = useState<Invite[]>([]);
  const router = useRouter();

  const loadInvites = useCallback(async () => {
    try {
      const res = await api.get<Invite[]>("/workspaces/invite");
      setInvites(res.data);
    } catch {
      // silently fail or show toast if you want
    }
  }, []);

  async function accept(token: string) {
    try {
      await api.post(`/workspaces/invite/${token}/accept`);
      setInvites(prev => prev.filter(i => i.token !== token));
      router.refresh();
    } catch {
      alert("Failed to accept invite");
    }
  }

  async function reject(token: string) {
    if (!confirm("Reject this workspace invitation?")) return;

    try {
      await api.delete(`/workspaces/invite/${token}`);
      loadInvites();
    } catch {
      alert("Failed to reject invite");
    }
  }

useEffect(() => {
  let cancelled = false;

  async function load() {
    try {
      const res = await api.get<Invite[]>("/workspaces/invite");
      if (!cancelled) {
        setInvites(res.data);
      }
    } catch {}
  }

  load();

  return () => {
    cancelled = true;
  };
}, []);


  if (invites.length === 0) return null;

  return (
    <div>
      <h2>Pending Invitations</h2>

      <ul>
        {invites.map(invite => (
          <li key={invite.id}>
            Invited to <strong>{invite.workspace.name}</strong>
            <button onClick={() => accept(invite.token)}>Accept</button>
            <button onClick={() => reject(invite.token)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
