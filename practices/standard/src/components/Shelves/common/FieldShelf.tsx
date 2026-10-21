import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { CloseOutlined, DownOutlined } from '@ant-design/icons'
import { Dropdown, Typography, theme, type MenuProps } from 'antd'
import { useMemo, useState, type MouseEvent } from 'react'
import {
  ShelfItemDropZones,
  createShelfItemDragId,
  type ShelfFieldPayload,
  type ShelfItemDragData,
  type ShelfType,
  useShelfDndRegistration,
  useShelfItemDropTargets,
} from '../dnd'
import { ShelfTrack, type ShelfTone } from './ShelfTrack'
import './FieldShelf.css'

const SHELF_ITEM_SPACING = 6

export const SHELF_MENU_ITEM_STYLE: React.CSSProperties = {
  minHeight: 32,
  lineHeight: '20px',
  margin: 0,
  borderRadius: 0,
  width: '100%',
  boxSizing: 'border-box',
}

export const SHELF_MENU_SUBMENU_TITLE_STYLE: React.CSSProperties = {
  minHeight: 32,
  lineHeight: '20px',
  margin: 0,
  borderRadius: 0,
  width: '100%',
  boxSizing: 'border-box',
}

export type FieldShelfTone = ShelfTone

type FieldShelfItem = {
  id: string
  field: string
  alias?: string | null
}

type FieldShelfProps<TItem extends FieldShelfItem> = {
  shelf: ShelfType
  items: TItem[]
  placeholder: string
  tone: FieldShelfTone
  style?: React.CSSProperties
  maxLabelWidth?: number
  getDisplayLabel?: (item: TItem) => string
  getItemPayload: (item: TItem) => ShelfFieldPayload
  buildMenuItems: (item: TItem) => MenuProps['items']
  getMenuSelectedKeys?: (item: TItem) => string[]
  onMenuClick: (item: TItem, key: string) => void
  onRemove: (id: string) => void
  onAddFieldAt: (payload: ShelfFieldPayload, insertIndex: number) => void
  onReorder: (dragIndex: number, insertIndex: number) => void
}

const getItemStyle = (params: {
  isHovered: boolean
  isDragging: boolean
  tone: FieldShelfTone
  transform: string | undefined
}): React.CSSProperties => {
  const { isHovered, isDragging, tone, transform } = params

  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 3,
    padding: '0 5px',
    backgroundColor: isHovered ? tone.itemHoverBackground : tone.itemBackground,
    border: isHovered ? `1px solid ${tone.itemHoverBorder}` : `1px solid ${tone.itemBorder}`,
    borderRadius: 8,
    cursor: isDragging ? 'grabbing' : 'grab',
    fontSize: 11,
    color: tone.textColor,
    height: 20,
    flexShrink: 0,
    transition: 'border-color 0.2s, background-color 0.2s, color 0.2s',
    opacity: isDragging ? 0 : 1,
    visibility: isDragging ? 'hidden' : 'visible',
    transform,
  }
}

const getIconStyle = (params: { isHovered: boolean; tone: FieldShelfTone }): React.CSSProperties => {
  const { isHovered, tone } = params

  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 14,
    height: 14,
    borderRadius: 4,
    backgroundColor: isHovered ? tone.iconHoverBackground : tone.iconBackground,
    color: tone.iconColor,
    flexShrink: 0,
  }
}

const getRemoveIconWrapperStyle = (isHovered: boolean): React.CSSProperties => {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: isHovered ? 10 : 0,
    marginLeft: isHovered ? 2 : 0,
    overflow: 'hidden',
    opacity: isHovered ? 1 : 0,
    transition: 'width 0.2s, margin-left 0.2s, opacity 0.2s',
    flexShrink: 0,
  }
}

const FieldShelfTag = <TItem extends FieldShelfItem>(props: {
  shelf: ShelfType
  item: TItem
  index: number
  displayLabel: string
  tone: FieldShelfTone
  maxLabelWidth: number
  isHovered: boolean
  setHoveredItemId: (id: string | null) => void
  payload: ShelfFieldPayload
  buildMenuItems: (item: TItem) => MenuProps['items']
  getMenuSelectedKeys?: (item: TItem) => string[]
  onMenuClick: (item: TItem, key: string) => void
  onRemove: (id: string) => void
}) => {
  const { token } = theme.useToken()
  const {
    shelf,
    item,
    index,
    displayLabel,
    tone,
    maxLabelWidth,
    isHovered,
    setHoveredItemId,
    payload,
    buildMenuItems,
    getMenuSelectedKeys,
    onMenuClick,
    onRemove,
  } = props

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: createShelfItemDragId(shelf, item.id),
    data: {
      kind: 'shelf-item',
      shelf,
      itemId: item.id,
      index,
      payload,
      label: displayLabel,
    } satisfies ShelfItemDragData,
  })
  const dropTargets = useShelfItemDropTargets({
    shelf,
    index,
  })

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        flexShrink: 0,
        paddingRight: SHELF_ITEM_SPACING,
      }}
    >
      <ShelfItemDropZones
        color={tone.iconColor}
        beforeRef={dropTargets.before.setNodeRef}
        afterRef={dropTargets.after.setNodeRef}
        isBeforeOver={dropTargets.before.isOver}
        isAfterOver={dropTargets.after.isOver}
      />
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        onMouseEnter={() => setHoveredItemId(item.id)}
        onMouseLeave={() => setHoveredItemId(null)}
        style={getItemStyle({
          isHovered: isHovered || dropTargets.isOver,
          isDragging,
          tone,
          transform: isDragging ? undefined : CSS.Translate.toString(transform),
        })}
      >
        <Dropdown
          trigger={['click']}
          placement='bottom'
          menu={{
            rootClassName: 'fieldshelf-dropdown',
            items: buildMenuItems(item),
            selectable: true,
            selectedKeys: getMenuSelectedKeys?.(item),
            onClick: ({ key, domEvent }: Parameters<NonNullable<MenuProps['onClick']>>[0]) => {
              domEvent.stopPropagation()
              onMenuClick(item, String(key))
            },
            style: {
              fontSize: 11,
              minWidth: 124,
              padding: '6px 0',
              borderRadius: token.borderRadiusLG,
            },
            styles: {
              item: SHELF_MENU_ITEM_STYLE,
              itemTitle: SHELF_MENU_SUBMENU_TITLE_STYLE,
            },
          }}
          styles={{
            root: {
              paddingBlock: 4,
            },
          }}
        >
          <span
            onClick={(event: MouseEvent<HTMLElement>) => {
              event.stopPropagation()
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              cursor: 'pointer',
              flex: '1 1 auto',
              minWidth: 0,
              justifyContent: 'center',
            }}
          >
            <span
              style={getIconStyle({
                isHovered,
                tone,
              })}
            >
              <DownOutlined style={{ fontSize: 8 }} />
            </span>
            <Typography.Text
              ellipsis={{ tooltip: displayLabel }}
              style={{
                maxWidth: maxLabelWidth,
                marginBottom: 0,
                color: 'inherit',
                fontSize: 11,
              }}
            >
              {displayLabel}
            </Typography.Text>
          </span>
        </Dropdown>
        <span style={getRemoveIconWrapperStyle(isHovered)}>
          <CloseOutlined
            onClick={(event: MouseEvent<HTMLElement>) => {
              event.stopPropagation()
              onRemove(item.id)
            }}
            style={{
              fontSize: 8,
              cursor: 'pointer',
              color: token.colorTextTertiary,
            }}
            onMouseEnter={(event: MouseEvent<HTMLElement>) => {
              event.currentTarget.style.color = token.colorError
            }}
            onMouseLeave={(event: MouseEvent<HTMLElement>) => {
              event.currentTarget.style.color = token.colorTextTertiary
            }}
          />
        </span>
      </div>
    </div>
  )
}

export const FieldShelf = <TItem extends FieldShelfItem>(props: FieldShelfProps<TItem>) => {
  const {
    shelf,
    items,
    placeholder,
    tone,
    style,
    maxLabelWidth = 112,
    getDisplayLabel,
    getItemPayload,
    buildMenuItems,
    getMenuSelectedKeys,
    onMenuClick,
    onRemove,
    onAddFieldAt,
    onReorder,
  } = props

  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null)

  const dndItems = useMemo(() => {
    return items.map((item) => ({
      id: item.id,
      payload: getItemPayload(item),
    }))
  }, [getItemPayload, items])

  const dndAdapter = useMemo(() => {
    return {
      shelf,
      items: dndItems,
      addFieldAt: onAddFieldAt,
      removeItem: onRemove,
      reorderWithin: onReorder,
    }
  }, [dndItems, onAddFieldAt, onRemove, onReorder, shelf])

  useShelfDndRegistration(dndAdapter)

  return (
    <ShelfTrack shelf={shelf} itemsCount={items.length} placeholder={placeholder} tone={tone} style={style}>
      {items.map((item, index) => {
        const payload = getItemPayload(item)
        const displayLabel = getDisplayLabel ? getDisplayLabel(item) : item.alias || item.field
        const isHovered = hoveredItemId === item.id

        return (
          <FieldShelfTag
            key={item.id}
            shelf={shelf}
            item={item}
            index={index}
            displayLabel={displayLabel}
            tone={tone}
            maxLabelWidth={maxLabelWidth}
            isHovered={isHovered}
            setHoveredItemId={setHoveredItemId}
            payload={payload}
            buildMenuItems={buildMenuItems}
            getMenuSelectedKeys={getMenuSelectedKeys}
            onMenuClick={onMenuClick}
            onRemove={onRemove}
          />
        )
      })}
    </ShelfTrack>
  )
}
