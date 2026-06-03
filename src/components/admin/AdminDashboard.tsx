'use client'

import { useState, useEffect, useMemo } from 'react'
import { fetchClientsData, formatCurrency, formatDate, type ClientRecord } from '@/lib/clients-data'

export function AdminDashboard() {
  const [clients, setClients] = useState<ClientRecord[]>([])

  useEffect(() => {
    fetchClientsData().then((d) => setClients(d.clients))
  }, [])

  const stats = useMemo(() => {
    const total = clients.length
    const newCount = clients.filter(c => c.status === 'Новый').length
    const inWork = clients.filter(c => c.status === 'В работе').length
    const review = clients.filter(c => c.status === 'На проверке').length
    const resolved = clients.filter(c => c.status === 'Решено').length
    const rejected = clients.filter(c => c.status === 'Отклонено').length
    const totalAmount = clients.reduce((s, c) => s + c.amount, 0)
    const totalPaid = clients.filter(c => c.status === 'Решено').reduce((s, c) => s + c.amount, 0)
    return { total, newCount, inWork, review, resolved, rejected, totalAmount, totalPaid }
  }, [clients])

  const recent = useMemo(() => [...clients].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 5), [clients])

  const cards = [
    { label: 'Всего обращений', value: stats.total, color: 'from-blue-500 to-blue-600', icon: '📋' },
    { label: 'Новых', value: stats.newCount, color: 'from-green-500 to-green-600', icon: '🆕' },
    { label: 'В работе', value: stats.inWork, color: 'from-amber-500 to-orange-600', icon: '🔧' },
    { label: 'На проверке', value: stats.review, color: 'from-purple-500 to-purple-600', icon: '🔍' },
    { label: 'Решено', value: stats.resolved, color: 'from-emerald-500 to-emerald-600', icon: '✅' },
    { label: 'Отклонено', value: stats.rejected, color: 'from-red-500 to-red-600', icon: '❌' },
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-white">Дашборд</h1>
        <p className="text-white/40 text-sm">Общая статистика по обращениям и клиентам</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {cards.map(c => (
          <div key={c.label} className={`bg-gradient-to-br ${c.color} rounded-xl p-3.5 shadow-lg`}>
            <div className="text-lg mb-1">{c.icon}</div>
            <div className="text-xl font-bold text-white">{c.value}</div>
            <div className="text-white/70 text-xs mt-0.5">{c.label}</div>
          </div>
        ))}
      </div>

      {/* Amount stats */}
      <div className="grid sm:grid-cols-2 gap-3 mb-6">
        <div className="bg-white/5 rounded-xl border border-white/10 p-4">
          <div className="text-white/40 text-xs uppercase tracking-wider mb-1">Общая сумма ущерба</div>
          <div className="text-2xl font-bold text-premium-gold">{formatCurrency(stats.totalAmount)}</div>
        </div>
        <div className="bg-white/5 rounded-xl border border-white/10 p-4">
          <div className="text-white/40 text-xs uppercase tracking-wider mb-1">Решено на сумму</div>
          <div className="text-2xl font-bold text-green-400">{formatCurrency(stats.totalPaid)}</div>
        </div>
      </div>

      {/* Recent */}
      <div className="bg-white/5 rounded-xl border border-white/10 p-4">
        <h2 className="text-sm font-semibold text-white/80 mb-3">Последние изменения</h2>
        {recent.length === 0 ? (
          <p className="text-white/30 text-sm text-center py-6">Нет обращений. Добавьте первого клиента.</p>
        ) : (
          <div className="space-y-2">
            {recent.map(r => (
              <div key={r.id} className="flex items-center gap-3 text-sm py-1.5 border-b border-white/5 last:border-0">
                <span className={`w-2 h-2 rounded-full shrink-0 ${
                  r.status === 'Новый' ? 'bg-green-400' :
                  r.status === 'В работе' ? 'bg-amber-400' :
                  r.status === 'На проверке' ? 'bg-purple-400' :
                  r.status === 'Решено' ? 'bg-emerald-400' : 'bg-red-400'
                }`} />
                <span className="text-white/60 min-w-[100px] text-xs">{r.caseNumber}</span>
                <span className="text-white/80 flex-1 truncate">{r.clientName}</span>
                <span className="text-white/40 text-xs hidden sm:inline">{r.status}</span>
                <span className="text-white/30 text-xs">{formatDate(r.updatedAt)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
