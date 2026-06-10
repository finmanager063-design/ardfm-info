import Link from "next/link";

const features = [
  { icon: '🛡️', title: 'Проверка реквизитов', desc: 'Мгновенная верификация получателя по ИИН, БИН или номеру дела перед переводом средств' },
  { icon: '🔒', title: 'Безопасность данных', desc: 'Все проверки проводятся в зашифрованном канале. Ваши персональные данные не передаются третьим лицам.' },
  { icon: '⚡', title: 'Скорость', desc: 'Результат проверки за секунды. Не нужно ждать днями — вся информация доступна мгновенно.' },
  { icon: '📱', title: 'Доступность', desc: 'Сервис работает в браузере и через Telegram-бота. Проверяйте реквизиты с любого устройства.' },
  { icon: '🎯', title: 'Точность', desc: 'Актуальные данные из официальных источников. Минимизация риска ошибочных переводов.' },
  { icon: '💬', title: 'Поддержка 24/7', desc: 'Круглосуточная поддержка через Telegram-бота. Ответы на любые вопросы по проверке реквизитов.' },
]

export default function AboutPage() {
  return (
    <div>
      <section className="relative bg-premium-navy-900 py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,200,83,0.06)_0%,_transparent_60%)]" />
        <div className="premium-container relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            О сервисе
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">PayGuard — безопасность ваших переводов</h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            Сервис проверки и безопасного сопровождения финансовых операций в Казахстане
          </p>
        </div>
      </section>

      <div className="premium-container py-10">
        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-premium-navy-800 mb-4">О нас</h2>
          <p className="text-premium-text-secondary leading-relaxed mb-3">
            PayGuard — это сервис, созданный для безопасного сопровождения финансовых операций в Казахстане.
          </p>
          <p className="text-premium-text-secondary leading-relaxed mb-3">
            Мы помогаем убедиться в надёжности получателя перед переводом средств, проверить статус выплаты
            и получить пошаговую инструкцию для безопасного завершения сделки.
          </p>
          <p className="text-premium-text-secondary leading-relaxed">
            Наша цель — сделать финансовые переводы прозрачными, безопасными и доступными каждому жителю Казахстана.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-premium-navy-800 mb-6 text-center">Как мы работаем</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { num: '1', title: 'Вы вводите данные', desc: 'ИИН, БИН или номер дела получателя' },
              { num: '2', title: 'Мы проверяем', desc: 'Мгновенная проверка по базам данных' },
              { num: '3', title: 'Вы получаете отчёт', desc: 'Результат проверки и инструкция по переводу' },
            ].map((step) => (
              <div key={step.num} className="text-center premium-card p-6">
                <div className="w-10 h-10 rounded-full bg-green-500 text-white font-bold flex items-center justify-center mx-auto mb-3">
                  {step.num}
                </div>
                <h3 className="font-semibold text-premium-navy-800 mb-1">{step.title}</h3>
                <p className="text-sm text-premium-text-secondary">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-premium-navy-800 mb-6 text-center">Наши преимущества</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div key={f.title} className="premium-card p-5">
                <div className="text-2xl mb-2">{f.icon}</div>
                <h3 className="font-semibold text-premium-navy-800 mb-1 text-sm">{f.title}</h3>
                <p className="text-xs text-premium-text-secondary leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center mb-12">
          <h2 className="text-2xl font-bold text-premium-navy-800 mb-3">Начните проверку прямо сейчас</h2>
          <p className="text-premium-text-secondary text-sm mb-6">
            Введите ИИН или номер дела — результат за секунду
          </p>
          <Link href="/client-payouts" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500 hover:bg-green-400 text-white font-semibold text-sm transition-all">
            Проверить выплаты
          </Link>
        </section>
      </div>
    </div>
  );
}
