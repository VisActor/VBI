export function getLeftPanelWidth(viewportWidth: number): number {
  if (viewportWidth <= 768) {
    return 272
  }

  if (viewportWidth <= 1080) {
    return 312
  }

  return 360
}
