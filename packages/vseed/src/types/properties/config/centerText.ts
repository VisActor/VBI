import { z } from 'zod'

/** 固定中心文本；主副文本默认 18/12px，超长文本按环内宽度省略，颜色跟随主题。省略 centerText 即不显示。 */
export type CenterText = {
  /** @description 主文本，不随扇区交互变化。业务计算及无数据占位文本由调用方提供。 */
  titleText?: string | number
  /** @description 副文本。 */
  subTitleText?: string | number
}

export const zCenterText = z.object({
  titleText: z.union([z.string(), z.number()]).nullish(),
  subTitleText: z.union([z.string(), z.number()]).nullish(),
})

/** 中心文本的主题配置；图表 DSL 只需提供文本，排版由主题统一管理。 */
export const zCenterTextConfig = zCenterText.extend({
  titleFontSize: z.number().positive().nullish(),
  titleFontWeight: z.union([z.number(), z.string()]).nullish(),
  subTitleFontSize: z.number().positive().nullish(),
  subTitleOpacity: z.number().min(0).max(1).nullish(),
  gap: z.number().nonnegative().nullish(),
})

export type CenterTextConfig = z.infer<typeof zCenterTextConfig>
