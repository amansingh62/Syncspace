"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export function RetryBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const retried = useRef(false);

  useEffect(() => {
    if (retried.current) return;
    retried.current = true;

    const id = setTimeout(() => {
      router.refresh();
    }, 300);

    return () => clearTimeout(id);
  }, [router]);

  return <>{children}</>;
}
