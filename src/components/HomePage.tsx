import { getContent } from "@/lib/content";
import { HomePageClient } from "./HomePageClient";
import type { GovNews, GovProject } from "@/lib/types";

export function HomePage() {
  const { news, projects, pressReleases, meta } = getContent();
  const allNews = [...pressReleases, ...news].slice(0, 5);

  return <HomePageClient allNews={allNews as GovNews[]} projects={projects} meta={meta} />;
}
