import React, { useCallback, useMemo, useState } from 'react'

import type { classNames, styles } from './Sortable'
import { SortableContext, type SortableDirection } from './useSortable'

export type SortableProviderProps = {
  classNames?: classNames
  styles?: styles
  direction: SortableDirection
  onSort?: (order: string[]) => void
  children: React.ReactNode
}

export const SortableProvider = ({
  direction,
  onSort,
  classNames,
  styles,
  children
}: SortableProviderProps) => {
  const [order, setOrder] = useState<string[]>([])
  const [draggingId, setDraggingId] = useState<string | null>(null)

  const registerItem = useCallback((id: string) => {
    setOrder((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }, [])

  const unregisterItem = useCallback((id: string) => {
    setOrder((prev) => prev.filter((itemId) => itemId !== id))
  }, [])

  const moveItem = useCallback(
    (draggedId: string, targetId: string) => {
      setOrder((prev) => {
        if (draggedId === targetId) return prev

        const draggedIndex = prev.indexOf(draggedId)
        const targetIndex = prev.indexOf(targetId)
        if (draggedIndex === -1 || targetIndex === -1) return prev

        const next = [...prev]
        next.splice(draggedIndex, 1)
        next.splice(targetIndex, 0, draggedId)

        onSort?.(next)
        return next
      })
    },
    [onSort]
  )

  const value = useMemo(
    () => ({
      direction,
      order,
      registerItem,
      unregisterItem,
      moveItem,
      draggingId,
      setDraggingId,
      classNames,
      styles
    }),
    [direction, order, registerItem, unregisterItem, moveItem, draggingId, classNames, styles]
  )

  return <SortableContext.Provider value={value}>{children}</SortableContext.Provider>
}
