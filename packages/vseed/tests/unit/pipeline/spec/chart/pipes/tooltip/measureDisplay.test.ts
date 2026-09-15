import { Builder, registerAll } from 'src'
import { buildLabel } from 'src/pipeline/spec/chart/pipes/label/label'
import { labelSankey } from 'src/pipeline/spec/chart/pipes/label/labelSankey'
import { labelHierarchySankey } from 'src/pipeline/spec/chart/pipes/label/labelHierarchySankey'
import { labelTreeMapLeaf } from 'src/pipeline/spec/chart/pipes/label/labelTreeMapLeaf'
import { tooltipHierarchy } from 'src/pipeline/spec/chart/pipes/tooltip/tooltipHierarchy'
import { tooltipTreeMap } from 'src/pipeline/spec/chart/pipes/tooltip/tooltipTreeMap'
import { createMarkContent } from 'src/pipeline/spec/chart/pipes/tooltip/tooltip'
import { tooltipScatter } from 'src/pipeline/spec/chart/pipes/tooltip/tooltipScatter'
import type { Datum, FoldInfo, Measures, VSeed } from 'src/types'

const foldInfo = {
  measureId: 'mid', measureName: 'mname', measureValue: 'mvalue',
  foldMap: { sales: 'sales', profit: 'sales' }, statistics: { sum: 200 },
} as FoldInfo
const measures: Measures = [
  { id: 'sales', alias: 'sales', encoding: 'size' },
  { id: 'sales', alias: 'sales', encoding: 'label' },
  { id: 'sales', alias: 'sales', encoding: 'tooltip' },
  { id: 'profit', alias: 'sales', encoding: 'tooltip' },
]
const datum = { mid: 'sales', mname: 'sales', mvalue: 100, sales: 100, profit: 100 }

// Evaluate visibility as the renderer does, including any final content transform.
const tooltipRows = (mark: any, datum: Datum) => {
  const rows = mark.content.flat().filter((entry: any) =>
    typeof entry.visible === 'function' ? entry.visible(datum) : entry.visible !== false,
  ).map((entry: any) => ({
    key: typeof entry.key === 'function' ? entry.key(datum) : entry.key,
    value: typeof entry.value === 'function' ? entry.value(datum) : entry.value,
  }))
  return mark.updateContent ? mark.updateContent(rows) : rows
}

const contextFor = (chartType: string) => ({
  vseed: { measures, dimensions: [] },
  advancedVSeed: {
    chartType, measures, dimensions: [], locale: 'zh-CN',
    config: { [chartType]: { label: { enable: true, wrap: true, showValue: true }, tooltip: { enable: true } } },
    datasetReshapeInfo: [{ foldInfo, foldInfoList: [foldInfo], unfoldInfo: {} }],
    encoding: { label: ['sales', 'profit'], tooltip: ['sales', 'profit'] },
  },
}) as any

describe('measure display identity', () => {
  registerAll()

  it.each([
    'line', 'column', 'columnParallel', 'columnPercent', 'bar', 'barParallel', 'barPercent',
    'area', 'areaPercent', 'pie', 'donut', 'rose', 'roseParallel', 'radar', 'funnel', 'heatmap',
  ])('%s displays the primary measure once across label and tooltip encodings', (chartType) => {
    const builder = Builder.from({
      chartType, dataset: [{ sales: 100, category: 'A', group: 'B' }],
      dimensions: [{ id: 'category', alias: 'Category' }, { id: 'group', alias: 'Group' }],
      measures: [
        { id: 'sales', alias: 'sales' },
        { id: 'sales', alias: 'sales', encoding: 'label' },
        { id: 'sales', alias: 'sales', encoding: 'tooltip' },
      ],
      label: { enable: true, wrap: true, showValue: true, showValuePercent: false },
    } as VSeed)
    const advanced = builder.buildAdvanced()!
    const spec = builder.buildSpec(advanced) as any
    const row = advanced.dataset[0]
    expect(spec.label.formatMethod(null, row).filter((value: string) => value === '100')).toHaveLength(1)
    expect(tooltipRows(spec.tooltip.mark, row).filter((entry: any) => entry.key === 'sales')).toEqual([
      { key: 'sales', value: '100' },
    ])
  })

  it.each([true, false])('keeps distinct equal-valued label fields with showValue=%s', (showValue) => {
    const label = buildLabel(
      { enable: true, wrap: true, showValue, showValuePercent: true },
      measures, [], [], measures, { label: ['sales', 'profit'] }, [foldInfo, foldInfo],
    )
    const parts = label.formatMethod(null, datum) as string[]
    expect(parts).toHaveLength(3)
    expect(parts.filter((value: string) => value === '100')).toHaveLength(2)
    expect(parts.filter((value: string) => value.includes('%'))).toHaveLength(1)
  })

  it('deduplicates tooltip against the current point, retaining other measures with the same alias', () => {
    const mark = { content: createMarkContent(['sales', 'profit'], [], measures, foldInfo, {} as any) }
    for (const id of ['sales', 'profit'] as const) {
      const original = { sales: 100, profit: 200 }
      const row = { ...datum, ...original, mid: id, mvalue: original[id], __OriginalData__: original }
      expect(tooltipRows(mark, row).map((entry: any) => entry.value).sort()).toEqual(['100', '200'])
    }
  })

  it('deduplicates scatter axes by id while retaining equal-valued fields with the same alias', () => {
    const context = contextFor('scatter')
    context.advancedVSeed.datasetReshapeInfo[0].foldInfoList = [foldInfo, { ...foldInfo, measureId: 'ymid' }]
    const spec = tooltipScatter({}, context) as any
    expect(tooltipRows(spec.tooltip.mark, { ...datum, ymid: 'sales', __OriginalData__: datum })).toEqual([
      { key: 'sales', value: '100' }, { key: 'sales', value: '100' },
    ])
  })

  it.each([
    ['sankey', labelSankey], ['hierarchySankey', labelHierarchySankey], ['treeMap', labelTreeMapLeaf],
  ] as const)('%s labels deduplicate ids without merging equal values', (chartType, pipe) => {
    const spec = pipe({}, contextFor(chartType)) as any
    const row = chartType === 'treeMap' ? { value: 100, datum: [{ ...datum, value: 100 }] } : datum
    expect(spec.label.formatMethod(null, row)).toEqual(['100', '100'])
  })

  it.each([
    ['sunburst', tooltipHierarchy], ['circlePacking', tooltipHierarchy], ['treeMap', tooltipTreeMap],
  ] as const)('%s tooltip deduplicates ids without merging equal aliases', (chartType, pipe) => {
    const spec = pipe({}, contextFor(chartType)) as any
    const source = { ...datum, profit: 200 }
    const row = chartType === 'treeMap' ? { depth: 0, datum: [source] } : source
    expect(tooltipRows(spec.tooltip.mark, row)).toEqual([
      { key: 'sales', value: '100' }, { key: 'sales', value: '200' },
    ])
  })
})
