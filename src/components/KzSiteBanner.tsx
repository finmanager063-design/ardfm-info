import { GovImage } from "@/components/GovImage";
import { mediaSrc, KZ_IMAGES } from "@/lib/site-media";

export function KzSiteBanner() {
  return (
    <div className="kz-site-banner" aria-hidden="true">
      <GovImage src={mediaSrc(KZ_IMAGES.flagBanner)} alt="" className="kz-site-banner__img" loading="eager" />
    </div>
  );
}
