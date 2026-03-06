import type { PivotChartGridConfig } from 'src/types'

export const getDefaultTableConfig = () => ({
  bodyFontSize: 12,
  bodyBackgroundColor: 'transparent',
  headerFontSize: 12,
  barHeight: '100%',
  barMarkInBar: false,
  barMarkWidth: 2,
  barPadding: ['25%', 10],
  barRightToLeft: false,
  barPositiveColor: 'rgba(188,220,194, 0.5)',
  barNegativeColor: 'rgba(241,188,191, 0.5)',
  backgroundColorScale: {
    minColor: '#D8CFFF',
    maxColor: '#6B4FD7',
  },
})

export const getLightTableConfig = () => ({
  ...getDefaultTableConfig(),
  borderColor: '#e3e5eb',

  bodyFontColor: '#141414',

  headerFontColor: '#21252c',
  headerBackgroundColor: '#f6f7f9',

  hoverBodyBackgroundColor: '#bedaff',
  hoverBodyInlineBackgroundColor: '#bedaff33',
  hoverHeaderBackgroundColor: '#D9DDE4',
  hoverHeaderInlineBackgroundColor: '#D9DDE455',

  selectedBorderColor: '#4080ff',
  selectedBackgroundColor: '#bedaff33',

  backgroundColor: 'transparent',

  barAxisColor: '#9EAFC6',
})

export const getDarkTableConfig = () => ({
  ...getDefaultTableConfig(),
  borderColor: '#4b4e53',

  bodyFontColor: '#fdfdfd',
  headerFontColor: '#fdfdfd',
  headerBackgroundColor: '#36393e',

  hoverBodyBackgroundColor: '#4284ff66',
  hoverBodyInlineBackgroundColor: '#4284ff10',
  hoverHeaderBackgroundColor: '#6f7984cc',
  hoverHeaderInlineBackgroundColor: '#4b4f54',

  selectedBorderColor: '#3073f2',
  selectedBackgroundColor: '#4284ff33',
  barAxisColor: '#9EAFC6',
})

const pickPivotChartGridConfig = (tableConfig: any) => {
  return {
    outlineBorderLineWidth: 0,
    frameCornerRadius: 0,
    borderColor: tableConfig.borderColor,
    bodyFontColor: tableConfig.bodyFontColor,
    headerFontColor: tableConfig.headerFontColor,

    headerBackgroundColor: 'transparent',
    hoverHeaderBackgroundColor: tableConfig.hoverHeaderBackgroundColor,
    hoverHeaderInlineBackgroundColor: tableConfig.hoverHeaderInlineBackgroundColor,

    titleFontColor: tableConfig.headerFontColor,
    titleFontSize: tableConfig.headerFontSize,
    titleFontWeight: 'bold',
  }
}

export const getLightPivotChartGridConfig = () => {
  const res = pickPivotChartGridConfig(getLightTableConfig()) as PivotChartGridConfig

  res.hoverHeaderInlineBackgroundColor = '#D9DDE446'

  res.chartGridColor = '#F0F1F6'
  res.axisLabelColor = '#BCC1CB'

  return res
}

export const getDarkPivotChartGridConfig = () => {
  const res = pickPivotChartGridConfig(getDarkTableConfig()) as PivotChartGridConfig

  res.hoverHeaderInlineBackgroundColor = '#4b4f5446'

  return res
}
