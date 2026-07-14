import { cn, useNSUI } from '@negative-space/system'
import React from 'react'

export interface SpinnerProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'role' | 'aria-busy'
> {
  loading?: boolean
}

export const Spinner = ({ className, loading = true, ...props }: SpinnerProps) => {
  if (!loading) return null

  const { global } = useNSUI()

  return (
    <div
      {...props}
      role="status"
      aria-busy="true"
      className={cn(`${global.prefixCls}-spinner`, className)}
    />
  )
}
