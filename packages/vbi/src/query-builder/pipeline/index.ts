import { pipe } from 'remeda'
import type { VQueryDSL } from '@visactor/vquery'
import type { VBIQueryDSL } from 'src/types/queryDSL'
import type { buildPipe } from './types'
import { buildSelect } from './buildSelect'
import { buildGroupBy } from './buildGroupBy'
import { buildWhere } from './buildWhere'
import { buildHaving } from './buildHaving'
import { buildOrderBy } from './buildOrderBy'
import { buildLimit } from './buildLimit'
import { buildDetailSelect } from './buildDetailSelect'
import { buildCalculations } from './buildCalculations'
import { zVBIQueryMode } from 'src/types/queryDSL/queryMode'

export const buildQueryDSL = (vbiDSL: VBIQueryDSL) => {
  const queryMode = zVBIQueryMode.default('aggregate').parse(vbiDSL.queryMode)
  const wrapper = (processor: buildPipe) => {
    return (queryDSL: VQueryDSL): VQueryDSL => processor(queryDSL, { vbiDSL })
  }

  if (queryMode === 'detail') {
    if (vbiDSL.havingFilter.conditions.length > 0) {
      throw new Error('Detail queries do not support HAVING filters')
    }
    return pipe(
      {} as VQueryDSL,
      wrapper(buildDetailSelect),
      wrapper(buildWhere),
      wrapper(buildCalculations),
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
    wrapper(buildCalculations),
    wrapper(buildOrderBy),
    wrapper(buildLimit),
  )
}
