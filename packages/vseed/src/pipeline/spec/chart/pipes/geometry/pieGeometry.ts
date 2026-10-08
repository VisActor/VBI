import { pick } from 'remeda'
import type { PieGeometry, VChartSpecPipe } from 'src/types'

export const pieGeometry: VChartSpecPipe = (spec, { advancedVSeed }) => ({
  ...spec,
  ...pick(advancedVSeed.config[advancedVSeed.chartType] as PieGeometry, [
    'outerRadius',
    'innerRadius',
    'startAngle',
    'endAngle',
  ]),
})
