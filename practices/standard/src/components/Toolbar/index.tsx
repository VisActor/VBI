import {
  FullscreenExitOutlined,
  FullscreenOutlined,
  InfoCircleOutlined,
  MoonOutlined,
  RedoOutlined,
  SunOutlined,
  UndoOutlined,
  CloudUploadOutlined,
} from '@ant-design/icons'
import { Button, InputNumber, Segmented, Select, Space, Tooltip, theme } from 'antd'
import React, { useState } from 'react'
import { ChartTypeSelector } from 'src/components/ChartType'
import { CSVModal } from 'src/components/CSVModal'
import { DEMO_LOCALE_OPTIONS, type DemoLocale, type DemoTheme } from 'src/constants/builder'
import { useVBIBuilder, useVBIUndoManager } from 'src/hooks'
import { useTranslation } from 'src/i18n'
import { useVBIStore, useVBIStoreConfig } from 'src/model'
import { CONNECTOR_ID } from 'src/utils/localConnector'
import { formatDefaultLimit } from './config'

const normalizeLimitValue = (value: number) => {
  return Math.max(1, Math.round(value))
}

const ToolbarDivider = () => {
  const { token } = theme.useToken()

  return (
    <span
      style={{
        width: 1,
        height: 16,
        background: token.colorBorderSecondary,
        flexShrink: 0,
      }}
    />
  )
}

export const Toolbar: React.FC<{
  isFullscreen: boolean
  onToggleFullscreen: () => void | Promise<void>
}> = ({ isFullscreen, onToggleFullscreen }) => {
  const [isCSVModalOpen, setIsCSVModalOpen] = useState(false)
  const builder = useVBIStore((state) => state.builder)
  const switchSource = useVBIStore((state) => state.switchSource)
  const { token } = theme.useToken()
  const { hideLocale, hideTheme } = useVBIStoreConfig()
  const { canUndo, canRedo, undo, redo } = useVBIUndoManager(builder)
  const { t, locale, setLocale } = useTranslation()
  const { theme: themeMode, limit, setTheme, setLimit } = useVBIBuilder(builder)
  const defaultLimitText = formatDefaultLimit(locale)

  const formatNumber = (value: string | number | undefined | null) => {
    if (value === undefined || value === null || value === '') {
      return ''
    }

    const numericValue = typeof value === 'number' ? value : Number(String(value).replace(/[^\d.-]/g, ''))

    if (!Number.isFinite(numericValue)) {
      return ''
    }

    return new Intl.NumberFormat(locale).format(numericValue)
  }

  return (
    <div
      style={{
        width: '100%',
        overflowX: 'auto',
        padding: '4px 6px',
        background:
          themeMode === 'dark'
            ? 'linear-gradient(90deg, rgba(10, 17, 28, 0.96) 0%, rgba(15, 22, 35, 0.88) 100%)'
            : 'linear-gradient(90deg, rgba(248, 250, 252, 0.96) 0%, rgba(255, 255, 255, 0.98) 100%)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          minWidth: 'max-content',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            whiteSpace: 'nowrap',
          }}
        >
          <ChartTypeSelector compact />

          <Tooltip title={t('toolbarImportCSV')}>
            <Button
              icon={<CloudUploadOutlined style={{ fontSize: 12 }} />}
              onClick={() => setIsCSVModalOpen(true)}
              size='small'
            />
          </Tooltip>

          <ToolbarDivider />

          <Space.Compact size='small'>
            <Tooltip title={`${t('toolbarHistoryUndo')} (Ctrl/Cmd+Z)`}>
              <Button
                icon={<UndoOutlined style={{ fontSize: 12 }} />}
                onClick={undo}
                disabled={!canUndo}
                size='small'
              />
            </Tooltip>
            <Tooltip title={`${t('toolbarHistoryRedo')} (Ctrl+Y / Cmd+Shift+Z)`}>
              <Button
                icon={<RedoOutlined style={{ fontSize: 12 }} />}
                onClick={redo}
                disabled={!canRedo}
                size='small'
              />
            </Tooltip>
          </Space.Compact>
        </div>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            whiteSpace: 'nowrap',
          }}
        >
          <InputNumber
            min={1}
            step={50}
            value={limit}
            style={{ width: 96 }}
            onChange={(value) => {
              if (typeof value === 'number') {
                setLimit(normalizeLimitValue(value))
              }
            }}
            size='small'
            placeholder={t('toolbarLimitPlaceholder', {
              defaultLimit: defaultLimitText,
            })}
            formatter={(value) => formatNumber(value)}
            parser={(value) => Number(value?.replace(/[^\d]/g, '') || 0)}
          />
          <Tooltip
            title={t('toolbarLimitTooltip', {
              defaultLimit: defaultLimitText,
            })}
          >
            <InfoCircleOutlined
              style={{
                fontSize: 12,
                color: token.colorTextTertiary,
                cursor: 'help',
              }}
            />
          </Tooltip>

          {!hideLocale ? (
            <>
              <ToolbarDivider />

              <Tooltip title={`${t('toolbarLocaleLabel')}: ${t('toolbarLocaleDescription')}`}>
                <Select
                  size='small'
                  value={locale}
                  style={{ width: 138 }}
                  options={DEMO_LOCALE_OPTIONS}
                  onChange={(value) => setLocale(value as DemoLocale)}
                />
              </Tooltip>
            </>
          ) : null}

          {!hideTheme ? (
            <>
              <ToolbarDivider />

              <Tooltip title={`${t('toolbarThemeLabel')}: ${t('toolbarThemeDescription')}`}>
                <Segmented
                  size='small'
                  value={themeMode}
                  options={[
                    {
                      label: <SunOutlined style={{ fontSize: 12 }} />,
                      value: 'light',
                    },
                    {
                      label: <MoonOutlined style={{ fontSize: 12 }} />,
                      value: 'dark',
                    },
                  ]}
                  onChange={(value) => setTheme(value as DemoTheme)}
                />
              </Tooltip>

              <ToolbarDivider />
            </>
          ) : null}

          <Tooltip title={t(isFullscreen ? 'toolbarFullscreenExit' : 'toolbarFullscreenEnter')}>
            <Button
              icon={
                isFullscreen ? (
                  <FullscreenExitOutlined style={{ fontSize: 12 }} />
                ) : (
                  <FullscreenOutlined style={{ fontSize: 12 }} />
                )
              }
              onClick={() => {
                void onToggleFullscreen()
              }}
              size='small'
            />
          </Tooltip>
        </div>
      </div>
      <CSVModal
        open={isCSVModalOpen}
        onCancel={() => setIsCSVModalOpen(false)}
        onConfirm={async (data, schema) => {
          await switchSource(CONNECTOR_ID, data, schema)
          setIsCSVModalOpen(false)
        }}
      />
    </div>
  )
}
