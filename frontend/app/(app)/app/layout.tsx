
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>App</header>
      <main>{children}</main>
    </>
  );
}
