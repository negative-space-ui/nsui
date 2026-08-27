import { cn, mergeRefs, useNSUI } from '@negative-space/system'
import React, { forwardRef, useEffect, useRef, useState } from 'react'

import { useDragHandle } from './useDragHandle'
import { useSortable } from './useSortable'

export type SortableHandleProps = React.ComponentPropsWithoutRef<'div'> & {
  disabled?: boolean
}

function findItemAncestor(el: Element | null): HTMLElement | null {
  let node = el
  while (node) {
    if ((node as HTMLElement).dataset?.sortableId) return node as HTMLElement
    node = node.parentElement
  }
  return null
}

export const SortableHandle = forwardRef<HTMLDivElement, SortableHandleProps>(
  ({ className, style, disabled = false, ...props }, ref) => {
    const { global } = useNSUI()
    const { classNames: rootClassNames, styles: rootStyles } = useSortable()

    const handleRef = useRef<HTMLDivElement>(null)
    const [itemId, setItemId] = useState<string | null>(null)

    useEffect(() => {
      const item = findItemAncestor(handleRef.current)
      setItemId(item?.dataset.sortableId ?? null)
    }, [])

    const { onPointerDown } = useDragHandle(itemId ?? '', disabled || !itemId)

    return (
      <div
        {...props}
        ref={mergeRefs(ref, handleRef)}
        role="button"
        aria-disabled={disabled}
        data-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        className={cn(`${global.prefixCls}-sortable-handle`, rootClassNames?.handle, className)}
        style={{ ...rootStyles?.handle, ...style }}
        onPointerDown={onPointerDown}
      />
    )
  }
)

SortableHandle.displayName = 'SortableHandle'
