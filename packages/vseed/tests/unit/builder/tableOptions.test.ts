import { beforeAll, describe, expect, test } from 'vitest'
import type { ListTableConstructorOptions, PivotTableConstructorOptions } from '@visactor/vtable'
import { Builder, registerAll } from 'src/builder'
import { zTable, zPivotTable } from 'src/types'
import type { Table } from 'src/types'

beforeAll(registerAll)

const dataset = [{ region: 'East', year: '2026', sales: 12 }]
const dimensions = [{ id: 'region' }]
const measures = [{ id: 'sales' }]
type TableSpec = ListTableConstructorOptions | PivotTableConstructorOptions

describe.each(['table', 'pivotTable'] as const)('%s layout', (chartType) => {
  const build = (
    options: Partial<
      Pick<
        Table,
        'dataset' | 'widthMode' | 'heightMode' | 'autoWrapText' | 'autoFillWidth' | 'rowHeight' | 'headerRowHeight'
      >
    > = {},
  ) => Builder.from({ chartType, dataset, dimensions, measures, ...options }).build() as TableSpec

  test('preserves existing defaults without introducing optional layout fields', () => {
    const spec = build()
    expect(spec).toMatchObject({ widthMode: 'standard', heightMode: 'autoHeight', autoWrapText: true })
    expect(spec).not.toHaveProperty('autoFillWidth')
    expect(spec).not.toHaveProperty('defaultRowHeight')
    expect(spec).not.toHaveProperty('defaultHeaderRowHeight')
  })

  test('restores explicit layout values through the schema and JSON', () => {
    const schema = chartType === 'table' ? zTable : zPivotTable
    const seed = schema.parse({
      chartType,
      dataset,
      dimensions,
      measures,
      widthMode: 'adaptive',
      heightMode: 'standard',
      autoWrapText: false,
      autoFillWidth: false,
      rowHeight: 36,
      headerRowHeight: 42,
    })
    const builder = Builder.from(JSON.parse(JSON.stringify(seed)))
    const advanced = builder.buildAdvanced()!
    expect(advanced.config[chartType]).toMatchObject({ rowHeight: 36, autoFillWidth: false })
    expect(builder.buildSpec(advanced)).toMatchObject({
      widthMode: 'adaptive',
      heightMode: 'standard',
      autoWrapText: false,
      autoFillWidth: false,
      defaultRowHeight: 36,
      defaultHeaderRowHeight: 42,
    })
  })

  test('supports content sizing and empty datasets', () => {
    expect(build({ dataset: [], widthMode: 'autoWidth', heightMode: 'adaptive', autoFillWidth: true })).toMatchObject({
      records: [],
      widthMode: 'autoWidth',
      heightMode: 'adaptive',
      autoFillWidth: true,
    })
  })

  test('treats schema nulls as absent layout options', () => {
    const schema = chartType === 'table' ? zTable : zPivotTable
    const seed = schema.parse({
      chartType,
      dataset,
      dimensions,
      measures,
      widthMode: null,
      heightMode: null,
      autoWrapText: null,
      autoFillWidth: null,
      rowHeight: null,
      headerRowHeight: null,
    })
    expect(Builder.from(seed as Table).build()).toMatchObject({
      widthMode: 'standard',
      heightMode: 'autoHeight',
      autoWrapText: true,
    })
  })
})

test('rejects invalid table layout values', () => {
  for (const schema of [zTable, zPivotTable]) {
    const chartType = schema.shape.chartType.value
    for (const options of [{ rowHeight: 0 }, { headerRowHeight: -1 }, { widthMode: 'invalid' }]) {
      expect(schema.safeParse({ chartType, dataset, ...options }).success).toBe(false)
    }
  }
})
