"use client";

import { Suspense } from "react";
import { RetryBoundary } from "@/components/RetryBoundary";
import AppLoading from "@/components/AppLoading";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RetryBoundary>
      <Suspense fallback={<AppLoading />}>
        <header>App</header>
        <main>{children}</main>
      </Suspense>
    </RetryBoundary>
  );
}
