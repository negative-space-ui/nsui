import { cn, useNSUI } from '@negative-space/system'
import React from 'react'

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => {
    const { global } = useNSUI()

    return (
      <div
        {...props}
        ref={ref}
        className={cn(`${global.prefixCls}-skeleton ${global.prefixCls}-pulse`, className)}
      />
    )
  }
)

Skeleton.displayName = 'Skeleton'
