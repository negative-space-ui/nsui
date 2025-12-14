import React from 'react'
import clsx from 'clsx'
import { useNSUI } from '@negative-space/provider'
import './spinner.css'

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading?: boolean
}

export const Spinner = ({ isLoading = true, className, style, ...props }: SpinnerProps) => {
  if (!isLoading) return null

  const { global, components } = useNSUI()

  return (
    <div
      {...props}
      role="status"
      aria-busy="true"
      className={clsx(`${global.prefixCls}-spinner`, className)}
      style={{
        transition: `border-color ${global.colorTransitionDuration}ms ease-in-out, scale ${global.scaleTransitionDuration}ms ease-in-out`,
        borderRadius: '50%',
        animation: `spin ${components.spinner.animationDuration}s linear infinite`,
        display: 'inline-block',
        ...style
      }}
    />
  )
}
