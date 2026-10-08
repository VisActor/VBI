import { createAnimationPipe } from './createAnimationPipe'
import type { BarLikeAnimation, LineAreaAnimation, PieLikeAnimation, RadarAnimation, ScatterAnimation } from './types'
import { barAppear, barExit, barLoop, barUpdate } from './bar'
import { lineOrAreaAppear, lineOrAreaLoop, lineOrAreaUpdate } from './lineOrArea'
import { pieAppear, roseAppear, pieEnter, pieLoop, pieUpdate } from './pie'
import { radarAppear, radarLoop, radarUpdate } from './radar'
import { scatterAppear, scatterLoop, scatterUpdate } from './scatter'

const createBarAnimation = (direction: 'horizontal' | 'vertical') =>
  createAnimationPipe<NonNullable<BarLikeAnimation['params']>>({
    appear: (config) => barAppear(config, direction),
    loop: (config, afterAppear, spec) => barLoop(config, afterAppear, direction, spec),
    update: (config, spec) => barUpdate(config, direction, spec),
    exit: (config) => barExit(config, direction),
  })

export const barAnimation = createBarAnimation('horizontal')
export const columnAnimation = createBarAnimation('vertical')

export const lineAreaAnimation = createAnimationPipe<NonNullable<LineAreaAnimation['params']>>({
  appear: lineOrAreaAppear,
  loop: lineOrAreaLoop,
  update: lineOrAreaUpdate,
  exit: lineOrAreaUpdate,
})

const pieStages = {
  appear: pieAppear,
  loop: pieLoop,
  update: pieUpdate,
  enter: pieEnter,
  exit: pieUpdate,
}
export const pieAnimation = createAnimationPipe<NonNullable<PieLikeAnimation['params']>>(pieStages)
export const roseAnimation = createAnimationPipe<NonNullable<PieLikeAnimation['params']>>({
  ...pieStages,
  appear: roseAppear,
})

export const scatterAnimation = createAnimationPipe<NonNullable<ScatterAnimation['params']>>({
  appear: scatterAppear,
  loop: scatterLoop,
  update: scatterUpdate,
  exit: scatterUpdate,
})

export const radarAnimation = createAnimationPipe<NonNullable<RadarAnimation['params']>>({
  appear: radarAppear,
  loop: radarLoop,
  update: radarUpdate,
  exit: radarUpdate,
})
