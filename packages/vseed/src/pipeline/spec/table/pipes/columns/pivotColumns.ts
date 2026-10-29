import type { PivotTableConstructorOptions } from '@visactor/vtable'
import type { TableDimension, PivotTableSpecPipe } from 'src/types'
import { createFormatterByDimension } from 'src/pipeline/utils'

export const pivotColumns: PivotTableSpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const { encoding } = advancedVSeed
  const dimensions = advancedVSeed.dimensionTree as TableDimension[]
  const columns = dimensions.filter((item) => encoding.column?.includes(item.id))

  return {
    ...spec,
    columns: columns.map((item) => {
      const formatter = createFormatterByDimension(item, advancedVSeed.locale)
      return {
        dimensionKey: item.id,
        title: item.alias || item.id,
        width: item.width ?? 'auto',
        headerStyle: {
          textAlign: 'center',
        },
        headerFormat: (value: string | number) => formatter(value),
      }
    }),
  } as PivotTableConstructorOptions
}
