import type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from 'src/chart-builder/adapters/vquery-vseed/types'
import type { VBIChartBuilderOptions } from 'src/types'
import { createVBIChartNamespace } from './namespaces/chart'
import { createVBIConnectorNamespace } from './namespaces/connectors'
import { createVBIDashboardNamespace } from './namespaces/dashboard'
import { createVBIInsightNamespace } from './namespaces/insight'
import { createVBIResourceNamespace } from './namespaces/resources'
import { createVBIResourceRegistry } from './resources/resource-registry'
import type { VBIInstance } from './types'

/**
 * @description 创建一个独立的 VBI 实例。
 *
 * 每个实例都有自己的资源注册表，适合在同一应用中隔离不同仪表盘或测试上下文。
 */
export function createVBI(): VBIInstance<DefaultVBIQueryDSL, DefaultVBISeedDSL>
/**
 * @description 创建一个使用自定义 QueryDSL 和 SeedDSL 的 VBI 实例。
 *
 * @param defaultBuilderOptions 默认图表 Builder 配置，会传递给 chart 和 dashboard 中创建的图表 Builder。
 */
export function createVBI<TQueryDSL, TSeedDSL>(
  defaultBuilderOptions: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>,
): VBIInstance<TQueryDSL, TSeedDSL>
export function createVBI<TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL>(
  defaultBuilderOptions?: VBIChartBuilderOptions<TQueryDSL, TSeedDSL>,
) {
  const resourceRegistry = createVBIResourceRegistry<TQueryDSL, TSeedDSL>()

  return {
    connectors: createVBIConnectorNamespace(),
    resources: createVBIResourceNamespace(resourceRegistry),
    dashboard: createVBIDashboardNamespace(defaultBuilderOptions, resourceRegistry),
    chart: createVBIChartNamespace(defaultBuilderOptions, resourceRegistry),
    insight: createVBIInsightNamespace(resourceRegistry),
  } satisfies VBIInstance<TQueryDSL, TSeedDSL>
}
