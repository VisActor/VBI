import type { CenterTextConfig, PieGeometry, PieStyle } from 'src/types'

export const getDefaultPieGeometry = (): Required<Pick<PieGeometry, 'outerRadius' | 'innerRadius'>> => ({
  outerRadius: 0.8,
  innerRadius: 0,
})

export const getDefaultDonutGeometry = (): Required<Pick<PieGeometry, 'outerRadius' | 'innerRadius'>> => {
  const geometry = getDefaultPieGeometry()
  return { ...geometry, innerRadius: geometry.outerRadius * 0.8 }
}

export const getDefaultPieAngles = () => ({ startAngle: -90, endAngle: 270 })

export const getDefaultPieStyle = (): PieStyle => ({
  pieHoverEffect: 'enlarge',
})

export const getDefaultCenterText = (): CenterTextConfig => ({
  titleFontSize: 18,
  titleFontWeight: 600,
  subTitleFontSize: 12,
  subTitleOpacity: 0.75,
  gap: 2,
})
