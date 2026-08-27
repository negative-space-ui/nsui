import { cn, useNSUI } from '@negative-space/system'
import { Toggle, type ToggleProps } from '@negative-space/toggle'
import React from 'react'

export type SegmentedItemProps = ToggleProps

export const SegmentedItem = React.forwardRef<HTMLButtonElement, SegmentedItemProps>(
  ({ classNames, children, animation, ...props }, ref) => {
    const { global, components } = useNSUI()

    const Animation = animation ?? components?.segmented?.animation

    return (
      <Toggle
        ref={ref}
        {...props}
        animation={Animation}
        classNames={{
          ...classNames,
          root: cn(`${global.prefixCls}-segmented-item`, classNames?.root)
        }}
      >
        {children}
      </Toggle>
    )
  }
)

SegmentedItem.displayName = 'SegmentedItem'
