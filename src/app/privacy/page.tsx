import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="container-main" style={{ paddingTop: "2rem", paddingBottom: "3rem" }}>
      <div className="rz-breadcrumb">
        <Link href="/">Главная</Link>
        <span className="rz-breadcrumb-sep">/</span>
        <span>Политика конфиденциальности</span>
      </div>

      <h1 className="rz-page-title">Политика конфиденциальности</h1>

      <div style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", padding: "2rem", lineHeight: 1.7, fontSize: "0.92rem" }}>
        <h2 style={{ color: "var(--color-navy-800)", fontSize: "1.1rem" }}>1. Общие положения</h2>
        <p>
          Настоящая Политика конфиденциальности распространяется на официальный
          информационный ресурс Агентства Республики Казахстан по регулированию
          и развитию финансового рынка (далее — Ресурс).
        </p>
        <p>
          Используя Ресурс, вы соглашаетесь с условиями настоящей Политики
          конфиденциальности.
        </p>

        <h2 style={{ color: "var(--color-navy-800)", fontSize: "1.1rem" }}>2. Собираемая информация</h2>
        <p>Ресурс может собирать следующие данные:</p>
        <ul>
          <li>Техническая информация (IP-адрес, тип браузера, операционная система);</li>
          <li>Cookies и данные об использовании страниц;</li>
          <li>Данные, добровольно предоставленные через формы обратной связи.</li>
        </ul>

        <h2 style={{ color: "var(--color-navy-800)", fontSize: "1.1rem" }}>3. Использование информации</h2>
        <p>Собранная информация используется для:</p>
        <ul>
          <li>Улучшения работы и содержания Ресурса;</li>
          <li>Ответа на запросы пользователей;</li>
          <li>Анализа посещаемости и поведения пользователей.</li>
        </ul>

        <h2 style={{ color: "var(--color-navy-800)", fontSize: "1.1rem" }}>4. Защита данных</h2>
        <p>
          Ресурс принимает разумные технические и организационные меры для защиты
          персональных данных от несанкционированного доступа, изменения, раскрытия
          или уничтожения.
        </p>

        <h2 style={{ color: "var(--color-navy-800)", fontSize: "1.1rem" }}>5. Контактная информация</h2>
        <p>
          По вопросам, связанным с обработкой персональных данных, обращайтесь через
          Telegram-бот: <a href="https://t.me/finance_regulator_bot">@finance_regulator_bot</a>.
        </p>
      </div>
    </div>
  );
}
