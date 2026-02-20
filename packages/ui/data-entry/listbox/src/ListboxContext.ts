import React from 'react'

export type SelectionMode = 'single' | 'multiple'

export interface ListboxContextValue {
  disabled?: boolean
  selectionMode: SelectionMode
  value: string | string[] | null
  onChange?: (value: string | string[]) => void
}

export const ListboxContext = React.createContext<ListboxContextValue | null>(null)
