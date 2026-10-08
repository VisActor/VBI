import { pick } from 'remeda'
import { replaceNullToUndefined } from 'src/pipeline/utils'
import type { AdvancedPipe, Donut } from 'src/types'

const presentationConfig =
  (keys: (keyof Donut)[]): AdvancedPipe =>
  (advancedVSeed, { vseed }) => ({
    ...advancedVSeed,
    config: {
      ...advancedVSeed.config,
      [vseed.chartType]: {
        ...advancedVSeed.config?.[vseed.chartType],
        ...replaceNullToUndefined(pick(vseed as Donut, keys)),
      },
    },
  })

export const pieStyleConfig = presentationConfig(['pieStyle'])
export const centerTextConfig = presentationConfig(['centerText'])
