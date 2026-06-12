import type { CSSProperties } from 'react'
import type { VBIChartBuilder } from '@visactor/vbi'
import { ChartTypeSelector, ThemeSelector } from '@visactor/vbi-react/components'

import { cn } from '../utils/cn'
import { themeSelectorStyle } from '../styles/styleObjects'

type StarterTopBarProps = {
  builder: VBIChartBuilder
  isFieldPanelVisible: boolean
  isToggleVisible: boolean
  onLoadDemoData: () => void
  onToggleFieldPanel: () => void
  onUploadClick: () => void
}

const chartTypeSelectorStyle: CSSProperties = {
  color: 'var(--starter-text-primary)',
  minWidth: 180,
}

export function StarterTopBar(props: StarterTopBarProps) {
  const { builder, isFieldPanelVisible, isToggleVisible, onLoadDemoData, onToggleFieldPanel, onUploadClick } = props

  return (
    <div className={cn('starter-card', 'starter-topbar')}>
      <div className='starter-top-intro'>
        <strong className='starter-top-title'>vbi-react Starter</strong>
        <div className='starter-top-subtitle'>
          `FieldPanel`、`FilterPanel`、`ThemeSelector`、`ChartTypeSelector` 和 `ChartRenderer`
          组成一个低门槛工作台；页面框架由 starter 自己控制，方便业务侧替换组合。
        </div>
      </div>

      <div className='starter-top-actions'>
        <ChartTypeSelector builder={builder} style={chartTypeSelectorStyle} />
        <ThemeSelector builder={builder} style={themeSelectorStyle} />
        {isToggleVisible ? (
          <button
            className={cn('starter-button', 'starter-button-secondary')}
            onClick={onToggleFieldPanel}
            type='button'
          >
            {isFieldPanelVisible ? 'Hide fields' : 'Show fields'}
          </button>
        ) : null}
        <button className={cn('starter-button', 'starter-button-primary')} onClick={onLoadDemoData} type='button'>
          Load demo data
        </button>
        <button className={cn('starter-button', 'starter-button-secondary')} onClick={onUploadClick} type='button'>
          Upload CSV
        </button>
      </div>
    </div>
  )
}
