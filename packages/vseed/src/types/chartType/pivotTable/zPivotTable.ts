import { z } from 'zod'
import { zLocale } from '../../i18n'
import {
  zBackgroundColor,
  zDataset,
  zTableDimension,
  zTheme,
  zTableMeasure,
  zBodyCellStyle,
  zPage,
  zPivotTableTotals,
  zTableLayout,
} from '../../properties'

export const zPivotTable = z.object({
  ...zTableLayout.shape,
  chartType: z.literal('pivotTable'),
  dataset: zDataset.nullish(),
  dimensions: z.array(zTableDimension).nullish(),
  measures: z.array(zTableMeasure).nullish(),
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

  indicatorsAsCol: z.boolean().nullish(),
  totals: zPivotTableTotals.nullish(),

  theme: zTheme.nullish(),
  locale: zLocale.nullish(),
})
