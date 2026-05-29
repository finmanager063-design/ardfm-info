import Link from "next/link";
import { HomePressHub } from "@/components/HomePressHub";
import { MarketChartsStrip } from "@/components/MarketChartsStrip";
import { VisualGallery } from "@/components/VisualGallery";
import { GovImage } from "@/components/GovImage";
import { getContent } from "@/lib/content";
import { localMediaUrl } from "@/lib/format";
import { mediaSrc, KZ_IMAGES } from "@/lib/site-media";

export function HomePage() {
  const { projects } = getContent();
  const banners = projects.filter((p) => p.icon || p.heropic).slice(0, 6);

  return (
    <div className="home-page">
      <div className="home-flag-ribbon">
        <GovImage src={mediaSrc(KZ_IMAGES.flagBanner)} alt="АРРФР — Казахстан" className="home-flag-ribbon__img" loading="eager" />
      </div>
      <HomePressHub />
      <MarketChartsStrip />
      <VisualGallery />

      {banners.length > 0 && (
        <section className="home-projects" aria-label="Реализуемые проекты">
          <h2 className="home-projects__title">Реализуемые проекты</h2>
          <div className="home-projects__slider">
            {banners.map((p) => {
              const icon = p.icon || p.heropic;
              return (
                <Link
                  key={p.id}
                  href={`/projects/details/${p.id}`}
                  className="home-projects__card"
                >
                  {icon && (
                    <GovImage src={localMediaUrl(icon)} alt="" className="home-projects__img" />
                  )}
                  <span>{p.title}</span>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
