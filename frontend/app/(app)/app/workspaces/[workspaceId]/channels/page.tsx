import Link from "next/link";
import { serverFetch } from "@/lib/serverFetch";

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

  const res = await serverFetch(
    `/workspaces/${workspaceId}/channels`
  );

  if (!res.ok) {
    return null;
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
            <Link
              href={`/app/workspaces/${workspaceId}/channels/${channel.id}`}
            >
              # {channel.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
