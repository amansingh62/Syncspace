import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieHeader = (await cookies())
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`,
    {
      method: "POST",
      headers: {
        Cookie: cookieHeader,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return NextResponse.json(null, { status: 401 });
  }

  const response = NextResponse.json({ success: true }, { status: 200 });

  const setCookies = res.headers.getSetCookie();
  setCookies.forEach((cookie) => {
    response.headers.append("Set-Cookie", cookie);
  });

  return response;
}