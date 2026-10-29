import type { SpecPipeline } from 'src/types'
import {
  initTable,
  tableLayout,
  dimensionTreeToColumns,
  measureTreeToColumns,
  columnsAggregation,
  bodyStyle,
  headerStyle,
  bottomFrozenStyle,
  tableThemeStyle,
  selectionStyle,
  tableBodyCell,
} from '../pipes'

export const tableSpecPipeline: SpecPipeline = [
  initTable,
  tableLayout,
  dimensionTreeToColumns,
  measureTreeToColumns,
  columnsAggregation,
  bodyStyle,
  headerStyle,
  bottomFrozenStyle,
  tableThemeStyle,
  selectionStyle,
  tableBodyCell,
]
