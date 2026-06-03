"use client";

import { usePathname } from "next/navigation";
import { GovShell } from "./GovShell";
import type { SiteContent } from "@/lib/types";

export function ShellWrapper({
  children,
  meta,
}: {
  children: React.ReactNode;
  meta: SiteContent["meta"];
}) {
  const pathname = usePathname();

  if (pathname.startsWith("/premium")) {
    return <>{children}</>;
  }

  return <GovShell meta={meta}>{children}</GovShell>;
}
