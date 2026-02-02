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

    return <button onClick={logout} className="text-xl">Logout</button>
}