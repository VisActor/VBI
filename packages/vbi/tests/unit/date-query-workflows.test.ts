import { rs } from '@rstest/core'
import { createVBI } from '@visactor/vbi'
import type { VBIWhereDatePredicate } from '@visactor/vbi'
import { resolveDatePredicate } from 'src/chart-builder/pipeline/vqueryDSL/resolveDatePredicate'

const now = new Date('2026-10-28T12:00:00Z')
const cases: Array<[VBIWhereDatePredicate, string, string]> = [
  [{ type: 'range', start: '2026-01-01', end: '2026-02-01' }, '2026-01-01', '2026-02-01'],
  [{ type: 'period', unit: 'year', year: 2026 }, '2026-01-01', '2027-01-01'],
  [{ type: 'period', unit: 'quarter', year: 2026, quarter: 4 }, '2026-10-01', '2027-01-01'],
  [{ type: 'period', unit: 'month', year: 2024, month: 2 }, '2024-02-01', '2024-03-01'],
  [{ type: 'period', unit: 'week', year: 2026, week: 1 }, '2025-12-29', '2026-01-05'],
  [{ type: 'period', unit: 'day', date: '2024-02-29' }, '2024-02-29', '2024-03-01'],
  [{ type: 'current', unit: 'year' }, '2026-01-01', '2027-01-01'],
  [{ type: 'current', unit: 'quarter' }, '2026-10-01', '2027-01-01'],
  [{ type: 'current', unit: 'month', offset: -1 }, '2026-09-01', '2026-10-01'],
  [{ type: 'current', unit: 'week' }, '2026-10-26', '2026-11-02'],
  [{ type: 'current', unit: 'day', offset: 1 }, '2026-10-29', '2026-10-30'],
  [{ type: 'relative', unit: 'year', amount: 1, mode: 'last' }, '2025-10-28', '2026-10-28'],
  [{ type: 'relative', unit: 'quarter', amount: 1, mode: 'last' }, '2026-07-28', '2026-10-28'],
  [{ type: 'relative', unit: 'month', amount: 1, mode: 'last' }, '2026-09-28', '2026-10-28'],
  [{ type: 'relative', unit: 'week', amount: 1, mode: 'next' }, '2026-10-28', '2026-11-04'],
  [{ type: 'relative', unit: 'day', amount: 2, mode: 'last' }, '2026-10-26', '2026-10-28'],
]

describe('date query boundaries', () => {
  for (const [predicate, start, end] of cases) {
    it(`resolves ${JSON.stringify(predicate)} as a half-open UTC interval`, () => {
      expect(resolveDatePredicate(predicate, now)).toEqual({ start, end, bounds: '[)' })
    })
  }

  it('uses the current clock only when no explicit clock is supplied', () => {
    rs.useFakeTimers({ toFake: ['Date'] })
    rs.setSystemTime(now)
    try {
      expect(resolveDatePredicate({ type: 'current', unit: 'day' })).toEqual({
        start: '2026-10-28',
        end: '2026-10-29',
        bounds: '[)',
      })
      expect(resolveDatePredicate({ type: 'relative', unit: 'day', amount: 1, mode: 'last' })).toEqual({
        start: '2026-10-27',
        end: '2026-10-28',
        bounds: '[)',
      })
    } finally {
      rs.useRealTimers()
    }
  })

  it('builds explicit closed and open date ranges inside a root OR group', () => {
    const vbi = createVBI()
    const chart = vbi.chart.create(vbi.chart.createEmpty('dates'))
    chart.whereFilter.setOperator('or').add('date', (n) =>
      n.setDate({
        type: 'range',
        start: new Date('2026-01-01Z'),
        end: new Date('2026-01-31Z'),
        bounds: '[]',
      }),
    )
    chart.whereFilter.add('date', (n) => n.setDate({ type: 'period', unit: 'day', date: new Date('2026-02-01Z') }))
    expect(chart.buildVQuery()).toMatchObject({
      where: {
        op: 'or',
        conditions: [
          { field: 'date', op: '>=', value: '2026-01-01' },
          { field: 'date', op: '<=', value: '2026-01-31' },
          { field: 'date', op: '>=', value: '2026-02-01' },
          { field: 'date', op: '<', value: '2026-02-02' },
        ],
      },
    })
    chart.doc.destroy()
  })
})
