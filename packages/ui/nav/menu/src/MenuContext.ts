import React from 'react'

export interface MenuContextValue {
  disabled?: boolean
}

export const MenuContext = React.createContext<MenuContextValue | null>(null)
