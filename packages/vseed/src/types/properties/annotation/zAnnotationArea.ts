import { zAreaSelector, zAreaSelectors } from '../../dataSelector/selector'
import { z } from 'zod'
import { AxisBoundaryEnum } from './annotationAreaRange'

export const zAnnotationAxisRange = z
  .object({
    min: z.number().finite().or(z.literal(AxisBoundaryEnum.Min)),
    max: z.number().finite().or(z.literal(AxisBoundaryEnum.Max)),
  })
  .strict()
  .refine(({ min, max }) => typeof min !== 'number' || typeof max !== 'number' || min < max, {
    message: 'min must be less than max',
  })

export const zAnnotationAreaRange = z
  .object({ x: zAnnotationAxisRange.optional(), y: zAnnotationAxisRange.optional() })
  .strict()
  .refine(({ x, y }) => x !== undefined || y !== undefined, { message: 'range requires x or y' })

export const zAnnotationAreaStyle = z.object({
  textPosition: z
    .enum(['top', 'topRight', 'topLeft', 'bottom', 'bottomLeft', 'bottomRight', 'left', 'right'])
    .default('top')
    .nullish(),
  text: z.string().or(z.array(z.string())).nullish(),
  textColor: z.string().default('#ffffff').nullish(),
  textFontSize: z.number().default(12).nullish(),
  textFontWeight: z.number().default(400).nullish(),
  textAlign: z.enum(['left', 'right', 'center']).default('center').nullish(),
  textBaseline: z.enum(['top', 'middle', 'bottom']).default('top').nullish(),

  textBackgroundVisible: z.boolean().default(true).nullish(),
  textBackgroundColor: z.string().default('#191d24').nullish(),
  textBackgroundBorderColor: z.string().default('#191d24').nullish(),
  textBackgroundBorderWidth: z.number().default(1).nullish(),
  textBackgroundBorderRadius: z.number().default(4).nullish(),
  textBackgroundPadding: z.number().default(4).nullish(),

  areaColor: z.string().default('#888888').nullish(),
  areaColorOpacity: z.number().default(0.15).nullish(),
  areaBorderColor: z.string().default('#888888').nullish(),
  areaBorderWidth: z.number().default(1).nullish(),
  areaBorderRadius: z.number().default(4).nullish(),
  areaLineDash: z.array(z.number()).nullish(),

  outerPadding: z.number().default(4).nullish(),
})

export const zAnnotationArea = z.union([
  zAnnotationAreaStyle.extend({
    selector: z.union([zAreaSelector, zAreaSelectors]),
    range: z.never().optional(),
  }),
  zAnnotationAreaStyle.extend({
    selector: z.never().optional(),
    range: zAnnotationAreaRange,
  }),
])
