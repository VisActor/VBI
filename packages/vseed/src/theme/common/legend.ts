import type { ColorLegend, Legend } from 'src/types'

export const getDefaultLegend = (): Legend => ({
  enable: true,
  interactive: true,
  border: true,
  maxSize: 1,
  shapeType: 'rectRound',
  position: 'rt',
  labelFontSize: 12,
  labelFontWeight: 400,
})

export const getDarkLegend = (): Legend => ({
  ...getDefaultLegend(),
  labelColor: '#BBBDC3',
  pagerIconColor: '#89909D',
  pagerIconDisableColor: '#2A2D33',
})

export const getLightLegend = (): Legend => ({
  ...getDefaultLegend(),
  labelColor: '#606773',
  pagerIconColor: '#89909D',
  pagerIconDisableColor: '#F1F2F5',
})

export const getDarkColorLegend = (): ColorLegend => ({
  ...getDefaultLegend(),
  labelColor: '#BBBDC3',
  railBackgroundColor: '#404349',
  handlerBorderColor: '#4B4F54',
})

export const getLightColorLegend = (): ColorLegend => ({
  ...getDefaultLegend(),
  labelColor: '#606773',
  handlerBorderColor: '#fff',
  railBackgroundColor: '#f1f3f4',
})
