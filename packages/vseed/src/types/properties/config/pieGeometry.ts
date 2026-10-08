import { z } from 'zod'

export const zPieGeometry = z.object({
  outerRadius: z.number().positive().max(1).nullish(),
  innerRadius: z.number().nonnegative().max(1).nullish(),
  startAngle: z.number().nullish(),
  endAngle: z.number().nullish(),
})

export type PieGeometry = {
  /** @description 外半径占可用半径的比例，范围 (0, 1]，默认 0.8。 */
  outerRadius?: number
  /** @description 内半径占可用半径的比例，必须小于外半径。未配置时保持主题的内外半径比例，内置饼图为 0，环图为 80%。 */
  innerRadius?: number
  /** @description 起始角度，单位为度，默认 -90。 */
  startAngle?: number
  /** @description 结束角度，单位为度。未配置时保持主题的角度跨度，内置主题为 360。角度跨度必须在 (0, 360]。 */
  endAngle?: number
}
