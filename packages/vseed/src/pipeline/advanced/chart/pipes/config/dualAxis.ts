import { pick } from 'remeda'
import { replaceNullToUndefined } from 'src/pipeline/utils'
import type { AdvancedPipe, AdvancedVSeed, Config } from 'src/types'

export const dualAxisConfig: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context
  const { chartType } = vseed
  const result = {
    ...advancedVSeed,
  }

  const pickedConfig = pick(vseed, [
    // common
    'backgroundColor',
    'color',
    'label',
    'legend',
    'tooltip',
    'xAxis',

    // only for dualAxis
    'alignTicks',
    'primaryYAxis',
    'secondaryYAxis',
    'crosshairLine',
    'crosshairRect',

    'barGapInGroup',
    'barMaxWidth',
    'cornerRadius',
    'stackCornerRadius',

    'dimensionLinkage',
  ]) as Config['dualAxis']

  const config = replaceNullToUndefined(pickedConfig)

  result.config = {
    ...result.config,
    [chartType]: {
      ...config,
    },
  }

  return result as AdvancedVSeed
}
