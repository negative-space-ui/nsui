import { cn, useNSUI } from '@negative-space/system'
import React, { forwardRef } from 'react'

export interface DividerProps extends Omit<React.HTMLAttributes<HTMLHRElement>, 'aria-hidden'> {
  orientation?: 'horizontal' | 'vertical'
}

export const Divider = forwardRef<HTMLHRElement, DividerProps>(
  ({ className, orientation = 'horizontal', ...props }, ref) => {
    const { global } = useNSUI()

    return (
      <hr
        {...props}
        ref={ref}
        aria-hidden="true"
        data-orientation={orientation}
        className={cn(`${global.prefixCls}-divider`, className)}
      />
    )
  }
)

Divider.displayName = 'Divider'
