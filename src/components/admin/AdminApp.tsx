'use client'

import { useState, useEffect, useMemo } from 'react'
import { AdminDashboard } from './AdminDashboard'
import { ClientsSection } from './ClientsSection'
import { GitHubSettingsSection } from './GitHubSettingsSection'
import { checkAdminPassword, setAdminPassword } from '@/lib/admin-auth'
import { seedGitHubConfigIfNeeded } from '@/lib/github-sync'
import Link from 'next/link'

type Section = 'dashboard' | 'clients' | 'sync' | 'registry' | 'news' | 'settings' | 'blacklist'

const NAV: { id: Section; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Дашборд', icon: '📊' },
  { id: 'clients', label: 'Клиенты и обращения', icon: '👥' },
  { id: 'sync', label: 'Синхронизация GitHub', icon: '☁️' },
  { id: 'registry', label: 'Реестр организаций', icon: '📋' },
  { id: 'news', label: 'Новости', icon: '📰' },
  { id: 'settings', label: 'Настройки', icon: '⚙️' },
  { id: 'blacklist', label: 'Чёрный список', icon: '🚫' },
]

export function AdminApp() {
  const [password, setPassword] = useState('')
  const [authorized, setAuthorized] = useState(false)
  const [error, setError] = useState('')
  const [section, setSection] = useState<Section>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined' && sessionStorage.getItem('regylz-admin-auth') === '1') {
      seedGitHubConfigIfNeeded()
      setAuthorized(true)
    }
  }, [])

  const onLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (checkAdminPassword(password)) {
      seedGitHubConfigIfNeeded()
      sessionStorage.setItem('regylz-admin-auth', '1')
      setAuthorized(true)
      setError('')
    }
    else setError('Неверный пароль')
  }

  if (!mounted) return null

  if (!authorized) {
    return (
      <div className="min-h-screen bg-premium-navy-950 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-premium-gold to-amber-500 flex items-center justify-center text-3xl shadow-lg shadow-premium-gold/20">
              🔐
            </div>
            <h1 className="text-2xl font-bold text-white">Служебный доступ</h1>
            <p className="text-white/40 text-sm mt-1">Панель управления АРРФР</p>
          </div>
          <form onSubmit={onLogin} className="space-y-4">
            <div>
              <label htmlFor="ap" className="text-white/60 text-sm block mb-1.5">Пароль</label>
              <input id="ap" type="password" value={password} onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-premium-gold/50 focus:ring-1 focus:ring-premium-gold/30 transition-all"
                placeholder="Введите пароль" autoFocus />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button type="submit" className="w-full premium-btn premium-btn-primary !py-3">
              Войти в панель
            </button>
          </form>
          <div className="text-center mt-6">
            <Link href="/" className="text-white/30 hover:text-white/60 text-sm transition-colors">
              ← Вернуться на сайт
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-premium-navy-950 flex flex-col">
      {/* Top bar */}
      <header className="h-14 shrink-0 flex items-center px-4 border-b border-white/10 bg-premium-navy-900/80 backdrop-blur-xl sticky top-0 z-40">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden p-2 text-white/60 hover:text-white mr-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        <div className="flex items-center gap-2.5 flex-1">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-premium-gold to-amber-500 flex items-center justify-center text-premium-navy-900 text-xs font-bold">АР</div>
          <span className="text-white/80 text-sm font-medium hidden sm:block">АРРФР — Панель управления</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className="text-white/40 hover:text-white/70 text-xs transition-colors">На сайт</Link>
          <button onClick={() => { sessionStorage.removeItem('regylz-admin-auth'); setAuthorized(false) }} className="text-white/40 hover:text-red-400 text-xs transition-colors">Выйти</button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`fixed md:sticky top-14 left-0 bottom-0 z-30 w-60 bg-premium-navy-900/95 backdrop-blur-xl border-r border-white/10 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 overflow-y-auto`}>
          <nav className="py-3 px-2 space-y-0.5">
            {NAV.map(n => (
              <button key={n.id} onClick={() => { setSection(n.id); setSidebarOpen(false) }}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm transition-all text-left ${
                  section === n.id
                    ? 'bg-premium-gold/10 text-premium-gold border border-premium-gold/20'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="text-base">{n.icon}</span>
                {n.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />}

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {section === 'dashboard' && <AdminDashboard />}
          {section === 'clients' && <ClientsSection />}
          {section === 'sync' && <GitHubSettingsSection />}
          {section === 'registry' && <RegistrySection />}
          {section === 'news' && <NewsSection />}
          {section === 'settings' && <SettingsSection />}
          {section === 'blacklist' && <BlacklistSection />}
        </main>
      </div>
    </div>
  )
}

/* ─── Registry Section ─── */
function RegistrySection() {
  return (
    <SectionShell title="Реестр финансовых организаций" icon="📋" desc="Управление списком поднадзорных организаций">
      <div className="bg-white/5 rounded-xl border border-white/10 p-8 text-center">
        <div className="text-4xl mb-3 opacity-40">🏦</div>
        <p className="text-white/50 text-sm">Раздел в разработке. Здесь можно будет добавлять и редактировать организации в реестре.</p>
      </div>
    </SectionShell>
  )
}

/* ─── News Section ─── */
function NewsSection() {
  return (
    <SectionShell title="Управление новостями" icon="📰" desc="Публикация и редактирование новостей и пресс-релизов">
      <div className="bg-white/5 rounded-xl border border-white/10 p-8 text-center">
        <div className="text-4xl mb-3 opacity-40">📰</div>
        <p className="text-white/50 text-sm">Раздел в разработке. Здесь можно будет создавать и редактировать новости.</p>
      </div>
    </SectionShell>
  )
}

/* ─── Settings Section ─── */
function SettingsSection() {
  const [metrics, setMetrics] = useState<{ id: string; label: string; value: string; trend: string; trendDirection: 'up' | 'down' }[]>([])
  const [newPassword, setNewPassword] = useState('')
  const [pwMsg, setPwMsg] = useState('')

  useEffect(() => {
    const { getMetrics } = require('@/lib/admin-store')
    setMetrics(getMetrics())
  }, [])

  const save = () => {
    const { saveMetrics } = require('@/lib/admin-store')
    saveMetrics(metrics)
    alert('Сохранено!')
  }

  const update = (id: string, field: string, value: string) => {
    setMetrics(prev => prev.map(m => m.id === id ? { ...m, [field]: value } : m))
  }

  const changePassword = () => {
    if (newPassword.length < 4) {
      setPwMsg('Пароль должен быть не короче 4 символов')
      return
    }
    setAdminPassword(newPassword)
    setNewPassword('')
    setPwMsg('Пароль админки обновлён в этом браузере')
  }

  return (
    <div className="space-y-8">
      <SectionShell title="Пароль админки" icon="🔐" desc="Хранится только в localStorage этого браузера">
        <div className="bg-white/5 rounded-xl border border-white/10 p-4 sm:p-6 max-w-md space-y-3">
          <input
            type="password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            className="admin-input"
            placeholder="Новый пароль"
          />
          <button type="button" onClick={changePassword} className="premium-btn premium-btn-primary text-sm !py-2.5">
            Сменить пароль
          </button>
          {pwMsg && <p className="text-emerald-400 text-sm">{pwMsg}</p>}
          <p className="text-white/35 text-xs">До первой смены используется пароль по умолчанию (1304).</p>
        </div>
      </SectionShell>
      <SectionShell title="Настройки главной страницы" icon="⚙️" desc="Редактирование цифр и метрик на главной странице">
        <div className="bg-white/5 rounded-xl border border-white/10 p-4 sm:p-6 space-y-4">
          {metrics.map(m => (
            <div key={m.id} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <input value={m.label} onChange={e => update(m.id, 'label', e.target.value)} className="admin-input col-span-2" placeholder="Название" />
              <input value={m.value} onChange={e => update(m.id, 'value', e.target.value)} className="admin-input" placeholder="Значение" />
              <input value={m.trend} onChange={e => update(m.id, 'trend', e.target.value)} className="admin-input" placeholder="Тренд" />
            </div>
          ))}
          <button type="button" onClick={save} className="premium-btn premium-btn-primary text-sm !py-2.5">Сохранить метрики</button>
        </div>
      </SectionShell>
    </div>
  )
}

/* ─── Blacklist Section ─── */
function BlacklistSection() {
  const [scammers, setScammers] = useState<{ id: string; name: string; phone: string; description: string; reportedBy: string; createdAt: string }[]>([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [desc, setDesc] = useState('')

  useEffect(() => {
    const { getScammers } = require('@/lib/admin-store')
    setScammers(getScammers())
  }, [])

  const add = () => {
    if (!name.trim() || !phone.trim()) return
    const { saveScammers, generateId } = require('@/lib/admin-store')
    const updated = [...scammers, { id: generateId(), name: name.trim(), phone: phone.trim(), description: desc.trim(), reportedBy: 'Администратор', createdAt: new Date().toISOString() }]
    saveScammers(updated)
    setScammers(updated)
    setName(''); setPhone(''); setDesc('')
  }

  const remove = (id: string) => {
    const { saveScammers } = require('@/lib/admin-store')
    const updated = scammers.filter(s => s.id !== id)
    saveScammers(updated)
    setScammers(updated)
  }

  return (
    <SectionShell title="Чёрный список мошенников" icon="🚫" desc="База известных мошенников и недобросовестных участников рынка">
      <div className="bg-white/5 rounded-xl border border-white/10 p-4 sm:p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input value={name} onChange={e => setName(e.target.value)} className="admin-input" placeholder="ФИО мошенника" />
          <input value={phone} onChange={e => setPhone(e.target.value)} className="admin-input" placeholder="Телефон" />
          <input value={desc} onChange={e => setDesc(e.target.value)} className="admin-input sm:col-span-2" placeholder="Описание / схема мошенничества" />
        </div>
        <button onClick={add} className="premium-btn premium-btn-primary text-sm !py-2.5">Добавить в чёрный список</button>

        {scammers.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-white/40 text-xs uppercase tracking-wider">
                  <th className="text-left py-2 pr-4">ФИО</th>
                  <th className="text-left py-2 pr-4">Телефон</th>
                  <th className="text-left py-2 pr-4 hidden sm:table-cell">Описание</th>
                  <th className="text-left py-2 pr-4 hidden sm:table-cell">Добавлен</th>
                  <th className="py-2 w-12" />
                </tr>
              </thead>
              <tbody>
                {scammers.map(s => (
                  <tr key={s.id} className="border-t border-white/5">
                    <td className="py-2.5 pr-4 text-white/80">{s.name}</td>
                    <td className="py-2.5 pr-4 text-white/60">{s.phone}</td>
                    <td className="py-2.5 pr-4 text-white/40 text-xs hidden sm:table-cell">{s.description}</td>
                    <td className="py-2.5 pr-4 text-white/40 text-xs hidden sm:table-cell">{new Date(s.createdAt).toLocaleDateString()}</td>
                    <td className="py-2.5"><button onClick={() => remove(s.id)} className="text-red-400 hover:text-red-300 text-xs">Удалить</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </SectionShell>
  )
}

/* ─── Section Shell ─── */
function SectionShell({ title, icon, desc, children }: { title: string; icon: string; desc: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-2.5 mb-1">
          <span className="text-xl">{icon}</span>
          <h1 className="text-xl sm:text-2xl font-bold text-white">{title}</h1>
        </div>
        <p className="text-white/40 text-sm">{desc}</p>
      </div>
      {children}
    </div>
  )
}

export { SectionShell }
