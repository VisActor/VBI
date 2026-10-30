import type { DatasetColumn, VQueryDSL } from '../../types'

/** Infer projected names and types, including subqueries, wildcards and aggregate aliases. */
export const getQuerySchema = (query: VQueryDSL, columns: DatasetColumn[]): DatasetColumn[] => {
  const source = query.from ? getQuerySchema(query.from, columns) : columns
  if (!query.select.length) return source
  const fields = new Map(source.map((column) => [column.name, column.type]))
  return query.select.flatMap((item) => {
    if (item === '*') return source
    if (typeof item !== 'string' && item.expr !== undefined) return [{ name: item.alias, type: 'number' as const }]
    const field = typeof item === 'string' ? item : item.field
    const aggr = typeof item === 'string' ? undefined : item.aggr?.func
    const type =
      !aggr || aggr === 'min' || aggr === 'max' ? fields.get(field) : aggr.startsWith('to_') ? 'string' : 'number'
    return type
      ? [
          {
            name:
              typeof item === 'string' ? item : (item.alias ?? (field === '*' && aggr === 'count' ? 'count' : field)),
            type,
          },
        ]
      : []
  })
}
