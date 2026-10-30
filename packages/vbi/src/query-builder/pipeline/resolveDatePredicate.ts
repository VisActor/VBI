import type { VBIWhereDateBounds, VBIWhereDatePredicate } from 'src/types/queryDSL'

export type DateRange = {
  start: string
  end: string
  bounds: VBIWhereDateBounds
}

export function resolveDatePredicate(predicate: VBIWhereDatePredicate, now?: Date): DateRange {
  switch (predicate.type) {
    case 'range':
      return resolveRange(predicate)
    case 'period':
      return resolvePeriod(predicate)
    case 'relative':
      return resolveRelative(predicate, now ?? new Date())
    case 'current':
      return resolveCurrent(predicate, now ?? new Date())
  }
}

function resolveRange(p: Extract<VBIWhereDatePredicate, { type: 'range' }>): DateRange {
  return {
    start: toDateString(p.start),
    end: toDateString(p.end),
    bounds: p.bounds ?? '[)',
  }
}

function resolvePeriod(p: Extract<VBIWhereDatePredicate, { type: 'period' }>): DateRange {
  switch (p.unit) {
    case 'year':
      return { start: `${p.year}-01-01`, end: `${p.year + 1}-01-01`, bounds: '[)' }
    case 'quarter':
      return resolveQuarter(p.year, p.quarter)
    case 'month':
      return resolveMonth(p.year, p.month)
    case 'week':
      return resolveISOWeek(p.year, p.week)
    case 'day':
      return resolveDay(p.date)
  }
}

function resolveQuarter(year: number, quarter: 1 | 2 | 3 | 4): DateRange {
  const startMonth = (quarter - 1) * 3 + 1
  const start = formatDate(year, startMonth, 1)
  const endDate = new Date(Date.UTC(year, startMonth - 1 + 3, 1))
  return { start, end: utcToDateString(endDate), bounds: '[)' }
}

function resolveMonth(year: number, month: number): DateRange {
  const start = formatDate(year, month, 1)
  const endDate = new Date(Date.UTC(year, month, 1))
  return { start, end: utcToDateString(endDate), bounds: '[)' }
}

function resolveISOWeek(year: number, week: number): DateRange {
  const jan4 = new Date(Date.UTC(year, 0, 4))
  const dayOfWeek = jan4.getUTCDay() || 7
  const monday = new Date(jan4.getTime() - (dayOfWeek - 1) * 86400000)
  const weekStart = new Date(monday.getTime() + (week - 1) * 7 * 86400000)
  const weekEnd = new Date(weekStart.getTime() + 7 * 86400000)
  return { start: utcToDateString(weekStart), end: utcToDateString(weekEnd), bounds: '[)' }
}

function resolveDay(date: string | Date): DateRange {
  const d = typeof date === 'string' ? new Date(date + 'T00:00:00Z') : date
  const next = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1))
  return { start: utcToDateString(d), end: utcToDateString(next), bounds: '[)' }
}

function resolveRelative(p: Extract<VBIWhereDatePredicate, { type: 'relative' }>, now: Date): DateRange {
  const today = truncateToDay(now)
  const offset = p.mode === 'last' ? -p.amount : p.amount

  const shifted = shiftDate(today, offset, p.unit)

  if (p.mode === 'last') {
    return { start: utcToDateString(shifted), end: utcToDateString(today), bounds: '[)' }
  }
  return { start: utcToDateString(today), end: utcToDateString(shifted), bounds: '[)' }
}

function resolveCurrent(p: Extract<VBIWhereDatePredicate, { type: 'current' }>, now: Date): DateRange {
  const offset = p.offset ?? 0
  const base = truncateToDay(now)
  const periodStart = getPeriodStart(base, p.unit, offset)
  const periodEnd = shiftDate(periodStart, 1, p.unit)
  return { start: utcToDateString(periodStart), end: utcToDateString(periodEnd), bounds: '[)' }
}

function getPeriodStart(date: Date, unit: string, offset: number): Date {
  const y = date.getUTCFullYear()
  const m = date.getUTCMonth()
  switch (unit) {
    case 'year':
      return new Date(Date.UTC(y + offset, 0, 1))
    case 'quarter': {
      const q = Math.floor(m / 3)
      return new Date(Date.UTC(y, (q + offset) * 3, 1))
    }
    case 'month':
      return new Date(Date.UTC(y, m + offset, 1))
    case 'week': {
      const dow = date.getUTCDay() || 7
      const monday = new Date(date.getTime() - (dow - 1) * 86400000)
      return new Date(monday.getTime() + offset * 7 * 86400000)
    }
    case 'day':
      return new Date(Date.UTC(y, m, date.getUTCDate() + offset))
    default:
      return date
  }
}

function shiftDate(date: Date, amount: number, unit: string): Date {
  const y = date.getUTCFullYear()
  const m = date.getUTCMonth()
  const d = date.getUTCDate()
  switch (unit) {
    case 'year':
      return new Date(Date.UTC(y + amount, m, d))
    case 'quarter':
      return new Date(Date.UTC(y, m + amount * 3, d))
    case 'month':
      return new Date(Date.UTC(y, m + amount, d))
    case 'week':
      return new Date(date.getTime() + amount * 7 * 86400000)
    case 'day':
      return new Date(Date.UTC(y, m, d + amount))
    default:
      return date
  }
}

function truncateToDay(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
}

function toDateString(input: string | Date): string {
  if (typeof input === 'string') return input
  return utcToDateString(input)
}

function utcToDateString(date: Date): string {
  return formatDate(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate())
}

function formatDate(year: number, month: number, day: number): string {
  const y = String(year)
  const m = String(month).padStart(2, '0')
  const d = String(day).padStart(2, '0')
  return `${y}-${m}-${d}`
}
