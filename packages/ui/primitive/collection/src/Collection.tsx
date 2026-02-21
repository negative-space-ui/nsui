import React, { useRef, useMemo } from 'react'
import { Grid, type GridProps } from '@negative-space/grid'
import { useRovingFocus, type UseRovingFocusOptions } from '@negative-space/roving-focus'
import { CollectionContext } from './CollectionContext'

export interface CollectionProps extends Omit<
  GridProps,
  'aria-disabled' | 'onBlur' | 'onKeyDown' | 'ref' | 'tabIndex'
> {
  disabled?: boolean
  rovingOptions?: UseRovingFocusOptions
}

export function Collection({
  children,
  disabled = false,
  columns = 1,
  rovingOptions,
  ...props
}: CollectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const roving = useRovingFocus(rovingOptions)

  const ctxValue = useMemo(
    () => ({
      registerItem: roving.registerItem,
      unregisterItem: roving.unregisterItem,
      focusItem: roving.focusItem,
      handleItemKeyDown: roving.handleItemKeyDown,
      activeId: roving.activeId,
      hasInteracted: roving.hasInteracted,
      containerRef: ref as React.RefObject<HTMLElement>,
      disabled
    }),
    [
      roving.registerItem,
      roving.unregisterItem,
      roving.focusItem,
      roving.handleItemKeyDown,
      roving.activeId,
      roving.hasInteracted,
      disabled
    ]
  )

  return (
    <CollectionContext.Provider value={ctxValue}>
      <Grid
        ref={ref}
        columns={columns}
        tabIndex={disabled ? -1 : roving.hasInteracted ? -1 : 0}
        aria-disabled={disabled || undefined}
        onKeyDown={disabled ? undefined : roving.handleGroupKeyDown}
        onBlur={disabled ? undefined : roving.handleGroupBlur}
        {...props}
      >
        {children}
      </Grid>
    </CollectionContext.Provider>
  )
}

Collection.displayName = 'Collection'
