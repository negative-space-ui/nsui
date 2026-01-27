import React from 'react'
import { cn, useNSUI } from '@negative-space/system'

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical'
}

export const Divider = ({
  orientation = 'horizontal',
  className,
  style,
  ...props
}: DividerProps) => {
  const { global } = useNSUI()

  return (
    <hr
      {...props}
      aria-hidden="true"
      className={cn(
        `${global.prefixCls}-divider`,
        `${global.prefixCls}-divider-${orientation}`,
        className
      )}
      style={{ border: 'none', ...style }}
    />
  )
}
