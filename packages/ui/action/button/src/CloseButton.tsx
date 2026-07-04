import { cn, useNSUI, X } from '@negative-space/system'
import React from 'react'

import { IconButton, type IconButtonProps } from './IconButton'

export type CloseButtonProps = Omit<IconButtonProps, 'children'>

export const CloseButton = React.forwardRef<HTMLButtonElement, CloseButtonProps>(
  ({ animation, classNames, ...props }, ref) => {
    const { global, components } = useNSUI()

    const Animation = animation ?? components.closeButton.animation

    return (
      <IconButton
        {...props}
        ref={ref}
        classNames={{
          root: cn(`${global.prefixCls}-close-button`, classNames?.root),
          icon: classNames?.icon
        }}
        animation={Animation}
      >
        <X />
      </IconButton>
    )
  }
)

CloseButton.displayName = 'CloseButton'
