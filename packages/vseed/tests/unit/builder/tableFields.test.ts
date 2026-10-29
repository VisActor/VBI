import { beforeAll, describe, expect, test } from 'vitest'
import type { ListTableConstructorOptions, PivotTableConstructorOptions } from '@visactor/vtable'
import { Builder, registerAll } from 'src/builder'
import { zTable, zPivotTable, zDimension, zMeasure } from 'src/types'
import type { Table, PivotTable } from 'src/types'

beforeAll(registerAll)

describe('table field widths', () => {
  test('preserves widths and formats in nested field trees through schema and JSON', () => {
    const seed = {
      chartType: 'table',
      dataset: [{ region: 'East', date: '2026-10-28', sales: 12 }],
      dimensions: [
        {
          id: 'dimensions',
          children: [
            { id: 'region', width: 180 },
            { id: 'dates', children: [{ id: 'date', width: 'auto', timeFormat: { type: 'year' } }] },
          ],
        },
      ],
      measures: [
        {
          id: 'measures',
          children: [{ id: 'sales', width: 120, autoFormat: false, numFormat: { fractionDigits: 2, suffix: ' USD' } }],
        },
      ],
    } satisfies Table
    const parsed = zTable.parse(JSON.parse(JSON.stringify(seed)))
    expect(parsed).toMatchObject(seed)
    const spec = Builder.from(parsed as Table).build() as ListTableConstructorOptions
    const columns = spec.columns as any[]
    expect(columns[0].columns[0]).toMatchObject({ field: 'region', width: 180 })
    expect(columns[0].columns[1].columns[0].width).toBe('auto')
    expect(columns[0].columns[1].columns[0].fieldFormat({ date: '2026-10-28' })).toBe('2026')
    expect(columns[1].columns[0]).toMatchObject({ field: 'sales', width: 120 })
    expect(columns[1].columns[0].fieldFormat({ sales: 12 })).toMatch(/ USD$/)
    expect(seed.dimensions[0].children[0]).toEqual({ id: 'region', width: 180 })
  })

  test('configures pivot rows, columns and indicators without modifying spec', () => {
    const seed = {
      chartType: 'pivotTable',
      dataset: [{ region: 'East', year: '2026', sales: 12 }],
      dimensions: [
        { id: 'region', encoding: 'row', width: 180 },
        { id: 'year', encoding: 'column', width: 100 },
      ],
      measures: [{ id: 'sales', width: 120 }],
      indicatorsAsCol: true,
    } satisfies PivotTable
    const parsed = zPivotTable.parse(seed)
    expect(parsed).toMatchObject(seed)
    const spec = Builder.from(parsed as PivotTable).build() as PivotTableConstructorOptions
    expect(spec.rows).toMatchObject([{ dimensionKey: 'region', width: 180 }])
    expect(spec.columns).toMatchObject([{ dimensionKey: 'year', width: 100 }])
    expect(spec.indicators).toMatchObject([{ indicatorKey: 'sales', width: 120 }])
  })

  test('validates widths without adding table properties to chart field schemas', () => {
    for (const schema of [zTable, zPivotTable]) {
      const chartType = schema.shape.chartType.value
      for (const width of [0, -1, '40%']) {
        expect(schema.safeParse({ chartType, dimensions: [{ id: 'region', width }] }).success).toBe(false)
        expect(schema.safeParse({ chartType, measures: [{ id: 'sales', width }] }).success).toBe(false)
      }
    }
    expect(zDimension.parse({ id: 'region', width: 180 })).toEqual({ id: 'region' })
    expect(zMeasure.parse({ id: 'sales', width: 120 })).toEqual({ id: 'sales' })
    // Existing schemas accepted all dimension encodings; retain that compatibility.
    expect(zTable.parse({ chartType: 'table', dimensions: [{ id: 'region', encoding: 'xAxis' }] }).dimensions).toEqual([
      { id: 'region', encoding: 'xAxis' },
    ])
  })
})
