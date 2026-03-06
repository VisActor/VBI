import type { ListTableConstructorOptions } from '@visactor/vtable'
import { createFormatterByMeasure, isMeasure } from 'src/pipeline/utils'
import type { MeasureGroup, Measure, MeasureTree, ListTableSpecPipe, Datum } from 'src/types'
import { treeTreeToColumns } from './utils'
import { isNullish } from 'remeda'
import { isUndefined } from '@visactor/vutils'

export const measureTreeToColumns: ListTableSpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const measureTree = (advancedVSeed as unknown as { measureTree: MeasureTree }).measureTree
  const result = { ...spec } as ListTableConstructorOptions

  const eachNode = (node: Measure | MeasureGroup) => {
    if (isMeasure(node)) {
      return {
        width: 'auto',
        fieldFormat: fieldFormat(node),
      }
    }

    return {}
  }
  const columns = treeTreeToColumns<Measure, MeasureGroup>(measureTree, eachNode)
  return {
    ...result,
    columns: [...(result.columns || []), ...columns] as ListTableConstructorOptions['columns'],
  }
}

const fieldFormat = (node: Measure) => {
  const formatter = createFormatterByMeasure(node)

  return (datum: Datum) => {
    const { id } = node
    const value = datum[id] as number | string | undefined
    if (isNullish(value) || isUndefined(value)) {
      return value
    }
    return formatter(value)
  }
}
