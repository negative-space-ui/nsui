import React from 'react'
import { cn, useNSUI } from '@negative-space/system'

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
}

export const Divider = ({ orientation = 'horizontal', className, ...props }: DividerProps) => {
  const { global } = useNSUI()

  return (
    <div
      {...props}
      aria-hidden="true"
      className={cn(
        `${global.prefixCls}-divider`,
        `${global.prefixCls}-divider-${orientation}`,
        className
      )}
    />
  )
}
