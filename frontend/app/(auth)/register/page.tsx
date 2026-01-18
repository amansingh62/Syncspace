"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = { name, email, password };

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include"
        });

        router.push("/login");
    };

    return (
        <form onSubmit={submit}>
         <h2>Create Account</h2>
         <input type="text" placeholder="Full Name" onChange={e => setName(e.target.value)} />
         <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)} />
         <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

         <button>Create</button>
        </form>
    );
};