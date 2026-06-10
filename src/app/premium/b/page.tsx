"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

function Counter({ to, label, suffix = "" }: { to: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const dur = 2;
    const start = performance.now();
    let frame: number;
    const fn = (now: number) => {
      const pct = Math.min((now - start) / (dur * 1000), 1);
      const ease = 1 - Math.pow(1 - pct, 3);
      setCount(Math.floor(ease * to));
      if (pct < 1) frame = requestAnimationFrame(fn);
    };
    frame = requestAnimationFrame(fn);
    return () => cancelAnimationFrame(frame);
  }, [inView, to]);

  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent mb-1 tabular-nums">
        <span ref={ref}>{count.toLocaleString("ru-RU")}</span>
        {suffix}
      </div>
      <div className="text-sm text-white/60">{label}</div>
    </div>
  );
}

const services = [
  { icon: "▣", title: "Реестр лицензий", desc: "Все лицензированные организации финансового рынка", href: "/financial-organizations" },
  { icon: "✉", title: "Подать обращение", desc: "Telegram-бот для обращений граждан", href: "https://t.me/finance_regulator_bot" },
  { icon: "◈", title: "Защита прав", desc: "Споры с банками, страховщиками, МФО", href: "/consumer-protection" },
  { icon: "▤", title: "Документы", desc: "НПА и нормативные документы", href: "/documents/1" },
];

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.6, ease } }),
};

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

export default function VariantB() {
  const { scrollYProgress } = useScroll();
  const heroParallax = useTransform(scrollYProgress, [0, 0.2], [0, 60]);

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="premium-root bg-slate-950 text-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Glass navbar */}
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: "rgba(15, 23, 42, 0.8)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="premium-container flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold text-xs">
              PG
            </div>
            <span className="text-white/40 text-xs font-medium uppercase tracking-widest hidden sm:block">PayGuard</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {["Об Агентстве", "Деятельность", "Документы", "Пресс-центр"].map((item) => (
              <Link key={item} href="/about" className="px-3 py-2 text-sm text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-all">
                {item}
              </Link>
            ))}
          </nav>
          <a
            href="https://t.me/finance_regulator_bot"
            target="_blank"
            rel="noreferrer"
            className="premium-btn text-sm !py-2 !px-4"
            style={{
              background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
              color: "#fff",
              borderRadius: "10px",
              boxShadow: "0 4px 20px rgba(6, 182, 212, 0.3)",
            }}
          >
            ✉ Telegram-бот
          </a>
        </div>
      </motion.header>

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(6, 182, 212, 0.12), transparent), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(59, 130, 246, 0.08), transparent)",
            }}
          />
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
            <defs>
              <pattern id="grid-b" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-b)" />
          </svg>
        </div>

        <motion.div style={{ y: heroParallax }} className="premium-container relative pt-24 pb-16 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate={heroInView ? "visible" : "hidden"} variants={stagger}>
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-sm mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Агентство финансового рынка
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight mb-6">
                Финансовый рынок{" "}
                <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">под защитой</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-lg text-white/50 leading-relaxed max-w-lg mb-8">
                Агентство Республики Казахстан по регулированию и развитию финансового рынка
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                <a
                  href="https://t.me/finance_regulator_bot"
                  target="_blank"
                  rel="noreferrer"
                  className="premium-btn text-base !py-3 !px-6"
                  style={{
                    background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
                    color: "#fff",
                    borderRadius: "10px",
                    boxShadow: "0 4px 24px rgba(6, 182, 212, 0.35)",
                  }}
                >
                  ✉ Подать обращение
                </a>
                <Link
                  href="/financial-organizations"
                  className="premium-btn text-base !py-3 !px-6"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    color: "#fff",
                    borderRadius: "10px",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  Реестр лицензий
                </Link>
              </motion.div>

              <motion.div variants={fadeUp} className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/5">
                <Counter to={21} label="Банков" />
                <Counter to={28} label="Страховых" />
                <Counter to={190} label="МФО" suffix="+" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="hidden lg:flex items-center justify-center"
            >
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/10 to-blue-600/10 animate-pulse" style={{ animationDuration: "4s" }} />
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-600/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl mb-2 opacity-60">✦</div>
                    <div className="text-cyan-300 text-sm font-medium tracking-widest uppercase">PayGuard</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Alert */}
      <div className="border-y border-white/5 bg-white/[0.02]">
        <div className="premium-container py-3">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex items-center gap-3 text-sm text-white/60">
            <span className="text-cyan-400">ⓘ</span>
            <span>
              <strong className="text-white/80">Внимание!</strong> Не передавайте личные данные третьим лицам.{" "}
              <a href="https://t.me/finance_regulator_bot" target="_blank" rel="noreferrer" className="text-cyan-300 hover:underline">
                Сообщить о мошенничестве
              </a>
            </span>
          </motion.div>
        </div>
      </div>

      {/* Services */}
      <section className="py-20 md:py-28">
        <div className="premium-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Услуги Агентства</h2>
            <p className="text-white/50 max-w-lg mx-auto">Полный спектр услуг для граждан и участников финансового рынка</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {services.map((s, i) => (
              <motion.a
                key={s.title}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                variants={fadeUp}
                custom={i}
                className="group p-6 rounded-2xl transition-all duration-300 cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.borderColor = "rgba(6, 182, 212, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                }}
              >
                <div className="text-cyan-400 text-xl mb-3 font-light">{s.icon}</div>
                <h3 className="font-semibold text-white mb-1.5">{s.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{s.desc}</p>
                <div className="mt-3 text-cyan-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Подробнее →
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16" style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="premium-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { value: 300, label: "Поднадзорных организаций", suffix: "+" },
              { value: 98, label: "Уровень удовлетворённости", suffix: "%" },
              { value: 50000, label: "Обработано обращений", suffix: "+" },
              { value: 15, label: "Лет на страже рынка", suffix: "" },
            ].map((stat, i) => (
              <motion.div key={stat.label} variants={fadeUp} custom={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent mb-1 tabular-nums">
                  <CounterDisplay to={stat.value} />
                  {stat.suffix}
                </div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(6, 182, 212, 0.06), transparent 70%)" }} />
        <div className="premium-container relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Нужна помощь?</h2>
            <p className="text-white/50 max-w-md mx-auto mb-8">
              Направьте обращение через Telegram-бот. Круглосуточно, быстро, конфиденциально
            </p>
            <a
              href="https://t.me/finance_regulator_bot"
              target="_blank"
              rel="noreferrer"
              className="premium-btn text-lg !py-4 !px-8"
              style={{
                background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
                color: "#fff",
                borderRadius: "12px",
                boxShadow: "0 8px 32px rgba(6, 182, 212, 0.35)",
              }}
            >
              ✉ @finance_regulator_bot
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="premium-container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold text-xs">PG</div>
                <span className="text-white font-semibold text-sm">PayGuard</span>
              </div>
              <p className="text-xs text-white/40 leading-relaxed">Сервис проверки и безопасного сопровождения финансовых операций</p>
            </div>
            <div>
              <h4 className="text-white/60 font-semibold text-sm mb-3">Разделы</h4>
              <ul className="space-y-2 text-sm">
                {["Об Агентстве", "Деятельность", "Документы", "Пресс-центр"].map((l) => (
                  <li key={l}><Link href="/about" className="text-white/40 hover:text-white transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white/60 font-semibold text-sm mb-3">Официальные ресурсы</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="https://t.me/payguard_support_bot" target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors">Telegram Bot</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white/60 font-semibold text-sm mb-3">Обращения</h4>
              <a
                href="https://t.me/finance_regulator_bot"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
                style={{
                  background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
                  color: "#fff",
                }}
              >
                ✉ Telegram-бот
              </a>
            </div>
          </div>
          <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between gap-4 text-xs text-white/30">
            <p>© {new Date().getFullYear()} Агентство Республики Казахстан по регулированию и развитию финансового рынка</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CounterDisplay({ to }: { to: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const dur = 2;
    const start = performance.now();
    let frame: number;
    const fn = (now: number) => {
      const pct = Math.min((now - start) / (dur * 1000), 1);
      const ease = 1 - Math.pow(1 - pct, 3);
      setCount(Math.floor(ease * to));
      if (pct < 1) frame = requestAnimationFrame(fn);
    };
    frame = requestAnimationFrame(fn);
    return () => cancelAnimationFrame(frame);
  }, [inView, to]);

  return <span ref={ref}>{count.toLocaleString("ru-RU")}</span>;
}
