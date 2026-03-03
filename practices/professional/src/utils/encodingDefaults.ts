/**
 * Default encoding for measures based on chart type
 * When a measure is added, use this mapping to set the appropriate default encoding
 */
export const CHART_DEFAULT_ENCODING: Record<string, string> = {
  // Cartesian charts - measure goes to Y axis by default
  column: 'yAxis',
  area: 'yAxis',
  line: 'yAxis',
  scatter: 'yAxis',
  heatmap: 'yAxis',
  
  // Bar chart - measure goes to X axis (horizontal)
  bar: 'xAxis',
  
  // Pie/Donut charts - measure goes to angle
  pie: 'angle',
  donut: 'angle',
  
  // Default fallback
  table: 'yAxis',
  default: 'yAxis',
}

/**
 * Get default encoding for a chart type
 */
export function getDefaultEncodingForChart(chartType: string): string {
  return CHART_DEFAULT_ENCODING[chartType] || CHART_DEFAULT_ENCODING.default
}
