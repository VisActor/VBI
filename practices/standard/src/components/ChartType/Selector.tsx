import React, { useMemo, useRef, useState } from 'react'
import { AppstoreOutlined, CloseOutlined, DownOutlined } from '@ant-design/icons'
import { Button, Popover, Typography, theme, type PopoverProps } from 'antd'
import { useVBIChartType } from '../../hooks'
import { useTranslation } from '../../i18n'
import { useVBIStore } from '../../model'
import { getChartTypeGroups, getChartTypeMeta } from '../Toolbar/config'

const { Text } = Typography
const PANEL_CARD_WIDTH = 96
const PANEL_CARD_HEIGHT = 64

export const ChartTypeSelector = ({
  compact = false,
  showText = true,
  style,
  closeOnSelect = true,
  placement = 'bottomLeft',
}: {
  compact?: boolean
  showText?: boolean
  style?: React.CSSProperties
  closeOnSelect?: boolean
  placement?: PopoverProps['placement']
}) => {
  const builder = useVBIStore((state) => state.builder)
  const { chartType, changeChartType, getAvailableChartTypes } = useVBIChartType(builder)
  const [open, setOpen] = useState(false)
  const trigger = useRef<HTMLButtonElement>(null)
  const { token } = theme.useToken()
  const { t } = useTranslation()

  const availableChartTypes = getAvailableChartTypes()

  const groupedChartTypes = useMemo(() => {
    return getChartTypeGroups(t)
      .map((group) => ({
        ...group,
        items: availableChartTypes.filter((type) => getChartTypeMeta(type, t).group === group.key),
      }))
      .filter((group) => group.items.length > 0)
  }, [availableChartTypes, t])

  const currentChartMeta = useMemo(() => getChartTypeMeta(chartType, t), [chartType, t])
  const triggerTooltip = `${currentChartMeta.label}: ${currentChartMeta.description}`

  const handleSelect = (type: string) => {
    changeChartType(type)
    if (closeOnSelect) setOpen(false)
  }

  const closePanel = () => {
    setOpen(false)
    trigger.current?.focus()
  }

  const renderChartCard = (type: string) => {
    const meta = getChartTypeMeta(type, t)
    const selected = chartType === type
    const tooltipText = `${meta.label}: ${meta.description}`

    return (
      <Button
        key={type}
        color={selected ? 'primary' : 'default'}
        variant={selected ? 'filled' : 'outlined'}
        title={tooltipText}
        aria-label={tooltipText}
        aria-pressed={selected}
        onClick={() => handleSelect(type)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          width: PANEL_CARD_WIDTH,
          height: PANEL_CARD_HEIGHT,
          padding: '8px 6px',
          textAlign: 'center',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 20,
            height: 20,
            fontSize: 13,
            flexShrink: 0,
          }}
        >
          {meta.icon}
        </span>
        <span
          style={{
            width: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontSize: 11,
            fontWeight: 600,
            lineHeight: 1.2,
          }}
        >
          {meta.label}
        </span>
      </Button>
    )
  }

  const content = (
    <div
      style={{
        width: 'min(540px, calc(100vw - 56px))',
        maxWidth: 'calc(100vw - 56px)',
        maxHeight: 'min(58vh, 420px)',
        overflowY: 'auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          background: token.colorBgContainer,
          zIndex: 1,
          paddingBottom: 10,
        }}
      >
        <Text strong style={{ fontSize: 13 }}>
          {t('toolbarChartTypePanelTitle')}
        </Text>
        {!closeOnSelect && (
          <Button
            type='text'
            size='small'
            icon={<CloseOutlined />}
            aria-label={t('commonActionsClose')}
            onClick={closePanel}
          />
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {groupedChartTypes.map((group) => (
          <div key={group.key}>
            <div style={{ marginBottom: 6 }}>
              <Text strong style={{ fontSize: 11 }}>
                {group.label}
              </Text>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(auto-fill, ${PANEL_CARD_WIDTH}px)`,
                gridAutoRows: `${PANEL_CARD_HEIGHT}px`,
                gap: 6,
                justifyContent: 'start',
              }}
            >
              {group.items.map(renderChartCard)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div
      style={style}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          event.stopPropagation()
          closePanel()
        }
      }}
    >
      <Popover
        content={content}
        trigger='click'
        open={open}
        onOpenChange={setOpen}
        placement={placement}
        getPopupContainer={(node) => (node.ownerDocument.fullscreenElement as HTMLElement) || node.ownerDocument.body}
        styles={{
          root: { padding: 0 },
          container: {
            padding: 14,
            borderRadius: token.borderRadiusLG,
          },
        }}
      >
        <Button
          ref={trigger}
          aria-expanded={open}
          size={compact ? 'middle' : 'large'}
          title={triggerTooltip}
          aria-label={triggerTooltip}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: compact ? 6 : 12,
            width: compact ? (showText ? 128 : 32) : '100%',
            maxWidth: '100%',
            height: compact ? 28 : 'auto',
            padding: compact ? (showText ? '0 8px' : '0 7px') : '12px 14px',
            borderRadius: token.borderRadiusOuter,
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: compact ? 18 : 38,
              height: compact ? 18 : 38,
              color: token.colorPrimaryText,
              fontSize: compact ? 11 : 18,
              flexShrink: 0,
            }}
          >
            {currentChartMeta.icon ?? <AppstoreOutlined />}
          </span>
          {showText ? (
            <span
              style={{
                display: 'flex',
                flex: 1,
                minWidth: 0,
                flexDirection: 'column',
                alignItems: 'flex-start',
                textAlign: 'left',
              }}
            >
              <span
                style={{
                  fontSize: compact ? 12 : 13,
                  fontWeight: 600,
                  lineHeight: 1.2,
                  color: token.colorText,
                  maxWidth: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {currentChartMeta.label}
              </span>
              {!compact ? (
                <span
                  style={{
                    fontSize: 12,
                    lineHeight: 1.4,
                    color: token.colorTextSecondary,
                    whiteSpace: 'normal',
                  }}
                >
                  {currentChartMeta.description}
                </span>
              ) : null}
            </span>
          ) : null}
          {showText && <DownOutlined aria-hidden style={{ fontSize: 12, flexShrink: 0 }} />}
        </Button>
      </Popover>
    </div>
  )
}
