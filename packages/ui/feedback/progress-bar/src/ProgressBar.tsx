import { cn, useNSUI } from '@negative-space/system'
import React from 'react'

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
}

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, style, value, max = 100, ...props }, ref) => {
    const { global } = useNSUI()

    return (
      <div
        {...props}
        ref={ref}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemax={max}
        className={cn(`${global.prefixCls}-progress-bar`, className)}
        style={{ width: `${(value / max) * 100}%`, ...style }}
      />
    )
  }
)

ProgressBar.displayName = 'ProgressBar'
