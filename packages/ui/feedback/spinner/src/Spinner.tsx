import React from 'react'
import { cn, useNSUI } from '@negative-space/system'

export interface SpinnerProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'role' | 'aria-busy'
> {
  isLoading?: boolean
}

export const Spinner = ({ isLoading = true, className, style, ...props }: SpinnerProps) => {
  if (!isLoading) return null

  const { global } = useNSUI()

  return (
    <div
      {...props}
      role="status"
      aria-busy="true"
      className={cn(`${global.prefixCls}-spinner`, className)}
      style={{ ...style }}
    />
  )
}
