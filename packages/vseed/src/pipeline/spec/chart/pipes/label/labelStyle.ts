import type { Label } from 'src/types'

export const buildLabelStyle = (label: Label) => ({
  stroke: label.labelStroke,
  fill: label.labelColor,
  fontSize: label.labelFontSize,
  fontWeight: label.labelFontWeight,
  background: label.labelBackgroundColor,
  ...(label.labelStrokeWidth != null || label.labelColorSmartInvert ? { lineWidth: label.labelStrokeWidth ?? 2 } : {}),
})
