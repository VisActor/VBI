import { z } from 'zod'
import { zVBIDashboardThemeDefinition } from './theme'

/** Dashboard 主题名称，支持内置、文档内定义或预先注册的主题。 */
export const zVBIDashboardTheme = z.string().trim().min(1)

export const zVBIDashboardMeta = z.object({
  title: z.string(),
  description: z.string().optional(),
  theme: zVBIDashboardTheme.default('light'),
  /** 文档内的主题配置，随保存、撤销和协同同步传递。 */
  themes: z.record(zVBIDashboardTheme, zVBIDashboardThemeDefinition).optional(),
})

export type VBIDashboardMeta = z.output<typeof zVBIDashboardMeta>
