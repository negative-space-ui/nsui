import { useCallback, useRef, useState } from 'react'

export interface RovingFocusItem {
  id: string
  ref: React.RefObject<HTMLElement>
  disabled?: boolean
}

export interface UseRovingFocusOptions {
  wrap?: boolean
  allowHorizontal?: boolean
  containerRole?: string
}

export function useRovingFocus(options: UseRovingFocusOptions = {}) {
  const { wrap = true, allowHorizontal = true, containerRole } = options

  const items = useRef<RovingFocusItem[]>([])
  const activeIdRef = useRef<string | null>(null)
  const [activeId, _setActiveId] = useState<string | null>(null)
  const hasInteractedRef = useRef(false)
  const [hasInteracted, _setHasInteracted] = useState(false)

  const setActiveId = useCallback((id: string | null) => {
    activeIdRef.current = id
    _setActiveId(id)
  }, [])

  const setHasInteracted = useCallback((value: boolean) => {
    hasInteractedRef.current = value
    _setHasInteracted(value)
  }, [])

  const registerItem = useCallback(
    (item: RovingFocusItem) => {
      const idx = items.current.findIndex((i) => i.id === item.id)
      if (idx === -1) {
        items.current.push(item)
      } else {
        items.current[idx] = item
      }
      if (!activeIdRef.current && !item.disabled) {
        setActiveId(item.id)
      }
    },
    [setActiveId]
  )

  const unregisterItem = useCallback(
    (id: string) => {
      items.current = items.current.filter((i) => i.id !== id)
      if (activeIdRef.current === id) {
        const next = items.current.find((i) => !i.disabled)
        setActiveId(next?.id ?? null)
      }
    },
    [setActiveId]
  )

  const move = useCallback(
    (dir: 1 | -1) => {
      setHasInteracted(true)
      const enabled = items.current.filter((i) => !i.disabled)
      if (!enabled.length) return
      const idx = enabled.findIndex((i) => i.id === activeIdRef.current)
      const nextIdx = wrap
        ? (idx + dir + enabled.length) % enabled.length
        : Math.min(Math.max(idx + dir, 0), enabled.length - 1)
      const next = enabled[nextIdx]
      setActiveId(next.id)
      next.ref.current?.focus()
    },
    [wrap, setActiveId, setHasInteracted]
  )

  const focusFirst = useCallback(() => {
    const first = items.current.find((i) => !i.disabled)
    if (!first) return
    setHasInteracted(true)
    setActiveId(first.id)
    first.ref.current?.focus()
  }, [setActiveId, setHasInteracted])

  const focusLast = useCallback(() => {
    const enabled = items.current.filter((i) => !i.disabled)
    const last = enabled[enabled.length - 1]
    if (!last) return
    setHasInteracted(true)
    setActiveId(last.id)
    last.ref.current?.focus()
  }, [setActiveId, setHasInteracted])

  const focusItem = useCallback(
    (id: string) => {
      setHasInteracted(true)
      setActiveId(id)
    },
    [setActiveId, setHasInteracted]
  )

  const getFirstEnabledId = useCallback(
    () => items.current.find((i) => !i.disabled)?.id ?? null,
    []
  )

  const reset = useCallback(() => {
    setHasInteracted(false)
  }, [setHasInteracted])

  const handleGroupKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const isArrow = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(e.key)
      if (!isArrow) return
      if (!e.currentTarget.contains(document.activeElement)) return
      if (e.currentTarget !== document.activeElement) return
      e.preventDefault()
      focusFirst()
    },
    [focusFirst]
  )

  const handleGroupBlur = useCallback(
    (e: React.FocusEvent) => {
      const currentTarget = e.currentTarget
      setTimeout(() => {
        if (!currentTarget.contains(document.activeElement)) reset()
      }, 0)
    },
    [reset]
  )

  const handleItemKeyDown = useCallback(
    (
      e: React.KeyboardEvent,
      itemId: string,
      onSelect?: (id: string) => void,
      containerRef?: React.RefObject<HTMLElement>
    ) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          e.preventDefault()
          reset()
          const container: HTMLElement | null =
            containerRef?.current ??
            (containerRole
              ? ((e.target as HTMLElement).closest(
                  `[role="${containerRole}"]`
                ) as HTMLElement | null)
              : null)
          container?.focus()
        } else {
          reset()
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
      if (e.key === 'Home') {
        e.preventDefault()
        focusFirst()
        return
      }
      if (e.key === 'End') {
        e.preventDefault()
        focusLast()
        return
      }

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onSelect?.(itemId)
      }
    },
    [allowHorizontal, move, focusFirst, focusLast, reset, containerRole]
  )

  return {
    activeId,
    hasInteracted,
    registerItem,
    unregisterItem,
    focusItem,
    focusFirst,
    focusLast,
    getFirstEnabledId,
    reset,
    handleGroupKeyDown,
    handleItemKeyDown,
    handleGroupBlur
  }
}

export type RovingFocusReturn = ReturnType<typeof useRovingFocus>
