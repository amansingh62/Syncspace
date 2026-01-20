"use client";

import { useState } from "react";

export default function LoginPage() {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = { email, password };

       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type":"application/json"},
        body: JSON.stringify(data),
        credentials: "include"
       });

       if(res.ok){
       window.location.href = "/app";
       }
    }

    return (
        <form onSubmit={submit}>
            <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <button>Login</button>
        </form>
    )
}