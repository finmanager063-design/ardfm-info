import Link from "next/link";
import { NewsCard } from "@/components/NewsCard";
import { PRESS_INTRO } from "@/lib/ardfm-content";
import { PRESS_TABS } from "@/lib/home-data";
import type { GovNews } from "@/lib/types";

type Props = {
  news: GovNews[];
  activePath: string;
};

export function PressCenterPage({ news, activePath }: Props) {
  return (
    <>
      <nav className="breadcrumb">
        <Link href="/">Главная</Link> / Пресс-центр
      </nav>
      <h1 className="page-title">Пресс-центр</h1>
      <div className="gov-html section-intro">
        <div dangerouslySetInnerHTML={{ __html: PRESS_INTRO }} />
      </div>

      <nav className="home-press__tabs" aria-label="Разделы пресс-центра">
        {PRESS_TABS.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`home-press__tab ${
              activePath === tab.href || (tab.href === "/press/news" && activePath.startsWith("/press/news"))
                ? "home-press__tab--active"
                : ""
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </nav>

      {news.map((n) => (
        <NewsCard key={n.id} item={n} />
      ))}
    </>
  );
}
