/**
 * Chart Encoding Support Configuration
 *
 * Maps each chart type to the encoding channels it supports for dimensions and measures.
 * This configuration is derived from VSeed's type definitions and filtered to only include
 * encodings that VBI supports (defined in VBI_SUPPORTED_ENCODINGS).
 *
 * VBI_SUPPORTED_ENCODINGS: ['yAxis', 'xAxis', 'color', 'label', 'tooltip', 'size']
 *
 * Encoding Normalization:
 * - Chart-specific size encodings (angle, radius) are normalized to 'size' for consistency
 *   angle (pie, polar) → size (扇形大小)
 *   radius (rose, sunburst) → size (花瓣/半径大小)
 * - This allows VBI frontend to use a unified 'size' encoding that maps to chart-specific implementations
 */

import { VBI_SUPPORTED_ENCODINGS, type VBIEncoding } from '../types/dsl/encoding'

interface ChartEncodingConfig {
  dimension: VBIEncoding[]
  measure: VBIEncoding[]
}

/**
 * VSeed 原始编码支持（来自各图表类型定义）
 * 这里列出 VSeed 官方支持的所有编码，随后会过滤只保留 VBI 支持的
 */
const VSEED_CHART_ENCODINGS: Record<string, { dimension: string[]; measure: string[] }> = {
  // Categorical charts
  bar: {
    dimension: ['yAxis', 'color', 'detail', 'tooltip', 'label', 'row', 'column'],
    measure: ['xAxis', 'detail', 'color', 'label', 'tooltip'],
  },
  barParallel: {
    dimension: ['yAxis', 'color', 'detail', 'tooltip', 'label', 'row', 'column'],
    measure: ['xAxis', 'detail', 'color', 'label', 'tooltip'],
  },
  barPercent: {
    dimension: ['yAxis', 'color', 'detail', 'tooltip', 'label', 'row', 'column'],
    measure: ['xAxis', 'detail', 'color', 'label', 'tooltip'],
  },
  column: {
    dimension: ['xAxis', 'color', 'detail', 'tooltip', 'label', 'row', 'column'],
    measure: ['yAxis', 'detail', 'color', 'label', 'tooltip'],
  },
  columnParallel: {
    dimension: ['xAxis', 'color', 'detail', 'tooltip', 'label', 'row', 'column'],
    measure: ['yAxis', 'detail', 'color', 'label', 'tooltip'],
  },
  columnPercent: {
    dimension: ['xAxis', 'color', 'detail', 'tooltip', 'label', 'row', 'column'],
    measure: ['yAxis', 'detail', 'color', 'label', 'tooltip'],
  },
  line: {
    dimension: ['xAxis', 'color', 'detail', 'tooltip', 'label', 'row', 'column'],
    measure: ['yAxis', 'detail', 'color', 'label', 'tooltip'],
  },
  lineParallel: {
    dimension: ['xAxis', 'color', 'detail', 'tooltip', 'label', 'row', 'column'],
    measure: ['yAxis', 'detail', 'color', 'label', 'tooltip'],
  },
  linePercent: {
    dimension: ['xAxis', 'color', 'detail', 'tooltip', 'label', 'row', 'column'],
    measure: ['yAxis', 'detail', 'color', 'label', 'tooltip'],
  },
  area: {
    dimension: ['xAxis', 'color', 'detail', 'tooltip', 'label', 'row', 'column'],
    measure: ['yAxis', 'detail', 'color', 'label', 'tooltip'],
  },
  areaParallel: {
    dimension: ['xAxis', 'color', 'detail', 'tooltip', 'label', 'row', 'column'],
    measure: ['yAxis', 'detail', 'color', 'label', 'tooltip'],
  },
  areaPercent: {
    dimension: ['xAxis', 'color', 'detail', 'tooltip', 'label', 'row', 'column'],
    measure: ['yAxis', 'detail', 'color', 'label', 'tooltip'],
  },
  pie: {
    dimension: ['color', 'detail', 'tooltip', 'label'],
    measure: ['radius', 'detail', 'color', 'label', 'tooltip'],
  },

  // Scatter-like charts
  scatter: {
    dimension: ['color', 'detail', 'tooltip', 'label', 'row', 'column'],
    measure: ['xAxis', 'yAxis', 'size', 'color', 'label', 'tooltip'],
  },
  bubble: {
    dimension: ['color', 'detail', 'tooltip', 'label', 'row', 'column'],
    measure: ['xAxis', 'yAxis', 'size', 'color', 'label', 'tooltip'],
  },

  // Hierarchical charts
  treemap: {
    dimension: ['color', 'detail', 'tooltip', 'label', 'hierarchy'],
    measure: ['size', 'color', 'label', 'tooltip'],
  },
  sunburst: {
    dimension: ['color', 'detail', 'tooltip', 'label', 'hierarchy'],
    measure: ['radius', 'color', 'label', 'tooltip'],
  },

  // Polar/Rose chart
  rose: {
    dimension: ['color', 'detail', 'tooltip', 'label'],
    measure: ['radius', 'color', 'label', 'tooltip'],
  },
  roseParallel: {
    dimension: ['color', 'detail', 'tooltip', 'label'],
    measure: ['radius', 'color', 'label', 'tooltip'],
  },

  // Pie variant (donut)
  donut: {
    dimension: ['color', 'detail', 'tooltip', 'label'],
    measure: ['radius', 'detail', 'color', 'label', 'tooltip'],
  },

  // Radar/Spider chart
  radar: {
    dimension: ['color', 'detail', 'tooltip', 'label'],
    measure: ['radius', 'color', 'label', 'tooltip'],
  },

  // Heatmap
  heatmap: {
    dimension: ['xAxis', 'yAxis', 'detail', 'tooltip', 'label'],
    measure: ['color', 'label', 'tooltip'],
  },

  // Waterfall
  waterfall: {
    dimension: ['xAxis', 'detail', 'tooltip', 'label'],
    measure: ['yAxis', 'detail', 'label', 'tooltip'],
  },

  // Gauge
  gauge: {
    dimension: [],
    measure: ['angle', 'color', 'label', 'tooltip'],
  },

  // Funnel
  funnel: {
    dimension: ['detail', 'tooltip', 'label'],
    measure: ['yAxis', 'color', 'label', 'tooltip'],
  },

  // Sankey
  sankey: {
    dimension: ['detail', 'tooltip', 'label'],
    measure: [],
  },

  // Word Cloud
  wordCloud: {
    dimension: ['color', 'tooltip', 'label'],
    measure: ['size', 'color', 'label', 'tooltip'],
  },

  // Correlation Network
  correlation: {
    dimension: ['color', 'detail', 'tooltip', 'label'],
    measure: ['detail', 'color', 'label', 'tooltip'],
  },

  // Table - No encoding support (uses row/column configuration)
  table: {
    dimension: [],
    measure: [],
  },

  // Pivot Table - No encoding support (uses row/column/value configuration)
  pivot: {
    dimension: [],
    measure: [],
  },
  pivotTable: {
    dimension: [],
    measure: [],
  },

  // Default for other charts - No encoding support by default
  // Charts must be explicitly defined to show encoding slots
  // This helps catch misconfigured or undefined chart types
  default: {
    dimension: [],
    measure: [],
  },
}

/**
 * Filter encodings to only include those supported by VBI
 * Also normalizes chart-specific size encodings (angle, radius) to 'size'
 */
function filterSupportedEncodings(encodings: string[]): VBIEncoding[] {
  const supportedSet = new Set(VBI_SUPPORTED_ENCODINGS)
  
  // Map chart-specific size encodings to VBI's standard 'size' encoding
  // angle (pie, polar) and radius (rose, sunburst) both represent size/magnitude
  const normalized = encodings.map((enc) => {
    if (enc === 'angle' || enc === 'radius') {
      return 'size'
    }
    return enc
  })
  
  // Remove duplicates and filter to only supported encodings
  return Array.from(new Set(
    normalized.filter((enc) => supportedSet.has(enc as VBIEncoding)) as VBIEncoding[]
  ))
}

/**
 * Get the supported encoding channels for a specific chart type
 * @param chartType The chart type name
 * @returns An object containing supported dimension and measure encodings
 * @throws Will warn if chart type is not explicitly defined (falls back to default)
 */
export function getChartEncodingSupport(chartType: string): ChartEncodingConfig {
  const hasExplicitConfig = chartType in VSEED_CHART_ENCODINGS
  
  if (!hasExplicitConfig) {
    console.warn(
      `[VBI] Chart type "${chartType}" is not explicitly defined in chartEncodings. ` +
      `Using default encoding configuration. This may result in incorrect encoding slots. ` +
      `Please add an explicit configuration for this chart type in packages/vbi/src/config/chartEncodings.ts`,
      { chartType }
    )
  }
  
  const config = VSEED_CHART_ENCODINGS[chartType] || VSEED_CHART_ENCODINGS.default

  return {
    dimension: filterSupportedEncodings(config.dimension),
    measure: filterSupportedEncodings(config.measure),
  }
}

/**
 * Get all chart types with their encoding support
 */
export function getAllChartEncodings(): Record<string, ChartEncodingConfig> {
  const result: Record<string, ChartEncodingConfig> = {}

  for (const [chartType, config] of Object.entries(VSEED_CHART_ENCODINGS)) {
    if (chartType !== 'default') {
      result[chartType] = {
        dimension: filterSupportedEncodings(config.dimension),
        measure: filterSupportedEncodings(config.measure),
      }
    }
  }

  return result
}
