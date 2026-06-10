import { getContent } from "@/lib/content";
import { sortNewsByDate } from "@/lib/news-media";
import { HomePageClient } from "./HomePageClient";

export function HomePage() {
  const content = getContent();
  const news = sortNewsByDate(content.news).slice(0, 6);
  const articles = content.articles
    .filter(a => a.heropic)
    .slice(0, 3);
  return <HomePageClient news={news} articles={articles} />;
}
