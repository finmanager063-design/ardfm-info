import Link from "next/link";
import { GovImage } from "@/components/GovImage";
import { getChartsStripItems } from "@/lib/home-gallery";

export function MarketChartsStrip() {
  const items = getChartsStripItems();
  if (!items.length) return null;

  return (
    <section className="charts-strip" aria-label="Актуальные материалы">
      <div className="charts-strip__inner">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="charts-strip__link">
            <GovImage
              src={item.src}
              alt={item.alt}
              className="charts-strip__chart"
              loading="eager"
            />
            <span className="charts-strip__caption">{item.caption}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
