import Link from "next/link";
import { cookies } from "next/headers";

interface Channel {
  id: string;
  name: string;
  workspaceId: string;
  createdAt: string;
}

export default async function ChannelsPage({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const { workspaceId } = await params;

  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/workspaces/${workspaceId}/channels`,
    {
      cache: "no-store",
      headers: {
        Cookie: cookieHeader,
      },
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to load channels: ${text}`);
  }

  const channels: Channel[] = await res.json();

  return (
    <>
      <h1>Channels</h1>

      <Link href={`/app/workspaces/${workspaceId}/channels/new`}>
        ➕ New Channel
      </Link>

      <ul>
        {channels.map(channel => (
          <li key={channel.id}>
            <Link href={`/app/workspaces/${workspaceId}/channels/${channel.id}`}>
              # {channel.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
