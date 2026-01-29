import React from 'react'
import { ListboxContext, type ListboxContextValue } from './ListboxContext'

export const useListboxContext = (): ListboxContextValue => {
  const ctx = React.useContext(ListboxContext)
  if (!ctx) {
    throw new Error('Listbox components must be used within Listbox')
  }
  return ctx
}
