import type { PivotChartConstructorOptions, BaseTableAPI } from '@visactor/vtable'
import { isNumber } from 'remeda'
import { intl } from 'src/i18n'
import { createFormatterByMeasure, findAllMeasures } from 'src/pipeline/utils'
import type { Datum, MeasureTree, PivotTable, PivotTableSpecPipe, TableMeasure } from 'src/types'

export const pivotIndicators: PivotTableSpecPipe = (spec, context) => {
  const { advancedVSeed, vseed } = context
  const { measureTree } = advancedVSeed
  const measures = findAllMeasures(measureTree as MeasureTree) as TableMeasure[]

  // 用户可配置 indicatorsAsCol，默认 true
  const indicatorsAsCol = (vseed as PivotTable).indicatorsAsCol ?? false

  return {
    ...spec,
    indicatorTitle: intl.i18n`指标名称`,
    indicatorsAsCol,
    hideIndicatorName: measures.length <= 1,
    indicators: measures.map((measure) => {
      const formatter = createFormatterByMeasure(measure)
      return {
        cellType: 'text',
        indicatorKey: measure.id,
        title: measure.alias || measure.id,
        width: measure.width ?? 'auto',
        format: (value: number | string, col?: number, row?: number, table?: BaseTableAPI) => {
          if (!isNumber(col) || !isNumber(row) || !table) {
            return value
          }
          const datum = table.getCellOriginRecord(col, row) as Datum[]
          if (!datum?.[0]) {
            return value
          }
          return formatter(value)
        },
      }
    }) as unknown as PivotChartConstructorOptions['indicators'],
  }
}
