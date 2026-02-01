import React from 'react'
import { useRovingFocus } from '@negative-space/roving-focus'

export type MenuContextValue = {
  disabled?: boolean
  roving: ReturnType<typeof useRovingFocus>
}

export const MenuContext = React.createContext<MenuContextValue | null>(null)
