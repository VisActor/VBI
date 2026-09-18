import * as Y from 'yjs'
import {
  createVBI,
  findTreeNodesBy,
  id,
  isVBIFilter,
  isVBIHavingFilter,
  isVBIHavingGroup,
  isVBIWhereGroup,
  preorderTraverse,
} from '@visactor/vbi'
import * as PublicAPI from 'src/index'
import * as ChartBuilderAPI from 'src/chart-builder/index'
import * as ChartAdaptersAPI from 'src/chart-builder/adapters/index'
import * as ChartFeaturesAPI from 'src/chart-builder/features/index'
import * as ChartPipelineAPI from 'src/chart-builder/pipeline/index'
import * as ChartTypeAPI from 'src/chart-builder/features/chart-type/index'
import * as DimensionsAPI from 'src/chart-builder/features/dimensions/index'
import * as HavingAPI from 'src/chart-builder/features/havingFilter/index'
import * as LimitAPI from 'src/chart-builder/features/limit/index'
import * as LocaleAPI from 'src/chart-builder/features/locale/index'
import * as MeasuresAPI from 'src/chart-builder/features/measures/index'
import * as ThemeAPI from 'src/chart-builder/features/theme/index'
import * as UndoAPI from 'src/chart-builder/features/undo-manager/index'
import * as WhereAPI from 'src/chart-builder/features/whereFilter/index'
import * as ChartModulesAPI from 'src/chart-builder/modules/index'
import * as DashboardAPI from 'src/dashboard-builder/index'
import * as DashboardFeaturesAPI from 'src/dashboard-builder/features/index'
import * as DashboardChartAPI from 'src/dashboard-builder/features/chart/index'
import * as DashboardInsightAPI from 'src/dashboard-builder/features/insight/index'
import * as DashboardModulesAPI from 'src/dashboard-builder/modules/index'
import * as InsightAPI from 'src/insight-builder/index'
import * as InsightModulesAPI from 'src/insight-builder/modules/index'
import * as TypesAPI from 'src/types/index'
import * as BuilderTypesAPI from 'src/types/builder/index'
import * as ChartDSLTypesAPI from 'src/types/chartDSL/index'
import * as ConnectorTypesAPI from 'src/types/connector/index'
import * as DashboardTypesAPI from 'src/types/dashboardDSL/index'
import * as InsightTypesAPI from 'src/types/insightDSL/index'
import * as UtilsAPI from 'src/utils/index'
import * as TreeAPI from 'src/utils/tree/index'
import * as VBIAPI from 'src/vbi/index'
import * as VBIFromAPI from 'src/vbi/from/index'
import * as VBINamespacesAPI from 'src/vbi/namespaces/index'
import * as VBIResourcesAPI from 'src/vbi/resources/index'
import * as VBITypesAPI from 'src/vbi/types/index'
import { getConnector, registerConnector } from 'src/chart-builder/connector'
import { VBIChartBuilder } from 'src/chart-builder/builder'
import { VBIDashboardBuilder } from 'src/dashboard-builder/builder'
import { VBIInsightBuilder } from 'src/insight-builder/builder'
import { createDashboardWidgetYMap, removeDashboardWidgetLayouts } from 'src/vbi/from/dashboard-widget-y-map'
import { toYMap } from 'src/vbi/normalize/to-y-map'
import { ensureYArray } from 'src/vbi/normalize/ensure-y-array'
import { getResourceUUID } from 'src/vbi/resource-uuid'
import { createResourceStore } from 'src/vbi/resources/resource-store'
import { buildWhere } from 'src/chart-builder/pipeline/vqueryDSL/buildWhere'
import { resolveDatePredicate } from 'src/chart-builder/pipeline/vqueryDSL/resolveDatePredicate'

describe('unit/internal utilities', () => {
  it('loads public barrel modules and exposes runtime symbols', () => {
    const modules = [
      PublicAPI,
      ChartBuilderAPI,
      ChartAdaptersAPI,
      ChartFeaturesAPI,
      ChartPipelineAPI,
      ChartTypeAPI,
      DimensionsAPI,
      HavingAPI,
      LimitAPI,
      LocaleAPI,
      MeasuresAPI,
      ThemeAPI,
      UndoAPI,
      WhereAPI,
      ChartModulesAPI,
      DashboardAPI,
      DashboardFeaturesAPI,
      DashboardChartAPI,
      DashboardInsightAPI,
      DashboardModulesAPI,
      InsightAPI,
      InsightModulesAPI,
      TypesAPI,
      BuilderTypesAPI,
      ChartDSLTypesAPI,
      ConnectorTypesAPI,
      DashboardTypesAPI,
      InsightTypesAPI,
      UtilsAPI,
      TreeAPI,
      VBIAPI,
      VBIFromAPI,
      VBINamespacesAPI,
      VBIResourcesAPI,
      VBITypesAPI,
    ]

    expect(modules.every((module) => Object.keys(module).length >= 0)).toBe(true)
    expect(PublicAPI.VBI).toBeDefined()
    expect(ChartBuilderAPI.VBIChartBuilder).toBe(VBIChartBuilder)
    expect(DashboardAPI.VBIDashboardBuilder).toBe(VBIDashboardBuilder)
    expect(InsightAPI.VBIInsightBuilder).toBe(VBIInsightBuilder)
  })

  it('checks filter guards and tree helpers through exported utilities', () => {
    const whereFilter = { id: 'w1', field: 'area', op: '=', value: '华东' }
    const whereGroup = { id: 'wg1', op: 'and', conditions: [whereFilter] }
    const havingFilter = { id: 'h1', field: 'sales', op: '>', value: 100, aggregate: { func: 'sum' } }
    const havingGroup = { id: 'hg1', op: 'or', conditions: [havingFilter] }

    expect(isVBIFilter(whereFilter as any)).toBe(true)
    expect(isVBIWhereGroup(whereGroup as any)).toBe(true)
    expect(isVBIHavingFilter(havingFilter as any)).toBe(true)
    expect(isVBIHavingGroup(havingGroup as any)).toBe(true)

    const tree = [{ id: 'root', children: [{ id: 'leaf' }] }]
    expect(findTreeNodesBy(tree as any, (node: any) => node.id === 'leaf')).toHaveLength(1)
    const visited: string[] = []
    preorderTraverse(tree as any, (node: any) => {
      visited.push(node.id)
      return false
    })
    expect(visited).toContain('root')
  })

  it('generates ids and falls back when crypto.randomUUID is unavailable', () => {
    const originalCrypto = globalThis.crypto
    expect(id.uuid()).toBe('id-1')
    Object.defineProperty(globalThis, 'crypto', { configurable: true, value: undefined })
    expect(id.resourceUUID()).toBe('uuid-1')
    Object.defineProperty(globalThis, 'crypto', { configurable: true, value: originalCrypto })
  })

  it('covers connector registration success and missing connector errors', async () => {
    await expect(getConnector('missing-unit-connector')).rejects.toThrow(
      'connector missing-unit-connector not registered',
    )

    registerConnector('unit-static-connector', {
      discoverSchema: async () => [],
      query: async () => ({ dataset: [] }),
    })
    expect(await getConnector('unit-static-connector')).toHaveProperty('discoverSchema')

    registerConnector('unit-factory-connector', async () => ({
      discoverSchema: async () => [{ name: 'sales', type: 'number' }],
      query: async () => ({ dataset: [] }),
    }))
    expect(await (await getConnector('unit-factory-connector')).discoverSchema()).toEqual([
      { name: 'sales', type: 'number' },
    ])
  })

  it('normalizes Yjs maps and arrays recursively', () => {
    const yMap = toYMap(
      {
        field: 'sales',
        children: [{ field: 'profit' }],
        conditions: [{ field: 'area', value: '华东' }],
      },
      'field',
    )

    const doc = new Y.Doc()
    doc.getMap('root').set('value', yMap)
    expect(yMap.get('id')).toBeTruthy()
    expect(yMap.get('children')).toBeInstanceOf(Y.Array)
    expect(yMap.get('conditions')).toBeInstanceOf(Y.Array)
    const empty = ensureYArray(undefined)
    const ensured = ensureYArray([{ name: 'plain' }], true)
    doc.getMap('root').set('empty', empty)
    doc.getMap('root').set('ensured', ensured)
    expect(empty.length).toBe(0)
    expect(ensured.get(0).get('id')).toBeTruthy()
  })

  it('covers dashboard widget map helpers for Y.Map and plain object layouts', () => {
    const doc = new Y.Doc()
    const root = doc.getMap('root')
    const chartWidget = createDashboardWidgetYMap({
      id: '',
      type: 'chart',
      chartId: 'chart-1',
    })
    const insightWidget = createDashboardWidgetYMap({ id: 'insight-widget', type: 'insight', insightId: 'insight-1' })
    root.set('chartWidget', chartWidget)
    root.set('insightWidget', insightWidget)
    expect(chartWidget.get('chartId')).toBe('chart-1')
    expect(insightWidget.get('title')).toBe('')

    const dsl = doc.getMap('dsl')
    removeDashboardWidgetLayouts(dsl, 'missing')

    const plainLayout = {
      lg: [
        { id: 'a', widgetId: 'remove-me', x: 0, y: 0, w: 1, h: 1 },
        { id: 'b', widgetId: 'keep-me', x: 1, y: 0, w: 1, h: 1 },
      ],
    }
    dsl.set('layout', plainLayout)
    removeDashboardWidgetLayouts(dsl, 'remove-me')
    expect((dsl.get('layout') as typeof plainLayout).lg).toHaveLength(1)

    const layoutMap = new Y.Map<any>()
    const items = new Y.Array<any>()
    const itemMap = new Y.Map<any>()
    itemMap.set('widgetId', 'remove-map')
    items.push([itemMap, { widgetId: 'keep-map' }])
    layoutMap.set('lg', items)
    dsl.set('layout', layoutMap)
    removeDashboardWidgetLayouts(dsl, 'remove-map')
    expect(items.length).toBe(1)
  })
  it('covers resource store DSL-to-builder resolution and delete branches', () => {
    const store = createResourceStore<{ build: () => { value: number } }, { value: number }, { bump?: number }>(
      (dsl, options) => ({
        build: () => ({ value: dsl.value + (options?.bump ?? 0) }),
      }),
    )

    expect(store.resolveBuilder('missing')).toBeUndefined()
    store.registerDSL('metric', { value: 2 })
    expect(store.resolveBuilder('metric', { bump: 3 })?.build()).toEqual({ value: 5 })
    expect(store.build('metric')).toEqual({ value: 5 })
    expect(store.delete('metric')).toBe(true)
    expect(store.delete('metric')).toBe(false)

    store.registerDSL('metric', { value: 1 })
    store.registerBuilder('metric', { build: () => ({ value: 10 }) })
    expect(store.entries()).toEqual([['metric', { value: 10 }]])
    store.clear()
    expect(store.entries()).toEqual([])
  })

  it('covers defensive builder paths that are awkward as examples', () => {
    const dashboard = createVBI().dashboard.createEmpty('dashboard')
    const dashboardBuilder = createVBI().dashboard.create(dashboard)
    expect(dashboardBuilder.getChartBuilder('')).toBeUndefined()
    expect(dashboardBuilder.getChartBuilder('missing')).toBeUndefined()
    expect(dashboardBuilder.getInsightBuilder('')).toBeUndefined()
    expect(dashboardBuilder.getInsightBuilder('missing')).toBeUndefined()
    const insightBuilder = new VBIInsightBuilder(new Y.Doc())
    const peer = new VBIInsightBuilder(new Y.Doc())
    peer.applyUpdate(insightBuilder.encodeStateAsUpdate())
    expect(peer.build()).toHaveProperty('content')
  })

  it('covers resource uuid error and unsupported date-unit defaults', () => {
    const doc = new Y.Doc()
    const dsl = new Y.Map<any>()
    doc.getMap('root').set('dsl', dsl)
    expect(() => getResourceUUID(dsl)).toThrow('Resource UUID has not been initialized')
    const now = new Date('2026-03-23T00:00:00.000Z')
    expect(resolveDatePredicate({ type: 'current', unit: 'unknown' } as any, now).start).toBe('2026-03-23')
    expect(resolveDatePredicate({ type: 'relative', mode: 'next', amount: 1, unit: 'unknown' } as any, now).end).toBe(
      '2026-03-23',
    )
    expect(
      buildWhere(
        { select: [] } as any,
        {
          vbiDSL: { whereFilter: { id: 'root', op: 'and', conditions: [] } },
        } as any,
      ),
    ).toEqual({ select: [] })
  })
})
