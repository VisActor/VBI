import type { ListTableConstructorOptions } from '@visactor/vtable'
import { createFormatterByDimension, isDimensionGroup } from 'src/pipeline/utils'
import type { Datum, TableDimension, DimensionGroup, DimensionTree, ListTableSpecPipe } from 'src/types'
import { treeTreeToColumns } from './utils'
import { formatTableValue } from './formatTableValue'

export const dimensionTreeToColumns: ListTableSpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const dimensionTree = (advancedVSeed as unknown as { dimensionTree: DimensionTree }).dimensionTree
  const result = { ...spec } as ListTableConstructorOptions
  const eachNode = (node: TableDimension | DimensionGroup) => {
    const field = node.id
    const title = node.alias ?? node.id

    if (isDimensionGroup(node)) {
      return {
        field,
        title,
        headerStyle: {
          textAlign: 'left',
        },
      }
    }

    return {
      field,
      title,
      width: node.width ?? 'auto',
      style: {
        textAlign: 'left',
      },
      headerStyle: {
        textAlign: 'left',
      },
      fieldFormat: (datum: Datum) => {
        const formatter = createFormatterByDimension(node, advancedVSeed.locale)
        return formatTableValue(
          datum[node.id] as string | number,
          formatter,
          advancedVSeed.config?.table?.emptyCellText,
        )
      },
    }
  }
  const columns = treeTreeToColumns<TableDimension, DimensionGroup>(dimensionTree, eachNode)

  return {
    ...result,
    columns: [...(result.columns || []), ...columns] as ListTableConstructorOptions['columns'],
  }
}
