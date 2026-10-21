import {
  DndContext,
  DragOverlay,
  PointerSensor,
  pointerWithin,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { theme } from 'antd'
import { resolveShelfDropAction } from './dropLogic'
import type { ShelfDndAdapter, ShelfDragData, ShelfInsertAnchor, ShelfType } from './types'

type ShelfDndContextValue = {
  registerShelf: (adapter: ShelfDndAdapter) => () => void
  isDragging: boolean
  activeDrag: ShelfDragData | null
}

const ShelfDndContext = createContext<ShelfDndContextValue | undefined>(undefined)

export const ShelfDndProvider = ({ children }: { children: React.ReactNode }) => {
  const { token } = theme.useToken()
  const [activeDrag, setActiveDrag] = useState<ShelfDragData | null>(null)
  const adaptersRef = useRef<Map<ShelfType, ShelfDndAdapter>>(new Map())

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 4,
      },
    }),
  )

  const registerShelf = useCallback((adapter: ShelfDndAdapter) => {
    adaptersRef.current.set(adapter.shelf, adapter)

    return () => {
      const current = adaptersRef.current.get(adapter.shelf)
      if (current === adapter) {
        adaptersRef.current.delete(adapter.shelf)
      }
    }
  }, [])

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const data = event.active.data.current as ShelfDragData | undefined
    setActiveDrag(data ?? null)
  }, [])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const activeData = event.active.data.current as ShelfDragData | undefined
    const overData = event.over?.data.current as
      | {
          kind?: string
          shelf?: ShelfType
          insertIndex?: number
          anchor?: ShelfInsertAnchor | string
        }
      | undefined
    setActiveDrag(null)

    if (!activeData || !overData) {
      return
    }

    if (overData.kind !== 'shelf-insert' || !overData.shelf) {
      return
    }

    const targetAdapter = adaptersRef.current.get(overData.shelf)
    if (!targetAdapter) {
      return
    }

    const anchor =
      overData.anchor === 'before' ||
      overData.anchor === 'after' ||
      overData.anchor === 'empty' ||
      overData.anchor === 'tail'
        ? overData.anchor
        : 'tail'

    const action = resolveShelfDropAction({
      activeDrag: activeData,
      overTarget: {
        kind: 'shelf-insert',
        shelf: overData.shelf,
        insertIndex: overData.insertIndex ?? targetAdapter.items.length,
        anchor,
      },
      targetItemCount: targetAdapter.items.length,
    })

    if (action.type === 'none') {
      return
    }

    if (action.type === 'add-field') {
      targetAdapter.addFieldAt(action.payload, action.insertIndex)
      return
    }

    if (action.type === 'reorder') {
      targetAdapter.reorderWithin(action.dragIndex, action.insertIndex)
      return
    }

    const sourceAdapter = adaptersRef.current.get(action.sourceShelf)
    const latestTargetAdapter = adaptersRef.current.get(action.targetShelf)
    if (!sourceAdapter || !latestTargetAdapter) {
      return
    }

    latestTargetAdapter.addFieldAt(action.payload, action.insertIndex)
    sourceAdapter.removeItem(action.itemId)
  }, [])

  const contextValue = useMemo<ShelfDndContextValue>(() => {
    return {
      registerShelf,
      isDragging: Boolean(activeDrag),
      activeDrag,
    }
  }, [activeDrag, registerShelf])

  return (
    <ShelfDndContext.Provider value={contextValue}>
      <DndContext
        sensors={sensors}
        collisionDetection={pointerWithin}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActiveDrag(null)}
      >
        {children}
        <DragOverlay dropAnimation={null}>
          {activeDrag ? (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0 8px',
                height: 24,
                borderRadius: 8,
                border: `1px solid ${token.colorBorder}`,
                background: token.colorBgElevated,
                boxShadow: token.boxShadowSecondary,
                fontSize: 12,
                color: activeDrag.payload.role === 'measure' ? token.colorSuccessText : token.colorPrimaryText,
                maxWidth: 200,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
              }}
            >
              {activeDrag.label}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </ShelfDndContext.Provider>
  )
}

export const useShelfDndContext = () => {
  const context = useContext(ShelfDndContext)
  if (!context) {
    throw new Error('useShelfDndContext must be used within ShelfDndProvider')
  }
  return context
}
