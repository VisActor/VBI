import { z } from 'zod'

export const zVBIFilter = z.object({
  field: z.string(),
  operator: z.string().optional(),
  value: z.any().optional(),
})

export type VBIFilter = z.infer<typeof zVBIFilter>

// 新增：条件节点
export const zWhereFilterCondition = z.object({
  field: z.string(),
  operator: z.string().optional(),
  value: z.any().optional(),
})

export type WhereFilterCondition = z.infer<typeof zWhereFilterCondition>

// 新增：条件组（支持递归嵌套）
// 先定义 interface 避免循环引用
export interface WhereFilterGroup {
  logic: 'and' | 'or'
  conditions: (WhereFilterCondition | WhereFilterGroup)[]
}

export type WhereFilterConditionOrGroup = WhereFilterCondition | WhereFilterGroup
export type WhereFilters = WhereFilterGroup

// 使用 z.lazy 配合 interface 定义
const zConditionOrGroup: z.ZodType<WhereFilterConditionOrGroup> = z.lazy(() =>
  zWhereFilterCondition.or(zWhereFilterGroupSchema),
)

export const zWhereFilterGroupSchema = z.object({
  logic: z.enum(['and', 'or']),
  conditions: z.array(zConditionOrGroup),
})

// 为保持一致性，提供别名
export const zWhereFilters = zWhereFilterGroupSchema
