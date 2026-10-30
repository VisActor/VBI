import * as Y from 'yjs'
import type { VQueryDSL } from '@visactor/vquery'
import { VBIQueryBuilder } from 'src/query-builder/builder'
import type { VBIQueryBuilderOptions } from 'src/query-builder/types'
import { zVBIQueryDSL, type VBIQueryDSLInput } from 'src/types/queryDSL'
import { ensureWhereGroup } from '../normalize/ensure-where-group'
import { ensureHavingGroup } from '../normalize/ensure-having-group'
import { ensureYArray } from '../normalize/ensure-y-array'

/** @description JSON 创建独立文档，Y.Doc 绑定已恢复的协同状态。初始化不进入撤销历史。 */
export const createQuery = <TQueryDSL = VQueryDSL>(
  input: VBIQueryDSLInput | Y.Doc,
  options?: VBIQueryBuilderOptions<TQueryDSL>,
): VBIQueryBuilder<TQueryDSL> => {
  if (input instanceof Y.Doc) {
    return new VBIQueryBuilder(input, options)
  }
  const query = zVBIQueryDSL.parse(input)
  const doc = new Y.Doc()
  const dsl = doc.getMap('dsl')
  doc.transact(() => {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) dsl.set(key, value)
    }
    dsl.set('dimensions', ensureYArray(query.dimensions, 'field'))
    dsl.set('measures', ensureYArray(query.measures, 'field'))
    if (query.calculations) dsl.set('calculations', ensureYArray(query.calculations))
    dsl.set('whereFilter', ensureWhereGroup(query.whereFilter))
    dsl.set('havingFilter', ensureHavingGroup(query.havingFilter))
  })
  return new VBIQueryBuilder(doc, options)
}
