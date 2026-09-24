/**
 * @description 适用于线图、面积图等的区块标注，计算标注区块的时候，只考虑点的大小
 */
import type { ICartesianSeries, ILineChartSpec } from '@visactor/vchart'
import { selector } from '../../../../../dataSelector'
import type { Datum, VChartSpecPipe, VSeed } from 'src/types'
import { ANNOTATION_AREA_TEXT_STYLE_BY_POSITION, isSubset } from './utils'
import { ANNOTATION_Z_INDEX } from '../../../../utils/constant'
import { isBarLikeChart } from 'src/pipeline/utils/chatType'
import { annotationAreaRangePositions, assertAnnotationAreaRangeAxes } from './annotationAreaRange'

export const annotationArea: VChartSpecPipe = (spec, context) => {
  const { advancedVSeed, vseed } = context
  const { annotation, config } = advancedVSeed

  if (!annotation || !annotation.annotationArea) {
    return spec
  }

  const theme = config?.[vseed.chartType as 'column']?.annotation?.annotationArea
  const { annotationArea } = annotation
  const annotationAreaList = Array.isArray(annotationArea) ? annotationArea : [annotationArea]

  const positionMap = {
    top: 'insideTop',
    topRight: 'insideTopRight',
    topLeft: 'insideTopLeft',
    bottom: 'insideBottom',
    bottomLeft: 'insideBottomLeft',
    bottomRight: 'insideBottomRight',
    left: 'insideLeft',
    right: 'insideRight',
  }
  const defaultTextPosition = isBarLikeChart(advancedVSeed as VSeed) ? 'right' : 'top'

  const markArea = annotationAreaList.flatMap((annotationArea) => {
    const {
      selector: selectorPoint,
      range,
      text = '',
      textColor = theme?.textColor ?? '#ffffff',
      textFontSize = theme?.textFontSize ?? 12,
      textFontWeight = theme?.textFontWeight ?? 400,

      textBackgroundVisible = theme?.textBackgroundVisible ?? true,
      textBackgroundColor = theme?.textBackgroundColor ?? '#191d24',
      textBackgroundBorderColor = theme?.textBackgroundBorderColor ?? '#191d24',
      textBackgroundBorderWidth = theme?.textBackgroundBorderWidth ?? 1,
      textBackgroundBorderRadius = theme?.textBackgroundBorderRadius ?? 4,
      textBackgroundPadding = theme?.textBackgroundPadding ?? 4,

      areaColor = theme?.areaColor ?? '#888888',
      areaColorOpacity = theme?.areaColorOpacity ?? 0.15,
      areaBorderColor = theme?.areaBorderColor ?? '#888888',
      areaBorderRadius = theme?.areaBorderRadius ?? 4,
      areaBorderWidth = theme?.areaBorderWidth ?? 1,
      areaLineDash = theme?.areaLineDash,

      outerPadding = theme?.outerPadding ?? 4,
    } = annotationArea
    const textBackgroundOpacity = theme?.textBackgroundOpacity
    if (range) assertAnnotationAreaRangeAxes(range, spec as ILineChartSpec)

    const dataset = advancedVSeed.dataset.flat()
    const selectedData = selectorPoint ? dataset.filter((datum) => selector(datum, selectorPoint)) : []
    const textPosition: string = annotationArea.textPosition ?? defaultTextPosition
    const textAlign =
      annotationArea.textAlign ??
      ANNOTATION_AREA_TEXT_STYLE_BY_POSITION[textPosition as keyof typeof ANNOTATION_AREA_TEXT_STYLE_BY_POSITION]
        .textAlign
    const textBaseline =
      annotationArea.textBaseline ??
      ANNOTATION_AREA_TEXT_STYLE_BY_POSITION[textPosition as keyof typeof ANNOTATION_AREA_TEXT_STYLE_BY_POSITION]
        .textBaseline

    return {
      zIndex: ANNOTATION_Z_INDEX,
      regionRelative: true,
      ...(range ? { clip: true } : {}),
      positions: (data: Datum[], context: ICartesianSeries) => {
        if (range) return annotationAreaRangePositions(range, context)
        const positionData = data.filter((item) => selectedData.some((datum) => isSubset(datum, item)))
        const xyList = positionData.map((datum) => context.dataToPosition(datum) as { x: number; y: number })

        const yAxisHelper = context.getYAxisHelper() as unknown as {
          getBandwidth: (depth?: number) => number
          getScale: () => {
            range: () => number[]
          }
        }
        const xAxisHelper = context.getXAxisHelper() as unknown as {
          getBandwidth: (depth?: number) => number
          getScale: () => {
            range: () => number[]
          }
        }

        if (typeof xAxisHelper?.getBandwidth === 'function') {
          const regionRect = context.getRegion().getLayoutRect()

          const minX = Math.min(...xyList.map((item) => item.x)) - (outerPadding || 4)
          const maxX = Math.max(...xyList.map((item) => item.x)) + (outerPadding || 4)
          const minY = 0
          const maxY = regionRect.height
          return [
            // 左上
            {
              x: minX,
              y: minY,
            },
            // 右上
            {
              x: maxX,
              y: minY,
            },
            // 右下
            {
              x: maxX,
              y: maxY,
            },
            // 左下
            {
              x: minX,
              y: maxY,
            },
          ]
        }

        if (typeof yAxisHelper?.getBandwidth === 'function') {
          const regionRect = context.getRegion().getLayoutRect()

          const minY = Math.min(...xyList.map((item) => item.y)) - (outerPadding || 4)
          const maxY = Math.max(...xyList.map((item) => item.y)) + (outerPadding || 4)
          const minX = 0
          const maxX = regionRect.width

          return [
            // 左上
            {
              x: minX,
              y: minY,
            },
            // 右上
            {
              x: maxX,
              y: minY,
            },
            // 右下
            {
              x: maxX,
              y: maxY,
            },
            // 左下
            {
              x: minX,
              y: maxY,
            },
          ]
        }

        return []
      },
      label: {
        position: (positionMap as any)[textPosition],
        visible: true,
        text: text,
        style: {
          textAlign: textAlign,
          textBaseline: textBaseline,
          fill: textColor,
          stroke: textBackgroundColor,
          lineWidth: 1,
          fontSize: textFontSize,
          fontWeight: textFontWeight,
        },

        labelBackground: {
          visible: textBackgroundVisible,
          padding: textBackgroundPadding,
          style: {
            opacity: textBackgroundOpacity ?? 0.95,
            cornerRadius: textBackgroundBorderRadius ?? 4,
            fill: textBackgroundColor,
            stroke: textBackgroundBorderColor,
            lineWidth: textBackgroundBorderWidth,
            fillOpacity: 1,
          },
        },
      },
      area: {
        style: {
          visible: true,
          fill: areaColor,
          fillOpacity: areaColorOpacity,
          stroke: areaBorderColor,
          lineWidth: areaBorderWidth,
          cornerRadius: areaBorderRadius,
          lineDash: areaLineDash,
        },
      },
    }
  }) as ILineChartSpec['markArea']

  return {
    ...spec,
    markArea: markArea,
  }
}
