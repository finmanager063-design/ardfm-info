import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import {
  AGENCY_ADDRESS,
  AGENCY_SCHEDULE,
  CONTACT_CHANNELS,
  CONTACT_SERVICES,
  CONTACT_STEPS,
  MAP_EMBED,
} from "@/lib/contacts-data";

function ShieldIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00C853" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l7 4v5c0 5-3.5 9.7-7 11-3.5-1.3-7-6-7-11V6l7-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function ContactsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-premium-navy-900 py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,200,83,0.06)_0%,_transparent_60%)]" />
        <div className="premium-container relative text-center">
          <Reveal direction="up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm mb-4">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Свяжитесь с нами
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Контакты</h1>
            <p className="text-white/60 max-w-lg mx-auto">
              Мы здесь, чтобы помочь с проверкой реквизитов и безопасным сопровождением ваших финансовых операций
            </p>
          </Reveal>
        </div>
      </section>

      <div className="premium-container py-10">
        <Reveal direction="up">
          <section className="mb-10">
            <h2 className="text-xl font-bold text-premium-navy-800 mb-4">Электронные услуги</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {CONTACT_SERVICES.map((s, i) => (
                <div key={s.title} className="premium-card p-5 flex items-start gap-4">
                  <span className="text-2xl shrink-0">{s.icon}</span>
                  <div>
                    <h3 className="font-semibold text-premium-navy-800 mb-1">{s.title}</h3>
                    <p className="text-sm text-premium-text-secondary mb-2">{s.text}</p>
                    {"internal" in s && s.internal ? (
                      <Link href={s.href} className="text-green-600 text-sm font-medium hover:underline">Перейти →</Link>
                    ) : (
                      <a href={s.href} className="text-green-600 text-sm font-medium hover:underline" target="_blank" rel="noreferrer">Через бот →</a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <Reveal direction="up">
            <section className="premium-card p-6">
              <h2 className="text-xl font-bold text-premium-navy-800 mb-4">Каналы связи</h2>
              <ul className="space-y-3">
                {CONTACT_CHANNELS.map((ch) => (
                  <li key={ch.id} className="flex items-start gap-3">
                    <span className="text-lg">{ch.icon}</span>
                    <div>
                      <div className="font-medium text-premium-navy-800 text-sm">{ch.title}</div>
                      <a href={ch.href} target={ch.id === "telegram" || ch.id === "email" ? "_blank" : undefined} rel="noreferrer" className="text-green-600 text-sm font-medium hover:underline">
                        {ch.value}
                      </a>
                      <div className="text-xs text-premium-text-secondary">{ch.note}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal direction="up" delay={80}>
            <section className="premium-card p-6">
              <h2 className="text-xl font-bold text-premium-navy-800 mb-4">Адрес</h2>
              <address className="not-italic text-sm text-premium-text-secondary mb-4">
                <strong className="text-premium-navy-800">PayGuard</strong><br />
                {AGENCY_ADDRESS.zip}, {AGENCY_ADDRESS.city}<br />
                {AGENCY_ADDRESS.street}<br />
                {AGENCY_ADDRESS.country}
              </address>
              <div className="rounded-xl overflow-hidden border border-premium-border">
                <iframe
                  title="Карта — г. Алматы"
                  src={MAP_EMBED}
                  width="100%"
                  height="180"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ border: 0 }}
                />
              </div>
            </section>
          </Reveal>
        </div>

        <Reveal direction="up" delay={100}>
          <section className="premium-card p-6">
            <h2 className="text-xl font-bold text-premium-navy-800 mb-4">Режим работы</h2>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-premium-text-secondary">Приём обращений</div>
                <div className="font-medium text-premium-navy-800">{AGENCY_SCHEDULE.reception}</div>
              </div>
              <div>
                <div className="text-premium-text-secondary">Перерыв</div>
                <div className="font-medium text-premium-navy-800">{AGENCY_SCHEDULE.break}</div>
              </div>
              <div>
                <div className="text-premium-text-secondary">Telegram-бот</div>
                <div className="font-medium text-premium-navy-800">
                  <a href="https://t.me/payguard_support_bot" target="_blank" rel="noreferrer" className="text-green-600 hover:underline">
                    {AGENCY_SCHEDULE.online}
                  </a>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal direction="up" delay={120}>
          <section className="mt-10">
            <h2 className="text-xl font-bold text-premium-navy-800 mb-4">Как направить обращение</h2>
            <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {CONTACT_STEPS.map((step) => (
                <li key={step.num} className="premium-card p-5">
                  <span className="w-8 h-8 rounded-full bg-green-500 text-white text-sm font-bold flex items-center justify-center mb-3">
                    {step.num}
                  </span>
                  <h3 className="font-semibold text-premium-navy-800 text-sm mb-1">{step.title}</h3>
                  <p className="text-xs text-premium-text-secondary">{step.text}</p>
                </li>
              ))}
            </ol>
          </section>
        </Reveal>
      </div>
    </div>
  );
}
