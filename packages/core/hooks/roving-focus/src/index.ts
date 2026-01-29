import { useCallback, useRef, useState } from 'react'

interface Item {
  id: string
  ref: React.RefObject<HTMLElement>
  disabled?: boolean
}

export function useRovingFocus() {
  const items = useRef<Item[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [hasInteracted, setHasInteracted] = useState(false)

  const registerItem = useCallback(
    (item: Item) => {
      const existingIndex = items.current.findIndex((i) => i.id === item.id)

      if (existingIndex === -1) {
        items.current.push(item)
      } else {
        items.current[existingIndex] = item
      }

      if (!activeId && !item.disabled) {
        setActiveId(item.id)
      }
    },
    [activeId]
  )

  const unregisterItem = useCallback((id: string) => {
    items.current = items.current.filter((i) => i.id !== id)
  }, [])

  const move = useCallback(
    (dir: 1 | -1) => {
      setHasInteracted(true)

      const enabled = items.current.filter((i) => !i.disabled)
      if (!enabled.length) return

      const index = enabled.findIndex((i) => i.id === activeId)
      const next = enabled[(index + dir + enabled.length) % enabled.length]

      setActiveId(next.id)
      next.ref.current?.focus()
    },
    [activeId]
  )

  const focusItem = useCallback((itemId: string) => {
    setHasInteracted(true)
    setActiveId(itemId)
  }, [])

  const focusFirst = useCallback(() => {
    const enabled = items.current.filter((i) => !i.disabled)
    if (enabled.length > 0) {
      const first = enabled[0]
      setHasInteracted(true)
      setActiveId(first.id)
      first.ref.current?.focus()
    }
  }, [])

  const getFirstEnabledId = useCallback(() => {
    const enabled = items.current.filter((i) => !i.disabled)
    return enabled[0]?.id ?? null
  }, [])

  const reset = useCallback(() => {
    setHasInteracted(false)
  }, [])

  const handleGroupKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!hasInteracted) {
        if (
          e.key === 'ArrowDown' ||
          e.key === 'ArrowRight' ||
          e.key === 'ArrowUp' ||
          e.key === 'ArrowLeft'
        ) {
          e.preventDefault()
          focusFirst()
        }
      }
    },
    [hasInteracted, focusFirst]
  )

  const handleItemKeyDown = useCallback(
    (
      e: React.KeyboardEvent,
      itemId: string,
      onSelect?: (value: string) => void,
      options?: {
        role?: 'radio' | 'option'
        allowHorizontal?: boolean
      }
    ) => {
      const role = options?.role ?? 'radio'
      const allowHorizontal = options?.allowHorizontal ?? true

      if (e.key === 'Tab' && e.shiftKey) {
        e.preventDefault()
        reset()
        if (role === 'radio') {
          const fieldset = (e.target as HTMLElement).closest('[role="radiogroup"]') as HTMLElement
          fieldset?.focus()
        } else if (role === 'option') {
          const listbox = (e.target as HTMLElement).closest('[role="listbox"]') as HTMLElement
          listbox?.focus()
        }
        return
      }

      if (e.key === 'ArrowDown' || (allowHorizontal && e.key === 'ArrowRight')) {
        e.preventDefault()
        move(1)
        return
      }

      if (e.key === 'ArrowUp' || (allowHorizontal && e.key === 'ArrowLeft')) {
        e.preventDefault()
        move(-1)
        return
      }

      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        onSelect?.(itemId)
      }
    },
    [move, reset]
  )

  const handleGroupBlur = useCallback(
    (e: React.FocusEvent) => {
      const currentTarget = e.currentTarget
      setTimeout(() => {
        if (!currentTarget.contains(document.activeElement)) {
          reset()
        }
      }, 0)
    },
    [reset]
  )

  return {
    activeId,
    hasInteracted,
    registerItem,
    unregisterItem,
    move,
    setActiveId,
    focusItem,
    focusFirst,
    getFirstEnabledId,
    reset,
    handleGroupKeyDown,
    handleItemKeyDown,
    handleGroupBlur
  }
}
