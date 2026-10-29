import { z } from 'zod'
import { zMeasure } from './zMeasures'

export const zTableMeasure = zMeasure.extend({
  width: z.number().positive().or(z.literal('auto')).optional(),
})

type TableMeasureNode = z.infer<typeof zTableMeasure> & { children?: TableMeasureNode[] }

export const zTableMeasureTree: z.ZodType<TableMeasureNode[]> = z.array(
  zTableMeasure.extend({
    children: z.lazy(() => zTableMeasureTree).optional(),
  }),
)
