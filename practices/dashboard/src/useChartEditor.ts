import { useEffect, useState } from 'react'
import type { VBIChartBuilder, VBIDashboardBuilder, VBIDashboardDSL } from '@visactor/vbi'

interface ChartEditorState {
  selected: { chart: VBIChartBuilder; title: string } | null
  open: (widgetId: string, chart: VBIChartBuilder) => void
  close: () => void
}

export function useChartEditor(
  builder: VBIDashboardBuilder,
  widgets: VBIDashboardDSL['widgets'],
  enabled: boolean,
): ChartEditorState {
  const [selection, setSelection] = useState<{
    dashboard: VBIDashboardBuilder
    widgetId: string
    chart: VBIChartBuilder
  } | null>(null)
  const widget =
    enabled && selection?.dashboard === builder
      ? widgets.find(
          (widget) =>
            widget.id === selection.widgetId &&
            widget.type === 'chart' &&
            builder.getChartBuilder(widget.chartId) === selection.chart,
        )
      : undefined

  useEffect(() => {
    if (!widget) setSelection(null)
  }, [widget])

  return {
    selected: widget && selection ? { chart: selection.chart, title: widget.title ?? '' } : null,
    open: (widgetId: string, chart: VBIChartBuilder) => setSelection({ dashboard: builder, widgetId, chart }),
    close: () => setSelection(null),
  }
}
