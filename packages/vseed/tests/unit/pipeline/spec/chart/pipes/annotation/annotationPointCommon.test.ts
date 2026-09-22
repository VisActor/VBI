import { describe, expect, test } from 'vitest'
import { generateAnnotationPointPipe } from 'src/pipeline/spec/chart/pipes/annotation/annotationPointCommon'
import type { SpecPipelineContext } from 'src/types'

const context = (annotationPoint: Record<string, unknown>): SpecPipelineContext =>
  ({
    vseed: { chartType: 'bar' },
    advancedVSeed: {
      chartType: 'bar',
      dataset: [{ region: 'east', sales: 8 }],
      annotation: { annotationPoint },
      config: {},
    },
  }) as SpecPipelineContext

describe('annotation point defaults', () => {
  test('renders a horizontal annotation without a theme and resolves stacked coordinates', () => {
    const pipe = generateAnnotationPointPipe({})
    const result = pipe({} as any, context({ selector: { region: 'east' } })) as any
    expect(result.markPoint).toHaveLength(1)
    const mark = result.markPoint[0]
    expect(mark.itemContent).toMatchObject({
      offsetX: 0,
      offsetY: 0,
      text: {
        text: '',
        labelBackground: {
          visible: true,
          padding: 2,
          style: { fill: '#212121', opacity: 0.95, cornerRadius: 4, lineWidth: 1 },
        },
      },
      style: { textAlign: 'right', textBaseline: 'middle', fontSize: 12, fontWeight: 400, dx: -22, dy: 0 },
    })
    expect(
      mark.coordinate([{ region: 'east', sales: 8, __VCHART_STACK_END: 20 }], {
        getStack: () => true,
        getStackValueField: () => 'stackedSales',
      }),
    ).toMatchObject({ region: 'east', sales: 8, stackedSales: 20 })
  })

  test('does not emit marks without a selector or when a custom generator skips the selected point', () => {
    expect((generateAnnotationPointPipe({})({} as any, context({ text: 'No selection' })) as any).markPoint).toEqual([])
    const pipe = generateAnnotationPointPipe({ generateMarkPoint: () => undefined })
    expect((pipe({} as any, context({ selector: { region: 'east' } })) as any).markPoint).toEqual([])
  })
})
