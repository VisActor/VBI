import { z } from 'zod'
import { zVBISort } from './sort'

/** @description 基础查询结果上的数值计算列，表达式引用维度或度量 ID。 */
export const zVBICalculation = z
  .object({
    id: z.string().min(1),
    alias: z.string(),
    expr: z.string().min(1),
    parameters: z.array(z.number().finite().nullable()).optional(),
    sort: zVBISort.optional(),
  })
  .strict()

export type VBICalculation = z.infer<typeof zVBICalculation>
