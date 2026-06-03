import Link from "next/link";

export default function AboutPage() {
  return (
    <div>
      <div className="rz-page-header">
        <div className="rz-page-header-inner">
          <h1 className="rz-page-title">Об Агентстве</h1>
          <p className="rz-page-desc">
            Агентство Республики Казахстан по регулированию и развитию финансового рынка
            — государственный орган, осуществляющий регулирование и надзор на финансовом рынке
          </p>
        </div>
      </div>

      <div className="container-main" style={{ paddingTop: "2rem", paddingBottom: "3rem" }}>
        <div className="rz-about-grid">
          <div className="rz-about-card">
            <h3>📜 История</h3>
            <p>
              Агентство создано в 2019 году путём реорганизации Национального банка РК
              в части регулирования финансового рынка. С 1 января 2020 года Агентство
              осуществляет полномочия по регулированию и надзору финансового рынка.
            </p>
            <Link href="/about/history" className="rz-section-link" style={{ marginTop: "0.75rem", display: "inline-flex" }}>
              Подробнее →
            </Link>
          </div>

          <div className="rz-about-card">
            <h3>👤 Руководство</h3>
            <p>
              Высшее руководство Агентства: Председатель, его заместители и руководители
              структурных подразделений. Назначаются Президентом Республики Казахстан.
            </p>
            <Link href="/about/leadership" className="rz-section-link" style={{ marginTop: "0.75rem", display: "inline-flex" }}>
              Руководство →
            </Link>
          </div>

          <div className="rz-about-card">
            <h3>🏛️ Структура</h3>
            <p>
              Агентство включает департаменты банковского надзора, страхового надзора,
              надзора за рынком ценных бумаг, микрофинансовых организаций, защиты
              прав потребителей и административные подразделения.
            </p>
            <Link href="/about/structure" className="rz-section-link" style={{ marginTop: "0.75rem", display: "inline-flex" }}>
              Структура →
            </Link>
          </div>

          <div className="rz-about-card">
            <h3>🎯 Миссия</h3>
            <p>
              Обеспечение стабильности финансового рынка, защита прав потребителей
              финансовых услуг и создание условий для устойчивого развития финансового
              сектора экономики Казахстана.
            </p>
          </div>
        </div>

        <div style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", padding: "2rem", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.2rem", color: "var(--color-navy-800)", margin: "0 0 1rem" }}>
            Основные функции
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {[
              "Регулирование банковской деятельности",
              "Страховой надзор",
              "Регулирование рынка ценных бумаг",
              "Контроль микрофинансовых организаций",
              "Лицензирование финансовых организаций",
              "Защита прав потребителей финансовых услуг",
              "Повышение финансовой грамотности населения",
              "Противодействие финансовому мошенничеству",
            ].map((fn) => (
              <div key={fn} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 0", borderBottom: "1px solid var(--color-border)", fontSize: "0.9rem" }}>
                <span style={{ color: "var(--color-navy-500)" }}>✓</span>
                {fn}
              </div>
            ))}
          </div>
        </div>

        <div className="rz-alert-bar">
          <span className="rz-alert-bar-icon">ℹ️</span>
          <div className="rz-alert-bar-content">
            <p className="rz-alert-bar-title">Источник информации</p>
            <p className="rz-alert-bar-text">
              Данный раздел содержит информацию, полученную с официального сайта{" "}
              <a href="https://www.gov.kz" target="_blank" rel="noreferrer">gov.kz</a>.
              Для получения официальной информации обратитесь на портал Правительства РК.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
