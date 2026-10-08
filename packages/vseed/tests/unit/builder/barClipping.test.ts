import VChart from '@visactor/vchart'
import { Builder, registerAll } from 'src/builder'
import type { VSeed } from 'src/types'
import columnCase from '../../integrations/columnParallel/markStyle/selectorBarDimensionCondition.json'
import barCase from '../../integrations/barParallel/markStyle/barStyleMeasureCondition.json'
import dualAxisCase from '../../integrations/dualAxis/combination/columnParallelLine.json'

beforeAll(registerAll)

test.each([columnCase, barCase, dualAxisCase])('$name explicitly clips strokes to the requested group outline', (fixture) => {
  const spec = Builder.from({ ...fixture.vseed, cornerRadius: 4, stackCornerRadius: true } as VSeed).build<any>()
  const element = document.createElement('div')
  document.body.append(element)
  const chart = new VChart({ ...spec, width: 500, height: 500 }, { dom: element, animation: false })
  try {
    chart.renderSync()
    for (const series of chart.getChart()!.getAllSeries()) {
      const mark = series.getMarkInName('bar')
      if (!mark) continue
      const config = mark.getMarkConfig() as any
      expect(config.clip).toBe(true)
      const rectangles = config.clipPath()
      const data = series.getViewData()!.latestData
      expect(rectangles).toHaveLength(data.length)
      const channels =
        series.getSpec().direction === 'horizontal' ? ['x', 'x1', 'y', 'height'] : ['x', 'y', 'y1', 'width']
      rectangles.forEach((rectangle: any, index: number) => {
        for (const channel of channels) {
          expect(rectangle.attribute[channel]).toBeCloseTo(mark.getAttribute(channel, data[index]) as number)
        }
      })
    }
  } finally {
    chart.release()
    element.remove()
  }
})
