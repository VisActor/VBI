import { z } from 'zod'

export const zVBIQueryMode = z.enum(['aggregate', 'detail'])

/** @description 图表查询模式。aggregate 按维度聚合，detail 查询普通表的源记录。 */
export type VBIQueryMode = z.infer<typeof zVBIQueryMode>
