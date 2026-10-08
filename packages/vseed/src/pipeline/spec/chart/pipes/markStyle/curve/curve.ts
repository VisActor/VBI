export const cartesianCurve = (smooth = false) => ({
  curveType: smooth ? 'monotone' : 'linear',
  curveTension: 0,
})

export const closedCurve = (smooth = false) => ({
  curveType: smooth ? 'catmullRomClosed' : 'linear',
  curveTension: smooth ? 0.4 : 0,
})
