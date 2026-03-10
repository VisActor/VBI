import { z } from 'zod'

// 前向声明
export const zVBIWhereFilterLeaf: z.ZodType<{
  id: string
  field: string
  op?: string
  value?: unknown
}> = z.object({
  id: z.string().uuid(),
  field: z.string(),
  op: z.string().optional(),
  value: z.any().optional(),
})

export type VBIWhereFilterLeaf = z.infer<typeof zVBIWhereFilterLeaf>

// 嵌套组 - 使用前向声明避免循环引用
export const zVBIWhereFilterGroup: z.ZodType<{
  id: string
  op: 'AND' | 'OR'
  conditions: (VBIWhereFilterLeaf | VBIWhereFilterGroup)[]
}> = z.lazy(() =>
  z.object({
    id: z.string().uuid(),
    op: z.enum(['AND', 'OR']),
    conditions: z.array(zVBIWhereFilterCondition),
  }),
)

export type VBIWhereFilterGroup = z.infer<typeof zVBIWhereFilterGroup>

// 联合类型
export const zVBIWhereFilterCondition: z.ZodType<VBIWhereFilterLeaf | VBIWhereFilterGroup> = z.union([
  zVBIWhereFilterLeaf,
  zVBIWhereFilterGroup,
])

export type VBIWhereFilterCondition = z.infer<typeof zVBIWhereFilterCondition>

// 根结构
export const zVBIWhereFiltersRoot = z.object({
  id: z.string().uuid(),
  op: z.enum(['AND', 'OR']),
  conditions: z.array(zVBIWhereFilterCondition),
})

export type VBIWhereFiltersRoot = z.infer<typeof zVBIWhereFiltersRoot>

// 兼容旧类型 (标记废弃)
export const zVBIFilter = z.object({
  field: z.string(),
  operator: z.string().optional(),
  value: z.any().optional(),
})

export type VBIFilter = z.infer<typeof zVBIFilter>
