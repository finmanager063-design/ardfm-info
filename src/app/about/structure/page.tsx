import Link from "next/link";

const DEPARTMENTS = [
  { name: "Департамент банковского надзора", desc: "Осуществляет надзор за деятельностью банков второго уровня." },
  { name: "Департамент страхового надзора", desc: "Регулирование и надзор за страховыми организациями." },
  { name: "Департамент надзора за рынком ценных бумаг", desc: "Контроль за профессиональными участниками рынка ценных бумаг." },
  { name: "Департамент надзора за микрофинансовыми организациями", desc: "Регулирование деятельности МФО и коллекторских агентств." },
  { name: "Департамент защиты прав потребителей", desc: "Рассмотрение обращений граждан, защита прав потребителей финансовых услуг." },
  { name: "Департамент лицензирования", desc: "Лицензирование финансовых организаций и ведение реестров." },
  { name: "Юридический департамент", desc: "Правовое обеспечение деятельности Агентства." },
  { name: "Департамент международного сотрудничества", desc: "Взаимодействие с международными финансовыми организациями." },
];

export default function StructurePage() {
  return (
    <div>
      <div className="rz-page-header">
        <div className="rz-page-header-inner">
          <div className="rz-breadcrumb" style={{ color: "rgba(255,255,255,0.7)", paddingTop: 0, marginBottom: "0.75rem" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.8)" }}>Главная</Link>
            <span className="rz-breadcrumb-sep" style={{ color: "rgba(255,255,255,0.3)" }}>/</span>
            <Link href="/about" style={{ color: "rgba(255,255,255,0.8)" }}>Об Агентстве</Link>
            <span className="rz-breadcrumb-sep" style={{ color: "rgba(255,255,255,0.3)" }}>/</span>
            <span style={{ color: "rgba(255,255,255,0.8)" }}>Структура</span>
          </div>
          <h1 className="rz-page-title">Структура Агентства</h1>
        </div>
      </div>

      <div className="container-main" style={{ paddingTop: "2rem", paddingBottom: "3rem" }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "2rem",
        }}>
          <div style={{
            background: "var(--color-navy-800)",
            color: "#fff",
            padding: "1.25rem 2rem",
            borderRadius: "var(--radius-md)",
            textAlign: "center",
            marginBottom: "1.5rem",
          }}>
            <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>Председатель Агентства</div>
          </div>
          <div style={{
            width: 2,
            height: 24,
            background: "var(--color-border)",
          }} />
          <div style={{
            background: "var(--color-navy-100)",
            color: "var(--color-navy-800)",
            padding: "0.75rem 1.5rem",
            borderRadius: "var(--radius-sm)",
            fontSize: "0.9rem",
            fontWeight: 600,
          }}>
            Заместители Председателя
          </div>
          <div style={{
            width: 2,
            height: 24,
            background: "var(--color-border)",
          }} />
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "0.75rem",
            width: "100%",
            marginTop: "0.5rem",
          }}>
            {DEPARTMENTS.map((dept) => (
              <div
                key={dept.name}
                style={{
                  background: "#fff",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-sm)",
                  padding: "1rem 1.25rem",
                }}
              >
                <h3 style={{ margin: "0 0 0.35rem", fontSize: "0.9rem", color: "var(--color-navy-800)" }}>
                  {dept.name}
                </h3>
                <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--color-text-secondary)", lineHeight: 1.4 }}>
                  {dept.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
