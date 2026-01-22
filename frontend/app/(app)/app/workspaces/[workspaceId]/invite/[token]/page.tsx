"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
    params: { token : string };
};

export default function AcceptInvitePage({ params }: Props) {
    const { token } = params;
    const router = useRouter();
    const [ status, setStatus ] = useState("accepting");

    useEffect(() => {
        const accept = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/workspaces/invite/${token}`, {
                method: "POST",
                credentials: "include",
            });

            if(!res.ok) return setStatus("Invalid");

            setStatus("Success");
            router.push("/app");
        };
        accept();
    }, [token, router]);

    if(status === "accepting") return <p>Accepting invite...</p>;
    if(status === "invalid") return <p>Invalid or expired invite</p>;

    return null;
}