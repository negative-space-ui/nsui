import type { FlexProps } from '@negative-space/flex'
import React from 'react'

import { ResizableContext } from './resizableContext'
import { useResizableState } from './useResizableState'

export type ResizableProviderProps = {
  direction: FlexProps['direction']
  children: React.ReactNode
}

export function ResizableProvider({ direction, children }: ResizableProviderProps) {
  const value = useResizableState({ direction })
  return <ResizableContext.Provider value={value}>{children}</ResizableContext.Provider>
}
