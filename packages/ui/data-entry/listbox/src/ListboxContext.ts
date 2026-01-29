import React from 'react'
import { useRovingFocus } from '@negative-space/roving-focus'

export type SelectionMode = 'single' | 'multiple'

export type ListboxContextValue = {
  disabled?: boolean
  selectionMode: SelectionMode
  value: string | string[] | null
  onChange?: (value: string | string[]) => void
  activeId?: string | null
  setActiveId?: (id: string | null) => void
  roving: ReturnType<typeof useRovingFocus>
}

export const ListboxContext = React.createContext<ListboxContextValue | null>(null)
