import type * as Y from 'yjs'

import { resolveVBIChartBuilderAdapters } from 'src/chart-builder/adapters/vquery-vseed'
import type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from 'src/chart-builder/adapters/vquery-vseed'
import {
  DimensionsBuilder,
  MeasuresBuilder,
  HavingFilterBuilder,
  WhereFilterBuilder,
  ChartTypeBuilder,
  ChartInstanceBuilder,
  ThemeBuilder,
  LocaleBuilder,
  LimitBuilder,
  UndoManager,
} from './features'

import type {
  BuildVSeedOptions,
  VBIChartDSL,
  VBIChartBuilderAdapters,
  VBIChartBuilderInterface,
  VBIChartBuilderOptions,
  ObserveCallback,
  ObserveDeepCallback,
} from 'src/types'
import {
  applyUpdateToDoc,
  encodeDocStateAsUpdate,
  buildVBIChartDSL,
  isEmptyVBIChartDSL,
  getBuilderSchema,
} from './modules'
import { ensureResourceUUID, getResourceUUID } from 'src/vbi/resource-uuid'

export class VBIChartBuilder<
  TQueryDSL = DefaultVBIQueryDSL,
  TSeedDSL = DefaultVBISeedDSL,
> implements VBIChartBuilderInterface<TQueryDSL, TSeedDSL> {
  public doc: Y.Doc
  public dsl: Y.Map<any>
  public adapters: VBIChartBuilderAdapters<TQueryDSL, TSeedDSL>

  public chartType: ChartTypeBuilder
  /** @description 图表运行时实例的绑定、获取与原生事件代理。 */
  public instance: ChartInstanceBuilder
  public measures: MeasuresBuilder
  public dimensions: DimensionsBuilder
  public havingFilter: HavingFilterBuilder
  public whereFilter: WhereFilterBuilder
  public theme: ThemeBuilder
  public locale: LocaleBuilder
  public limit: LimitBuilder
  /** @description 图表撤销历史，每个 Yjs 事务独立成一步；连续 add / update 不按时间合并，doc.transact 可显式合并多个修改。 */
  public undoManager: UndoManager

  constructor(doc: Y.Doc, options?: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>, dsl?: Y.Map<any>) {
    this.doc = doc
    this.dsl = (dsl ?? doc.getMap('dsl')) as Y.Map<any>
    this.adapters = resolveVBIChartBuilderAdapters(options?.adapters)

    doc.transact(() => {
      ensureResourceUUID(this.dsl)
    })

    this.undoManager = new UndoManager(this.dsl, { captureTimeout: 0 })
    this.chartType = new ChartTypeBuilder(doc, this.dsl)
    this.instance = new ChartInstanceBuilder(doc, this.chartType)
    this.measures = new MeasuresBuilder(doc, this.dsl)
    this.dimensions = new DimensionsBuilder(doc, this.dsl)
    this.havingFilter = new HavingFilterBuilder(doc, this.dsl)
    this.whereFilter = new WhereFilterBuilder(doc, this.dsl)
    this.theme = new ThemeBuilder(doc, this.dsl)
    this.locale = new LocaleBuilder(doc, this.dsl)
    this.limit = new LimitBuilder(doc, this.dsl)
  }

  public applyUpdate = (update: Uint8Array, transactionOrigin?: any) => {
    return applyUpdateToDoc(this.doc, update, transactionOrigin)
  }

  public encodeStateAsUpdate = (targetStateVector?: Uint8Array) => {
    return encodeDocStateAsUpdate(this.doc, targetStateVector)
  }

  public getUUID = (): string => getResourceUUID(this.dsl)

  public buildVSeed = async (options: BuildVSeedOptions = {}): Promise<TSeedDSL> => {
    const vbiDSL = this.build()
    const queryDSL = this.adapters.buildVQuery({
      dsl: this.dsl,
      vbiDSL,
      builder: this,
    })
    return this.adapters.buildVSeed({
      dsl: this.dsl,
      vbiDSL,
      queryDSL,
      options,
      builder: this,
    })
  }

  public buildVQuery = (): TQueryDSL => {
    const vbiDSL = this.build()
    return this.adapters.buildVQuery({
      dsl: this.dsl,
      vbiDSL,
      builder: this,
    })
  }

  public build = (): VBIChartDSL => buildVBIChartDSL(this.dsl)

  /** @description 订阅图表 DSL 顶层字段变化，与 dsl.observe 语义一致；不包含嵌套字段修改，也不触发首次渲染。 */
  public observe(callback: ObserveCallback): void {
    this.dsl.observe(callback)
  }

  /** @description 取消指定的图表 DSL 顶层订阅，传入 observe 时使用的同一回调。 */
  public unobserve(callback: ObserveCallback): void {
    this.dsl.unobserve(callback)
  }

  /** @description 订阅整个图表 DSL 的深层变化，包括嵌套筛选、字段、本地编辑、撤销重做及协同更新；同一事务通知一次，不包含运行时实例变化，也不触发首次渲染。 */
  public observeDeep(callback: ObserveDeepCallback): void {
    this.dsl.observeDeep(callback)
  }

  /** @description 取消指定的图表 DSL 深层订阅，传入 observeDeep 时使用的同一回调。 */
  public unobserveDeep(callback: ObserveDeepCallback): void {
    this.dsl.unobserveDeep(callback)
  }

  public isEmpty = (): boolean => isEmptyVBIChartDSL(this.dsl)

  public getSchema = async () => getBuilderSchema(this.dsl)
}
