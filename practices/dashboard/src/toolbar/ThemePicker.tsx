import { useId } from 'react'
import { Select, Tooltip, theme as antdTheme, type SelectProps } from 'antd'
import { useDashboard } from '../DashboardContext'
import { useTranslation } from '../i18n'
import { getThemeLabel } from '../i18n/theme'
import { getDashboardThemeOptions } from '../theme/registry'
import './ThemePicker.css'

const selectStyles: SelectProps['styles'] = {
  root: { paddingInline: 8 },
  content: { display: 'flex', alignItems: 'center', justifyContent: 'center', marginInlineEnd: 0 },
  popup: {
    root: { padding: 6, borderRadius: 12 },
    listItem: { padding: '10px 12px', borderRadius: 8 },
  },
}

function ThemePreview({ label, colors, compact = false }: { label: string; colors: string[]; compact?: boolean }) {
  const { token } = antdTheme.useToken()
  const dot = (
    <span className='vbi-dashboard-theme-dot' aria-hidden style={{ background: colors[0] ?? token.colorPrimary }} />
  )
  return (
    <Tooltip
      title={label}
      placement={compact ? 'top' : 'left'}
      getPopupContainer={(trigger) => trigger.closest<HTMLElement>('.vbi-dashboard')!}
      destroyOnHidden
    >
      {compact ? (
        dot
      ) : (
        <span className='vbi-dashboard-theme-option' aria-hidden>
          {dot}
          <span className='vbi-dashboard-theme-swatches'>
            {colors.map((color, index) => (
              <span key={index} style={{ background: color }} />
            ))}
          </span>
        </span>
      )}
    </Tooltip>
  )
}

export function DashboardThemePicker() {
  const id = useId()
  const { locale, theme, mode, editing, onThemeChange } = useDashboard()
  const t = useTranslation(locale)
  if (mode !== 'edit') return null
  const selectedName = theme.name
  const themes = getDashboardThemeOptions().map((theme) => ({ ...theme, label: getThemeLabel(theme, t) }))
  const selected = themes.find((theme) => theme.name === selectedName)!
  const groups = (['light', 'dark'] as const).map((mode) => ({
    label: t(mode === 'light' ? 'themeGroupLight' : 'themeGroupDark'),
    options: themes
      .filter((theme) => theme.baseTheme === mode)
      .map((theme) => ({
        value: theme.name,
        label: <ThemePreview label={theme.label} colors={theme.colors} />,
        'aria-label': theme.label,
        title: '',
      })),
  }))

  return (
    <Select
      id={id}
      className='vbi-dashboard-theme-select'
      aria-label={t('dashboardTheme')}
      aria-description={selected.label}
      title=''
      value={selectedName}
      onChange={(name) => onThemeChange?.(name)}
      disabled={!editing || !onThemeChange}
      options={groups}
      labelRender={() => <ThemePreview label={selected.label} colors={selected.colors} compact />}
      suffixIcon={null}
      variant='borderless'
      popupMatchSelectWidth={216}
      placement='bottomRight'
      styles={selectStyles}
      virtual={false}
      listHeight={320}
      getPopupContainer={(trigger) => trigger.parentElement!}
    />
  )
}
