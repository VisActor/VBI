import { rs } from '@rstest/core'
import { createVBI } from '@visactor/vbi'

for (const kind of ['whereFilter', 'havingFilter'] as const) {
  describe(`${kind} nested edits`, () => {
    it('updates nested groups and leaves while preserving root logic and subscription boundaries', () => {
      const vbi = createVBI()
      const chart = vbi.chart.create(vbi.chart.createEmpty('filter-workflow'))
      const filter = chart[kind]
      filter.setOperator('or')
      filter.add('sales', (n) => n.setOperator('gt').setValue(10))
      filter.addGroup('and', (group) => {
        expect(group.getOperator()).toBe('and')
        group.setOperator('or').addGroup('and', (nested) => {
          nested.add('sales', (n) => n.setOperator('lt').setValue(5))
        })
      })
      const [leaf, group] = filter.toJSON().conditions
      const changed = rs.fn()
      const stop = filter.observe(changed)
      expect(
        filter.update(leaf.id, (n) => {
          expect(n.getId()).toBe(leaf.id)
          expect(n.getField()).toBe('sales')
          expect(n.getOperator()).toBe('gt')
          n.setValue(20)
        }),
      ).toBe(filter)
      expect(changed).toHaveBeenCalled()
      const groupNode = filter.find((entry) => entry.getId() === group.id)!
      expect(groupNode.getId()).toBe(group.id)
      expect(filter.updateGroup(group.id, (g) => g.setOperator('and'))).toBe(filter)
      expect(filter.toJSON().op).toBe('or')
      expect(chart.buildVQuery()[kind === 'whereFilter' ? 'where' : 'having']).toMatchObject({
        op: 'or',
        conditions: [expect.anything(), { op: 'and', conditions: [{ op: 'and' }] }],
      })
      expect(() => filter.update(group.id, () => {})).toThrow('not a filter')
      expect(() => filter.updateGroup(leaf.id, () => {})).toThrow('not a group')
      expect(() => filter.update('missing', () => {})).toThrow('not found')
      expect(() => filter.updateGroup('missing', () => {})).toThrow('not found')
      stop()
      const count = changed.mock.calls.length
      filter.remove(leaf.id).remove('missing')
      filter.remove(-1).remove(99).remove(0)
      expect(filter.toJSON().conditions).toEqual([])
      filter.add('sales', (n) => n.setOperator('eq').setValue(1))
      expect(filter.clear()).toBe(filter)
      expect(filter.toJSON().conditions).toEqual([])
      expect(changed.mock.calls.length).toBe(count)
      chart.doc.destroy()
    })
  })
}

it('keeps aggregate selection and source-field edits on their owning filter nodes', () => {
  const vbi = createVBI()
  const chart = vbi.chart.create(vbi.chart.createEmpty('filter-workflow'))
  chart.havingFilter.add('sales', (n) => {
    n.setAggregate({ func: 'avg' })
    expect(n.getAggregate()).toEqual({ func: 'avg' })
  })
  chart.whereFilter.add('date', (n) => {
    expect(n.getDate()).toBeUndefined()
    n.setField('order_date').setDate({ type: 'period', unit: 'year', year: 2026 })
    expect(n.getField()).toBe('order_date')
    expect(n.getDate()).toEqual({ type: 'period', unit: 'year', year: 2026 })
  })
  expect(chart.buildVQuery()).toMatchObject({
    where: {
      conditions: [
        { field: 'order_date', op: '>=', value: '2026-01-01' },
        { field: 'order_date', op: '<', value: '2027-01-01' },
      ],
    },
  })
  chart.doc.destroy()
})

it('maps array membership and open/closed outside bounds without changing saved predicates', () => {
  const vbi = createVBI()
  const chart = vbi.chart.create(vbi.chart.createEmpty('filters'))
  for (const filter of [chart.whereFilter, chart.havingFilter]) {
    filter.add('sales', (n) => n.setOperator('=').setValue([1, 2]))
    filter.add('sales', (n) => n.setOperator('!=').setValue([3, 4]))
    filter.add('sales', (n) => n.setOperator('in').setValue([5]))
  }
  chart.whereFilter.add('sales', (n) =>
    n.setOperator('not between').setValue({ min: 1, max: 5, leftOp: '<', rightOp: '<' }),
  )
  chart.whereFilter.add('sales', (n) => n.setOperator('not between').setValue({ min: 1, max: 5 }))
  const query = chart.buildVQuery()
  for (const group of [query.where, query.having]) {
    expect(group).toMatchObject({
      conditions: [
        { op: 'in', value: [1, 2] },
        { op: 'not in', value: [3, 4] },
        { op: 'in', value: [5] },
        ...(group === query.where
          ? [
              {
                op: 'or',
                conditions: [
                  { op: '<=', value: 1 },
                  { op: '>=', value: 5 },
                ],
              },
              {
                op: 'or',
                conditions: [
                  { op: '<', value: 1 },
                  { op: '>', value: 5 },
                ],
              },
            ]
          : []),
      ],
    })
  }
  expect(chart.whereFilter.toJSON().conditions[0]).toMatchObject({ op: '=', value: [1, 2] })
  chart.doc.destroy()
})
