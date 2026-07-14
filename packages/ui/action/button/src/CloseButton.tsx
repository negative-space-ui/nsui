import { cn, useNSUI, X } from '@negative-space/system'
import React from 'react'

import { IconButton, type IconButtonProps } from './IconButton'

export type CloseButtonProps = Omit<IconButtonProps, 'children'>

export const CloseButton = React.forwardRef<HTMLButtonElement, CloseButtonProps>(
  ({ classNames, animation, ...props }, ref) => {
    const { global, components } = useNSUI()

    const Animation = animation ?? components.closeButton.animation

    return (
      <IconButton
        animation={Animation}
        {...props}
        ref={ref}
        classNames={{
          root: cn(`${global.prefixCls}-close-button`, classNames?.root),
          icon: classNames?.icon
        }}
      >
        <X className={cn(`${global.prefixCls}-close-button-icon`, classNames?.icon)} />
      </IconButton>
    )
  }
)

CloseButton.displayName = 'CloseButton'
