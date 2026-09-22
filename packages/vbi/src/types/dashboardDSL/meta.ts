import { z } from 'zod'

/** Dashboard 主题名称，支持内置 light、dark 和渲染层注册的自定义主题。 */
export const zVBIDashboardTheme = z.string().trim().min(1)

export const zVBIDashboardMeta = z.object({
  title: z.string(),
  description: z.string().optional(),
  theme: zVBIDashboardTheme.default('light'),
})

export type VBIDashboardMeta = z.output<typeof zVBIDashboardMeta>
