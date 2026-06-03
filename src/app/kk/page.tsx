import Link from "next/link";
import { getContent } from "@/lib/content";

export default function KazakhHomePage() {
  const { news, pressReleases, meta } = getContent();
  const allNews = [...pressReleases, ...news].slice(0, 6);

  return (
    <div className="container-main" style={{ paddingTop: "2rem", paddingBottom: "3rem" }}>
      <div className="rz-breadcrumb">
        <Link href="/">Басты</Link>
        <span className="rz-breadcrumb-sep">/</span>
        <span>Қазақша</span>
      </div>

      <h1 className="rz-page-title" style={{ marginBottom: "0.5rem" }}>
        Қаржы нарығын реттеу және дамыту жөніндегі агенттік
      </h1>
      <p className="rz-section-subtitle" style={{ marginBottom: "2rem" }}>
        Қазақстан Республикасының қаржы нарығын реттеушісінің ресми ақпараттық ресурсы
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
        <div style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", padding: "2rem" }}>
          <h2 style={{ fontSize: "1.1rem", margin: "0 0 1rem" }}>Агенттік туралы</h2>
          <p style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "var(--color-text-secondary)", margin: "0 0 1rem" }}>
            {meta.entityTitle} — банк ісін, сақтандыруды, бағалы қағаздар нарығын және
            микроқаржы ұйымдарын реттеу мен қадағалауды жүзеге асыратын мемлекеттік орган.
          </p>
          <Link href="/about" className="rz-btn rz-btn-outline">
            Толығырақ →
          </Link>
        </div>

        <div style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", padding: "2rem" }}>
          <h2 style={{ fontSize: "1.1rem", margin: "0 0 1rem" }}>Жылдам сілтемелер</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={{ marginBottom: "0.5rem" }}>
              <a href="https://t.me/finance_regulator_bot" target="_blank" rel="noreferrer" style={{ color: "var(--color-navy-600)", fontWeight: 500, textDecoration: "none" }}>
                ✈️ Telegram арқылы өтініш беру
              </a>
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <Link href="/financial-organizations" style={{ color: "var(--color-navy-600)", fontWeight: 500, textDecoration: "none" }}>
                📋 Лицензия тізілімі
              </Link>
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <Link href="/consumer-protection" style={{ color: "var(--color-navy-600)", fontWeight: 500, textDecoration: "none" }}>
                🛡️ Тұтынушылар құқығын қорғау
              </Link>
            </li>
            <li>
              <a href="https://t.me/finance_regulator_bot" target="_blank" rel="noreferrer" style={{ color: "var(--color-navy-600)", fontWeight: 700, textDecoration: "none" }}>
                ✈️ Telegram бот: @finance_regulator_bot
              </a>
            </li>
          </ul>
        </div>
      </div>

      <h2 style={{ fontSize: "1.2rem", margin: "0 0 1rem" }}>Соңғы жаңалықтар</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {allNews.map((item) => (
          <Link
            key={item.id}
            href={`/press/releases/details/${item.id}`}
            style={{
              display: "block",
              padding: "0.85rem 1rem",
              background: "#fff",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-sm)",
              textDecoration: "none",
              color: "var(--color-text)",
              transition: "border-color 0.15s",
            }}
          >
            <span style={{ fontSize: "0.78rem", color: "var(--color-text-secondary)", display: "block", marginBottom: "0.25rem" }}>
              {item.created_date || ""}
            </span>
            <span style={{ fontWeight: 500 }}>{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
