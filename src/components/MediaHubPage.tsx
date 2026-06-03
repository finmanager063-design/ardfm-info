import Link from "next/link";
import { NewsCard } from "@/components/NewsCard";
import { formatDate } from "@/lib/format";
import type { GovNews, SiteContent } from "@/lib/types";

type Props = {
  content: SiteContent;
  news: GovNews[];
  activeTab?: "all" | "news" | "press" | "events";
};

export function MediaHubPage({ content, news, activeTab = "all" }: Props) {
  const releases = [...(content.pressReleases || [])].sort((a, b) =>
    (b.created_date ?? "").localeCompare(a.created_date ?? ""),
  );
  const events = [...content.events.upcoming, ...content.events.past].sort((a, b) =>
    (b.event_date ?? b.event_date_end ?? "").localeCompare(a.event_date ?? a.event_date_end ?? ""),
  );

  const tabs = [
    { id: "all" as const, href: "/media", label: "Все материалы" },
    { id: "news" as const, href: "/media/news", label: "Новости" },
    { id: "press" as const, href: "/media/press", label: "Пресс-релизы" },
    { id: "events" as const, href: "/media/events", label: "События" },
  ];

  return (
    <>
      <nav className="breadcrumb">
        <Link href="/">Главная</Link> / Медиацентр
      </nav>
      <h1 className="page-title">Медиацентр</h1>
      <p className="section-lead">
        Единый раздел новостей, пресс-релизов и событий Агентства. Актуальные материалы и архив.
      </p>

      <nav className="home-press__tabs" aria-label="Тип материала">
        {tabs.map((t) => (
          <Link
            key={t.id}
            href={t.href}
            className={`home-press__tab ${activeTab === t.id ? "home-press__tab--active" : ""}`}
          >
            {t.label}
          </Link>
        ))}
      </nav>

      {(activeTab === "all" || activeTab === "news") && (
        <section style={{ marginTop: "2rem" }}>
          <h2 className="section-title">Новости</h2>
          <div className="news-grid">
            {news.slice(0, activeTab === "news" ? 24 : 6).map((n) => (
              <NewsCard key={n.id} item={n} detailsBase="/media/news/details" />
            ))}
          </div>
          {activeTab === "all" && (
            <p style={{ marginTop: "1rem" }}>
              <Link href="/media/news" className="btn btn-outline">
                Все новости
              </Link>
            </p>
          )}
        </section>
      )}

      {(activeTab === "all" || activeTab === "press") && (
        <section style={{ marginTop: "2rem" }}>
          <h2 className="section-title">Пресс-релизы</h2>
          <ul className="doc-list">
            {releases.slice(0, activeTab === "press" ? 30 : 5).map((r) => (
              <li key={r.id}>
                <Link href={`/media/press/details/${r.id}`}>{r.title}</Link>
                <time>{formatDate(r.created_date)}</time>
              </li>
            ))}
          </ul>
        </section>
      )}

      {(activeTab === "all" || activeTab === "events") && (
        <section style={{ marginTop: "2rem" }}>
          <h2 className="section-title">События</h2>
          <ul className="doc-list">
            {events.slice(0, activeTab === "events" ? 20 : 5).map((e) => (
              <li key={e.id}>
                <Link href={`/media/events/details/${e.id}`}>{e.title}</Link>
                <time>{formatDate(e.event_date || e.event_date_end)}</time>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
