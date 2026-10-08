import { barLoop } from 'src/pipeline/spec/chart/pipes/animation/bar'
import { lineOrAreaLoop } from 'src/pipeline/spec/chart/pipes/animation/lineOrArea'
import { pieLoop } from 'src/pipeline/spec/chart/pipes/animation/pie'
import { radarLoop } from 'src/pipeline/spec/chart/pipes/animation/radar'
import { scatterLoop } from 'src/pipeline/spec/chart/pipes/animation/scatter'

describe.each([0, 750])('loop interval %i ms', (interval) => {
  test.each([false, true])('bar and area timelines preserve the interval after appear=%s', (afterAppear) => {
    const config = {
      enable: true,
      interval,
      loop: { enable: true, effects: ['growth' as const] },
      atmosphere: { color: 'red', effect: 'breath' as const },
    }
    const startTime = afterAppear ? interval : 0
    const bar = barLoop(config, afterAppear, 'vertical') as any
    expect(bar.bar[0]).toMatchObject({ startTime, delayAfter: interval + 1000, duration: 1000 })
    expect(bar.bar[1]).toMatchObject({ startTime, delay: 1000, delayAfter: interval, duration: 1000 })
    const area = lineOrAreaLoop(config, afterAppear) as any
    for (const mark of ['line', 'area']) {
      expect(area[mark][0]).toMatchObject({ startTime, delayAfter: interval + 1000, duration: 1000 })
      expect(area[mark][1]).toMatchObject({ startTime, delay: 1000, delayAfter: interval, duration: 1000 })
    }
    expect(area.point[0]).toMatchObject({ startTime, delayAfter: interval + 1000 })
  })

  test.each(['enlarge', 'relocate'] as const)('pie %s keeps both halves on a millisecond interval', (effect) => {
    for (const afterAppear of [false, true]) {
      const result = pieLoop({ enable: true, interval, loop: { effects: [effect] } }, afterAppear) as any
      for (const mark of ['pie', 'rose']) {
        expect(result[mark][0]).toMatchObject({ startTime: afterAppear ? interval : 0, delayAfter: 500 + interval })
        expect(result[mark][1]).toMatchObject({ startTime: afterAppear ? interval : 0, delayAfter: interval })
      }
    }
  })

  test.each(['growth', 'scale'] as const)('scatter %s preserves loop and atmosphere waits', (effect) => {
    for (const afterAppear of [false, true]) {
      const result = scatterLoop(
        {
          enable: true,
          interval,
          loop: { effects: [effect] },
          atmosphere: { effect: 'breath' },
        },
        afterAppear,
      ) as any
      for (const phase of result.point.slice(0, -1)) {
        expect(phase).toMatchObject({ startTime: afterAppear ? interval : 0, delayAfter: interval + 1000 })
      }
      expect(result.point.at(-1)).toMatchObject({ startTime: afterAppear ? interval : 0, delayAfter: interval })
    }
  })

  test.each([false, true])('radar atmosphere uses milliseconds after appear=%s', (afterAppear) => {
    const result = radarLoop({ enable: true, interval, atmosphere: { effect: 'breath' } }, afterAppear) as any
    expect(result.point).toMatchObject({ startTime: afterAppear ? interval : 0, delayAfter: interval, duration: 1000 })
  })
})

test('omitted intervals preserve the existing defaults', () => {
  const area = lineOrAreaLoop({ enable: true }, true) as any
  expect(area.line[0]).toMatchObject({ startTime: 5000, delayAfter: 5000, duration: 2000 })
  expect(area.point[0]).toMatchObject({ startTime: 5000, delayAfter: 7000 })
  const bar = barLoop({ enable: true, loop: { effects: ['growth'] } }, true, 'vertical') as any
  expect(bar.bar[0]).toMatchObject({ startTime: 0, delayAfter: 1000 })
  const pie = pieLoop({ enable: true, loop: { effects: ['enlarge'] } }, true) as any
  expect(pie.pie[1]).toMatchObject({ startTime: 0, delayAfter: 0 })
  const scatter = scatterLoop({ enable: true, atmosphere: { effect: 'breath' } }, true) as any
  expect(scatter.point[0]).toMatchObject({ startTime: 0, delayAfter: 0 })
  const radar = radarLoop({ enable: true, atmosphere: { effect: 'breath' } }, true) as any
  expect(radar.point).toMatchObject({ startTime: 0, delayAfter: 0 })
})
