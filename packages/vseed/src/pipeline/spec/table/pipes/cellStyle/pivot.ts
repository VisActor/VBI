import type { IIndicator, PivotTableConstructorOptions } from '@visactor/vtable'
import { array } from '@visactor/vutils'
import { isString } from 'remeda'
import { matchesFieldSelector, selector, selectorWithDynamicFilter } from 'src/dataSelector/selector'
import type { BodyCellStyle, Datum, PivotTableSpecPipe, TableConfig } from 'src/types'
import type { FieldSelector } from 'src/types/dataSelector'
import { getCellOriginalDataByDatum, pickBodyCellStyle, applyColorScale, getColumnMinMax } from './common'
import type { IProgressbarColumnIndicator } from '@visactor/vtable/es/ts-types/pivot-table/indicator/progress-indicator'

export const pivotTableBodyCell: PivotTableSpecPipe = (spec, context) => {
  const { advancedVSeed } = context
  const { cellStyle, config, chartType } = advancedVSeed
  const bodyCellStyle = cellStyle?.bodyCellStyle
  const themeConfig = config?.[chartType] as TableConfig

  if (!bodyCellStyle) {
    return spec as PivotTableConstructorOptions
  }
  const bodyCellStyleList = array(bodyCellStyle) as BodyCellStyle[]
  const indicators = (spec as PivotTableConstructorOptions).indicators || []
  const selectedPos: { col: number; row: number }[] = []
  const hasDynamicFilter = bodyCellStyleList.some((style) => !!style.dynamicFilter)
  const allData = advancedVSeed.dataset || []

  const newIndicators = indicators.map((ind) => {
    const newInd = isString(ind)
      ? ({
          indicatorKey: ind,
        } as IIndicator)
      : ind

    const { indicatorKey } = newInd

    // 前置处理：检查是否需要 progressBar 或 backgroundColorScale
    const progressBarStyle = bodyCellStyleList
      .filter(
        (s) => s.enableProgressBar && s?.selector && matchesFieldSelector(indicatorKey, s.selector as FieldSelector),
      )
      .pop()
    const backgroundColorScale = bodyCellStyleList.find(
      (s) =>
        s.enableBackgroundColorScale && s?.selector && matchesFieldSelector(indicatorKey, s.selector as FieldSelector),
    )
    let columnMin: number
    let columnMax: number

    if (progressBarStyle || backgroundColorScale) {
      const { min, max } = getColumnMinMax(allData, indicatorKey)
      columnMin = min
      columnMax = max
      if (progressBarStyle) {
        newInd.cellType = 'progressbar'
        ;(newInd as IProgressbarColumnIndicator).barType = 'negative'
        ;(newInd as IProgressbarColumnIndicator).min = progressBarStyle.barMin ?? columnMin
        ;(newInd as IProgressbarColumnIndicator).max = progressBarStyle.barMax ?? columnMax
      }
    }

    newInd.style = (datum: any) => {
      const { dataValue, cellHeaderPaths } = datum
      const headerPaths = [...cellHeaderPaths.colHeaderPaths, ...cellHeaderPaths.rowHeaderPaths]

      const originalDatum: Datum = {
        [indicatorKey]: dataValue,
      }

      headerPaths.forEach((path: any) => {
        if (path.dimensionKey) {
          originalDatum[path.dimensionKey] = path.value
        }
      })

      const currentCellData = getCellOriginalDataByDatum(datum, hasDynamicFilter, originalDatum)

      const mergedStyle = bodyCellStyleList.reduce<Record<string, any>>((result, style) => {
        const shouldApply = style.dynamicFilter
          ? selectorWithDynamicFilter(currentCellData || originalDatum, style.dynamicFilter, style.selector)
          : selector(originalDatum, style.selector)
        if (shouldApply) {
          if (selectedPos.length && selectedPos[0].col === datum?.col && selectedPos[0].row === datum?.row) {
            selectedPos.length = 0
          }
          selectedPos.push({
            col: datum?.col,
            row: datum?.row,
          })

          const cellStyle = pickBodyCellStyle(style)

          // 应用 backgroundColorScale
          if (style.enableBackgroundColorScale) {
            const scaledColor = applyColorScale(dataValue, {
              minValue: columnMin,
              maxValue: columnMax,
              ...themeConfig.backgroundColorScale,
              ...style.backgroundColorScale,
            } as any)
            if (scaledColor) {
              cellStyle.bgColor = scaledColor
            }
          }

          // 如果开启了数据条样式
          if (newInd.cellType === 'progressbar') {
            cellStyle.barHeight = themeConfig?.barHeight
            cellStyle.barMarkInBar = themeConfig?.barMarkInBar
            cellStyle.barMarkWidth = themeConfig?.barMarkWidth
            cellStyle.barPadding = themeConfig?.barPadding
            cellStyle.barRightToLeft = themeConfig?.barRightToLeft
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
    return newInd
  })
  return {
    ...spec,
    runningConfig: {
      ...((spec as any)?.runningConfig || {}),
      selectedPos,
    },
    indicators: newIndicators,
  } as PivotTableConstructorOptions
}
