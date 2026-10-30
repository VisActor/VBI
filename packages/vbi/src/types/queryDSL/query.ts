import { z } from 'zod'
import { zDimensionAggregate } from './dimensions/aggregate'
import { zAggregate } from './measures/aggregate'
import { zVBISort } from './sort'
import { zVBIWhereGroup } from './whereFilter/filters'
import { zVBIHavingGroup } from './havingFilter/having'
import { zVBIQueryMode } from './queryMode'
import { zVBICalculation } from './calculation'

export const zVBIQueryDimension = z
  .object({
    id: z.string(),
    field: z.string(),
    alias: z.string(),
    aggregate: zDimensionAggregate.optional(),
    sort: zVBISort.optional(),
  })
  .strict()

export const zVBIQueryMeasure = z
  .object({
    id: z.string(),
    field: z.string(),
    alias: z.string(),
    aggregate: zAggregate,
    sort: zVBISort.optional(),
  })
  .strict()

/** @description 独立查询的可恢复配置，不包含图形编码、执行结果或运行时连接器。 */
export const zVBIQueryDSL = z
  .object({
    uuid: z.string().optional().default(''),
    connectorId: z.string(),
    dimensions: z.array(zVBIQueryDimension),
    measures: z.array(zVBIQueryMeasure),
    calculations: z.array(zVBICalculation).optional(),
    havingFilter: zVBIHavingGroup.optional().default({ id: 'root', op: 'and', conditions: [] }),
    whereFilter: zVBIWhereGroup.optional().default({ id: 'root', op: 'and', conditions: [] }),
    limit: z.number().int().min(1).optional(),
    queryMode: zVBIQueryMode.optional(),
    version: z.number().int().min(0),
  })
  .strict()

export type VBIQueryDimension = z.infer<typeof zVBIQueryDimension>
export type VBIQueryMeasure = z.infer<typeof zVBIQueryMeasure>
export type VBIQueryDSLInput = z.input<typeof zVBIQueryDSL>
export type VBIQueryDSL = z.output<typeof zVBIQueryDSL>
