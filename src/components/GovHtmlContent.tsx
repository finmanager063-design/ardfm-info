"use client";

import { useEffect, useRef } from "react";
import { rewriteGovHtml } from "@/lib/format";
import { attachImageFallbacks } from "@/lib/media";

export function GovHtmlContent({ html, className }: { html: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const safeHtml = rewriteGovHtml(html);

  useEffect(() => {
    if (!ref.current) return;
    return attachImageFallbacks(ref.current);
  }, [safeHtml]);

  if (!html) return null;

  return (
    <div
      ref={ref}
      className={`gov-html ${className ?? ""}`.trim()}
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
}
