import type { AdvancedPipe } from 'src/types'

const rejectRange =
  (message: string): AdvancedPipe =>
  (advancedVSeed) => {
    const areas = advancedVSeed.annotation?.annotationArea
    const areaList = Array.isArray(areas) ? areas : areas ? [areas] : []
    const rangeIndex = areaList.findIndex((area) => area.range !== undefined)

    if (rangeIndex !== -1) {
      throw new Error(`annotationArea[${rangeIndex}].range ${message}`)
    }

    return advancedVSeed
  }

export const rejectUnsupportedAnnotationAreaRange = rejectRange('does not support this chart type')
export const rejectPivotAnnotationAreaRange = rejectRange('does not support pivot or combination charts')
