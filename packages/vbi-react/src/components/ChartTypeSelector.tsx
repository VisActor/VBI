import type { ReactNode } from 'react'
import type { VBIChartBuilder } from '@visactor/vbi'

import { useChartType } from '../hooks'
import type { BaseComponentProps } from './types'
import { joinClassNames } from './utils'

export interface ChartTypeSelectorProps extends BaseComponentProps {
  builder: VBIChartBuilder
  getOptionLabel?: (chartType: string) => ReactNode
  label?: ReactNode
}

export function ChartTypeSelector(props: ChartTypeSelectorProps) {
  const { builder, className, getOptionLabel, label = 'Chart type', style } = props
  const { availableChartTypes, chartType, setChartType } = useChartType(builder)

  return (
    <label className={joinClassNames('vbi-react-chart-type-selector', className)} style={style}>
      <span className='vbi-react-selector__label'>{label}</span>
      <select
        aria-label={typeof label === 'string' ? label : 'Chart type'}
        className='vbi-react-control'
        onChange={(event) => {
          setChartType(event.target.value)
        }}
        value={chartType}
      >
        {availableChartTypes.map((availableChartType) => (
          <option key={availableChartType} value={availableChartType}>
            {getOptionLabel?.(availableChartType) ?? availableChartType}
          </option>
        ))}
      </select>
    </label>
  )
}
