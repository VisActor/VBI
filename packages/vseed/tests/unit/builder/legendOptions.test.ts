import VChart from '@visactor/vchart'
import { Builder, registerAll } from 'src/builder'
import { zLegend, type Legend } from 'src/types'
import { discreteLegend } from 'src/pipeline/spec/chart/pipes/legend/discreteLegend'
import { pivotDiscreteLegend } from 'src/pipeline/spec/chart/pipes/legend/pivotDiscreteLegend'

beforeAll(registerAll)

const build = (legend: Legend = {}, pivot = false) =>
  Builder.from({
    chartType: 'donut',
    dataset: [
      { category: 'A', value: 40 },
      { category: 'B', value: 60 },
    ],
    dimensions: [{ id: 'category', encoding: pivot ? 'row' : 'color' }],
    measures: [{ id: 'value', encoding: 'angle' }],
    label: { enable: false },
    animation: { enable: false },
    legend,
  }).build<any>()

describe('discrete legend interaction', () => {
  test('composing a legend pipe without its configuration preserves the incoming spec', () => {
    const vseed = { chartType: 'donut' as const, dataset: [{ category: 'A', value: 1 }] }
    const advancedVSeed = Builder.from(vseed).buildAdvanced()
    const spec = { width: 320, height: 240 }
    for (const config of [undefined, {}, { color: {} }]) {
      const context = { vseed, advancedVSeed: { ...advancedVSeed, config: { donut: config } } }
      expect(discreteLegend(spec, context)).toEqual(spec)
      expect(pivotDiscreteLegend(spec, context)).toEqual(spec)
    }
    expect(
      pivotDiscreteLegend(spec, { vseed, advancedVSeed: { ...advancedVSeed, config: { donut: { legend: {} } } } }),
    ).toEqual(spec)
  })

  const normalize = (legend: any) => ({
    ...legend,
    item: {
      ...legend.item,
      shape: {
        ...legend.item.shape,
        style:
          typeof legend.item.shape.style === 'function'
            ? legend.item.shape.style({ shape: { fill: 'red' } })
            : legend.item.shape.style,
      },
    },
  })

  test.each([false, true])('disabling interaction changes no presentation in pivot=%s', (pivot) => {
    const options: Legend = { shapeType: 'circle', border: false, labelFontSize: 10, position: 'bottom' }
    const normal = normalize(build(options, pivot).legends)
    const staticLegend = normalize(build({ ...options, interactive: false }, pivot).legends)
    expect(staticLegend).toEqual({
      ...normal,
      interactive: false,
      select: false,
      hover: false,
      item: { ...normal.item, focus: false },
    })
    expect(normal).toMatchObject({ item: { focus: true } })
    for (const key of ['interactive', 'select', 'hover']) expect(normal).not.toHaveProperty(key)
    expect(normalize(build({ ...options, interactive: true }, pivot).legends)).toEqual(normal)
    expect(build({ enable: false, interactive: false }, pivot).legends).toEqual(pivot ? [] : { visible: false })
  })

  test.each(
    [false, true].flatMap((pivot) =>
      [false, true].flatMap((border) => [10, 12, 18].map((labelFontSize) => ({ pivot, border, labelFontSize }))),
    ),
  )('preserves existing legend sizing and spacing: %j', ({ pivot, border, labelFontSize }) => {
    const legend = normalize(build({ border, labelFontSize }, pivot).legends)
    expect(legend).toMatchObject({
      padding: 0,
      item: {
        focus: true,
        maxWidth: '30%',
        shape: { space: border ? 6 : 4, style: { size: border ? 8 : 10, symbolType: 'rectRound' } },
        label: { style: { fontSize: labelFontSize } },
      },
    })
    expect(legend.space).toBeUndefined()
    expect(legend.item.spaceCol).toBeUndefined()
    expect(legend.item.spaceRow).toBeUndefined()
    if (!pivot) {
      expect(legend.item.shape.style).toMatchObject({ fillOpacity: 1, opacity: 1, stroke: false })
      expect(legend.item.shape.style.outerBorder).toEqual(border ? { stroke: 'red', distance: 3, lineWidth: 1 } : null)
    }
  })

  test.each(['top', 'bottom', 'left', 'right'] as const)('pivot keeps its existing zero padding at %s', (position) => {
    expect(build({ position }, true).legends.padding).toBe(0)
  })

  test('schema exposes the interaction choice without layout tuning fields', () => {
    const config = { interactive: false, labelFontSize: 10 }
    expect(zLegend.parse(config)).toMatchObject(config)
    expect(zLegend.safeParse({ interactive: 'false' }).success).toBe(false)
    for (const key of ['shapeSize', 'shapeGap', 'itemGap', 'itemMaxWidth', 'chartGap']) {
      expect(zLegend.shape).not.toHaveProperty(key)
    }
  })

  test('static legend events do not filter chart data', async () => {
    const element = document.createElement('div')
    document.body.append(element)
    const spec = { ...build({ interactive: false, border: false }), width: 320, height: 240 }
    const chart = new VChart(spec, { dom: element })
    try {
      chart.renderSync()
      const legend = chart
        .getChart()!
        .getAllComponents()
        .find((component) => component.type === 'discreteLegend') as any
      expect(legend).toBeDefined()
      const click = (component: any) => {
        const items = component._legendComponent._itemsContainer
        const target = items.find((node: any) => !!node.delegate && node.name?.startsWith('legend'), true)
        expect(target).toBeDefined()
        expect(items.listenerCount('pointerdown')).toBe(component.getSpec().select !== false ? 1 : 0)
        if (component.getSpec().select !== false) component._legendComponent._onClick({ target })
        else items.emit('pointerdown', { target })
      }
      click(legend)
      expect(chart.getChart()!.getAllSeries()[0].getViewData()!.latestData).toHaveLength(2)
      await chart.updateSpec({ ...build({ border: false }), width: 320, height: 240 })
      const interactive = chart
        .getChart()!
        .getAllComponents()
        .find((component) => component.type === 'discreteLegend') as any
      expect(interactive.getSpec().select).not.toBe(false)
      click(interactive)
      expect(chart.getChart()!.getAllSeries()[0].getViewData()!.latestData).toHaveLength(1)
    } finally {
      chart.release()
      element.remove()
    }
  })
})
