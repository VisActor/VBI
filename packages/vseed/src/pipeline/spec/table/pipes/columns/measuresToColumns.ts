import type { ListTableConstructorOptions } from '@visactor/vtable'
import { createFormatterByMeasure, isMeasureGroup } from 'src/pipeline/utils'
import type { MeasureGroup, TableMeasure, MeasureTree, ListTableSpecPipe, Datum } from 'src/types'
import { treeTreeToColumns } from './utils'
import { isNullish } from 'remeda'
import { isUndefined } from '@visactor/vutils'
import { formatTableValue } from './formatTableValue'

export const measureTreeToColumns: ListTableSpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const measureTree = (advancedVSeed as unknown as { measureTree: MeasureTree }).measureTree
  const result = { ...spec } as ListTableConstructorOptions

  const eachNode = (node: TableMeasure | MeasureGroup) => {
    const field = node.id
    const title = node.alias ?? node.id

    if (isMeasureGroup(node)) {
      return {
        field,
        title,
        headerStyle: {
          textAlign: 'right',
        },
      }
    }

    return {
      field,
      title,
      width: node.width ?? 'auto',
      style: {
        textAlign: 'right',
      },
      headerStyle: {
        textAlign: 'right',
      },
      fieldFormat: fieldFormat(node, advancedVSeed.config?.table?.emptyCellText),
    }
  }
  const columns = treeTreeToColumns<TableMeasure, MeasureGroup>(measureTree, eachNode)
  return {
    ...result,
    columns: [...(result.columns || []), ...columns] as ListTableConstructorOptions['columns'],
  }
}

const fieldFormat = (node: TableMeasure, emptyCellText?: string | null) => {
  const formatter = createFormatterByMeasure(node)

  return (datum: Datum) => {
    const { id } = node
    const value = datum[id] as number | string | undefined
    if (isNullish(value) || isUndefined(value)) {
      return emptyCellText ?? value
    }
    return formatTableValue(value, formatter, emptyCellText)
  }
}
