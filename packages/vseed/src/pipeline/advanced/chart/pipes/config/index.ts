import { lineConfig } from './line'
import { columnConfig } from './column'
import { pieConfig } from './pie'
import { dualAxisConfig } from './dualAxis'
import { scatterConfig } from './scatter'
import { histogramConfig } from './histogram'
import { boxplotConfig } from './boxplot'
import { heatmapConfig } from './heatmap'

export {
  lineConfig,
  columnConfig,
  pieConfig,
  dualAxisConfig,
  scatterConfig,
  histogramConfig,
  boxplotConfig,
  heatmapConfig,
}

export { treeMapConfig } from './treeMap'
export { sunburstConfig } from './sunburst'
export { circlePackingConfig } from './circlePacking'
export { hierarchySankeyConfig } from './hierarchySankey'
export { sankeyConfig } from './sankey'
export { pieStyleConfig, centerTextConfig } from './piePresentation'
export { pieGeometryConfig, donutGeometryConfig } from './pieGeometry'

// area
export const areaConfig = lineConfig
export const areaPercentConfig = lineConfig

// bar
export const barConfig = columnConfig
export const barParallelConfig = columnConfig
export const barPercentConfig = columnConfig

// column
export const columnParallelConfig = columnConfig
export const columnPercentConfig = columnConfig

// donut, rose
export const donutConfig = pieConfig
export const roseConfig = pieConfig
export const roseParallelConfig = pieConfig
export const radarConfig = pieConfig

// funnel, heatmap
export const funnelConfig = pieConfig
// heatmapConfig 已独立导出
