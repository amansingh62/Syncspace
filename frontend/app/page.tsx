import Link from "next/link";

export default function LandingPage(){
    return (
        <main className="text-center m-50 space-y-3">
            <h1>Real Time Collaboration For Teams</h1>
            <p>Chat, write, and work together in one workspace.</p>
        <Link href="/register">Get Started</Link>
        {" | "}
        <Link href="/login">Sign In</Link>
        </main>
    )
}