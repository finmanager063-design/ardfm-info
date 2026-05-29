"use client";

import { GovHtmlContent } from "@/components/GovHtmlContent";

/** HTML блок раздела (intro / blocks) с fallback для картинок. */
export function SectionHtml({ html, className }: { html: string; className?: string }) {
  return <GovHtmlContent html={html} className={className} />;
}
