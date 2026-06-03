'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { GovNews, GovProject, SiteContent } from '@/lib/types'
import { getDiversePhoto } from '@/lib/photo-pool'
import { HOME_IMPORTANT_LINKS } from '@/lib/home-data'

function formatDate(dateStr: string): string {
  try { return new Date(dateStr).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' }) }
  catch { return dateStr }
}

function CounterDisplay({ to }: { to: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const triggered = useRef(false)

  useEffect(() => {
    if (triggered.current) return
    if (typeof IntersectionObserver === 'undefined') { setCount(to); return }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        triggered.current = true
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
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [to])

  return <span ref={ref}>{count.toLocaleString('ru-RU')}</span>
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } })
}

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

const services = [
  { icon: '📋', title: 'Проверить лицензию', desc: 'Поиск в реестре лицензированных финансовых организаций', href: '/financial-organizations' },
  { icon: '🛡️', title: 'Подать обращение', desc: 'Отправить жалобу через Telegram-бот', href: 'https://t.me/finance_regulator_bot' },
  { icon: '⚠️', title: 'Сообщить о мошенничестве', desc: 'Информация о нелегальной деятельности и финансовых пирамидах', href: '/consumer-protection' },
  { icon: '📄', title: 'Документы Агентства', desc: 'Нормативные правовые акты и проекты документов', href: '/documents/1' },
  { icon: '💬', title: 'Часто задаваемые вопросы', desc: 'Ответы на популярные вопросы о финансовом рынке', href: '/about/faq' },
  { icon: '📊', title: 'Финансовая грамотность', desc: 'Образовательные материалы и программы', href: '/activities/directions' },
]

export function HomePageClient({ allNews, projects, meta }: { allNews: GovNews[]; projects: GovProject[]; meta: SiteContent['meta'] }) {
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.98])

  const banners = projects.filter(p => p.icon || p.heropic).slice(0, 6)

  return (
    <div className="premium-root">
      {/* Hero */}
      <motion.section style={{ opacity: heroOpacity, scale: heroScale }} className="relative min-h-[90vh] flex items-center bg-premium-navy-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.08)_0%,_transparent_60%)]" />
          <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        </div>

        <div className="premium-container relative pt-28 pb-16 w-full">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-premium-gold/10 border border-premium-gold/20 text-premium-gold text-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-premium-gold animate-pulse" />
                Агентство финансового рынка
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-white leading-[1.08] tracking-tight mb-4">
                Защита ваших
                <span className="text-premium-gold block mt-1">финансов</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-base sm:text-lg text-white/60 leading-relaxed max-w-lg mb-6">
                Агентство Республики Казахстан по регулированию и развитию финансового рынка
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                <a href="https://t.me/finance_regulator_bot" target="_blank" rel="noreferrer" className="premium-btn premium-btn-primary text-sm sm:text-base !py-3 !px-5 sm:!px-6">
                  ✈️ Подать обращение
                </a>
                <Link href="/financial-organizations" className="premium-btn premium-btn-secondary text-sm sm:text-base !py-3 !px-5 sm:!px-6">
                  Реестр лицензий
                </Link>
              </motion.div>

              <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-10 pt-6 border-t border-white/10">
                <div className="text-center"><div className="text-xl sm:text-2xl font-bold text-premium-gold tabular-nums"><CounterDisplay to={21} /></div><div className="text-xs text-white/60 mt-0.5">Банков</div></div>
                <div className="text-center"><div className="text-xl sm:text-2xl font-bold text-premium-gold tabular-nums"><CounterDisplay to={28} /></div><div className="text-xs text-white/60 mt-0.5">Страховых</div></div>
                <div className="text-center"><div className="text-xl sm:text-2xl font-bold text-premium-gold tabular-nums"><CounterDisplay to={46} /> трлн</div><div className="text-xs text-white/60 mt-0.5">Активы банков</div></div>
                <div className="text-center"><div className="text-xl sm:text-2xl font-bold text-premium-gold tabular-nums"><CounterDisplay to={190} />+</div><div className="text-xs text-white/60 mt-0.5">МФО</div></div>
              </motion.div>
            </div>

            <motion.div variants={fadeUp} className="hidden lg:flex items-center justify-center">
              <div className="relative w-72 h-72">
                <div className="absolute inset-0 rounded-full bg-premium-gold/5 border border-premium-gold/10" style={{ animation: 'premium-float 6s ease-in-out infinite' }} />
                <div className="absolute inset-8 rounded-full bg-premium-gold/10 border border-premium-gold/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl mb-2">🏛️</div>
                    <div className="text-premium-gold text-sm font-medium">АРРФР</div>
                    <div className="text-white/30 text-[10px] mt-1">Регулятор • Надзор • Защита</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Fraud Alert */}
      <div className="bg-[#1a0a0a] border-y border-red-900/30">
        <div className="premium-container py-2.5">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm">
            <span className="text-red-400 text-base shrink-0">🚨</span>
            <span className="text-red-300">
              <strong>Осторожно, мошенники!</strong>{' '}
              <span className="text-red-200/70">Не передавайте личные данные и коды третьим лицам. </span>
              <a href="https://t.me/finance_regulator_bot" target="_blank" rel="noreferrer" className="text-premium-gold hover:underline font-medium">Сообщить о мошенничестве</a>
            </span>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <section className="premium-section bg-premium-surface">
        <div className="premium-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-premium-navy-800 mb-2">Финансовый рынок в цифрах</h2>
            <p className="text-premium-text-secondary text-sm">Основные показатели финансового сектора Республики Казахстан</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[
              { value: '46,3 трлн', label: 'Активы банковского сектора', trend: '+12,4%' },
              { value: '2,8 трлн', label: 'Страховые премии', trend: '+8,7%' },
              { value: '1 247', label: 'Финансовых организаций', trend: '+3,2%' },
              { value: '99,8%', label: 'Доля застрахованных депозитов', trend: '+0,1%' },
            ].map((m, i) => (
              <motion.div key={m.label} variants={fadeUp} custom={i} className="premium-card p-4 sm:p-5 text-center">
                <div className="text-lg sm:text-2xl font-bold text-premium-navy-800 mb-1">{m.value}</div>
                <div className="text-xs text-premium-text-secondary leading-tight mb-2">{m.label}</div>
                <span className="inline-block text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">▲ {m.trend}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* News */}
      <section className="premium-section bg-white">
        <div className="premium-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-premium-navy-800 mb-1">Новости и пресс-релизы</h2>
              <p className="text-premium-text-secondary text-sm">Актуальная информация о деятельности Агентства</p>
            </div>
            <Link href="/press/news" className="text-premium-gold-dark text-sm font-medium hover:gap-2 transition-all inline-flex items-center gap-1">
              Все материалы →
            </Link>
          </motion.div>

          {allNews.length > 0 && (
            <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <Link href={`/press/releases/details/${allNews[0].id}`} className="premium-card overflow-hidden group block">
                  {allNews[0].heropic && (
                    <div className="aspect-[16/9] overflow-hidden bg-premium-navy-50">
                      <img src={allNews[0].heropic} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                    </div>
                  )}
                  <div className="p-4 sm:p-5">
                    <time className="text-xs text-premium-text-secondary">{formatDate(allNews[0].created_date || '')}</time>
                    <h3 className="font-semibold text-premium-navy-800 mt-1.5 group-hover:text-premium-gold-dark transition-colors">{allNews[0].title}</h3>
                    {allNews[0].short_description && (
                      <p className="text-sm text-premium-text-secondary mt-2 line-clamp-2">{allNews[0].short_description}</p>
                    )}
                  </div>
                </Link>
              </motion.div>

              <div className="space-y-2.5">
                {allNews.slice(1, 5).map((item, i) => (
                  <motion.div key={item.id} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.4 }}>
                    <Link href={`/press/releases/details/${item.id}`} className="flex items-start gap-3 p-3 rounded-xl hover:bg-premium-surface transition-colors group">
                      <div className="w-1.5 h-1.5 rounded-full bg-premium-gold shrink-0 mt-1.5" />
                      <div className="min-w-0">
                        <time className="text-xs text-premium-text-secondary block">{formatDate(item.created_date || '')}</time>
                        <span className="text-sm font-medium text-premium-text group-hover:text-premium-gold-dark transition-colors line-clamp-2">{item.title}</span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Services */}
      <section className="premium-section bg-premium-surface">
        <div className="premium-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-premium-navy-800 mb-2">Услуги Агентства</h2>
            <p className="text-premium-text-secondary text-sm">Полный спектр услуг для граждан и участников финансового рынка</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {services.map((s, i) => (
              <motion.a key={s.title} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel={s.href.startsWith('http') ? 'noreferrer' : undefined} variants={fadeUp} custom={i} className="premium-card p-4 sm:p-5 group cursor-pointer">
                <div className="text-xl sm:text-2xl mb-2">{s.icon}</div>
                <h3 className="font-semibold text-premium-navy-800 mb-1 group-hover:text-premium-gold-dark transition-colors text-sm sm:text-base">{s.title}</h3>
                <p className="text-xs sm:text-sm text-premium-text-secondary leading-relaxed">{s.desc}</p>
                <div className="mt-2 text-premium-gold-dark text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Подробнее →</div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Important Links */}
      {HOME_IMPORTANT_LINKS.length > 0 && (
        <section className="premium-section bg-white">
          <div className="premium-container">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-premium-navy-800 mb-2">Важная информация</h2>
              <p className="text-premium-text-secondary text-sm">Ключевые материалы и ресурсы Агентства</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="flex flex-wrap justify-center gap-2">
              {HOME_IMPORTANT_LINKS.map((link, i) => (
                <motion.a key={link.label} href={link.href} target={('external' in link && link.external) ? '_blank' : undefined} rel={('external' in link && link.external) ? 'noreferrer' : undefined} variants={fadeUp} custom={i}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-premium-border text-premium-text-secondary hover:text-premium-navy-800 hover:border-premium-gold/30 hover:bg-premium-gold-subtle transition-all text-sm font-medium"
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Projects */}
      {banners.length > 0 && (
        <section className="premium-section bg-premium-surface">
          <div className="premium-container">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-premium-navy-800 mb-2">Реализуемые проекты</h2>
              <p className="text-premium-text-secondary text-sm">Проекты, направленные на развитие финансового рынка</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {banners.slice(0, 4).map((p, i) => {
                const img = p.icon || p.heropic || getDiversePhoto(`project-${p.id}`)
                return (
                  <motion.a key={p.id} href={`/projects/details/${p.id}`} variants={fadeUp} custom={i} className="premium-card overflow-hidden group block">
                    {img && (
                      <div className="aspect-[4/3] overflow-hidden bg-premium-navy-50">
                        <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                      </div>
                    )}
                    <div className="p-3 text-sm font-medium text-premium-navy-800 text-center">{p.title}</div>
                  </motion.a>
                )
              })}
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative overflow-hidden bg-premium-navy-900 py-14 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(212,175,55,0.06)_0%,_transparent_50%)]" />
        <div className="premium-container relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Нужна помощь?</h2>
            <p className="text-white/60 text-sm sm:text-base max-w-md mx-auto mb-6">
              Направьте обращение через Telegram-бот. Круглосуточно, быстро, конфиденциально
            </p>
            <a href="https://t.me/finance_regulator_bot" target="_blank" rel="noreferrer" className="premium-btn premium-btn-primary text-base sm:text-lg !py-3.5 !px-7 sm:!px-8">
              ✈️ @finance_regulator_bot
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
