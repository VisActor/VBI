import { beforeAll, describe, expect, test } from 'vitest'
import type { ICommonChartSpec, ILineChartSpec } from '@visactor/vchart'
import { Builder } from 'src/builder'
import { registerAll } from 'src/builder/register/all'
import type { VSeed } from 'src/types'

const dataset = [
  { month: 'July', region: 'East', sales: 62, profit: 12 },
  { month: 'August', region: 'East', sales: 82, profit: 22 },
  { month: 'September', region: 'West', sales: 84, profit: 24 },
]

const pointStyle = { pointVisible: false, pointSize: 8, pointColor: '#f54e4e' }

const chartSpec = (vseed: VSeed, pivot: boolean) => {
  const spec = Builder.from(vseed).build()
  return pivot
    ? (spec as { indicators: { chartSpec: ILineChartSpec }[] }).indicators[0].chartSpec
    : (spec as ILineChartSpec)
}

const expectHoverPoints = (spec: ILineChartSpec) => {
  expect(spec.activePoint).toBe(true)
  expect(spec.point?.style).toMatchObject({ size: 8, fill: '#f54e4e' })
  expect(spec.point?.state).toMatchObject({
    dimension_hover: { scaleX: 1.4, scaleY: 1.4 },
  })
}

describe('dimension-hover points', () => {
  beforeAll(registerAll)

  describe.each([false, true])('pivot = %s', (pivot) => {
    test.each(['line', 'area', 'areaPercent', 'radar'] as const)(
      '%s keeps ordinary points hidden and enables dimension-hover points',
      (chartType) => {
        const spec = chartSpec(
          {
            chartType,
            dataset,
            dimensions: [{ id: 'month' }, ...(pivot ? [{ id: 'region', encoding: 'row' as const }] : [])],
            measures: [{ id: 'sales' }],
            pointStyle,
          },
          pivot,
        )

        expectHoverPoints(spec)
        expect(spec.point?.visible).toBe(false)
        expect(spec.point?.style).not.toHaveProperty('visible')
      },
    )

    test.each(['line', 'area'] as const)('dualAxis enables hover points only on the %s series', (chartType) => {
      const spec = chartSpec(
        {
          chartType: 'dualAxis',
          dataset,
          dimensions: [{ id: 'month' }, ...(pivot ? [{ id: 'region', encoding: 'row' as const }] : [])],
          measures: [
            { id: 'sales', encoding: 'primaryYAxis', chartType: 'column' },
            { id: 'profit', encoding: 'secondaryYAxis', chartType },
          ],
          pointStyle,
        },
        pivot,
      ) as unknown as ICommonChartSpec
      const series = spec.series as ILineChartSpec[]

      expect(series).toHaveLength(2)
      expect(series[0].activePoint).toBeUndefined()
      expectHoverPoints(series[1])
    })
  })

  test('preserves conditional point visibility and styling', () => {
    const spec = chartSpec(
      {
        chartType: 'line',
        dataset,
        dimensions: [{ id: 'month' }],
        measures: [{ id: 'sales' }],
        pointStyle: [pointStyle, { selector: { month: 'September' }, pointVisible: true, pointSize: 12 }],
      },
      false,
    )

    expectHoverPoints(spec)
    expect(spec.point?.visible).not.toBe(false)
    expect(spec.point?.style?.visible).toBe(false)
    expect(spec.point?.state?.custom2).toMatchObject({ style: { visible: true, size: 12 } })
  })

  test('does not enable dimension-hover points on scatter charts', () => {
    const spec = Builder.from({ chartType: 'scatter', dataset, pointStyle }).build()
    expect(spec).not.toHaveProperty('activePoint')
  })
})
