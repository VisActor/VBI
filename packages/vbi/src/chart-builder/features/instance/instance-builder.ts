import type * as Y from 'yjs'
import type { VBIChartInstance, VBIChartInstanceOn, VBIChartInstanceOff } from 'src/types'
import type { ChartTypeBuilder } from '../chart-type'

const instanceOwners = new WeakMap<VBIChartInstance, ChartInstanceBuilder>()

/** @description 管理图表的本地渲染实例及原生事件代理，不参与 DSL、协同同步或撤销历史。 */
export class ChartInstanceBuilder {
  private boundInstance?: VBIChartInstance
  private boundChartType?: string

  constructor(
    doc: Y.Doc,
    private chartType: ChartTypeBuilder,
  ) {
    chartType.observe(() => {
      if (chartType.getChartType() !== this.boundChartType) this.bind(undefined)
    })
    doc.on('destroy', () => this.bind(undefined))
  }

  /**
   * @description 绑定运行时实例并返回当前实例构建器。table / pivotTable 使用 VTable，其余类型使用 VChart。重复绑定替换引用，undefined 解绑；同一实例不能绑定到两个构建器。切换图表类型或销毁文档时自动解绑，事件清理和 release 由调用方负责。
   * @param instance - 已创建的 VChart / VTable 实例，或 undefined
   */
  bind(instance: VBIChartInstance | undefined): this {
    const chartType = this.chartType.getChartType()
    if (instance) {
      const isTable = chartType === 'table' || chartType === 'pivotTable'
      if (isTable !== 'getCellValue' in instance) {
        throw new Error(`Chart type "${chartType}" requires a ${isTable ? 'VTable' : 'VChart'} instance`)
      }
      const owner = instanceOwners.get(instance)
      if (owner && owner !== this) throw new Error('Instance is already bound to another chart builder')
    }
    if (this.boundInstance) instanceOwners.delete(this.boundInstance)
    this.boundInstance = instance
    this.boundChartType = instance ? chartType : undefined
    if (instance) instanceOwners.set(instance, this)
    return this
  }

  /** @description 获取绑定实例，未绑定时返回 undefined。类型参数可指定调用方已知的 IVChart 或 BaseTableAPI 等原生类型。 */
  get<T extends VBIChartInstance = VBIChartInstance>(): T | undefined {
    return this.boundInstance as T | undefined
  }

  /** @description 代理当前实例的原生 on，保留参数、返回值和 this；VTable 返回监听器 ID。必须先 bind，重新绑定后需重新注册监听器。 */
  public on: VBIChartInstanceOn = ((...args: unknown[]) => this.invoke('on', args)) as VBIChartInstanceOn

  /** @description 代理当前实例的原生 off；VChart 接收事件名及回调，VTable 接收监听器 ID。未绑定时抛出错误。 */
  public off: VBIChartInstanceOff = ((...args: unknown[]) => this.invoke('off', args)) as VBIChartInstanceOff

  private invoke(method: 'on' | 'off', args: unknown[]): unknown {
    const instance = this.boundInstance
    if (!instance) throw new Error('No chart instance is bound; call chartBuilder.instance.bind(instance) first')
    return (instance[method] as (...args: unknown[]) => unknown).apply(instance, args)
  }
}
