import { beforeAll, describe, expect, test } from 'vitest'
import { Builder, registerAll } from 'src/builder'
import standard from '../../integrations/heatmap/chartType/standard.json'
import pivot from '../../integrations/heatmap/pivotGrid/pivotBasic.json'
import type { VSeed } from 'src/types'

beforeAll(registerAll)

describe('heatmap hover', () => {
  test.each(['light', 'dark'])('%s heatmaps retain tooltips and borders without a hover shadow state', (theme) => {
    const spec = Builder.from({ ...standard.vseed, theme } as VSeed).build<any>()

    // A cell hover state starts VRender's size-array recovery animation on pointer leave.
    expect(spec.cell.state).toBeUndefined()
    expect(spec.cell.style).toMatchObject({ shape: 'rect', lineWidth: 1 })
    expect(spec.cell.style.stroke).toBe(theme === 'light' ? '#fff' : '#404349')
    expect(spec.cell.style.fill).toMatchObject({ scale: 'color' })
    expect(spec.tooltip.visible).not.toBe(false)
  })

  test.each(['light', 'dark'])('%s pivot heatmaps also omit hover shadow states', (theme) => {
    const spec = Builder.from({ ...pivot.vseed, theme } as VSeed).build<any>()

    expect(spec.indicators.length).toBeGreaterThan(0)
    for (const indicator of spec.indicators) {
      expect(indicator.chartSpec.cell.state).toBeUndefined()
      expect(indicator.chartSpec.cell.style.shape).toBe('rect')
    }
  })
})
