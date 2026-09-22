import { z } from 'zod'
import { zTokenThemeDefinition } from '@visactor/vseed'

/** Serializable dashboard theme definition, shared by Builder and rendering adapters. */
export const zVBIDashboardThemeDefinition = z.object({
  label: z.string().optional(),
  tokens: zTokenThemeDefinition,
  dashboard: z
    .object({
      backgroundColor: z.string().optional(),
      widgetBackgroundColor: z.string().optional(),
      widgetBorderColor: z.string().optional(),
      widgetBorderRadius: z.number().nonnegative().optional(),
      toolbarBackground: z.string().optional(),
      padding: z.number().nonnegative().optional(),
      gap: z.number().nonnegative().optional(),
    })
    .optional(),
})

export type VBIDashboardThemeDefinition = z.output<typeof zVBIDashboardThemeDefinition>
