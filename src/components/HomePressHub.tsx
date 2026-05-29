import Link from "next/link";
import { GovImage } from "@/components/GovImage";
import { getContent } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { HOME_IMPORTANT_LINKS, HOME_PRESS_TABS } from "@/lib/home-data";
import { FEATURED_HOME_HERO } from "@/lib/featured-articles";
import { mediaSrc } from "@/lib/site-media";
import { extractNewsImage, newsWithImages, sortNewsByDate } from "@/lib/news-media";

export function HomePressHub() {
  const { news } = getContent();
  const sorted = sortNewsByDate(news);
  const withImages = newsWithImages(news, 20);

  const heroHref = `/article/details/${FEATURED_HOME_HERO.articleId}`;
  const heroImg = mediaSrc(FEATURED_HOME_HERO.image);
  const heroTitle = FEATURED_HOME_HERO.title;
  const heroDate = FEATURED_HOME_HERO.date;

  const secondary = withImages.slice(0, 2);
  const listItems = sorted.slice(0, 4);

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
          <Link href={heroHref} className="home-press__hero-card home-press__hero-card--featured">
            <GovImage src={heroImg} alt="" className="home-press__hero-img" loading="eager" />
            <div className="home-press__hero-overlay">
              <span className="home-press__badge">Президент РК</span>
              <time dateTime={heroDate}>{formatDate(heroDate)}</time>
              <h2>{heroTitle}</h2>
            </div>
          </Link>

          {secondary.length > 0 && (
            <div className="home-press__thumb-row">
              {secondary.map((item) => {
                const img = extractNewsImage(item);
                return (
                  <Link
                    key={item.id}
                    href={`/press/news/details/${item.id}`}
                    className="home-press__thumb-card"
                  >
                    {img ? (
                      <GovImage src={img} alt="" className="home-press__thumb-img" />
                    ) : (
                      <div className="home-press__thumb-placeholder" />
                    )}
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
                <Link href={`/press/news/details/${item.id}`}>{item.title}</Link>
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
