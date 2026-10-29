import { pick } from 'remeda'
import type { ListTableSpecPipe, TableConfig } from 'src/types'

export const tableLayout: ListTableSpecPipe = (spec, { advancedVSeed }) => {
  const config = (advancedVSeed.config[advancedVSeed.chartType] ?? {}) as TableConfig
  const { rowHeight, headerRowHeight } = config

  return {
    ...spec,
    ...Object.fromEntries(
      Object.entries(pick(config, ['widthMode', 'heightMode', 'autoWrapText', 'autoFillWidth'])).filter(
        ([, value]) => value != null,
      ),
    ),
    ...(rowHeight == null ? {} : { defaultRowHeight: rowHeight }),
    ...(headerRowHeight == null ? {} : { defaultHeaderRowHeight: headerRowHeight }),
  }
}
