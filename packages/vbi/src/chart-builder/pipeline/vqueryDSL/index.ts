import { pipe } from 'remeda'
import type { VQueryDSL } from '@visactor/vquery'
import type { VBIChartBuilderInterface, VBIChartDSL } from 'src/types'
import type { buildPipe } from './types'
import { buildSelect } from './buildSelect'
import { buildGroupBy } from './buildGroupBy'
import { buildWhere } from './buildWhere'
import { buildHaving } from './buildHaving'
import { buildOrderBy } from './buildOrderBy'
import { buildLimit } from './buildLimit'
import { buildDetailSelect } from './buildDetailSelect'
import { zVBIQueryMode } from 'src/types/chartDSL/queryMode'

export const buildVQuery = (vbiDSL: VBIChartDSL, builder: VBIChartBuilderInterface<any, any>) => {
  const queryMode = zVBIQueryMode.default('aggregate').parse(vbiDSL.queryMode)
  const wrapper = (processor: buildPipe) => {
    return (queryDSL: VQueryDSL): VQueryDSL => processor(queryDSL, { vbiDSL, builder })
  }

  if (queryMode === 'detail') {
    if (vbiDSL.chartType !== 'table') {
      throw new Error('Detail queries only support table charts')
    }
    if (vbiDSL.havingFilter.conditions.length > 0) {
      throw new Error('Detail queries do not support HAVING filters')
    }
    return pipe(
      {} as VQueryDSL,
      wrapper(buildDetailSelect),
      wrapper(buildWhere),
      wrapper(buildOrderBy),
      wrapper(buildLimit),
    )
  }

  return pipe(
    {} as VQueryDSL,
    wrapper(buildSelect),
    wrapper(buildGroupBy),
    wrapper(buildWhere),
    wrapper(buildHaving),
    wrapper(buildOrderBy),
    wrapper(buildLimit),
  )
}
