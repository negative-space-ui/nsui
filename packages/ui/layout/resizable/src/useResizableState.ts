import type { FlexProps } from '@negative-space/flex'
import { useCallback, useMemo, useRef, useState } from 'react'

import { Constraints, ResizableContextValue } from './resizableContext'

function clamp(value: number, c?: Constraints) {
  if (!c) return value
  return Math.min(Math.max(value, c.min), c.max)
}

export function useResizableState({
  direction: directionProp
}: {
  direction: FlexProps['direction']
}): ResizableContextValue {
  const direction: 'row' | 'column' = directionProp === 'column' ? 'column' : 'row'

  const [sizes, setSizes] = useState<Record<string, number>>({})
  const constraints = useRef<Record<string, Constraints>>({})

  const registerPanel = useCallback((id: string, size: number, min: number, max: number) => {
    constraints.current[id] = { min, max }
    setSizes((prev) => {
      if (prev[id] != null) return prev
      return { ...prev, [id]: size }
    })
  }, [])

  const unregisterPanel = useCallback((id: string) => {
    delete constraints.current[id]
    setSizes((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [id]: _, ...rest } = prev
      return rest
    })
  }, [])

  const resizePair = useCallback((prevId: string, nextId: string, delta: number) => {
    setSizes((prev) => {
      const prevSize = prev[prevId]
      const nextSize = prev[nextId]
      if (prevSize == null || nextSize == null) return prev

      const newPrev = clamp(prevSize + delta, constraints.current[prevId])
      const applied = newPrev - prevSize
      const newNext = clamp(nextSize - applied, constraints.current[nextId])
      const finalPrev = prevSize + (nextSize - newNext)

      return { ...prev, [prevId]: finalPrev, [nextId]: newNext }
    })
  }, [])

  return useMemo(
    () => ({ direction, sizes, registerPanel, unregisterPanel, resizePair }),
    [direction, sizes, registerPanel, unregisterPanel, resizePair]
  )
}
