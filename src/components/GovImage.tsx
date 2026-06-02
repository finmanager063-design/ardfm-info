"use client";

import { useCallback, useMemo, useState } from "react";
import { extractMediaPath, resolveMediaUrl } from "@/lib/media";

type Props = {
  src: string;
  alt?: string;
  className?: string;
  loading?: "lazy" | "eager";
  /** Подсказка браузеру для адаптивной загрузки */
  sizes?: string;
};

/**
 * Локальный /uploads (после sync или CI) → gov.kz → заглушка.
 * SVG и /images/ — только с сайта.
 */
export function GovImage({
  src,
  alt = "",
  className,
  loading = "lazy",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
}: Props) {
  const mediaPath = useMemo(() => extractMediaPath(src), [src]);
  const [stage, setStage] = useState<0 | 1 | 2 | 3>(0);

  const url = useMemo(() => resolveMediaUrl(src, stage), [src, stage]);

  const onError = useCallback(() => {
    setStage((s) => (s < 3 ? ((s + 1) as 0 | 1 | 2 | 3) : 3));
  }, []);

  if (!src && !mediaPath) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export, gov CDN fallback
    <img
      src={url}
      alt={alt}
      className={["gov-img", className].filter(Boolean).join(" ")}
      loading={loading}
      decoding="async"
      sizes={sizes}
      onError={onError}
    />
  );
}
