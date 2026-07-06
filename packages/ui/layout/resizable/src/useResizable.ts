import { useContext } from 'react'

import { ResizableContext } from './resizableContext'

export function useResizable() {
  const ctx = useContext(ResizableContext)
  if (!ctx) {
    throw new Error('ResizablePanel and ResizableHandle must be used within Resizable')
  }
  return ctx
}
