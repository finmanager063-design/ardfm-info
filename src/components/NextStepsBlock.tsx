import Link from "next/link";
import { NEXT_STEPS_BY_PATH, type NextStepLink } from "@/lib/ia-v2";

export function NextStepsBlock({
  pathname,
  title = "Что дальше?",
  links,
}: {
  pathname: string;
  title?: string;
  links?: NextStepLink[];
}) {
  const items = links ?? NEXT_STEPS_BY_PATH[pathname.replace(/\/$/, "") || pathname];
  if (!items?.length) return null;
  return (
    <aside className="pg-next-steps" aria-label={title}>
      <h2 className="pg-next-steps-title">{title}</h2>
      <div className="pg-next-steps-grid">
        {items.map((item) => (
          <Link
            key={item.href + item.label}
            href={item.href}
            className={`pg-next-steps-link ${item.primary ? "pg-next-steps-link--primary" : ""}`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </aside>
  );
}
