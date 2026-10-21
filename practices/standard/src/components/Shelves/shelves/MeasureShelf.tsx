import { theme } from 'antd'
import type { MenuProps } from 'antd'
import { message } from 'antd'
import { useMemo } from 'react'
import { useVBIMeasures, useVBISchemaFields } from '../../../hooks'
import { useTranslation } from '../../../i18n'
import { useVBIStore } from '../../../model'
import type { VBIMeasure, VBIMeasureFormat } from '@visactor/vbi'
import { FieldShelf, SHELF_MENU_ITEM_STYLE, type FieldShelfTone } from '../common/FieldShelf'
import { MeasureFormatPanel } from '../common/MeasureFormatPanel'
import { openShelfRenameModal } from '../common/openShelfRenameModal'
import {
  formatMeasureAggregate,
  getAggregateItemsByFieldRole,
  getDefaultAggregateByFieldRole,
  getMeasureFieldRoleBySchemaType,
  isAggregateSupportedByFieldRole,
  type MeasureAggregate,
} from '../utils/measureAggregateUtils'
import { buildShelfMenuLabel, SHELF_MENU_SUBMENU_OFFSET } from '../utils/menuItemUtils'
import { getMeasureMenuSelectedKeys } from '../utils/menuSelectionUtils'
import { formatSortDisplaySuffix, formatSortMenuSummary } from '../utils/sortUtils'
import { reorderYArrayByInsertIndex, type YArrayLike } from '../utils/reorderUtils'

const QUANTILE_PERCENT_OPTIONS = [1, 5, 25, 50, 75, 90, 95, 99] as const
const DELETE_DIVIDER_STYLE: React.CSSProperties = {
  marginBlock: 0,
}

const MEASURE_ENCODING_LABEL_KEY_MAP: Record<NonNullable<VBIMeasure['encoding']>, string> = {
  primaryYAxis: 'shelvesMeasureEncodingPrimaryYAxis',
  secondaryYAxis: 'shelvesMeasureEncodingSecondaryYAxis',
  xAxis: 'shelvesMeasureEncodingXAxis',
  yAxis: 'shelvesMeasureEncodingYAxis',
  angle: 'shelvesMeasureEncodingAngle',
  radius: 'shelvesMeasureEncodingRadius',
  size: 'shelvesMeasureEncodingSize',
  color: 'shelvesMeasureEncodingColor',
  detail: 'shelvesMeasureEncodingDetail',
  column: 'shelvesMeasureEncodingColumn',
  label: 'shelvesMeasureEncodingLabel',
  tooltip: 'shelvesMeasureEncodingTooltip',
  value: 'shelvesMeasureEncodingValue',
  q1: 'shelvesMeasureEncodingQ1',
  q3: 'shelvesMeasureEncodingQ3',
  min: 'shelvesMeasureEncodingMin',
  max: 'shelvesMeasureEncodingMax',
  median: 'shelvesMeasureEncodingMedian',
  outliers: 'shelvesMeasureEncodingOutliers',
  x0: 'shelvesMeasureEncodingX0',
  x1: 'shelvesMeasureEncodingX1',
}

export const MeasureShelf = ({ style }: { style?: React.CSSProperties }) => {
  const builder = useVBIStore((state) => state.builder)
  const { token } = theme.useToken()
  const { t } = useTranslation()
  const { measures, addMeasure, removeMeasure, updateMeasure } = useVBIMeasures(builder)
  const { fieldTypeMap } = useVBISchemaFields(builder)
  const measureShelfTone = useMemo<FieldShelfTone>(() => {
    const accent = token.colorSuccessText
    const border = token.colorSuccessBorder
    const hoverBackground = token.colorSuccessBgHover

    return {
      trackBackground: token.colorBgContainer,
      trackBorder: border,
      placeholderColor: token.colorTextQuaternary,
      dragOverBackground: hoverBackground,
      dragOverBorder: accent,
      itemBackground: token.colorBgContainer,
      itemHoverBackground: hoverBackground,
      itemBorder: border,
      itemHoverBorder: accent,
      textColor: accent,
      iconBackground: 'transparent',
      iconHoverBackground: 'transparent',
      iconColor: accent,
    }
  }, [token])

  const getFieldRole = (fieldName: string, fieldType?: string) => {
    return getMeasureFieldRoleBySchemaType(fieldType ?? fieldTypeMap[fieldName])
  }

  const addFieldAt = (params: { fieldName: string; fieldType?: string; insertIndex: number }) => {
    const { fieldName, fieldType, insertIndex } = params
    const originalLength = measures.length
    const fieldRole = getFieldRole(fieldName, fieldType)
    const aggregate = getDefaultAggregateByFieldRole(fieldRole)

    addMeasure(fieldName, (node) => {
      node.setAggregate(aggregate)
    })

    if (insertIndex < originalLength) {
      const yMeasures = builder.dsl.get('measures') as YArrayLike | undefined
      if (!yMeasures) {
        return
      }

      builder.doc.transact(() => {
        reorderYArrayByInsertIndex({
          yArray: yMeasures,
          dragIndex: originalLength,
          insertIndex,
        })
      })
    }
  }

  const renameMeasure = (id: string, alias: string) => {
    updateMeasure(id, (node) => {
      node.setAlias(alias)
    })
  }

  const changeAggregate = (id: string, aggregate: MeasureAggregate) => {
    updateMeasure(id, (node) => {
      node.setAggregate(aggregate)
    })
  }

  const changeEncoding = (id: string, encoding: NonNullable<VBIMeasure['encoding']>) => {
    updateMeasure(id, (node) => {
      node.setEncoding(encoding)
    })
  }

  const changeFormat = (id: string, format: VBIMeasureFormat | undefined) => {
    updateMeasure(id, (node) => {
      if (format === undefined) {
        node.clearFormat()
      } else {
        node.setFormat(format)
      }
    })
  }

  const changeSort = (id: string, sort: VBIMeasure['sort'] | undefined) => {
    updateMeasure(id, (node) => {
      if (sort) {
        node.setSort(sort)
        return
      }

      node.clearSort()
    })
  }

  const buildMeasureMenuItems = (measure: (typeof measures)[number]): MenuProps['items'] => {
    const fieldRole = getFieldRole(measure.field)
    const availableAggregates = getAggregateItemsByFieldRole(fieldRole, t)
    const supportedEncodings = builder.chartType.getSupportedMeasureEncodings()
    const measureIndex = measures.findIndex((item) => item.id === measure.id)
    const recommendedEncoding =
      measureIndex >= 0 ? builder.chartType.getRecommendedMeasureEncodings(measures.length)[measureIndex] : undefined

    const aggregateMenuItems: NonNullable<MenuProps['items']> = availableAggregates.map((item) => {
      if (item.key !== 'quantile') {
        return {
          key: `aggregate:${item.key}`,
          label: item.shortLabel,
          style: SHELF_MENU_ITEM_STYLE,
        }
      }

      return {
        key: 'aggregate:quantile',
        label: t('shelvesMenuQuantile'),
        popupOffset: SHELF_MENU_SUBMENU_OFFSET,
        children: QUANTILE_PERCENT_OPTIONS.map((percent) => ({
          key: `aggregate:quantile:${percent}`,
          label: `P${percent}`,
          style: SHELF_MENU_ITEM_STYLE,
        })),
      }
    })

    const formatMenuItem = {
      key: 'format',
      label: t('shelvesMenuFormat'),
      popupOffset: SHELF_MENU_SUBMENU_OFFSET,
      children: [
        {
          key: `format:panel:${measure.id}`,
          disabled: true,
          label: '',
        },
      ],
      popupRender: () => {
        return (
          <MeasureFormatPanel
            format={measure.format as VBIMeasureFormat | undefined}
            onFormatChange={(format) => changeFormat(measure.id, format)}
          />
        )
      },
      style: SHELF_MENU_ITEM_STYLE,
    } as unknown as NonNullable<MenuProps['items']>[number]

    const sortMenuItem = {
      key: 'sort',
      label: buildShelfMenuLabel(t('shelvesMenuSort'), formatSortMenuSummary(measure.sort, t)),
      popupOffset: SHELF_MENU_SUBMENU_OFFSET,
      children: [
        {
          key: 'sort:asc',
          label: t('shelvesSortAsc'),
          style: SHELF_MENU_ITEM_STYLE,
        },
        {
          key: 'sort:desc',
          label: t('shelvesSortDesc'),
          style: SHELF_MENU_ITEM_STYLE,
        },
        {
          key: 'sort:clear',
          label: t('shelvesSortClear'),
          style: SHELF_MENU_ITEM_STYLE,
        },
      ],
    }

    return [
      {
        key: 'aggregate',
        label: t('shelvesMenuAggregate'),
        popupOffset: SHELF_MENU_SUBMENU_OFFSET,
        children: aggregateMenuItems,
      },
      {
        key: 'encoding',
        label: t('shelvesMenuEncoding'),
        popupOffset: SHELF_MENU_SUBMENU_OFFSET,
        children: supportedEncodings.map((encoding) => {
          const recommendedSuffix = recommendedEncoding === encoding ? t('commonStatusRecommended') : ''

          return {
            key: `encoding:${encoding}`,
            label: buildShelfMenuLabel(t(MEASURE_ENCODING_LABEL_KEY_MAP[encoding]), recommendedSuffix),
            style: SHELF_MENU_ITEM_STYLE,
          }
        }),
      },
      formatMenuItem,
      sortMenuItem,
      {
        key: 'rename',
        label: t('shelvesMenuRename'),
        style: SHELF_MENU_ITEM_STYLE,
      },
      {
        type: 'divider',
        style: DELETE_DIVIDER_STYLE,
      },
      {
        key: 'delete',
        label: <span style={{ color: token.colorError }}>{t('shelvesMenuDelete')}</span>,
        style: SHELF_MENU_ITEM_STYLE,
      },
    ]
  }

  const handleMeasureMenuClick = (measure: (typeof measures)[number], key: string) => {
    if (key === 'rename') {
      openShelfRenameModal({
        title: t('shelvesRenameModalMeasureTitle'),
        placeholder: t('shelvesRenameModalMeasurePlaceholder'),
        okText: t('shelvesRenameModalSave'),
        cancelText: t('shelvesRenameModalCancel'),
        emptyNameMessage: t('shelvesRenameModalEmptyName'),
        id: measure.id,
        currentAlias: measure.alias || measure.field,
        onRename: renameMeasure,
      })
      return
    }

    if (key === 'delete') {
      removeMeasure(measure.id)
      return
    }

    if (key.startsWith('encoding:')) {
      const nextEncoding = key.replace('encoding:', '') as NonNullable<VBIMeasure['encoding']>
      changeEncoding(measure.id, nextEncoding)
      return
    }

    if (key.startsWith('sort:')) {
      const nextSort = key.replace('sort:', '')

      if (nextSort === 'clear') {
        changeSort(measure.id, undefined)
        return
      }

      if (nextSort === 'asc' || nextSort === 'desc') {
        changeSort(measure.id, { order: nextSort })
      }
      return
    }

    if (!key.startsWith('aggregate:')) {
      return
    }

    const aggregateKey = key.replace('aggregate:', '')
    const fieldRole = getFieldRole(measure.field)

    if (aggregateKey === 'quantile') {
      changeAggregate(measure.id, { func: 'quantile', quantile: 0.5 })
      return
    }

    if (aggregateKey.startsWith('quantile:')) {
      const percentValue = Number(aggregateKey.replace('quantile:', ''))
      if (!Number.isFinite(percentValue)) {
        return
      }

      const quantileValue = Math.max(0, Math.min(100, percentValue)) / 100
      changeAggregate(measure.id, {
        func: 'quantile',
        quantile: quantileValue,
      })
      return
    }

    const selectedAggregate = getAggregateItemsByFieldRole(fieldRole, t).find(
      (item) => item.key === aggregateKey,
    )?.aggregate

    if (!selectedAggregate) {
      return
    }

    if (!isAggregateSupportedByFieldRole(selectedAggregate, fieldRole)) {
      message.warning(t('shelvesMeasureUnsupportedAggregate'))
      return
    }

    changeAggregate(measure.id, selectedAggregate)
  }

  const getMeasureDisplayLabel = (measure: (typeof measures)[number]) => {
    const baseLabel = measure.alias || measure.field
    const aggregate = formatMeasureAggregate(measure.aggregate as MeasureAggregate | undefined, t)

    if (!aggregate) {
      return `${baseLabel}${formatSortDisplaySuffix(measure.sort)}`
    }

    return `${aggregate}(${baseLabel})${formatSortDisplaySuffix(measure.sort)}`
  }

  return (
    <FieldShelf
      shelf='measures'
      items={measures}
      placeholder={t('shelvesPlaceholdersMeasures')}
      tone={measureShelfTone}
      style={style}
      maxLabelWidth={112}
      getDisplayLabel={getMeasureDisplayLabel}
      getItemPayload={(item) => ({
        field: item.field,
        type: fieldTypeMap[item.field],
        role: getFieldRole(item.field),
      })}
      buildMenuItems={buildMeasureMenuItems}
      getMenuSelectedKeys={getMeasureMenuSelectedKeys}
      onMenuClick={handleMeasureMenuClick}
      onRemove={removeMeasure}
      onAddFieldAt={(payload, insertIndex) => {
        if (!payload.field) {
          return
        }

        addFieldAt({
          fieldName: payload.field,
          fieldType: payload.type,
          insertIndex,
        })
      }}
      onReorder={(dragIndex, insertIndex) => {
        const yMeasures = builder.dsl.get('measures') as YArrayLike | undefined
        if (!yMeasures) {
          return
        }

        builder.doc.transact(() => {
          reorderYArrayByInsertIndex({
            yArray: yMeasures,
            dragIndex,
            insertIndex,
          })
        })
      }}
    />
  )
}
