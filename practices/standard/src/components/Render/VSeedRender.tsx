import { useRef, useEffect } from 'react'
import type { ISpec } from '@visactor/vchart'
import VChart from '@visactor/vchart'
import type {
  PivotChartConstructorOptions,
  ListTableConstructorOptions,
  PivotTableConstructorOptions,
} from '@visactor/vtable'
import { ListTable, PivotTable, PivotChart, register } from '@visactor/vtable'
import type { VSeed } from '@visactor/vseed'
import {
  registerAll,
  isPivotChart,
  isVChart,
  isPivotTable,
  isTable,
  ColorIdEncoding,
  Builder as VSeedBuilder,
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

export const VSeedRender = (props: { vseed: VSeed }) => {
  const { vseed } = props
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) {
      return
    }
    try {
      const builder = VSeedBuilder.from(vseed)
      const spec = builder.build()
      if (isPivotChart(vseed)) {
        const tableInstance = new PivotChart(ref.current, spec as PivotChartConstructorOptions)

        const handleLegendItemClick = (args: unknown) => {
          const rawValue = readEventValue(args)
          const filteredValues = rawValue === undefined ? [] : Array.isArray(rawValue) ? rawValue : [rawValue]
          tableInstance.updateFilterRules([
            {
              filterKey: ColorIdEncoding,
              filteredValues,
            },
          ])
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
      } else if (isPivotTable(vseed)) {
        // Check PivotTable BEFORE Table since PivotTable is a type of table
        const tableInstance = new PivotTable(ref.current, spec as PivotTableConstructorOptions)
        return () => tableInstance.release()
      } else if (isTable(vseed)) {
        const tableInstance = new ListTable(ref.current, spec as ListTableConstructorOptions)
        return () => tableInstance.release()
      } else if (isVChart(vseed)) {
        const vchart = new VChart(spec as ISpec, { dom: ref.current })
        vchart.renderSync()
        return () => vchart.release()
      }
    } catch (error: unknown) {
      console.error('VSeed Render Error:', error)
    }
  }, [vseed])

  return <div ref={ref} style={{ height: '100%', width: '100%', minHeight: 0 }} />
}
