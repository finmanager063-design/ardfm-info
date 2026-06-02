import type { CSSProperties } from "react";
import Link from "next/link";
import { HomePressHub } from "@/components/HomePressHub";
import { MarketChartsStrip } from "@/components/MarketChartsStrip";
import { VisualGallery } from "@/components/VisualGallery";
import { GovImage } from "@/components/GovImage";
import { Reveal } from "@/components/motion/Reveal";
import { getContent } from "@/lib/content";
import { getHomeRibbonItem } from "@/lib/home-gallery";
import { getDiversePhoto } from "@/lib/photo-pool";

export function HomePage() {
  const { projects } = getContent();
  const banners = projects.filter((p) => p.icon || p.heropic).slice(0, 6);
  const ribbon = getHomeRibbonItem();

  return (
    <div className="home-page">
      {ribbon && (
        <Reveal direction="scale" delay={0}>
          <div className="home-flag-ribbon">
            <Link href={ribbon.href} className="home-flag-ribbon__link">
              <GovImage
                src={ribbon.src}
                alt={ribbon.alt}
                className="home-flag-ribbon__img"
                loading="eager"
              />
            </Link>
          </div>
        </Reveal>
      )}

      <Reveal direction="up" delay={80}>
        <HomePressHub />
      </Reveal>

      <Reveal direction="up" delay={120}>
        <MarketChartsStrip />
      </Reveal>

      <Reveal direction="up" delay={160}>
        <VisualGallery />
      </Reveal>

      {banners.length > 0 && (
        <Reveal direction="up" delay={100}>
          <section className="home-projects" aria-label="Реализуемые проекты">
            <h2 className="home-projects__title">Реализуемые проекты</h2>
            <Reveal stagger className="home-projects__slider" delay={120}>
              {banners.map((p, i) => {
                const icon = p.icon || p.heropic || getDiversePhoto(`project-${p.id}`);
                return (
                  <Link
                    key={p.id}
                    href={`/projects/details/${p.id}`}
                    className="home-projects__card"
                    style={{ "--stagger-i": i } as CSSProperties}
                  >
                    {icon && (
                      <GovImage src={icon} alt="" className="home-projects__img" />
                    )}
                    <span>{p.title}</span>
                  </Link>
                );
              })}
            </Reveal>
          </section>
        </Reveal>
      )}
    </div>
  );
}
