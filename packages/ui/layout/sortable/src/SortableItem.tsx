import {
  cn,
  GripHorizontal,
  GripVertical,
  type PolymorphicElement,
  type PolymorphicElementMap,
  useNSUI
} from '@negative-space/system'
import React, { CSSProperties, forwardRef, useId, useLayoutEffect } from 'react'

import { useDragHandle } from './useDragHandle'
import { useSortable } from './useSortable'

export type SortableItemProps<E extends PolymorphicElement = 'div'> = {
  classNames?: {
    root?: string
    handle?: string
  }
  styles?: {
    root?: CSSProperties
    handle?: CSSProperties
  }
  as?: E
  id?: string
  handle?: boolean
  handlePosition?: 'start' | 'end'
  handleIcon?: React.ReactNode
  disabled?: boolean
} & Omit<React.ComponentPropsWithoutRef<E>, 'style' | 'id'>

export const SortableItem = forwardRef(
  <E extends PolymorphicElement = 'div'>(
    {
      as,
      id: idProp,
      children,
      classNames,
      styles,
      handle = true,
      handlePosition = 'start',
      handleIcon,
      disabled = false,
      ...props
    }: SortableItemProps<E>,
    ref: React.Ref<PolymorphicElementMap[E]>
  ) => {
    const Component = as ?? ('div' as React.ElementType)

    const { global } = useNSUI()

    const autoId = useId()
    const id = idProp ?? autoId

    const {
      order,
      registerItem,
      unregisterItem,
      draggingId,
      direction,
      classNames: rootClassNames,
      styles: rootStyles
    } = useSortable()
    const { onPointerDown } = useDragHandle(id, disabled)

    useLayoutEffect(() => {
      registerItem(id)
      return () => unregisterItem(id)
    }, [id])

    const index = order.indexOf(id)
    const isDragging = draggingId === id

    const grip = handle ? (
      <div
        role="button"
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        className={cn(
          `${global.prefixCls}-sortable-handle`,
          rootClassNames?.item?.handle,
          classNames?.handle
        )}
        style={{ ...rootStyles?.item?.handle, ...styles?.handle }}
        onPointerDown={onPointerDown}
      >
        {handleIcon ??
          (direction === 'row' ? (
            <GripHorizontal
              className={cn(
                `${global.prefixCls}-sortable-grip-icon`,
                rootClassNames?.item?.handle,
                classNames?.handle
              )}
              style={{ ...rootStyles?.item?.handle, ...styles?.handle }}
            />
          ) : (
            <GripVertical
              className={cn(
                `${global.prefixCls}-sortable-grip-icon`,
                rootClassNames?.item?.handle,
                classNames?.handle
              )}
              style={{ ...rootStyles?.item?.handle, ...styles?.handle }}
            />
          ))}
      </div>
    ) : null

    return (
      <Component
        {...props}
        ref={ref}
        data-sortable-id={id}
        data-dragging={isDragging}
        className={cn(
          `${global.prefixCls}-sortable-item`,
          rootClassNames?.item?.root,
          classNames?.root
        )}
        style={{
          order: index === -1 ? 0 : index,
          display: 'flex',
          ...rootStyles?.item?.root,
          ...styles?.root
        }}
      >
        {handlePosition === 'start' && grip}
        <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
        {handlePosition === 'end' && grip}
      </Component>
    )
  }
)

SortableItem.displayName = 'SortableItem'
