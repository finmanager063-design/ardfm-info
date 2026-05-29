import Link from "next/link";
import { GovImage } from "@/components/GovImage";
import { GALLERY_PHOTOS } from "@/lib/site-media";
import { FEATURED_HOME_HERO } from "@/lib/featured-articles";

export function VisualGallery() {
  return (
    <section className="visual-gallery" aria-label="Фото и инфографика">
      <div className="visual-gallery__head">
        <h2>Финансовый рынок в фактах и кадрах</h2>
        <Link href={`/article/details/${FEATURED_HOME_HERO.articleId}`} className="visual-gallery__featured-link">
          ★ {FEATURED_HOME_HERO.title}
        </Link>
      </div>
      <div className="visual-gallery__grid">
        {GALLERY_PHOTOS.map((photo, i) => (
          <figure key={i} className="visual-gallery__item">
            <GovImage src={photo.src} alt={photo.alt} className="visual-gallery__img" />
            <figcaption>{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
