import type { CSSProperties } from 'react'
import type { VBIChartBuilder } from '@visactor/vbi'
import { ChartTypeSelector } from '@visactor/vbi-react/components'

import { cn } from '../utils/cn'

type StarterTopBarProps = {
  builder: VBIChartBuilder
  onLoadDemoData: () => void
  onUploadClick: () => void
}

const chartTypeSelectorStyle: CSSProperties = {
  color: 'var(--starter-text-primary)',
  minWidth: 180,
}

export function StarterTopBar(props: StarterTopBarProps) {
  const { builder, onLoadDemoData, onUploadClick } = props

  return (
    <div className={cn('starter-card', 'starter-topbar')}>
      <div className="starter-top-intro">
        <strong className="starter-top-title">vbi-react Starter</strong>
        <div className="starter-top-subtitle">
          `FieldPanel`、`ChartTypeSelector`、`ChartRenderer` 和 `BuilderLayout`
          直接拼出一个可用的低门槛搭建器；需要深度自定义时，再下钻到 hooks。
        </div>
      </div>

      <div className="starter-top-actions">
        <ChartTypeSelector builder={builder} style={chartTypeSelectorStyle} />
        <button className={cn('starter-button', 'starter-button-primary')} onClick={onLoadDemoData} type="button">
          Load demo data
        </button>
        <button className={cn('starter-button', 'starter-button-secondary')} onClick={onUploadClick} type="button">
          Upload CSV
        </button>
      </div>
    </div>
  )
}
