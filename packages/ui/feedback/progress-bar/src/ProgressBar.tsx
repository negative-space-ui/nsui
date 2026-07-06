import { cn, useNSUI } from '@negative-space/system'
import React from 'react'

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
}

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>((props, ref) => {
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
