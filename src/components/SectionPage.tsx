import Link from "next/link";
import { NewsCard } from "@/components/NewsCard";
import { SectionHtml } from "@/components/SectionHtml";
import { formatDate, rewriteGovHtml } from "@/lib/format";
import { assetPath } from "@/lib/base-path";
import { docTitle, type SectionConfig } from "@/lib/sections";
import type { GovDocument, GovNews } from "@/lib/types";

type Props = {
  config: SectionConfig;
  news: GovNews[];
  articles: { id: string; title: string; alias?: string; publication_date?: string }[];
  documents: GovDocument[];
  children?: React.ReactNode;
};

function htmlWithBasePath(html: string): string {
  return rewriteGovHtml(
    html.replace(/href="\/([^"#]+)"/g, (_, path) => `href="${assetPath(`/${path}`)}"`),
  );
}

export function SectionPage({ config, news, articles, documents, children }: Props) {
  return (
    <>
      <h1 className="page-title">{config.title}</h1>
      <SectionHtml html={htmlWithBasePath(config.intro)} className="section-intro" />

      {children}

      {config.blocks?.map((html, i) => (
        <section key={i} className="ardfm-section">
          <SectionHtml html={htmlWithBasePath(html)} />
        </section>
      ))}

      {config.links && config.links.length > 0 && (
        <section className="ardfm-section">
          <h2>Связанные разделы</h2>
          <ul className="ardfm-quick-links">
            {config.links.map((l) => (
              <li key={`${l.href}-${l.label}`}>
                {l.external ? (
                  <a href={l.href} target="_blank" rel="noreferrer">
                    {l.label}
                  </a>
                ) : (
                  <Link href={l.href}>{l.label}</Link>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {news.length > 0 && (
        <section className="ardfm-section">
          <h2>Новости по теме</h2>
          {news.map((n) => (
            <NewsCard key={n.id} item={n} />
          ))}
          <p style={{ marginTop: "1rem" }}>
            <Link href="/press/news" className="btn">
              Все новости
            </Link>
          </p>
        </section>
      )}

      {articles.length > 0 && (
        <section className="ardfm-section">
          <h2>Материалы и публикации</h2>
          <ul className="doc-list">
            {articles.map((a) => (
              <li key={`${a.id}-${a.alias}`}>
                <Link href={`/article/details/${a.id}`}>{a.title}</Link>
                {a.publication_date && <time>{formatDate(a.publication_date)}</time>}
              </li>
            ))}
          </ul>
          <Link href="/articles" className="btn" style={{ marginTop: "1rem" }}>
            Все материалы
          </Link>
        </section>
      )}

      {documents.length > 0 && (
        <section className="ardfm-section">
          <h2>Нормативные документы</h2>
          <ul className="doc-list">
            {documents.map((d) => (
              <li key={d.id}>
                <Link href={`/documents/item/${d.id}`}>{docTitle(d)}</Link>
                <time>{formatDate(d.created_date)}</time>
              </li>
            ))}
          </ul>
          <Link href="/documents/1" className="btn" style={{ marginTop: "1rem" }}>
            Все документы
          </Link>
        </section>
      )}
    </>
  );
}
