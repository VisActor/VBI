import { intl } from 'src/i18n'
import { createFormatterByMeasure, isMeasure, findTreeNodesBy } from 'src/pipeline/utils'
import type { ListTableSpecPipe, Measure } from 'src/types'
import { extractLeafIds } from './utils'
import { formatTableValue } from './formatTableValue'

/**
 * @description 为表格列添加汇总行配置
 * - 只对度量列应用聚合函数
 * - 在第一个维度列显示汇总标签
 * - 其他维度列留空
 */
export const columnsAggregation: ListTableSpecPipe = (spec, context) => {
  const { vseed, advancedVSeed } = context
  const { totals } = vseed as any

  if (!totals) {
    return spec
  }

  // 映射汇总类型到 i18n 标签
  const totalLabelMap: Record<string, string> = {
    sum: intl.i18n`合计`,
    avg: intl.i18n`平均`,
    max: intl.i18n`最大值`,
    min: intl.i18n`最小值`,
    count: intl.i18n`计数`,
  }

  const totalLabel = totalLabelMap[totals] || intl.i18n`合计`

  // 映射到 VTable 的聚合类型
  const vtableAggregationMap: Record<string, string> = {
    sum: 'SUM',
    avg: 'AVG',
    max: 'MAX',
    min: 'MIN',
    count: 'COUNT',
  }

  const vtableAggregationType = vtableAggregationMap[totals] || 'SUM'

  // 从树形结构中提取所有叶子节点的ID
  const dimensionIds = extractLeafIds(advancedVSeed.dimensionTree || [])
  const measureTree = advancedVSeed.measureTree || []
  const measureIds = extractLeafIds(measureTree)

  // 创建 measure id 到 measure 对象的映射
  const leafMeasures = findTreeNodesBy(measureTree, () => true)
  const measureMap = new Map<string, Measure>()
  leafMeasures.forEach((node) => {
    if (isMeasure(node)) {
      measureMap.set(node.id, node as Measure)
    }
  })

  let isFirstDimensionColumn = true

  const updatedColumns = spec.columns?.map((column: any) => {
    const fieldKey = column.field

    // 维度列处理
    if (dimensionIds.has(fieldKey)) {
      if (isFirstDimensionColumn) {
        isFirstDimensionColumn = false
        return {
          ...column,
          aggregation: {
            aggregationType: 'NONE',
            formatFun: () => totalLabel,
          },
        }
      }

      // 其他维度列留空
      return {
        ...column,
        aggregation: {
          aggregationType: 'NONE',
          formatFun: () => '',
        },
      }
    }

    // 度量列处理 - 应用聚合函数和格式化
    if (measureIds.has(fieldKey)) {
      const measure = measureMap.get(fieldKey)
      const formatter = createFormatterByMeasure(measure)

      return {
        ...column,
        aggregation: {
          aggregationType: vtableAggregationType,
          showOnTop: false,
          formatFun: (value: number | string | undefined) =>
            formatTableValue(value, formatter, advancedVSeed.config?.table?.emptyCellText),
        },
      }
    }

    return column
  })

  return {
    ...spec,
    columns: updatedColumns,
    bottomFrozenRowCount: 1,
  }
}
