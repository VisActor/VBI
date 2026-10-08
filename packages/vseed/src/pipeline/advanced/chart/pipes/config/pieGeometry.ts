import type { AdvancedPipe, Donut, PieGeometry } from 'src/types'
import { getDefaultDonutGeometry, getDefaultPieGeometry, getDefaultPieAngles } from 'src/theme/common/pie'

const geometryConfig =
  (getDefaults: typeof getDefaultPieGeometry): AdvancedPipe =>
  (advancedVSeed, { vseed, customTheme }) => {
    const { chartType, theme = 'light' } = vseed
    const base = { ...getDefaults(), ...getDefaultPieAngles() }
    const themeGeometry = customTheme?.[theme]?.config?.[chartType] as PieGeometry | undefined
    const defaults = {
      outerRadius: themeGeometry?.outerRadius ?? base.outerRadius,
      innerRadius: themeGeometry?.innerRadius ?? base.innerRadius,
      startAngle: themeGeometry?.startAngle ?? base.startAngle,
      endAngle: themeGeometry?.endAngle ?? base.endAngle,
    }
    const options = vseed as Donut
    const outerRadius = options.outerRadius ?? defaults.outerRadius
    const innerRadius = options.innerRadius ?? (outerRadius / defaults.outerRadius) * defaults.innerRadius
    const startAngle = options.startAngle ?? defaults.startAngle
    const endAngle = options.endAngle ?? startAngle + (defaults.endAngle - defaults.startAngle)

    if (!(outerRadius > 0 && outerRadius <= 1 && innerRadius >= 0 && innerRadius < outerRadius)) {
      throw new Error('Pie radii must satisfy 0 <= innerRadius < outerRadius <= 1')
    }
    if (!(endAngle > startAngle && endAngle - startAngle <= 360)) {
      throw new Error('Pie angle span must be greater than 0 and at most 360 degrees')
    }

    return {
      ...advancedVSeed,
      config: {
        ...advancedVSeed.config,
        [chartType]: {
          ...advancedVSeed.config?.[chartType],
          outerRadius,
          innerRadius,
          // Leave unconfigured angles to VChart, including any existing VChart theme.
          ...(options.startAngle != null ||
          options.endAngle != null ||
          themeGeometry?.startAngle != null ||
          themeGeometry?.endAngle != null
            ? { startAngle, endAngle }
            : {}),
        },
      },
    }
  }

export const pieGeometryConfig = geometryConfig(getDefaultPieGeometry)
export const donutGeometryConfig = geometryConfig(getDefaultDonutGeometry)
