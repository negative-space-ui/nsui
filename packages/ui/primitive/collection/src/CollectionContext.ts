import React from 'react'

export interface CollectionItemRecord {
  id: string
  ref: React.RefObject<HTMLElement | null>
  disabled?: boolean
}

export interface CollectionContextValue {
  registerItem(item: CollectionItemRecord): void
  unregisterItem(id: string): void
  activeId: string | null
  setActiveId(id: string): void
}

export const CollectionContext = React.createContext<CollectionContextValue | null>(null)

export const useCollectionContext = () => {
  const ctx = React.useContext(CollectionContext)
  if (!ctx) {
    throw new Error('Collection components must be used within Collection')
  }
  return ctx
}
