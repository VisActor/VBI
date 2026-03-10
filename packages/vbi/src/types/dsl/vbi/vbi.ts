import { z } from 'zod'
import { zVBIDimensionTree } from '../dimensions/dimensions'
import { zVBIMeasureTree } from '../measures/measures'
import { zVBIDSLTheme } from '../theme/theme'
import { zVBIDSLLocale } from '../locale/locale'
import { zVBIWhereFiltersRoot } from '../whereFilters/filters'
import { zVBIHavingFilter } from '../havingFilters/having'

export const zVBIDSL = z.object({
  connectorId: z.string(),
  chartType: z.custom<any>(), // Use any to avoid circular dependency or simplify for now
  dimensions: zVBIDimensionTree,
  measures: zVBIMeasureTree,
  havingFilters: z.array(zVBIHavingFilter).optional().default([]),
  whereFilters: zVBIWhereFiltersRoot.optional().default({
    id: '00000000-0000-0000-0000-000000000000',
    op: 'AND',
    conditions: [],
  }),
  theme: zVBIDSLTheme,
  locale: zVBIDSLLocale,
  limit: z.number().int().min(1).optional(),
  version: z.number().int().min(0),
})

export type VBIDSL = z.infer<typeof zVBIDSL>
