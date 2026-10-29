import type { SpecPipeline } from 'src/types'
import {
  initPivotTable,
  tableLayout,
  pivotColumns,
  pivotRows,
  pivotIndicators,
  bodyStyle,
  headerStyle,
  rowHeaderStyle,
  cornerHeaderStyle,
  tableThemeStyle,
  selectionStyle,
  titleOnDimension,
  pivotTableBodyCell,
} from '../pipes'
import { dataConfig } from '../pipes/indicators/pivotDataConfig'

export const pivotTableSpecPipeline: SpecPipeline = [
  initPivotTable,
  tableLayout,
  pivotColumns,
  pivotRows,
  pivotIndicators,
  titleOnDimension,
  bodyStyle,
  headerStyle,
  rowHeaderStyle,
  cornerHeaderStyle,
  tableThemeStyle,
  selectionStyle,
  dataConfig,
  pivotTableBodyCell,
]
