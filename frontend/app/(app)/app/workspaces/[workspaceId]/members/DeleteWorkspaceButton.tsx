"use client";

import { useRouter } from "next/navigation";

export default function DeleteWorkspaceButton({ workspaceId }: { workspaceId: string }) {
    const router = useRouter();

   async function deleteWorkspace() {
    const confirmDelete = confirm("This will permanently delete the workspace and all its data. This action cannot be undone.\n\nType DELETE to confirm.");

    if(!confirmDelete) return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/api/workspaces/${workspaceId}/delete`, {
        method: "DELETE",
        credentials: "include"
    });

     if (!res.ok) {
      const error = await res.json();
      alert(error.message || "Failed to delete workspace");
      return;
    }

    router.push("/app");
   };

   return (
    <button className="mt-24 text-shadow-indigo-200 bg-red-400 pt-8 pb-8 pl-14 pr-14 rounded-xl">Delete Workspace</button>
   )
}