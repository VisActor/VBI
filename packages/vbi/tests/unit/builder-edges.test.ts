import * as Y from 'yjs'
import { VBI } from '@visactor/vbi'
import { ChartTypeBuilder } from 'src/chart-builder/features/chart-type/chart-type-builder'
import { DimensionsBuilder } from 'src/chart-builder/features/dimensions/dim-builder'
import { DimensionNodeBuilder } from 'src/chart-builder/features/dimensions/dim-node-builder'
import {
  getOrCreateDimensions,
  locateDimensionIndexById,
  normalizeDimensionNodeIds,
} from 'src/chart-builder/features/dimensions/dimension-utils'
import { MeasuresBuilder } from 'src/chart-builder/features/measures/mea-builder'
import { MeasureNodeBuilder } from 'src/chart-builder/features/measures/mea-node-builder'
import {
  getOrCreateMeasures,
  locateMeasureIndexById,
  normalizeMeasureNodeIds,
} from 'src/chart-builder/features/measures/measure-utils'
import { UndoManager } from 'src/chart-builder/features/undo-manager/undo-manager'
import { HavingGroupBuilder } from 'src/chart-builder/features/havingFilter/having-group-builder'
import { WhereGroupBuilder } from 'src/chart-builder/features/whereFilter/where-group-builder'
import { isEmptyVBIChartDSL } from 'src/chart-builder/modules/is-empty'
import { isEmptyVBIDashboardDSL } from 'src/dashboard-builder/modules/is-empty'
import { isEmptyVBIInsightDSL } from 'src/insight-builder/modules/is-empty'
import { mergeChartBuilderOptions } from 'src/vbi/namespaces/chart'
import { createVBIConnectorNamespace } from 'src/vbi/namespaces/connectors'
import { createChartStore } from 'src/vbi/resources/chart-store'
import { createInsightStore } from 'src/vbi/resources/insight-store'

const attach = <T extends Y.AbstractType<any>>(value: T): T => {
  const doc = new Y.Doc()
  doc.getMap('root').set('value', value)
  return value
}

describe('unit/builder edge behavior', () => {
  it('covers chart type observers and no-op unsubscribe', () => {
    const doc = new Y.Doc()
    const dsl = doc.getMap('dsl')
    dsl.set('dimensions', new Y.Array())
    dsl.set('measures', new Y.Array())

    const chartType = new ChartTypeBuilder(doc, dsl)
    let calls = 0
    const stop = chartType.observe(() => calls++)
    dsl.set('theme', 'dark')
    chartType.changeChartType('bar')
    stop()
    chartType.changeChartType('line')

    expect(calls).toBe(1)
    expect(chartType.getRecommendedDimensionEncodings()).toEqual([])
    expect(chartType.getRecommendedMeasureEncodings()).toEqual([])
  })

  it('covers dimension and measure utility branches and static guards', () => {
    const doc = new Y.Doc()
    const dsl = doc.getMap('dsl')

    const dimensions = getOrCreateDimensions(dsl)
    expect(getOrCreateDimensions(dsl)).toBe(dimensions)
    const dimensionMap = new Y.Map<any>()
    dimensionMap.set('field', 'area')
    dimensions.push([dimensionMap])
    normalizeDimensionNodeIds(dimensions)
    expect(dimensionMap.get('id')).toBe('id-1')
    expect(locateDimensionIndexById(dimensions, 'id-1')).toBe(0)
    expect(DimensionsBuilder.isDimensionNode({ alias: '区域', field: 'area' } as any)).toBe(true)
    expect(DimensionsBuilder.isDimensionGroup({ children: [] } as any)).toBe(true)

    const measures = getOrCreateMeasures(dsl)
    expect(getOrCreateMeasures(dsl)).toBe(measures)
    const measureMap = new Y.Map<any>()
    measureMap.set('field', 'sales')
    measures.push([measureMap])
    normalizeMeasureNodeIds(measures)
    expect(measureMap.get('id')).toBe('id-2')
    expect(locateMeasureIndexById(measures, 'id-2')).toBe(0)
    expect(MeasuresBuilder.isMeasureNode({ field: 'sales', aggregate: { func: 'sum' } } as any)).toBe(true)
    expect(MeasuresBuilder.isMeasureGroup({ children: [] } as any)).toBe(true)
  })

  it('covers node getter defaults and toJSON helpers', () => {
    const dimensionMap = attach(new Y.Map<any>())
    dimensionMap.set('id', 'dimension')
    dimensionMap.set('field', 'order_date')
    const dimension = new DimensionNodeBuilder(dimensionMap)
    expect(dimension.getId()).toBe('dimension')
    expect(dimension.getField()).toBe('order_date')
    expect(dimension.getEncoding()).toBeUndefined()
    expect(dimension.toJSON()).toMatchObject({ id: 'dimension', field: 'order_date' })

    const measureMap = attach(new Y.Map<any>())
    measureMap.set('id', 'measure')
    measureMap.set('field', 'sales')
    const measure = new MeasureNodeBuilder(measureMap)
    expect(measure.getId()).toBe('measure')
    expect(measure.getField()).toBe('sales')
    expect(measure.getEncoding()).toBeUndefined()
    expect(measure.toJSON()).toMatchObject({ id: 'measure', field: 'sales' })
  })

  it('covers deep observers and static negative guards for field collections', () => {
    const builder = VBI.chart.create(VBI.chart.createEmpty('demoSupermarket', 'observer-chart'))
    let dimensionEvents = 0
    let measureEvents = 0
    const stopDimensions = builder.dimensions.observe(() => dimensionEvents++)
    const stopMeasures = builder.measures.observe(() => measureEvents++)

    builder.dimensions.add('area', (node) => node.setAlias('区域'))
    builder.measures.add('sales', (node) => node.setAlias('销售额'))
    stopDimensions()
    stopMeasures()
    builder.dimensions.add('province', (node) => node.setAlias('省份'))
    builder.measures.add('profit', (node) => node.setAlias('利润'))

    expect(dimensionEvents).toBeGreaterThan(0)
    expect(measureEvents).toBeGreaterThan(0)
    expect(DimensionsBuilder.isDimensionNode({ children: [] } as any)).toBe(false)
    expect(DimensionsBuilder.isDimensionGroup({ alias: 'plain', field: 'area' } as any)).toBe(false)
    expect(MeasuresBuilder.isMeasureNode({ children: [] } as any)).toBe(false)
    expect(MeasuresBuilder.isMeasureGroup({ field: 'sales', aggregate: { func: 'sum' } } as any)).toBe(false)
  })

  it('covers where and having group remove, clear, and JSON branches', () => {
    const doc = new Y.Doc()
    const root = doc.getMap('root')
    const whereMap = new Y.Map<any>()
    const whereConditions = new Y.Array<any>()
    whereMap.set('id', 'where-group')
    whereMap.set('op', 'and')
    whereMap.set('conditions', whereConditions)
    root.set('where', whereMap)
    const whereGroup = new WhereGroupBuilder(whereMap)
    whereGroup.add('area', (node) => node.setOperator('=').setValue('华东'))
    const whereId = whereGroup.toJSON().conditions[0].id
    whereGroup.remove(-1).remove(999).remove('missing').remove(whereId)
    whereGroup.add('province', (node) => node.setOperator('=').setValue('上海'))
    whereGroup.remove(0)
    whereGroup.add('city', (node) => node.setOperator('=').setValue('杭州')).clear()
    expect(whereGroup.toJSON().conditions).toEqual([])

    const havingMap = new Y.Map<any>()
    const havingConditions = new Y.Array<any>()
    havingMap.set('id', 'having-group')
    havingMap.set('op', 'or')
    havingMap.set('conditions', havingConditions)
    root.set('having', havingMap)
    const havingGroup = new HavingGroupBuilder(havingMap)
    havingGroup.add('sales', (node) => node.setOperator('>').setValue(100))
    const havingId = havingGroup.toJSON().conditions[0].id
    havingGroup.remove(-1).remove(999).remove('missing').remove(havingId)
    havingGroup.add('profit', (node) => node.setOperator('>').setValue(10))
    havingGroup.remove(0)
    havingGroup.add('amount', (node) => node.setOperator('>').setValue(1)).clear()
    expect(havingGroup.toJSON().conditions).toEqual([])
  })

  it('covers collection-length branches in empty checks', () => {
    const chartDSL = attach(new Y.Map<any>())
    chartDSL.set('dimensions', [{ field: 'area' }])
    chartDSL.set('measures', [])
    expect(isEmptyVBIChartDSL(chartDSL)).toBe(false)

    const emptyChartDSL = attach(new Y.Map<any>())
    emptyChartDSL.set('dimensions', 'not-a-collection')
    emptyChartDSL.set('measures', undefined)
    expect(isEmptyVBIChartDSL(emptyChartDSL)).toBe(true)

    const dashboardDSL = attach(new Y.Map<any>())
    dashboardDSL.set('widgets', [{ id: 'widget' }])
    expect(isEmptyVBIDashboardDSL(dashboardDSL)).toBe(false)

    const emptyDashboardDSL = attach(new Y.Map<any>())
    emptyDashboardDSL.set('widgets', 'not-a-collection')
    expect(isEmptyVBIDashboardDSL(emptyDashboardDSL)).toBe(true)

    const insightDSL = attach(new Y.Map<any>())
    insightDSL.set('content', undefined)
    expect(isEmptyVBIInsightDSL(insightDSL)).toBe(true)
  })

  it('covers undo clear and no-op stack branches', () => {
    const doc = new Y.Doc()
    const map = doc.getMap('undo')
    const undo = new UndoManager(map)
    expect(undo.undo()).toBe(false)
    expect(undo.redo()).toBe(false)
    map.set('value', 1)
    expect(undo.canUndo()).toBe(true)
    undo.clear(true, true)
    expect(undo.canUndo()).toBe(false)
  })

  it('covers namespace option merging and connector namespace operations', async () => {
    const base = {
      adapters: {
        buildVQuery: () => ({ base: true }),
      },
    }
    const overrides = {
      adapters: {
        buildVSeed: async () => ({ seed: true }),
      },
    }
    expect(mergeChartBuilderOptions(undefined, overrides as any)).toBe(overrides)
    expect(mergeChartBuilderOptions(base as any, undefined)).toBe(base)
    expect(mergeChartBuilderOptions(base as any, overrides as any)?.adapters).toMatchObject({
      buildVQuery: base.adapters.buildVQuery,
      buildVSeed: overrides.adapters.buildVSeed,
    })

    const connectors = createVBIConnectorNamespace()
    connectors.register('unit-namespace-connector', {
      discoverSchema: async () => [],
      query: async () => ({ dataset: [] }),
    })
    expect(connectors.has('unit-namespace-connector')).toBe(true)
    expect(await connectors.get('unit-namespace-connector')).toHaveProperty('query')
    expect(connectors.unregister('unit-namespace-connector')).toBe(true)
    expect(connectors.has('unit-namespace-connector')).toBe(false)
  })

  it('covers concrete chart and insight store factories', () => {
    const chartStore = createChartStore()
    const chart = VBI.chart.createEmpty('demoSupermarket', 'unit-chart')
    chartStore.registerDSL('unit-chart', chart)
    expect(chartStore.resolveBuilder('unit-chart')?.build().uuid).toBe('unit-chart')

    const insightStore = createInsightStore()
    insightStore.registerDSL('unit-insight', { uuid: 'unit-insight', content: 'insight', version: 0 })
    expect(insightStore.resolveBuilder('unit-insight')?.build().content).toBe('insight')
  })
  it('covers dashboard insight missing-layout rollback', () => {
    const dashboard = VBI.dashboard.create(VBI.dashboard.createEmpty('unit-dashboard'))
    expect(() => {
      dashboard.insight.add((insight) => {
        insight.setTitle('missing-layout')
      })
    }).toThrow('addInsight requires layouts.lg to be set')
    expect(dashboard.build().widgets).toEqual([])
  })
})
