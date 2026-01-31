// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect app routes
  if (!pathname.startsWith("/app")) {
    return NextResponse.next();
  }

  const accessToken = req.cookies.get("accessToken");
  const refreshToken = req.cookies.get("refreshToken");

  // No session at all
  if (!refreshToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Access token exists → allow
  if (accessToken) {
    return NextResponse.next();
  }

  // Access token missing but refresh token exists → refresh
  try {
    const refreshResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {
        method: "POST",
        headers: {
          cookie: req.headers.get("cookie") ?? "",
        },
      }
    );

    if (!refreshResponse.ok) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Forward new cookies to the browser
    const response = NextResponse.next();

    const setCookies = refreshResponse.headers.getSetCookie();
    setCookies.forEach(cookie => {
      response.headers.append("Set-Cookie", cookie);
    });

    return response;
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/app/:path*"],
};
