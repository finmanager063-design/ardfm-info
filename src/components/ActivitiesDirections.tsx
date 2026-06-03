import Link from "next/link";

const DIRECTIONS = [
  {
    href: "/activities/banking-sector",
    title: "Банковский сектор",
    desc: "Лицензирование банков, пруденциальные нормативы, защита вкладчиков и заёмщиков, ипотечное и потребительское кредитование.",
    tags: ["Банки", "Кредиты", "Платежи"],
  },
  {
    href: "/activities/insurance-sector",
    title: "Страховой сектор",
    desc: "Страховые компании, брокеры, перестрахование, ОСАГО, добровольное страхование, урегулирование убытков.",
    tags: ["Страхование", "ОСАГО", "Резервы"],
  },
  {
    href: "/activities/securities-market",
    title: "Рынок ценных бумаг",
    desc: "Брокеры, депозитарии, управляющие, эмитенты, облигации, пенсионные активы, раскрытие информации.",
    tags: ["Биржа", "Облигации", "Инвесторы"],
  },
  {
    href: "/activities/other-financial-organizations",
    title: "Иные финансовые организации",
    desc: "МФО, ломбарды, коллекторы, перечень нелицензированных организаций, контроль закредитованности.",
    tags: ["МФО", "Ломбарды", "Микрокредиты"],
  },
  {
    href: "/activities/appointments",
    title: "Кадровые назначения",
    desc: "Официальные сведения о назначениях руководящих работников Агентства.",
    tags: ["Кадры", "Назначения"],
  },
];

export function ActivitiesDirections() {
  return (
    <section className="ardfm-section">
      <h2>Быстрый переход по направлениям</h2>
      <div className="direction-cards">
        {DIRECTIONS.map((d) => (
          <Link key={d.href} href={d.href} className="direction-card">
            <strong>{d.title}</strong>
            <span>{d.desc}</span>
            <span className="direction-card__tags">
              {d.tags.map((t) => (
                <em key={t}>{t}</em>
              ))}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
