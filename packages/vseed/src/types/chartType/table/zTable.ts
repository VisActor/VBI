import { z } from 'zod'
import { zLocale } from '../../i18n'
import {
  zBackgroundColor,
  zBodyCellStyle,
  zDataset,
  zTableDimensionTree,
  zTableMeasureTree,
  zTheme,
  zTotalType,
  zTableLayout,
} from '../../properties'
import { zPage } from '../../properties/page'
export const zTable = z.object({
  ...zTableLayout.shape,
  chartType: z.literal('table'),
  dataset: zDataset.nullish(),
  dimensions: zTableDimensionTree.nullish(),
  measures: zTableMeasureTree.nullish(),
  page: zPage.nullish(),

  backgroundColor: zBackgroundColor.nullish(),
  borderColor: z.string().nullish(),
  bodyFontSize: z.number().nullish(),
  bodyFontColor: z.string().nullish(),
  bodyBackgroundColor: z.string().nullish(),
  hoverBodyBackgroundColor: z.string().nullish(),
  hoverBodyInlineBackgroundColor: z.string().nullish(),
  headerFontSize: z.number().nullish(),
  headerFontColor: z.string().nullish(),
  headerBackgroundColor: z.string().nullish(),
  hoverHeaderBackgroundColor: z.string().nullish(),
  hoverHeaderInlineBackgroundColor: z.string().nullish(),
  selectedBorderColor: z.string().nullish(),
  selectedBackgroundColor: z.string().nullish(),
  bodyCellStyle: z.array(zBodyCellStyle).or(zBodyCellStyle).nullish(),

  totals: zTotalType.nullish(),
  emptyCellText: z.string().nullish(),

  theme: zTheme.nullish(),
  locale: zLocale.nullish(),
})
