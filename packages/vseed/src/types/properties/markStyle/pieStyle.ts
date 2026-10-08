export type PieStyle = {
  /** @description 扇区边框颜色，默认跟随图表背景。 */
  pieBorderColor?: string
  /** @description 扇区边框宽度，单位 px，默认按数据量自适应：不超过 30 条时为 1，否则为 0。0 表示无边框。 */
  pieBorderWidth?: number
  /** @description 扇区圆角，单位 px。 */
  pieCornerRadius?: number
  /** @description 悬停效果：enlarge 放大（默认）、opacity 降低透明度（固定为 0.75）、none 关闭。 */
  pieHoverEffect?: 'opacity' | 'enlarge' | 'none'
}
