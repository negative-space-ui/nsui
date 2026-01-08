import { useCallback, useRef, useState } from 'react'
import type { CollectionItemRecord } from './CollectionContext'

export const useCollectionController = () => {
  const items = useRef<CollectionItemRecord[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)

  const registerItem = useCallback((item: CollectionItemRecord) => {
    items.current.push(item)
  }, [])

  const unregisterItem = useCallback((id: string) => {
    items.current = items.current.filter((i) => i.id !== id)
  }, [])

  const focusFirst = useCallback(() => {
    const first = items.current.find((i) => !i.disabled)
    if (!first) return

    setActiveId(first.id)
    first.ref.current?.focus()
  }, [])

  const resetActive = useCallback(() => {
    setActiveId(null)
  }, [])

  const moveFocus = (offset: number) => {
    const enabled = items.current.filter((i) => !i.disabled)
    if (!enabled.length) return

    const index = enabled.findIndex((i) => i.id === activeId)
    const next =
      index === -1 ? enabled[0] : enabled[(index + offset + enabled.length) % enabled.length]

    setActiveId(next.id)
    next.ref.current?.focus()
  }

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      moveFocus(1)
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      moveFocus(-1)
    }
  }

  const onFocus = () => {
    if (activeId !== null) return
    focusFirst()
  }

  const onBlur = (event: React.FocusEvent) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      resetActive()
    }
  }

  return {
    registerItem,
    unregisterItem,
    activeId,
    setActiveId,
    onKeyDown,
    onFocus,
    onBlur
  }
}
