import { z } from 'zod'
import { zBarStyle } from './zBarStyle'
import { zPointStyle } from './zPointStyle'
import { zLineStyle } from './zLineStyle'
import { zAreaStyle } from './zAreaStyle'
import { zBoxPlotStyle } from './zBoxPlotStyle'
import { zOutlierStyle } from './zOutlierStyle'

export const zMarkStyle = z.object({
  barStyle: zBarStyle.or(z.array(zBarStyle)).nullish(),
  pointStyle: zPointStyle.or(z.array(zPointStyle)).nullish(),
  lineStyle: zLineStyle.or(z.array(zLineStyle)).nullish(),
  areaStyle: zAreaStyle.or(z.array(zAreaStyle)).nullish(),
  boxPlotStyle: zBoxPlotStyle.or(z.array(zBoxPlotStyle)).nullish(),
  outlierStyle: zOutlierStyle.or(z.array(zOutlierStyle)).nullish(),
})
