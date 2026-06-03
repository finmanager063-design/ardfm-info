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
    <aside className="rz-next-steps" aria-label={title}>
      <h2 className="rz-next-steps-title">{title}</h2>
      <div className="rz-next-steps-grid">
        {items.map((item) => (
          <Link
            key={item.href + item.label}
            href={item.href}
            className={`rz-next-steps-link ${item.primary ? "rz-next-steps-link--primary" : ""}`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </aside>
  );
}
