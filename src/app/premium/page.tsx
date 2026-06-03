'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const variants = [
  {
    id: 'a',
    title: 'Classic Government Premium',
    tag: 'Классический',
    desc: 'Deep navy, gold accents, serif headings, traditional elegant government aesthetic with a premium twist.',
    gradient: 'from-premium-navy-900 via-premium-navy-800 to-premium-navy-900',
    accent: 'bg-premium-gold',
  },
  {
    id: 'b',
    title: 'Modern FinTech',
    tag: 'Современный',
    desc: 'Clean tech-forward design, glass morphism, gradient accents, teal/cyan meets gold for a modern financial feel.',
    gradient: 'from-slate-950 via-slate-900 to-blue-950',
    accent: 'bg-cyan-400',
  },
  {
    id: 'c',
    title: 'Dubai Luxury',
    tag: 'Премиальный',
    desc: 'Rich dark tones, heavy gold gradients, shimmer effects, parallax hero — ultimate luxury government portal.',
    gradient: 'from-zinc-950 via-amber-950 to-neutral-950',
    accent: 'bg-amber-400',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

export default function PremiumShowcase() {
  return (
    <div className="premium-root min-h-screen bg-premium-navy-950">
      <div className="premium-container py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-premium-gold/10 border border-premium-gold/20 text-premium-gold text-sm mb-4">
            ✦ Premium Design
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Выберите вариант дизайна
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Три концепции премиум-дизайна для информационного портала АРРФР.
            Каждый вариант полностью адаптивен и готов к продакшену.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {variants.map((v, i) => (
            <motion.div
              key={v.id}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <Link
                href={`/premium/${v.id}`}
                className="group block relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:bg-white/[0.08] transition-all duration-500"
              >
                <div className={`h-48 bg-gradient-to-br ${v.gradient} flex items-center justify-center relative overflow-hidden`}>
                  <div className={`w-16 h-16 rounded-full ${v.accent} opacity-20 absolute`} style={{ filter: 'blur(40px)' }} />
                  <div className="text-5xl opacity-30 group-hover:opacity-50 transition-opacity">✦</div>
                  <div className="absolute bottom-3 left-3">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${v.accent} text-white`}>
                      {v.tag}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-premium-gold transition-colors">
                    {v.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
                  <div className="mt-4 text-premium-gold text-sm font-medium opacity-0 group-hover:opacity-100 transition-all translate-x-[-4px] group-hover:translate-x-0">
                    Открыть →
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm"
          >
            ← Вернуться на текущий сайт
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
