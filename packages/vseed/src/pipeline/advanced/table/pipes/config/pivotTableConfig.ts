import { pick } from 'remeda'
import type { AdvancedPipe, Config } from 'src/types'

export const pivotTableConfig: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context
  const { chartType } = vseed
  const result = {
    ...advancedVSeed,
  }

  const config = pick(vseed, [
    'widthMode',
    'heightMode',
    'autoWrapText',
    'autoFillWidth',
    'rowHeight',
    'headerRowHeight',
    'backgroundColor',
    'bodyFontSize',
    'bodyFontColor',
    'bodyBackgroundColor',
    'headerFontSize',
    'headerFontColor',
    'headerBackgroundColor',
    'hoverHeaderBackgroundColor',
    'hoverHeaderInlineBackgroundColor',
    'selectedBorderColor',
    'selectedBackgroundColor',
    'totals',
  ]) as Config['pivotTable']

  result.config = {
    ...(result.config || {}),
    [chartType]: {
      ...config,
    },
  }

  return result
}
