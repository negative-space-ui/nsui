import { cn, useNSUI, X } from '@negative-space/system'
import React from 'react'

import { IconButton, type IconButtonProps } from './IconButton'

export type CloseButtonProps = Omit<IconButtonProps, 'children'>

export const CloseButton = React.forwardRef<HTMLButtonElement, CloseButtonProps>(
  ({ animation, className, ...props }, ref) => {
    const { global, components } = useNSUI()

    const Animation = animation ?? components.closeButton.animation

    return (
      <IconButton
        {...props}
        ref={ref}
        className={cn(`${global.prefixCls}-close-btn`, className)}
        animation={Animation}
      >
        <X />
      </IconButton>
    )
  }
)

CloseButton.displayName = 'CloseButton'
