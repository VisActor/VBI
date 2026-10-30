import type * as Y from 'yjs'
import type { VBIChartDSLInput } from 'src/types'

export const setBaseDSLFields = (dsl: Y.Map<any>, vbi: VBIChartDSLInput) => {
  if (vbi.uuid !== undefined) dsl.set('uuid', vbi.uuid)
  if (vbi.connectorId !== undefined) dsl.set('connectorId', vbi.connectorId)
  if (vbi.chartType !== undefined) dsl.set('chartType', vbi.chartType)
  if (vbi.theme !== undefined) dsl.set('theme', vbi.theme)
  if (vbi.limit !== undefined) dsl.set('limit', vbi.limit)
  if (vbi.queryMode !== undefined) dsl.set('queryMode', vbi.queryMode)
  if (vbi.locale !== undefined) dsl.set('locale', vbi.locale)
  if (vbi.version !== undefined) dsl.set('version', vbi.version)
}
