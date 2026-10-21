import type { IPieChartSpec, ISpec } from '@visactor/vchart'
import { DimensionKey } from 'src/dataReshape'
import type { Animation, VChartSpecPipe } from 'src/types'
import type { PieLikeAnimation } from './types'

type AnimationConfig = { animation?: Animation }

type MorphSpec = { morph?: { enable?: boolean; morphElementKey?: string } }

/** Consume reshape identity and configuration without scanning or copying data. */
export const animationMorph: VChartSpecPipe = (spec, { advancedVSeed }) => {
  const { animation } = advancedVSeed.config[advancedVSeed.chartType] as AnimationConfig
  // An explicitly undefined property in a partial DSL must not erase the theme default.
  const theme = advancedVSeed.customTheme?.config?.[advancedVSeed.chartType] as AnimationConfig | undefined
  return {
    ...spec,
    ...(animation?.enable === false ? { animation: false } : {}),
    morph: { enable: animation?.morph ?? theme?.animation?.morph, morphElementKey: DimensionKey },
  } as ISpec
}

export const pieAnimationMorph: VChartSpecPipe = (spec, context) => {
  const result = animationMorph(spec, context) as IPieChartSpec & MorphSpec
  // VChart clamps non-positive sectors to zero angle. Generic path conversion
  // can turn those degenerate arcs into full circles. Reuse fold statistics;
  // preserve all data and use native fade only for this case.
  const { advancedVSeed } = context
  if (advancedVSeed.datasetReshapeInfo[0].foldInfo.statistics.min > 0) return result
  result.morph = { ...result.morph, enable: false }
  const { animation } = advancedVSeed.config[advancedVSeed.chartType] as { animation?: PieLikeAnimation }
  if (result.animation !== false && animation?.params?.appear === undefined) {
    result.animationAppear = { ...(result.animationAppear as object), preset: 'fadeIn' }
  }
  return result
}
