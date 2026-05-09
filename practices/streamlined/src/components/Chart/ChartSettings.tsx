import type { VBIChartBuilder, VBIChartDSL } from '@visactor/vbi'
import { InputNumber, Segmented, Select } from 'antd'
import type { ReactNode } from 'react'
import type { StreamLabels } from 'src/config/labels'
import { DEMO_LOCALE_OPTIONS, type DemoLocale } from 'src/constants/builder'
import { normalizeLimit, readLimit } from 'src/utils/chartControlUtils'

type ChartSettingsProps = {
  builder: VBIChartBuilder
  dsl: VBIChartDSL
  hideLocale: boolean
  hideTheme: boolean
  labels: StreamLabels
}

const SettingRow = ({ children, label }: { children: ReactNode; label: string }) => (
  <div className='stream-setting-row'>
    <span>{label}</span>
    {children}
  </div>
)

export const ChartSettings = ({ builder, dsl, hideLocale, hideTheme, labels }: ChartSettingsProps) => (
  <div className='stream-settings-content'>
    <SettingRow label={labels.limit}>
      <InputNumber
        min={1}
        size='small'
        step={50}
        value={readLimit(dsl.limit)}
        onChange={(value) => {
          if (typeof value === 'number') builder.limit.setLimit(normalizeLimit(value))
        }}
      />
    </SettingRow>
    {!hideTheme && (
      <SettingRow label={labels.theme}>
        <Segmented
          onChange={(value) => builder.theme.setTheme(value === 'dark' ? 'dark' : 'light')}
          options={[
            { label: labels.themeLight, value: 'light' },
            { label: labels.themeDark, value: 'dark' },
          ]}
          size='small'
          value={dsl.theme === 'dark' ? 'dark' : 'light'}
        />
      </SettingRow>
    )}
    {!hideLocale && (
      <SettingRow label={labels.language}>
        <Select
          onChange={(value) => builder.locale.setLocale(value as DemoLocale)}
          options={DEMO_LOCALE_OPTIONS}
          size='small'
          style={{ minWidth: 148 }}
          value={(dsl.locale ?? labels.locale) as DemoLocale}
        />
      </SettingRow>
    )}
  </div>
)
