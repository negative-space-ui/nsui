import React from 'react'
import { MenuContext, type MenuContextValue } from './MenuContext'

export const useMenuContext = (): MenuContextValue => {
  const ctx = React.useContext(MenuContext)
  if (!ctx) {
    throw new Error('Menu components must be used within Menu')
  }
  return ctx
}
