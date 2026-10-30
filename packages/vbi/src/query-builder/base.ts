import type { BinsOptions, BinsResult, ProfileOptions, ProfileResult } from './types'
import { createProfileContext } from './profile/context'
import { queryProfile, queryBins } from './profile'
import type * as Y from 'yjs'
import type { ObserveCallback, ObserveDeepCallback } from 'src/types/builder/observe'
import { QueryDimensionsBuilder, type QueryDimensionsBuilderBase } from './features/dimensions/dim-builder'
import { QueryMeasuresBuilder, type QueryMeasuresBuilderBase } from './features/measures/mea-builder'
import { WhereFilterBuilder } from './features/whereFilter/where-builder'
import { HavingFilterBuilder } from './features/havingFilter/having-builder'
import { LimitBuilder } from './features/limit/limit-builder'
import { QueryModeBuilder } from './features/query-mode/query-mode-builder'
import { UndoManager } from './features/undo-manager/undo-manager'
import { getConnector } from './connector'
import { CalculationsBuilder } from './features/calculations/calculations-builder'
import { applyUpdateToDoc } from './modules/apply-update'
import { encodeDocStateAsUpdate } from './modules/encode-state-as-update'
import { ensureResourceUUID, getResourceUUID } from 'src/vbi/resource-uuid'

/** @description 查询构建器基座，管理字段、筛选及 Yjs 状态；上层可补充图形字段和构建适配。 */
export abstract class QueryBuilderBase<TDSL> {
  public doc: Y.Doc
  public dsl: Y.Map<any>
  public dimensions: QueryDimensionsBuilderBase
  public measures: QueryMeasuresBuilderBase
  public calculations: CalculationsBuilder
  public whereFilter: WhereFilterBuilder
  public havingFilter: HavingFilterBuilder
  public limit: LimitBuilder
  public queryMode: QueryModeBuilder
  /** @description 本地事务的撤销历史，每个事务独立成一步；doc.transact 可合并多项编辑。 */
  public undoManager: UndoManager

  constructor(
    doc: Y.Doc,
    dsl?: Y.Map<any>,
    private resolveConnector: typeof getConnector = getConnector,
  ) {
    this.doc = doc
    this.dsl = dsl ?? doc.getMap('dsl')
    doc.transact(() => ensureResourceUUID(this.dsl))
    this.dimensions = this.createDimensions()
    this.measures = this.createMeasures()
    this.calculations = new CalculationsBuilder(doc, this.dsl)
    this.whereFilter = new WhereFilterBuilder(doc, this.dsl)
    this.havingFilter = new HavingFilterBuilder(doc, this.dsl)
    this.limit = new LimitBuilder(doc, this.dsl)
    this.queryMode = new QueryModeBuilder(this.dsl)
    this.undoManager = new UndoManager(this.dsl, { captureTimeout: 0 })
  }

  public applyUpdate = (update: Uint8Array, transactionOrigin?: any) =>
    applyUpdateToDoc(this.doc, update, transactionOrigin)
  public encodeStateAsUpdate = (targetStateVector?: Uint8Array) => encodeDocStateAsUpdate(this.doc, targetStateVector)
  public getUUID = (): string => getResourceUUID(this.dsl)
  /** @description 发现当前数据连接的字段结构。 */
  public getSchema = async () => {
    const { resolveConnector } = this
    return (await resolveConnector(this.dsl.get('connectorId'))).discoverSchema()
  }
  public abstract build: () => TDSL
  public abstract buildVQuery: () => unknown

  /** @description 通过 Query DSL 统计当前查询结果，不写入协同状态或撤销历史。 */
  public queryProfile = async (options: ProfileOptions = {}): Promise<ProfileResult> => {
    options.signal?.throwIfAborted()
    const snapshot = { ...options, columns: options.columns?.slice(), bins: options.bins && { ...options.bins } }
    const connectorId = this.dsl.get('connectorId')
    const context = await createProfileContext(this.buildVQuery(), connectorId, this.resolveConnector, snapshot.signal)
    const result = await queryProfile(context, snapshot)
    snapshot.signal?.throwIfAborted()
    return result
  }

  /** @description 独立查询数值分箱；计数由数据源聚合，不读取明细记录。 */
  public queryBins = async (options: BinsOptions = {}): Promise<BinsResult> => {
    options.signal?.throwIfAborted()
    const snapshot = { ...options, columns: options.columns?.slice() }
    const connectorId = this.dsl.get('connectorId')
    const context = await createProfileContext(this.buildVQuery(), connectorId, this.resolveConnector, snapshot.signal)
    const result = await queryBins(context, snapshot)
    snapshot.signal?.throwIfAborted()
    return result
  }

  /** @description 订阅 DSL 顶层字段变化，不包含嵌套修改，也不触发首次通知。 */
  public observe(callback: ObserveCallback): void {
    this.dsl.observe(callback)
  }
  /** @description 取消顶层订阅，传入注册时的同一回调。 */
  public unobserve(callback: ObserveCallback): void {
    this.dsl.unobserve(callback)
  }
  /** @description 订阅全部 DSL 变化，同一事务通知一次，不包含执行结果或运行时实例。 */
  public observeDeep(callback: ObserveDeepCallback): void {
    this.dsl.observeDeep(callback)
  }
  /** @description 取消深层订阅，传入注册时的同一回调。 */
  public unobserveDeep(callback: ObserveDeepCallback): void {
    this.dsl.unobserveDeep(callback)
  }
  public isEmpty = (): boolean => this.dimensions.findAll().length === 0 && this.measures.findAll().length === 0

  protected createDimensions(): QueryDimensionsBuilderBase {
    return new QueryDimensionsBuilder(this.doc, this.dsl)
  }
  protected createMeasures(): QueryMeasuresBuilderBase {
    return new QueryMeasuresBuilder(this.doc, this.dsl)
  }
}
