import type { HeatmapCell } from 'src/types/properties/config/heatmap/heatmap'

export const getLightHeatmapCellTheme = (): HeatmapCell => {
  return {
    stroke: '#fff',
  }
}

export const getDarkHeatmapCellTheme = (): HeatmapCell => {
  return {
    stroke: '#404349',
  }
}
