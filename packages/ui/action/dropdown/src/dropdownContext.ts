import React from 'react'

export interface DropdownContextValue {
  disabled?: boolean
}

export const DropdownContext = React.createContext<DropdownContextValue | null>(null)
