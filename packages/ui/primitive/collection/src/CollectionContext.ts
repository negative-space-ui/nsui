import React from 'react'
import type { RovingFocusReturn } from '@negative-space/roving-focus'

export interface CollectionContextValue {
  registerItem: RovingFocusReturn['registerItem']
  unregisterItem: RovingFocusReturn['unregisterItem']
  focusItem: RovingFocusReturn['focusItem']
  handleItemKeyDown: RovingFocusReturn['handleItemKeyDown']
  activeId: RovingFocusReturn['activeId']
  hasInteracted: RovingFocusReturn['hasInteracted']
  containerRef: React.RefObject<HTMLElement>
  disabled?: boolean
}

export const CollectionContext = React.createContext<CollectionContextValue | null>(null)
