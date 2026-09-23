import type * as Y from 'yjs'

import { resolveVBIChartBuilderAdapters } from 'src/chart-builder/adapters/vquery-vseed'
import type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from 'src/chart-builder/adapters/vquery-vseed'
import {
  DimensionsBuilder,
  MeasuresBuilder,
  HavingFilterBuilder,
  WhereFilterBuilder,
  ChartTypeBuilder,
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

  public isEmpty = (): boolean => isEmptyVBIChartDSL(this.dsl)

  public getSchema = async () => getBuilderSchema(this.dsl)
}
