type AliasMap = Record<string, { alias: string }>
type AliasFormatter = (value: string | number) => string | number

const formatters = new Map<string, AliasFormatter>()
const cacheLimit = 64

/** Only retain actual translations, without capturing a dataset or reshape context. */
export const createAliasFormatter = (aliases: AliasMap): AliasFormatter | undefined => {
  const entries = Object.entries(aliases)
    .filter(([id, { alias }]) => id !== alias)
    .map(([id, { alias }]) => [id, alias] as const)
    .sort(([a], [b]) => a.localeCompare(b))
  if (!entries.length) return undefined

  const key = JSON.stringify(entries)
  const cached = formatters.get(key)
  if (cached) return cached

  const values = new Map(entries)
  const formatter: AliasFormatter = (value) => values.get(String(value)) ?? value
  if (formatters.size === cacheLimit) formatters.delete(formatters.keys().next().value!)
  formatters.set(key, formatter)
  return formatter
}
