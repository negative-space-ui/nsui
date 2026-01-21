import React from 'react'

export interface ListboxOptionRecord {
  id: string
  ref: React.RefObject<HTMLElement | null>
  disabled?: boolean
}

export type SelectionMode = 'single' | 'multiple'

export interface ListboxContextValue {
  registerOption(option: ListboxOptionRecord): void
  unregisterOption(id: string): void
  activeId: string | null
  setActiveId(id: string): void
  selectedIds: Set<string>
  toggleSelection(id: string): void
  isSelected(id: string): boolean
  selectionMode: SelectionMode
}

export const ListboxContext = React.createContext<ListboxContextValue | null>(null)

export const useListboxContext = () => {
  const ctx = React.useContext(ListboxContext)
  if (!ctx) {
    throw new Error('Listbox components must be used within Listbox')
  }
  return ctx
}
