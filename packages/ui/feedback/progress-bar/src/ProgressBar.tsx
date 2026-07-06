import { cn, useNSUI } from '@negative-space/system'
import React from 'react'

export interface ProgressBarProgress extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
}

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProgress>((props, ref) => {
  const { value, max = 100, className, ...rest } = props

  const { global } = useNSUI()

  return (
    <div
      {...rest}
      ref={ref}
      className={cn(`${global.prefixCls}-progress-bar`, className)}
      style={{ width: `${(value / max) * 100}%`, ...rest.style }}
    />
  )
})

ProgressBar.displayName = 'ProgressBar'
