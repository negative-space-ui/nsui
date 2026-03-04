import React from 'react'
import { cn, useNSUI, Check, type OverlayAnimation } from '@negative-space/system'

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
