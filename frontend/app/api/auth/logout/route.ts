import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    const cookieHeader = (await cookies())
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join(";");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
        method:"POST",
        headers: {
            Cookie: cookieHeader,
        },
    });

    const response = NextResponse.json({ success: true });

    const setCookies = res.headers.getSetCookie();
    setCookies.forEach((cookie) => {
        response.headers.append("Set-Cookie", cookie);
    });

    return response;
}