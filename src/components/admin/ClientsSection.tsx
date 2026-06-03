'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import {
  fetchClientsData,
  suggestNextCaseNumber,
  generateId,
  formatCurrency,
  formatDate,
  STATUS_OPTIONS,
  TYPE_OPTIONS,
  type ClientRecord,
  type ClientComment,
  type ClientHistoryEntry,
  type ClientStatus,
  type AppealType,
  type ClientsDataFile,
} from '@/lib/clients-data'
import { commitClientsFile, getGitHubConfig } from '@/lib/github-sync'
import { exportToCSV, downloadCSV } from '@/lib/admin-store'

const emptyForm = () => ({
  clientName: '', iin: '', phone: '', email: '',
  type: 'fraud' as AppealType,
  amount: 0, payoutAmount: 0, paidAmount: 0,
  bank: 'Kaspi Bank',
  status: 'Новый' as ClientStatus,
  regulatorNote: '', internalNote: '',
})

export function ClientsSection() {
  const [clients, setClients] = useState<ClientRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<ClientStatus | 'all'>('all')
  const [amountMin, setAmountMin] = useState('')
  const [amountMax, setAmountMax] = useState('')

  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm())
  const [commentText, setCommentText] = useState('')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const showToast = (type: 'ok' | 'err', text: string) => {
    setToast({ type, text })
    setTimeout(() => setToast(null), 6000)
  }

  const reload = useCallback(async () => {
    setLoading(true)
    const data = await fetchClientsData()
    setClients(data.clients)
    setLoading(false)
  }, [])

  useEffect(() => { reload() }, [reload])

  const persist = async (next: ClientRecord[], message: string) => {
    setSaving(true)
    const payload: ClientsDataFile = { version: 1, updatedAt: new Date().toISOString(), clients: next }
    const config = getGitHubConfig()
    const res = await commitClientsFile(config, payload, message)
    setSaving(false)
    if (!res.ok) {
      showToast('err', res.error)
      return false
    }
    setClients(next)
    showToast('ok', 'Данные успешно обновлены на сервере GitHub. Изменения вступят в силу в течение 1–2 минут.')
    return true
  }

  const filtered = useMemo(() => {
    let result = clients
    if (statusFilter !== 'all') result = result.filter(c => c.status === statusFilter)
    const min = amountMin ? Number(amountMin) : 0
    const max = amountMax ? Number(amountMax) : Infinity
    if (amountMin || amountMax) {
      result = result.filter(c => {
        const v = c.payoutAmount || c.amount
        return v >= min && v <= max
      })
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      const digits = search.replace(/\D/g, '')
      result = result.filter(c =>
        c.clientName.toLowerCase().includes(q) ||
        c.caseNumber.toLowerCase().includes(q) ||
        c.phone.replace(/\D/g, '').includes(digits) ||
        c.iin.includes(digits) ||
        c.email.toLowerCase().includes(q)
      )
    }
    return result.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
  }, [clients, search, statusFilter, amountMin, amountMax])

  const openAdd = () => { setEditId(null); setForm(emptyForm()); setShowForm(true) }

  const openEdit = (c: ClientRecord) => {
    setEditId(c.id)
    setForm({
      clientName: c.clientName, iin: c.iin, phone: c.phone, email: c.email,
      type: c.type, amount: c.amount, payoutAmount: c.payoutAmount, paidAmount: c.paidAmount,
      bank: c.bank, status: c.status, regulatorNote: c.regulatorNote, internalNote: c.internalNote,
    })
    setShowForm(true)
  }

  const saveForm = async () => {
    if (!form.clientName.trim() || !form.phone.trim()) return
    const now = new Date().toISOString()
    let next: ClientRecord[]

    if (editId) {
      const old = clients.find(c => c.id === editId)
      if (!old) return
      const history: ClientHistoryEntry[] = [...old.history]
      if (old.status !== form.status) {
        history.push({ id: generateId(), field: 'status', oldValue: old.status, newValue: form.status, author: 'Администратор', createdAt: now })
      }
      if (old.amount !== form.amount) {
        history.push({ id: generateId(), field: 'amount', oldValue: String(old.amount), newValue: String(form.amount), author: 'Администратор', createdAt: now })
      }
      next = clients.map(c => c.id === editId
        ? { ...c, ...form, history, updatedAt: now }
        : c)
    } else {
      const record: ClientRecord = {
        id: generateId(),
        caseNumber: suggestNextCaseNumber(clients),
        ...form,
        comments: [],
        history: [],
        createdAt: now,
        updatedAt: now,
      }
      next = [record, ...clients]
    }

    const ok = await persist(next, editId ? `admin: update ${editId}` : 'admin: new client')
    if (ok) { setShowForm(false); setEditId(null) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить запись?')) return
    const next = clients.filter(c => c.id !== id)
    await persist(next, `admin: delete ${id}`)
  }

  const handleMassDelete = async () => {
    if (selectedIds.size === 0) return
    if (!confirm(`Удалить ${selectedIds.size} записей?`)) return
    const next = clients.filter(c => !selectedIds.has(c.id))
    const ok = await persist(next, `admin: mass delete ${selectedIds.size}`)
    if (ok) setSelectedIds(new Set())
  }

  const handleExport = () => {
    const selected = clients.filter(c => selectedIds.has(c.id))
    const data = selected.length > 0 ? selected : clients
    downloadCSV(`clients-export-${Date.now()}.csv`, exportToCSV(data))
  }

  const addCommentToClient = async (clientId: string) => {
    if (!commentText.trim()) return
    const comment: ClientComment = {
      id: generateId(), text: commentText.trim(),
      author: 'Администратор', createdAt: new Date().toISOString(),
    }
    const next = clients.map(c => c.id === clientId
      ? { ...c, comments: [...c.comments, comment], updatedAt: new Date().toISOString() }
      : c)
    const ok = await persist(next, `admin: comment ${clientId}`)
    if (ok) setCommentText('')
  }

  const quickStatus = async (client: ClientRecord, status: ClientStatus) => {
    const now = new Date().toISOString()
    const next = clients.map(c => c.id === client.id
      ? {
          ...c,
          status,
          history: [...c.history, { id: generateId(), field: 'status', oldValue: c.status, newValue: status, author: 'Администратор', createdAt: now }],
          updatedAt: now,
        }
      : c)
    await persist(next, `admin: status ${client.caseNumber} → ${status}`)
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
      'Новый': 'bg-zinc-500/20 text-zinc-300 border-zinc-500/30',
      'В работе': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      'На проверке': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      'Решено': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      'Отклонено': 'bg-red-500/20 text-red-400 border-red-500/30',
    }
    return `px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[s]}`
  }

  const typeLabel = (t: AppealType) => TYPE_OPTIONS.find(o => o.value === t)?.label || t

  return (
    <div>
      {toast && (
        <div className={`admin-toast admin-toast--${toast.type}`} role="status">
          {toast.text}
        </div>
      )}
      {saving && (
        <div className="admin-saving-overlay" aria-hidden>
          <div className="admin-spinner" />
        </div>
      )}

      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">Клиенты и обращения</h1>
          <p className="text-white/40 text-sm">
            {loading ? 'Загрузка…' : `Всего: ${clients.length} · источник: data.json`}
          </p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={reload} disabled={loading} className="premium-btn premium-btn-outline text-sm !py-2 !px-3">
            Обновить
          </button>
          <button type="button" onClick={openAdd} className="premium-btn premium-btn-primary text-sm !py-2 !px-4">
            + Новый клиент
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск по ФИО, № дела, телефону, ИИН, email…"
          className="admin-input flex-1" />
        <div className="flex flex-col sm:flex-row gap-2">
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as ClientStatus | 'all')} className="admin-input sm:w-44">
            <option value="all">Все статусы</option>
            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <input value={amountMin} onChange={e => setAmountMin(e.target.value)} className="admin-input sm:w-36" type="number" placeholder="Сумма от ₸" />
          <input value={amountMax} onChange={e => setAmountMax(e.target.value)} className="admin-input sm:w-36" type="number" placeholder="Сумма до ₸" />
        </div>
      </div>

      {selectedIds.size > 0 && (
        <div className="flex items-center gap-3 mb-3 px-4 py-2.5 bg-premium-gold/10 border border-premium-gold/20 rounded-xl flex-wrap">
          <span className="text-white/70 text-sm">Выбрано: {selectedIds.size}</span>
          <button type="button" onClick={handleMassDelete} className="text-red-400 hover:text-red-300 text-sm font-medium">Удалить</button>
          <button type="button" onClick={handleExport} className="text-premium-gold hover:text-premium-gold-light text-sm font-medium">Экспорт CSV</button>
          <button type="button" onClick={() => setSelectedIds(new Set())} className="text-white/40 hover:text-white/60 text-sm ml-auto">Снять выделение</button>
        </div>
      )}

      {/* Mobile cards */}
      <div className="md:hidden space-y-3 mb-4">
        {filtered.map(c => (
          <article key={c.id} className="admin-client-card">
            <div className="flex justify-between items-start gap-2 mb-2">
              <div>
                <p className="text-premium-gold font-mono text-xs">{c.caseNumber}</p>
                <p className="text-white font-medium">{c.clientName}</p>
              </div>
              <span className={statusBadge(c.status)}>{c.status}</span>
            </div>
            <p className="text-white/50 text-xs mb-1">{c.phone}</p>
            <p className="text-white/80 text-sm font-semibold mb-3">{formatCurrency(c.payoutAmount || c.amount)}</p>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => openEdit(c)} className="premium-btn premium-btn-outline text-xs !py-1.5 !px-3">Изменить</button>
              <select
                value={c.status}
                onChange={e => quickStatus(c, e.target.value as ClientStatus)}
                className="admin-input text-xs !py-1.5 flex-1 min-w-[120px]"
              >
                {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </article>
        ))}
        {!loading && filtered.length === 0 && (
          <p className="text-center text-white/30 text-sm py-6">Нет записей</p>
        )}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-white/5 rounded-xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white/40 text-xs uppercase tracking-wider border-b border-white/5">
                <th className="text-left py-3 px-3 w-8"><input type="checkbox" checked={selectedIds.size === filtered.length && filtered.length > 0} onChange={selectAll} className="accent-premium-gold" /></th>
                <th className="text-left py-3 px-2">№ дела</th>
                <th className="text-left py-3 px-2">ФИО</th>
                <th className="text-left py-3 px-2 hidden lg:table-cell">Телефон</th>
                <th className="text-left py-3 px-2 hidden xl:table-cell">ИИН</th>
                <th className="text-right py-3 px-2">К возврату</th>
                <th className="text-left py-3 px-2">Статус</th>
                <th className="text-center py-3 px-2 w-24">Действия</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} className={`border-b border-white/5 ${expandedId === c.id ? 'bg-white/5' : ''}`}>
                  <td className="py-2.5 px-3"><input type="checkbox" checked={selectedIds.has(c.id)} onChange={() => toggleSelect(c.id)} className="accent-premium-gold" /></td>
                  <td className="py-2.5 px-2 text-premium-gold font-mono text-xs">{c.caseNumber}</td>
                  <td className="py-2.5 px-2">
                    <button type="button" onClick={() => setExpandedId(expandedId === c.id ? null : c.id)} className="text-white/80 hover:text-premium-gold transition-colors text-left">{c.clientName}</button>
                  </td>
                  <td className="py-2.5 px-2 text-white/50 text-xs hidden lg:table-cell">{c.phone}</td>
                  <td className="py-2.5 px-2 text-white/50 text-xs hidden xl:table-cell">{c.iin || '—'}</td>
                  <td className="py-2.5 px-2 text-right text-white/80 font-medium">{formatCurrency(c.payoutAmount || c.amount)}</td>
                  <td className="py-2.5 px-2"><span className={statusBadge(c.status)}>{c.status}</span></td>
                  <td className="py-2.5 px-2 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button type="button" onClick={() => openEdit(c)} className="text-white/40 hover:text-premium-gold p-1 text-xs" title="Редактировать">✎</button>
                      <button type="button" onClick={() => handleDelete(c.id)} className="text-white/40 hover:text-red-400 p-1 text-xs" title="Удалить">✕</button>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && filtered.length === 0 && (
                <tr><td colSpan={8} className="text-center py-8 text-white/30 text-sm">Нет записей</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {expandedId && (() => {
          const client = clients.find(c => c.id === expandedId)
          if (!client) return null
          return (
            <div className="border-t border-white/5 p-4 bg-white/[0.02]">
              <div className="grid md:grid-cols-2 gap-4">
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
                    <input value={commentText} onChange={e => setCommentText(e.target.value)} placeholder="Внутренний комментарий…" className="admin-input flex-1 text-sm" onKeyDown={e => e.key === 'Enter' && addCommentToClient(client.id)} />
                    <button type="button" onClick={() => addCommentToClient(client.id)} className="premium-btn premium-btn-primary text-xs !py-1.5 !px-3">Добавить</button>
                  </div>
                </div>
                <div>
                  <h3 className="text-white/80 text-sm font-semibold mb-2">История ({client.history.length})</h3>
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
                  {client.regulatorNote && (
                    <p className="mt-3 text-xs text-white/50"><strong className="text-white/70">Для клиента:</strong> {client.regulatorNote}</p>
                  )}
                </div>
              </div>
            </div>
          )
        })()}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowForm(false)}>
          <div className="bg-premium-navy-900 border border-white/10 rounded-t-2xl sm:rounded-2xl p-5 sm:p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-white mb-4">{editId ? 'Редактировать' : 'Новый клиент'}</h2>
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="admin-label">ФИО *</label>
                  <input value={form.clientName} onChange={e => setForm(v => ({ ...v, clientName: e.target.value }))} className="admin-input" />
                </div>
                <div>
                  <label className="admin-label">ИИН</label>
                  <input value={form.iin} onChange={e => setForm(v => ({ ...v, iin: e.target.value }))} className="admin-input" maxLength={12} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="admin-label">Телефон *</label>
                  <input value={form.phone} onChange={e => setForm(v => ({ ...v, phone: e.target.value }))} className="admin-input" />
                </div>
                <div>
                  <label className="admin-label">Email</label>
                  <input value={form.email} onChange={e => setForm(v => ({ ...v, email: e.target.value }))} className="admin-input" type="email" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="admin-label">Сумма ущерба (₸)</label>
                  <input value={form.amount || ''} onChange={e => setForm(v => ({ ...v, amount: Number(e.target.value) || 0 }))} className="admin-input" type="number" />
                </div>
                <div>
                  <label className="admin-label">Сумма к возврату (₸)</label>
                  <input value={form.payoutAmount || ''} onChange={e => setForm(v => ({ ...v, payoutAmount: Number(e.target.value) || 0 }))} className="admin-input" type="number" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="admin-label">Оплачено (₸)</label>
                  <input value={form.paidAmount || ''} onChange={e => setForm(v => ({ ...v, paidAmount: Number(e.target.value) || 0 }))} className="admin-input" type="number" />
                </div>
                <div>
                  <label className="admin-label">Банк</label>
                  <input value={form.bank} onChange={e => setForm(v => ({ ...v, bank: e.target.value }))} className="admin-input" />
                </div>
              </div>
              <div>
                <label className="admin-label">Статус</label>
                <select value={form.status} onChange={e => setForm(v => ({ ...v, status: e.target.value as ClientStatus }))} className="admin-input">
                  {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="admin-label">Комментарий для клиента (на сайте)</label>
                <textarea value={form.regulatorNote} onChange={e => setForm(v => ({ ...v, regulatorNote: e.target.value }))} className="admin-input min-h-[72px]" rows={2} />
              </div>
              <div>
                <label className="admin-label">Внутренняя заметка</label>
                <textarea value={form.internalNote} onChange={e => setForm(v => ({ ...v, internalNote: e.target.value }))} className="admin-input min-h-[72px]" rows={2} />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-5">
              <button type="button" onClick={() => setShowForm(false)} className="premium-btn premium-btn-outline text-sm !py-2 !px-4">Отмена</button>
              <button type="button" onClick={saveForm} disabled={saving} className="premium-btn premium-btn-primary text-sm !py-2 !px-4">
                {saving ? 'Сохранение…' : editId ? 'Сохранить в GitHub' : 'Создать в GitHub'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
