import { isArray, isNullish } from 'remeda'
import tinycolor from 'tinycolor2'
import { InnerRowIndex } from 'src/dataReshape'
import type { BodyCellStyle, Datum } from 'src/types'

const tableStyleMap = {
  backgroundColor: 'bgColor',
  textColor: 'color',
  textFontSize: 'fontSize',
  borderColor: 'borderColor',
  borderLineWidth: 'borderLineWidth',
  barPositiveColor: 'barPositiveColor',
  barNegativeColor: 'barNegativeColor',
}

/**
 * 计算线性颜色映射（使用 tinycolor2）
 * @param value 实际值
 * @param minValue 最小值
 * @param maxValue 最大值
 * @param minColor 最小值颜色
 * @param maxColor 最大值颜色
 * @returns RGB 颜色字符串
 */
export const interpolateColor = (
  value: number,
  minValue: number,
  maxValue: number,
  minColor: string,
  maxColor: string,
): string => {
  const startColor = tinycolor(minColor).toRgb()
  const endColor = tinycolor(maxColor).toRgb()

  // 归一化值到 [0, 1]
  const normalized = (value - minValue) / (maxValue - minValue)
  const t = Math.max(0, Math.min(1, normalized))

  // 线性插值
  const r = Math.round(startColor.r + (endColor.r - startColor.r) * t)
  const g = Math.round(startColor.g + (endColor.g - startColor.g) * t)
  const b = Math.round(startColor.b + (endColor.b - startColor.b) * t)

  return `rgb(${r}, ${g}, ${b})`
}

/**
 * 从 bodyCellStyle 提取要应用到单元格的样式
 */
export const pickBodyCellStyle = (bodyCellStyle: BodyCellStyle) => {
  return (Object.keys(tableStyleMap) as Array<keyof typeof tableStyleMap>).reduce<Record<string, any>>((acc, key) => {
    if (key in bodyCellStyle) {
      acc[tableStyleMap[key]] = bodyCellStyle[key]
    }

    return acc
  }, {})
}

/**
 * 计算数据列的最小值和最大值
 */
export const getColumnMinMax = (allData: Datum[], field: string): { min: number; max: number } => {
  let min = Infinity
  let max = -Infinity

  for (const datum of allData) {
    const value = Number(datum[field])
    if (!Number.isNaN(value)) {
      min = Math.min(min, value)
      max = Math.max(max, value)
    }
  }

  return {
    min: min === Infinity ? 0 : min,
    max: max === -Infinity ? 0 : max,
  }
}

/**
 * 应用 scale 颜色映射
 */
export const applyColorScale = (
  value: any,
  scale: { minValue: number; maxValue: number; minColor: string; maxColor: string } | undefined,
): string | undefined => {
  if (!scale) return undefined

  const numValue = Number(value)
  if (Number.isNaN(numValue) || isNullish(value)) return undefined

  const minValue = scale.minValue
  const maxValue = scale.maxValue

  if (minValue === maxValue) {
    return scale.minColor
  }

  return interpolateColor(numValue, minValue, maxValue, scale.minColor, scale.maxColor)
}

export const getCellOriginalDataByDatum = (datum: any, hasDynamicFilter: boolean, originalDatum: Datum) => {
  const tableInstance = datum?.table
  let originRowData =
    tableInstance && hasDynamicFilter ? tableInstance?.getCellOriginRecord(datum?.col, datum?.row) : null
  if (originRowData && isArray(originRowData)) {
    originRowData = originRowData[0]
  }
  return originRowData
    ? {
        ...originalDatum,
        [InnerRowIndex]: originRowData?.[InnerRowIndex], // 内部行号字段
      }
    : null
}
