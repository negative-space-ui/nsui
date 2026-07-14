import { Divider, type DividerProps } from '@negative-space/divider'
import { cn, mergeRefs, useNSUI } from '@negative-space/system'
import React, { forwardRef, useRef } from 'react'

import { useResizable } from './useResizable'

export type ResizableHandleProps = DividerProps & {
  disabled?: boolean
}

function findPanelSibling(el: Element, dir: 'previous' | 'next'): HTMLElement | null {
  let sibling = dir === 'previous' ? el.previousElementSibling : el.nextElementSibling
  while (sibling) {
    if ((sibling as HTMLElement).dataset.resizableId) return sibling as HTMLElement
    sibling = dir === 'previous' ? sibling.previousElementSibling : sibling.nextElementSibling
  }
  return null
}

export const ResizableHandle = forwardRef<HTMLDivElement, ResizableHandleProps>(
  ({ className, style, disabled = false, ...props }, ref) => {
    const { global } = useNSUI()

    const { direction, resizePair, sizes } = useResizable()

    const handleRef = useRef<HTMLHRElement>(null)

    const onPointerDown = (e: React.PointerEvent) => {
      if (disabled) return

      const handle = handleRef.current
      if (!handle) return

      const prevPanel = findPanelSibling(handle, 'previous')
      const nextPanel = findPanelSibling(handle, 'next')
      if (!prevPanel || !nextPanel) return

      const prevId = prevPanel.dataset.resizableId!
      const nextId = nextPanel.dataset.resizableId!
      const isRow = direction === 'row'
      handle.setPointerCapture(e.pointerId)
      const container = handle.parentElement
      const containerSize = container
        ? isRow
          ? container.getBoundingClientRect().width
          : container.getBoundingClientRect().height
        : 0
      const totalWeight = Object.values(sizes).reduce((sum, s) => sum + s, 0)
      const scale = containerSize > 0 && totalWeight > 0 ? totalWeight / containerSize : 1

      let lastPos = isRow ? e.clientX : e.clientY
      const onMove = (ev: PointerEvent) => {
        const pos = isRow ? ev.clientX : ev.clientY
        const pixelDelta = pos - lastPos
        resizePair(prevId, nextId, pixelDelta * scale)
        lastPos = pos
      }
      const onUp = () => {
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerup', onUp)
      }
      window.addEventListener('pointermove', onMove)
      window.addEventListener('pointerup', onUp)
    }

    return (
      <Divider
        {...props}
        ref={mergeRefs(ref, handleRef)}
        aria-disabled={disabled}
        data-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        className={cn(`${global.prefixCls}-resizable-handle`, className)}
        onPointerDown={onPointerDown}
        style={{
          flexShrink: 0,
          touchAction: 'none',
          ...style
        }}
      />
    )
  }
)

ResizableHandle.displayName = 'ResizableHandle'
