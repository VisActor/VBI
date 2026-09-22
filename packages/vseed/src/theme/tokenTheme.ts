import type { TokenThemeDefinition } from './tokenThemeSchema'
import tinycolor from 'tinycolor2'
import type { Config, CustomThemeConfig } from 'src/types'
import { registerAll } from '../builder/register/all'
import { registerCustomTheme } from '../builder/register/theme/custom'
import { darkTheme } from './dark'
import { lightTheme } from './light'

export type TokenThemeBase = TokenThemeDefinition['baseTheme']

export type { TokenThemeDefinition } from './tokenThemeSchema'

export type TokenThemeRegistry = Record<string, TokenThemeDefinition>

export type RegisterTokenThemeOptions = {
  ensureRegisterAll?: boolean
}

type ThemeConfigMap = NonNullable<CustomThemeConfig['config']>
type ThemeConfigKey = keyof ThemeConfigMap

const raceChartTypes: ThemeConfigKey[] = ['raceBar', 'raceColumn', 'raceScatter', 'raceLine', 'racePie', 'raceDonut']

let hasEnsuredRegisterAll = false

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

const mergeThemeNode = <T>(base: T, patch: Partial<T>): T => {
  if (!isRecord(base) || !isRecord(patch)) {
    return patch as T
  }

  const result: Record<string, unknown> = { ...base }
  for (const [key, patchValue] of Object.entries(patch)) {
    if (patchValue === undefined) {
      continue
    }

    const currentValue = result[key]
    if (Array.isArray(patchValue)) {
      result[key] = [...patchValue]
      continue
    }

    if (isRecord(currentValue) && isRecord(patchValue)) {
      result[key] = mergeThemeNode(currentValue, patchValue)
      continue
    }

    result[key] = patchValue
  }

  return result as T
}

const withAlpha = (color: string, alpha: number) => tinycolor(color).setAlpha(alpha).toRgbString()

const ensureRegisterAll = (options?: RegisterTokenThemeOptions) => {
  if (options?.ensureRegisterAll === false || hasEnsuredRegisterAll) {
    return
  }

  registerAll()
  hasEnsuredRegisterAll = true
}

const getAccentColor = (tokens: TokenThemeDefinition) => tokens.accentColor || tokens.colorScheme[0]

const getAxisPatch = (tokens: TokenThemeDefinition) => ({
  label: {
    labelColor: tokens.axisLabelColor || tokens.textSecondary,
    labelFontSize: tokens.axisLabelFontSize ?? tokens.axisFontSize,
    labelFontWeight: tokens.axisLabelFontWeight,
  },
  title: {
    titleColor: tokens.axisTitleColor || tokens.textSecondary,
    titleFontSize: tokens.axisTitleFontSize ?? tokens.axisFontSize,
    titleFontWeight: tokens.axisTitleFontWeight,
  },
  grid: {
    gridColor: tokens.axisGridColor || tokens.borderColor,
  },
  tick: {
    tickColor: tokens.axisLineColor || tokens.borderColor,
  },
  line: {
    lineColor: tokens.axisLineColor || tokens.borderColor,
  },
})

const getPivotGridPatch = (tokens: TokenThemeDefinition) => ({
  borderColor: tokens.tableBorderColor || tokens.borderColor,
  bodyFontSize: tokens.tableBodyFontSize,
  bodyFontColor: tokens.tableBodyFontColor || tokens.textPrimary,
  headerFontSize: tokens.tableHeaderFontSize,
  headerFontColor: tokens.tableHeaderFontColor || tokens.textPrimary,
  headerBackgroundColor: tokens.tableHeaderBackgroundColor || tokens.surfaceColor || 'transparent',
  hoverHeaderBackgroundColor: tokens.tableHoverHeaderBackgroundColor || withAlpha(getAccentColor(tokens), 0.18),
  hoverHeaderInlineBackgroundColor:
    tokens.tableHoverHeaderInlineBackgroundColor || withAlpha(getAccentColor(tokens), 0.08),
  titleFontColor: tokens.textPrimary,
  titleFontSize: tokens.tableHeaderFontSize,
  chartGridColor: tokens.axisGridColor || tokens.borderColor,
  axisLabelColor: tokens.axisLabelColor || tokens.textSecondary,
  axisLabelFontSize: tokens.axisLabelFontSize ?? tokens.axisFontSize,
  axisLabelFontWeight: tokens.axisLabelFontWeight,
})

const getPlayerPatch = (tokens: TokenThemeDefinition) => {
  const accentColor = getAccentColor(tokens)

  return {
    fontFamily: tokens.fontFamily,
    fontSize: tokens.playerFontSize,
    railColor: tokens.playerRailColor || tokens.borderColor,
    trackColor: accentColor,
    sliderHandleColor: tokens.playerSliderHandleColor || tokens.surfaceColor || '#ffffff',
    sliderHandleBorderColor: tokens.playerSliderHandleBorderColor || accentColor,
    startButtonColor: accentColor,
    pauseButtonColor: accentColor,
    backwardButtonColor: accentColor,
    forwardButtonColor: accentColor,
  }
}

const getTablePatch = (tokens: TokenThemeDefinition) => {
  const accentColor = getAccentColor(tokens)

  return {
    borderColor: tokens.tableBorderColor || tokens.borderColor,
    bodyFontSize: tokens.tableBodyFontSize,
    bodyFontFamily: tokens.fontFamily,
    bodyFontColor: tokens.tableBodyFontColor || tokens.textPrimary,
    headerFontSize: tokens.tableHeaderFontSize,
    headerFontFamily: tokens.fontFamily,
    headerFontColor: tokens.tableHeaderFontColor || tokens.textPrimary,
    headerBackgroundColor: tokens.tableHeaderBackgroundColor || tokens.surfaceColor || 'transparent',
    hoverBodyBackgroundColor: tokens.tableHoverBodyBackgroundColor || withAlpha(accentColor, 0.18),
    hoverBodyInlineBackgroundColor: tokens.tableHoverBodyInlineBackgroundColor || withAlpha(accentColor, 0.08),
    hoverHeaderBackgroundColor: tokens.tableHoverHeaderBackgroundColor || withAlpha(accentColor, 0.18),
    hoverHeaderInlineBackgroundColor: tokens.tableHoverHeaderInlineBackgroundColor || withAlpha(accentColor, 0.08),
    selectedBorderColor: tokens.tableSelectedBorderColor || accentColor,
    selectedBackgroundColor: tokens.tableSelectedBackgroundColor || withAlpha(accentColor, 0.12),
    backgroundColor: tokens.surfaceBackgroundColor || 'transparent',
    barAxisColor: tokens.axisLineColor || tokens.borderColor,
    backgroundColorScale: {
      minColor: tokens.linearColorScheme[0],
      maxColor: tokens.linearColorScheme[1],
    },
  }
}

const getChartPatch = (tokens: TokenThemeDefinition) => ({
  backgroundColor: 'transparent',
  fontFamily: tokens.fontFamily,
  color: {
    colorScheme: [...tokens.colorScheme],
    linearColorScheme: [...tokens.linearColorScheme],
    positiveColor: tokens.positiveColor,
    negativeColor: tokens.negativeColor,
  },
  label: {
    labelFontSize: tokens.dataLabelFontSize ?? tokens.labelFontSize,
    labelFontWeight: tokens.dataLabelFontWeight,
    labelColor: tokens.labelColor || tokens.textPrimary,
    labelStroke: tokens.labelStroke,
  },
  legend: {
    labelColor: tokens.legendLabelColor || tokens.textSecondary,
    labelFontSize: tokens.legendLabelFontSize ?? tokens.legendFontSize,
    labelFontWeight: tokens.legendLabelFontWeight,
    pagerIconColor: tokens.legendPagerIconColor || tokens.textSecondary,
    pagerIconDisableColor: tokens.legendPagerIconDisableColor || tokens.borderColor,
  },
  tooltip: {
    backgroundColor: tokens.tooltipBackgroundColor,
    borderColor: tokens.tooltipBorderColor || tokens.borderColor,
    fontSize: tokens.tooltipFontSize,
    keyColor: tokens.textSecondary,
    valueColor: tokens.textPrimary,
    valueFontWeight: tokens.tooltipValueFontWeight,
    titleColor: tokens.textPrimary,
  },
})

const getAnnotationLinePatch = (tokens: TokenThemeDefinition) => ({
  lineColor: tokens.annotationLineColor,
  lineStyle: tokens.annotationLineStyle,
  lineDash: tokens.annotationLineDash,
  textColor: tokens.annotationTextColor,
  textBackgroundColor: tokens.annotationTextBackgroundColor,
  textBackgroundBorderColor: tokens.annotationTextBackgroundBorderColor ?? tokens.annotationTextBackgroundColor,
  textBackgroundBorderRadius: tokens.annotationTextBackgroundBorderRadius,
  textBackgroundBorderWidth: tokens.annotationTextBackgroundBorderWidth,
  textBackgroundPadding: tokens.annotationTextBackgroundPadding,
  textBackgroundOpacity: tokens.annotationTextBackgroundOpacity,
})

const getAnnotationTextPatch = (tokens: TokenThemeDefinition) => ({
  textColor: tokens.annotationTextColor,
  textBackgroundColor: tokens.annotationTextBackgroundColor,
  textBackgroundBorderColor: tokens.annotationTextBackgroundBorderColor ?? tokens.annotationTextBackgroundColor,
  textBackgroundBorderRadius: tokens.annotationTextBackgroundBorderRadius,
  textBackgroundBorderWidth: tokens.annotationTextBackgroundBorderWidth,
  textBackgroundPadding: tokens.annotationTextBackgroundPadding,
  textBackgroundOpacity: tokens.annotationTextBackgroundOpacity,
})

const getAnnotationPatch = (tokens: TokenThemeDefinition) => {
  const annotationLinePatch = getAnnotationLinePatch(tokens)
  const annotationTextPatch = getAnnotationTextPatch(tokens)

  return {
    annotationPoint: {
      textFontSize: tokens.annotationLabelFontSize ?? tokens.labelFontSize,
      textFontWeight: tokens.annotationLabelFontWeight,
      ...annotationTextPatch,
    },
    annotationHorizontalLine: {
      textFontSize: tokens.annotationLabelFontSize ?? tokens.labelFontSize,
      textFontWeight: tokens.annotationLabelFontWeight,
      ...annotationLinePatch,
    },
    annotationVerticalLine: {
      textFontSize: tokens.annotationLabelFontSize ?? tokens.labelFontSize,
      textFontWeight: tokens.annotationLabelFontWeight,
      ...annotationLinePatch,
    },
    annotationDifferenceLine: {
      textFontSize: tokens.annotationLabelFontSize ?? tokens.labelFontSize,
      textFontWeight: tokens.annotationLabelFontWeight,
      lineColor: tokens.annotationLineColor,
      lineStyle: tokens.annotationLineStyle,
      lineDash: tokens.annotationLineDash,
      ...annotationTextPatch,
    },
    annotationArea: {
      textFontSize: tokens.annotationLabelFontSize ?? tokens.labelFontSize,
      textFontWeight: tokens.annotationLabelFontWeight,
      areaColor: tokens.annotationAreaColor,
      areaColorOpacity: tokens.annotationAreaColorOpacity,
      ...annotationTextPatch,
    },
  }
}

const getRegressionLinePatch = (tokens: TokenThemeDefinition) => ({
  kdeRegressionLine: {
    textFontSize: tokens.labelFontSize,
  },
  ecdfRegressionLine: {
    textFontSize: tokens.labelFontSize,
  },
  linearRegressionLine: {
    textFontSize: tokens.labelFontSize,
  },
  lowessRegressionLine: {
    textFontSize: tokens.labelFontSize,
  },
  polynomialRegressionLine: {
    textFontSize: tokens.labelFontSize,
  },
  logisticRegressionLine: {
    textFontSize: tokens.labelFontSize,
  },
})

const withAxesAndExtras = (
  chartType: ThemeConfigKey,
  chartConfig: NonNullable<ThemeConfigMap[ThemeConfigKey]>,
  tokens: TokenThemeDefinition,
) => {
  let nextChartConfig = mergeThemeNode(chartConfig, getChartPatch(tokens))
  const chartRecord = nextChartConfig as Record<string, unknown>

  if (Object.prototype.hasOwnProperty.call(chartRecord, 'xAxis')) {
    nextChartConfig = mergeThemeNode(nextChartConfig, { xAxis: getAxisPatch(tokens) } as Partial<
      typeof nextChartConfig
    >)
  }

  if (Object.prototype.hasOwnProperty.call(chartRecord, 'yAxis')) {
    nextChartConfig = mergeThemeNode(nextChartConfig, { yAxis: getAxisPatch(tokens) } as Partial<
      typeof nextChartConfig
    >)
  }

  if (Object.prototype.hasOwnProperty.call(chartRecord, 'primaryYAxis')) {
    nextChartConfig = mergeThemeNode(nextChartConfig, { primaryYAxis: getAxisPatch(tokens) } as Partial<
      typeof nextChartConfig
    >)
  }

  if (Object.prototype.hasOwnProperty.call(chartRecord, 'secondaryYAxis')) {
    nextChartConfig = mergeThemeNode(nextChartConfig, { secondaryYAxis: getAxisPatch(tokens) } as Partial<
      typeof nextChartConfig
    >)
  }

  if (Object.prototype.hasOwnProperty.call(chartRecord, 'pivotGrid')) {
    nextChartConfig = mergeThemeNode(nextChartConfig, { pivotGrid: getPivotGridPatch(tokens) } as Partial<
      typeof nextChartConfig
    >)
  }

  if (Object.prototype.hasOwnProperty.call(chartRecord, 'annotation')) {
    nextChartConfig = mergeThemeNode(nextChartConfig, { annotation: getAnnotationPatch(tokens) } as Partial<
      typeof nextChartConfig
    >)
  }

  if (Object.prototype.hasOwnProperty.call(chartRecord, 'regressionLine')) {
    nextChartConfig = mergeThemeNode(nextChartConfig, { regressionLine: getRegressionLinePatch(tokens) } as Partial<
      typeof nextChartConfig
    >)
  }

  if (raceChartTypes.includes(chartType) && Object.prototype.hasOwnProperty.call(chartRecord, 'player')) {
    nextChartConfig = mergeThemeNode(nextChartConfig, { player: getPlayerPatch(tokens) } as Partial<
      typeof nextChartConfig
    >)
  }

  return nextChartConfig
}

export const createTokenThemeConfig = (tokens: TokenThemeDefinition): CustomThemeConfig => {
  const baseTheme = tokens.baseTheme === 'dark' ? darkTheme() : lightTheme()
  const baseConfig = (baseTheme.config || {}) as ThemeConfigMap
  const nextConfig = {} as ThemeConfigMap

  for (const chartType of Object.keys(baseConfig) as ThemeConfigKey[]) {
    const chartConfig = baseConfig[chartType]
    if (!chartConfig) {
      continue
    }

    if (chartType === 'table' || chartType === 'pivotTable') {
      nextConfig[chartType] = mergeThemeNode(chartConfig, getTablePatch(tokens)) as ThemeConfigMap[ThemeConfigKey]
      continue
    }

    nextConfig[chartType] = withAxesAndExtras(chartType, chartConfig, tokens) as ThemeConfigMap[ThemeConfigKey]
  }

  return {
    config: nextConfig as Config,
  }
}

export const registerTokenTheme = (
  themeName: string,
  tokens: TokenThemeDefinition,
  options?: RegisterTokenThemeOptions,
) => {
  ensureRegisterAll(options)
  registerCustomTheme(themeName, createTokenThemeConfig(tokens))
}

export const registerTokenThemes = (themes: TokenThemeRegistry, options?: RegisterTokenThemeOptions) => {
  ensureRegisterAll(options)

  for (const [themeName, tokens] of Object.entries(themes)) {
    registerCustomTheme(themeName, createTokenThemeConfig(tokens))
  }
}
