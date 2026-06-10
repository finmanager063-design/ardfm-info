'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

function formatDate(dateStr: string): string {
  try { return new Date(dateStr).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' }) }
  catch { return dateStr }
}

function CounterDisplay({ to, suffix = '' }: { to: number; suffix?: string }) {
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

  return <span ref={ref}>{count.toLocaleString('ru-RU')}{suffix}</span>
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } })
}

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

const services = [
  { icon: '🛡️', title: 'Проверка реквизитов', desc: 'Узнайте статус получателя по ИИН, БИН или номеру дела', href: '/client-payouts' },
  { icon: '🔍', title: 'Верификация сделки', desc: 'Проверьте контрагента перед переводом', href: '/client-payouts' },
  { icon: '✅', title: 'Безопасный перевод', desc: 'Пошаговая инструкция после подтверждения', href: '/about' },
  { icon: '💬', title: 'Чат с поддержкой', desc: 'Ответы на вопросы через Telegram-бота', href: 'https://t.me/payguard_support_bot' },
]

const features = [
  { icon: '⚡', title: 'Мгновенно', desc: 'Результат проверки за секунды' },
  { icon: '🔒', title: 'Безопасно', desc: 'Шифрование данных, никакой утечки' },
  { icon: '📱', title: 'Доступно', desc: 'Работает в браузере и Telegram' },
  { icon: '🎯', title: 'Точно', desc: 'Актуальные данные из официальных источников' },
]

type GovNewsItem = {
  id?: string | number
  title: string
  short_description?: string | null
  body?: string | null
  heropic?: string
  created_date?: string
  publication_date?: string
}

type ArticleItem = {
  id?: string | number
  alias?: string
  title: string
  content?: string
  heropic?: string
  publication_date?: string
}

export function HomePageClient({ news, articles }: { news?: GovNewsItem[]; articles?: ArticleItem[] }) {
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.98])
  const [iin, setIin] = useState('')

  return (
    <div className="premium-root">
      {/* Hero */}
      <motion.section style={{ opacity: heroOpacity, scale: heroScale }} className="relative min-h-[85vh] flex items-center bg-premium-navy-900 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,200,83,0.06)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

        <div className="premium-container relative pt-28 pb-16 w-full">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-3xl mx-auto text-center">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Сервис проверки финансовых операций
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-white leading-[1.08] tracking-tight mb-4">
              Проверка реквизитов и
              <span className="text-green-400 block mt-1">безопасный перевод средств</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-base sm:text-lg text-white/60 leading-relaxed max-w-2xl mx-auto mb-8">
              Узнайте статус получателя, верифицируйте сделку и переводите деньги без риска
            </motion.p>

            <motion.div variants={fadeUp} className="max-w-lg mx-auto mb-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={iin}
                  onChange={(e) => setIin(e.target.value)}
                  placeholder="Введите ИИН, БИН или номер дела"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-green-400/50 focus:bg-white/[0.12] transition-all text-sm"
                />
                <Link
                  href="/client-payouts"
                  className="px-6 py-3 rounded-xl bg-green-500 hover:bg-green-400 text-white font-semibold text-sm transition-all whitespace-nowrap flex items-center gap-1.5"
                >
                  Проверить
                </Link>
              </div>
              <p className="text-white/30 text-xs mt-2">Например: 123456789012 или Дело № PG-2024-001</p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3">
              <Link href="/client-payouts" className="premium-btn premium-btn-primary text-sm !py-2.5 !px-5">
                Проверить выплаты
              </Link>
              <Link href="/about" className="premium-btn premium-btn-secondary text-sm !py-2.5 !px-5">
                Как это работает
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-6 mt-10 pt-6 border-t border-white/10 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-green-400 tabular-nums"><CounterDisplay to={15000} suffix="+" /></div>
                <div className="text-xs text-white/50 mt-0.5">Проверок</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-green-400 tabular-nums"><CounterDisplay to={98} suffix="%" /></div>
                <div className="text-xs text-white/50 mt-0.5">Довольных клиентов</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-green-400 tabular-nums"><CounterDisplay to={24} suffix="/7" /></div>
                <div className="text-xs text-white/50 mt-0.5">Поддержка</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features */}
      <section className="premium-section bg-white">
        <div className="premium-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-premium-navy-800 mb-2">Почему выбирают нас</h2>
            <p className="text-premium-text-secondary text-sm">Простота, скорость и надёжность — каждый шаг под защитой</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <motion.div key={f.title} variants={fadeUp} custom={i} className="premium-card p-5 text-center">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-premium-navy-800 mb-1">{f.title}</h3>
                <p className="text-sm text-premium-text-secondary">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="premium-section bg-premium-surface">
        <div className="premium-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-premium-navy-800 mb-2">Наши услуги</h2>
            <p className="text-premium-text-secondary text-sm">Полный спектр инструментов для безопасного сопровождения финансовых операций</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 gap-4">
            {services.map((s, i) => (
              <motion.a key={s.title} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel={s.href.startsWith('http') ? 'noreferrer' : undefined} variants={fadeUp} custom={i} className="premium-card p-5 group cursor-pointer flex items-start gap-4">
                <div className="text-2xl shrink-0">{s.icon}</div>
                <div>
                  <h3 className="font-semibold text-premium-navy-800 mb-1 group-hover:text-green-600 transition-colors">{s.title}</h3>
                  <p className="text-sm text-premium-text-secondary">{s.desc}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section className="premium-section bg-white">
        <div className="premium-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-premium-navy-800 mb-2">Как это работает</h2>
            <p className="text-premium-text-secondary text-sm">Всего 3 простых шага</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { num: '1', title: 'Введите данные', desc: 'ИИН, БИН или номер дела получателя' },
              { num: '2', title: 'Мгновенная проверка', desc: 'Система проверит статус за секунды' },
              { num: '3', title: 'Результат и перевод', desc: 'Получите отчёт и инструкцию по безопасному переводу' },
            ].map((step, i) => (
              <motion.div key={step.num} variants={fadeUp} custom={i} className="text-center">
                <div className="w-12 h-12 rounded-full bg-green-500 text-white text-lg font-bold flex items-center justify-center mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="font-semibold text-premium-navy-800 mb-1">{step.title}</h3>
                <p className="text-sm text-premium-text-secondary">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* News */}
      {news && news.length > 0 && (
        <section className="premium-section bg-premium-surface">
          <div className="premium-container">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-premium-navy-800 mb-2">Новости и пресс-релизы</h2>
              <p className="text-premium-text-secondary text-sm">Актуальная информация</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {news.map((item, i) => {
                const img = item.heropic
                const date = formatDate(item.created_date || item.publication_date || '')
                return (
                  <motion.a
                    key={String(item.id ?? i)}
                    href={item.id ? `/media/news/details/${item.id}` : '#'}
                    variants={fadeUp} custom={i}
                    className="premium-card overflow-hidden group cursor-pointer"
                  >
                    {img && (
                      <div className="aspect-[16/9] overflow-hidden bg-premium-navy-50">
                        <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                      </div>
                    )}
                    <div className="p-4">
                      {date && <time className="text-xs text-premium-text-secondary">{date}</time>}
                      <h3 className="font-semibold text-premium-navy-800 text-sm mt-1 group-hover:text-green-600 transition-colors line-clamp-2">{item.title}</h3>
                      {item.short_description && (
                        <p className="text-xs text-premium-text-secondary mt-1 line-clamp-2">{item.short_description}</p>
                      )}
                    </div>
                  </motion.a>
                )
              })}
            </motion.div>
            {news.length >= 6 && (
              <div className="text-center mt-8">
                <Link href="/" className="text-green-600 text-sm font-medium hover:underline">Все материалы →</Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Articles */}
      {articles && articles.length > 0 && (
        <section className="premium-section bg-white">
          <div className="premium-container">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-premium-navy-800 mb-2">Статьи и материалы</h2>
              <p className="text-premium-text-secondary text-sm">Полезная информация о финансовой безопасности</p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {articles.map((item, i) => {
                const img = item.heropic
                const date = formatDate(item.publication_date || '')
                const href = item.alias ? `/article/details/${item.alias}` : item.id ? `/article/details/${item.id}` : '#'
                return (
                  <motion.a key={String(item.id ?? i)} href={href} variants={fadeUp} custom={i} className="premium-card overflow-hidden group cursor-pointer">
                    {img && (
                      <div className="aspect-[16/9] overflow-hidden bg-premium-navy-50">
                        <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                      </div>
                    )}
                    <div className="p-4">
                      {date && <time className="text-xs text-premium-text-secondary">{date}</time>}
                      <h3 className="font-semibold text-premium-navy-800 text-sm mt-1 group-hover:text-green-600 transition-colors line-clamp-2">{item.title}</h3>
                    </div>
                  </motion.a>
                )
              })}
            </motion.div>
          </div>
        </section>
      )}

      {/* Guarantee */}
      <section className="relative overflow-hidden bg-premium-navy-900 py-14 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(0,200,83,0.06)_0%,_transparent_50%)]" />
        <div className="premium-container relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="text-4xl mb-4">🛡️</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Гарантия безопасности</h2>
            <p className="text-white/60 text-sm sm:text-base max-w-lg mx-auto mb-6">
              Никаких скрытых комиссий. Все проверки проводятся в зашифрованном канале. Ваши данные не передаются третьим лицам.
            </p>
            <Link href="/client-payouts" className="premium-btn premium-btn-primary text-base sm:text-lg !py-3.5 !px-7 sm:!px-8">
              Проверить выплаты
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
