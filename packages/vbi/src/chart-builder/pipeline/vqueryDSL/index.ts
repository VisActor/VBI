import type { VBIChartBuilderInterface, VBIChartDSL } from 'src/types'
import { buildQueryDSL } from 'src/query-builder/pipeline'
import { queryFromChart } from '../query-from-chart'

export const buildVQuery = (vbiDSL: VBIChartDSL, _builder: VBIChartBuilderInterface<any, any>) => {
  if (vbiDSL.queryMode === 'detail' && vbiDSL.chartType !== 'table') {
    throw new Error('Detail queries only support table charts')
  }
  return buildQueryDSL(queryFromChart(vbiDSL))
}
