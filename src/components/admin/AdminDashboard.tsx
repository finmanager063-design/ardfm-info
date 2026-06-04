'use client'

import { useState, useEffect, useMemo } from 'react'
import { formatCurrency, formatDate, type ClientRecord } from '@/lib/clients-data'
import { countByPhase, getStatusMeta, isPaidStatus, normalizeClientStatus } from '@/lib/case-statuses'
import { getLastLocalSaveLabel, loadClientsMerged } from '@/lib/clients-persistence'

const PHASE_CARDS: { key: keyof ReturnType<typeof countByPhase>; label: string; color: string; icon: string }[] = [
  { key: 'intake', label: 'Приём', color: 'from-sky-500 to-blue-600', icon: '📥' },
  { key: 'review', label: 'Рассмотрение', color: 'from-indigo-500 to-purple-600', icon: '🔍' },
  { key: 'external', label: 'Взаимодействие', color: 'from-cyan-500 to-teal-600', icon: '🏛' },
  { key: 'decision', label: 'Согласование', color: 'from-orange-500 to-amber-600', icon: '📝' },
  { key: 'payout', label: 'Выплаты', color: 'from-yellow-500 to-emerald-600', icon: '💳' },
  { key: 'closed', label: 'Завершено', color: 'from-zinc-500 to-red-600', icon: '📁' },
]

export function AdminDashboard() {
  const [clients, setClients] = useState<ClientRecord[]>([])
  const [lastSave, setLastSave] = useState<string | null>(null)

  useEffect(() => {
    loadClientsMerged().then((d) => {
      setClients(d.clients)
      setLastSave(getLastLocalSaveLabel())
    })
  }, [])

  const stats = useMemo(() => {
    const total = clients.length
    const byPhase = countByPhase(clients)
    const newCount = clients.filter(c => normalizeClientStatus(c.status) === 'Новый').length
    const totalAmount = clients.reduce((s, c) => s + c.amount, 0)
    const totalPaid = clients
      .filter(c => isPaidStatus(c.status))
      .reduce((s, c) => s + (c.paidAmount > 0 ? c.paidAmount : c.payoutAmount || c.amount), 0)
    return { total, newCount, byPhase, totalAmount, totalPaid }
  }, [clients])

  const recent = useMemo(() => [...clients].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 5), [clients])

  const cards = [
    { label: 'Всего обращений', value: stats.total, color: 'from-blue-500 to-blue-600', icon: '📋' },
    { label: 'Новых', value: stats.newCount, color: 'from-green-500 to-green-600', icon: '🆕' },
    ...PHASE_CARDS.map(p => ({
      label: p.label,
      value: stats.byPhase[p.key],
      color: p.color,
      icon: p.icon,
    })),
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-white">Дашборд</h1>
        <p className="text-white/40 text-sm">
          Общая статистика по обращениям и клиентам
          {lastSave && <span className="block mt-1 text-white/30">Последнее сохранение в браузере: {lastSave}</span>}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
        {cards.map(c => (
          <div key={c.label} className={`bg-gradient-to-br ${c.color} rounded-xl p-3.5 shadow-lg`}>
            <div className="text-lg mb-1">{c.icon}</div>
            <div className="text-xl font-bold text-white">{c.value}</div>
            <div className="text-white/70 text-xs mt-0.5 leading-tight">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-6">
        <div className="bg-white/5 rounded-xl border border-white/10 p-4">
          <div className="text-white/40 text-xs uppercase tracking-wider mb-1">Общая сумма ущерба</div>
          <div className="text-2xl font-bold text-premium-gold">{formatCurrency(stats.totalAmount)}</div>
        </div>
        <div className="bg-white/5 rounded-xl border border-white/10 p-4">
          <div className="text-white/40 text-xs uppercase tracking-wider mb-1">Выплачено (по делам с выплатой)</div>
          <div className="text-2xl font-bold text-green-400">{formatCurrency(stats.totalPaid)}</div>
        </div>
      </div>

      <div className="bg-white/5 rounded-xl border border-white/10 p-4">
        <h2 className="text-sm font-semibold text-white/80 mb-3">Последние изменения</h2>
        {recent.length === 0 ? (
          <p className="text-white/30 text-sm text-center py-6">Нет обращений. Добавьте первого клиента.</p>
        ) : (
          <div className="space-y-2">
            {recent.map(r => (
              <div key={r.id} className="flex items-center gap-3 text-sm py-1.5 border-b border-white/5 last:border-0">
                <span className={`w-2 h-2 rounded-full shrink-0 ${getStatusMeta(r.status).dotClass}`} />
                <span className="text-white/60 min-w-[100px] text-xs">{r.caseNumber}</span>
                <span className="text-white/80 flex-1 truncate">{r.clientName}</span>
                <span className="text-white/40 text-xs hidden sm:inline">{normalizeClientStatus(r.status)}</span>
                <span className="text-white/30 text-xs">{formatDate(r.updatedAt)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
