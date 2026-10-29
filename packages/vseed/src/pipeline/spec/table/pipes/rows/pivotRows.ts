import type { TableDimension, PivotTableSpecPipe } from 'src/types'
import { createFormatterByDimension } from 'src/pipeline/utils'

export const pivotRows: PivotTableSpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const dimensions = advancedVSeed.dimensionTree as TableDimension[]
  const { encoding } = advancedVSeed
  const rows = dimensions.filter((item) => encoding.row?.includes(item.id))

  return {
    ...spec,
    rows: rows.map((item) => {
      const formatter = createFormatterByDimension(item, advancedVSeed.locale)
      return {
        dimensionKey: item.id,
        title: item.alias || item.id,
        width: item.width ?? 'auto',
        headerFormat: (value: string | number) => formatter(value),
      }
    }),
  }
}
