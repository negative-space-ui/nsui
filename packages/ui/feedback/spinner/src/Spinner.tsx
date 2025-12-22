import React from 'react'
import clsx from 'clsx'
import { useNSUI } from '@negative-space/provider'

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
      className={clsx(`${global.prefixCls}-spinner`, className)}
      style={{ ...style }}
    />
  )
}
