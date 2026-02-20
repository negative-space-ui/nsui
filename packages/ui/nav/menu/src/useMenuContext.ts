import React from 'react'
import { MenuContext, type MenuContextValue } from './MenuContext'

export function useMenuContext(): MenuContextValue {
  const ctx = React.useContext(MenuContext)
  if (!ctx) {
    throw new Error('useMenuContext must be used within a <Menu> component.')
  }
  return ctx
}
