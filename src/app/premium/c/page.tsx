"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

function Counter({ to, label, suffix = "" }: { to: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const dur = 2.5;
    const start = performance.now();
    let frame: number;
    const fn = (now: number) => {
      const pct = Math.min((now - start) / (dur * 1000), 1);
      const ease = 1 - Math.pow(1 - pct, 4);
      setCount(Math.floor(ease * to));
      if (pct < 1) frame = requestAnimationFrame(fn);
    };
    frame = requestAnimationFrame(fn);
    return () => cancelAnimationFrame(frame);
  }, [inView, to]);

  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-amber-300 mb-1 tabular-nums" style={{ textShadow: "0 0 40px rgba(251, 191, 36, 0.3)" }}>
        <span ref={ref}>{count.toLocaleString("ru-RU")}</span>
        {suffix}
      </div>
      <div className="text-sm text-amber-100/50">{label}</div>
    </div>
  );
}

const services = [
  { icon: "📋", title: "Реестр лицензий", desc: "Поиск в реестре лицензированных финансовых организаций", href: "/financial-organizations" },
  { icon: "✈️", title: "Подать обращение", desc: "Отправить жалобу через Telegram-бот", href: "https://t.me/finance_regulator_bot" },
  { icon: "🛡️", title: "Защита прав", desc: "Споры с банками, страховщиками, МФО", href: "/consumer-protection" },
  { icon: "📄", title: "Документы", desc: "Нормативные правовые акты", href: "/documents/1" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } }),
};

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

export default function VariantC() {
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.6]);

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="premium-root bg-neutral-950 text-white overflow-hidden" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Navbar */}
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.9) 0%, transparent 100%)",
        }}
      >
        <div className="premium-container flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-neutral-950 font-bold text-sm shadow-lg shadow-amber-500/20">
              АР
            </div>
            <div>
              <span className="text-amber-300/80 text-xs font-medium uppercase tracking-[0.2em] block leading-tight">Агентство РК</span>
              <span className="text-white/40 text-[10px] uppercase tracking-widest">Финансовый рынок</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {["Об Агентстве", "Деятельность", "Документы", "Пресс-центр"].map((item) => (
              <Link key={item} href="/about" className="px-4 py-2 text-sm text-white/60 hover:text-amber-300 rounded-lg hover:bg-white/5 transition-all">
                {item}
              </Link>
            ))}
          </nav>
          <a
            href="https://t.me/finance_regulator_bot"
            target="_blank"
            rel="noreferrer"
            className="premium-btn text-sm !py-2.5 !px-5"
            style={{
              background: "linear-gradient(135deg, #D4AF37, #f59e0b)",
              color: "#0a0a0a",
              borderRadius: "9999px",
              fontWeight: 700,
              boxShadow: "0 4px 24px rgba(212, 175, 55, 0.3)",
            }}
          >
            ✈️ Telegram-бот
          </a>
        </div>
      </motion.header>

      {/* Hero — immersive parallax */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="absolute inset-0">
          <div className="absolute inset-0" style={{
            background: "radial-gradient(ellipse 100% 60% at 50% 0%, rgba(212, 175, 55, 0.1), transparent), radial-gradient(ellipse 80% 50% at 80% 100%, rgba(245, 158, 11, 0.05), transparent)",
          }} />
          <div className="absolute inset-0" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0L61 35L98 35L68 57L79 92L50 70L21 92L32 57L2 35L39 35Z' fill='%23D4AF37' fill-opacity='0.03'/%3E%3C/svg%3E\")",
            backgroundSize: "100px 100px",
          }} />
        </motion.div>

        <div className="premium-container relative pt-24 pb-16 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" animate={heroInView ? "visible" : "hidden"} variants={stagger}>
              <motion.div variants={fadeUp} className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-lg shadow-amber-400/50" />
                Агентство финансового рынка
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
                Ваши финансы{" "}
                <span className="text-transparent bg-clip-text" style={{
                  backgroundImage: "linear-gradient(135deg, #D4AF37, #fbbf24, #D4AF37)",
                  backgroundSize: "200% auto",
                  animation: "premium-shimmer 3s linear infinite",
                }}>
                  под защитой
                </span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-lg text-white/40 leading-relaxed max-w-lg mb-8">
                Агентство Республики Казахстан по регулированию и развитию финансового рынка
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <a
                  href="https://t.me/finance_regulator_bot"
                  target="_blank"
                  rel="noreferrer"
                  className="premium-btn text-base !py-3.5 !px-7"
                  style={{
                    background: "linear-gradient(135deg, #D4AF37, #f59e0b)",
                    color: "#0a0a0a",
                    borderRadius: "9999px",
                    fontWeight: 700,
                    boxShadow: "0 8px 32px rgba(212, 175, 55, 0.35)",
                  }}
                >
                  ✈️ Подать обращение
                </a>
                <Link
                  href="/financial-organizations"
                  className="premium-btn text-base !py-3.5 !px-7"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    color: "#D4AF37",
                    borderRadius: "9999px",
                    border: "1px solid rgba(212, 175, 55, 0.2)",
                  }}
                >
                  Реестр лицензий
                </Link>
              </motion.div>

              <motion.div variants={fadeUp} className="grid grid-cols-3 gap-10 mt-14 pt-8 border-t border-amber-500/10">
                <Counter to={21} label="Банков" />
                <Counter to={28} label="Страховых" />
                <Counter to={190} label="МФО" suffix="+" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
              className="hidden lg:flex items-center justify-center"
            >
              <div className="relative">
                <div className="w-96 h-96 relative flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-amber-500/5" style={{ boxShadow: "0 0 80px rgba(212, 175, 55, 0.1)" }} />
                  <div className="absolute inset-8 rounded-full bg-amber-500/10" style={{ boxShadow: "inset 0 0 60px rgba(212, 175, 55, 0.05)" }} />
                  <div className="absolute inset-16 rounded-full bg-gradient-to-br from-amber-400/20 to-yellow-600/20" />
                  <div className="relative text-center">
                    <div className="text-7xl mb-3 opacity-80">✦</div>
                    <div className="text-amber-400 text-sm font-medium tracking-[0.3em] uppercase">АРРФР</div>
                    <div className="text-white/20 text-xs mt-1">Регулятор • Надзор • Защита</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Alert */}
      <div className="border-y border-amber-500/10 bg-amber-500/[0.02]">
        <div className="premium-container py-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex items-center gap-3 text-sm text-white/50">
            <span className="text-amber-400">✦</span>
            <span>
              <strong className="text-amber-300">Внимание!</strong> Агентство призывает быть бдительными. Не передавайте личные данные третьим лицам.{" "}
              <a href="https://t.me/finance_regulator_bot" target="_blank" rel="noreferrer" className="text-amber-400 hover:text-amber-300 transition-colors">
                Сообщить о мошенничестве
              </a>
            </span>
          </motion.div>
        </div>
      </div>

      {/* Services */}
      <section className="py-20 md:py-28">
        <div className="premium-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="text-amber-400 text-sm font-medium tracking-[0.2em] uppercase mb-3">Наши услуги</div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-3">Полный спектр услуг</h2>
            <p className="text-white/40 max-w-lg mx-auto">Для граждан и участников финансового рынка Казахстана</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {services.map((s, i) => (
              <motion.a
                key={s.title}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                variants={fadeUp}
                custom={i}
                className="group p-7 rounded-2xl transition-all duration-500 cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(212, 175, 55, 0.03))",
                  border: "1px solid rgba(212, 175, 55, 0.08)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, rgba(212, 175, 55, 0.08), rgba(255,255,255,0.03))";
                  e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.2)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(212, 175, 55, 0.03))";
                  e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.08)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="font-semibold text-white text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{s.desc}</p>
                <div className="mt-4 text-amber-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all translate-x-[-4px] group-hover:translate-x-0">
                  Подробнее →
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at center, rgba(212, 175, 55, 0.06), transparent 70%)",
        }} />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="premium-container relative text-center"
        >
          <div className="max-w-2xl mx-auto">
            <div className="text-amber-400 text-sm font-medium tracking-[0.2em] uppercase mb-4">Обратная связь</div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
              Нужна консультация?
            </h2>
            <p className="text-white/40 text-lg max-w-md mx-auto mb-10">
              Направьте обращение через Telegram-бот. Круглосуточно, быстро, конфиденциально
            </p>
            <a
              href="https://t.me/finance_regulator_bot"
              target="_blank"
              rel="noreferrer"
              className="premium-btn text-lg !py-4 !px-10"
              style={{
                background: "linear-gradient(135deg, #D4AF37, #f59e0b)",
                color: "#0a0a0a",
                borderRadius: "9999px",
                fontWeight: 700,
                fontSize: "1.1rem",
                boxShadow: "0 8px 40px rgba(212, 175, 55, 0.3)",
              }}
            >
              ✈️ @finance_regulator_bot
            </a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-amber-500/10 py-14" style={{
        background: "linear-gradient(180deg, transparent, rgba(212, 175, 55, 0.02))",
      }}>
        <div className="premium-container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-neutral-950 font-bold text-sm">АР</div>
                <div>
                  <span className="text-amber-300/80 text-xs font-medium uppercase tracking-[0.2em] block leading-tight">Агентство РК</span>
                  <span className="text-white/30 text-[10px] uppercase tracking-widest">Финансовый рынок</span>
                </div>
              </div>
              <p className="text-xs text-white/30 leading-relaxed">Агентство Республики Казахстан по регулированию и развитию финансового рынка</p>
            </div>
            <div>
              <h4 className="text-amber-300/60 font-semibold text-sm mb-3">Разделы</h4>
              <ul className="space-y-2 text-sm">
                {["Об Агентстве", "Деятельность", "Документы", "Пресс-центр"].map((l) => (
                  <li key={l}><Link href="/about" className="text-white/40 hover:text-amber-300 transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-amber-300/60 font-semibold text-sm mb-3">Официальные ресурсы</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="https://www.gov.kz" target="_blank" rel="noreferrer" className="text-white/40 hover:text-amber-300 transition-colors">gov.kz</a></li>
                <li><a href="https://www.akorda.kz" target="_blank" rel="noreferrer" className="text-white/40 hover:text-amber-300 transition-colors">akorda.kz</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-amber-300/60 font-semibold text-sm mb-3">Обращения</h4>
              <a
                href="https://t.me/finance_regulator_bot"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold"
                style={{
                  background: "linear-gradient(135deg, #D4AF37, #f59e0b)",
                  color: "#0a0a0a",
                }}
              >
                ✈️ Telegram-бот
              </a>
            </div>
          </div>
          <div className="pt-6 border-t border-amber-500/10 flex flex-col sm:flex-row justify-between gap-4 text-xs text-white/30">
            <p>© {new Date().getFullYear()} Агентство Республики Казахстан по регулированию и развитию финансового рынка</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
