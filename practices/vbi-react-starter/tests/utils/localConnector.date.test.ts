import { afterEach, expect, test } from '@rstest/core'
import { VBI } from '@visactor/vbi'
import { createLocalConnector, setLocalDataWithSchema } from '../../src/utils/localConnector'

const connectorId = 'date-aggregate-regression'
afterEach(() => {
  VBI.connectors.unregister(connectorId)
  setLocalDataWithSchema([], null)
})

const dateAggregates = [
  ['toYear', '2025'],
  ['toQuarter', '2025-Q1'],
  ['toMonth', '2025-01'],
  ['toWeek', '2025-W00'],
  ['toDay', '2025-01-02'],
  ['toHour', '2025-01-02 03'],
  ['toMinute', '2025-01-02 03:04'],
  ['toSecond', '2025-01-02 03:04:05'],
] as const

for (const [func, expected] of dateAggregates) {
  test(`${func} preserves date strings through query and VSeed construction`, async () => {
    setLocalDataWithSchema(
      [
        { order_date: '2025-01-02 03:04:05', city: 'Shanghai', sales: 100 },
        { order_date: '2025-01-02 03:04:05', city: 'Shanghai', sales: 200 },
      ],
      [
        { name: 'order_date', type: 'datetime' },
        { name: 'city', type: 'string' },
        { name: 'sales', type: 'number' },
      ],
    )
    createLocalConnector(connectorId)
    const builder = VBI.chart.create(VBI.chart.createEmpty(connectorId))
    try {
      builder.chartType.changeChartType('table')
      builder.dimensions.add('order_date', (node) => node.setAggregate({ func }))
      builder.dimensions.add('city', (node) => node.setAlias('City'))
      builder.measures.add('sales', (node) => node.setAggregate({ func: 'sum' }))
      builder.measures.add('order_date', (node) => node.setAggregate({ func: 'count' }))
      const dsl = builder.build()
      const seed = await builder.buildVSeed()
      expect(seed.dataset).toEqual([
        {
          [dsl.dimensions[0].id]: expected,
          [dsl.dimensions[1].id]: 'Shanghai',
          [dsl.measures[0].id]: 300,
          [dsl.measures[1].id]: 2,
        },
      ])
    } finally {
      builder.doc.destroy()
    }
  })
}
