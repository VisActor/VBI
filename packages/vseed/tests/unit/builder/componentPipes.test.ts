import { beforeAll, expect, test } from 'vitest'
import { Builder, registerAll } from 'src/builder'
import { DATUM_HIDE_KEY } from 'src/pipeline/utils/constant'
import type { SpecPipelineContext, VSeed } from 'src/types'
import { boxLegend } from 'src/pipeline/spec/chart/pipes/legend/boxLegend'
import { heatmapColorLegend } from 'src/pipeline/spec/chart/pipes/legend/heatmapColorLegend'
import { pivotColorLegend } from 'src/pipeline/spec/chart/pipes/legend/pivotColorLegend'
import { horizontalCrosshairLine } from 'src/pipeline/spec/chart/pipes/crosshair/horizontalCrosshairLine'
import { bandAxisFormatter } from 'src/pipeline/spec/chart/pipes/axes/bandAxisFormatter'
import sankey from '../../examples/chartType/sankey/basic.json'
import hierarchySankey from '../../examples/chartType/hierarchySankey/basic.json'

beforeAll(registerAll)

const context = {
  vseed: { chartType: 'column' },
  advancedVSeed: {
    chartType: 'column',
    config: { column: { legend: { enable: false }, color: {}, crosshairLine: { visible: false, labelVisible: false } } },
    datasetReshapeInfo: [{ unfoldInfo: {} }],
  },
} as unknown as SpecPipelineContext

test.each([boxLegend, heatmapColorLegend])('legend extensions preserve minimal disabled output', (pipe) => {
  const spec = pipe({ legends: { visible: true } }, context)
  expect(spec.legends).toEqual({ visible: false })
})

test('disabled continuous pivot legends have no range calculation or callbacks', () => {
  expect(pivotColorLegend({}, context).legends).toEqual([])
})

test.each([sankey, hierarchySankey])('flow labels can be disabled without callbacks', ({ vseed }) => {
  const spec = Builder.from({ ...vseed, label: { enable: false } } as VSeed).build<any>()
  expect(spec.label).toEqual({ visible: false })
})

test('horizontal line crosshairs respect false and reuse the left-axis formatter', () => {
  const formatMethod = bandAxisFormatter(String)
  const spec = horizontalCrosshairLine({ axes: [{ orient: 'left', label: { formatMethod } }] }, context) as any
  expect(spec.crosshair.yField.visible).toBe(false)
  expect(spec.crosshair.yField.label.visible).toBe(false)
  expect(spec.crosshair.yField.label.formatMethod).toBe(formatMethod)
  expect(formatMethod(null as unknown as string)).toBe('')
})

test('enabled legend extensions retain their data transforms', () => {
  const enabled = structuredClone(context)
  enabled.advancedVSeed.config.column!.legend = { enable: true }
  enabled.advancedVSeed.datasetReshapeInfo[0].unfoldInfo = {
    ...enabled.advancedVSeed.datasetReshapeInfo[0].unfoldInfo,
    colorIdMap: {}, encodingColor: 'sales',
  }
  const box = boxLegend({}, enabled) as any
  expect(box.legends.data([{ shape: { fill: 'white', stroke: 'blue' } }])[0].shape.fill).toBe('blue')
  const heatmap = heatmapColorLegend({}, enabled) as any
  const rows = heatmap.legends.customFilter([{ sales: 5 }, { sales: 15 }], [20, 10], 'sales')
  expect(rows.map((row: any) => row[DATUM_HIDE_KEY])).toEqual([true, false])
})
