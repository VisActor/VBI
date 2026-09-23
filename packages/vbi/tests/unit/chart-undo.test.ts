import { rs } from '@rstest/core'
import { createVBI } from '@visactor/vbi'

describe('chart undo transaction boundaries', () => {
  beforeEach(() => {
    rs.useFakeTimers({ toFake: ['Date'] })
    rs.setSystemTime(new Date('2026-09-23T00:00:00.000Z'))
  })

  afterEach(() => {
    rs.useRealTimers()
  })

  it('undoes and redoes synchronous chart edits individually through a dashboard reference', () => {
    const vbi = createVBI()
    const chart = vbi.chart.create(vbi.chart.createEmpty('demoSupermarket'))
    const states = [chart.build()]
    expect(chart.undoManager.canUndo()).toBe(false)

    chart.chartType.changeChartType('bar')
    states.push(chart.build())
    chart.dimensions.add('province', (node) => node.setAlias('省份'))
    states.push(chart.build())
    chart.measures.add('sales', (node) => node.setAlias('销售额').setEncoding('xAxis').setAggregate({ func: 'sum' }))
    states.push(chart.build())
    chart.limit.setLimit(8)
    states.push(chart.build())

    const dashboard = vbi.dashboard.create(vbi.dashboard.createEmpty())
    dashboard.chart.add((widget) => widget.setChart(chart).setLayouts({ lg: { x: 0, y: 0, w: 8, h: 6 } }))
    const dashboardState = dashboard.build()
    const editor = dashboard.getChartBuilder(chart.getUUID())!
    expect(editor).toBe(chart)

    for (const state of states.slice(0, -1).reverse()) {
      expect(editor.undoManager.undo()).toBe(true)
      expect(editor.build()).toEqual(state)
      expect(dashboard.build()).toEqual(dashboardState)
    }
    expect(editor.undoManager.canUndo()).toBe(false)

    for (const state of states.slice(1)) {
      expect(editor.undoManager.redo()).toBe(true)
      expect(editor.build()).toEqual(state)
    }
    expect(editor.undoManager.canRedo()).toBe(false)
  })

  it('keeps explicitly grouped chart edits in one undo step', () => {
    const vbi = createVBI()
    const chart = vbi.chart.create(vbi.chart.createEmpty('demoSupermarket'))
    const initial = chart.build()

    chart.doc.transact(() => {
      chart.chartType.changeChartType('bar')
      chart.dimensions.add('province', (node) => node.setAlias('省份'))
      chart.measures.add('sales', (node) => node.setAlias('销售额').setAggregate({ func: 'sum' }))
      chart.limit.setLimit(8)
    })
    const edited = chart.build()

    expect(chart.undoManager.undo()).toBe(true)
    expect(chart.build()).toEqual(initial)
    expect(chart.undoManager.canUndo()).toBe(false)
    expect(chart.undoManager.redo()).toBe(true)
    expect(chart.build()).toEqual(edited)
    expect(chart.undoManager.canRedo()).toBe(false)
  })
})
