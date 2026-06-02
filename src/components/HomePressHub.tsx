import Link from "next/link";
import { GovImage } from "@/components/GovImage";
import { formatDate } from "@/lib/format";
import { HOME_IMPORTANT_LINKS, HOME_PRESS_TABS } from "@/lib/home-data";
import { isSrcUsedOnHome } from "@/lib/home-gallery";
import { resolveItemImage } from "@/lib/news-media";
import { getPressHubFeed } from "@/lib/press-hub";

export function HomePressHub() {
  const feed = getPressHubFeed(60).filter((item) => {
    const src = resolveItemImage(item, item.id);
    return !isSrcUsedOnHome(src);
  });

  const featured = feed[0];
  const secondary = feed.slice(1, 3);
  const listItems = feed.slice(0, 4);

  const featuredImg = featured ? resolveItemImage(featured, featured.id) : "";

  return (
    <div className="home-press">
      <nav className="home-press__tabs" aria-label="Пресс-центр">
        {HOME_PRESS_TABS.map((tab, i) => (
          <Link
            key={`${tab.label}-${i}`}
            href={tab.href}
            className={`home-press__tab ${"exact" in tab && tab.exact ? "home-press__tab--active" : ""}`}
          >
            {tab.label}
          </Link>
        ))}
      </nav>

      <div className="home-press__grid">
        <div className="home-press__visual">
          {featured && (
            <Link href={featured.detailHref} className="home-press__hero-card">
              <GovImage src={featuredImg} alt="" className="home-press__hero-img" loading="eager" />
              <div className="home-press__hero-overlay">
                <time dateTime={featured.created_date}>{formatDate(featured.created_date)}</time>
                <h2>{featured.title}</h2>
              </div>
            </Link>
          )}

          {secondary.length > 0 && (
            <div className="home-press__thumb-row">
              {secondary.map((item) => {
                const img = resolveItemImage(item, item.id);
                return (
                  <Link key={item.id} href={item.detailHref} className="home-press__thumb-card">
                    <GovImage src={img} alt="" className="home-press__thumb-img" />
                    <div className="home-press__thumb-overlay">
                      <time dateTime={item.created_date}>{formatDate(item.created_date)}</time>
                      <span>{item.title}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <div className="home-press__list">
          <ul className="home-press__news-list">
            {listItems.map((item) => (
              <li key={item.id}>
                <time dateTime={item.created_date}>{formatDate(item.created_date)}</time>
                <Link href={item.detailHref}>{item.title}</Link>
              </li>
            ))}
          </ul>
          <Link href="/press/news" className="home-press__all-link">
            Все материалы →
          </Link>
        </div>

        <aside className="home-press__aside">
          <h2 className="home-press__aside-title">Важно</h2>
          <ul className="home-press__important">
            {HOME_IMPORTANT_LINKS.map((link) => (
              <li key={link.label}>
                {"external" in link && link.external ? (
                  <a href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                ) : (
                  <Link href={link.href}>{link.label}</Link>
                )}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
