import { rs } from '@rstest/core'
import { createVBI, type VBIChartBuilderInterface } from '@visactor/vbi'
import type { IVChart } from '@visactor/vchart'
import * as Y from 'yjs'

const createChart = () => {
  const vbi = createVBI()
  const chart = vbi.chart.create(vbi.chart.createEmpty('test'))
  chart.chartType.changeChartType('area')
  return chart
}

describe('chart DSL subscriptions', () => {
  it('distinguishes top-level and nested changes and unsubscribes independently', () => {
    const chart = createChart()
    const builder: VBIChartBuilderInterface = chart
    const shallow = rs.fn()
    const deep = rs.fn()
    builder.observe(shallow)
    builder.observeDeep(deep)
    expect(shallow).not.toHaveBeenCalled()
    expect(deep).not.toHaveBeenCalled()

    chart.doc.transact(() => {
      chart.theme.setTheme('dark')
      chart.limit.setLimit(10)
    }, 'preferences')
    expect(shallow).toHaveBeenCalledTimes(1)
    expect(deep).toHaveBeenCalledTimes(1)
    expect(shallow.mock.calls[0][0].keysChanged).toEqual(new Set(['theme', 'limit']))
    expect(shallow.mock.calls[0][1].origin).toBe('preferences')

    chart.doc.transact(() => {
      chart.whereFilter.add('order_day', (node) => node.setOperator('between').setValue({ min: 1, max: 7 }))
      chart.dimensions.add('order_date', (node) => node.setAlias('日期'))
      chart.measures.add('sales', (node) => node.setAggregate({ func: 'sum' }))
    }, 'period')
    expect(shallow).toHaveBeenCalledTimes(1)
    expect(deep).toHaveBeenCalledTimes(2)
    expect(deep.mock.calls[1][1].origin).toBe('period')

    builder.unobserve(shallow)
    chart.limit.setLimit(20)
    expect(shallow).toHaveBeenCalledTimes(1)
    expect(deep).toHaveBeenCalledTimes(3)
    builder.unobserveDeep(deep)
    chart.whereFilter.clear()
    chart.theme.setTheme('light')
    expect(shallow).toHaveBeenCalledTimes(1)
    expect(deep).toHaveBeenCalledTimes(3)
    chart.doc.destroy()
  })

  it('observes nested edits, undo/redo, and remote updates without observing runtime or unrelated document state', () => {
    const chart = createChart()
    chart.doc.transact(() => {
      chart.whereFilter.addGroup('and', (group) => {
        group.add('order_day', (node) => node.setOperator('between').setValue({ min: 1, max: 7 }))
      })
    })
    chart.undoManager.clear()
    const changed = rs.fn(() => chart.build())
    chart.observeDeep(changed)
    const period = chart.whereFilter.find((node) => 'getField' in node && node.getField() === 'order_day')!
    chart.whereFilter.update(period.getId(), (node) => node.setValue({ min: 8, max: 14 }))
    expect(changed).toHaveBeenCalledTimes(1)
    expect(changed.mock.results[0].value).toEqual(chart.build())
    chart.undoManager.undo()
    chart.undoManager.redo()
    expect(changed).toHaveBeenCalledTimes(3)

    const remote = new Y.Doc()
    Y.applyUpdate(remote, chart.encodeStateAsUpdate())
    remote.getMap('dsl').set('theme', 'dark')
    chart.applyUpdate(Y.encodeStateAsUpdate(remote), 'remote')
    expect(changed).toHaveBeenCalledTimes(4)

    chart.build()
    chart.buildVQuery()
    chart.instance.bind({ on: rs.fn(), off: rs.fn() } as unknown as IVChart)
    chart.instance.bind(undefined)
    chart.doc.getMap('presence').set('cursor', 1)
    expect(changed).toHaveBeenCalledTimes(4)
    chart.unobserveDeep(changed)
    remote.destroy()
    chart.doc.destroy()
  })
})
