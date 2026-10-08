import { Builder, registerAll } from 'src/builder'
import type { VSeed } from 'src/types'
import { zVSeed } from 'src/types/zVseed'

beforeAll(registerAll)

const families = [
  ['column', ['bar']],
  ['bar', ['bar']],
  ['columnParallel', ['bar']],
  ['barPercent', ['bar']],
  ['line', ['line', 'area', 'point']],
  ['area', ['line', 'area', 'point']],
  ['areaPercent', ['line', 'area', 'point']],
  ['pie', ['pie', 'rose']],
  ['donut', ['pie', 'rose']],
  ['rose', ['pie', 'rose']],
  ['roseParallel', ['pie', 'rose']],
  ['scatter', ['point']],
  ['radar', []],
] as const

const seed = (chartType: string, animation: object): VSeed =>
  ({
    chartType,
    dataset: [
      { category: 'A', value: 10 },
      { category: 'B', value: 20 },
    ],
    dimensions: [{ id: 'category' }],
    measures: [{ id: 'value' }],
    animation,
  }) as VSeed

describe('composed data update animations', () => {
  test.each(families)('%s defaults data enter, update and exit to 1000 milliseconds', (type, marks) => {
    const spec = Builder.from(seed(type, { enable: true, params: { update: { enable: true } } })).build<any>()
    for (const stage of ['animationEnter', 'animationUpdate', 'animationExit']) {
      for (const timing of marks.length ? marks.map((mark) => spec[stage][mark]) : [spec[stage]]) {
        expect(timing.duration).toBe(1000)
      }
    }
  })

  test.each(families)('%s shares timing across enter, update and exit without an effect', (type, marks) => {
    const dsl = seed(type, {
      enable: true,
      params: { appear: { enable: false }, update: { enable: true, duration: 600, ease: 'cubicInOut' } },
    })
    expect(zVSeed.safeParse(dsl).success).toBe(true)
    const spec = Builder.from(dsl).build<any>()
    expect(spec.animationAppear).toBe(false)
    expect(spec.animationNormal).toBe(false)
    for (const stage of ['animationEnter', 'animationUpdate', 'animationExit']) {
      const phase = spec[stage]
      for (const timing of marks.length ? marks.map((mark) => phase[mark]) : [phase]) {
        expect(timing).toMatchObject({ duration: 600, easing: 'cubicInOut' })
      }
    }
  })

  test.each(families)('%s preserves zero duration and disables unrequested phases', (type, marks) => {
    for (const enabled of [false, true]) {
      const spec = Builder.from(
        seed(type, { enable: true, params: { update: { enable: enabled, duration: 0 } } }),
      ).build<any>()
      for (const stage of ['animationEnter', 'animationUpdate', 'animationExit']) {
        if (!enabled) expect(spec[stage]).toBe(false)
        else
          for (const timing of marks.length ? marks.map((mark) => spec[stage][mark]) : [spec[stage]])
            expect(timing.duration).toBe(0)
      }
    }
    expect(Builder.from(seed(type, { enable: false })).build<any>().animation).toBe(false)
  })

  test.each(['column', 'bar'] as const)('%s moveIn exits reverse direction with the configured timing', (type) => {
    const spec = Builder.from(
      seed(type, {
        enable: true,
        params: { update: { enable: true, effects: ['moveIn'], duration: 250, ease: 'linear' } },
      }),
    ).build<any>()
    expect(spec.animationUpdate.bar).toMatchObject({ type: 'moveIn', duration: 250 })
    expect(spec.animationExit.bar).toMatchObject({
      type: 'moveOut',
      duration: 250,
      easing: 'linear',
      options: { direction: type === 'bar' ? 'y' : 'x' },
    })
    expect(spec.bar.style.cornerRadius).toBeTypeOf('function')
    expect(spec.stackCornerRadius).toBeUndefined()
  })

  test('rose radial appear is composed without changing pie appear', () => {
    const animation = { enable: true, params: { appear: { enable: true, effects: ['radial'] } } }
    expect(Builder.from(seed('rose', animation)).build<any>().animationAppear.preset).toBe('growAngle')
    expect(Builder.from(seed('pie', animation)).build<any>().animationAppear.preset).toBeUndefined()
  })

  test('default updates take 1000 milliseconds and pie enter retains loop compatibility', () => {
    const spec = Builder.from(
      seed('donut', {
        enable: true,
        params: { update: { enable: true }, loop: { enable: true, loop: { effects: ['enlarge'] } } },
      }),
    ).build<any>()
    expect(spec.animationEnter.rose).toMatchObject({ type: 'fadeIn', duration: 1000 })
    expect(spec.animationExit.pie.duration).toBe(1000)
  })
})

describe.each([0, 0.5, 625])('appear duration %s milliseconds', (duration) => {
  test.each([
    ['column', 'growth', ['bar']],
    ['line', 'growth', ['line', 'area', 'point']],
    ['pie', 'radial', ['pie', 'rose']],
    ['rose', 'radial', ['pie', 'rose']],
    ['scatter', 'scale', ['point']],
    ['radar', 'radial', []],
  ] as const)('%s preserves the configured duration', (type, effect, marks) => {
    const spec = Builder.from(
      seed(type, { enable: true, params: { appear: { enable: true, effects: [effect], duration } } }),
    ).build<any>()
    const appear = spec.animationAppear
    const timelines = marks.length ? marks.map((mark) => appear[mark]).flat() : [appear]
    for (const timing of timelines) expect(timing.duration).toBe(duration)
  })
})
