import type { DefaultVBIQueryDSL, DefaultVBISeedDSL } from 'src/chart-builder/adapters/vquery-vseed/types'
import type { VBIChartNamespace } from './chart'
import type { VBIConnectorNamespace } from './connectors'
import type { VBIDashboardNamespace } from './dashboard'
import type { VBIInsightNamespace } from './insight'
import type { VBIResourceNamespace } from './resources'

/** @description createVBI 返回的 VBI 实例，是访问 chart、insight、dashboard 等能力的统一入口。 */
export interface VBIInstance<TQueryDSL = DefaultVBIQueryDSL, TSeedDSL = DefaultVBISeedDSL> {
  /** @description 连接器注册、获取和释放 API。 */
  connectors: VBIConnectorNamespace
  /** @description 图表和 insight 资源注册 API，用于 dashboard 引用共享资源。 */
  resources: VBIResourceNamespace
  /** @description 图表 Builder 创建 API。 */
  chart: VBIChartNamespace<TQueryDSL, TSeedDSL>
  /** @description Insight Builder 创建 API。 */
  insight: VBIInsightNamespace
  /** @description Dashboard Builder 创建 API。 */
  dashboard: VBIDashboardNamespace<TQueryDSL, TSeedDSL>
}
