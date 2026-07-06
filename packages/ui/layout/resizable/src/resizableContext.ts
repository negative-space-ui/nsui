import { createContext } from 'react'

export type Constraints = { min: number; max: number }

export type ResizableContextValue = {
  direction: 'row' | 'column'
  sizes: Record<string, number>
  registerPanel: (id: string, size: number, min: number, max: number) => void
  unregisterPanel: (id: string) => void
  resizePair: (prevId: string, nextId: string, delta: number) => void
}

export const ResizableContext = createContext<ResizableContextValue | null>(null)
