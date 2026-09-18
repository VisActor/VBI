import * as Y from 'yjs'
import { VBI, createVBI } from '@visactor/vbi'
import { ChartTypeEnum } from '@visactor/vseed'
import { getConnector, registerConnector } from 'src/chart-builder/connector'
import { VBIChartBuilder } from 'src/chart-builder/builder'
import { buildVSeedDSL } from 'src/chart-builder/adapters/vquery-vseed/build-vseed'
import { ChartTypeBuilder } from 'src/chart-builder/features/chart-type/chart-type-builder'
import {
  getRecommendedDimensionEncodingsForChartType,
  getSupportedDimensionEncodingsForChartType,
} from 'src/chart-builder/features/chart-type/dimension-encoding'
import {
  getRecommendedMeasureEncodingsForChartType,
  getSupportedMeasureEncodingsForChartType,
} from 'src/chart-builder/features/chart-type/measure-encoding'
import { DimensionsBuilder } from 'src/chart-builder/features/dimensions/dim-builder'
import { MeasuresBuilder } from 'src/chart-builder/features/measures/mea-builder'
import { MeasureNodeBuilder } from 'src/chart-builder/features/measures/mea-node-builder'
import { HavingFilterBuilder } from 'src/chart-builder/features/havingFilter/having-builder'
import { HavingFilterNodeBuilder } from 'src/chart-builder/features/havingFilter/having-node-builder'
import { createHavingGroup, findEntry as findHavingEntry } from 'src/chart-builder/features/havingFilter/having-utils'
import { WhereFilterBuilder } from 'src/chart-builder/features/whereFilter/where-builder'
import { WhereFilterNodeBuilder } from 'src/chart-builder/features/whereFilter/where-node-builder'
import { LocaleBuilder } from 'src/chart-builder/features/locale/locale-builder'
import { ThemeBuilder } from 'src/chart-builder/features/theme/theme-builder'
import {
  mapAggregateForVQuery,
  mapDimensionAggregateForVQuery,
} from 'src/chart-builder/pipeline/vqueryDSL/aggregateMap'
import { buildWhere } from 'src/chart-builder/pipeline/vqueryDSL/buildWhere'
import { resolveDatePredicate } from 'src/chart-builder/pipeline/vqueryDSL/resolveDatePredicate'
import { VBIDashboardBuilder } from 'src/dashboard-builder/builder'
import { mergeWidgetLayoutsIntoDSL } from 'src/dashboard-builder/features/layout-merge'
import { DashboardChartBuilder } from 'src/dashboard-builder/features/chart/chart-builder'
import { DashboardChartCollectionBuilder } from 'src/dashboard-builder/features/chart/chart-collection-builder'
import { DashboardInsightBuilder } from 'src/dashboard-builder/features/insight/insight-builder'
import { DashboardInsightCollectionBuilder } from 'src/dashboard-builder/features/insight/insight-collection-builder'
import { VBIReportBuilder } from 'src/report-builder/builder'
import { ReportPageBuilder } from 'src/report-builder/features/page/page-builder'
import { buildVBIReportSnapshotDSL } from 'src/report-builder/modules/build-snapshot'
import { zVBIDimensionGroupSchema } from 'src/types/chartDSL/dimensions/dimensions'
import { zVBIHavingClause } from 'src/types/chartDSL/havingFilter/having'
import { zVBIMeasureGroup } from 'src/types/chartDSL/measures/measures'
import { zVBIWhereClause, zVBIWhereScalarFilter } from 'src/types/chartDSL/whereFilter/filters'
import {
  createDashboardWidgetYMap,
  getOrCreateDashboardWidgets,
  removeDashboardWidgetLayouts,
} from 'src/vbi/from/dashboard-widget-y-map'
import { createDashboardBuilderFromVBIDashboardDSLInput } from 'src/vbi/from/from-vbi-dashboard-dsl-input'
import { ensureReportPages } from 'src/vbi/from/report-page-y-map'
import { setBaseDSLFields } from 'src/vbi/from/set-base-dsl-fields'
import { createVBIDashboardNamespace } from 'src/vbi/namespaces/dashboard'
import { createVBIReportNamespace } from 'src/vbi/namespaces/report'
import { createVBIResourceNamespace } from 'src/vbi/namespaces/resources'
import { ensureHavingGroup } from 'src/vbi/normalize/ensure-having-group'
import { ensureWhereGroup } from 'src/vbi/normalize/ensure-where-group'
import { createResourceStore } from 'src/vbi/resources/resource-store'
import { registerDemoConnector, getDemoConnectorId } from '../demoConnector'

const attach = <T extends Y.AbstractType<any>>(value: T): T => {
  const doc = new Y.Doc()
  doc.getMap('root').set('value', value)
  return value
}

const createDashboardCollectionHarness = () => {
  const doc = new Y.Doc()
  const dsl = doc.getMap('dsl')
  dsl.set('layout', { lg: [], md: [] })
  const chartBuilder = new VBIChartBuilder(new Y.Doc())
  const insightBuilder = createVBI().insight.create({ uuid: 'insight-resource', content: 'content', version: 0 })
  const dashboardBuilder = {
    getChartBuilder: () => chartBuilder,
    getInsightBuilder: () => insightBuilder,
  }
  return { doc, dsl, dashboardBuilder, chartBuilder, insightBuilder }
}

describe('unit/coverage edges', () => {
  it('covers original id helpers without the deterministic test override', () => {
    const actual = (globalThis as any).__vbiOriginalId as {
      uuid: () => string
      resourceUUID: () => string
    }
    const originalCrypto = globalThis.crypto

    expect(actual.uuid()).toEqual(expect.any(String))
    Object.defineProperty(globalThis, 'crypto', {
      configurable: true,
      value: { randomUUID: () => 'native-resource-id' },
    })
    expect(actual.resourceUUID()).toBe('native-resource-id')
    Object.defineProperty(globalThis, 'crypto', { configurable: true, value: undefined })
    expect(actual.resourceUUID()).toEqual(expect.any(String))
    Object.defineProperty(globalThis, 'crypto', { configurable: true, value: originalCrypto })
  })

  it('covers chart builder defaults and encoding fallback strategies', () => {
    const builder = new VBIChartBuilder(new Y.Doc())
    expect(builder.getUUID()).toBe('uuid-1')

    const chartTypeDoc = new Y.Doc()
    const chartType = new ChartTypeBuilder(chartTypeDoc, chartTypeDoc.getMap('dsl'))
    expect(chartType.getChartType()).toBe('table')
    expect(chartType.toJSON()).toBe('table')

    expect(getSupportedDimensionEncodingsForChartType('unknown-chart')).toEqual(['column'])
    expect(getRecommendedDimensionEncodingsForChartType('unknown-chart', 2)).toEqual(['column', 'column'])
    expect(getSupportedMeasureEncodingsForChartType('unknown-chart')).toEqual(['column'])
    expect(getRecommendedMeasureEncodingsForChartType('unknown-chart', 2)).toEqual(['column', 'column'])

    expect(chartType.getAvailableChartTypes()).not.toEqual(
      expect.arrayContaining([ChartTypeEnum.Boxplot, ChartTypeEnum.Histogram]),
    )
    expect(getSupportedDimensionEncodingsForChartType(ChartTypeEnum.Boxplot)).toContain('xAxis')
    expect(getSupportedMeasureEncodingsForChartType(ChartTypeEnum.Histogram)).toContain('value')
  })

  it('covers field collection defaults, missing removals, and node JSON helpers', () => {
    const doc = new Y.Doc()
    const dsl = doc.getMap('dsl')
    const dimensions = new DimensionsBuilder(doc, dsl)
    dimensions.add('area', (node) => node.setAlias('Area'))
    dimensions.remove('missing-dimension')
    expect(dimensions.toJSON()[0].encoding).toBe('column')

    const measures = new MeasuresBuilder(doc, dsl)
    measures.add('sales', (node) => node.setAlias('Sales'))
    measures.remove('missing-measure')
    expect(measures.toJSON()[0].encoding).toBe('column')

    const measureMap = attach(new Y.Map<any>())
    measureMap.set('id', 'measure')
    measureMap.set('field', 'sales')
    measureMap.set('sort', { order: 'asc' })
    const measure = new MeasureNodeBuilder(measureMap)
    expect(measure.getSort()).toEqual({ order: 'asc' })
  })

  it('covers top-level where and having builder defensive branches', () => {
    const doc = new Y.Doc()
    const dsl = doc.getMap('dsl')
    const where = new WhereFilterBuilder(doc, dsl)
    where.add('area', (node) => node.setOperator('=').setValue('east'))
    const whereFilterId = where.toJSON().conditions[0].id
    where.remove(whereFilterId)
    where.addGroup('or', (group) => {
      group.add('province', (node) => node.setOperator('=').setValue('zhejiang'))
    })
    expect(where.find(() => false)).toBeUndefined()
    expect(() => where.update('missing', () => undefined)).toThrow('Where filter with id missing not found')
    expect(() => where.updateGroup('missing', () => undefined)).toThrow('Where group with id missing not found')
    expect(new WhereFilterNodeBuilder(attach(new Y.Map<any>())).toJSON()).toEqual({})

    const existingWhere = new Y.Map<any>()
    dsl.set('whereFilter', existingWhere)
    const normalizedWhere = new WhereFilterBuilder(doc, dsl).toJSON()
    expect(normalizedWhere).toMatchObject({ id: 'root', op: 'and', conditions: [] })

    const having = new HavingFilterBuilder(doc, dsl)
    having.add('sales', (node) => node.setOperator('>').setValue(1))
    having.remove(0)
    having.addGroup('and', (group) => {
      group.add('profit', (node) => node.setOperator('>').setValue(0))
    })
    expect(having.find((entry) => (entry.toJSON() as any).field === 'profit')?.toJSON()).toMatchObject({
      field: 'profit',
    })
    expect(having.find(() => false)).toBeUndefined()
    expect(() => having.update('missing', () => undefined)).toThrow('Having filter with id missing not found')
    expect(() => having.updateGroup('missing', () => undefined)).toThrow('Having group with id missing not found')
    expect(new HavingFilterNodeBuilder(attach(new Y.Map<any>())).toJSON()).toEqual({})

    const existingHaving = new Y.Map<any>()
    dsl.set('havingFilter', existingHaving)
    const normalizedHaving = new HavingFilterBuilder(doc, dsl).toJSON()
    expect(normalizedHaving).toMatchObject({ id: 'root', op: 'and', conditions: [] })

    const groupDoc = new Y.Doc()
    const rootGroup = createHavingGroup('and', 'root')
    groupDoc.getMap('root').set('having', rootGroup)
    const nestedGroup = createHavingGroup('or', 'nested')
    const nestedFilter = new Y.Map<any>()
    nestedFilter.set('id', 'nested-filter')
    nestedFilter.set('field', 'sales')
    rootGroup.get('conditions').push([nestedGroup])
    ;(rootGroup.get('conditions').get(0) as Y.Map<any>).get('conditions').push([nestedFilter])
    expect(findHavingEntry(rootGroup.get('conditions'), 'nested-filter')?.item).toBe(nestedFilter)
  })

  it('covers query lowering and date normalization edge cases', () => {
    expect(mapAggregateForVQuery({ func: 'custom' } as any)).toEqual({ func: 'custom' })
    expect(mapDimensionAggregateForVQuery({ func: 'customDate' } as any)).toEqual({ func: 'customDate' })

    expect(
      buildWhere(
        { select: [] } as any,
        {
          vbiDSL: {
            whereFilter: {
              id: 'root',
              op: 'and',
              conditions: [
                { id: 'range', field: 'sales', op: 'between', value: [1, 2] },
                { id: 'open', field: 'profit', op: 'between', value: 5 },
                { id: 'outside', field: 'discount', op: 'not between', value: { min: 0.2 } },
              ],
            },
          },
        } as any,
      ),
    ).toMatchObject({
      where: {
        conditions: [
          { field: 'sales', op: '>=', value: 1 },
          { field: 'sales', op: '<=', value: 2 },
          { field: 'discount', op: '<', value: 0.2 },
        ],
      },
    })

    const now = new Date('2026-01-04T12:00:00.000Z')
    expect(resolveDatePredicate({ type: 'range', start: new Date('2026-01-01'), end: new Date('2026-01-02') })).toEqual(
      {
        start: '2026-01-01',
        end: '2026-01-02',
        bounds: '[)',
      },
    )
    expect(resolveDatePredicate({ type: 'period', unit: 'week', year: 2026, week: 1 }, now).start).toBe('2025-12-29')
    expect(resolveDatePredicate({ type: 'period', unit: 'day', date: new Date('2026-01-04') }, now).end).toBe(
      '2026-01-05',
    )
    expect(resolveDatePredicate({ type: 'current', unit: 'week' }, now).start).toBe('2025-12-29')
  })

  it('covers VSeed lowering with omitted encodings and default preferences', async () => {
    registerConnector('coverage-vseed', {
      discoverSchema: async () => [],
      query: async () => ({ dataset: [{ sales: 1 }] }),
    })

    await expect(
      buildVSeedDSL({
        dsl: new Y.Doc().getMap('dsl'),
        builder: {} as any,
        options: {},
        queryDSL: { select: [] } as any,
        vbiDSL: {
          uuid: 'chart',
          connectorId: 'coverage-vseed',
          chartType: 'table',
          dimensions: [{ id: 'area', field: 'area', alias: 'Area' }],
          measures: [{ id: 'sales', field: 'sales', alias: 'Sales', aggregate: { func: 'sum' } }],
          whereFilter: { id: 'root', op: 'and', conditions: [] },
          havingFilter: { id: 'root', op: 'and', conditions: [] },
          theme: 'light',
          locale: 'zh-CN',
          version: 0,
        } as any,
      }),
    ).resolves.toMatchObject({
      measures: [{ id: 'sales', alias: 'Sales' }],
    })

    const doc = new Y.Doc()
    const dsl = doc.getMap('dsl')
    const locale = new LocaleBuilder(doc, dsl)
    const theme = new ThemeBuilder(doc, dsl)
    expect(locale.getLocale()).toBe('zh-CN')
    expect(theme.getTheme()).toBe('light')
  })

  it('covers dashboard defaults, layout merge branches, and widget builders', () => {
    const dashboard = new VBIDashboardBuilder(new Y.Doc())
    expect(dashboard.getUUID()).toBe('uuid-1')
    expect(dashboard.build()).toMatchObject({
      meta: { title: '', theme: 'light' },
      version: 0,
    })

    const doc = new Y.Doc()
    const dsl = doc.getMap('dsl')
    mergeWidgetLayoutsIntoDSL(dsl, 'widget', { lg: { x: 0, y: 0, w: 1, h: 1 } })
    dsl.set('layout', new Y.Map())
    mergeWidgetLayoutsIntoDSL(dsl, 'widget', { lg: { x: 0, y: 0, w: 1, h: 1 }, md: undefined })
    expect(dsl.get('layout')).toMatchObject({ lg: [{ widgetId: 'widget' }] })

    const widgetMap = attach(new Y.Map<any>())
    widgetMap.set('id', 'widget')
    const chartWidget = new DashboardChartBuilder(widgetMap)
    const insightWidget = new DashboardInsightBuilder(widgetMap)
    expect(chartWidget.getBuilder()).toBeUndefined()
    expect(insightWidget.getBuilder()).toBeUndefined()

    const fallbackCalls: string[] = []
    expect(
      new DashboardChartBuilder(widgetMap, {
        getBuilder: (chartId) => {
          fallbackCalls.push(chartId)
          return undefined
        },
      }).getBuilder(),
    ).toBeUndefined()
    expect(
      new DashboardInsightBuilder(widgetMap, {
        getBuilder: (insightId) => {
          fallbackCalls.push(insightId)
          return undefined
        },
      }).getBuilder(),
    ).toBeUndefined()
    expect(fallbackCalls).toEqual(['', ''])
  })

  it('covers dashboard chart and insight collection rollback, update, and lookup branches', () => {
    const chartHarness = createDashboardCollectionHarness()
    const chartCollection = new DashboardChartCollectionBuilder(
      chartHarness.doc,
      chartHarness.dsl,
      chartHarness.dashboardBuilder,
    )

    expect(() => chartCollection.add((chart) => chartCollection.remove(chart.getId()))).toThrow(
      'addChart requires layouts.lg to be set',
    )
    chartCollection.add((chart) => {
      expect(chart.getBuilder()).toBe(chartHarness.chartBuilder)
      chart.setChart('chart-resource').setLayouts({ lg: { x: 0, y: 0, w: 1, h: 1 } })
    })
    const chart = chartCollection.find('chart-resource')
    expect(chart?.getBuilder()).toBe(chartHarness.chartBuilder)
    expect(() => chartCollection.update('missing', () => undefined)).toThrow('Chart widget with id "missing" not found')
    chartCollection.update(chart!.getId(), (widget) => widget.setTitle('updated only'))

    const insightHarness = createDashboardCollectionHarness()
    const insightCollection = new DashboardInsightCollectionBuilder(
      insightHarness.doc,
      insightHarness.dsl,
      insightHarness.dashboardBuilder,
    )

    expect(() => insightCollection.add((insight) => insightCollection.remove(insight.getId()))).toThrow(
      'addInsight requires layouts.lg to be set',
    )
    insightCollection.add((insight) => {
      expect(insight.getBuilder()).toBe(insightHarness.insightBuilder)
      insight.setInsightId('insight-resource').setLayouts({ lg: { x: 0, y: 0, w: 1, h: 1 } })
    })
    const insight = insightCollection.find('insight-resource')
    expect(insight?.getBuilder()).toBe(insightHarness.insightBuilder)
    expect(() => insightCollection.update('missing', () => undefined)).toThrow(
      'Insight widget with id "missing" not found',
    )
    insightCollection.update(insight!.getId(), (widget) => widget.setTitle('updated only'))
    insightCollection.remove('missing')
  })

  it('covers dashboard and report input helpers and namespaces with absent options', () => {
    const dashboardBuilder = createDashboardBuilderFromVBIDashboardDSLInput({
      uuid: 'dashboard',
      widgets: [{ id: 'w1', type: 'chart', title: 'Chart', description: '', chartId: 'chart-1' }],
      breakpoints: { xxl: 1600, xl: 1200, lg: 996, md: 768, sm: 480, xs: 0 },
      layout: { xxl: [], xl: [], lg: [], md: [], sm: [], xs: [] },
      meta: { title: 'Dashboard', theme: 'light' },
      version: 0,
    })
    expect(dashboardBuilder.build().widgets).toHaveLength(1)

    const registry = {
      charts: createResourceStore<any, any, any>((dsl) => new VBIChartBuilder(new Y.Doc(), undefined, dsl)),
      insights: createResourceStore<any, any, any>((dsl) => createVBI().insight.create(dsl)),
    }
    expect(
      createVBIDashboardNamespace(undefined, registry).create(VBI.dashboard.createEmpty('dash')).build().uuid,
    ).toBe('dash')
    expect(createVBIReportNamespace(undefined, registry).create(VBI.report.createEmpty('report')).build().uuid).toBe(
      'report',
    )
    expect(
      createVBIDashboardNamespace(undefined, registry)
        .create(VBI.dashboard.createEmpty('dash-options'), { chart: { adapters: {} } } as any)
        .build().uuid,
    ).toBe('dash-options')
    expect(
      createVBIReportNamespace(undefined, registry)
        .create(VBI.report.createEmpty('report-options'), { chart: { adapters: {} } } as any)
        .build().uuid,
    ).toBe('report-options')

    const doc = new Y.Doc()
    const dsl = doc.getMap('dsl')
    setBaseDSLFields(dsl, { uuid: 'chart', limit: 10 } as any)
    expect(dsl.toJSON()).toEqual({ uuid: 'chart', limit: 10 })
    const normalizedDoc = new Y.Doc()
    const whereGroup = ensureWhereGroup(undefined)
    const havingGroup = ensureHavingGroup(undefined)
    const emptyPages = ensureReportPages()
    normalizedDoc.getMap('root').set('where', whereGroup)
    normalizedDoc.getMap('root').set('having', havingGroup)
    normalizedDoc.getMap('root').set('pages', emptyPages)
    expect(whereGroup.toJSON()).toMatchObject({ id: 'root' })
    expect(havingGroup.toJSON()).toMatchObject({ id: 'root' })
    expect(emptyPages.length).toBe(0)
  })

  it('covers report page getters, snapshot errors, and resource store empty entries', () => {
    const report = new VBIReportBuilder(new Y.Doc())
    expect(report.getUUID()).toBe('uuid-1')
    report.page.add('Page')
    const pageId = report.build().pages[0].id
    const page = report.page.get(pageId)!
    expect(page.getId()).toBe(pageId)
    expect(page.chart).toBeUndefined()
    expect(page.insight).toBeUndefined()

    const pageMap = attach(new Y.Map<any>())
    pageMap.set('id', 'empty-resource-page')
    const pageLookups: string[] = []
    const directPage = new ReportPageBuilder(
      {
        getChartBuilder: (chartId: string) => {
          pageLookups.push(chartId)
          return undefined
        },
        getInsightBuilder: (insightId: string) => {
          pageLookups.push(insightId)
          return undefined
        },
      } as any,
      pageMap,
    )
    expect(directPage.chart).toBeUndefined()
    expect(directPage.insight).toBeUndefined()
    expect(pageLookups).toEqual(['', ''])

    const chartStore = createResourceStore<any, any, any>(() => ({ build: () => ({ uuid: 'chart' }) }))
    chartStore.registerDSL('chart', { uuid: 'chart' })
    const insightStore = createResourceStore<any, any, any>(() => ({ build: () => undefined }))
    expect(() =>
      buildVBIReportSnapshotDSL(
        { uuid: 'report', version: 0, pages: [{ id: 'p1', title: 'Page', chartId: 'chart', insightId: 'missing' }] },
        { charts: chartStore, insights: insightStore },
      ),
    ).toThrow('Missing insight resource')

    const store = createResourceStore<{ build: () => undefined }, undefined, void>(() => ({ build: () => undefined }))
    store.registerBuilder('empty', { build: () => undefined })
    expect(store.entries()).toEqual([])
  })

  it('covers resource namespace optional registration and dashboard widget layout branches', () => {
    const registry = {
      charts: createResourceStore<any, any, any>((dsl) => new VBIChartBuilder(new Y.Doc(), undefined, dsl)),
      insights: createResourceStore<any, any, any>((dsl) => createVBI().insight.create(dsl)),
    }
    const resources = createVBIResourceNamespace(registry)
    expect(resources.register({})).toEqual({ charts: [], insights: [] })

    const doc = new Y.Doc()
    const dsl = doc.getMap('dsl')
    const customWidget = createDashboardWidgetYMap({ id: 'custom', type: 'custom' } as any)
    doc.getMap('root').set('customWidget', customWidget)
    expect(customWidget.get('chartId')).toBeUndefined()

    const layoutMap = new Y.Map<any>()
    layoutMap.set('lg', [{ widgetId: 'not-y-array' }])
    dsl.set('layout', layoutMap)
    removeDashboardWidgetLayouts(dsl, 'not-y-array')

    dsl.set('layout', { lg: { widgetId: 'not-array' } })
    removeDashboardWidgetLayouts(dsl, 'not-array')

    expect(getOrCreateDashboardWidgets(dsl)).toBeInstanceOf(Y.Array)
  })

  it('covers recursive schema lazy callbacks and scalar filter rejection', () => {
    expect(
      zVBIDimensionGroupSchema.parse({
        alias: 'group',
        children: [{ id: 'dimension', field: 'area', alias: 'Area' }],
      }),
    ).toMatchObject({ alias: 'group' })
    expect(
      zVBIMeasureGroup.parse({
        alias: 'group',
        children: [{ id: 'measure', field: 'sales', alias: 'Sales', encoding: 'column', aggregate: { func: 'sum' } }],
      }),
    ).toMatchObject({ alias: 'group' })
    expect(zVBIHavingClause.parse({ id: 'group', op: 'and', conditions: [] })).toMatchObject({ id: 'group' })
    expect(zVBIWhereClause.parse({ id: 'group', op: 'and', conditions: [] })).toMatchObject({ id: 'group' })
    expect(zVBIWhereScalarFilter.safeParse({ id: 'date', field: 'order_date', op: 'date' }).success).toBe(false)
  })

  it('covers demo connector repeated-query branch and helper getter', async () => {
    registerDemoConnector()
    expect(getDemoConnectorId()).toBe('demoSupermarket')
    const connector = await getConnector(getDemoConnectorId())
    const queryDSL = { select: ['sales'], limit: 1 } as any
    await connector.query({ queryDSL, schema: [], connectorId: getDemoConnectorId() } as any)
    await expect(
      connector.query({ queryDSL, schema: [], connectorId: getDemoConnectorId() } as any),
    ).resolves.toHaveProperty('dataset')
  })
})
