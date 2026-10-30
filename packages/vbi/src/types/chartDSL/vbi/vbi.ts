import { z } from 'zod'
import { zVBIDimensionTree } from '../dimensions/dimensions'
import { zVBIHavingGroup } from '../havingFilter/having'
import { zVBIDSLLocale } from '../locale/locale'
import { zVBIMeasureTree } from '../measures/measures'
import { zVBIDSLTheme } from '../theme/theme'
import { zVBIWhereGroup } from '../whereFilter/filters'
import { zVBIQueryMode } from '../queryMode'
import { zVBICalculation } from '../../queryDSL/calculation'

export const zVBIChartDSL = z.object({
  uuid: z.string().optional().default(''),
  connectorId: z.string(),
  chartType: z.custom<any>(), // Use any to avoid circular dependency or simplify for now
  dimensions: zVBIDimensionTree,
  measures: zVBIMeasureTree,
  calculations: z.array(zVBICalculation).optional(),
  havingFilter: zVBIHavingGroup.optional().default({
    id: 'root',
    op: 'and',
    conditions: [],
  }),
  whereFilter: zVBIWhereGroup.optional().default({
    id: 'root',
    op: 'and',
    conditions: [],
  }),
  theme: zVBIDSLTheme,
  locale: zVBIDSLLocale,
  limit: z.number().int().min(1).optional(),
  queryMode: zVBIQueryMode.optional(),
  version: z.number().int().min(0),
})

export type VBIChartDSLInput = z.input<typeof zVBIChartDSL>
export type VBIChartDSL = z.output<typeof zVBIChartDSL>
