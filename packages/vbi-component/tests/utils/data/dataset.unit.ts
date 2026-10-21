import { describe, expect, it } from '@stencil/vitest'
import { type VQueryDSL } from '@visactor/vquery'
import {
  inferSchema,
  inferSchemaFromRows,
  rowsToDataset,
  getFieldSelections,
  normalizeMeasureValue,
  normalizeDataset,
  type LocalRow,
  type QueryValue,
} from 'src/utils/data/dataset'

describe('inferSchema', () => {
  it('should infer number type when all non-empty sampled values are numeric', () => {
    const headers = ['id', 'sales', 'category']
    const rows = [
      ['100', '25.5', 'Electronics'],
      ['101', '10.0', 'Books'],
    ]
    const schema = inferSchema(headers, rows)
    expect(schema).toEqual([
      { name: 'id', type: 'number' },
      { name: 'sales', type: 'number' },
      { name: 'category', type: 'string' },
    ])
  })

  it('should infer date type for date strings', () => {
    const headers = ['date']
    const rows = [['2024-01-01'], ['2024/05/10']]
    const schema = inferSchema(headers, rows)
    expect(schema).toEqual([{ name: 'date', type: 'date' }])
  })

  it('should fallback to string type when mixed or empty', () => {
    const headers = ['mixed']
    const rows = [['123'], ['abc']]
    const schema = inferSchema(headers, rows)
    expect(schema).toEqual([{ name: 'mixed', type: 'string' }])
  })
})

describe('inferSchemaFromRows', () => {
  it('should return empty schema when input data is empty', () => {
    expect(inferSchemaFromRows([])).toEqual([])
  })

  it('should infer schema types (number or string) from the first row of data', () => {
    const data: LocalRow[] = [{ id: 1, name: 'Alice', score: 95.5, active: true }]
    expect(inferSchemaFromRows(data)).toEqual([
      { name: 'id', type: 'number' },
      { name: 'name', type: 'string' },
      { name: 'score', type: 'number' },
      { name: 'active', type: 'string' },
    ])
  })

  it('should infer schema from first row only, ignoring subsequent rows', () => {
    const data: LocalRow[] = [
      { id: 1, name: 'Alice' },
      { id: 'two', name: 2, extra: true },
    ]
    expect(inferSchemaFromRows(data)).toEqual([
      { name: 'id', type: 'number' },
      { name: 'name', type: 'string' },
    ])
  })
})

describe('rowsToDataset', () => {
  it('should convert rows to LocalRow array according to schema', () => {
    const headers = ['product', 'price']
    const rows = [
      ['Apple', '1.5'],
      ['Orange', ''],
    ]
    const schema = [
      { name: 'product', type: 'string' as const },
      { name: 'price', type: 'number' as const },
    ]
    const dataset = rowsToDataset(headers, rows, schema)
    expect(dataset).toEqual([
      { product: 'Apple', price: 1.5 },
      { product: 'Orange', price: null },
    ])
  })
})

describe('getFieldSelections', () => {
  it('should return empty lists when select is empty or missing', () => {
    expect(getFieldSelections({} as VQueryDSL<Record<string, QueryValue>>)).toEqual({
      dimensionFields: [],
      measureFields: [],
    })
    expect(getFieldSelections({ select: [] })).toEqual({
      dimensionFields: [],
      measureFields: [],
    })
  })

  it('should handle string select items as dimension fields', () => {
    const queryDSL: VQueryDSL<Record<string, QueryValue>> = {
      select: ['category', 'value'],
    }
    expect(getFieldSelections(queryDSL)).toEqual({
      dimensionFields: [
        { alias: 'category', field: 'category' },
        { alias: 'value', field: 'value' },
      ],
      measureFields: [],
    })
  })

  it('should classify fields with aggregations as measure fields, and others as dimension fields', () => {
    const queryDSL: VQueryDSL<Record<string, QueryValue>> = {
      select: [
        { field: 'category', alias: 'Cat' },
        { field: 'value', alias: 'TotalValue', aggr: { func: 'sum' } },
        { field: 'bonus', aggr: { func: 'avg' } },
        { field: 'ignore_me_invalid', alias: '' }, // empty alias causes skip
        null as any, // invalid items
      ],
    }
    expect(getFieldSelections(queryDSL)).toEqual({
      dimensionFields: [{ alias: 'Cat', field: 'category' }],
      measureFields: [
        { alias: 'TotalValue', field: 'value' },
        { alias: 'bonus', field: 'bonus' },
      ],
    })
  })
})

describe('normalizeMeasureValue', () => {
  it('should return number directly when value is a number', () => {
    expect(normalizeMeasureValue(42)).toBe(42)
    expect(normalizeMeasureValue(3.14)).toBe(3.14)
  })

  it('should convert bigint value to standard number', () => {
    expect(normalizeMeasureValue(100n)).toBe(100)
  })

  it('should parse numeric string to number', () => {
    expect(normalizeMeasureValue('42')).toBe(42)
    expect(normalizeMeasureValue('3.14')).toBe(3.14)
  })

  it('should return null for non-numeric string', () => {
    expect(normalizeMeasureValue('abc')).toBeNull()
    expect(normalizeMeasureValue('123a')).toBeNull()
  })

  it('should return null for other types (null, undefined, boolean, object)', () => {
    expect(normalizeMeasureValue(null)).toBeNull()
    expect(normalizeMeasureValue(undefined)).toBeNull()
    expect(normalizeMeasureValue(true)).toBeNull()
    expect(normalizeMeasureValue({ val: 42 })).toBeNull()
  })

  it('should pass through NaN and Infinity as-is', () => {
    expect(normalizeMeasureValue(NaN)).toBeNaN()
    expect(normalizeMeasureValue(Infinity)).toBe(Infinity)
    expect(normalizeMeasureValue(-Infinity)).toBe(-Infinity)
  })

  it('should convert empty string to 0 (Number("") === 0)', () => {
    expect(normalizeMeasureValue('')).toBe(0)
  })
})

describe('normalizeDataset', () => {
  it('should return original dataset if dimension and measure fields are empty', () => {
    const dataset: LocalRow[] = [
      { category: 'A', value: 10 },
      { category: 'B', value: 20 },
    ]
    expect(normalizeDataset({} as VQueryDSL<Record<string, QueryValue>>, dataset)).toEqual(dataset)
  })

  it('should project dimension fields and normalize/convert measure fields', () => {
    const queryDSL: VQueryDSL<Record<string, QueryValue>> = {
      select: [
        { field: 'category', alias: 'Cat' },
        { field: 'value', alias: 'TotalValue', aggr: { func: 'sum' } },
        { field: 'bonus', aggr: { func: 'avg' } },
      ],
    }
    const dataset: LocalRow[] = [
      { Cat: 'A', TotalValue: '10', bonus: 5, extra: 'ignored' },
      { Cat: 'B', TotalValue: 20, bonus: null },
    ]

    expect(normalizeDataset(queryDSL, dataset)).toEqual([
      { Cat: 'A', TotalValue: 10, bonus: 5 },
      { Cat: 'B', TotalValue: 20 },
    ])
  })

  it('should omit measure fields that normalize to null', () => {
    const queryDSL: VQueryDSL<Record<string, QueryValue>> = {
      select: [{ field: 'value', alias: 'value', aggr: { func: 'sum' } }],
    }
    const dataset: LocalRow[] = [{ value: null }, { value: 'abc' }, { value: undefined }]
    expect(normalizeDataset(queryDSL, dataset)).toEqual([{}, {}, {}])
  })

  it('should skip dimension fields not present in row', () => {
    const queryDSL: VQueryDSL<Record<string, QueryValue>> = {
      select: ['category', 'region'],
    }
    const dataset: LocalRow[] = [{ category: 'A' }]
    expect(normalizeDataset(queryDSL, dataset)).toEqual([{ category: 'A' }])
  })

  it('should let dimension value overwrite measure value when field appears in both', () => {
    const queryDSL: VQueryDSL<Record<string, QueryValue>> = {
      select: [
        { field: 'value', alias: 'value' },
        { field: 'value', alias: 'value', aggr: { func: 'sum' } },
      ],
    }
    const dataset: LocalRow[] = [{ value: '42' }]
    // measure processes first (normalizes '42' → 42), then dimension overwrites with raw '42'
    expect(normalizeDataset(queryDSL, dataset)).toEqual([{ value: '42' }])
  })
})

const dateAggregates = [
  ['to_year', '2025'],
  ['to_quarter', '2025-Q1'],
  ['to_month', '2025-01'],
  ['to_week', '2025-W00'],
  ['to_day', '2025-01-02'],
  ['to_hour', '2025-01-02 03'],
  ['to_minute', '2025-01-02 03:04'],
  ['to_second', '2025-01-02 03:04:05'],
] as const

for (const [func, value] of dateAggregates) {
  it(`${func} selects date dimensions and preserves their values alongside numeric measures`, () => {
    const queryDSL: VQueryDSL<Record<string, QueryValue>> = {
      select: [
        { field: 'order_date', alias: 'date_bucket', aggr: { func } },
        { field: 'delivery_date', aggr: { func } },
        { field: 'sales', alias: 'total', aggr: { func: 'sum' } },
        { field: 'order_date', alias: 'n', aggr: { func: 'count' } },
        'city',
      ],
    }
    expect(getFieldSelections(queryDSL)).toEqual({
      dimensionFields: [
        { field: 'order_date', alias: 'date_bucket' },
        { field: 'delivery_date', alias: 'delivery_date' },
        { field: 'city', alias: 'city' },
      ],
      measureFields: [
        { field: 'sales', alias: 'total' },
        { field: 'order_date', alias: 'n' },
      ],
    })
    expect(
      normalizeDataset(queryDSL, [
        { date_bucket: value, delivery_date: value, total: '123.5', n: '2', city: 'Shanghai', extra: 'ignored' },
        { date_bucket: null, delivery_date: null, total: 0, n: '0' },
        { total: 1, n: '1' },
      ]),
    ).toEqual([
      { date_bucket: value, delivery_date: value, total: 123.5, n: 2, city: 'Shanghai' },
      { date_bucket: null, delivery_date: null, total: 0, n: 0 },
      { total: 1, n: 1 },
    ])
  })
}
