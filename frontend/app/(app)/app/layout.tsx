import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  return (
    <div>
      <header>Welcome {user.email}</header>
      <main>{children}</main>
    </div>
  );
}
