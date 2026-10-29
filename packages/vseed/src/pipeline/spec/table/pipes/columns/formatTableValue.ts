import type { Formatter } from 'src/types'

export const formatTableValue = (
  value: string | number | undefined,
  formatter: Formatter,
  emptyCellText?: string | null,
) => {
  if (emptyCellText != null && (value == null || (typeof value === 'number' && !Number.isFinite(value)))) {
    return emptyCellText
  }
  return formatter(value)
}
