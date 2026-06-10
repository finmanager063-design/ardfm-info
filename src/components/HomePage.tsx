import { getContent } from "@/lib/content";
import { sortNewsByDate } from "@/lib/news-media";
import { HomePageClient } from "./HomePageClient";

export function HomePage() {
  const content = getContent();
  const news = sortNewsByDate(content.pressReleases).slice(0, 6);
  return <HomePageClient news={news} articles={[]} />;
}
