/**
 * Heatmap cell style configuration
 */
export interface HeatmapCell {
  /**
   * Cell border color
   */
  stroke?: string | null
  /**
   * Cell border width
   */
  lineWidth?: number | null
  /**
   * Cell corner radius
   */
  cornerRadius?: number | null
  /**
   * @deprecated Heatmap cells no longer render hover shadows. Retained for configuration compatibility.
   */
  hoverShadowColor?: string | null
}
