import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function serverFetch(
  path: string,
  init: RequestInit = {}
) {
  const cookieHeader = (await cookies())
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ");

  return fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      ...init.headers,
      cookie: cookieHeader,
    },
    cache: "no-store",
  });
}
