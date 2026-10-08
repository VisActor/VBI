import { intl } from 'src/i18n'
import type { Formatter, Locale, TimeFormat, TimeGranularity } from 'src/types'

const DEFAULT_SEPARATOR = '-'
// TimeFormat has only a granularity; the locale/granularity combinations are finite.
const formatters = new Map<string, Formatter>()

const parseTimeValue = (value?: number | string): Date | undefined => {
  if (value === undefined || value === null) return undefined
  if (typeof value === 'number' && Number.isFinite(value)) {
    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? undefined : date
  }

  const text = String(value).trim()
  if (!text) return undefined

  const timestamp = Number(text)
  if (!Number.isNaN(timestamp)) {
    const date = new Date(timestamp)
    return Number.isNaN(date.getTime()) ? undefined : date
  }

  const date = new Date(text)
  return Number.isNaN(date.getTime()) ? undefined : date
}

const parseTextParts = (value?: number | string) => {
  if (value === undefined || value === null) return undefined
  const text = String(value).trim()
  if (!text) return undefined
  const match = text.match(/^\\s*(\\d{4})-(\\d{2})-(\\d{2})(?:[T\\s](\\d{2}):(\\d{2}):(\\d{2}))?\\s*$/)
  if (!match) return undefined
  const [, year, month, day, hour, minute, second] = match
  return {
    year: Number(year),
    month: Number(month),
    day: Number(day),
    hour: hour ? Number(hour) : 0,
    minute: minute ? Number(minute) : 0,
    second: second ? Number(second) : 0,
  }
}

const pad2 = (value: number) => String(value).padStart(2, '0')

const getWeekNumber = (date: Date) => {
  const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const day = utcDate.getUTCDay() || 7
  utcDate.setUTCDate(utcDate.getUTCDate() + 4 - day)
  const yearStart = new Date(Date.UTC(utcDate.getUTCFullYear(), 0, 1))
  const week = Math.ceil(((utcDate.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
  return { year: utcDate.getUTCFullYear(), week }
}

const getIntlFormatter = (granularity: TimeGranularity, locale: Locale) => {
  const options: Intl.DateTimeFormatOptions = {}
  switch (granularity) {
    case 'year':
      options.year = 'numeric'
      break
    case 'quarter':
      options.year = 'numeric'
      options.month = '2-digit'
      break
    case 'month':
      options.year = 'numeric'
      options.month = '2-digit'
      break
    case 'week':
      options.year = 'numeric'
      options.month = '2-digit'
      options.day = '2-digit'
      break
    case 'day':
      options.year = 'numeric'
      options.month = '2-digit'
      options.day = '2-digit'
      break
    case 'hour':
      options.year = 'numeric'
      options.month = '2-digit'
      options.day = '2-digit'
      options.hour = '2-digit'
      break
    case 'minute':
      options.year = 'numeric'
      options.month = '2-digit'
      options.day = '2-digit'
      options.hour = '2-digit'
      options.minute = '2-digit'
      break
    case 'second':
      options.year = 'numeric'
      options.month = '2-digit'
      options.day = '2-digit'
      options.hour = '2-digit'
      options.minute = '2-digit'
      options.second = '2-digit'
      break
  }
  return new Intl.DateTimeFormat(locale, options)
}

const formatQuarter = (date: Date, locale: Locale, rawText?: string) => {
  const parts = rawText ? parseTextParts(rawText) : undefined
  const year = parts?.year ?? date.getFullYear()
  const month = parts?.month ?? date.getMonth() + 1
  const quarter = Math.floor((month - 1) / 3) + 1
  return locale === 'zh-CN' ? `${year}年Q${quarter}` : `${year} Q${quarter}`
}

const formatWeek = (date: Date, locale: Locale, rawText?: string) => {
  const parts = rawText ? parseTextParts(rawText) : undefined
  const weekInfo = parts
    ? getWeekNumber(new Date(Date.UTC(parts.year, parts.month - 1, parts.day)))
    : getWeekNumber(date)
  return locale === 'zh-CN' ? `${weekInfo.year}年第${weekInfo.week}周` : `${weekInfo.year} W${weekInfo.week}`
}

const formatDefault = (
  date: Date,
  granularity: TimeGranularity,
  formatter: Intl.DateTimeFormat,
  locale: Locale,
  rawText?: string,
) => {
  if (granularity === 'quarter') {
    return formatQuarter(date, locale, rawText)
  }
  if (granularity === 'week') {
    return formatWeek(date, locale, rawText)
  }
  const parts = formatter.formatToParts(date)
  const map = parts.reduce<Record<string, string>>((prev, part) => {
    prev[part.type] = part.value
    return prev
  }, {})
  const rawParts = rawText ? parseTextParts(rawText) : undefined
  const year = map.year ?? String(rawParts?.year ?? date.getFullYear())
  const month = map.month ?? pad2(rawParts?.month ?? date.getMonth() + 1)
  const day = map.day ?? pad2(rawParts?.day ?? date.getDate())
  const hour = map.hour ?? pad2(rawParts?.hour ?? date.getHours())
  const minute = map.minute ?? pad2(rawParts?.minute ?? date.getMinutes())
  const second = map.second ?? pad2(rawParts?.second ?? date.getSeconds())

  switch (granularity) {
    case 'year':
      return year
    case 'month':
      return `${year}-${month}`
    case 'day':
      return `${year}-${month}-${day}`
    case 'hour':
      return `${year}-${month}-${day} ${hour}`
    case 'minute':
      return `${year}-${month}-${day} ${hour}:${minute}`
    case 'second':
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`
    default:
      return formatter.format(date)
  }
}

export const createTimeFormatter = (format?: TimeFormat, fallbackLocale: Locale = intl.getLocale()): Formatter => {
  if (!format) {
    return String
  }
  const { type } = format
  const finalLocale = fallbackLocale
  const key = `${finalLocale}:${type}`
  const cached = formatters.get(key)
  if (cached) return cached
  const intlFormatter = getIntlFormatter(type, finalLocale)

  const formatter: Formatter = (value) => {
    const date = parseTimeValue(value)
    if (!date) {
      return String(value)
    }
    const rawText = value === undefined || value === null ? undefined : String(value)
    const formatted = formatDefault(date, type, intlFormatter, finalLocale, rawText)
    return formatted.replaceAll('/', DEFAULT_SEPARATOR).replaceAll('.', DEFAULT_SEPARATOR)
  }
  formatters.set(key, formatter)
  return formatter
}
