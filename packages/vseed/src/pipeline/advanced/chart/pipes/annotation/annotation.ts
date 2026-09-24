import { pick } from 'remeda'
import type { AdvancedPipe, AdvancedVSeed } from 'src/types'
import { zAnnotationAreaRange } from 'src/types'
import { isPivotChart } from 'src/pipeline/utils/chatType'

const rangeChartTypes = new Set([
  'line',
  'area',
  'areaPercent',
  'column',
  'columnParallel',
  'columnPercent',
  'bar',
  'barParallel',
  'barPercent',
  'boxPlot',
  'histogram',
  'scatter',
])

export const annotation: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context
  const annotation = pick(vseed, [
    'annotationPoint',
    'annotationHorizontalLine',
    'annotationVerticalLine',
    'annotationArea',
    'annotationDifferenceLine',
  ]) as AdvancedVSeed['annotation']

  const areas = annotation.annotationArea
  const areaList = Array.isArray(areas) ? areas : areas ? [areas] : []
  areaList.forEach((area, index) => {
    const path = `annotationArea[${index}]`
    if (area.range === undefined) {
      if (area.selector === undefined || area.selector === null) {
        throw new Error(`${path}: selector or range is required`)
      }
      return
    }
    if (area.selector !== undefined) {
      throw new Error(`${path}: selector and range are mutually exclusive`)
    }
    const validation = zAnnotationAreaRange.safeParse(area.range)
    if (!validation.success) {
      const issues = validation.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('; ')
      throw new Error(`${path}.range: ${issues}`)
    }
    if (!rangeChartTypes.has(vseed.chartType)) {
      throw new Error(`${path}.range does not support chartType ${vseed.chartType}`)
    }
    if (isPivotChart(vseed)) {
      throw new Error(`${path}.range does not support pivot or combination charts`)
    }
  })

  return { ...advancedVSeed, annotation }
}
