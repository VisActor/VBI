import type { VChartSpecPipe } from 'src/types'
import { colorLegend } from './colorLegend'
import type { Datum, IHeatmapChartSpec } from '@visactor/vchart'
import { DATUM_HIDE_KEY } from 'src/pipeline/utils/constant'

export const heatmapColorLegend: VChartSpecPipe = (spec, context) => {
  const result = colorLegend(spec, context) as IHeatmapChartSpec

  if (result.legends && (result.legends as any).visible !== false) {
    ;(result.legends as any).customFilter = (data: Datum[], range: number[], key: string) => {
      const min = Math.min(range[0], range[1])
      const max = Math.max(range[0], range[1])
      return (data ?? []).map((entry: Datum) => {
        const val = entry[key]
        const isHide = val - min < -1e-6 || val - max > 1e-6

        entry[DATUM_HIDE_KEY] = isHide

        return entry
      })
    }
  }

  return result
}
