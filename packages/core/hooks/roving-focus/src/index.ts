import { useCallback, useRef, useState } from 'react'

export type RovingFocusItem<Id extends string = string> = {
  id: Id
  ref: React.RefObject<HTMLElement>
  disabled?: boolean
}

export const useRovingFocus = <Item extends RovingFocusItem<Id>, Id extends string = string>() => {
  const items = useRef<Item[]>([])
  const [activeId, setActiveId] = useState<Id | null>(null)

  const registerItem = useCallback((item: Item) => {
    items.current.push(item)
  }, [])

  const unregisterItem = useCallback((id: Id) => {
    items.current = items.current.filter((i) => i.id !== id)
  }, [])

  const focusItem = useCallback((item?: Item) => {
    if (!item || item.disabled) return

    setActiveId(item.id)
    item.ref.current?.focus()
  }, [])

  const focusFirst = useCallback(() => {
    focusItem(items.current.find((i) => !i.disabled))
  }, [focusItem])

  const resetActive = useCallback(() => {
    setActiveId(null)
  }, [])

  const moveFocus = useCallback(
    (offset: number) => {
      const enabled = items.current.filter((i) => !i.disabled)
      if (!enabled.length) return

      const index = enabled.findIndex((i) => i.id === activeId)
      const next =
        index === -1 ? enabled[0] : enabled[(index + offset + enabled.length) % enabled.length]

      focusItem(next)
    },
    [activeId, focusItem]
  )

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        moveFocus(1)
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()
        moveFocus(-1)
      }
    },
    [moveFocus]
  )

  const onFocus = useCallback(() => {
    if (activeId !== null) return
    focusFirst()
  }, [activeId, focusFirst])

  const onBlur = useCallback(
    (event: React.FocusEvent) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node)) {
        resetActive()
      }
    },
    [resetActive]
  )

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
