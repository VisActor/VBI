import type { ISpec } from '@visactor/vchart'
import VChart from '@visactor/vchart'
import type {
  ListTableConstructorOptions,
  PivotChartConstructorOptions,
  PivotTableConstructorOptions,
} from '@visactor/vtable'
import { ListTable, PivotChart, PivotTable, register } from '@visactor/vtable'
import type { VSeed } from '@visactor/vseed'
import {
  Builder as VSeedBuilder,
  ColorIdEncoding,
  isPivotChart,
  isPivotTable,
  isTable,
  isVChart,
  registerAll,
} from '@visactor/vseed'

registerAll()
register.chartModule('vchart', VChart)

type PivotRecord = Record<string, unknown>

const readEventValue = (args: unknown) => {
  if (!args || typeof args !== 'object' || !('value' in args)) {
    return undefined
  }
  return (args as { value?: unknown }).value
}

const toNumericRange = (value: unknown): [number, number] | undefined => {
  if (!Array.isArray(value) || value.length < 2) {
    return undefined
  }

  const minValue = Number(value[0])
  const maxValue = Number(value[1])
  if (Number.isNaN(minValue) || Number.isNaN(maxValue)) {
    return undefined
  }
  return [minValue, maxValue]
}

export type VBIVSeedRenderCleanup = (() => void) | undefined

export const renderVSeed = (params: {
  container: HTMLElement
  vseed?: VSeed
  onError: (error: unknown) => void
}): VBIVSeedRenderCleanup => {
  const { container, onError, vseed } = params

  if (!vseed) {
    return undefined
  }

  try {
    const builtSpec = VSeedBuilder.from(vseed).build()
    if (isPivotChart(vseed)) {
      const tableInstance = new PivotChart(container, builtSpec as PivotChartConstructorOptions)

      const handleLegendItemClick = (args: unknown) => {
        const rawValue = readEventValue(args)
        const filteredValues = rawValue === undefined ? [] : Array.isArray(rawValue) ? rawValue : [rawValue]
        tableInstance.updateFilterRules([{ filterKey: ColorIdEncoding, filteredValues }])
      }

      const handleLegendChange = (args: unknown) => {
        const range = toNumericRange(readEventValue(args))
        if (!range) {
          return
        }
        const [minValue, maxValue] = range
        tableInstance.updateFilterRules([
          {
            filterFunc: (record: PivotRecord) => {
              const colorKey = record[ColorIdEncoding]
              if (typeof colorKey !== 'string') {
                return false
              }
              const rawValue = record[colorKey]
              if (typeof rawValue !== 'number') {
                return false
              }
              return rawValue >= minValue && rawValue <= maxValue
            },
          },
        ])
      }

      tableInstance.on('legend_item_click', handleLegendItemClick)
      tableInstance.on('legend_change', handleLegendChange)
      return () => {
        tableInstance.off('legend_item_click', handleLegendItemClick)
        tableInstance.off('legend_change', handleLegendChange)
        tableInstance.release()
      }
    }

    if (isPivotTable(vseed)) {
      const tableInstance = new PivotTable(container, builtSpec as PivotTableConstructorOptions)
      return () => tableInstance.release()
    }

    if (isTable(vseed)) {
      const tableInstance = new ListTable(container, builtSpec as ListTableConstructorOptions)
      return () => tableInstance.release()
    }

    if (isVChart(vseed)) {
      const vchart = new VChart(builtSpec as ISpec, { dom: container })
      vchart.renderSync()
      return () => vchart.release()
    }
    return undefined
  } catch (error) {
    onError(error)
    return undefined
  }
}
