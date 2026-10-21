import { theme } from 'antd'
import type { MenuProps } from 'antd'
import { useMemo } from 'react'
import { useVBIDimensions, useVBISchemaFields } from '../../../hooks'
import { useTranslation } from '../../../i18n'
import { useVBIStore } from '../../../model'
import type { VBIDimension } from '@visactor/vbi'
import { getFieldRoleBySchemaType } from '../../../utils/fieldRole'
import { FieldShelf, SHELF_MENU_ITEM_STYLE, type FieldShelfTone } from '../common/FieldShelf'
import { openShelfRenameModal } from '../common/openShelfRenameModal'
import {
  formatDimensionDateAggregate,
  getDefaultDimensionDateAggregate,
  getDimensionDateAggregateItems,
  isDateDimensionField,
  normalizeDimensionDateAggregate,
  type DimensionDateAggregate,
} from '../utils/dimensionDateAggregateUtils'
import { buildShelfMenuLabel, SHELF_MENU_SUBMENU_OFFSET } from '../utils/menuItemUtils'
import { getDimensionMenuSelectedKeys } from '../utils/menuSelectionUtils'
import { formatSortDisplaySuffix, formatSortMenuSummary } from '../utils/sortUtils'
import { reorderYArrayByInsertIndex, type YArrayLike } from '../utils/reorderUtils'

const DELETE_DIVIDER_STYLE: React.CSSProperties = {
  marginBlock: 0,
}

const DIMENSION_ENCODING_LABEL_KEY_MAP: Record<NonNullable<VBIDimension['encoding']>, string> = {
  xAxis: 'shelvesDimensionEncodingXAxis',
  yAxis: 'shelvesDimensionEncodingYAxis',
  angle: 'shelvesDimensionEncodingAngle',
  color: 'shelvesDimensionEncodingColor',
  detail: 'shelvesDimensionEncodingDetail',
  source: 'shelvesDimensionEncodingSource',
  target: 'shelvesDimensionEncodingTarget',
  tooltip: 'shelvesDimensionEncodingTooltip',
  label: 'shelvesDimensionEncodingLabel',
  row: 'shelvesDimensionEncodingRow',
  column: 'shelvesDimensionEncodingColumn',
  player: 'shelvesDimensionEncodingPlayer',
  hierarchy: 'shelvesDimensionEncodingHierarchy',
}

export const DimensionShelf = ({ style }: { style?: React.CSSProperties }) => {
  const builder = useVBIStore((state) => state.builder)
  const { token } = theme.useToken()
  const { t } = useTranslation()
  const { dimensions, addDimension, removeDimension, updateDimension, findDimension } = useVBIDimensions(builder)
  const { fieldTypeMap } = useVBISchemaFields(builder)
  const dimensionShelfTone = useMemo<FieldShelfTone>(() => {
    const accent = token.colorPrimaryText
    const border = token.colorPrimaryBorder
    const hoverBackground = token.colorPrimaryBgHover

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

  const isDateField = (fieldName: string) => {
    return isDateDimensionField(fieldTypeMap[fieldName])
  }

  const addFieldAt = (params: { fieldName: string; insertIndex: number }) => {
    const { fieldName, insertIndex } = params
    const originalLength = dimensions.length

    addDimension(fieldName, (node) => {
      if (isDateField(fieldName)) {
        node.setAggregate(getDefaultDimensionDateAggregate())
      }
    })

    if (insertIndex < originalLength) {
      const yDimensions = builder.dsl.get('dimensions') as YArrayLike | undefined
      if (!yDimensions) {
        return
      }

      builder.doc.transact(() => {
        reorderYArrayByInsertIndex({
          yArray: yDimensions,
          dragIndex: originalLength,
          insertIndex,
        })
      })
    }
  }

  const renameDimension = (id: string, alias: string) => {
    updateDimension(id, (node) => {
      node.setAlias(alias)
    })
  }

  const changeAggregate = (id: string, aggregate: DimensionDateAggregate | undefined) => {
    if (!aggregate) {
      const dimensionNode = findDimension(id) as { clearAggregate?: () => unknown } | undefined

      if (typeof dimensionNode?.clearAggregate === 'function') {
        builder.doc.transact(() => {
          dimensionNode.clearAggregate?.()
        })
        return
      }

      const targetIndex = dimensions.findIndex((dimension) => dimension.id === id)
      const yDimensions = builder.dsl.get('dimensions') as YArrayLike<{ delete: (key: string) => void }> | undefined
      const yDimension = yDimensions?.get(targetIndex)
      if (!yDimension) {
        return
      }

      builder.doc.transact(() => {
        yDimension.delete('aggregate')
      })
      return
    }

    updateDimension(id, (node) => {
      node.setAggregate(aggregate)
    })
  }

  const changeEncoding = (id: string, encoding: NonNullable<VBIDimension['encoding']>) => {
    updateDimension(id, (node) => {
      node.setEncoding(encoding)
    })
  }

  const changeSort = (id: string, sort: VBIDimension['sort'] | undefined) => {
    updateDimension(id, (node) => {
      if (sort) {
        node.setSort(sort)
        return
      }

      node.clearSort()
    })
  }

  const buildMenuItems = (dimension: (typeof dimensions)[number]): MenuProps['items'] => {
    const items: NonNullable<MenuProps['items']> = []
    const supportedEncodings = builder.chartType.getSupportedDimensionEncodings()
    const dimensionIndex = dimensions.findIndex((item) => item.id === dimension.id)
    const recommendedEncoding =
      dimensionIndex >= 0
        ? builder.chartType.getRecommendedDimensionEncodings(dimensions.length)[dimensionIndex]
        : undefined

    if (isDateField(dimension.field)) {
      items.push({
        key: 'aggregate',
        label: t('shelvesMenuDateAggregate'),
        popupOffset: SHELF_MENU_SUBMENU_OFFSET,
        children: [
          ...getDimensionDateAggregateItems(t).map((item) => ({
            key: `aggregate:${item.key}`,
            label: item.shortLabel,
            style: SHELF_MENU_ITEM_STYLE,
          })),
          {
            key: 'aggregate:none',
            label: t('shelvesMenuRawValue'),
            style: SHELF_MENU_ITEM_STYLE,
          },
        ],
      })
    }

    items.push({
      key: 'encoding',
      label: t('shelvesMenuEncoding'),
      popupOffset: SHELF_MENU_SUBMENU_OFFSET,
      children: supportedEncodings.map((encoding) => {
        const recommendedSuffix = recommendedEncoding === encoding ? t('commonStatusRecommended') : ''

        return {
          key: `encoding:${encoding}`,
          label: buildShelfMenuLabel(t(DIMENSION_ENCODING_LABEL_KEY_MAP[encoding]), recommendedSuffix),
          style: SHELF_MENU_ITEM_STYLE,
        }
      }),
    })

    items.push({
      key: 'sort',
      label: buildShelfMenuLabel(t('shelvesMenuSort'), formatSortMenuSummary(dimension.sort, t)),
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
    })

    items.push(
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
    )

    return items
  }

  const handleMenuClick = (dimension: (typeof dimensions)[number], key: string) => {
    if (key.startsWith('aggregate:')) {
      const aggregateKey = key.replace('aggregate:', '')

      if (aggregateKey === 'none') {
        changeAggregate(dimension.id, undefined)
        return
      }

      const nextAggregate = getDimensionDateAggregateItems(t).find((item) => item.key === aggregateKey)?.aggregate

      if (nextAggregate) {
        changeAggregate(dimension.id, nextAggregate)
      }
      return
    }

    if (key.startsWith('sort:')) {
      const nextSort = key.replace('sort:', '')

      if (nextSort === 'clear') {
        changeSort(dimension.id, undefined)
        return
      }

      if (nextSort === 'asc' || nextSort === 'desc') {
        changeSort(dimension.id, { order: nextSort })
      }
      return
    }

    if (key.startsWith('encoding:')) {
      const nextEncoding = key.replace('encoding:', '') as NonNullable<VBIDimension['encoding']>
      changeEncoding(dimension.id, nextEncoding)
      return
    }

    if (key === 'rename') {
      openShelfRenameModal({
        title: t('shelvesRenameModalDimensionTitle'),
        placeholder: t('shelvesRenameModalDimensionPlaceholder'),
        okText: t('shelvesRenameModalSave'),
        cancelText: t('shelvesRenameModalCancel'),
        emptyNameMessage: t('shelvesRenameModalEmptyName'),
        id: dimension.id,
        currentAlias: dimension.alias || dimension.field,
        onRename: renameDimension,
      })
      return
    }

    if (key === 'delete') {
      removeDimension(dimension.id)
    }
  }

  const getDimensionDisplayLabel = (dimension: (typeof dimensions)[number]) => {
    const baseLabel = dimension.alias || dimension.field
    const aggregate = formatDimensionDateAggregate(
      normalizeDimensionDateAggregate(dimension.aggregate, fieldTypeMap[dimension.field]),
      t,
    )

    if (!aggregate) {
      return `${baseLabel}${formatSortDisplaySuffix(dimension.sort)}`
    }

    return `${aggregate}(${baseLabel})${formatSortDisplaySuffix(dimension.sort)}`
  }

  return (
    <FieldShelf
      shelf='dimensions'
      items={dimensions}
      placeholder={t('shelvesPlaceholdersDimensions')}
      tone={dimensionShelfTone}
      style={style}
      maxLabelWidth={124}
      getDisplayLabel={getDimensionDisplayLabel}
      getItemPayload={(item) => ({
        field: item.field,
        type: fieldTypeMap[item.field],
        role: getFieldRoleBySchemaType(fieldTypeMap[item.field]),
      })}
      buildMenuItems={buildMenuItems}
      getMenuSelectedKeys={(item) => getDimensionMenuSelectedKeys(item, fieldTypeMap[item.field])}
      onMenuClick={handleMenuClick}
      onRemove={removeDimension}
      onAddFieldAt={(payload, insertIndex) => {
        if (!payload.field) {
          return
        }

        addFieldAt({
          fieldName: payload.field,
          insertIndex,
        })
      }}
      onReorder={(dragIndex, insertIndex) => {
        const yDimensions = builder.dsl.get('dimensions') as YArrayLike | undefined
        if (!yDimensions) {
          return
        }

        builder.doc.transact(() => {
          reorderYArrayByInsertIndex({
            yArray: yDimensions,
            dragIndex,
            insertIndex,
          })
        })
      }}
    />
  )
}
