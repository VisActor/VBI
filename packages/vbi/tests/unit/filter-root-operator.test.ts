import { rs } from '@rstest/core'
import * as Y from 'yjs'
import { createVBI } from '@visactor/vbi'

const createChart = () => {
  const vbi = createVBI()
  return { vbi, chart: vbi.chart.create(vbi.chart.createEmpty('demo')) }
}

describe('root filter operators', () => {
  it('changes query logic while retaining conditions and IDs', () => {
    const { chart } = createChart()
    chart.dimensions.add('region', () => {})
    chart.measures.add('sales', (node) => node.setAggregate({ func: 'sum' }))
    chart.whereFilter.add('region', (node) => node.setOperator('eq').setValue('East'))
    chart.whereFilter.add('region', (node) => node.setOperator('eq').setValue('West'))
    chart.havingFilter.add('sales', (node) => node.setOperator('gt').setValue(100))
    chart.havingFilter.add('sales', (node) => node.setOperator('lt').setValue(10))
    const before = chart.build()

    expect(chart.whereFilter.getOperator()).toBe('and')
    expect(chart.havingFilter.getOperator()).toBe('and')
    expect(chart.whereFilter.setOperator('or')).toBe(chart.whereFilter)
    expect(chart.havingFilter.setOperator('or')).toBe(chart.havingFilter)
    expect(chart.whereFilter.getOperator()).toBe('or')
    expect(chart.havingFilter.getOperator()).toBe('or')
    expect(chart.buildVQuery()).toMatchObject({ where: { op: 'or' }, having: { op: 'or' } })
    expect(chart.whereFilter.toJSON().conditions).toEqual(before.whereFilter.conditions)
    expect(chart.havingFilter.toJSON().conditions).toEqual(before.havingFilter.conditions)
    chart.doc.destroy()
  })

  it('observes one transaction and supports undo, redo and JSON restoration', () => {
    const { vbi, chart } = createChart()
    chart.undoManager.clear()
    const changed = rs.fn()
    chart.observeDeep(changed)
    chart.doc.transact(() => {
      chart.whereFilter.setOperator('or')
      chart.havingFilter.setOperator('or')
    })
    expect(changed).toHaveBeenCalledTimes(1)
    expect(chart.undoManager.undo()).toBe(true)
    expect(chart.whereFilter.getOperator()).toBe('and')
    expect(chart.havingFilter.getOperator()).toBe('and')
    expect(chart.undoManager.redo()).toBe(true)
    const restored = vbi.chart.create(JSON.parse(JSON.stringify(chart.build())))
    expect(restored.whereFilter.getOperator()).toBe('or')
    expect(restored.havingFilter.getOperator()).toBe('or')
    chart.unobserveDeep(changed)
    restored.doc.destroy()
    chart.doc.destroy()
  })

  it('synchronizes root operators through public Yjs update APIs', () => {
    const { chart } = createChart()
    const remote = new Y.Doc()
    Y.applyUpdate(remote, chart.encodeStateAsUpdate())
    const state = Y.encodeStateVector(remote)
    chart.doc.transact(() => {
      chart.whereFilter.setOperator('or')
      chart.havingFilter.setOperator('or')
    })
    Y.applyUpdate(remote, chart.encodeStateAsUpdate(state))
    expect(remote.getMap('dsl').toJSON()).toMatchObject({ whereFilter: { op: 'or' }, havingFilter: { op: 'or' } })
    ;(remote.getMap('dsl').get('whereFilter') as Y.Map<unknown>).set('op', 'and')
    chart.applyUpdate(Y.encodeStateAsUpdate(remote), 'remote')
    expect(chart.whereFilter.getOperator()).toBe('and')
    expect(chart.havingFilter.getOperator()).toBe('or')
    remote.destroy()
    chart.doc.destroy()
  })
})
