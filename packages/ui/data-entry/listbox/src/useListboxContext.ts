import React from 'react'
import { ListboxContext } from './ListboxContext'

export const useListboxContext = () => {
  const ctx = React.useContext(ListboxContext)
  if (!ctx) {
    throw new Error('Listbox components must be used within Listbox')
  }
  return ctx
}
