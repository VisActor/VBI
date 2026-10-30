import type { DatasetColumn } from './DataSet'

export interface ValidateExpressionOptions {
  /** Bound numeric constants for expression placeholders. */
  parameters?: (number | null)[]
  /** Complete input schema; omit to validate syntax and parameter binding only. */
  columns?: DatasetColumn[]
}
