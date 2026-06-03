import Link from "next/link";

export default function HistoryPage() {
  return (
    <div>
      <div className="rz-page-header">
        <div className="rz-page-header-inner">
          <div className="rz-breadcrumb" style={{ color: "rgba(255,255,255,0.7)", paddingTop: 0, marginBottom: "0.75rem" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.8)" }}>Главная</Link>
            <span className="rz-breadcrumb-sep" style={{ color: "rgba(255,255,255,0.3)" }}>/</span>
            <Link href="/about" style={{ color: "rgba(255,255,255,0.8)" }}>Об Агентстве</Link>
            <span className="rz-breadcrumb-sep" style={{ color: "rgba(255,255,255,0.3)" }}>/</span>
            <span style={{ color: "rgba(255,255,255,0.8)" }}>История</span>
          </div>
          <h1 className="rz-page-title">История Агентства</h1>
        </div>
      </div>

      <div className="container-main" style={{ paddingTop: "2rem", paddingBottom: "3rem" }}>
        <div style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", padding: "2rem", lineHeight: 1.8, fontSize: "0.92rem" }}>
          <h2 style={{ color: "var(--color-navy-800)" }}>Создание</h2>
          <p>
            Агентство Республики Казахстан по регулированию и развитию финансового рынка
            было создано в соответствии с Указом Президента Республики Казахстан от
            29 октября 2019 года № 201 «О мерах по дальнейшему совершенствованию системы
            регулирования финансового рынка Республики Казахстан».
          </p>
          <p>
            Основной целью создания Агентства стало разделение регуляторных и надзорных
            функций Национального банка и передача их специализированному государственному
            органу для повышения эффективности регулирования финансового рынка.
          </p>

          <h2 style={{ color: "var(--color-navy-800)" }}>Начало деятельности</h2>
          <p>
            С 1 января 2020 года Агентство приступило к осуществлению своих полномочий.
            В ведение Агентства были переданы функции по регулированию и надзору за:
          </p>
          <ul>
            <li>Банковской деятельностью</li>
            <li>Страховой деятельностью</li>
            <li>Рынком ценных бумаг</li>
            <li>Микрофинансовыми организациями</li>
            <li>Коллекторской деятельностью</li>
          </ul>

          <h2 style={{ color: "var(--color-navy-800)" }}>Развитие</h2>
          <p>
            С момента создания Агентство последовательно совершенствует регуляторную
            среду, внедряет риск-ориентированный надзор, развивает цифровые сервисы
            для граждан и участников рынка. Приоритетом является обеспечение стабильности
            финансовой системы и защита прав потребителей финансовых услуг.
          </p>
        </div>
      </div>
    </div>
  );
}
