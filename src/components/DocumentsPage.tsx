import Link from "next/link";
import { DOCUMENTS_INTRO } from "@/lib/ardfm-content";
import { formatDate } from "@/lib/format";
import { docTitle } from "@/lib/sections";
import type { GovDocument } from "@/lib/types";

export function DocumentsPage({ documents }: { documents: GovDocument[] }) {
  const byType = new Map<string, GovDocument[]>();
  for (const d of documents) {
    const t = d.type;
    let label = "Прочие документы";
    if (t && typeof t === "object" && "items" in t && Array.isArray(t.items) && t.items[0]) {
      label = String(t.items[0].type ?? label);
    }
    if (!byType.has(label)) byType.set(label, []);
    byType.get(label)!.push(d);
  }

  const groups = [...byType.entries()].sort((a, b) => b[1].length - a[1].length);

  return (
    <>
      <h1 className="page-title">Документы</h1>
      <div className="gov-html section-intro">
        <div dangerouslySetInnerHTML={{ __html: DOCUMENTS_INTRO }} />
      </div>
      {groups.map(([typeName, docs]) => (
        <section key={typeName} className="ardfm-section">
          <h2>{typeName}</h2>
          <ul className="doc-list">
            {docs.slice(0, 50).map((d) => (
              <li key={d.id}>
                <Link href={`/documents/item/${d.id}`}>{d.title}</Link>
                <time>{formatDate(d.created_date)}</time>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
