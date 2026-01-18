import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const protectedPaths = ["/app"];
    const isProtected = protectedPaths.some(path => 
        req.nextUrl.pathname.startsWith(path)
    );

    if(!isProtected) return NextResponse.next();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
        headers: {
            cookie: req.headers.get("cookie") || "",
        },
    });

    if(res.status === 401) return NextResponse.redirect(new URL("/login", req.url));

    return NextResponse.next();
}