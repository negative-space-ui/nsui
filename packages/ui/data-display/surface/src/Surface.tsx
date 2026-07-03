import { cn, useNSUI } from '@negative-space/system'
import React from 'react'

export type SurfaceProps = React.HTMLAttributes<HTMLDivElement>

export const Surface = React.forwardRef<HTMLDivElement, SurfaceProps>(
  ({ className, ...props }, ref) => {
    const { global } = useNSUI()

    return <div {...props} ref={ref} className={cn(`${global.prefixCls}-surface`, className)} />
  }
)

Surface.displayName = 'Surface'
