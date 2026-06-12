import type { ReactNode } from 'react'
import type { VBIChartBuilder } from '@visactor/vbi'

import { useTheme } from '../hooks'
import type { BaseComponentProps, SelectOption } from './types'
import { joinClassNames } from './utils'

const defaultThemeOptions: Array<SelectOption<string>> = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
]

export interface ThemeSelectorProps extends BaseComponentProps {
  builder: VBIChartBuilder
  label?: ReactNode
  themeOptions?: Array<SelectOption<string>>
}

function toText(option: SelectOption<string>): ReactNode {
  return option.label ?? option.value
}

export function ThemeSelector(props: ThemeSelectorProps) {
  const { builder, className, label = 'Theme', style, themeOptions = defaultThemeOptions } = props
  const { setTheme, theme } = useTheme(builder)

  return (
    <label className={joinClassNames('vbi-react-theme-selector', className)} style={style}>
      <span className='vbi-react-selector__label'>{label}</span>
      <select
        aria-label={typeof label === 'string' ? label : 'Theme'}
        className='vbi-react-control'
        onChange={(event) => {
          setTheme(event.target.value)
        }}
        value={theme}
      >
        {themeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {toText(option)}
          </option>
        ))}
      </select>
    </label>
  )
}
