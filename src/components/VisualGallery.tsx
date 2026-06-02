import type { CSSProperties } from "react";
import Link from "next/link";
import { GovImage } from "@/components/GovImage";
import { Reveal } from "@/components/motion/Reveal";
import { getHomeGalleryItems } from "@/lib/home-gallery";

export function VisualGallery() {
  const photos = getHomeGalleryItems(8);
  if (!photos.length) return null;

  return (
    <section className="visual-gallery" aria-label="Фото и инфографика">
      <div className="visual-gallery__head">
        <h2>Финансовый рынок в фактах и кадрах</h2>
      </div>
      <Reveal stagger className="visual-gallery__grid">
        {photos.map((photo, i) => (
          <figure
            key={photo.href}
            className="visual-gallery__item"
            style={{ "--stagger-i": i } as CSSProperties}
          >
            <Link href={photo.href} className="visual-gallery__link">
              <GovImage src={photo.src} alt={photo.alt} className="visual-gallery__img" />
            </Link>
            <figcaption>
              <Link href={photo.href}>{photo.caption}</Link>
            </figcaption>
          </figure>
        ))}
      </Reveal>
    </section>
  );
}
