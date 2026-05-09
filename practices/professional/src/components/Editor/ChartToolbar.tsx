import {
  CompressOutlined,
  ExpandOutlined,
  MoonOutlined,
  RedoOutlined,
  SettingOutlined,
  SunOutlined,
  UndoOutlined,
} from '@ant-design/icons'
import { Button, InputNumber, Segmented, Select, Tooltip } from 'antd'
import type { ProfessionalLabels } from 'src/config/labels'
import { PROFESSIONAL_LOCALE_OPTIONS, type ProfessionalLocale, type ProfessionalTheme } from 'src/constants/builder'

type ChartToolbarProps = {
  canRedo: boolean
  canUndo: boolean
  chartType: string
  chartTypes: string[]
  configOpen: boolean
  hideLocale: boolean
  hideTheme: boolean
  isFullscreen: boolean
  labels: ProfessionalLabels
  limit: number
  locale: ProfessionalLocale
  onChartTypeChange: (value: string) => void
  onLimitChange: (value: number) => void
  onLocaleChange: (value: ProfessionalLocale) => void
  onRedo: () => void
  onToggleConfig: () => void
  onThemeChange: (value: ProfessionalTheme) => void
  onToggleFullscreen: () => void | Promise<void>
  onUndo: () => void
  theme: ProfessionalTheme
}

export const ChartToolbar = (props: ChartToolbarProps) => (
  <header className='pro-toolbar'>
    <Select
      className='pro-chart-select'
      options={props.chartTypes.map((value) => ({ label: value, value }))}
      value={props.chartType}
      onChange={props.onChartTypeChange}
    />
    <InputNumber
      className='pro-limit'
      min={1}
      prefix={props.labels.limit}
      step={50}
      value={props.limit}
      onChange={(value) => {
        if (typeof value === 'number') props.onLimitChange(value)
      }}
    />
    <div className='pro-toolbar__spacer' />
    <Tooltip title={props.labels.toolbarUndo}>
      <Button disabled={!props.canUndo} icon={<UndoOutlined />} onClick={props.onUndo} />
    </Tooltip>
    <Tooltip title={props.labels.toolbarRedo}>
      <Button disabled={!props.canRedo} icon={<RedoOutlined />} onClick={props.onRedo} />
    </Tooltip>
    <Tooltip title={props.labels.configPanel}>
      <Button
        type={props.configOpen ? 'primary' : 'default'}
        icon={<SettingOutlined />}
        onClick={props.onToggleConfig}
      />
    </Tooltip>
    {!props.hideLocale && (
      <Select<ProfessionalLocale>
        className='pro-toolbar-segment'
        options={PROFESSIONAL_LOCALE_OPTIONS}
        style={{ width: 148 }}
        value={props.locale}
        onChange={props.onLocaleChange}
      />
    )}
    {!props.hideTheme && (
      <Segmented<ProfessionalTheme>
        className='pro-toolbar-segment pro-toolbar-segment--icons'
        options={[
          { label: <SunOutlined title={props.labels.themeLight} />, value: 'light' },
          { label: <MoonOutlined title={props.labels.themeDark} />, value: 'dark' },
        ]}
        value={props.theme}
        onChange={props.onThemeChange}
      />
    )}
    <Tooltip title={props.isFullscreen ? props.labels.exitFullscreen : props.labels.fullscreen}>
      <Button
        icon={props.isFullscreen ? <CompressOutlined /> : <ExpandOutlined />}
        onClick={() => void props.onToggleFullscreen()}
      />
    </Tooltip>
  </header>
)
