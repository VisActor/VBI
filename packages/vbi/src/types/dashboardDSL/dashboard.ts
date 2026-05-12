import { z } from 'zod'

export const zVBIDashboardBreakpoint = z.enum(['xxl', 'xl', 'lg', 'md', 'sm', 'xs'])

export const zVBIDashboardMeta = z.object({
  title: z.string(),
  description: z.string().optional(),
  mode: z.enum(['edit', 'view']).optional(),
  theme: z.string().optional(),
})

export const zVBIDashboardGridItemLayout = z.object({
  id: z.string(),
  widgetId: z.string(),
  x: z.number().int(),
  y: z.number().int(),
  w: z.number().int().positive(),
  h: z.number().int().positive(),
  static: z.boolean().optional(),
})

const zVBIDashboardWidgetBase = z.object({
  id: z.string(),
  type: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
})

export const zVBIDashboardChartWidget = zVBIDashboardWidgetBase.extend({
  type: z.literal('chart'),
  chartId: z.string(),
})

export const zVBIDashboardInsightWidget = zVBIDashboardWidgetBase.extend({
  type: z.literal('insight'),
  insightId: z.string(),
})

<<<<<<< Updated upstream
export const zVBIDashboardWidget = z.union([zVBIDashboardChartWidget, zVBIDashboardInsightWidget])
=======
export const zVBIDashboardCustomWidget = zVBIDashboardWidgetBase.passthrough()

export const zVBIDashboardWidget = z.union([
  zVBIDashboardChartWidget,
  zVBIDashboardInsightWidget,
  zVBIDashboardCustomWidget,
])
>>>>>>> Stashed changes

export const zVBIDashboardLayoutMap = z.object({
  xxl: z.array(zVBIDashboardGridItemLayout).optional(),
  xl: z.array(zVBIDashboardGridItemLayout).optional(),
  lg: z.array(zVBIDashboardGridItemLayout).optional().default([]),
  md: z.array(zVBIDashboardGridItemLayout).optional(),
  sm: z.array(zVBIDashboardGridItemLayout).optional(),
  xs: z.array(zVBIDashboardGridItemLayout).optional(),
})

export const zVBIDashboardLayout = z.object({
  breakpoints: z.record(zVBIDashboardBreakpoint, z.number().int()),
  cellHeight: z.number().int().positive().optional(),
  layouts: zVBIDashboardLayoutMap,
})

export const zVBIDashboardDSL = z.object({
  version: z.number().int().min(1).optional().default(1),
  type: z.literal('dashboard').optional().default('dashboard'),
  uuid: z.string().optional().default(''),
  meta: zVBIDashboardMeta,
  widgets: z.array(zVBIDashboardWidget).optional().default([]),
  layout: zVBIDashboardLayout,
  state: z.record(z.string(), z.unknown()).optional(),
})

export type VBIDashboardBreakpoint = z.output<typeof zVBIDashboardBreakpoint>
export type VBIDashboardMeta = z.output<typeof zVBIDashboardMeta>
export type VBIDashboardGridItemLayout = z.output<typeof zVBIDashboardGridItemLayout>
export type VBIDashboardChartWidget = z.output<typeof zVBIDashboardChartWidget>
export type VBIDashboardInsightWidget = z.output<typeof zVBIDashboardInsightWidget>
export type VBIDashboardWidget = z.output<typeof zVBIDashboardWidget>
export type VBIDashboardLayoutMap = z.output<typeof zVBIDashboardLayoutMap>
export type VBIDashboardLayout = z.output<typeof zVBIDashboardLayout>
export type VBIDashboardDSLInput = z.input<typeof zVBIDashboardDSL>
export type VBIDashboardDSL = z.output<typeof zVBIDashboardDSL>
