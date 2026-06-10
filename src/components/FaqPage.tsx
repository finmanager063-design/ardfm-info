import Link from "next/link";

const FAQ_ITEMS = [
  {
    q: "Как проверить получателя перед переводом?",
    a: "Введите ИИН, БИН или номер дела в форму на странице «Проверить выплаты». Система мгновенно покажет статус и информацию о получателе."
  },
  {
    q: "Какие данные нужны для проверки?",
    a: "Достаточно ИИН (для физических лиц), БИН (для юридических лиц) или номера дела, если он был вам предоставлен."
  },
  {
    q: "Безопасно ли использовать PayGuard?",
    a: "Да. Все проверки проводятся в зашифрованном канале. Ваши данные не передаются третьим лицам и не сохраняются после проверки."
  },
  {
    q: "Сколько времени занимает проверка?",
    a: "Проверка занимает несколько секунд. Результат отображается сразу после ввода данных."
  },
  {
    q: "Как связаться с поддержкой?",
    a: "Напишите в Telegram-бота @payguard_support_bot. Поддержка работает круглосуточно."
  },
  {
    q: "Какие операции можно проверить?",
    a: "Вы можете проверить статус получателя для любых финансовых переводов: зарплата, оплата услуг, расчёты между юрлицами, переводы между физлицами."
  },
  {
    q: "Нужно ли платить за проверку?",
    a: "Базовая проверка реквизитов бесплатна. Дополнительные услуги (расширенный отчёт, срочная верификация) оплачиваются отдельно."
  },
];

export function FaqPage() {
  return (
    <div className="premium-container py-8">
      <nav className="text-sm text-premium-text-secondary mb-4">
        <Link href="/" className="hover:text-green-600">Главная</Link>
        <span className="mx-2">/</span>
        <Link href="/about" className="hover:text-green-600">О сервисе</Link>
        <span className="mx-2">/</span>
        <span>FAQ</span>
      </nav>
      <h1 className="text-2xl sm:text-3xl font-bold text-premium-navy-800 mb-2">Часто задаваемые вопросы</h1>
      <p className="text-premium-text-secondary text-sm mb-6">
        Ответы на типовые вопросы о проверке реквизитов и работе сервиса
      </p>
      <div className="space-y-3 max-w-3xl">
        {FAQ_ITEMS.map((item) => (
          <details key={item.q} className="premium-card p-4 group open:border-green-200">
            <summary className="font-semibold text-premium-navy-800 cursor-pointer text-sm list-none flex items-center justify-between">
              {item.q}
              <span className="text-green-500 group-open:rotate-180 transition-transform text-xs">▼</span>
            </summary>
            <p className="text-premium-text-secondary text-sm mt-2 leading-relaxed">{item.a}</p>
          </details>
        ))}
      </div>
      <section className="mt-8 p-6 premium-card text-center">
        <h2 className="text-lg font-bold text-premium-navy-800 mb-2">Не нашли ответ?</h2>
        <p className="text-premium-text-secondary text-sm mb-4">Напишите в Telegram-бота — мы поможем</p>
        <a href="https://t.me/payguard_support_bot" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-500 hover:bg-green-400 text-white font-semibold text-sm transition-all">
          ✈️ @payguard_support_bot
        </a>
      </section>
    </div>
  );
}
