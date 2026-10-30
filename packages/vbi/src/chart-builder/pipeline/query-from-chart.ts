import type { VBIChartDSL, VBIDimension, VBIMeasure } from 'src/types/chartDSL'
import type { VBIQueryDSL } from 'src/types/queryDSL'

/** @description 从图表快照提取查询配置，保留字段 ID 和顺序，不创建第二份可变状态。 */
export const queryFromChart = (chart: VBIChartDSL): VBIQueryDSL => ({
  uuid: chart.uuid,
  connectorId: chart.connectorId,
  dimensions: chart.dimensions
    .filter((node): node is VBIDimension => 'alias' in node && !('children' in node))
    .map(({ id, field, alias, aggregate, sort }) => ({ id, field, alias, aggregate, sort })),
  measures: chart.measures
    .filter((node): node is VBIMeasure => !('children' in node))
    .map(({ id, field, alias, aggregate, sort }) => ({ id, field, alias, aggregate, sort })),
  whereFilter: chart.whereFilter,
  havingFilter: chart.havingFilter,
  queryMode: chart.queryMode,
  limit: chart.limit,
  version: chart.version,
  ...(chart.calculations ? { calculations: chart.calculations } : {}),
})
