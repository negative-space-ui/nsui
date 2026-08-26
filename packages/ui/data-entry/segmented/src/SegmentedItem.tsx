import { Button, type ButtonProps } from '@negative-space/button'
import { cn, useNSUI } from '@negative-space/system'
import React from 'react'

export type SegmentedItemProps = ButtonProps

export const SegmentedItem = React.forwardRef<HTMLButtonElement, SegmentedItemProps>(
  ({ classNames, children, animation, ...props }, ref) => {
    const { global, components } = useNSUI()

    const Animation = animation ?? components?.segmented?.animation

    return (
      <Button
        ref={ref}
        {...props}
        animation={Animation}
        classNames={{
          ...classNames,
          root: cn(`${global.prefixCls}-segmented-item`, classNames?.root)
        }}
      >
        {children}
      </Button>
    )
  }
)

SegmentedItem.displayName = 'SegmentedItem'
