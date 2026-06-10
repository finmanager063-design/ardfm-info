import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="premium-container" style={{ paddingTop: "2rem", paddingBottom: "3rem" }}>
      <nav className="text-sm text-premium-text-secondary mb-4">
        <Link href="/" className="hover:text-green-600">Главная</Link>
        <span className="mx-2">/</span>
        <span>Политика конфиденциальности</span>
      </nav>

      <h1 className="text-2xl sm:text-3xl font-bold text-premium-navy-800 mb-6">Политика конфиденциальности</h1>

      <div className="premium-card p-6 sm:p-8 text-sm leading-relaxed space-y-4">
        <section>
          <h2 className="text-lg font-bold text-premium-navy-800 mb-2">1. Общие положения</h2>
          <p className="text-premium-text-secondary">
            Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных
            данных пользователей сервиса PayGuard (далее — Сервис).
          </p>
          <p className="text-premium-text-secondary">
            Используя Сервис, вы соглашаетесь с условиями настоящей Политики конфиденциальности.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-premium-navy-800 mb-2">2. Собираемая информация</h2>
          <p className="text-premium-text-secondary">Сервис может собирать следующие данные:</p>
          <ul className="list-disc list-inside text-premium-text-secondary space-y-1">
            <li>Техническая информация (IP-адрес, тип браузера, операционная система);</li>
            <li>Cookies и данные об использовании страниц;</li>
            <li>Данные, добровольно предоставленные через формы проверки (ИИН, БИН, номер дела);</li>
            <li>Данные, переданные через Telegram-бота.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-premium-navy-800 mb-2">3. Использование информации</h2>
          <p className="text-premium-text-secondary">Собранная информация используется для:</p>
          <ul className="list-disc list-inside text-premium-text-secondary space-y-1">
            <li>Предоставления услуг проверки реквизитов и сопровождения операций;</li>
            <li>Улучшения работы и содержания Сервиса;</li>
            <li>Ответа на запросы пользователей;</li>
            <li>Анализа посещаемости и поведения пользователей.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-premium-navy-800 mb-2">4. Защита данных</h2>
          <p className="text-premium-text-secondary">
            Сервис принимает необходимые технические и организационные меры для защиты
            персональных данных от несанкционированного доступа, изменения, раскрытия
            или уничтожения. Все проверки проводятся в зашифрованном канале.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-premium-navy-800 mb-2">5. Контактная информация</h2>
          <p className="text-premium-text-secondary">
            По вопросам, связанным с обработкой персональных данных, обращайтесь через
            Telegram-бот: <a href="https://t.me/payguard_support_bot" className="text-green-600 hover:underline">@payguard_support_bot</a>
          </p>
        </section>
      </div>
    </div>
  );
}
