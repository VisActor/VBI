import { z } from 'zod'
import { zDimension } from './zDimensions'

export const zTableDimension = zDimension.extend({
  width: z.number().positive().or(z.literal('auto')).optional(),
})

type TableDimensionNode = z.infer<typeof zTableDimension> & { children?: TableDimensionNode[] }

export const zTableDimensionTree: z.ZodType<TableDimensionNode[]> = z.array(
  zTableDimension.extend({
    children: z.lazy(() => zTableDimensionTree).optional(),
  }),
)
