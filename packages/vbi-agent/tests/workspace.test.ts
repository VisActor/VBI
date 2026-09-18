import { describe, expect, test } from '@rstest/core'
import { createBuilderWorkspace, createStaticBuilderSlot } from '../src/index'

describe('builder workspace helpers', () => {
  test('wraps a caller-provided builder as a workspace slot', async () => {
    const builder = { build: () => ({ chartType: 'line' }) }
    const slot = createStaticBuilderSlot(builder)

    await expect(slot.open()).resolves.toBe(builder)
    await expect(slot.snapshot?.()).resolves.toEqual({ dsl: { chartType: 'line' } })
  })

  test('creates a workspace from direct builder instances and explicit slots', async () => {
    const chartBuilder = { build: () => ({ chartType: 'bar' }) }
    const insightSlot = { open: async () => ({ build: () => ({ content: '' }) }) }

    const workspace = createBuilderWorkspace({
      chart: chartBuilder as never,
      insight: insightSlot as never,
    })

    await expect(workspace.chart?.snapshot?.()).resolves.toEqual({ dsl: { chartType: 'bar' } })
    await expect(workspace.insight?.open()).resolves.toMatchObject({ build: expect.any(Function) })
  })
})
