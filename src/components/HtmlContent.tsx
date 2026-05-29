import { rewriteGovHtml } from "@/lib/format";

export function HtmlContent({ html, className }: { html: string; className?: string }) {
  if (!html) return null;
  return (
    <div
      className={`gov-html ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: rewriteGovHtml(html) }}
    />
  );
}
