"use client";

export default function LeaveWorkspaceButton({ workspaceId} : { workspaceId: string }) {
    async function leave() {
        if(!confirm("Are you sure you want to leave this workspace? You will lose access.")) return;

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/workspaces/${workspaceId}/leave`, {
            method: "DELETE",
            credentials: "include"
        });

        if(!res.ok) {
            const error = await res.json();
            alert(error.message || "Failed to leave workspace");
            return;
        }
        window.location.href = "/app";
    }

    return (
        <button onClick={leave} className="mt-24 text-red-500 border pt-6 pb-6 pl-12 pr-12">
         Leave Workspace
        </button>
    );
};