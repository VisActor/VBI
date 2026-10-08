import type { ICartesianCrosshairSpec, ILineChartSpec } from '@visactor/vchart'
import type { VChartSpecPipe } from 'src/types'

export const verticalCrosshairRect: VChartSpecPipe = (spec, context) => {
  const result = { ...spec } as ILineChartSpec
  const { advancedVSeed, vseed } = context
  const { chartType } = vseed

  const config = advancedVSeed.config?.[chartType as 'column']?.crosshairRect
  if (!config) {
    return result
  }

  if (!result.crosshair) {
    result.crosshair = {}
  }

  const visible = config.visible ?? true
  const rectColor = config.rectColor || undefined
  const labelColor = config.labelColor || undefined
  const labelVisible = config.labelVisible || false
  const labelBackgroundColor = config.labelBackgroundColor || undefined

  const crosshair = result.crosshair as ICartesianCrosshairSpec
  crosshair.xField = {
    visible,
    line: {
      type: 'rect',
      style: {
        lineWidth: 0,
        opacity: 0.26,
        fill: rectColor,
      },
    },
    label: {
      visible: labelVisible,
      labelBackground: {
        visible: labelVisible,
        style: {
          fill: labelBackgroundColor,
        },
      },
      style: {
        fill: labelColor,
      },
    },
  }
  const xAxisConfig = result.axes?.find((v) => v.orient === 'bottom')
  const xAxisFormatter = xAxisConfig?.label?.formatMethod
  if (xAxisFormatter) {
    ;(crosshair.xField.label!.formatMethod as any) = xAxisFormatter
  }

  return result
}
