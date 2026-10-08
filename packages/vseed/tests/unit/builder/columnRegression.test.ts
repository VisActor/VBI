import VChart from '@visactor/vchart'
import { Builder, registerAll } from 'src/builder'

beforeAll(registerAll)

test('column regression stays finite when the axis has no bandwidth yet', () => {
  const spec = {
    ...Builder.from({
      chartType: 'column',
      dataset: [10, 18, 12, 30].map((value, i) => ({ category: String(i), value })),
      dimensions: [{ id: 'category' }],
      measures: [{ id: 'value' }],
      animation: { enable: false },
      polynomialRegressionLine: { degree: 2, confidenceIntervalVisible: true, text: 'Trend' },
    }).build<any>(),
    width: 480,
    height: 240,
  }
  const element = document.createElement('div')
  document.body.append(element)
  const chart = new VChart(spec, { dom: element })
  try {
    chart.renderSync()
    const series = chart.getChart()!.getAllSeries()[0] as any
    const helper = series.getXAxisHelper()
    const bandwidth = helper.getBandwidth(0)
    const calculate = spec.extensionMark[0].style.data
    const result = calculate(null, { vchart: chart })
    expect(result.linePoints).toHaveLength(4)
    expect(result.areaPoints).toHaveLength(4)
    expect(result.linePoints.every(({ x, y }: any) => Number.isFinite(x) && Number.isFinite(y))).toBe(true)

    const getBandwidth = vi.spyOn(helper, 'getBandwidth').mockReturnValue(undefined)
    const withoutBandwidth = calculate(null, { vchart: chart })
    expect(withoutBandwidth.linePoints[0].x).toBeCloseTo(result.linePoints[0].x - bandwidth / 2)
    expect(withoutBandwidth.areaPoints.every(({ x, y, y1 }: any) => [x, y, y1].every(Number.isFinite))).toBe(true)
    getBandwidth.mockRestore()
  } finally {
    chart.release()
    element.remove()
  }
})
