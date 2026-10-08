import type { VChartSpecPipe } from 'src/types'
import { discreteLegend } from './discreteLegend'

export const boxLegend: VChartSpecPipe = (spec, context) => {
  const normalLegend = discreteLegend(spec, context) as any
  if (normalLegend.legends?.visible === false) return normalLegend

  normalLegend.legends = {
    ...normalLegend.legends,
    data: (data: any[]) => {
      return data.map((obj) => {
        obj.shape.fill = obj.shape.stroke
        return obj
      })
    },
  }
  return normalLegend
}
