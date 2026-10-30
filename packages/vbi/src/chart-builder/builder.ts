import type * as Y from 'yjs'
import { QueryBuilderBase } from 'src/query-builder/base'
import { validateCalculations } from 'src/query-builder/modules/validate-calculations'

import { resolveVBIChartBuilderAdapters } from 'src/chart-builder/adapters/vquery-vseed'
import type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from 'src/chart-builder/adapters/vquery-vseed'
import {
  DimensionsBuilder,
  MeasuresBuilder,
  ChartTypeBuilder,
  ChartInstanceBuilder,
  ThemeBuilder,
  LocaleBuilder,
} from './features'

import type {
  BuildVSeedOptions,
  QueryOptions,
  VBIQueryResult,
  VBIChartDSL,
  VBIChartBuilderAdapters,
  VBIChartBuilderInterface,
  VBIChartBuilderOptions,
} from 'src/types'
import { buildVBIChartDSL, isEmptyVBIChartDSL } from './modules'

export class VBIChartBuilder<TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL>
  extends QueryBuilderBase<VBIChartDSL>
  implements VBIChartBuilderInterface<TQueryDSL, TSeedDSL>
{
  public adapters: Required<VBIChartBuilderAdapters<TQueryDSL, TSeedDSL>>

  public chartType: ChartTypeBuilder
  /** @description 图表运行时实例的绑定、获取与原生事件代理。 */
  public instance: ChartInstanceBuilder
  declare public measures: MeasuresBuilder
  declare public dimensions: DimensionsBuilder
  public theme: ThemeBuilder
  public locale: LocaleBuilder

  constructor(doc: Y.Doc, options?: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>, dsl?: Y.Map<any>) {
    super(doc, dsl)
    this.adapters = resolveVBIChartBuilderAdapters(options?.adapters)
    this.chartType = new ChartTypeBuilder(doc, this.dsl)
    this.instance = new ChartInstanceBuilder(doc, this.chartType)
    this.theme = new ThemeBuilder(doc, this.dsl)
    this.locale = new LocaleBuilder(doc, this.dsl)
  }

  /** @description 校验计算表达式后，默认通过 query adapter 查询一次并构建 VSeed；非法表达式抛错。自定义 seed adapter 保留原有上下文和取数方式。 */
  public buildVSeed = async (options: BuildVSeedOptions = {}): Promise<TSeedDSL> => {
    const vbiDSL = this.build()
    const queryDSL = this.adapters.buildVQuery({
      dsl: this.dsl,
      vbiDSL,
      builder: this,
    })
    await validateCalculations(vbiDSL.calculations)
    options.signal?.throwIfAborted()
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

  /** @description 根据当前图表配置，取数前校验计算表达式，非法时抛错；通过 query adapter 执行并原样返回查询结果。默认查询保留维度和度量 ID，并将 signal 传给 Connector；独立调用不缓存结果。 */
  public query = async (options: QueryOptions = {}): Promise<VBIQueryResult> => {
    const context = { dsl: this.dsl, vbiDSL: this.build(), builder: this }
    const queryDSL = this.adapters.buildVQuery(context)
    await validateCalculations(context.vbiDSL.calculations)
    options.signal?.throwIfAborted()
    return this.adapters.query({ ...context, queryDSL, options })
  }

  public build = (): VBIChartDSL => buildVBIChartDSL(this.dsl)

  public isEmpty = (): boolean => isEmptyVBIChartDSL(this.dsl)

  protected createDimensions(): DimensionsBuilder {
    return new DimensionsBuilder(this.doc, this.dsl)
  }
  protected createMeasures(): MeasuresBuilder {
    return new MeasuresBuilder(this.doc, this.dsl)
  }
}
