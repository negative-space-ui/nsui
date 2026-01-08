import React from 'react'
import clsx from 'clsx'
import { useNSUI } from '@negative-space/provider'

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
}

export const Divider = ({ orientation = 'horizontal', className, ...props }: DividerProps) => {
  const { global } = useNSUI()

  return (
    <div
      {...props}
      aria-hidden="true"
      className={clsx(
        `${global.prefixCls}-divider`,
        `${global.prefixCls}-divider-${orientation}`,
        className
      )}
    />
  )
}
