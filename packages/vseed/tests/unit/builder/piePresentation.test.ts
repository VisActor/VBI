import VChart from '@visactor/vchart'
import { Builder, registerAll, registerCustomTheme } from 'src/builder'
import { zCenterText, zCustomThemeConfig, zDonut, zPie, zScatterConfig, type Donut, type VSeed } from 'src/types'
import { zRacePieConfig, zRaceDonutConfig } from 'src/types/properties/config/race'
import { pieStyle } from 'src/pipeline/spec/chart/pipes/markStyle/pieStyle'
import { pieHover } from 'src/pipeline/spec/chart/pipes/markStyle/pieHover'

beforeAll(registerAll)

const seed = (options: Partial<Donut> = {}): Donut => ({
  chartType: 'donut',
  dataset: [
    { category: '消费者', share: 60 },
    { category: '其他客户', share: 40 },
  ],
  dimensions: [{ id: 'category', encoding: 'color' }],
  measures: [{ id: 'share', encoding: 'angle' }],
  label: { enable: false },
  animation: { enable: false },
  ...options,
})
const build = (options: Partial<Donut> = {}) => Builder.from(seed(options)).build<any>()

describe('pie presentation', () => {
  test.each(['pie', 'donut', 'racePie', 'raceDonut'] as const)(
    '%s preserves its existing radii, borders and hover enlargement',
    (chartType) => {
      const spec = Builder.from({ ...seed(), chartType } as VSeed).build<any>()
      expect(spec.outerRadius).toBe(0.8)
      expect(spec.innerRadius).toBe(chartType.toLowerCase().includes('donut') ? 0.8 * 0.8 : 0)
      expect(spec.pie.state.hover).toEqual({ outerRadius: 0.8 * 1.1 })
      expect(spec.startAngle).toBeUndefined()
      expect(spec.endAngle).toBeUndefined()
      expect(spec.pie.style.cornerRadius).toBeUndefined()
      expect(spec.pie.style.lineWidth).toBe(1)
      expect(spec.indicator).toBeUndefined()
    },
  )

  test('geometry, appearance and center text survive serialization and schema validation', () => {
    const dsl = seed({
      outerRadius: 0.98,
      innerRadius: 0.74,
      startAngle: -115,
      endAngle: 245,
      pieStyle: { pieBorderWidth: 0, pieBorderColor: 'red', pieCornerRadius: 0, pieHoverEffect: 'opacity' },
      centerText: {
        titleText: 0,
        subTitleText: '消费者',
      },
    })
    const parsed = zDonut.parse(JSON.parse(JSON.stringify(dsl)))
    const spec = Builder.from(parsed as Donut).build<any>()
    expect(spec).toMatchObject({ outerRadius: 0.98, innerRadius: 0.74, startAngle: -115, endAngle: 245 })
    expect(spec.pie).toMatchObject({
      style: { lineWidth: 0, stroke: 'red', cornerRadius: 0 },
      state: { hover: { fillOpacity: 0.75 } },
    })
    expect(spec.pie.state.hover.outerRadius).toBeUndefined()
    expect(spec.indicator).toMatchObject({
      visible: true,
      fixed: true,
      trigger: 'none',
      limitRatio: 0.74,
      title: { autoLimit: true, style: { text: 0, fontSize: 18, fontWeight: 600 } },
      content: { autoLimit: true, style: { text: '消费者', fontSize: 12 } },
    })
    expect(zPie.parse({ ...dsl, chartType: 'pie' })).toMatchObject({ outerRadius: 0.98, pieStyle: dsl.pieStyle })
  })

  test('radius and angle defaults resolve independently of the chart initializer', () => {
    expect(build({ outerRadius: 0.5 }).innerRadius).toBeCloseTo(0.4)
    expect(build({ startAngle: 0 })).toMatchObject({ startAngle: 0, endAngle: 360 })
    expect(build({ endAngle: 90 })).toMatchObject({ startAngle: -90, endAngle: 90 })
    expect(build({ innerRadius: 0 })).toMatchObject({ innerRadius: 0 })
  })

  test.each([
    { outerRadius: 0 },
    { outerRadius: 1.1 },
    { innerRadius: -1 },
    { innerRadius: 0.9, outerRadius: 0.8 },
    { innerRadius: 0.8 },
    { startAngle: 0, endAngle: 0 },
    { startAngle: 0, endAngle: 361 },
  ])('rejects invalid geometry %j at the build boundary', (options) => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => {})
    try {
      expect(() => build(options)).toThrow(/Pie (radii|angle)/)
    } finally {
      log.mockRestore()
    }
  })

  test('schema rejects invalid visual values', () => {
    for (const options of [
      { outerRadius: 2 },
      { pieStyle: { pieBorderWidth: -1 } },
      { pieStyle: { pieHoverEffect: 'invalid' } },
      { centerText: { titleText: { text: '42' } } },
    ])
      expect(zDonut.safeParse(seed(options as Partial<Donut>)).success).toBe(false)
  })

  test('hover choices and optional center text need no presentation tuning', () => {
    expect(build({ pieStyle: { pieHoverEffect: 'none' } }).pie.state.hover).toEqual({})
    expect(build({ pieStyle: { pieHoverEffect: 'opacity' } }).pie.state.hover).toEqual({ fillOpacity: 0.75 })
    expect(build({ pieStyle: { pieHoverEffect: 'enlarge' } }).pie.state.hover.outerRadius).toBe(0.8 * 1.1)
    expect(build().indicator).toBeUndefined()
    expect(build({ centerText: { subTitleText: '—' } }).indicator.title.visible).toBe(false)
    expect(build({ centerText: { titleText: '42' } }).indicator.content.visible).toBe(false)
    expect(build({ centerText: { titleText: 0 } }).indicator.title).toMatchObject({ visible: true, style: { text: 0 } })
  })

  test.each(['light', 'dark'])('center text inherits %s theme colors', (theme) => {
    const builder = Builder.from(seed({ theme, centerText: { titleText: '42', subTitleText: '消费者' } }))
    const config = builder.buildAdvanced().config.donut!
    const spec = builder.build<any>()
    expect(spec.indicator.title.style.fill).toBe(config.legend!.labelColor)
    expect(spec.indicator.content.style.fill).toBe(config.legend!.labelColor)
  })

  test.each(['light', 'dark'])('%s provides presentation defaults before building a spec', (theme) => {
    const registered = zCustomThemeConfig.parse(Builder.getTheme(theme)).config!
    for (const chartType of ['pie', 'donut', 'racePie', 'raceDonut'] as const) {
      const builder = Builder.from({ ...seed({ theme }), chartType } as VSeed)
      const config = builder.buildAdvanced().config[chartType]!
      expect(config).toMatchObject({
        outerRadius: registered[chartType]!.outerRadius,
        innerRadius: registered[chartType]!.innerRadius,
        pieStyle: { pieHoverEffect: 'enlarge' },
        legend: { interactive: true },
      })
      expect(config.pieStyle?.pieBorderWidth).toBeUndefined()
      expect(config.startAngle).toBeUndefined()
      expect(config.endAngle).toBeUndefined()
      expect(builder.build<any>().indicator).toBeUndefined()
    }
    expect(registered.donut!.centerText).toMatchObject({
      titleFontSize: 18,
      titleFontWeight: 600,
      subTitleFontSize: 12,
      subTitleOpacity: 0.75,
      gap: 2,
    })
    expect(Object.keys(zCenterText.shape)).toEqual(['titleText', 'subTitleText'])
    expect(build({ theme, centerText: {} }).indicator).toBeUndefined()
  })

  test.each([false, true])('theme geometry and typography apply with only text in the DSL, pivot=%s', (pivot) => {
    registerCustomTheme('donut-defaults-test', ({ darkTheme }) => ({
      ...darkTheme,
      config: {
        ...darkTheme.config,
        donut: {
          ...darkTheme.config!.donut,
          outerRadius: 0.8,
          innerRadius: 0.4,
          startAngle: 10,
          endAngle: 190,
          legend: { ...darkTheme.config!.donut!.legend, interactive: false },
          pieStyle: { pieHoverEffect: 'none', pieBorderWidth: 0 },
          centerText: {
            ...darkTheme.config!.donut!.centerText,
            titleFontSize: 24,
            titleFontWeight: 500,
            subTitleFontSize: 10,
            subTitleOpacity: 0,
            gap: 0,
          },
        },
      },
    }))
    const spec = build({
      theme: 'donut-defaults-test',
      dimensions: [{ id: 'category', encoding: pivot ? 'row' : 'color' }],
      centerText: { titleText: 0, subTitleText: '消费者' },
      outerRadius: 0.4,
      startAngle: 30,
    })
    const chart = pivot ? spec.indicators[0].chartSpec : spec
    expect(chart).toMatchObject({ outerRadius: 0.4, innerRadius: 0.2, startAngle: 30, endAngle: 210 })
    expect(chart.pie).toMatchObject({ style: { lineWidth: 0 }, state: { hover: {} } })
    expect(chart.indicator).toMatchObject({
      limitRatio: 0.2,
      title: { style: { text: 0, fontSize: 24, fontWeight: 500 } },
      content: { style: { text: '消费者', fontSize: 10, fillOpacity: 0 } },
      gap: 0,
    })
    expect(spec.legends).toMatchObject({ interactive: false, select: false, hover: false })
    expect(Builder.getTheme('donut-defaults-test').config!.donut).toMatchObject({
      outerRadius: 0.8,
      innerRadius: 0.4,
      startAngle: 10,
      endAngle: 190,
    })
  })

  test.each(['pie', 'donut', 'racePie', 'raceDonut'] as const)(
    '%s preserves adaptive borders with legacy themes',
    (chartType) => {
      registerCustomTheme('legacy-pie-test', {
        config: { [chartType]: { backgroundColor: '#123456', cornerRadius: 5 } },
      })
      for (const theme of ['light', 'dark', 'legacy-pie-test', 'unregistered-pie-test']) {
        for (const count of [30, 31]) {
          const spec = Builder.from({
            ...seed({ theme }),
            chartType,
            dataset: Array.from({ length: count }, (_, index) => ({ category: `${index}`, share: 1 })),
          } as VSeed).build<any>()
          expect(spec.pie.style.lineWidth).toBe(count <= 30 ? 1 : 0)
          expect(spec.pie.state.hover).toEqual({ outerRadius: 0.8 * 1.1 })
          expect(spec.pie.style.stroke).toBe(
            theme === 'legacy-pie-test' ? '#123456' : theme === 'unregistered-pie-test' ? '#ffffff' : 'transparent',
          )
          expect(spec.pie.style.cornerRadius).toBe(theme === 'legacy-pie-test' ? 5 : undefined)
          expect(spec.indicator).toBeUndefined()
        }
      }
    },
  )

  test('explicit border width overrides the adaptive default in the theme or DSL', () => {
    registerCustomTheme('dense-pie-test', { config: { donut: { pieStyle: { pieBorderWidth: 2 } } } })
    const dataset = Array.from({ length: 31 }, (_, index) => ({ category: `${index}`, share: 1 }))
    expect(build({ dataset }).pie.style.lineWidth).toBe(0)
    expect(build({ dataset, theme: 'dense-pie-test' }).pie.style.lineWidth).toBe(2)
    expect(build({ dataset, theme: 'dense-pie-test', pieStyle: { pieBorderWidth: 0 } }).pie.style.lineWidth).toBe(0)
    expect(build({ dataset, pieStyle: { pieBorderWidth: 1 } }).pie.style.lineWidth).toBe(1)
  })

  test('race theme schemas retain every existing field and validator', () => {
    for (const schema of [zRacePieConfig, zRaceDonutConfig]) {
      for (const [key, validator] of Object.entries(zScatterConfig.shape)) {
        expect(schema.shape[key as keyof typeof zScatterConfig.shape]).toBe(validator)
      }
      const legacy = {
        xAxis: { enable: false },
        yAxis: { enable: false },
        size: [4, 20],
        sizeRange: 8,
        annotation: {},
        regressionLine: {},
        dimensionLinkage: {},
        animation: { enter: { type: 'grow' } },
      }
      expect(schema.parse(legacy)).toEqual(zScatterConfig.parse(legacy))
    }
  })

  test('appearance and hover pipes preserve fallbacks when composed without a theme or radius', () => {
    const vseed = seed()
    const advancedVSeed = { ...Builder.from(vseed).buildAdvanced(), config: {} }
    const context = { vseed, advancedVSeed }
    const spec = pieStyle({ width: 200 }, context)
    expect(spec).toEqual({ width: 200, pie: { style: { stroke: '#ffffff', lineWidth: 1 } } })
    expect(pieHover(spec, context)).toEqual(spec)
  })

  test('explicit presentation overrides theme defaults, including zero values', () => {
    registerCustomTheme('pie-presentation-test', ({ lightTheme }) => ({
      ...lightTheme,
      config: {
        ...lightTheme.config,
        donut: {
          ...lightTheme.config!.donut,
          outerRadius: 0.9,
          startAngle: 0,
          endAngle: 360,
          pieStyle: { pieBorderWidth: 3, pieCornerRadius: 8, pieHoverEffect: 'enlarge' },
          label: { ...lightTheme.config!.donut!.label, labelColor: 'red' },
          centerText: { titleText: 'Theme' },
        },
      },
    }))
    const spec = build({
      theme: 'pie-presentation-test',
      pieStyle: { pieBorderWidth: 0 },
      centerText: { titleText: 'DSL' },
    })
    expect(spec).toMatchObject({ outerRadius: 0.9, startAngle: 0, endAngle: 360 })
    expect(spec.pie.style).toMatchObject({ lineWidth: 0, cornerRadius: 8 })
    expect(spec.pie.state.hover).toEqual({ outerRadius: 0.9 * 1.1 })
    expect(spec.indicator.title.style).toMatchObject({ text: 'DSL', fill: 'red' })
  })

  test('pivot donut cells compose the same presentation pipes', () => {
    const spec = build({
      dimensions: [{ id: 'category', encoding: 'row' }],
      outerRadius: 0.9,
      innerRadius: 0.6,
      pieStyle: { pieBorderWidth: 0, pieHoverEffect: 'none' },
      centerText: { titleText: '固定标题' },
    })
    expect(spec.indicators[0].chartSpec).toMatchObject({
      outerRadius: 0.9,
      innerRadius: 0.6,
      pie: { style: { lineWidth: 0 }, state: { hover: {} } },
      indicator: { fixed: true, title: { style: { text: '固定标题' } } },
    })
  })

  test.each([false, true])('presentation preserves radius animation callbacks, customized=%s', (customized) => {
    const spec = build({
      ...(customized
        ? { outerRadius: 0.95, pieStyle: { pieHoverEffect: 'opacity' as const }, centerText: { titleText: '60%' } }
        : {}),
      animation: {
        enable: true,
        params: {
          appear: { enable: true, effects: ['scale'] },
          loop: { enable: true, loop: { effects: ['enlarge'] } },
        },
      },
    })
    expect(spec.animationAppear.pie.type).toBe('growRadiusIn')
    const phases = spec.animationNormal.pie
    // The loop must use each rendered sector's radius and return to it, independently of hover styling.
    const element = { attribute: { outerRadius: 140 } }
    expect(
      phases.map((phase: any) => [
        phase.channel.outerRadius.from({}, element),
        phase.channel.outerRadius.to({}, element),
      ]),
    ).toEqual([
      [140, 150],
      [150, 140],
    ])
    expect(spec.pie.state.hover).toEqual(customized ? { fillOpacity: 0.75 } : { outerRadius: 0.8 * 1.1 })
  })

  test('renders, resizes, removes and restores center text without losing the series', async () => {
    const renderSpec = (share: number | null, enabled = true) => ({
      ...build({
        dataset: [
          { category: '消费者', share: share ?? 0 },
          { category: '其他客户', share: share === null ? 0 : 100 - share },
        ],
        outerRadius: 0.98,
        innerRadius: 0.74,
        legend: { interactive: false, border: false, shapeType: 'circle', labelFontSize: 10 },
        pieStyle: { pieBorderWidth: 0 },
        centerText: enabled ? { titleText: share === null ? '—' : `${share}%`, subTitleText: '消费者' } : undefined,
      }),
      width: 320,
      height: 240,
    })
    const element = document.createElement('div')
    document.body.append(element)
    const chart = new VChart(renderSpec(60), { dom: element })
    const indicator = () => [chart.getSpec().indicator].flat()[0] as any
    try {
      chart.renderSync()
      const series = chart.getChart()!.getAllSeries()[0]
      const titleWidth = () => {
        const component = chart
          .getChart()!
          .getAllComponents()
          .find((item) => item.type === 'indicator') as any
        return component._indicatorComponent._title.attribute.maxLineWidth as number
      }
      const initialWidth = titleWidth()
      chart.resize(160, 100)
      expect(titleWidth()).toBeGreaterThan(0)
      expect(titleWidth()).toBeLessThan(initialWidth)
      chart.resize(320, 240)
      expect(titleWidth()).toBe(initialWidth)
      await chart.updateSpec(renderSpec(25))
      expect(chart.getChart()!.getAllSeries()[0] === series).toBe(true)
      expect(indicator().title.style.text).toBe('25%')
      await chart.updateSpec(renderSpec(25, false))
      expect(
        chart
          .getChart()!
          .getAllComponents()
          .some((component) => component.type === 'indicator'),
      ).toBe(false)
      await chart.updateSpec(renderSpec(null))
      expect(
        chart
          .getChart()!
          .getAllSeries()[0]
          .getViewData()!
          .latestData.map((row: any) => row.share),
      ).toEqual([0, 0])
      expect(indicator().title.style.text).toBe('—')
      await chart.updateSpec(renderSpec(80))
      expect(indicator().title.style.text).toBe('80%')
    } finally {
      chart.release()
      element.remove()
    }
  })
})
