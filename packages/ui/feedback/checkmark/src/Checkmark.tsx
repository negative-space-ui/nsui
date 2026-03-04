import { Check, cn, type OverlayAnimation, useNSUI } from '@negative-space/system'
import React from 'react'

export interface CheckmarkProps extends React.ComponentPropsWithoutRef<typeof Check> {
  checked?: boolean
  animation?: OverlayAnimation
}

export const Checkmark = React.forwardRef<SVGSVGElement, CheckmarkProps>(
  ({ className, animation, checked = false, ...props }, ref) => {
    const { global, components } = useNSUI()
    const Animation = animation ?? components.checkmark.animation

    return (
      <Check
        ref={ref}
        data-visible={checked}
        className={cn(
          `${global.prefixCls}-checkmark`,
          Animation !== 'none' && `${global.prefixCls}-${Animation}`,
          className
        )}
        {...props}
      />
    )
  }
)

Checkmark.displayName = 'Checkmark'
