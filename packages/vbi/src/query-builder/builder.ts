import type * as Y from 'yjs'
import type { VQueryDSL } from '@visactor/vquery'
import type { VBIQueryDSL } from 'src/types/queryDSL'
import type { VBIQueryResult } from 'src/types/connector/query'
import type { QueryOptions } from 'src/types/builder/query'
import { QueryBuilderBase } from './base'
import { validateQueryDocument } from './modules/validate-document'
import { buildQueryDocument } from './modules/build'
import { validateCalculations } from './modules/validate-calculations'
import { resolveVBIQueryBuilderAdapters } from './adapters'
import type { VBIQueryBuilderAdapters, VBIQueryBuilderOptions } from './types'

/** @description 独立查询构建器，管理可协同的查询配置，不依赖图表或 VSeed。 */
export class VBIQueryBuilder<TQueryDSL = VQueryDSL> extends QueryBuilderBase<VBIQueryDSL> {
  public adapters: VBIQueryBuilderAdapters<TQueryDSL>

  constructor(doc: Y.Doc, options?: VBIQueryBuilderOptions<TQueryDSL>) {
    validateQueryDocument(doc.getMap('dsl'))
    super(doc, undefined, options?.resolveConnector)
    this.adapters = resolveVBIQueryBuilderAdapters(options)
  }

  public build = (): VBIQueryDSL => buildQueryDocument(this.dsl)

  /** @description 编译当前查询配置，不执行取数。 */
  public buildVQuery = (): TQueryDSL =>
    this.adapters.buildVQuery({ dsl: this.dsl, vbiDSL: this.build(), builder: this })

  /** @description 固定当前查询快照并执行；取数前校验计算表达式，非法时抛错。独立调用不缓存，不写入协同状态。 */
  public query = async (options: QueryOptions = {}): Promise<VBIQueryResult> => {
    const queryOptions = { ...options }
    queryOptions.signal?.throwIfAborted()
    const context = { dsl: this.dsl, vbiDSL: this.build(), builder: this }
    const queryDSL = this.adapters.buildVQuery(context)
    await validateCalculations(context.vbiDSL.calculations)
    queryOptions.signal?.throwIfAborted()
    const result = await this.adapters.query({ ...context, queryDSL, options: queryOptions })
    queryOptions.signal?.throwIfAborted()
    return result
  }
}
