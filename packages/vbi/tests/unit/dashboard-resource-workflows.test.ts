import { createVBI } from '@visactor/vbi'
import {
  mapAggregateForVQuery,
  mapDimensionAggregateForVQuery,
} from 'src/chart-builder/pipeline/vqueryDSL/aggregateMap'

it('edits dashboard widget collections without copying or deleting shared resources', () => {
  const vbi = createVBI()
  const chart = vbi.chart.create(vbi.chart.createEmpty('demo'))
  const insight = vbi.insight.create(vbi.insight.createEmpty())
  expect(insight.isEmpty()).toBe(true)
  insight.setContent('Revenue evidence')
  expect(insight.isEmpty()).toBe(false)
  const dashboard = vbi.dashboard.create(vbi.dashboard.createEmpty())
  expect(() => dashboard.chart.add(() => {})).toThrow('requires layouts.lg')
  dashboard.chart.remove('missing')
  const layouts = { lg: { x: 0, y: 0, w: 4, h: 4 } }
  dashboard.chart.add((widget) => widget.setChart(chart).setLayouts(layouts))
  dashboard.insight.add((widget) => widget.setInsightId(insight).setLayouts(layouts))
  expect(dashboard.chart.findAll()[0].getBuilder()).toBe(chart)
  expect(dashboard.insight.findAll()[0].getBuilder()).toBe(insight)
  const [chartWidget] = dashboard.chart.toJSON()
  const [insightWidget] = dashboard.insight.toJSON()
  expect(chartWidget).toMatchObject({ chartId: chart.getUUID() })
  expect(insightWidget).toMatchObject({ insightId: insight.getUUID() })
  dashboard.insight.update(insightWidget.id, (widget) => widget.setLayouts({ lg: { x: 4, y: 1, w: 4, h: 3 } }))
  expect(dashboard.build().layout.lg).toEqual(
    expect.arrayContaining([expect.objectContaining({ widgetId: insightWidget.id, x: 4, y: 1 })]),
  )
  dashboard.chart.remove(chartWidget.id)
  expect(dashboard.chart.toJSON()).toEqual([])
  expect(dashboard.insight.toJSON()).toHaveLength(1)
  expect(dashboard.getChartBuilder(chart.getUUID())).toBe(chart)
  expect(dashboard.getInsightBuilder(insight.getUUID())).toBe(insight)
  expect(mapDimensionAggregateForVQuery(undefined)).toBeUndefined()
  expect(mapAggregateForVQuery(undefined)).toBeUndefined()
  chart.doc.destroy()
  insight.doc.destroy()
  dashboard.doc.destroy()
})
