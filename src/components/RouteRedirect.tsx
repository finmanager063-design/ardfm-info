"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function RouteRedirect({ to }: { to: string }) {
  const router = useRouter();
  useEffect(() => {
    router.replace(to);
  }, [to, router]);
  return (
    <p style={{ padding: "2rem", textAlign: "center", color: "var(--color-text-secondary)" }}>
      Перенаправление…{" "}
      <Link href={to} style={{ color: "var(--color-navy-700)", fontWeight: 600 }}>
        Перейти
      </Link>
    </p>
  );
}
