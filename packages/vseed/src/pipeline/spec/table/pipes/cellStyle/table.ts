import type { ListTableConstructorOptions, ColumnDefine, ProgressbarColumnDefine } from '@visactor/vtable'
import { array } from '@visactor/vutils'
import { isNullish, isNumber, isPlainObject, isString } from 'remeda'
import { isFieldSelector, matchesFieldSelector, selector, selectorWithDynamicFilter } from 'src/dataSelector/selector'
import type { BodyCellStyle, ListTableSpecPipe, TableConfig } from 'src/types'
import type { FieldSelector, MeasureSelector } from 'src/types/dataSelector'
import { getCellOriginalDataByDatum, pickBodyCellStyle, applyColorScale, getColumnMinMax } from './common'
import { preorderTraverse } from 'src/pipeline/utils/tree/traverse'

export const tableBodyCell: ListTableSpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const { cellStyle, config, chartType } = advancedVSeed
  const bodyCellStyle = cellStyle?.bodyCellStyle
  const themeConfig = config?.[chartType] as TableConfig

  if (!bodyCellStyle) {
    return spec as ListTableConstructorOptions
  }

  const bodyCellStyleList = array(bodyCellStyle) as BodyCellStyle[]
  const columns = (spec as ListTableConstructorOptions).columns || []
  const selectedPos: { col: number; row: number }[] = []
  const allData = advancedVSeed.dataset || []

  const setStyleOfColumn = (col: ColumnDefine) => {
    const field = col.field as string

    // 过滤出匹配当前列的样式配置
    const matchedStyles = bodyCellStyleList.filter((style) => {
      // 检查 dynamicFilter
      if (style?.dynamicFilter) {
        return style.dynamicFilter?.result?.success === true || !!style.dynamicFilter?.fallback
      }

      // 检查 selector
      if (isNullish(style.selector)) {
        return true
      }

      const selectors = array(style.selector) as any[]
      return selectors.some((sel) => {
        // 1. FieldSelector（字段选择器）
        if (isFieldSelector(sel)) {
          return matchesFieldSelector(field, sel)
        }

        // 2. MeasureSelector/DimensionSelector（条件选择器）
        if (isPlainObject(sel)) {
          return isNullish(sel.field) || (sel as MeasureSelector).field === field
        }

        // 3. ValueSelector（值选择器）
        return isNumber(sel) || isString(sel)
      })
    })

    if (!matchedStyles.length) {
      return false
    }

    const hasDynamicFilter = matchedStyles.some((style) => !!style.dynamicFilter)

    // 前置处理：检查是否需要 progressBar
    const progressBarStyle = matchedStyles
      .filter((s) => s.enableProgressBar && s?.selector && matchesFieldSelector(field, s.selector as FieldSelector))
      .pop()
    const backgroundColorScale = matchedStyles.find(
      (s) => s.enableBackgroundColorScale && s?.selector && matchesFieldSelector(field, s.selector as FieldSelector),
    )
    let columnMin: number
    let columnMax: number
    if (progressBarStyle || backgroundColorScale) {
      const { min, max } = getColumnMinMax(allData, field)
      columnMin = min
      columnMax = max
      if (progressBarStyle) {
        col.cellType = 'progressbar'
        ;(col as ProgressbarColumnDefine).barType = 'negative'
        ;(col as ProgressbarColumnDefine).min = progressBarStyle.barMin ?? columnMin
        ;(col as ProgressbarColumnDefine).max = progressBarStyle.barMin ?? columnMax
      }
    }

    // 统一的 col.style 回调
    col.style = (datum: any) => {
      const originalDatum = {
        [field]: datum.dataValue,
      }
      const currentCellData = getCellOriginalDataByDatum(datum, hasDynamicFilter, originalDatum)

      const mergedStyle = matchedStyles.reduce<Record<string, any>>((result, style) => {
        const shouldApply = style.dynamicFilter
          ? selectorWithDynamicFilter(currentCellData || originalDatum, style.dynamicFilter, style.selector)
          : selector(originalDatum, style.selector)

        if (shouldApply) {
          if (selectedPos.length && selectedPos[0].col === datum?.col && selectedPos[0].row === datum?.row) {
            // 说明重复进入了，清空历史
            selectedPos.length = 0
          }
          selectedPos.push({
            col: datum?.col,
            row: datum?.row,
          })

          let cellStyle = pickBodyCellStyle(style)

          // 应用 backgroundColorScale
          if (style.enableBackgroundColorScale) {
            const scaledColor = applyColorScale(datum.dataValue, {
              minValue: columnMin,
              maxValue: columnMax,
              ...themeConfig.backgroundColorScale,
              ...style?.backgroundColorScale,
            } as any)
            if (scaledColor) {
              cellStyle.bgColor = scaledColor
            }
          }
          // 如果开启了数据条样式
          if (col.cellType === 'progressbar') {
            cellStyle = {
              ...cellStyle,
              barHeight: themeConfig?.barHeight,
              barMarkInBar: themeConfig?.barMarkInBar,
              barMarkWidth: themeConfig?.barMarkWidth,
              barPadding: themeConfig?.barPadding,
              barRightToLeft: themeConfig?.barRightToLeft,
              barAxisColor: themeConfig?.barAxisColor,
            }
          }

          return {
            ...result,
            ...cellStyle,
          }
        }

        return result
      }, {})

      return mergedStyle
    }

    return false
  }

  preorderTraverse<ColumnDefine, 'columns'>(columns, setStyleOfColumn, 'columns')
  ;(spec as any).runningConfig = {
    ...((spec as any).runningConfig || {}),
    selectedPos,
  }

  return spec as ListTableConstructorOptions
}
