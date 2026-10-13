import { compileQuery } from '@visactor/vquery'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { DatasetColumn, HavingOperator, VQueryDSL, WhereLeaf } from '@visactor/vquery'
import type { BaseAggregateFunction, DateAggregateFunction } from '../../src/types/dsl/Select'
import catalog from './queries.json'

type QueryCase = {
  name: string
  description?: string
  dsl: VQueryDSL
}
const { source, table, columns, queries } = catalog as {
  source: string
  table: string
  columns: DatasetColumn[]
  queries: QueryCase[]
}

// Exhaustive records make new DSL functions/operators require fixture updates.
const aggregateFunctions: Record<BaseAggregateFunction, true> = {
  count: true,
  count_distinct: true,
  sum: true,
  avg: true,
  min: true,
  max: true,
  variance: true,
  variance_pop: true,
  stddev: true,
  median: true,
  quantile: true,
}
const dateFunctions: Record<DateAggregateFunction, true> = {
  to_year: true,
  to_quarter: true,
  to_month: true,
  to_week: true,
  to_day: true,
  to_hour: true,
  to_minute: true,
  to_second: true,
}
const whereOperators: Record<WhereLeaf<Record<string, unknown>>['op'], true> = {
  '=': true,
  '!=': true,
  '>': true,
  '>=': true,
  '<': true,
  '<=': true,
  in: true,
  'not in': true,
  between: true,
  'not between': true,
  'is null': true,
  'is not null': true,
  like: true,
  'not like': true,
  ilike: true,
  'not ilike': true,
}
const havingOperators: Record<HavingOperator, true> = {
  '=': true,
  '!=': true,
  '>': true,
  '>=': true,
  '<': true,
  '<=': true,
  in: true,
  'not in': true,
  between: true,
  'not between': true,
  'is null': true,
  'is not null': true,
}
type FilterNode = { field?: string; op: string; aggr?: { func: string }; conditions?: FilterNode[] }
function leaves(node?: FilterNode): FilterNode[] {
  if (!node) return []
  return node.conditions ? node.conditions.flatMap((child) => leaves(child)) : [node]
}

it('uses the real supermarket CSV schema', () => {
  const header = readFileSync(resolve(__dirname, '../..', source), 'utf8')
    .split(/\r?\n/, 1)[0]
    .replace(/^\uFEFF/, '')
    .split(',')
  expect(table).toBe('supermarket')
  expect(columns.map((column) => column.name)).toEqual(header)
})

it('keeps fixture names unique and covers the declared DSL feature combinations', () => {
  expect(new Set(queries.map((entry) => entry.name)).size).toBe(queries.length)
  const selected = new Set<string>()
  const where = new Set<string>()
  const having = new Set<string>()
  const dates = new Set<string>()
  const ordering = new Set<string>()
  for (const { dsl } of queries) {
    const aggregates = dsl.select.flatMap((item) =>
      typeof item === 'string' || !item.aggr ? [] : [{ ...item, aggr: item.aggr }],
    )
    for (const item of aggregates) {
      const func = item.aggr.func
      selected.add(func)
      const sort = dsl.orderBy?.find((sort) => sort.field === (item.alias ?? item.field))
      if (sort) ordering.add(`${func}:${sort.order ?? 'asc'}:${sort.nulls ?? 'default'}`)
    }
    if (dsl.where?.conditions?.some((child) => 'conditions' in child))
      for (const leaf of leaves(dsl.where)) where.add(`${dsl.where.op}:${leaf.op}`)
    for (const leaf of leaves(dsl.having)) having.add(`${leaf.aggr!.func}:${leaf.op}`)
    for (const date of aggregates.filter(
      (item) => item.aggr.func.startsWith('to_') && dsl.groupBy?.includes(item.alias ?? item.field),
    ))
      for (const numeric of aggregates.filter((item) => !item.aggr.func.startsWith('to_')))
        dates.add(`${date.aggr.func}:${numeric.aggr.func}`)
  }
  expect(selected).toEqual(new Set([...Object.keys(aggregateFunctions), ...Object.keys(dateFunctions)]))
  expect(queries.some(({ dsl }) => dsl.select.length === 0)).toBe(true)
  expect(queries.some(({ dsl }) => dsl.select.some((item) => typeof item === 'string'))).toBe(true)
  expect(
    queries.some(({ dsl }) => dsl.select.some((item) => typeof item !== 'string' && item.alias && !item.aggr)),
  ).toBe(true)
  for (const func of Object.keys(aggregateFunctions)) {
    for (const op of Object.keys(havingOperators)) expect([...having]).toContain(`${func}:${op}`)
    for (const date of Object.keys(dateFunctions)) expect([...dates]).toContain(`${date}:${func}`)
    for (const order of ['asc', 'desc'])
      for (const nulls of ['default', 'first', 'last']) expect([...ordering]).toContain(`${func}:${order}:${nulls}`)
  }
  for (const op of Object.keys(whereOperators))
    for (const root of ['and', 'or']) expect([...where]).toContain(`${root}:${op}`)
  expect(
    queries.some(({ dsl }) =>
      ['select', 'where', 'groupBy', 'having', 'orderBy', 'limit'].every((clause) => clause in dsl),
    ),
  ).toBe(true)
})

describe('DSL to SQL snapshots', () => {
  for (const entry of queries)
    it(entry.name, () => {
      const { dsl } = entry
      const fields = columns.map((column) => column.name)
      const selected = dsl.select.map((item) => (typeof item === 'string' ? { field: item } : item))
      const aliases = new Map(selected.map((item) => [item.alias ?? item.field, item]))
      for (const item of selected) expect(fields).toContain(item.field)
      for (const item of [...leaves(dsl.where), ...leaves(dsl.having)]) expect(fields).toContain(item.field)
      for (const field of [...(dsl.groupBy ?? []), ...(dsl.orderBy ?? []).map((item) => item.field)])
        expect([...fields, ...aliases.keys()]).toContain(field)
      for (const field of dsl.groupBy ?? []) {
        const item = aliases.get(field)
        if (!fields.includes(field) && item?.aggr) expect(item.aggr.func.startsWith('to_')).toBe(true)
      }
      const grouped =
        selected.some((item) => item.aggr && !item.aggr.func.startsWith('to_')) || leaves(dsl.having).length
      if (grouped) {
        for (const item of selected.filter((item) => !item.aggr || item.aggr.func.startsWith('to_')))
          expect(
            (dsl.groupBy ?? []).includes(item.field) || (dsl.groupBy ?? []).includes(item.alias ?? item.field),
          ).toBe(true)
      }
      expect(
        Object.fromEntries(
          (['mysql', 'duckdb'] as const).map((dialect) => [dialect, compileQuery(dsl, { table, columns, dialect })]),
        ),
      ).toMatchSnapshot()
    })
})
