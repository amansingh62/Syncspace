"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface Invite {
    id: string,
    token: string,
    workspace: {
        id: string,
        name: string
    }
};

export default function PendingInvites() {
    const [ invites, setInvites ] = useState<Invite[]>([]);
    const router = useRouter();

const loadInvites = useCallback(async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/workspaces/invite`,
    { credentials: "include" }
  );

  if (!res.ok) return;

  const data = await res.json();
  setInvites(data);
}, []);


   async function accept(token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/workspaces/invite/${token}/accept`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  if (res.ok) {
    setInvites(prev => prev.filter(i => i.token !== token));
    router.refresh();
  }
}


useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadInvites();
}, [loadInvites]);

     if (invites.length === 0) return null;

  return (
    <div>
      <h2>Pending Invitations</h2>

      <ul>
        {invites.map(invite => (
          <li key={invite.id}>
            Invited to <strong>{invite.workspace.name}</strong>
            <button onClick={() => accept(invite.token)}>Accept</button>
          </li>
        ))}
      </ul>
    </div>
  );
}