import { beforeAll, describe, expect, test } from 'vitest'
import { Builder, registerAll } from 'src/builder'
import { zLabel, zPieLabel } from 'src/types'
import type { Label, VSeed } from 'src/types'

beforeAll(registerAll)

const dataset = [{ source: 'A', target: 'B', value: 12 }]
const seeds = [
  ...(['column', 'bar', 'line', 'pie'] as const).map((chartType) => ({
    chartType,
    dataset,
    dimensions: [{ id: 'source' }],
    measures: [{ id: 'value' }],
  })),
  {
    chartType: 'sankey',
    dataset,
    dimensions: [
      { id: 'source', encoding: 'source' },
      { id: 'target', encoding: 'target' },
    ],
    measures: [{ id: 'value' }],
  },
  {
    chartType: 'hierarchySankey',
    dataset,
    dimensions: [{ id: 'source' }, { id: 'target' }],
    measures: [{ id: 'value' }],
  },
] satisfies VSeed[]

describe.each(seeds)('$chartType label presentation', (seed) => {
  const build = (label: Label) => (Builder.from({ ...seed, label }).build() as any).label

  test('preserves defaults including the smart-invert outline', () => {
    const label = build({ enable: true, labelColorSmartInvert: false })
    expect(label).not.toHaveProperty('animation')
    expect(label.style).not.toHaveProperty('lineWidth')
    expect(build({ enable: true, labelColorSmartInvert: true }).style.lineWidth).toBe(2)
  })

  test('allows disabling animation and removing the smart-invert outline', () => {
    expect(
      build({ enable: true, labelAnimation: false, labelColorSmartInvert: true, labelStrokeWidth: 0 }),
    ).toMatchObject({ animation: false, smartInvert: true, style: { lineWidth: 0 } })
    expect(build({ enable: true, labelAnimation: true, labelStrokeWidth: 3 })).toMatchObject({
      animation: true,
      style: { lineWidth: 3 },
    })
  })

  test('keeps disabled labels hidden', () => {
    expect(build({ enable: false, labelAnimation: false, labelStrokeWidth: 0 })).toEqual({ visible: false })
  })
})

test('keeps label options in common and pie schemas', () => {
  for (const schema of [zLabel, zPieLabel]) {
    expect(schema.parse({ enable: true, labelAnimation: false, labelStrokeWidth: 0 })).toMatchObject({
      labelAnimation: false,
      labelStrokeWidth: 0,
    })
    expect(schema.safeParse({ enable: true, labelStrokeWidth: -1 }).success).toBe(false)
  }
})
