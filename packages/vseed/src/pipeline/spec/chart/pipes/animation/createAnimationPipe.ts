import type { ISpec } from '@visactor/vchart'
import type { VChartSpecPipe } from 'src/types'
import type { AnimationEffectConfig } from './types'
import { allowAnimation } from './utils'

type Params = { appear?: AnimationEffectConfig; update?: AnimationEffectConfig; loop?: { enable?: boolean } }
type Phase = boolean | Record<string, unknown>

type AnimationStages<P extends Params> = {
  appear: (config: P['appear']) => Phase
  loop: (config: P['loop'], afterAppear: boolean, spec: Partial<ISpec>) => Phase
  update: (config: P['update'], spec: Partial<ISpec>) => Phase
  enter?: (config: P['update'], loop: P['loop'], spec: Partial<ISpec>) => Phase
  exit: (config: P['update']) => Phase
}

/** Compose a chart family's animation phases without dispatching on chart type. */
export const createAnimationPipe =
  <P extends Params>(stages: AnimationStages<P>): VChartSpecPipe =>
  (spec, { advancedVSeed }) => {
    const config = advancedVSeed.config[advancedVSeed.chartType] as { animation?: { enable?: boolean; params?: P } }
    const animation = config?.animation
    if (!animation?.enable) return { ...spec, animation: false }

    const { appear, update, loop } = animation.params ?? {}
    const animationUpdate = stages.update(update, spec)
    return {
      ...spec,
      animation: true,
      animationAppear: stages.appear(appear),
      animationNormal: stages.loop(loop, allowAnimation(appear), spec),
      animationEnter: stages.enter ? stages.enter(update, loop, spec) : animationUpdate,
      animationUpdate,
      animationExit: stages.exit(update),
    } as Partial<ISpec>
  }
