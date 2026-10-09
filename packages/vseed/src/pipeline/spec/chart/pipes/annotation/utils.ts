import type { Datum, ValueDynamicFilter } from 'src/types'

export type AnnotationLineStyle = 'solid' | 'dashed' | 'dotted'

export const getAnnotationLineDash = (lineStyle?: AnnotationLineStyle | null, lineDash?: number[] | null) => {
  if (Array.isArray(lineDash)) {
    return lineDash
  }

  if (lineStyle === 'dashed') {
    return [2, 2]
  }

  if (lineStyle === 'dotted') {
    return [2, 5]
  }

  return [0]
}

export const isSubset = (sub: Datum, obj: Datum, excludeMeasuresIds?: string[]) => {
  return Object.entries(sub).every(([key, value]) => {
    if (excludeMeasuresIds && excludeMeasuresIds.includes(key)) {
      return false
    }

    if (typeof value === 'string') {
      return obj[key] === value
    }
    if (typeof value === 'number') {
      return obj[key] === value
    }
    return true
  })
}

export const ANNOTATION_AREA_TEXT_STYLE_BY_POSITION = {
  top: {
    textAlign: 'center',
    textBaseline: 'top',
  },
  topRight: {
    textAlign: 'right',
    textBaseline: 'top',
  },
  topLeft: {
    textAlign: 'left',
    textBaseline: 'top',
  },
  bottom: {
    textAlign: 'center',
    textBaseline: 'bottom',
  },
  bottomLeft: {
    textAlign: 'left',
    textBaseline: 'bottom',
  },
  bottomRight: {
    textAlign: 'right',
    textBaseline: 'bottom',
  },
  left: {
    textAlign: 'left',
    textBaseline: 'middle',
  },
  right: {
    textAlign: 'right',
    textBaseline: 'middle',
  },
  middle: {
    textAlign: 'center',
    textBaseline: 'middle',
  },
}

/**
 * 解析标注线的值，优先级：dynamicFilter (success=true) > fallback > defaultValue
 */
export const resolveAnnotationValue = (options: {
  dynamicFilter?: ValueDynamicFilter
  fallback?: string | number
  defaultValue?: any
}): (string | number) | (string | number)[] | undefined => {
  const { dynamicFilter, fallback, defaultValue } = options

  // 优先使用 dynamicFilter
  if (dynamicFilter?.result?.success && dynamicFilter.result.data !== undefined) {
    return dynamicFilter.result.data
  }

  // 其次使用 fallback
  if (fallback !== undefined) {
    return fallback
  }

  // 最后使用原始的 defaultValue
  return defaultValue
}
