import { z } from 'zod'

export const zAnimation = z.object({
  enable: z.boolean().optional(),
  morph: z.boolean().optional(),
})

const createEffectConfig = <T extends readonly [string, ...string[]]>(effects: T) =>
  z.object({
    enable: z.boolean().optional(),
    effects: z.array(z.enum(effects)).optional(),
    ease: z.string().optional(),
    duration: z.number().optional(),
    color: z.string().optional(),
  })

const zLoopBase = {
  enable: z.boolean().optional(),
  interval: z.number().optional(),
}
const zPointAtmosphere = z.object({
  ease: z.string().optional(),
  color: z.string().optional(),
  effect: z.enum(['ripple', 'reveal', 'breath']).optional(),
})
const zNoEffectAtmosphere = z.object({
  ease: z.string().optional(),
  color: z.string().optional(),
})

const createAnimation = <
  A extends readonly [string, ...string[]],
  U extends readonly [string, ...string[]],
  L extends readonly [string, ...string[]],
>(config: {
  appear: A
  update: U
  loop?: L
  atmosphere?: typeof zPointAtmosphere | typeof zNoEffectAtmosphere
}) =>
  zAnimation.extend({
    params: z
      .object({
        appear: createEffectConfig(config.appear).optional(),
        update: createEffectConfig(config.update).optional(),
        loop: z
          .object({
            ...zLoopBase,
            ...(config.loop ? { loop: createEffectConfig(config.loop).optional() } : {}),
            ...(config.atmosphere ? { atmosphere: config.atmosphere.optional() } : {}),
          })
          .optional(),
      })
      .optional(),
  })

export const zBarLikeAnimation = createAnimation({
  appear: ['growth'],
  update: ['growth', 'moveIn'],
  loop: ['highLight', 'growth', 'moveIn', 'none'],
  atmosphere: zPointAtmosphere,
})

export const zLineAreaAnimation = createAnimation({
  appear: ['load', 'growth'],
  update: ['growth'],
  loop: ['load', 'growth', 'none'],
  atmosphere: zPointAtmosphere,
})

export const zScatterAnimation = createAnimation({
  appear: ['growth', 'scale'],
  update: ['growth'],
  loop: ['growth', 'scale', 'none'],
  atmosphere: zPointAtmosphere,
})

export const zPieLikeAnimation = createAnimation({
  appear: ['radial', 'scale'],
  update: ['radial'],
  loop: ['enlarge', 'relocate'],
  atmosphere: zNoEffectAtmosphere,
})

export const zRadarAnimation = createAnimation({
  appear: ['radial', 'scale'],
  update: ['growth'],
  atmosphere: zPointAtmosphere,
})
