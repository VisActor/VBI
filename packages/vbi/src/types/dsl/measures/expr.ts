import { z } from 'zod'

/**
 * 测度表达式
 * 支持从简单的字段引用，逐步扩展到复杂的表达式
 * 
 * 当前版本：仅支持字段引用
 * 未来版本：可扩展支持 if/case/cast 等表达式
 */
export const zMeasureExpr = z.discriminatedUnion('type', [
  // 基础：字段引用
  z.object({
    type: z.literal('field'),
    field: z.string(),
  }),
  // 未来扩展点（保留）
  // z.object({
  //   type: z.literal('if'),
  //   cond: z.any(),
  //   then: z.any(),
  //   else: z.any(),
  // }),
  // z.object({
  //   type: z.literal('case'),
  //   cases: z.array(z.object({ cond: z.any(), value: z.any() })),
  //   default: z.any(),
  // }),
])

export type MeasureExpr = z.infer<typeof zMeasureExpr>

/**
 * 辅助函数：从字段名创建字段表达式
 */
export const fieldExpr = (field: string): MeasureExpr => ({
  type: 'field',
  field,
})

/**
 * 辅助函数：从表达式提取字段名（当前版本）
 */
export const exprField = (expr: MeasureExpr): string | null => {
  if (expr.type === 'field') {
    return expr.field
  }
  return null
}
