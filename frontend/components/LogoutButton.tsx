"use client";

import { useRouter } from "next/navigation";
import { api } from "@/lib/axios";

export function LogoutButton() {
    const router = useRouter();

    const logout = async () => {
        try {
            await api.post("/auth/logout");
        } finally {
            router.replace("/login");
        }
    };

    return <button onClick={logout} className="text-xl m-1 p-2 bg-amber-300 rounded-xl">Logout</button>
}