import { createContext, useContext } from 'react'

import type { classNames, styles } from './Sortable'

export type SortableDirection = 'row' | 'column'

export type SortableContextValue = {
  classNames?: classNames
  styles?: styles
  direction: SortableDirection
  order: string[]
  registerItem: (id: string) => void
  unregisterItem: (id: string) => void
  moveItem: (draggedId: string, targetId: string) => void
  draggingId: string | null
  setDraggingId: (id: string | null) => void
}

export const SortableContext = createContext<SortableContextValue | null>(null)

export function useSortable() {
  const ctx = useContext(SortableContext)
  if (!ctx) {
    throw new Error('useSortable must be used within a <Sortable> component')
  }
  return ctx
}
