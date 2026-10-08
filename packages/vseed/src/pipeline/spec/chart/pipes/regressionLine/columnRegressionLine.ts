import type { IBarChartSpec, ICartesianSeries, IChart, IVChart } from '@visactor/vchart'
import { isNullish } from 'remeda'
import { array, clamper, regressionPolynomial } from '@visactor/vutils'
import type {
  Datum,
  VChartSpecPipe,
  RegressionLineConfig,
  LinearRegressionLine,
  PolynomialRegressionLine,
} from 'src/types'
import { defaultRegressionLineColor, getAlphaByConfidenceLevel } from './common'

export const columnPolynomialRegressionLine: VChartSpecPipe = (spec, context): Partial<IBarChartSpec> => {
  const result = { ...spec } as Partial<IBarChartSpec>
  const { advancedVSeed } = context
  const { chartType, regressionLine } = advancedVSeed
  const lineTheme = advancedVSeed.config[chartType as 'scatter']?.regressionLine as RegressionLineConfig

  if (!regressionLine || !regressionLine.polynomialRegressionLine) {
    return result
  }

  const lineList = array(regressionLine.polynomialRegressionLine)

  if (!result.extensionMark) {
    result.extensionMark = []
  }

  lineList.forEach((line, lineIndex) => {
    if (line.enable === false) {
      return
    }
    const theme = (lineTheme.linearRegressionLine ?? {}) as LinearRegressionLine
    const {
      color,
      lineWidth,
      lineDash,
      text,
      textColor,
      textFontSize,
      textFontWeight,
      confidenceIntervalOpacity,
      confidenceLevel = 0.95,
      shadowBlur,
      shadowColor,
      shadowOffsetX,
      shadowOffsetY,
      confidenceIntervalVisible = theme.confidenceIntervalVisible,
    } = line as LinearRegressionLine

    const childrenMarks: any[] = []

    ;(result.extensionMark as any[]).push({
      type: 'group',
      interactive: false,
      zIndex: 500,
      name: `polynomialRegressionLine-${lineIndex}`,
      dataId: (spec.data as any)?.id,
      style: {
        data: (datum: any, ctx: any) => {
          const vchart = ctx.vchart as IVChart
          const chart = vchart.getChart() as IChart
          const s = chart.getAllSeries()[0] as ICartesianSeries

          if (s) {
            const rect = s.getRegion().getLayoutRect()

            if (rect.width === 0 || rect.height === 0) {
              return null
            }

            const yClamper = clamper(0, 0 + rect.height)
            const data = s.getViewData()?.latestData as Datum[]
            const fieldX = s.fieldX?.[0]
            const fieldY = s.fieldY?.[0]
            const xValues = s.getRawDataStatisticsByField(fieldX).values as string[]
            const degree = (line as PolynomialRegressionLine).degree ?? 2
            // 多项式拟合需要至少 degree + 1 个点
            const minPoints = degree + 1

            if (!fieldX || !fieldY || !data || data.length < minPoints || xValues.length < minPoints) {
              return null
            }

            const { confidenceInterval, evaluateGrid } = regressionPolynomial(
              xValues.map((xVal, index: number) => {
                const filteredData = data.filter((d) => d[fieldX] === xVal)

                return {
                  x: index,
                  y: Math.max(...filteredData.map((d) => d[fieldY] as number)),
                }
              }),
              undefined,
              undefined,
              {
                degree: (line as PolynomialRegressionLine).degree ?? 2,
                alpha: getAlphaByConfidenceLevel(confidenceLevel),
              },
            )
            const N = xValues.length
            const xAxisHelper = s.getXAxisHelper()
            const halfBandWidth = (xAxisHelper?.getBandwidth?.(0) ?? 0) / 2
            const lineData = evaluateGrid(N)
            const linePoints = lineData.map((datum: Datum, index: number) => {
              const d = { [fieldX]: xValues[index], [fieldY]: datum.y }
              return {
                x: s.dataToPositionX(d)! + halfBandWidth,
                y: yClamper(s.dataToPositionY(d)!),
              }
            })
            const result: {
              linePoints: { x: number; y: number }[]
              areaPoints?: { x: number; y: number; y1: number }[]
              color: string
            } = {
              linePoints,
              color: s.getOption().globalScale.getScale('color')?.scale(s.getSeriesKeys()[0]),
            }

            if (confidenceIntervalVisible) {
              const intervalData = confidenceInterval(N)

              result.areaPoints = intervalData.map((datum: Datum, index: number) => {
                const d = { [fieldX]: xValues[index], [fieldY]: datum.lower }
                return {
                  x: s.dataToPositionX(d)! + halfBandWidth,
                  y: yClamper(s.dataToPositionY(d)!),
                  y1: yClamper(s.dataToPositionY({ [fieldY]: datum.upper })!),
                }
              })
            }

            return result
          }
          return null
        },
      },
      children: childrenMarks,
    })

    if (confidenceIntervalVisible) {
      childrenMarks.push({
        type: 'area',
        interactive: false,
        zIndex: 500,
        dataId: (spec.data as any)?.id,
        style: {
          stroke: false,
          lineWidth: lineWidth ?? theme.lineWidth,
          lineDash: lineDash ?? theme.lineDash,
          fillOpacity: confidenceIntervalOpacity ?? theme.confidenceIntervalOpacity,
          fill: color ?? defaultRegressionLineColor,
          points: (datum: any, ctx: any, opt: any) => {
            const parentNode = opt.mark?._product?.parent

            if (parentNode?.attribute?.data) {
              return parentNode.attribute.data.areaPoints
            }

            return []
          },
        },
      })
    }

    childrenMarks.push({
      type: 'line',
      interactive: false,
      zIndex: 500,
      dataId: (spec.data as any)?.id,
      style: {
        lineWidth: lineWidth ?? theme.lineWidth,
        lineDash: lineDash ?? theme.lineDash,
        stroke: color ?? defaultRegressionLineColor,
        shadowBlur: shadowBlur ?? theme.shadowBlur,
        shadowColor: shadowColor ?? theme.shadowColor,
        shadowOffsetX: shadowOffsetX ?? theme.shadowOffsetX,
        shadowOffsetY: shadowOffsetY ?? theme.shadowOffsetY,
        points: (datum: any, ctx: any, opt: any) => {
          const parentNode = opt.mark?._product?.parent

          if (parentNode?.attribute?.data) {
            return parentNode.attribute.data.linePoints
          }

          return []
        },
      },
    })

    if (!isNullish(text)) {
      childrenMarks.push({
        type: 'text',
        interactive: false,
        zIndex: 500,
        dataId: (spec.data as any)?.id,
        dataKey: () => {
          return `polynomialRegressionLine-label-${lineIndex}`
        },
        style: {
          textAlign: 'end',
          fill: textColor ?? theme.textColor,
          fontSize: textFontSize ?? theme.textFontSize,
          fontWeight: textFontWeight ?? theme.textFontWeight,
          text: text,
          x: (datum: any, ctx: any, opt: any) => {
            const parentNode = opt.mark?._product?.parent

            if (parentNode?.attribute?.data?.linePoints) {
              const points = parentNode.attribute.data.linePoints
              return points[points.length - 1]?.x
            }

            return undefined
          },
          y: (datum: any, ctx: any, opt: any) => {
            const parentNode = opt.mark?._product?.parent

            if (parentNode?.attribute?.data?.linePoints) {
              const points = parentNode.attribute.data.linePoints
              return points[points.length - 1]?.y
            }

            return undefined
          },
        },
      })
    }
  })

  return result
}
