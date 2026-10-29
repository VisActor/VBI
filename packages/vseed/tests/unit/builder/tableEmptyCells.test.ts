import { beforeAll, describe, expect, test } from 'vitest'
import type { ListTableConstructorOptions } from '@visactor/vtable'
import { Builder, registerAll } from 'src/builder'
import { zTable } from 'src/types'
import type { Table } from 'src/types'

beforeAll(registerAll)

const build = (options: Partial<Table> = {}) => {
  const seed = {
    chartType: 'table',
    dataset: [{ region: 'East', sales: 12 }],
    dimensions: [{ id: 'region' }, { id: 'category' }],
    measures: [{ id: 'sales', autoFormat: false, numFormat: { fractionDigits: 2 } }],
    totals: 'avg',
    ...options,
  } satisfies Table
  return (Builder.from(seed).build() as ListTableConstructorOptions).columns as any[]
}

describe('table emptyCellText', () => {
  test('keeps existing dimension, measure and total formatting without the option', () => {
    const columns = build()
    expect(columns[0].fieldFormat({ region: null })).toBe('null')
    expect(columns[2].fieldFormat({ sales: null })).toBeNull()
    expect(columns[2].fieldFormat({})).toBeUndefined()
    expect(columns[2].aggregation.formatFun(NaN)).toBe('NaN')
  })

  test.each(['—', ''])('formats missing and nonfinite values as %j without hiding zero or text', (emptyCellText) => {
    const columns = build({ emptyCellText })
    for (const value of [null, undefined, NaN, Infinity, -Infinity]) {
      expect(columns[0].fieldFormat({ region: value })).toBe(emptyCellText)
      expect(columns[2].fieldFormat({ sales: value })).toBe(emptyCellText)
      expect(columns[2].aggregation.formatFun(value)).toBe(emptyCellText)
    }
    expect(columns[0].fieldFormat({ region: '' })).toBe('')
    expect(columns[0].fieldFormat({ region: 'NaN' })).toBe('NaN')
    expect(columns[2].fieldFormat({ sales: 0 })).toBe('0.00')
    expect(columns[2].fieldFormat({ sales: -12 })).toBe('-12.00')
    expect(columns[2].aggregation.formatFun(0)).toBe('0.00')
    expect(columns[0].aggregation.formatFun()).toBe('平均')
    expect(columns[1].aggregation.formatFun()).toBe('')
  })

  test('preserves the option through schema and JSON and supports empty-data summaries', () => {
    const parsed = zTable.parse({ chartType: 'table', dataset: [], emptyCellText: '—' })
    expect(JSON.parse(JSON.stringify(parsed)).emptyCellText).toBe('—')
    expect(build({ dataset: [], emptyCellText: '—' })[2].aggregation.formatFun(NaN)).toBe('—')
  })
})
