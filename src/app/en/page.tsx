import Link from "next/link";
import { getContent } from "@/lib/content";
import { getLocaleFromPath } from "@/lib/i18n";

export default function EnglishHomePage() {
  const { news, pressReleases, meta } = getContent();
  const allNews = [...pressReleases, ...news].slice(0, 6);

  return (
    <div className="container-main" style={{ paddingTop: "2rem", paddingBottom: "3rem" }}>
      <div className="rz-breadcrumb">
        <Link href="/">Главная</Link>
        <span className="rz-breadcrumb-sep">/</span>
        <span>English</span>
      </div>

      <h1 className="rz-page-title" style={{ marginBottom: "0.5rem" }}>
        Agency for Regulation and Development of Financial Markets
      </h1>
      <p className="rz-section-subtitle" style={{ marginBottom: "2rem" }}>
        Official information resource of the Republic of Kazakhstan&apos;s financial market regulator
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
        <div style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", padding: "2rem" }}>
          <h2 style={{ fontSize: "1.1rem", margin: "0 0 1rem" }}>About the Agency</h2>
          <p style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "var(--color-text-secondary)", margin: "0 0 1rem" }}>
            {meta.entityTitle} is the state body responsible for regulation and supervision of
            the financial market of Kazakhstan, including banking, insurance, securities market,
            and microfinance organizations.
          </p>
          <Link href="/about" className="rz-btn rz-btn-outline">
            Learn more →
          </Link>
        </div>

        <div style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", padding: "2rem" }}>
          <h2 style={{ fontSize: "1.1rem", margin: "0 0 1rem" }}>Quick Links</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={{ marginBottom: "0.5rem" }}>
              <a href="https://t.me/finance_regulator_bot" target="_blank" rel="noreferrer" style={{ color: "var(--color-navy-600)", fontWeight: 500, textDecoration: "none" }}>
                ✈️ Submit an appeal via Telegram
              </a>
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <Link href="/financial-organizations" style={{ color: "var(--color-navy-600)", fontWeight: 500, textDecoration: "none" }}>
                📋 License registry
              </Link>
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <Link href="/consumer-protection" style={{ color: "var(--color-navy-600)", fontWeight: 500, textDecoration: "none" }}>
                🛡️ Consumer protection
              </Link>
            </li>
            <li>
              <a href="tel:1459" style={{ color: "var(--color-navy-600)", fontWeight: 700, textDecoration: "none" }}>
                📞 Hotline: 1459
              </a>
            </li>
          </ul>
        </div>
      </div>

      <h2 style={{ fontSize: "1.2rem", margin: "0 0 1rem" }}>Latest News</h2>
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
