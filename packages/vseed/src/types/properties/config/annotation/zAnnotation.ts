import { z } from 'zod'
import { zAnnotationPoint } from '../../annotation/zAnnotationPoint'
import { zAnnotationDifferenceLine } from '../../annotation/zAnnotationDifferenceLine'
import { zAnnotationHorizontalLine } from '../../annotation/zAnnotationHorizontalLine'
import { zAnnotationAreaStyle } from '../../annotation/zAnnotationArea'

export const zAnnotationPointConfig = zAnnotationPoint
  .omit({ selector: true, measureId: true, text: true })
  .partial()
  .extend({
    textBackgroundOpacity: z.number().nullish(),
  })

// Use pick to explicitly list fields we want to expose in config variants.
export const zAnnotationHorizontalLineConfig = zAnnotationHorizontalLine
  .pick({
    // only pick fields that exist on the runtime schema
    lineColor: true,
    lineWidth: true,
    lineVisible: true,
    lineStyle: true,

    textBackgroundVisible: true,
    textColor: true,
    textFontSize: true,
    textFontWeight: true,
    textBackgroundColor: true,
    textBackgroundBorderColor: true,
    textBackgroundBorderWidth: true,
    textBackgroundBorderRadius: true,
    textBackgroundPadding: true,
  })
  // extend with additional config-only fields that runtime schema doesn't include
  .extend({
    lineDash: z.array(z.number()).nullish(),
    textBackgroundOpacity: z.number().nullish(),

    endSymbolVisible: z.boolean().nullish(),
    endSymbolType: z.string().nullish(),
    endSymbolSize: z.number().nullish(),

    startSymbolVisible: z.boolean().nullish(),
    startSymbolType: z.string().nullish(),
    startSymbolSize: z.number().nullish(),
  })
  .partial()

export const zAnnotationVerticalLineConfig = zAnnotationHorizontalLineConfig.clone()

export const zAnnotationAreaConfig = zAnnotationAreaStyle
  .pick({
    textColor: true,
    textFontSize: true,
    textFontWeight: true,

    textBackgroundVisible: true,
    textBackgroundColor: true,
    textBackgroundBorderColor: true,
    textBackgroundBorderWidth: true,
    textBackgroundBorderRadius: true,
    textBackgroundPadding: true,

    areaColor: true,
    areaColorOpacity: true,
    areaBorderColor: true,
    areaBorderWidth: true,
    areaBorderRadius: true,
    areaLineDash: true,

    outerPadding: true,
  })
  .extend({
    textBackgroundOpacity: z.number().nullish(),
  })
  .partial()

export const zAnnotationDifferenceLineConfig = zAnnotationDifferenceLine
  .pick({
    lineColor: true,
    lineStyle: true,
    textColor: true,
    textFontSize: true,
    textFontWeight: true,
    textBackgroundColor: true,
  })
  .extend({
    textBackgroundBorderColor: z.string().nullish(),
    textBackgroundBorderRadius: z.number().nullish(),
    textBackgroundBorderWidth: z.number().nullish(),
    textBackgroundPadding: z.number().nullish(),
    lineDash: z.array(z.number()).nullish(),
    textBackgroundOpacity: z.number().nullish(),
  })
  .partial()

export const zAnnotationConfig = z.object({
  annotationPoint: zAnnotationPointConfig.nullish(),
  annotationHorizontalLine: zAnnotationHorizontalLineConfig.nullish(),
  annotationVerticalLine: zAnnotationVerticalLineConfig.nullish(),
  annotationArea: zAnnotationAreaConfig.nullish(),
  annotationDifferenceLine: zAnnotationDifferenceLineConfig.nullish(),
})
