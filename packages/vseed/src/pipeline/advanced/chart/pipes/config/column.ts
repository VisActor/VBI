import { pick } from 'remeda'
import { replaceNullToUndefined } from 'src/pipeline/utils'
import type { AdvancedPipe, AdvancedVSeed, Config } from 'src/types'

export const columnConfig: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context
  const { chartType } = vseed
  const result = {
    ...advancedVSeed,
  }

  const pickedConfig = pick(vseed, [
    'backgroundColor',
    'color',
    'label',
    'legend',
    'regionPadding',
    'tooltip',
    'xAxis',
    'yAxis',
    'crosshairRect',
    'cornerRadius',
    'stackCornerRadius',
    'barMaxWidth',
    'barGapInGroup',
    'brush',
    'dimensionLinkage',
    'player',
    'animation',
  ]) as Config['column']

  const config = replaceNullToUndefined(pickedConfig)

  result.config = {
    ...result.config,
    [chartType]: {
      ...config,
    },
  }

  return result as AdvancedVSeed
}
