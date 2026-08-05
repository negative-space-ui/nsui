import React from 'react'

import { DropdownContext, type DropdownContextValue } from './dropdownContext'

export function useDropdownContext(): DropdownContextValue {
  const ctx = React.useContext(DropdownContext)
  if (!ctx) {
    throw new Error('useDropdownContext must be used within a <Dropdown> component.')
  }
  return ctx
}
