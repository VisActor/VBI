import type { ISpec } from '@visactor/vchart'
import type { VChartSpecPipe } from 'src/types'
import type { AnimationEffectConfig } from './types'

type Params = { appear?: AnimationEffectConfig; update?: AnimationEffectConfig; loop?: { enable?: boolean } }
type Phase = boolean | Record<string, unknown>

type AnimationStages<P extends Params> = {
  defaultAppear?: Record<string, unknown>
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
    const config = advancedVSeed.config[advancedVSeed.chartType] as {
      animation?: { enable?: boolean; params?: P }
    }
    const animation = config?.animation
    if (animation?.enable === false) return { ...spec, animation: false }

    const { appear, update, loop } = animation?.params ?? {}
    // Native morphing requires appear and update phases. Supply missing phases,
    // leaving authored effects and explicitly disabled phases authoritative.
    const updateConfig = update === undefined ? { enable: true } : update
    const animationUpdate = stages.update(updateConfig as P['update'], spec)
    const animationAppear =
      appear === undefined
        ? { ...stages.defaultAppear, duration: update?.duration ?? 1000, easing: update?.ease }
        : stages.appear(appear)
    return {
      ...spec,
      animation: true,
      animationAppear,
      animationNormal: stages.loop(loop, animationAppear !== false, spec),
      animationEnter: stages.enter ? stages.enter(updateConfig as P['update'], loop, spec) : animationUpdate,
      animationUpdate,
      animationExit: stages.exit(updateConfig as P['update']),
    } as Partial<ISpec>
  }
