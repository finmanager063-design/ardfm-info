'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  getClients, saveClients, addClient, updateClient, deleteClient,
  addComment, addHistory, exportToCSV, downloadCSV, formatCurrency,
  formatDate, generateId, suggestCaseNumber,
  STATUS_OPTIONS, TYPE_OPTIONS,
  type AdminClientRecord, type AdminComment, type AdminAction,
  type ClientStatus, type AppealType,
} from '@/lib/admin-store'

const emptyForm = () => ({
  clientName: '', iin: '', phone: '', email: '',
  type: 'other' as AppealType, amount: 0, status: 'Новый' as ClientStatus,
})

export function ClientsSection() {
  const [clients, setClients] = useState<AdminClientRecord[]>([])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<ClientStatus | 'all'>('all')

  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm())
  const [commentText, setCommentText] = useState('')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => { setClients(getClients()) }, [])

  const filtered = useMemo(() => {
    let result = clients
    if (statusFilter !== 'all') result = result.filter(c => c.status === statusFilter)
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(c =>
        c.clientName.toLowerCase().includes(q) ||
        c.caseNumber.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        c.iin.includes(q)
      )
    }
    return result.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
  }, [clients, search, statusFilter])

  const openAdd = () => { setEditId(null); setForm(emptyForm()); setShowForm(true) }

  const openEdit = (c: AdminClientRecord) => {
    setEditId(c.id)
    setForm({ clientName: c.clientName, iin: c.iin, phone: c.phone, email: c.email, type: c.type, amount: c.amount, status: c.status })
    setShowForm(true)
  }

  const saveForm = () => {
    if (!form.clientName.trim() || !form.phone.trim()) return
    if (editId) {
      const old = clients.find(c => c.id === editId)
      if (!old) return
      const history: AdminAction[] = []
      if (old.status !== form.status) history.push({ id: generateId(), field: 'status', oldValue: old.status, newValue: form.status, author: 'Администратор', createdAt: new Date().toISOString() })
      if (old.amount !== form.amount) history.push({ id: generateId(), field: 'amount', oldValue: String(old.amount), newValue: String(form.amount), author: 'Администратор', createdAt: new Date().toISOString() })
      updateClient(editId, { ...form, history: [...old.history, ...history] })
    } else {
      addClient({
        id: generateId(), caseNumber: suggestCaseNumber(),
        ...form, comments: [], history: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    }
    setClients(getClients())
    setShowForm(false)
    setEditId(null)
  }

  const handleDelete = (id: string) => {
    if (!confirm('Удалить запись?')) return
    deleteClient(id)
    setClients(getClients())
  }

  const handleMassDelete = () => {
    if (selectedIds.size === 0) return
    if (!confirm(`Удалить ${selectedIds.size} записей?`)) return
    const updated = clients.filter(c => !selectedIds.has(c.id))
    saveClients(updated)
    setClients(updated)
    setSelectedIds(new Set())
  }

  const handleExport = () => {
    const selected = clients.filter(c => selectedIds.has(c.id))
    const data = selected.length > 0 ? selected : clients
    downloadCSV(`clients-export-${Date.now()}.csv`, exportToCSV(data))
  }

  const addCommentToClient = (clientId: string) => {
    if (!commentText.trim()) return
    const comment: AdminComment = {
      id: generateId(), text: commentText.trim(),
      author: 'Администратор', createdAt: new Date().toISOString(),
    }
    addComment(clientId, comment)
    setClients(getClients())
    setCommentText('')
  }

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const selectAll = () => {
    if (selectedIds.size === filtered.length) { setSelectedIds(new Set()); return }
    setSelectedIds(new Set(filtered.map(c => c.id)))
  }

  const statusBadge = (s: ClientStatus) => {
    const colors: Record<ClientStatus, string> = {
      'Новый': 'bg-green-500/20 text-green-400 border-green-500/30',
      'В работе': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      'На проверке': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Решено': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      'Отклонено': 'bg-red-500/20 text-red-400 border-red-500/30',
    }
    return `px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[s]}`
  }

  const typeLabel = (t: AppealType) => TYPE_OPTIONS.find(o => o.value === t)?.label || t

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">Клиенты и обращения</h1>
          <p className="text-white/40 text-sm">Всего: {clients.length}</p>
        </div>
        <button onClick={openAdd} className="premium-btn premium-btn-primary text-sm !py-2 !px-4">
          + Новый клиент
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск по ФИО, № дела, телефону, ИИН..."
          className="admin-input flex-1" />
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as ClientStatus | 'all')} className="admin-input sm:w-44">
          <option value="all">Все статусы</option>
          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Mass actions */}
      {selectedIds.size > 0 && (
        <div className="flex items-center gap-3 mb-3 px-4 py-2.5 bg-premium-gold/10 border border-premium-gold/20 rounded-xl">
          <span className="text-white/70 text-sm">Выбрано: {selectedIds.size}</span>
          <button onClick={handleMassDelete} className="text-red-400 hover:text-red-300 text-sm font-medium">Удалить</button>
          <button onClick={handleExport} className="text-premium-gold hover:text-premium-gold-light text-sm font-medium">Экспорт CSV</button>
          <button onClick={() => setSelectedIds(new Set())} className="text-white/40 hover:text-white/60 text-sm ml-auto">Снять выделение</button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white/40 text-xs uppercase tracking-wider border-b border-white/5">
                <th className="text-left py-3 px-3 w-8"><input type="checkbox" checked={selectedIds.size === filtered.length && filtered.length > 0} onChange={selectAll} className="accent-premium-gold" /></th>
                <th className="text-left py-3 px-2">№ дела</th>
                <th className="text-left py-3 px-2">ФИО</th>
                <th className="text-left py-3 px-2 hidden md:table-cell">Телефон</th>
                <th className="text-left py-3 px-2 hidden lg:table-cell">Тип</th>
                <th className="text-right py-3 px-2">Сумма</th>
                <th className="text-left py-3 px-2">Статус</th>
                <th className="text-center py-3 px-2 w-20">Действия</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} className={`border-b border-white/5 ${expandedId === c.id ? 'bg-white/5' : ''}`}>
                  <td className="py-2.5 px-3"><input type="checkbox" checked={selectedIds.has(c.id)} onChange={() => toggleSelect(c.id)} className="accent-premium-gold" /></td>
                  <td className="py-2.5 px-2 text-premium-gold font-mono text-xs">{c.caseNumber}</td>
                  <td className="py-2.5 px-2">
                    <button onClick={() => setExpandedId(expandedId === c.id ? null : c.id)} className="text-white/80 hover:text-premium-gold transition-colors text-left">{c.clientName}</button>
                  </td>
                  <td className="py-2.5 px-2 text-white/50 text-xs hidden md:table-cell">{c.phone}</td>
                  <td className="py-2.5 px-2 text-white/50 text-xs hidden lg:table-cell">{typeLabel(c.type)}</td>
                  <td className="py-2.5 px-2 text-right text-white/80 font-medium">{formatCurrency(c.amount)}</td>
                  <td className="py-2.5 px-2"><span className={statusBadge(c.status)}>{c.status}</span></td>
                  <td className="py-2.5 px-2 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => openEdit(c)} className="text-white/40 hover:text-premium-gold p-1 text-xs" title="Редактировать">✎</button>
                      <button onClick={() => handleDelete(c.id)} className="text-white/40 hover:text-red-400 p-1 text-xs" title="Удалить">✕</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="text-center py-8 text-white/30 text-sm">Нет записей</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Expanded row — comments & history */}
        {expandedId && (() => {
          const client = clients.find(c => c.id === expandedId)
          if (!client) return null
          return (
            <div className="border-t border-white/5 p-4 bg-white/[0.02]">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Comments */}
                <div>
                  <h3 className="text-white/80 text-sm font-semibold mb-2">Комментарии ({client.comments.length})</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto mb-2">
                    {client.comments.length === 0 && <p className="text-white/30 text-xs">Нет комментариев</p>}
                    {client.comments.map(cm => (
                      <div key={cm.id} className="bg-white/5 rounded-lg p-2.5">
                        <div className="flex justify-between text-xs text-white/30 mb-1">
                          <span>{cm.author}</span>
                          <span>{formatDate(cm.createdAt)}</span>
                        </div>
                        <p className="text-white/70 text-sm">{cm.text}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input value={commentText} onChange={e => setCommentText(e.target.value)} placeholder="Добавить комментарий..." className="admin-input flex-1 text-sm" onKeyDown={e => e.key === 'Enter' && addCommentToClient(client.id)} />
                    <button onClick={() => addCommentToClient(client.id)} className="premium-btn premium-btn-primary text-xs !py-1.5 !px-3">Отправить</button>
                  </div>
                </div>

                {/* History */}
                <div>
                  <h3 className="text-white/80 text-sm font-semibold mb-2">История изменений ({client.history.length})</h3>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto">
                    {client.history.length === 0 && <p className="text-white/30 text-xs">Нет изменений</p>}
                    {client.history.map(h => (
                      <div key={h.id} className="flex items-start gap-2 text-xs">
                        <span className="text-premium-gold mt-0.5">●</span>
                        <div>
                          <span className="text-white/50">{formatDate(h.createdAt)} — </span>
                          <span className="text-white/70">{h.field}: </span>
                          <span className="text-red-400 line-through">{h.oldValue}</span>
                          <span className="text-white/30"> → </span>
                          <span className="text-green-400">{h.newValue}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })()}
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowForm(false)}>
          <div className="bg-premium-navy-900 border border-white/10 rounded-2xl p-5 sm:p-6 w-full max-w-lg shadow-2xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-white mb-4">{editId ? 'Редактировать' : 'Новый клиент'}</h2>
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="admin-label">ФИО *</label>
                  <input value={form.clientName} onChange={e => setForm(v => ({ ...v, clientName: e.target.value }))} className="admin-input" placeholder="Иванов Иван Иванович" />
                </div>
                <div>
                  <label className="admin-label">ИИН</label>
                  <input value={form.iin} onChange={e => setForm(v => ({ ...v, iin: e.target.value }))} className="admin-input" placeholder="12 цифр" maxLength={12} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="admin-label">Телефон *</label>
                  <input value={form.phone} onChange={e => setForm(v => ({ ...v, phone: e.target.value }))} className="admin-input" placeholder="+7 7XX XXX XX XX" />
                </div>
                <div>
                  <label className="admin-label">Email</label>
                  <input value={form.email} onChange={e => setForm(v => ({ ...v, email: e.target.value }))} className="admin-input" placeholder="email@example.com" type="email" />
                </div>
              </div>
              <div>
                <label className="admin-label">Тип обращения</label>
                <select value={form.type} onChange={e => setForm(v => ({ ...v, type: e.target.value as AppealType }))} className="admin-input">
                  {TYPE_OPTIONS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="admin-label">Сумма ущерба (₸)</label>
                  <input value={form.amount || ''} onChange={e => setForm(v => ({ ...v, amount: Number(e.target.value) || 0 }))} className="admin-input" type="number" placeholder="0" />
                </div>
                <div>
                  <label className="admin-label">Статус</label>
                  <select value={form.status} onChange={e => setForm(v => ({ ...v, status: e.target.value as ClientStatus }))} className="admin-input">
                    {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-5">
              <button onClick={() => setShowForm(false)} className="premium-btn premium-btn-outline text-sm !py-2 !px-4">Отмена</button>
              <button onClick={saveForm} className="premium-btn premium-btn-primary text-sm !py-2 !px-4">
                {editId ? 'Сохранить' : 'Создать'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
