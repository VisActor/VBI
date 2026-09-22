import {
  CloudUploadOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  InfoCircleOutlined,
  MoonOutlined,
  RedoOutlined,
  SunOutlined,
  UndoOutlined,
} from '@ant-design/icons'
import { Button, InputNumber, Segmented, Select, Space, Tooltip, theme } from 'antd'
import React, { useState } from 'react'
import { ChartTypeSelector } from '../ChartType'
import { CSVModal } from '../CSVModal'
import { DEMO_LOCALE_LABELS, DEMO_SUPPORTED_LOCALES, type DemoLocale, type DemoTheme } from '../../constants/builder'
import { useVBIBuilder, useVBIUndoManager } from '../../hooks'
import { useTranslation } from '../../i18n'
import { useVBIStore, useVBIStoreConfig } from '../../model'
import { CONNECTOR_ID } from '../../utils/localConnector'
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
  const logState = useVBIStore((state) => state.logState)
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
      onDoubleClick={() => {
        void logState()
      }}
      style={{
        width: '100%',
        overflowX: 'auto',
        padding: '4px 6px',
        background: token.colorBgContainer,
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
            onChange={(value: number | string | null) => {
              if (typeof value === 'number') {
                setLimit(normalizeLimitValue(value))
              }
            }}
            size='small'
            placeholder={t('toolbarLimitPlaceholder', {
              defaultLimit: defaultLimitText,
            })}
            formatter={(value: string | number | undefined) => formatNumber(value)}
            parser={(value: string | undefined) => Number(value?.replace(/[^\d]/g, '') || 0)}
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
                <Select<DemoLocale>
                  size='small'
                  value={locale}
                  style={{ minWidth: 128 }}
                  options={DEMO_SUPPORTED_LOCALES.map((value) => ({ label: DEMO_LOCALE_LABELS[value], value }))}
                  onChange={setLocale}
                />
              </Tooltip>
            </>
          ) : null}

          {!hideTheme ? (
            <>
              <ToolbarDivider />

              <Tooltip title={`${t('toolbarThemeLabel')}: ${t('toolbarThemeDescription')}`}>
                <Segmented<DemoTheme>
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
                  onChange={(value: DemoTheme) => setTheme(value)}
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
