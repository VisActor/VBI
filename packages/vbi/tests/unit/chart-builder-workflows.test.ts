import { rs } from '@rstest/core'
import { createVBI } from '@visactor/vbi'

const createChart = () => {
  const vbi = createVBI()
  return { vbi, chart: vbi.chart.create(vbi.chart.createEmpty('unit-workflow')) }
}

describe('headless chart workflows', () => {
  it('edits, locates, sorts and removes fields using public nodes', () => {
    const { chart } = createChart()
    expect(chart.isEmpty()).toBe(true)
    chart.dimensions.add('region', (n) => n.setEncoding('xAxis').setSort({ order: 'asc' }))
    chart.dimensions.add('date', (n) => n.setAggregate({ func: 'toYear' }))
    const [region, date] = chart.dimensions.findAll()
    expect(region.getSort()).toEqual({ order: 'asc' })
    expect(chart.dimensions.find((n) => n.getField() === 'date')?.getId()).toBe(date.getId())
    expect(chart.dimensions.find(() => false)).toBeUndefined()
    expect(chart.dimensions.update(date.getId(), (n) => n.clearAggregate().setAlias('Date'))).toBe(chart.dimensions)
    region.clearSort()
    expect(region.getSort()).toBeUndefined()
    chart.measures.add('sales', (n) => n.setSort({ order: 'desc' }).setFormat({ fractionDigits: 2 }))
    chart.measures.add('profit', (n) => n.setAggregate({ func: 'sum' }))
    const [sales, profit] = chart.measures.findAll()
    expect(chart.measures.find((n) => n.getField() === 'profit')?.getId()).toBe(profit.getId())
    expect(chart.measures.find(() => false)).toBeUndefined()
    expect(sales.getFormat()).toEqual({ fractionDigits: 2 })
    expect(sales.getSort()).toEqual({ order: 'desc' })
    expect(chart.measures.update(sales.getId(), (n) => n.clearFormat().clearSort())).toBe(chart.measures)
    expect(sales.getFormat()).toBeUndefined()
    expect(sales.getSort()).toBeUndefined()
    const restored = createVBI().chart.create(JSON.parse(JSON.stringify(chart.build())))
    expect(restored.build().dimensions).toEqual(chart.build().dimensions)
    expect(restored.build().measures).toEqual(chart.build().measures)
    restored.doc.destroy()
    expect(() => chart.dimensions.update('missing', () => {})).toThrow('not found')
    expect(() => chart.measures.update('missing', () => {})).toThrow('not found')
    chart.dimensions.remove(region.getId()).remove(date.getId())
    chart.measures.remove(sales.getId()).remove(profit.getId())
    expect(chart.isEmpty()).toBe(true)
    chart.doc.destroy()
  })

  it('notifies only the observed preference and stops after unsubscribe', () => {
    const { chart } = createChart()
    for (const [feature, change, value] of [
      [chart.theme, () => chart.theme.setTheme('dark'), 'dark'],
      [chart.locale, () => chart.locale.setLocale('en-US'), 'en-US'],
      [chart.limit, () => chart.limit.setLimit(7), 7],
    ] as const) {
      const changed = rs.fn()
      const stop = feature.observe(changed)
      chart.dsl.set('unrelated', true)
      expect(changed).not.toHaveBeenCalled()
      change()
      expect(changed).toHaveBeenCalledTimes(1)
      expect(feature.toJSON()).toBe(value)
      stop()
      chart.dsl.set('unrelated', false)
    }
    const changed = rs.fn()
    chart.observeDeep(changed)
    chart.theme.setTheme('dark')
    chart.locale.setLocale('en-US')
    expect(changed).not.toHaveBeenCalled()
    chart.unobserveDeep(changed)
    chart.doc.destroy()
  })

  it('reapplies encodings to populated charts while switching chart families', () => {
    const { chart } = createChart()
    for (const field of ['region', 'category', 'year']) chart.dimensions.add(field, () => {})
    for (const field of ['sales', 'profit', 'count']) chart.measures.add(field, () => {})
    for (const type of chart.chartType.getAvailableChartTypes()) {
      chart.chartType.changeChartType(type)
      const dimensions = chart.dimensions.findAll().map((n) => n.getEncoding())
      const measures = chart.measures.findAll().map((n) => n.getEncoding())
      expect(dimensions).toEqual(chart.chartType.getRecommendedDimensionEncodings())
      expect(measures).toEqual(chart.chartType.getRecommendedMeasureEncodings())
      expect(dimensions.every((encoding) => chart.chartType.getSupportedDimensionEncodings().includes(encoding!))).toBe(
        true,
      )
      expect(measures.every((encoding) => chart.chartType.getSupportedMeasureEncodings().includes(encoding!))).toBe(
        true,
      )
    }
    chart.chartType.changeChartType('scatter')
    expect(chart.measures.findAll().map((n) => n.getEncoding())).toEqual(['xAxis', 'yAxis', 'yAxis'])
    chart.chartType.changeChartType('raceColumn')
    expect(chart.dimensions.findAll().map((n) => n.getEncoding())).toEqual(['player', 'xAxis', 'color'])
    chart.doc.destroy()
  })

  it('preserves query aliases, schema, format and cancellation in VSeed construction', async () => {
    const { vbi, chart } = createChart()
    const schema = [
      { name: 'region', type: 'string' as const },
      { name: 'sales', type: 'number' as const },
    ]
    const query = rs.fn(async () => ({ dataset: [{ result: 42 }] }))
    vbi.connectors.register('unit-workflow', { discoverSchema: async () => schema, query })
    chart.dimensions.add('region', (n) => n.setEncoding('xAxis'))
    chart.dimensions.add('region', () => {})
    chart.measures.add('sales', (n) => n.setEncoding('yAxis').setFormat({ autoFormat: true }))
    chart.measures.add('sales', (n) => n.setFormat({ autoFormat: false, type: 'percent', fractionDigits: 1 }))
    chart.measures.add('sales', () => {})
    const signal = new AbortController().signal
    const seed = await chart.buildVSeed({ signal })
    expect(await chart.getSchema()).toEqual(schema)
    expect(query).toHaveBeenCalledWith(expect.objectContaining({ queryDSL: chart.buildVQuery(), signal }))
    expect(seed.dataset).toEqual([{ result: 42 }])
    expect(seed.measures).toMatchObject([
      { encoding: 'yAxis', autoFormat: true },
      { autoFormat: false, numFormat: { type: 'percent', fractionDigits: 1 } },
      { alias: 'sales' },
    ])
    expect(seed.dimensions?.[0]).toMatchObject({ encoding: 'xAxis' })
    chart.doc.destroy()
  })

  it('builds date aggregates and multi-field ordering without inferring another query grain', () => {
    const { chart } = createChart()
    chart.dimensions.add('date', (n) => n.setAggregate({ func: 'toMonth' }).setSort({ order: 'asc' }))
    chart.measures.add('sales', (n) => n.setAggregate({ func: 'sum' }).setSort({ order: 'desc' }))
    const dimensionId = chart.dimensions.findAll()[0].getId()
    const measureId = chart.measures.findAll()[0].getId()
    expect(chart.buildVQuery()).toMatchObject({
      select: [
        { field: 'sales', alias: measureId, aggr: { func: 'sum' } },
        { field: 'date', alias: dimensionId, aggr: { func: 'to_month' } },
      ],
      orderBy: [
        { field: dimensionId, order: 'asc' },
        { field: measureId, order: 'desc' },
      ],
    })
    chart.doc.destroy()
  })
})
