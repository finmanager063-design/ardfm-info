export type ClientStatus = 'Новый' | 'В работе' | 'На проверке' | 'Решено' | 'Отклонено'
export type AppealType = 'credit' | 'insurance' | 'microfinance' | 'investment' | 'fraud' | 'other'

export interface AdminComment {
  id: string
  text: string
  author: string
  createdAt: string
}

export interface AdminAction {
  id: string
  field: string
  oldValue: string
  newValue: string
  author: string
  createdAt: string
}

export interface AdminClientRecord {
  id: string
  caseNumber: string
  clientName: string
  iin: string
  phone: string
  email: string
  type: AppealType
  amount: number
  status: ClientStatus
  comments: AdminComment[]
  history: AdminAction[]
  createdAt: string
  updatedAt: string
}

export interface ScammerRecord {
  id: string
  name: string
  phone: string
  description: string
  reportedBy: string
  createdAt: string
}

export interface HomepageMetric {
  id: string
  label: string
  value: string
  trend: string
  trendDirection: 'up' | 'down'
}

const CLIENTS_KEY = 'regylz-admin-clients'
const SCAMMERS_KEY = 'regylz-admin-scammers'
const METRICS_KEY = 'regylz-admin-metrics'
const ADMIN_USERS_KEY = 'regylz-admin-users'

function getItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch { return fallback }
}

function setItem(key: string, value: unknown) {
  if (typeof window === 'undefined') return
  localStorage.setItem(key, JSON.stringify(value))
}

export function getClients(): AdminClientRecord[] {
  return getItem<AdminClientRecord[]>(CLIENTS_KEY, [])
}

export function saveClients(clients: AdminClientRecord[]) {
  setItem(CLIENTS_KEY, clients)
}

export function getClient(id: string): AdminClientRecord | undefined {
  return getClients().find(c => c.id === id)
}

export function addClient(client: AdminClientRecord): AdminClientRecord[] {
  const clients = getClients()
  clients.unshift(client)
  saveClients(clients)
  return clients
}

export function updateClient(id: string, updates: Partial<AdminClientRecord>): AdminClientRecord[] {
  const clients = getClients()
  const idx = clients.findIndex(c => c.id === id)
  if (idx === -1) return clients
  clients[idx] = { ...clients[idx], ...updates, updatedAt: new Date().toISOString() }
  saveClients(clients)
  return clients
}

export function deleteClient(id: string): AdminClientRecord[] {
  const clients = getClients().filter(c => c.id !== id)
  saveClients(clients)
  return clients
}

export function addComment(clientId: string, comment: AdminComment): AdminClientRecord[] {
  const clients = getClients()
  const idx = clients.findIndex(c => c.id === clientId)
  if (idx === -1) return clients
  clients[idx].comments.push(comment)
  clients[idx].updatedAt = new Date().toISOString()
  saveClients(clients)
  return clients
}

export function addHistory(clientId: string, action: AdminAction): AdminClientRecord[] {
  const clients = getClients()
  const idx = clients.findIndex(c => c.id === clientId)
  if (idx === -1) return clients
  clients[idx].history.push(action)
  clients[idx].updatedAt = new Date().toISOString()
  saveClients(clients)
  return clients
}

export function getScammers(): ScammerRecord[] {
  return getItem<ScammerRecord[]>(SCAMMERS_KEY, [])
}

export function saveScammers(scammers: ScammerRecord[]) {
  setItem(SCAMMERS_KEY, scammers)
}

export function getMetrics(): HomepageMetric[] {
  return getItem<HomepageMetric[]>(METRICS_KEY, [
    { id: '1', label: 'Банков второго уровня', value: '21', trend: '+2', trendDirection: 'up' },
    { id: '2', label: 'Страховых организаций', value: '28', trend: '+1', trendDirection: 'up' },
    { id: '3', label: 'Микрофинансовых организаций', value: '190+', trend: '+5', trendDirection: 'up' },
    { id: '4', label: 'Лицензий выдано в 2026', value: '75', trend: '+12', trendDirection: 'up' },
  ])
}

export function saveMetrics(metrics: HomepageMetric[]) {
  setItem(METRICS_KEY, metrics)
}

export function exportToCSV(clients: AdminClientRecord[]): string {
  const headers = ['№ дела', 'ФИО', 'ИИН', 'Телефон', 'Email', 'Тип', 'Сумма', 'Статус', 'Создан', 'Обновлён']
  const rows = clients.map(c => [
    c.caseNumber,
    c.clientName,
    c.iin,
    c.phone,
    c.email,
    c.type,
    c.amount.toString(),
    c.status,
    c.createdAt,
    c.updatedAt,
  ].map(v => `"${v}"`).join(','))
  return [headers.join(','), ...rows].join('\n')
}

export function downloadCSV(filename: string, csv: string) {
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function formatCurrency(n: number): string {
  return n.toLocaleString('ru-RU') + ' ₸'
}

export function formatDate(d: string): string {
  try { return new Date(d).toLocaleDateString('ru-RU', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) }
  catch { return d }
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

export function suggestCaseNumber(): string {
  const clients = getClients()
  const existing = new Set(clients.map(c => c.caseNumber))
  for (let i = 1; i <= 9999; i++) {
    const cn = `FCA-2026-${String(i).padStart(4, '0')}`
    if (!existing.has(cn)) return cn
  }
  return `FCA-2026-${Date.now().toString().slice(-4)}`
}

export const STATUS_OPTIONS: ClientStatus[] = ['Новый', 'В работе', 'На проверке', 'Решено', 'Отклонено']
export const TYPE_OPTIONS: { value: AppealType; label: string }[] = [
  { value: 'credit', label: 'Кредитный спор' },
  { value: 'insurance', label: 'Страховой случай' },
  { value: 'microfinance', label: 'МФО' },
  { value: 'investment', label: 'Инвестиции' },
  { value: 'fraud', label: 'Мошенничество' },
  { value: 'other', label: 'Другое' },
]
