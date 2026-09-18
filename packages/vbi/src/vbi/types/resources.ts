import type { VBIChartDSL, VBIChartDSLInput, VBIInsightDSL, VBIInsightDSLInput } from 'src/types'

/** @description 批量注册到 VBI 实例资源表的资源输入。 */
export interface VBIResourceRegisterInput {
  /** @description 待注册的图表资源。 */
  charts?: VBIChartDSLInput[]
  /** @description 待注册的 insight 资源。 */
  insights?: VBIInsightDSLInput[]
}

/** @description 批量注册完成后的规范化资源结果。 */
export interface VBIResourceRegisterResult {
  /** @description 已规范化并注册的图表资源。 */
  charts: VBIChartDSL[]
  /** @description 已规范化并注册的 insight 资源。 */
  insights: VBIInsightDSL[]
}

/** @description VBI 实例中当前可引用资源的 DSL 快照。 */
export interface VBIResourceSnapshot {
  /** @description 当前已注册的图表资源，以 uuid 为键。 */
  charts: Record<string, VBIChartDSL>
  /** @description 当前已注册的 insight 资源，以 uuid 为键。 */
  insights: Record<string, VBIInsightDSL>
}

/** @description VBI 实例上的图表资源命名空间。 */
export interface VBIChartResourceNamespace {
  /** @description 注册单个图表资源。 */
  register(chart: VBIChartDSLInput): VBIChartDSL
  /** @description 获取已注册的图表资源 DSL。 */
  get(uuid: string): VBIChartDSL | undefined
  /** @description 获取所有已注册的图表资源 DSL。 */
  list(): VBIChartDSL[]
  /** @description 判断指定图表资源是否已注册。 */
  has(uuid: string): boolean
  /** @description 注销指定图表资源。 */
  unregister(uuid: string): boolean
}

/** @description VBI 实例上的 insight 资源命名空间。 */
export interface VBIInsightResourceNamespace {
  /** @description 注册单个 insight 资源。 */
  register(insight: VBIInsightDSLInput): VBIInsightDSL
  /** @description 获取已注册的 insight 资源 DSL。 */
  get(uuid: string): VBIInsightDSL | undefined
  /** @description 获取所有已注册的 insight 资源 DSL。 */
  list(): VBIInsightDSL[]
  /** @description 判断指定 insight 资源是否已注册。 */
  has(uuid: string): boolean
  /** @description 注销指定 insight 资源。 */
  unregister(uuid: string): boolean
}

/** @description VBI 实例上的资源命名空间，用于注册可被 dashboard 引用的共享资源。 */
export interface VBIResourceNamespace {
  /** @description 图表资源管理 API。 */
  chart: VBIChartResourceNamespace
  /** @description Insight 资源管理 API。 */
  insight: VBIInsightResourceNamespace
  /** @description 批量注册图表和 insight 资源。 */
  register(resources: VBIResourceRegisterInput): VBIResourceRegisterResult
  /** @description 清空当前 VBI 实例的所有图表和 insight 资源。 */
  clear(): void
  /** @description 导出当前 VBI 实例可引用资源的 DSL 快照。 */
  snapshot(): VBIResourceSnapshot
}
