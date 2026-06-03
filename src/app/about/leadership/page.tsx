import Link from "next/link";

const LEADERS = [
  {
    name: "Абдрахманов Тимур Серикович",
    role: "Председатель Агентства",
    bio: "Назначен на должность Указом Президента РК. Ранее занимал руководящие должности в финансовом секторе.",
  },
  {
    name: "Нургалиев Асет Аскарович",
    role: "Заместитель Председателя — банковский надзор",
    bio: "Курирует вопросы банковского регулирования и надзора, систему риск-менеджмента.",
  },
  {
    name: "Смаилова Динара Кайратовна",
    role: "Заместитель Председателя — страховой надзор и рынок ценных бумаг",
    bio: "Отвечает за регулирование страхового сектора и рынка ценных бумаг.",
  },
  {
    name: "Ибраев Марат Болатович",
    role: "Заместитель Председателя — защита прав потребителей",
    bio: "Курирует вопросы защиты прав потребителей финансовых услуг и финансовой грамотности.",
  },
];

export default function LeadershipPage() {
  return (
    <div>
      <div className="rz-page-header">
        <div className="rz-page-header-inner">
          <div className="rz-breadcrumb" style={{ color: "rgba(255,255,255,0.7)", paddingTop: 0, marginBottom: "0.75rem" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.8)" }}>Главная</Link>
            <span className="rz-breadcrumb-sep" style={{ color: "rgba(255,255,255,0.3)" }}>/</span>
            <Link href="/about" style={{ color: "rgba(255,255,255,0.8)" }}>Об Агентстве</Link>
            <span className="rz-breadcrumb-sep" style={{ color: "rgba(255,255,255,0.3)" }}>/</span>
            <span style={{ color: "rgba(255,255,255,0.8)" }}>Руководство</span>
          </div>
          <h1 className="rz-page-title">Руководство Агентства</h1>
        </div>
      </div>

      <div className="container-main" style={{ paddingTop: "2rem", paddingBottom: "3rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.25rem" }}>
          {LEADERS.map((leader) => (
            <div
              key={leader.name}
              style={{
                background: "#fff",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                padding: "1.5rem",
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "var(--color-navy-100)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  color: "var(--color-navy-600)",
                  fontWeight: 700,
                  marginBottom: "1rem",
                }}
              >
                {leader.name.split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase()}
              </div>
              <h3 style={{ margin: "0 0 0.25rem", fontSize: "1rem", color: "var(--color-navy-800)" }}>
                {leader.name}
              </h3>
              <p style={{ margin: "0 0 0.75rem", fontSize: "0.82rem", color: "var(--color-navy-500)", fontWeight: 600 }}>
                {leader.role}
              </p>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
                {leader.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
