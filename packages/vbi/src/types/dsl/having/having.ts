import { z } from 'zod'

// 筛选操作符（包括聚合函数操作符）
export const zFilterOperator = z.enum([
  // 聚合函数操作符
  'sum',
  'avg',
  'count',
  'min',
  'max',
  // 比较操作符
  'eq',
  'neq',
  'gt',
  'gte',
  'lt',
  'lte',
  // 范围操作符
  'contains',
  'startsWith',
  'endsWith',
  'between',
])

export type FilterOperator = z.infer<typeof zFilterOperator>

// 逻辑运算符
export const zLogicalOperator = z.enum(['and', 'or'])

export type LogicalOperator = z.infer<typeof zLogicalOperator>

// 向前声明类型
export type VBIHavingFilter = {
  field: string
  operator: FilterOperator
  value: unknown
  logical?: LogicalOperator
}

export type VBIHavingFilterGroup = {
  logical: LogicalOperator
  conditions: (VBIHavingFilter | VBIHavingFilterGroup)[]
}

// 单个筛选条件
export const zVBIHavingFilter: z.ZodType<VBIHavingFilter> = z.object({
  field: z.string(),
  operator: zFilterOperator,
  value: z.unknown(),
  logical: zLogicalOperator.optional(),
})

// 筛选组（支持嵌套）
export const zVBIHavingFilterGroup: z.ZodType<VBIHavingFilterGroup> = z.object({
  logical: zLogicalOperator,
  conditions: z.array(z.union([zVBIHavingFilter, z.lazy(() => zVBIHavingFilterGroup)])),
})

// 联合类型
export const zVBIHaving = z.union([zVBIHavingFilter, zVBIHavingFilterGroup])

export type VBIHaving = z.infer<typeof zVBIHaving>

// 筛选数组
export const zVBIHavingArray = z.array(zVBIHaving)

export type VBIHavingArray = z.infer<typeof zVBIHavingArray>
