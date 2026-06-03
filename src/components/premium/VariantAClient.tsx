'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { GovNews, SiteContent } from '@/lib/types'

function CounterDisplay({ to }: { to: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const triggeredRef = useRef(false)

  useEffect(() => {
    if (triggeredRef.current) return
    if (typeof IntersectionObserver === 'undefined') {
      setCount(to)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          triggeredRef.current = true
          const duration = 2
          const start = performance.now()
          const animate = (now: number) => {
            const pct = Math.min((now - start) / (duration * 1000), 1)
            const ease = 1 - Math.pow(1 - pct, 3)
            setCount(Math.floor(ease * to))
            if (pct < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [to])

  return <span ref={ref}>{count.toLocaleString('ru-RU')}</span>
}

function Counter({ value, suffix = '', label, delay = 0 }: { value: number; suffix?: string; label: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
      className="text-center"
    >
      <div className="text-3xl md:text-4xl font-bold text-premium-gold mb-1">
        <span className="tabular-nums"><CounterDisplay to={value} /></span>{suffix}
      </div>
      <div className="text-sm text-white/70">{label}</div>
    </motion.div>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }
  })
}

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

const services = [
  { icon: '📋', title: 'Реестр лицензий', desc: 'Поиск в реестре лицензированных финансовых организаций', href: '/financial-organizations' },
  { icon: '✈️', title: 'Подать обращение', desc: 'Отправить жалобу через Telegram-бот', href: 'https://t.me/finance_regulator_bot' },
  { icon: '🛡️', title: 'Защита прав', desc: 'Споры с банками, страховщиками, МФО', href: '/consumer-protection' },
  { icon: '📄', title: 'Документы', desc: 'Нормативные правовые акты', href: '/documents/1' },
]

export function VariantAClient({ news, meta }: { news: GovNews[]; meta: SiteContent['meta'] }) {
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.98])

  return (
    <div className="premium-root" style={{ background: '#fff' }}>
      {/* Navbar */}
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        className="fixed top-0 left-0 right-0 z-50 premium-glass-dark"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="premium-container flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%23D4AF37'/%3E%3Ccircle cx='50' cy='50' r='44' fill='%23001F4D'/%3E%3Ccircle cx='50' cy='50' r='38' fill='%23D4AF37'/%3E%3Cpath d='M50 20 L58 38 L78 38 L62 50 L68 70 L50 58 L32 70 L38 50 L22 38 L42 38 Z' fill='%23001F4D'/%3E%3C/svg%3E" alt="" className="w-8 h-8" />
            <span className="text-white/50 text-xs font-medium uppercase tracking-widest hidden sm:block">Информационный ресурс</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {['Об Агентстве', 'Деятельность', 'Документы', 'Пресс-центр', 'Контакты'].map((item) => (
              <Link key={item} href="/about" className="px-3 py-2 text-sm text-white/80 hover:text-white rounded-lg hover:bg-white/5 transition-all">{item}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="https://t.me/finance_regulator_bot" target="_blank" rel="noreferrer" className="premium-btn premium-btn-primary text-sm !py-2 !px-4">
              ✈️ Telegram-бот
            </a>
          </div>
        </div>
      </motion.header>

      {/* Hero */}
      <motion.section style={{ opacity: heroOpacity, scale: heroScale }} className="relative min-h-screen flex items-center bg-premium-navy-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.08)_0%,_transparent_60%)]" />
          <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.02\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        </div>

        <div className="premium-container relative pt-24 pb-16">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-premium-gold/10 border border-premium-gold/20 text-premium-gold text-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-premium-gold animate-pulse" />
                Официальный информационный ресурс
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.08] tracking-tight mb-6">
                Защита ваших
                <span className="text-premium-gold block">финансов</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-lg text-white/60 leading-relaxed max-w-lg mb-8">
                Агентство Республики Казахстан по регулированию и развитию финансового рынка
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <a href="https://t.me/finance_regulator_bot" target="_blank" rel="noreferrer" className="premium-btn premium-btn-primary text-base !py-3 !px-6">
                  ✈️ Подать обращение
                </a>
                <Link href="/financial-organizations" className="premium-btn premium-btn-secondary text-base !py-3 !px-6">
                  Реестр лицензий
                </Link>
              </motion.div>

              <motion.div variants={fadeUp} className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/10">
                <Counter value={21} label="Банков" delay={0.4} />
                <Counter value={28} label="Страховых" delay={0.5} />
                <Counter value={190} suffix="+" label="МФО" delay={0.6} />
              </motion.div>
            </div>

            <motion.div
              variants={fadeUp}
              className="hidden lg:flex items-center justify-center"
            >
              <div className="relative">
                <div className="w-80 h-80 rounded-full bg-premium-gold/5 border border-premium-gold/10 flex items-center justify-center" style={{ animation: 'premium-float 6s ease-in-out infinite' }}>
                  <div className="w-64 h-64 rounded-full bg-premium-gold/10 border border-premium-gold/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-2">🏛️</div>
                      <div className="text-premium-gold text-sm font-medium">АРРФР</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Alert */}
      <section className="bg-premium-navy-50 border-b border-premium-border">
        <div className="premium-container py-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 text-sm"
          >
            <span className="text-lg">⚠️</span>
            <span className="text-premium-text-secondary">
              <strong className="text-premium-navy-800">Внимание!</strong>{' '}
              Агентство призывает быть бдительными. Не передавайте личные данные третьим лицам.{' '}
              <a href="https://t.me/finance_regulator_bot" target="_blank" rel="noreferrer" className="text-premium-gold-dark font-medium hover:underline">Сообщить о мошенничестве</a>
            </span>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="premium-section bg-white">
        <div className="premium-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-premium-navy-800 mb-3">Услуги Агентства</h2>
            <p className="text-premium-text-secondary max-w-lg mx-auto">Полный спектр услуг для граждан и участников финансового рынка</p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {services.map((s, i) => (
              <motion.a
                key={s.title}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
                variants={fadeUp}
                custom={i}
                className="premium-card p-6 group cursor-pointer"
              >
                <div className="text-2xl mb-3">{s.icon}</div>
                <h3 className="font-semibold text-premium-navy-800 mb-1.5 group-hover:text-premium-gold-dark transition-colors">{s.title}</h3>
                <p className="text-sm text-premium-text-secondary leading-relaxed">{s.desc}</p>
                <div className="mt-3 text-premium-gold-dark text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">Подробнее →</div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* News */}
      <section className="premium-section bg-premium-surface">
        <div className="premium-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-premium-navy-800 mb-2">Новости</h2>
              <p className="text-premium-text-secondary">Актуальная информация о деятельности Агентства</p>
            </div>
            <Link href="/press/news" className="hidden sm:flex items-center gap-1 text-premium-gold-dark font-medium hover:gap-2 transition-all">
              Все материалы →
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {news.slice(0, 2).map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
              >
                <Link href={`/press/releases/details/${item.id}`} className="premium-card overflow-hidden group block">
                  {'heropic' in item && item.heropic && (
                    <div className="aspect-[16/9] overflow-hidden bg-premium-navy-50">
                      <img src={item.heropic} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                    </div>
                  )}
                  <div className="p-5">
                    <time className="text-xs text-premium-text-secondary">{item.created_date || ''}</time>
                    <h3 className="font-semibold text-premium-navy-800 mt-1.5 group-hover:text-premium-gold-dark transition-colors line-clamp-2">{item.title}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 grid sm:grid-cols-3 gap-3"
          >
            {news.slice(2, 5).map((item) => (
              <Link key={item.id} href={`/press/releases/details/${item.id}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white transition-colors group">
                <div className="w-1.5 h-1.5 rounded-full bg-premium-gold shrink-0" />
                <div className="min-w-0">
                  <time className="text-xs text-premium-text-secondary block">{item.created_date || ''}</time>
                  <span className="text-sm font-medium text-premium-text group-hover:text-premium-gold-dark transition-colors line-clamp-1">{item.title}</span>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-premium-navy-900 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(212,175,55,0.06)_0%,_transparent_50%)]" />
        <div className="premium-container relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Нужна помощь или консультация?</h2>
            <p className="text-white/60 max-w-md mx-auto mb-8">
              Направьте обращение через Telegram-бот. Круглосуточно, быстро, конфиденциально
            </p>
            <a
              href="https://t.me/finance_regulator_bot"
              target="_blank"
              rel="noreferrer"
              className="premium-btn premium-btn-primary text-lg !py-4 !px-8"
            >
              ✈️ @finance_regulator_bot
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-premium-navy-950 text-white/50 py-12">
        <div className="premium-container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%23D4AF37'/%3E%3Ccircle cx='50' cy='50' r='44' fill='%23001F4D'/%3E%3Ccircle cx='50' cy='50' r='38' fill='%23D4AF37'/%3E%3Cpath d='M50 20 L58 38 L78 38 L62 50 L68 70 L50 58 L32 70 L38 50 L22 38 L42 38 Z' fill='%23001F4D'/%3E%3C/svg%3E" alt="" className="w-8 h-8" />
                <span className="text-white/80 font-semibold text-sm">{meta.entityShort}</span>
              </div>
              <p className="text-xs leading-relaxed">{meta.entityTitle}</p>
            </div>
            <div>
              <h4 className="text-white/80 font-semibold text-sm mb-3">Разделы</h4>
              <ul className="space-y-2 text-sm">
                {['Об Агентстве', 'Деятельность', 'Документы', 'Пресс-центр', 'Контакты'].map((l) => (
                  <li key={l}><Link href="/about" className="hover:text-premium-gold transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white/80 font-semibold text-sm mb-3">Официальные ресурсы</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="https://www.gov.kz" target="_blank" rel="noreferrer" className="hover:text-premium-gold transition-colors">gov.kz</a></li>
                <li><a href="https://www.akorda.kz" target="_blank" rel="noreferrer" className="hover:text-premium-gold transition-colors">akorda.kz</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white/80 font-semibold text-sm mb-3">Обращения</h4>
              <a href="https://t.me/finance_regulator_bot" target="_blank" rel="noreferrer" className="premium-btn premium-btn-primary text-sm !py-2 !px-4 inline-flex">
                ✈️ Telegram-бот
              </a>
            </div>
          </div>
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-4 text-xs">
            <p>© {new Date().getFullYear()} Информационный ресурс. Не является официальным сайтом госоргана.</p>
            <p>Обновлено: {new Date(meta.syncedAt || Date.now()).toLocaleDateString('ru-RU')}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
