import React from 'react'
import { cn, useNSUI } from '@negative-space/system'

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
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
