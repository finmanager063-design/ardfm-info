import Link from "next/link";

export default function AccessibilityPage() {
  return (
    <div className="container-main" style={{ paddingTop: "2rem", paddingBottom: "3rem" }}>
      <div className="rz-breadcrumb">
        <Link href="/">Главная</Link>
        <span className="rz-breadcrumb-sep">/</span>
        <span>Версия для слабовидящих</span>
      </div>

      <h1 className="rz-page-title">Версия для слабовидящих</h1>

      <div style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", padding: "2rem", lineHeight: 1.7, fontSize: "0.92rem" }}>
        <p>
          На данном ресурсе реализована возможность переключения в режим высокого
          контраста для удобства пользователей с нарушениями зрения.
        </p>

        <h2 style={{ color: "var(--color-navy-800)", fontSize: "1.1rem" }}>Доступные функции</h2>
        <ul>
          <li>Высококонтрастная цветовая схема;</li>
          <li>Увеличенный размер шрифта;</li>
          <li>Чёткие границы элементов управления;</li>
          <li>Поддержка навигации с клавиатуры;</li>
          <li>Semantic HTML для совместимости со screen reader.</li>
        </ul>

        <h2 style={{ color: "var(--color-navy-800)", fontSize: "1.1rem" }}>Как включить</h2>
        <p>
          В правом верхнем углу страницы нажмите на иконку специальных возможностей
          и выберите «Версия для слабовидящих». Для возврата к стандартному виду
          нажмите «Обычная версия».
        </p>

        <p style={{ marginTop: "2rem" }}>
          Если у вас есть предложения по улучшению доступности ресурса, пожалуйста,
          сообщите через{" "}
          <a href="https://t.me/finance_regulator_bot" target="_blank" rel="noreferrer">
            Telegram-бот
          </a>.
        </p>
      </div>
    </div>
  );
}
