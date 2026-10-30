import type * as Y from 'yjs'
import type { VBIChartDSL } from 'src/types'
import { buildQueryDocument } from 'src/query-builder/modules/build'

export const buildVBIChartDSL = (dsl: Y.Map<any>): VBIChartDSL => {
  return buildQueryDocument(dsl)
}
