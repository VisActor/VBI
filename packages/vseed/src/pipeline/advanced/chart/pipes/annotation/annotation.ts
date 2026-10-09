import { pick } from 'remeda'
import type { AdvancedPipe, AdvancedVSeed } from 'src/types'
import { zAnnotationAreaRange } from 'src/types'
import { rejectUnsupportedAnnotationAreaRange } from './rejectAnnotationAreaRange'

export const annotationWithRange: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context
  const annotation = pick(vseed, [
    'annotationPoint',
    'annotationHorizontalLine',
    'annotationVerticalLine',
    'annotationArea',
    'annotationDifferenceLine',
  ]) as AdvancedVSeed['annotation']

  const areas = annotation.annotationArea
  const areaList = Array.isArray(areas) ? areas : areas ? [areas] : []
  areaList.forEach((area, index) => {
    const path = `annotationArea[${index}]`
    if (area.range === undefined) {
      if (area.selector === undefined || area.selector === null) {
        throw new Error(`${path}: selector or range is required`)
      }
      return
    }
    if (area.selector !== undefined) {
      throw new Error(`${path}: selector and range are mutually exclusive`)
    }
    const validation = zAnnotationAreaRange.safeParse(area.range)
    if (!validation.success) {
      const issues = validation.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('; ')
      throw new Error(`${path}.range: ${issues}`)
    }
  })

  return { ...advancedVSeed, annotation }
}

export const annotation: AdvancedPipe = (advancedVSeed, context) =>
  rejectUnsupportedAnnotationAreaRange(annotationWithRange(advancedVSeed, context), context)
