import { GovImage } from "@/components/GovImage";
import { mediaSrc, KZ_IMAGES } from "@/lib/site-media";

export function MarketChartsStrip() {
  return (
    <section className="charts-strip" aria-label="Показатели финансового рынка">
      <div className="charts-strip__inner">
        <GovImage
          src={mediaSrc(KZ_IMAGES.chartSectors)}
          alt="Секторы под надзором АРРФР"
          className="charts-strip__chart"
        />
        <GovImage
          src={mediaSrc(KZ_IMAGES.chartGrowth)}
          alt="Динамика защиты прав потребителей"
          className="charts-strip__chart"
        />
      </div>
    </section>
  );
}
